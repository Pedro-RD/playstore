import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faCalendarPlus,
    faCalendarMinus,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';
import { FiltersService } from '../../services/filters.service';

import { AsyncPipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GenresDropdownComponent } from '../genres-dropdown/genres-dropdown.component';
import { PlatformDropdownComponent } from '../platform-dropdown/platform-dropdown.component';
import { SortTitleButtonComponent } from '../sort-title-button/sort-title-button.component';
import { SortDateButtonComponent } from '../sort-date-button/sort-date-button.component';
import { SearchBoxComponent } from '../search-box/search-box.component';

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
}
