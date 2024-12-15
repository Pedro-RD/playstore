import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { GamesService } from './games.service';
import { FiltersService } from './filters.service';
import { environment } from '../../environments/environment';
import {
    BehaviorSubject,
    combineLatest,
    map,
    merge,
    mergeMap,
    Observable,
    of,
    tap,
} from 'rxjs';
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

    // Played Games
    private readonly playedGamesSubject = new BehaviorSubject<Game[]>([]);
    playedGames$ = this.playedGamesSubject.asObservable();

    get filteredPlayedGames$() {
        return this.filtersService.filters.pipe(
            mergeMap(this.mapGames(this.playedGames$))
        );
    }

    getPlayedGames() {
        return this.requestGames(this.API_PLAYED + this.getUserId()).pipe(
            tap((games) => {
                Logger.warn('UserGamesService.getPlayedGames', games);
                this.playedGamesSubject.next(games);
            })
        );
    }

    // Completed Games
    private readonly completedGamesSubject = new BehaviorSubject<Game[]>([]);
    completedGames$ = this.completedGamesSubject.asObservable().pipe(
        tap((games) => {
            Logger.warn('UserGamesService.completedGames$', games);
        })
    );

    get filteredCompletedGames$() {
        return this.filtersService.filters.pipe(
            mergeMap(this.mapGames(this.completedGames$))
        );
    }

    getCompletedGames() {
        return this.requestGames(this.API_COMPLETED + this.getUserId()).pipe(
            tap((games) => {
                Logger.warn('UserGamesService.getCompletedGames', games);
                this.completedGamesSubject.next(games);
            })
        );
    }

    // Play Later Games

    private readonly playLaterGamesSubject = new BehaviorSubject<Game[]>([]);
    playLaterGames$ = this.playLaterGamesSubject.asObservable();

    get filteredPlayLaterGames$() {
        return this.filtersService.filters.pipe(
            mergeMap(this.mapGames(this.playLaterGames$))
        );
    }

    getPlayLaterGames() {
        return this.requestGames(this.API_PLAY_LATER + this.getUserId()).pipe(
            tap((games) => {
                Logger.warn('UserGamesService.getPlayLaterGames', games);
                this.playLaterGamesSubject.next(games);
            })
        );
    }

    // Playing Games

    private readonly playingGamesSubject = new BehaviorSubject<Game[]>([]);
    playingGames$ = this.playingGamesSubject.asObservable();

    get filteredPlayingGames$() {
        return this.filtersService.filters.pipe(
            mergeMap(this.mapGames(this.playingGames$))
        );
    }

    getPlayingGames() {
        return this.requestGames(this.API_PLAYING + this.getUserId()).pipe(
            tap((games) => {
                Logger.warn('UserGamesService.getPlayingGames', games);
                this.playingGamesSubject.next(games);
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

    // Auxiliary functions
    private mapGames =
        (subj: Observable<Game[]>) =>
        ([title, platform, genre, sort]: string[]) => {
            return subj.pipe(
                map((games) =>
                    games
                        .filter(this.filterGames(title, platform, genre))
                        .sort(this.sortGames(sort))
                )
            );
        };

    private filterGames =
        (title: string, platform: string, genre: string) => (game: Game) => {
            return (
                game.title.toLowerCase().includes(title.toLowerCase()) &&
                game.platform.toLowerCase().includes(platform.toLowerCase()) &&
                game.genre.toLowerCase().includes(genre.toLowerCase())
            );
        };

    private sortGames = (sort: string) => (a: Game, b: Game) => {
        if (sort === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sort === '-title') {
            return b.title.localeCompare(a.title);
        } else if (sort === 'release_date') {
            return a.release_date.localeCompare(b.release_date);
        } else if (sort === '-release_date') {
            return b.release_date.localeCompare(a.release_date);
        }
        return 0;
    };

    private requestGames(url: string) {
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
            })
        );
    }
}
