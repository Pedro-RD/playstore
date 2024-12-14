import { Component } from '@angular/core';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { SortTitleButtonComponent } from '../sort-title-button/sort-title-button.component';
import { SortDateButtonComponent } from '../sort-date-button/sort-date-button.component';
import { GenresDropdownComponent } from '../genres-dropdown/genres-dropdown.component';
import { PlatformDropdownComponent } from '../platform-dropdown/platform-dropdown.component';

@Component({
    selector: 'app-game-bar',
    standalone: true,
    imports: [
        SearchBoxComponent,
        SortTitleButtonComponent,
        SortDateButtonComponent,
        GenresDropdownComponent,
        PlatformDropdownComponent,
    ],
    templateUrl: './game-bar.component.html',
    styleUrl: './game-bar.component.scss',
})
export class GameBarComponent {}
