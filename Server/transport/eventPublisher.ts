import { Server } from "socket.io";
import { GameEvent } from "./socketPayload";

export interface EventPublisher {
  publishToGame(gameCode: string, event: GameEvent): void;
}

export class SocketEventPublisher implements EventPublisher {
  constructor(private readonly io: Server) {}

  publishToGame(gameCode: string, event: GameEvent): void {
    this.io.to(gameCode).emit("message", {
      type: "message",
      data: event,
    });
  }
}