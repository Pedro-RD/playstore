// import { Game } from './game'; Verificar nested json-server
import { User } from './user';

export interface UserGame {
  id: string;
  userId: string;
  games: GameRecord[];
  user?: User;
}

export interface GameRecord {
  // game?: Game;
  gameId: string;
  createDate: string;
}
