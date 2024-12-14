import { AsyncPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faCalendarMinus,
    faCalendarPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FiltersService } from '../../services/filters.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-sort-date-button',
    standalone: true,
    imports: [FontAwesomeModule, AsyncPipe, NgClass],
    templateUrl: './sort-date-button.component.html',
    styleUrl: './sort-date-button.component.scss',
})
export class SortDateButtonComponent {
    constructor(private filterService: FiltersService) {}

    get isSortedByDate() {
        return this.filterService.sort$.pipe(
            map((filter) => filter.includes('release_date'))
        );
    }

    get isAscending() {
        return this.filterService.sort$.pipe(
            map(
                (filter) =>
                    !filter.includes('release_date') || !filter.includes('-')
            )
        );
    }

    orderByDate() {
        this.filterService.setSort('release_date');
    }

    get icon() {
        return this.isAscending.pipe(
            map((isAscending) => {
                return isAscending ? this.dateAscIcon : this.dateDescIcon;
            })
        );
    }

    // Icons
    dateAscIcon = faCalendarPlus;
    dateDescIcon = faCalendarMinus;
}
