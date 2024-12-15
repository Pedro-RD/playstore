import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserGamesService } from '../../services/user-games.service';
import { Subscription } from 'rxjs';
import { GameBarComponent } from '../../components/game-bar/game-bar.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-played-list',
    standalone: true,
    imports: [GameBarComponent, GameCardComponent, AsyncPipe],
    templateUrl: './played-list.component.html',
    styleUrl: './played-list.component.scss',
})
export class PlayedListComponent implements OnInit, OnDestroy {
    private readonly subscriptions: Subscription[] = [];
    constructor(private readonly userGamesService: UserGamesService) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.userGamesService.getPlayedGames().subscribe()
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    get playedGames$() {
        return this.userGamesService.filteredPlayedGames$;
    }
}
