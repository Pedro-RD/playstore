import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {AsyncPipe, JsonPipe, NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {FormGroup, FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, MatCardContent, MatCard, FormsModule, MatCardActions, MatButton, MatFormField, MatInput, MatIcon, MatSuffix, MatLabel, MatError, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  edit = false;
  emailError: string | null = null;
  updatedAvatar: string | null = null;
  profileForm!: FormGroup;

  // Access DOM elements using @ViewChild
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(private authService: AuthService ) {}

  get profile() {
    return this.authService.profile();
  }

  toggleEdit(): void {
    this.edit = !this.edit;

    if (!this.edit) {
      // Perform validation or save logic when exiting edit mode
      this.validateEmail();
    }
  }


  validateEmail(): void {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailInput = (document.getElementById('emailInput') as HTMLInputElement)?.value;

    if (emailInput && !emailPattern.test(emailInput)) {
      this.emailError = 'Enter a valid email address.';
    } else {
      this.emailError = null;
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

  // saveProfileChanges(): void {
  //   const updatedProfile = {
  //     email: this.emailInput.nativeElement.value,
  //     username: this.usernameInput.nativeElement.value,
  //     password: this.passwordInput.nativeElement.value,
  //     avatar: this.updatedAvatar,
  //   };
  //
  //   this.authService.updateProfile(updatedProfile).subscribe(
  //     (response) => {
  //       console.log('Profile updated successfully', response);
  //     },
  //     (error) => {
  //       console.error('Error updating profile', error);
  //     }
  //   );

}
