import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";

import { WebSocketEvent } from "./transport/socketPayload";
import { Game } from "./domain/Game";
import {
  handleCreateGame,
  handleJoinGame,
  handlePlayerGridFill,
  handlePlayerMoves,
} from "./web sockets/handlers";

const app = express();
const server = createServer(app);
const io = new Server(server);

export const Games: Map<string, Game> = new Map();

app.use(cors());

app.get("/", (req: any, res: any) => {
  res.send("Hello from World Server");
});

//if a new connection {request type: 'join room'|'create room',
//      status: ""initial game load, clientId: 'zack@gmail.com', gameCode: #234
//}
//create a new socket join room for max 2 people and allow the user to join the room
//if gameCode is equal to a Socket room with the event-name AND clientId is unique in that room

// event payload = {gameCode:String, player: {email:String, clientId} }

io.on("connection", (socket: any) => {
  console.log("a User Connected");

  socket.on("message", (event: WebSocketEvent, callback: Function) => {
    switch (event.type) {
      case "join-room":
        handleJoinGame(socket, event, callback);
        break;
      case "create-room":
        handleCreateGame(socket, event, callback);
        break;
      case "initial-player-grid":
        handlePlayerGridFill(socket, event, callback);
        break;
      case "player-move":
        // handle player move here
        handlePlayerMoves(socket, event, callback);
        break;
    }
  });
});

export function startServer(port = 3000) {
  return server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

if (require.main === module) {
  startServer();
}
