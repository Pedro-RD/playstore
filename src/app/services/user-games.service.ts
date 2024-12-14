import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { GamesService } from './games.service';
import { FiltersService } from './filters.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject, combineLatest, mergeMap, of, tap } from 'rxjs';
import { Game, UserGame } from '../models';
import { ErrorBoxService } from './error-box.service';
import { Logger } from '../helpers/logger.helper';

@Injectable({
    providedIn: 'root',
})
export class UserGamesService {
    private readonly API_PLAYED = this.createUrl('usersListPlayed');
    private readonly API_COMPLETED = this.createUrl('usersListCompleted');
    private readonly API_PLAY_LATER = this.createUrl('usersListPlayLater');
    private readonly API_PLAYING = this.createUrl('usersListCurrentlyPlaying');

    constructor(
        private readonly httpClient: HttpClient,
        private readonly authService: AuthService,
        private readonly gamesService: GamesService,
        private readonly filtersService: FiltersService,
        private readonly toastService: ToastService,
        private readonly errorService: ErrorBoxService
    ) {}

    private readonly playedGamesSubject = new BehaviorSubject<Game[]>([]);
    playedGames$ = this.playedGamesSubject.asObservable();

    getPlayedGames() {
        const url = this.API_PLAYED + this.getUserId();
        return this.httpClient.get<UserGame[]>(url).pipe(
            tap((userGames) => {
                Logger.warn('UserGamesService.getPlayedGames', userGames);
            }),
            mergeMap((userGames) => {
                if (userGames.length === 0) return of([]);

                return combineLatest(
                    userGames[0].games.map((game) => {
                        return this.gamesService.getGameById(game.gameId);
                    })
                );
            }),
            tap((games) => {
                Logger.warn('UserGamesService.getPlayedGames', games);
                this.playedGamesSubject.next(games);
            })
        );
    }

    // helper functions
    private createUrl(list: string): string {
        return `${environment.apiUrl}${list}?userId=`;
    }

    getUserId(): string | undefined {
        const userID = this.authService.getUserId();
        if (!userID) {
            this.errorService.setError(
                'User ID not found',
                'Please log in to view your games.'
            );
        }
        return userID;
    }
}
