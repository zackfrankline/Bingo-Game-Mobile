import { Socket } from "socket.io";
import { GameService } from "../application/GameService";
import {
  CreateGameCommand,
  JoinGameCommand,
  MakeMoveCommand,
  Result,
  SocketResponse,
  SubmitGridCommand,
  WebSocketEvent,
} from "./socketPayload";
import { EventPublisher } from "./eventPublisher";

type Acknowledgement = (response: SocketResponse) => void;

function respond(result: Result, callback: Acknowledgement): void {
  if (result.success) {
    callback({ message: "Request accepted", status: "OK" });
    return;
  }

  callback({ message: result.error, status: result.code });
}

export function registerSocketHandlers(
  socket: Socket,
  gameService: GameService,
  eventPublisher: EventPublisher,
): void {
  socket.on("message", (event: WebSocketEvent, callback?: Acknowledgement) => {
    const acknowledge = callback ?? (() => undefined);

    switch (event.type) {
      case "create-room": {
        const command: CreateGameCommand = event;
        const result = gameService.createGame(socket, command);
        if (result.success) socket.join(command.gameCode);
        respond(result, acknowledge);
        return;
      }
      case "join-room": {
        const command: JoinGameCommand = event;
        const result = gameService.joinGame(socket, command);
        if (result.success) socket.join(command.gameCode);
        respond(result, acknowledge);
        return;
      }
      case "initial-player-grid": {
        const command: SubmitGridCommand = event;
        respond(gameService.submitGrid(socket, command), acknowledge);
        return;
      }
      case "player-move": {
        const command: MakeMoveCommand = event;
        respond(gameService.makeMove(socket, command), acknowledge);
        return;
      }
    }
  });

  socket.on("disconnect", () => {
    // Delegate disconnect cleanup to GameService when it is implemented.
  });
}
