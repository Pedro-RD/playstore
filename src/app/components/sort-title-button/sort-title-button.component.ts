import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faSortAlphaAsc,
    faSortAlphaDesc,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FiltersService } from '../../services/filters.service';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
    selector: 'app-sort-title-button',
    standalone: true,
    imports: [FontAwesomeModule, NgClass, AsyncPipe],
    templateUrl: './sort-title-button.component.html',
    styleUrl: './sort-title-button.component.scss',
})
export class SortTitleButtonComponent {
    constructor(private filterService: FiltersService) {}

    get isSortedByTitle() {
        return this.filterService.sort$.pipe(
            map((filter) => filter.includes('title'))
        );
    }

    private get isAscending() {
        return this.filterService.sort$.pipe(
            map((filter) => !filter.includes('title') || !filter.includes('-'))
        );
    }

    orderByTitle() {
        this.filterService.setSort('title');
    }

    get icon(): Observable<IconDefinition> {
        return this.isAscending.pipe(
            map((isAscending) => {
                return isAscending
                    ? this.alphabetAscIcon
                    : this.alphabetDescIcon;
            })
        );
    }

    // Icons
    alphabetAscIcon = faSortAlphaAsc;
    alphabetDescIcon = faSortAlphaDesc;
}
