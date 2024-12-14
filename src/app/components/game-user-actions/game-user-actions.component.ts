import { Component, Input } from '@angular/core';
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

@Component({
    selector: 'app-game-user-actions',
    standalone: true,
    imports: [AsyncPipe, FontAwesomeModule],
    templateUrl: './game-user-actions.component.html',
    styleUrl: './game-user-actions.component.scss',
})
export class GameUserActionsComponent {
    @Input({ required: true }) game!: Game;

    constructor(
        private readonly authService: AuthService,
        private readonly userGamesService: UserGamesService
    ) {}

    get isLogged() {
        return this.authService.isLogged();
    }

    // Icons
    faCheck = faCheck;
    faX = faX;
    faClock = faClock;
    faGamepad = faGamepad;
}
