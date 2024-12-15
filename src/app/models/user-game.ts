import { User } from './user';

export interface UserGame {
    id?: string;
    userId: string;
    games: GameRecord[];
    user?: User;
}

export interface GameRecord {
    gameId: string;
    createDate: string;
}
