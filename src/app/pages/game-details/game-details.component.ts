import { Component } from '@angular/core';
import { GameDetails } from '../../models';
import { mergeMap, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'app-game-details',
    standalone: true,
    imports: [],
    templateUrl: './game-details.component.html',
    styleUrl: './game-details.component.scss',
})
export class GameDetailsComponent {
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
                mergeMap((params) =>
                    this.gamesService.getGameDetails(params['id'])
                )
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
}
