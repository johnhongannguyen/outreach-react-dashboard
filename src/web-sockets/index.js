import socketIO from "socket.io-client";

// Configuring Sockets
const clientSocket = socketIO(`${process.env.REACT_APP_SOCKET_HOST}`, {
  transports: ["websocket"],
  jsonp: false
});

const adminSocket = socketIO(`${process.env.REACT_APP_SOCKET_HOST}/admin`, {
  transports: ["websocket"],
  jsonp: false
});

export { clientSocket, adminSocket };
