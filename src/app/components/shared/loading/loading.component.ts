import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../../services/loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  constructor(private loadingService: LoadingService) {}
  get loading$() {
    return this.loadingService.loading$;
  }
}
