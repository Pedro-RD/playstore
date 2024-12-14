import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormComponent } from '../shared/form/form.component';
import { InputComponent } from '../shared/input/input.component';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    faEnvelope,
    faLock,
    faUser,
    faImage,
    faPen,
} from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ProfileImageComponent } from '../profile-image/profile-image.component';

@Component({
    selector: 'app-form-user',
    standalone: true,
    imports: [
        FormComponent,
        InputComponent,
        ReactiveFormsModule,
        FontAwesomeModule,
        RouterModule,
        ProfileImageComponent,
    ],
    templateUrl: './form-user.component.html',
    styleUrl: './form-user.component.scss',
})
export class FormUserComponent implements OnInit {
    @Input() initialData?: User;
    @Output() formSubmit = new EventEmitter<User>();

    @Input() disabled: boolean = false;

    formGroup = new FormGroup(
        {
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
            ]),
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

            confirmPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255),
            ]),
            avatar: new FormControl('', [Validators.pattern(/^https?:\/\/.+/)]),
        },
        [
            () => {
                if (
                    this.formGroup?.value?.password !==
                    this.formGroup?.value?.confirmPassword
                ) {
                    this.formGroup?.controls?.confirmPassword?.setErrors({
                        passwordMismatch: true,
                    });
                    return { passwordMismatch: true };
                }
                return null;
            },
        ]
    );

    ngOnInit() {
        if (this.initialData) {
            this.formGroup.patchValue(this.initialData);
            this.formGroup.controls.confirmPassword.setValue(
                this.initialData.password
            );
        }
        if (this.disabled) {
            this.formGroup.disable();
        }
    }

    onSubmit() {
        this.trimValues();
        if (this.formGroup.valid) {
            this.formSubmit.emit({
                name: this.formGroup.value.name!,
                email: this.formGroup.value.email!,
                password: this.formGroup.value.password!,
                avatar: this.formGroup.value.avatar || undefined,
            });
        }
        this.formGroup.markAllAsTouched();
    }

    trimValues() {
        this.formGroup.setValue({
            name: this.formGroup.value.name?.trim() || '',
            email: this.formGroup.value.email?.trim() || '',
            password: this.formGroup.value.password?.trim() || '',
            confirmPassword: this.formGroup.value.confirmPassword?.trim() || '',
            avatar: this.formGroup.value.avatar?.trim() || '',
        });
    }

    get title() {
        if (this.disabled) {
            return 'Profile';
        }
        return this.initialData ? 'Edit Profile' : 'Register';
    }

    // Icons
    faUser = faUser;
    faEnvelope = faEnvelope;
    faLock = faLock;
    faImage = faImage;
    faPen = faPen;
}
