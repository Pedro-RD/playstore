import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormUserComponent } from '../../components/form-user/form-user.component';
import { User } from '../../models';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Logger } from '../../helpers/logger.helper';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormUserComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private isRequesting = false;

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.authService.isLogged().subscribe((isLogged) => {
                if (isLogged) {
                    this.router.navigate(['']);
                }
            })
        );
    }

    onFormSubmit(user: User) {
        Logger.log('RegisterComponent', 'onFormSubmit', user);
        if (this.isRequesting) {
            return;
        }
        this.isRequesting = true;
        this.subscriptions.push(
            this.authService.registerUser(user).subscribe({
                next: () => this.handleSuccess(),
                error: () => (this.isRequesting = false),
            })
        );
    }

    private handleSuccess() {
        this.isRequesting = false;
        this.router.navigate(['']);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
