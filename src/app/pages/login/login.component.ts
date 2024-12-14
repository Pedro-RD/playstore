import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputComponent } from '../../components/shared/input/input.component';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormComponent } from '../../components/shared/form/form.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [InputComponent, ReactiveFormsModule, FormComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    isRequesting = false;

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    formGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(255),
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(255),
        ]),
    });

    login() {
        this.trimValues();
        if (this.formGroup.valid && !this.isRequesting) {
            this.isRequesting = true;
            this.subscriptions.push(
                this.authService
                    .login(
                        this.formGroup.controls.email.value!,
                        this.formGroup.controls.password.value!
                    )
                    .subscribe({
                        next: () => this.handleRequestSuccess(),
                        complete: () => (this.isRequesting = false),
                        error: () => (this.isRequesting = false),
                    })
            );
        } else this.formGroup.markAllAsTouched();
    }

    private handleRequestSuccess() {
        this.isRequesting = false;
        this.router.navigate(['/']);
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.authService.isLogged().subscribe((isLogged) => {
                if (isLogged) {
                    this.router.navigate(['/']);
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.isRequesting = false;
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    private trimValues() {
        this.formGroup.controls.email.setValue(
            this.formGroup.controls?.email?.value?.trim() || ''
        );

        this.formGroup.controls.password.setValue(
            this.formGroup.controls?.password?.value?.trim() || ''
        );
    }

    // Icons
    faEnvelope = faEnvelope;
    faLock = faLock;
}
