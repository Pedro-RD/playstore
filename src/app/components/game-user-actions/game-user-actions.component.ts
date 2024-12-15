import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../models';
import {
    faCheck,
    faX,
    faClock,
    faGamepad,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { UserGamesService } from '../../services/user-games.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Logger } from '../../helpers/logger.helper';
import { mergeMap, Observable, of, Subscription, tap } from 'rxjs';

@Component({
    selector: 'app-game-user-actions',
    standalone: true,
    imports: [AsyncPipe, FontAwesomeModule, NgClass],
    templateUrl: './game-user-actions.component.html',
    styleUrl: './game-user-actions.component.scss',
})
export class GameUserActionsComponent implements OnInit, OnDestroy {
    @Input({ required: true }) game!: Game;
    subscriptions: Subscription[] = [];

    list: string = '';

    constructor(
        private readonly authService: AuthService,
        private readonly userGamesService: UserGamesService
    ) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.authService
                .isLogged()
                .pipe(
                    mergeMap((logged): Observable<string> => {
                        if (logged) {
                            return this.userGamesService.isGameListed(
                                `${this.game.id}`
                            );
                        }
                        return of('');
                    })
                )
                .subscribe((list) => {
                    this.list = list;
                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    get isLogged() {
        return this.authService.isLogged();
    }

    handleClick(list: 'played' | 'completed' | 'playing' | 'playLater') {
        Logger.log('GameUserActionsComponent.addToList', list);

        this.subscriptions.push(
            (list === this.list
                ? this.removeFromList(list)
                : this.addToList(list)
            ).subscribe({
                error: (error) => {
                    Logger.error('GameUserActionsComponent.addToList', error);
                },
            })
        );
    }

    addToList(list: 'played' | 'completed' | 'playing' | 'playLater') {
        return this.userGamesService.addToList(`${this.game.id}`, list).pipe(
            tap(() => {
                this.list = list;
            })
        );
    }

    removeFromList(list: 'played' | 'completed' | 'playing' | 'playLater') {
        return this.userGamesService
            .removeFromList(`${this.game.id}`, list)
            .pipe(
                tap(() => {
                    this.list = '';
                })
            );
    }

    // Icons
    faCheck = faCheck;
    faX = faX;
    faClock = faClock;
    faGamepad = faGamepad;
    faTrash = faTrash;
}
