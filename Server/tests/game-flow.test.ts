import { io as createClient, Socket } from "socket.io-client";
import { Games, startServer } from "../index";

describe("game creation and grid setup", () => {
  let server: ReturnType<typeof startServer>;
  let serverUrl: string;
  let playerOne: Socket;
  let playerTwo: Socket;

  beforeAll(async () => {
    server = startServer(0);
    await new Promise<void>((resolve) => server.once("listening", resolve));

    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Test server did not expose a TCP address");
    }
    serverUrl = `http://localhost:${address.port}`;
  });

  afterEach(() => {
    playerOne?.disconnect();
    playerTwo?.disconnect();
    Games.clear();
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  function connect(socket: Socket) {
    return new Promise<void>((resolve, reject) => {
      socket.once("connect", () => resolve());
      socket.once("connect_error", reject);
    });
  }

  function waitForMessage(socket: Socket, expectedEvent: string) {
    return new Promise<Record<string, unknown>>((resolve) => {
      socket.on("message", (message: string) => {
        const envelope = JSON.parse(message) as {
          data: Record<string, unknown>;
        };
        if (envelope.data.event === expectedEvent) {
          resolve(envelope.data);
        }
      });
    });
  }

  it("allows one player to create a game and another to join with both grids", async () => {
    const gameCode = "TEST-123";
    const gridOne = Array.from({ length: 25 }, (_, index) => index + 1);
    const gridTwo = [...gridOne].reverse();

    playerOne = createClient(serverUrl);
    playerTwo = createClient(serverUrl);
    await Promise.all([connect(playerOne), connect(playerTwo)]);

    const createAcknowledgement = new Promise<Record<string, string>>(
      (resolve) => {
        playerOne.emit(
          "message",
          {
            type: "create-room",
            gameCode,
            player: {
              clientId: "player-one",
              playerName: "Player One",
            },
          },
          resolve,
        );
      },
    );

    await expect(createAcknowledgement).resolves.toMatchObject({
      status: "CREATED",
    });

    const gameStarted = waitForMessage(playerOne, "GAME-STARTED");
    const joinAcknowledgement = new Promise<Record<string, string>>(
      (resolve) => {
        playerTwo.emit(
          "message",
          {
            type: "join-room",
            gameCode,
            player: {
              clientId: "player-two",
              playerName: "Player Two",
            },
          },
          resolve,
        );
      },
    );

    await expect(joinAcknowledgement).resolves.toMatchObject({
      status: "JOINED",
    });

    playerOne.emit("message", {
      type: "initial-player-grid",
      gameCode,
      grid: gridOne,
    });
    playerTwo.emit("message", {
      type: "initial-player-grid",
      gameCode,
      grid: gridTwo,
    });

    await expect(gameStarted).resolves.toMatchObject({
      event: "GAME-STARTED",
      gameCode,
      status: "GAME-STARTED",
      players: ["player-one", "player-two"],
      currentPlayer: "player-one",
    });

    const game = Games.get(gameCode);
    expect(game?.getStatus()).toBe("GAME-STARTED");
    expect(game?.getPlayerGridMap().size).toBe(2);
    expect([...gridOne, ...gridTwo]).toEqual(
      expect.arrayContaining(Array.from({ length: 25 }, (_, index) => index + 1)),
    );
  });
});