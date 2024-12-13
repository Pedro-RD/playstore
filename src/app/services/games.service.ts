import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Game, GameDetails, UserGame } from '../models';
import { ToastService } from './toast.service';

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
    return this.httpClient.get<Game[]>(this.API_LIST).pipe(
      tap((games) => {
        this.games.next(games);
      })
    );
  }

  getGameDetails(id: number) {
    return this.httpClient.get<GameDetails>(`${this.API_DETAIL}/${id}`);
  }
}
