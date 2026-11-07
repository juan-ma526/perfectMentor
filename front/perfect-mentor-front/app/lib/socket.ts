import io, { Socket } from "socket.io-client";

let socket: Socket | null = null;
let identity: string | null = null;

// Una sola conexion por pestaña; la sesion viaja en la cookie del handshake.
export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:3001", { withCredentials: true, autoConnect: false });
  }
  return socket;
};

// Si cambia el usuario, se corta y se vuelve a conectar para tomar la cookie nueva.
export const connectSocket = (userId?: string): Socket => {
  const s = getSocket();
  if (userId && identity && identity !== userId) s.disconnect();
  if (userId) identity = userId;
  if (!s.connected && !s.active) s.connect();
  return s;
};

export const disconnectSocket = () => {
  identity = null;
  if (socket) socket.disconnect();
};
