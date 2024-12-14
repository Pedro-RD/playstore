import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private readonly loading = new BehaviorSubject<boolean>(false);
    readonly loading$ = this.loading.asObservable();

    show(): void {
        this.loading.next(true);
    }

    hide(): void {
        this.loading.next(false);
    }
}
