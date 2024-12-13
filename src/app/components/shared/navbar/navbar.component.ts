import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { GamesService } from '../../../services/games.service';
import {
  debounce,
  debounceTime,
  distinct,
  distinctUntilChanged,
  Subscription,
  take,
} from 'rxjs';
import { GenresService } from '../../../services/genres.service';
import { PlatformsService } from '../../../services/platforms.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
    MatMenuTrigger,
    MatMenu,
    AsyncPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  showSearch: boolean = false;
  searchQuery: string = '';
  genres: string[] = [];
  platforms: string[] = [];

  subscriptions: Subscription[] = [];

  searchBoxFormControl = new FormControl('');

  constructor(
    private authService: AuthService,
    private gamesService: GamesService,
    private genresService: GenresService,
    private platformsService: PlatformsService
  ) {}

  ngOnInit(): void {
    this.getGenres();
    this.getPlatforms();
    this.setSearchBox();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.searchBoxFormControl.reset();
  }

  get isLogged() {
    return this.authService.isLogged();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  logout(): void {
    this.authService.logout();
  }

  orderByTitle() {
    this.gamesService.setSort('title');
  }

  orderByReleaseDate() {
    this.gamesService.setSort('release_date');
  }

  filterByGenre(genre: string) {
    this.gamesService.setFilterGenre(genre);
  }

  filterByPlatform(platform: string) {
    this.gamesService.setFilterPlatform(platform);
  }

  // Get Initial Data
  private getGenres() {
    this.subscriptions.push(
      this.genresService.getAllGenres().subscribe((genres) => {
        this.genres = genres.map((genre) => genre.name);
      })
    );
  }

  private getPlatforms() {
    this.subscriptions.push(
      this.platformsService.getAllPlatforms().subscribe((platforms) => {
        this.platforms = platforms.map((platform) => platform.name);
      })
    );
  }

  private setSearchBox() {
    this.subscriptions.push(
      this.searchBoxFormControl.valueChanges
        .pipe(distinctUntilChanged(), debounceTime(500))
        .subscribe((value) => {
          this.gamesService.setFilterTitle(value || '');
        })
    );
  }
}
