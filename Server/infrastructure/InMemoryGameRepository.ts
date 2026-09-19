import { Game } from "../domain/Game";
import { GameRepository } from "./GameRepository";

export class InMemoryGameRepository implements GameRepository {
  private readonly games = new Map<string, Game>();

  findByCode(gameCode: string): Game | undefined {
      return this.games.get(gameCode);
  }

  save(game: Game){
    this.games.set(game.getGameCode(), game);
  }

  delete(gameCode: string): void {
      this.games.delete(gameCode);
  }
}
