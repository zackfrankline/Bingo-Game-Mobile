import { GameRepository } from "../infrastructure/GameRepository";
import { Socket } from "socket.io";
import { EventPublisher } from "../transport/eventPublisher";
import {
  CreateGameCommand,
  JoinGameCommand,
  MakeMoveCommand,
  PlayerData,
  Result,
  SubmitGridCommand,
} from "../transport/socketPayload";
import { Game } from "../domain/Game";

export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  private toDomainPlayer(socket: Socket, player: PlayerData) {
    return {
      webSocket: socket as unknown as WebSocket,
      clientId: player.clientId,
      playerName: player.playerName,
    };
  }

  createGame(socket: Socket, command: CreateGameCommand): Result {
    // create and store game
    const gameCode = command.gameCode;
    if (this.gameRepository.findByCode(gameCode)) {
      return {
        success: false,
        error: "Game Already Exists",
        code: "",
      };
    }
    const game = new Game(gameCode);
    const player = command.player as PlayerData;
    const domainPlayer = this.toDomainPlayer(socket, player);

    game.addPlayers(domainPlayer);

    game.setCurrentPlayer(domainPlayer);

    this.gameRepository.save(game);
    return {
      success: true,
    };
  }

  joinGame(socket: Socket, command: JoinGameCommand): Result {
    // validate room and add player
    const gameCode = command.gameCode;
    const curPlayer = command.player;
    const game = this.gameRepository.findByCode(gameCode);
    if (!game) {
      return {
        success: false,
        error: "Game Does not Exists",
        code: "",
      };
    }
    const players = game.getPlayers();
    const playerExists = players.some(
      (p: PlayerData) => p.clientId === curPlayer.clientId,
    );

    if (playerExists) {
      return {
        success: false,
        error: "Player already joined",
        code: "",
      };
    }

    if (players.length === game.getMaxPlayers()) {
      return {
        success: false,
        error: "Game room is full!",
        code: "ROOM-FULL",
      };
    }

    game.addPlayers(this.toDomainPlayer(socket, curPlayer));

    if (!game.getCurrentPlayer()) {
      game.setCurrentPlayer(this.toDomainPlayer(socket, curPlayer));
    }

    if (players.length + 1 === game.getMaxPlayers()) {
      game.setStatus("IN-PROGRESS");
      const payload = {
        event: "GAME-INPROGRESS",
        gameCode: game.getGameCode(),
        status: game.getStatus(),
        players: game.getPlayers().map((p: PlayerData) => p.clientId),
        currentPlayer: game.getCurrentPlayer()?.clientId,
      };
      this.eventPublisher.publishToGame(gameCode, payload);
    }

    return {
      success: true,
    };
  }

  submitGrid(_socket: Socket, _command: SubmitGridCommand): Result {
    // validate and attach player grid
    return {
      success: false,
      error: "Grid submission is not implemented",
      code: "NOT-IMPLEMENTED",
    };
  }

  makeMove(_socket: Socket, _command: MakeMoveCommand): Result {
    // validate turn, apply move, detect winner, advance turn
    return {
      success: false,
      error: "Move handling is not implemented",
      code: "NOT-IMPLEMENTED",
    };
  }
}
