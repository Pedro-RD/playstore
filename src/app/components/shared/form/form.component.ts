import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX, faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [ReactiveFormsModule, FontAwesomeModule],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
})
export class FormComponent {
    @Input({ required: true }) title!: string;
    @Input({ required: true }) group!: FormGroup;

    @Output() submit: EventEmitter<void> = new EventEmitter<void>();

    onSubmit(): void {
        this.submit.emit();
    }

    // Icons
    faX = faX;
    faCheck = faCheck;
    faExclamation = faExclamation;
}
