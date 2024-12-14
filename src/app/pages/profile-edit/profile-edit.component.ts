import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models';
import { FormUserComponent } from '../../components/form-user/form-user.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-profile-edit',
    standalone: true,
    imports: [FormUserComponent, AsyncPipe],
    templateUrl: './profile-edit.component.html',
    styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent implements OnDestroy {
    private isRequesting = false;

    subscriptions: Subscription[] = [];

    constructor(private authService: AuthService, private router: Router) {}

    get profile() {
        return this.authService.profile().pipe(
            tap((user) => {
                if (!user) {
                    this.router.navigate(['/login']);
                }
            }),
            take(1)
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    saveProfile(user: User) {
        if (this.isRequesting) {
            return;
        }
        this.isRequesting = true;
        this.subscriptions.push(
            this.authService.updateProfile(user).subscribe({
                next: () => this.handleSuccess(),
                complete: () => (this.isRequesting = false),
            })
        );
    }

    private handleSuccess() {
        this.isRequesting = false;
        this.router.navigate(['/profile']);
    }
}
