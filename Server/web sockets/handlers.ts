import { PlayerData, WebSocketEvent } from "../transport/socketPayload";
import { Games } from "../index";
import { GameBoard } from "../domain/GameBoard";
import { Game } from "../domain/Game";
import { broadcastToAllPlayers } from "./eventPublisher";

export function handleJoinGame(
  socket: WebSocket,
  event: any,
  callback: Function,
) {
  const gameCode = event.gameCode as string;
  const player = event.player as PlayerData;

  //game exists
  if (Games.has(gameCode)) {
    const curGame = Games.get(gameCode);

    if (!curGame) {
      return;
    }

    const players = curGame.getPlayers();
    const playerExists = players.some(
      (p: PlayerData) => p.clientId === player.clientId,
    );

    if (playerExists) {
      callback({
        message: "Player already joined",
        status: "ALREADY-JOINED",
      });
      return;
    }

    if (players.length === curGame.getMaxPlayers()) {
      callback({
        message: "Game room is full!",
        status: "ROOM-FULL",
      });
      return;
    }

    curGame.addPlayers({
      webSocket: socket,
      clientId: player.clientId,
      playerName: player.playerName,
    });

    if (!curGame.getCurrentPlayer()) {
      curGame.setCurrentPlayer({
        webSocket: socket,
        clientId: player.clientId,
        playerName: player.playerName,
      });
    }

    callback({
      message: "Joined game successfully",
      status: "JOINED",
    });

    if (players.length + 1 === curGame.getMaxPlayers()) {
      curGame.setStatus("IN-PROGRESS");
      const payload = {
        event: "GAME-INPROGRESS",
        gameCode: curGame.getGameCode(),
        status: curGame.getStatus(),
        players: curGame.getPlayers().map((p: PlayerData) => p.clientId),
        currentPlayer: curGame.getCurrentPlayer()?.clientId,
      };
      broadcastToAllPlayers(gameCode, payload);
    }
  }
  //game doesn't exists
  else {
    callback({
      message: "Game doesn't exists",
      status: "GAME-NOT-FOUND",
    });
  }
}

export function handleCreateGame(
  socket: WebSocket,
  event: any,
  callback: Function,
) {
  const gameCode = event.gameCode as string;
  let game: Game | null = null;

  if (!Games.has(gameCode)) {
    game = new Game(gameCode);
    const player = event.player as PlayerData;

    game.addPlayers({
      webSocket: socket,
      clientId: player.clientId,
      playerName: player.playerName,
    });

    game.setCurrentPlayer({
      webSocket: socket,
      clientId: player.clientId,
      playerName: player.playerName,
    });

    Games.set(gameCode, game);
    callback({
      message: "Game created successfully",
      status: "CREATED",
    });
  } else {
    callback({
      message: "Game Already exists",
      status: "GAME-ALREADY-EXISTS",
    });
  }
}

export function handlePlayerGridFill(
  socket: WebSocket,
  event: any,
  callback: Function,
) {
  const gameCode = event.gameCode as string;
  const playerGrid = event.grid as Array<number>;

  const curGame = Games.get(gameCode);
  if (curGame) {
    const playerGameBoard = new GameBoard(playerGrid);
    const playerBoards = curGame.getPlayerGridMap();

    if (
      playerBoards.size === curGame.getMaxPlayers() ||
      playerBoards.has(socket)
    ) {
      callback({
        message: "Grid Already Filled",
        status: "GRID-FILLED",
      });
      return;
    }

    playerBoards.set(socket, playerGameBoard);

    if (playerBoards.size === curGame.getMaxPlayers()) {
      curGame.setStatus("GAME-STARTED");
      curGame.setCurrentPlayer(curGame.getPlayers()[0] ?? null);

      const payload = {
        event: "GAME-STARTED",
        gameCode: curGame.getGameCode(),
        status: curGame.getStatus(),
        players: curGame.getPlayers().map((p: PlayerData) => p.clientId),
        currentPlayer: curGame.getCurrentPlayer()?.clientId,
      };

      broadcastToAllPlayers(gameCode, payload);
    }
  } else {
    callback({
      message: "Game does not exists",
      status: "GAME-NOT-FOUND",
    });
  }
}

export function handlePlayerMoves(
  socket: WebSocket,
  event: WebSocketEvent,
  callback: Function,
) {
  if (event.type !== "player-move") {
    callback({
      message: "Invalid move event",
      status: "INVALID-EVENT",
    });
    return;
  }

  const gameCode = event.gameCode;
  const curGame = Games.get(gameCode);

  //validate game exists
  if (!curGame) {
    callback({
      message: "Game does not exists",
      status: "GAME-NOT-FOUND",
    });
    return;
  }

  //validate game started
  if (curGame.getStatus() !== "GAME-STARTED") {
    callback({
      message: "Game is not active",
      status: "GAME-NOT-ACTIVE",
    });
    return;
  }

  if (curGame.getStatus() == "FINISHED") {
    callback({
      message: "Game is over.",
      status: "GAME-WON",
    });
    return;
  }

  //validate player socket is the current Game Player
  if (!curGame.isCurrentPlayer(socket)) {
    callback({
      message: "It is not your turn",
      status: "NOT-YOUR-TURN",
    });
    return;
  }

  const cellNumber = event.cellNumber as number;
  const markedCells = curGame.getMarkedCells();

  if (markedCells.has(cellNumber)) {
    callback({
      message: "cell already marked",
      status: "CELL-ALREADY-MARKED",
    });
    return;
  }

  const playerLines = curGame.markPlayerGrid(cellNumber);
  // send back the marked cell data updated to the inactive player
  // updates the UI for both players
  // check if winning/tie condition
  //if true end game
  //else continue;
  const winnerSockets = [...playerLines.entries()]
    .filter(([, lines]) => lines >= 5)
    .map(([playerSocket]) => playerSocket);

  //check winners
  if (winnerSockets.length > 0) {
    curGame.setStatus("FINISHED");
    const payload = {
      event: "GAME-WON",
      gameCode,
      winnerIds: curGame
        .getPlayers()
        .filter((player) => winnerSockets.includes(player.webSocket))
        .map((player) => player.clientId),
      cellNumber,
    };

    broadcastToAllPlayers(gameCode, payload);
    callback({
      message: "Game won",
      status: "GAME-WON",
    });
    return;
  }

  curGame.advanceTurn();

  const payload = {
    event: "PLAYER-MOVED",
    gameCode,
    movedBy: curGame.getCurrentPlayer()?.clientId,
    currentPlayer: curGame.getCurrentPlayer()?.clientId,
    cellNumber: event.cellNumber,
  };

  broadcastToAllPlayers(gameCode, payload);

  callback({
    message: "Move accepted",
    status: "MOVE-ACCEPTED",
  });
}
