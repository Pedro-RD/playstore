import { Component, OnDestroy, OnInit } from '@angular/core';
import { FiltersService } from '../../services/filters.service';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subscription } from 'rxjs';
import { PlatformsService } from '../../services/platforms.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
    selector: 'app-platform-dropdown',
    standalone: true,
    imports: [FontAwesomeModule, NgClass, AsyncPipe],
    templateUrl: './platform-dropdown.component.html',
    styleUrl: './platform-dropdown.component.scss',
})
export class PlatformDropdownComponent implements OnInit, OnDestroy {
    platforms: string[] = [];
    subscriptions: Subscription[] = [];

    constructor(
        private filterService: FiltersService,
        private platformsService: PlatformsService
    ) {}

    ngOnInit(): void {
        this.getPlatforms();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    get selectedPlatform() {
        return this.filterService.filterPlatform$;
    }

    private getPlatforms() {
        this.subscriptions.push(
            this.platformsService.getAllPlatforms().subscribe((platforms) => {
                this.platforms = platforms.map((platform) => platform.name);
            })
        );
    }

    filterByPlatform(platform: string) {
        this.filterService.setFilterPlatform(platform);
    }

    // Icons
    filterIcon = faFilter;
}
