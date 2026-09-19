import {Game} from '../domain/Game'

export interface GameRepository{
    findByCode(gameCode: string): Game | undefined;
    save(game: Game):void;
    delete(gameCode: string) : void;
}