import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { GameBarComponent } from '../../components/game-bar/game-bar.component';
import { Subscription } from 'rxjs';
import { UserGamesService } from '../../services/user-games.service';

@Component({
    selector: 'app-completed-list',
    standalone: true,
    imports: [GameBarComponent, GameCardComponent, AsyncPipe],
    templateUrl: './completed-list.component.html',
    styleUrl: './completed-list.component.scss',
})
export class CompletedListComponent implements OnInit, OnDestroy {
    private readonly subscriptions: Subscription[] = [];
    constructor(private readonly userGamesService: UserGamesService) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.userGamesService.getCompletedGames().subscribe()
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    get completedGames$() {
        return this.userGamesService.filteredCompletedGames$;
    }
}
