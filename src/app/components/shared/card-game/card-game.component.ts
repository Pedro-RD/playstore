import { Component, Input } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { Game } from '../../../models';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatCardTitle
  ],
  templateUrl: './card-game.component.html',
  styleUrl: './card-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardGameComponent {
  @Input({ required: true }) game!: Game;
}
