import { Component } from '@angular/core';
import {MatError, MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton, MatFabButton} from '@angular/material/button';

class MyErrorStateMatcher extends ErrorStateMatcher {
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatError,
    MatHint,
    MatIcon,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatFabButton,
    MatButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  emailFormControl: FormControl = new FormControl('');

  protected readonly FormControl = FormControl;
  matcher: ErrorStateMatcher = new MyErrorStateMatcher();

  clickEvent($event: MouseEvent) {

  }
}
