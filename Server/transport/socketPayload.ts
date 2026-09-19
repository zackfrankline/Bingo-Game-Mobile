export interface PlayerData {
  webSocket?: WebSocket;
  clientId: string;
  playerName: string;
}

export type GameStatus =
  | "NOT-STARTED"
  | "IN-PROGRESS"
  | "FINISHED"
  | "GAME-STARTED";
export type SocketEvents = "join-room" | "create-room" | "player-move";

export interface JoinGameCommand {
  type: "join-room";
  gameCode: string;
  player: PlayerData;
}

export interface CreateGameCommand {
  type: "create-room";
  gameCode: string;
  player: PlayerData;
}

export interface MakeMoveCommand {
  type: "player-move";
  gameCode: string;
  cellNumber: number; // 1 to 25
}

//populated player grid
export interface SubmitGridCommand {
  type: "initial-player-grid";
  gameCode: string;
  grid: Array<number>;
}

export type Result<T = void> =
  | {
      success: true;
      value?: T;
    }
  | {
      success: false;
      error: string;
      code: string;
    };

export type WebSocketEvent =
  | JoinGameCommand
  | CreateGameCommand
  | SubmitGridCommand
  | MakeMoveCommand;

export interface SocketResponse {
  message: string;
  status: string;
}

export interface GameEvent {
  event: string;
  gameCode: string;
  [key: string]: unknown;
}
