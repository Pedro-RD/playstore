import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { GenresService } from '../../../services/genres.service';
import { PlatformsService } from '../../../services/platforms.service';
import { FiltersService } from '../../../services/filters.service';

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
    private filterService: FiltersService,
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
    this.filterService.setSort('title');
  }

  orderByReleaseDate() {
    this.filterService.setSort('release_date');
  }

  filterByGenre(genre: string) {
    this.filterService.setFilterGenre(genre);
  }

  filterByPlatform(platform: string) {
    this.filterService.setFilterPlatform(platform);
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
          this.filterService.setFilterTitle(value || '');
        })
    );
  }
}
