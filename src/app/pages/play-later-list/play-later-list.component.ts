import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameBarComponent } from '../../components/game-bar/game-bar.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserGamesService } from '../../services/user-games.service';

@Component({
    selector: 'app-play-later-list',
    standalone: true,
    imports: [GameBarComponent, GameCardComponent, AsyncPipe],
    templateUrl: './play-later-list.component.html',
    styleUrl: './play-later-list.component.scss',
})
export class PlayLaterListComponent implements OnInit, OnDestroy {
    private readonly subscriptions: Subscription[] = [];
    constructor(private readonly userGamesService: UserGamesService) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.userGamesService.getPlayLaterGames().subscribe()
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    get playLaterGames$() {
        return this.userGamesService.filteredPlayLaterGames$;
    }
}
