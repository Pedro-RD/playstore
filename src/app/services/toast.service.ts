import { Injectable } from '@angular/core';
import { Notification } from '../models';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    notifications: Notification[] = [];

    constructor() {}

    getNotifications() {
        return this.notifications;
    }

    newNotification(notification: Notification) {
        notification.timestamp = +new Date();
        this.notifications.push(notification);

        if (notification.type !== 'error') {
            setTimeout(() => {
                this.removeNotification(notification);
            }, 5000);
        }
    }

    removeNotification(notification: Notification) {
        const index: number = this.notifications.findIndex(
            (i) => notification.timestamp === i.timestamp
        );
        this.notifications[index].status = 'closed';
        setTimeout(() => {
            this.notifications.splice(index, 1);
        }, 500);
    }
}
