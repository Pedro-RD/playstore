import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  map,
  mergeMap,
  Observable,
  tap,
} from 'rxjs';
import { Game, GameDetails } from '../models';
import { ToastService } from './toast.service';
import { FiltersService } from './filters.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly API_LIST = environment.apiUrl + 'gamesList';
  private readonly API_DETAIL = environment.apiUrl + 'gameDetails';

  // Private Lists
  private readonly API_PLAYED = environment.apiUrl + 'usersListPlayed';
  private readonly API_COMPLETED = environment.apiUrl + 'usersListCompleted';
  private readonly API_PLAY_LATER = environment.apiUrl + 'usersListPlayLater';
  private readonly API_PLAYING =
    environment.apiUrl + 'usersListCurrentlyPlaying';

  constructor(
    private httpClient: HttpClient,
    private filtersService: FiltersService
  ) {}

  private readonly games = new BehaviorSubject<Game[]>([]);
  readonly games$ = this.games.asObservable();

  getAllGames() {
    return this.createUrl().pipe(
      mergeMap((url) => this.httpClient.get<Game[]>(url)),
      tap((games) => {
        this.games.next(games);
      })
    );
  }

  getGameDetails(id: number) {
    return this.httpClient.get<GameDetails>(`${this.API_DETAIL}/${id}`);
  }

  private createUrl(): Observable<string> {
    return combineLatest([
      this.filtersService.filterTitle$,
      this.filtersService.filterPlatform$,
      this.filtersService.filterGenre$,
      this.filtersService.sort$,
    ]).pipe(
      map(([title, platform, genre, sort]) => {
        let url = `${this.API_LIST}?`;

        if (title) {
          url += `title=${title}&`;
        }

        if (platform) {
          url += `platform=${platform}&`;
        }

        if (genre) {
          url += `genre=${genre}&`;
        }

        if (sort) {
          url += `_sort=${sort}&`;
        }
        return url;
      })
    );
  }
}
