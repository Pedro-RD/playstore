import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../models';
import {
    faCheck,
    faX,
    faClock,
    faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { UserGamesService } from '../../services/user-games.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Logger } from '../../helpers/logger.helper';
import { mergeMap, Observable, of, Subscription } from 'rxjs';

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

    addToList(list: 'played' | 'completed' | 'playing' | 'playLater') {
        Logger.log('GameUserActionsComponent.addToList', list);
        this.subscriptions.push(
            this.userGamesService.addToList(`${this.game.id}`, list).subscribe(
                () => {
                    this.list = list;
                },
                (error) => {
                    Logger.error('GameUserActionsComponent.addToList', error);
                }
            )
        );
    }

    // Icons
    faCheck = faCheck;
    faX = faX;
    faClock = faClock;
    faGamepad = faGamepad;
}
