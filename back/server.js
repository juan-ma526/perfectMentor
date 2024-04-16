const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const client = require("./config/db");
const routes = require("./routes");
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

const servidor = app.listen(process.env.PORT, () => {
  console.log("Servidor conectado en el puerto 3001");
});

module.exports = servidor;

//Socket.io

const io = new Server(servidor, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, "socket id");
  console.log("cliente conectado");

  socket.on("message", (message, nickname) => {
    //Envio al resto de clientes
    socket.broadcast.emit("message", {
      body: message,
      from: nickname,
    });
  });
});
