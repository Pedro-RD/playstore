import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Notification } from '../../models';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
    imports: [
        NgForOf,
        NgClass
    ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  constructor(private toastService: ToastService) {}

  notifications: Notification[] = [];

    trackByTimestamp(index: number, item: Notification): number {
        return <number>item.timestamp;
    }

  ngOnInit() {
    this.notifications = this.toastService.getNotifications();
  }

  closeNotification(notification: Notification) {
    this.toastService.removeNotification(notification);
  }

    getBulmaClass(type: 'success' | 'warning' | 'error' | 'info' | 'normal'): string {
        switch (type) {
            case 'success':
                return 'is-success';
            case 'warning':
                return 'is-warning';
            case 'error':
                return 'is-danger';
            case 'info':
                return 'is-info';
            case 'normal':
            default:
                return 'is-primary';
        }
    }
}
