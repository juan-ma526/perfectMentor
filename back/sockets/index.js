const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

let io = null;

const room = (userId) => `user:${userId}`;

const tokenFromCookie = (header = "") => {
  const part = header.split(";").find((c) => c.trim().startsWith("token="));
  if (!part) return null;
  try {
    return decodeURIComponent(part.trim().slice("token=".length));
  } catch (error) {
    return null;
  }
};

const emitToUser = (userId, event, payload) => {
  if (io) io.to(room(String(userId))).emit(event, payload);
};

const initSockets = (servidor) => {
  io = new Server(servidor, {
    cors: { origin: "http://localhost:3000", credentials: true },
  });

  io.use((socket, next) => {
    const token = tokenFromCookie(socket.handshake.headers.cookie);
    if (!token) return next(new Error("unauthorized"));
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err || !user || !user.id) return next(new Error("unauthorized"));
      socket.data.userId = String(user.id);
      next();
    });
  });

  io.on("connection", (socket) => {
    socket.join(room(socket.data.userId));

    socket.on("message", async (data, ack) => {
      const reply = typeof ack === "function" ? ack : () => {};
      try {
        const { createMessage } = require("../controllers/message");
        const { matchId, message } = data || {};
        const result = await createMessage(socket.data.userId, matchId, message);
        reply(result.error ? { error: result.error, status: result.status } : { ok: true, message: result.message });
      } catch (error) {
        reply({ error: "Error al enviar el mensaje", status: 500 });
      }
    });
  });

  return io;
};

module.exports = { initSockets, emitToUser };
