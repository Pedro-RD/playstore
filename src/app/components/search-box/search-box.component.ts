import { Component, OnDestroy, OnInit } from '@angular/core';
import { FiltersService } from '../../services/filters.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription, tap } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-search-box',
    standalone: true,
    imports: [FontAwesomeModule, ReactiveFormsModule, NgClass],
    templateUrl: './search-box.component.html',
    styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
    searchControl = new FormControl('');
    subscriptions: Subscription[] = [];
    loading = false;

    constructor(private filtersService: FiltersService) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.searchControl.valueChanges
                .pipe(
                    tap(() => (this.loading = true)),
                    debounceTime(300),
                    distinctUntilChanged()
                )
                .subscribe((value) => {
                    this.loading = false;
                    this.filtersService.setFilterTitle(value || '');
                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    // Icons
    faSearch = faSearch;
}
