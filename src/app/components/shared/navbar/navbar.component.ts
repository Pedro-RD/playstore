import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, FormsModule, MatMenuTrigger, MatMenu, MatFormField, MatInput, MatLabel],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  showSearch: boolean = false;
  searchQuery: string = '';

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  logout(): void{
    // Colocar lógica de logout
    // console.log('Logout realizado com sucesso!');
  }
}
