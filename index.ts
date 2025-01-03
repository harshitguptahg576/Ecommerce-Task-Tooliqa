import http from "http";
import app from "./src/app";
import {
  normalizePort,
  onError,
  onListening,
} from "./src/utils/serverHandlers";
import dotenv from "dotenv";
import { Server } from "socket.io";
import WebSocket from "./src/webSocket";

console.log("NODE_ENV : ", process.env.NODE_ENV);

dotenv.config({
  path: `${process.env.NODE_ENV ? ".env." + process.env.NODE_ENV : ".env"}`,
});

const port = normalizePort(process.env.PORT || 8002);

app.set("port", port);

const server = http.createServer(app);
const io = new Server(server);
new WebSocket(io);

server.listen(port);

server.on("error", (error) => onError(error, port));

server.on("listening", onListening.bind(server));
