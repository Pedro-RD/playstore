import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Game } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly API = environment.apiUrl + 'gamesList';
  constructor(private httpClient: HttpClient) {}

  private readonly games = new BehaviorSubject<Game[]>([]);
  readonly games$ = this.games.asObservable();

  getGames() {
    return this.httpClient.get<Game[]>(this.API).pipe(
      tap((games) => {
        this.games.next(games);
      })
    );
  }
}
