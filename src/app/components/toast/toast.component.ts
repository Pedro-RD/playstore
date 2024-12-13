import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Notification } from '../../models';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  constructor(private toastService: ToastService) {}

  notifications: Notification[] = [];

  ngOnInit() {
    this.notifications = this.toastService.getNotifications();
  }

  closeNotification(notification: Notification) {
    this.toastService.removeNotification(notification);
  }
}
