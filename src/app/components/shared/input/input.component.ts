import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faCheck,
    faExclamation,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [FontAwesomeModule, ReactiveFormsModule, NgClass],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
})
export class InputComponent {
    _control!: AbstractControl;

    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Input() label: string = '';
    @Input() icon?: IconDefinition;

    @Input({ required: true })
    set control(control: AbstractControl) {
        this._control = control;
    }

    get control(): FormControl {
        return this._control as FormControl;
    }

    // icons
    faCheck = faCheck;
    faExclamation = faExclamation;
}
