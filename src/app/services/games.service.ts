import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Game, UserGame } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly API_LIST = environment.apiUrl + 'gamesList';
  private readonly API_DETAIL = environment.apiUrl + 'gamesDetails';

  // Private Lists
  private readonly API_PLAYED = environment.apiUrl + 'usersListPlayed';
  private readonly API_COMPLETED = environment.apiUrl + 'usersListCompleted';
  private readonly API_PLAY_LATER = environment.apiUrl + 'usersListPlayLater';
  private readonly API_PLAYING =
    environment.apiUrl + 'usersListCurrentlyPlaying';

  constructor(private httpClient: HttpClient) {}

  private readonly games = new BehaviorSubject<Game[]>([]);
  readonly games$ = this.games.asObservable();

  getAllGames() {
    return this.httpClient.get<Game[]>(this.API_LIST).pipe(
      tap((games) => {
        this.games.next(games);
      })
    );
  }

  getGameDetails(id: number) {
    return this.httpClient.get<Game>(`${this.API_DETAIL}/${id}`);
  }
}
