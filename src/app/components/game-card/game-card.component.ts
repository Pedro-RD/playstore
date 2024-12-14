import { Component, Input } from '@angular/core';
import { Game } from '../../models';
import { RouterModule } from '@angular/router';
import { GameUserActionsComponent } from '../game-user-actions/game-user-actions.component';

@Component({
    selector: 'app-game-card',
    standalone: true,
    imports: [RouterModule, GameUserActionsComponent],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
    @Input({ required: true }) game!: Game;
}
