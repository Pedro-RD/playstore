import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  map,
  merge,
  mergeMap,
  Observable,
  tap,
} from 'rxjs';
import { Game, GameDetails, UserGame } from '../models';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  // Filters and Sorts
  private readonly filterTitle = new BehaviorSubject<string>('');
  private readonly filterPlatform = new BehaviorSubject<string>('');
  private readonly filterGenre = new BehaviorSubject<string>('');
  private readonly sort = new BehaviorSubject<string>('');

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
    private toastService: ToastService
  ) {}

  /* TODO
    Deve ser possível o utilizador pesquisar por um título (a API permite pesquisa por um atributo; NOTA: A API de testes só permite pesquisar por um nome/valor completo!).
    Deve ser possível o utilizador filtrar os jogos por plataforma e género (existe um objeto na API que lista todas as plataformas e géneros; a API permite pesquisa por um atributo).
    Deve ser possível o utilizador ordenar a lista por ordem alfabética dos títulos e data de lançamento (a API permite a ordenação por um atributo).
  */

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

  // Filters and Sorts Functions
  resetFilters() {
    this.filterTitle.next('');
    this.filterPlatform.next('');
    this.filterGenre.next('');
    this.sort.next('');
  }

  setFilterTitle(title: string) {
    this.filterTitle.next(title);
  }

  setFilterPlatform(platform: string) {
    this.filterPlatform.next(platform);
  }

  setFilterGenre(genre: string) {
    this.filterGenre.next(genre);
  }

  setSort(sort: string) {
    this.sort.next(sort);
  }

  private createUrl(): Observable<string> {
    return combineLatest([
      this.filterTitle,
      this.filterPlatform,
      this.filterGenre,
      this.sort,
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
