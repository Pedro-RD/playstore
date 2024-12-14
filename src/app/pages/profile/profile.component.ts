import { Component } from '@angular/core';
import { FormUserComponent } from '../../components/form-user/form-user.component';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [FormUserComponent, AsyncPipe],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent {
    constructor(private authService: AuthService, private router: Router) {}

    get profile() {
        return this.authService.profile().pipe(
            tap((user) => {
                if (!user) {
                    this.router.navigate(['/login']);
                }
            })
        );
    }
}
