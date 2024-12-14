import { Component } from '@angular/core';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatButton, MatFabButton } from '@angular/material/button';
import {
  AsyncPipe,
  NgClass,
  NgIf,
  NgOptimizedImage,
  NgStyle,
} from '@angular/common';

class MyErrorStateMatcher extends ErrorStateMatcher {}

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
    MatButton,
    AsyncPipe,
    NgOptimizedImage,
    NgIf,
    NgStyle,
    NgClass,
    MatSuffix,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  emailFormControl: FormControl = new FormControl('');

  protected readonly FormControl = FormControl;
  matcher: ErrorStateMatcher = new MyErrorStateMatcher();
  profile: any = {};
  file: string = '';

  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      this.resetInput();
    }
  }
  resetInput() {
    const input = document.getElementById(
      'avatar-input-file'
    ) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }
}
