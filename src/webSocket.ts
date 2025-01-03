import { Server } from "socket.io";
import { authenticateJWT } from "./middlewares/auth";

class WebSocket {
  public static io: Server;
  constructor(io: Server) {
    WebSocket.io = io;
    this.init();
  }
  init() {
    //   WebSocket.io.use((socket, next) => {
    //     const token = socket.handshake.auth.token;
    //     authenticateJWT(
    //       { headers: { authorization: `Bearer ${token}` } } as any,
    //       {} as any,
    //       (err) => {
    //         if (err) {
    //           return next(new Error("Authentication error"));
    //         }
    //         next();
    //       }
    //     );
    //   });

    WebSocket.io.on("connection", (socket) => {
      console.log("A user connected");
      socket.on("subscribe", (room) => {
        socket.join(room);
      });
      socket.on("unsubscribe", (room) => {
        socket.leave(room);
      });
      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    //   setInterval(() => {
    //     WebSocket.io.to("inventory-updates").emit("inventory-update", {
    //       productId: Math.floor(Math.random() * 10) + 1,
    //       newInventory: Math.floor(Math.random() * 100),
    //     });
    //   }, 5000);
  }
}

export default WebSocket;
