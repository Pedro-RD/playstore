import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
import { Game, GameDetails } from '../models';
import { FiltersService } from './filters.service';

@Injectable({
    providedIn: 'root',
})
export class GamesService {
    private readonly API_LIST = environment.apiUrl + 'gamesList';
    private readonly API_DETAIL = environment.apiUrl + 'gameDetails';

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

    getGameDetails(id: number | string) {
        return this.httpClient.get<GameDetails>(`${this.API_DETAIL}/${id}`);
    }

    private createUrl(): Observable<string> {
        return this.filtersService.url.pipe(
            map((query) => this.API_LIST + query)
        );
    }

    getGameById(id: number | string) {
        return this.httpClient
            .get<Game[]>(`${this.API_LIST}?id=${id}`)
            .pipe(map((games) => games[0]));
    }
}
