import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subscription } from 'rxjs';
import { GenresService } from '../../services/genres.service';
import { FiltersService } from '../../services/filters.service';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-genres-dropdown',
    standalone: true,
    imports: [FontAwesomeModule, AsyncPipe, NgClass],
    templateUrl: './genres-dropdown.component.html',
    styleUrl: './genres-dropdown.component.scss',
})
export class GenresDropdownComponent implements OnInit, OnDestroy {
    genres: string[] = [];
    subscriptions: Subscription[] = [];

    constructor(
        private genresService: GenresService,
        private filterService: FiltersService
    ) {}

    ngOnInit(): void {
        this.getGenres();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    private getGenres() {
        this.subscriptions.push(
            this.genresService.getAllGenres().subscribe((genres) => {
                this.genres = genres.map((genre) => genre.name);
            })
        );
    }

    get selectedGenre() {
        return this.filterService.filterGenre$;
    }

    filterByGenre(genre: string) {
        this.filterService.setFilterGenre(genre);
    }

    // Icons
    filterIcon = faFilter;
}
