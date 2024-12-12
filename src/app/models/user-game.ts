export interface UserGame {
  id: string;
  userId: string;
  games: GameRecord[];
}

export interface GameRecord {
  gameId: string;
  createDate: string;
}
