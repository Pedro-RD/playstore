import { Component, Input } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { Game } from '../../../models';
import {
  MatCard,
  MatCardContent,
  MatCardLgImage,
  MatCardTitle,
  MatCardTitleGroup,
  MatCardSubtitle, MatCardActions,

} from '@angular/material/card';
import {MatAnchor} from '@angular/material/button';

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardLgImage,
    MatCardSubtitle,
    MatCardActions,
    MatAnchor
  ],
  templateUrl: './card-game.component.html',
  styleUrl: './card-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardGameComponent {
  @Input({ required: true }) game!: Game;

}
