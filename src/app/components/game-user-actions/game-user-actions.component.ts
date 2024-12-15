import { Component, Input, OnDestroy } from '@angular/core';
import { Game } from '../../models';
import {
    faCheck,
    faX,
    faClock,
    faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { UserGamesService } from '../../services/user-games.service';
import { AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Logger } from '../../helpers/logger.helper';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-game-user-actions',
    standalone: true,
    imports: [AsyncPipe, FontAwesomeModule],
    templateUrl: './game-user-actions.component.html',
    styleUrl: './game-user-actions.component.scss',
})
export class GameUserActionsComponent implements OnDestroy {
    @Input({ required: true }) game!: Game;
    subscriptions: Subscription[] = [];

    constructor(
        private readonly authService: AuthService,
        private readonly userGamesService: UserGamesService
    ) {}

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    get isLogged() {
        return this.authService.isLogged();
    }

    addToList(list: 'played' | 'completed' | 'playing' | 'playLater') {
        Logger.log('GameUserActionsComponent.addToList', list);
        this.subscriptions.push(
            this.userGamesService.addToList(`${this.game.id}`, list).subscribe()
        );
    }

    // Icons
    faCheck = faCheck;
    faX = faX;
    faClock = faClock;
    faGamepad = faGamepad;
}
