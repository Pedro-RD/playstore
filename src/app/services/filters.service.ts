import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FiltersService {
    private readonly filterTitle = new BehaviorSubject<string>('');
    private readonly filterPlatform = new BehaviorSubject<string>('');
    private readonly filterGenre = new BehaviorSubject<string>('');
    private readonly sort = new BehaviorSubject<string>('');

    readonly filterTitle$ = this.filterTitle.asObservable();
    readonly filterPlatform$ = this.filterPlatform.asObservable();
    readonly filterGenre$ = this.filterGenre.asObservable();
    readonly sort$ = this.sort.asObservable();

    resetFilters() {
        this.filterTitle.next('');
        this.filterPlatform.next('');
        this.filterGenre.next('');
        this.sort.next('');
    }

    setFilterTitle(title: string) {
        this.filterTitle.next(title);
    }

    setFilterPlatform(platform: string) {
        this.filterPlatform.next(platform);
    }

    setFilterGenre(genre: string) {
        this.filterGenre.next(genre);
    }

    setSort(sort: string) {
        if (sort === this.sort.value) {
            this.sort.next('-' + sort);
        } else {
            this.sort.next(sort);
        }
    }

    filters = combineLatest([
        this.filterTitle$,
        this.filterPlatform$,
        this.filterGenre$,
        this.sort$,
    ]);

    url = this.filters.pipe(
        map(([title, platform, genre, sort]) => {
            let url = `?`;

            if (title) {
                url += `title=${title}&`;
            }

            if (platform) {
                url += `platform=${platform}&`;
            }

            if (genre) {
                url += `genre=${genre}&`;
            }

            if (sort) {
                url += `_sort=${sort}&`;
            }
            return url;
        })
    );
}
