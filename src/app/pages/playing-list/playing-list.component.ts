import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameBarComponent } from '../../components/game-bar/game-bar.component';
import { AsyncPipe } from '@angular/common';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { Subscription } from 'rxjs';
import { UserGamesService } from '../../services/user-games.service';

@Component({
    selector: 'app-playing-list',
    standalone: true,
    imports: [GameBarComponent, GameCardComponent, AsyncPipe],
    templateUrl: './playing-list.component.html',
    styleUrl: './playing-list.component.scss',
})
export class PlayingListComponent implements OnInit, OnDestroy {
    private readonly subscriptions: Subscription[] = [];
    constructor(private readonly userGamesService: UserGamesService) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.userGamesService.getPlayingGames().subscribe()
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    get playingGames$() {
        return this.userGamesService.filteredPlayingGames$;
    }
}
