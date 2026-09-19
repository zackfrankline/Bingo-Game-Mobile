import { GameStatus, PlayerData } from "../transport/socketPayload";
import { GameBoard } from "./GameBoard";

export class Game {
  private readonly gameCode: string;
  private readonly players: Array<PlayerData> = [];
  private readonly maxPlayers: number = 2;
  private readonly playerGridMap: Map<WebSocket, GameBoard> = new Map();
  private readonly playerLines: Map<WebSocket, number> = new Map();
  private readonly markedCells: Set<number> = new Set();
  private currentPlayer: PlayerData | null = null;
  private status: GameStatus;

  constructor(gameCode: string) {
    this.gameCode = gameCode;
    this.status = "NOT-STARTED";
    this.playerGridMap = new Map<WebSocket, GameBoard>();
    this.markedCells = new Set<number>();
    this.playerLines = new Map<WebSocket, number>();
  }

  public addPlayers(player: PlayerData) {
    this.players.push(player);
  }

  public getGameCode() {
    return this.gameCode;
  }

  public setStatus(status: GameStatus) {
    this.status = status;
  }

  public getStatus() {
    return this.status;
  }

  public getPlayers() {
    return this.players;
  }

  public setPlayerGrid(gameBoard: GameBoard, playerSocket: WebSocket) {
    this.playerGridMap.set(playerSocket, gameBoard);
  }

  public getPlayerGridMap() {
    return this.playerGridMap;
  }

  public getMaxPlayers() {
    return this.maxPlayers;
  }

  public getMarkedCells() {
    return this.markedCells;
  }

  public setCurrentPlayer(player: PlayerData | null) {
    this.currentPlayer = player;
  }

  public getCurrentPlayer() {
    return this.currentPlayer;
  }

  public isCurrentPlayer(playerSocket: WebSocket) {
    return this.currentPlayer?.webSocket === playerSocket;
  }

  public advanceTurn() {
    if (this.players.length === 0) {
      this.currentPlayer = null;
      return;
    }

    if (!this.currentPlayer) {
      this.currentPlayer = this.players[0];
      return;
    }

    const currentIndex = this.players.findIndex(
      (player) => player.clientId === this.currentPlayer?.clientId,
    );

    if (currentIndex === -1) {
      this.currentPlayer = this.players[0];
      return;
    }

    const nextIndex = (currentIndex + 1) % this.players.length;
    this.currentPlayer = this.players[nextIndex];
  }

  public markPlayerGrid(cellNumber: number) {
    //mark cell for the game
    this.markCurrentCell(cellNumber);

    //update Player Grids and Hash
    this.playerGridMap.forEach((gameBoard, socket) => {
      if (gameBoard != null) {
        const newPlayerLines: number = gameBoard?.markCellInGrid(cellNumber);
        this.playerLines.set(
          socket,
          (this.playerLines.get(socket) ?? 0) + newPlayerLines,
        );
      }
    });

    return this.playerLines;
  }

  private markCurrentCell(cellNumber: number) {
    this.markedCells.add(cellNumber);
  }

  private getCurrentPlayerGrid(socket: WebSocket) {
    if (!this.playerGridMap.has(socket)) return null;
    return this.playerGridMap.get(socket);
  }
}
