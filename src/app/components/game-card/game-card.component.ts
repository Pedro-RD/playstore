import { Component, Input } from '@angular/core';
import { Game } from '../../models';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-game-card',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
    @Input({ required: true }) game!: Game;
}
