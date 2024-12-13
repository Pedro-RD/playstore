import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardGameComponent } from '../../components/shared/card-game/card-game.component';
import { GamesService } from '../../services/games.service';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-general-list',
  standalone: true,
  imports: [CardGameComponent, AsyncPipe],
  templateUrl: './general-list.component.html',
  styleUrl: './general-list.component.scss',
})
export class GeneralListComponent implements OnInit, OnDestroy {
  constructor(private gamesService: GamesService) {}
  private subscriptions: Subscription[] = [];

  get games$() {
    return this.gamesService.games$;
  }
  ngOnInit(): void {
    this.subscriptions.push(this.gamesService.getAllGames().subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
