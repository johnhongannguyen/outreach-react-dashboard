import socketIO from "socket.io-client";

// Configuring Sockets
const clientSocket = socketIO("http://localhost:5000", {
  transports: ["websocket"],
  jsonp: false
});

const adminSocket = socketIO("http://localhost:5000/admin", {
  transports: ["websocket"],
  jsonp: false
});

export { clientSocket, adminSocket };
