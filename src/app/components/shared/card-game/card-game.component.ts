import { Component, Input } from '@angular/core';
import { Game } from '../../../models';

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [],
  templateUrl: './card-game.component.html',
  styleUrl: './card-game.component.scss',
})
export class CardGameComponent {
  @Input({ required: true }) game!: Game;
}
