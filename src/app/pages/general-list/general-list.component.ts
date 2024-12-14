import { Component } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameBarComponent } from '../../components/game-bar/game-bar.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';

@Component({
    selector: 'app-general-list',
    standalone: true,
    imports: [AsyncPipe, RouterModule, GameBarComponent, GameCardComponent],
    templateUrl: './general-list.component.html',
    styleUrl: './general-list.component.scss',
})
export class GeneralListComponent {
    constructor(private gamesService: GamesService) {}

    private subscriptions: Subscription[] = [];

    get games$() {
        return this.gamesService.games$;
    }
    ngOnInit(): void {
        this.subscriptions.push(this.gamesService.getAllGames().subscribe());
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }
}
