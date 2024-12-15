import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faUser,
    faCheck,
    faX,
    faClock,
    faGamepad,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [NgClass, AsyncPipe, FontAwesomeModule, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    hamburgerMenu: boolean = false;

    constructor(private authService: AuthService) {}

    get isLogged() {
        return this.authService.isLogged();
    }

    get profile() {
        return this.authService.profile();
    }

    logout(): void {
        this.authService.logout();
    }

    toggleHamburgerMenu() {
        this.hamburgerMenu = !this.hamburgerMenu;
    }

    // Icons
    userIcon = faUser;
    faCheck = faCheck;
    faX = faX;
    faClock = faClock;
    faGamepad = faGamepad;
}
