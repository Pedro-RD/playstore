import { Component } from '@angular/core';
import { GeneralListComponent } from '../general-list/general-list.component';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [GeneralListComponent],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss',
})
export class GameDetailsComponent {}
