import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorBoxService } from '../../services/error-box.service';

@Component({
    selector: 'app-error-modal',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './error-modal.component.html',
    styleUrl: './error-modal.component.scss',
})
export class ErrorModalComponent {
    constructor(private errorService: ErrorBoxService) {}

    get error$() {
        return this.errorService.error$;
    }

    close() {
        this.errorService.clearError();
    }
}
