import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {mergeMap, of, Subscription, tap} from 'rxjs';
import { GameDetails } from '../../models';
import { LoadingService } from '../../services/loading.service';
import { GamesService } from '../../services/games.service';
import { Logger } from '../../helpers/logger.helper';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [JsonPipe, MatCard, MatCardHeader, MatCardContent, MatCardImage, MatCardTitle],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss',
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  game?: GameDetails;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.subscriptions.push(this.loadGameDetails());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private loadGameDetails() {
    return this.route.params
      .pipe(
        tap((params) =>
          Logger.log(
            'GameDetailsComponent',
            'Loading game details',
            params['id']
          )
        ),
        mergeMap((params) => this.gamesService.getGameDetails(params['id']))
      )
      .subscribe({
        next: this.next,
        error: this.error,
      });
  }

  private next = (game: GameDetails) => {
    this.game = game;
  };
  private error = (error: any) => {
    // TODO
  };
  protected readonly of = of;
}
