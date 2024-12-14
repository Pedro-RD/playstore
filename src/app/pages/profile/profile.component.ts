import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {Logger} from '../../helpers/logger.helper';
import {Router} from '@angular/router';
import {User} from '../../models';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    JsonPipe,
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
    ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{
  edit = false;
  updatedAvatar: string | null = null;
  originalProfile: any = null;


  constructor(private authService: AuthService, private router: Router)  { }

  profileForm = new FormGroup({
    username: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^(?!\\s*$).+') // Allow spaces but not empty
    ]),
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/)
    ]),
    avatar: new FormControl({ value: '', disabled: true }, [
      Validators.pattern('(https?:\\/\\/.*\\.(?:png|jpg|jpeg))') // URL pattern for images
    ])
  });


  ngOnInit() {
    this.loadProfile();
  }

  loadProfile(): void {
    this.authService.profile().subscribe((profile) => {
      if (profile) {
        this.originalProfile = { ...profile }; // Save original profile data
        this.profileForm.patchValue({
          username: profile.name,
          email: profile.email,
          avatar: profile.avatar,
          password: profile.password,
        });
      }
    });
  }

  get profile() {
    return this.authService.profile();
  }

  toggleEdit(): void {
    this.edit = !this.edit;

    if (this.edit) {
      this.originalProfile = { ...this.profileForm.value }; // Save current values before editing
      this.profileForm.enable(); // Enable all form controls
    } else {
      this.saveProfile(); // Save profile when exiting edit mode
      this.profileForm.disable(); // Disable all form controls
    }
  }

  saveProfile(): void {
    this.profileForm.enable(); // Enable all controls for validation

    if (this.profileForm.valid) {
      const updatedProfile: User = this.profileForm.value as User;

      this.authService.updateProfile(updatedProfile).subscribe({
        next: (user) => {
          this.originalProfile = { ...user }; // Update original profile data
          this.profileForm.disable(); // Disable the form after saving
          this.edit = false; // Exit edit mode
          Logger.log('Profile updated successfully:', user);
        },
        error: (error) => {
          Logger.error('Error updating profile:', error);
        },
      });
    } else {
      Logger.error('Form is invalid', this.profileForm.errors);
    }
  }


  cancelEdit(): void {
    this.profileForm.patchValue(this.originalProfile); // Reset to original values
    this.profileForm.disable(); // Disable the form controls
    this.edit = false; // Exit edit mode
    Logger.log('Edit cancelled');
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

  clearInput(controlName: string): void {
    if (this.edit) {
      this.profileForm.get(controlName)?.setValue('');
    }
  }
}
