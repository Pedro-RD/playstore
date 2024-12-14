import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss',
})
export class LoadingComponent {
    constructor(private loadingService: LoadingService) {}

    get loading$() {
        return this.loadingService.loading$;
    }
}
