import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    FormsModule,
    MatMenuTrigger,
    MatMenu,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  showSearch: boolean = false;
  searchQuery: string = '';

  constructor(private authService: AuthService) {}

  get isLogged() {
    return this.authService.isLogged();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  logout(): void {
    this.authService.logout();
  }
}
