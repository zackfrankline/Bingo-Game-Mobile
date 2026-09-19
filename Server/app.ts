import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { GameService } from "./application/GameService";
import { InMemoryGameRepository } from "./infrastructure/InMemoryGameRepository";
import { SocketEventPublisher } from "./transport/eventPublisher";
import { registerSocketHandlers } from "./transport/socketHandlers";

export function createApp() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });
  const repository = new InMemoryGameRepository();
  const publisher = new SocketEventPublisher(io);
  const gameService = new GameService(repository, publisher);

  app.use(cors());
  app.get("/", (_request, response) => {
    response.send("Bingo server is running");
  });

  io.on("connection", (socket) => {
    registerSocketHandlers(socket, gameService, publisher);
  });

  return { app, httpServer, io };
}