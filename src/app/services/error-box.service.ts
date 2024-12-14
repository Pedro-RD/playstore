import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorBox } from '../models';

@Injectable({
    providedIn: 'root',
})
export class ErrorBoxService {
    private readonly errorSubject = new BehaviorSubject<ErrorBox | null>(null);
    readonly error$ = this.errorSubject.asObservable();

    setError(title: string, message: string) {
        this.errorSubject.next({ title, message });
    }

    clearError() {
        this.errorSubject.next(null);
    }
}
