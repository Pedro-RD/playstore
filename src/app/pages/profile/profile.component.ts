import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {AsyncPipe, JsonPipe, NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {Logger} from '../../helpers/logger.helper';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [JsonPipe,
    AsyncPipe,
    MatCardContent,
    MatCard,
    FormsModule,
    MatCardActions,
    MatButton,
    MatFormField,
    MatInput,
    MatIcon,
    MatSuffix,
    MatLabel,
    MatError,
    NgOptimizedImage,
    ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{
  edit = false;
  emailError: string | null = null;
  updatedAvatar: string | null = null;


  constructor(private authService: AuthService, private router: Router)  { }

  profileForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[^\\s]+$') // Disallow whitespace
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/)
    ]),
    avatar: new FormControl('', [
      Validators.pattern('(https?:\\/\\/.*\\.(?:png|jpg|jpeg))') // URL pattern for images
    ])
  });

  clearInput(controlName: string): void {
    const control = this.profileForm.get(controlName);
    if (control) {
      control.setValue('');
      control.markAsTouched();
    }
  }


  ngOnInit() {
    this.loadProfile();
  }

  loadProfile (): void {

  }


  get profile() {
    return this.authService.profile();
  }

  toggleEdit(): void {
    this.edit = !this.edit;
    console.log('Edit mode:', this.edit); // Log edit state
    if (!this.edit) {
      this.saveProfile();
    }
  }


  saveProfile(): void {
    if(this.profileForm.valid) {
      Logger.log('Profile Saved', this.profileForm.value);
    } else {
      Logger.error('Form is invalid')
    }
  }


  onPhotoChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.updatedAvatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    Logger.log('Form Submitted', this.profileForm.value);
  }

}
