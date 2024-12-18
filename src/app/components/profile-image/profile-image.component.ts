import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-profile-image',
    standalone: true,
    imports: [NgIf],
    templateUrl: './profile-image.component.html',
    styleUrl: './profile-image.component.scss',
})
export class ProfileImageComponent {
    @Input({ required: true }) image?: string | null;
    @Input({ required: true }) name!: string;

    get firstLetter(): string {
        return this.name[0].toUpperCase();
    }
}
