import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GeneralListComponent } from './pages/general-list/general-list.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { CompletedListComponent } from './pages/completed-list/completed-list.component';
import { PlayLaterListComponent } from './pages/play-later-list/play-later-list.component';
import { PlayingListComponent } from './pages/playing-list/playing-list.component';
import { PlayedListComponent } from './pages/played-list/played-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { authGuard } from './auth.guard';

const globalTitle = ' - MaxClip';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login' + globalTitle,
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register' + globalTitle,
    },
    {
        path: 'profile/edit',
        component: ProfileEditComponent,
        title: 'Profile Edit' + globalTitle,
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile' + globalTitle,
    },
    {
        path: '',
        component: GeneralListComponent,
        title: 'Games' + globalTitle,
    },
    {
        path: 'game/:id',
        component: GameDetailsComponent,
        title: 'Game Details' + globalTitle,
    },
    {
        path: 'my-games',
        canActivate: [authGuard],
        children: [
            {
                path: 'completed',
                component: CompletedListComponent,
                title: 'Completed Games' + globalTitle,
            },
            {
                path: 'play-later',
                component: PlayLaterListComponent,
                title: 'Play Later' + globalTitle,
            },
            {
                path: 'playing',
                component: PlayingListComponent,
                title: 'Currently Playing' + globalTitle,
            },
            {
                path: 'played',
                component: PlayedListComponent,
                title: 'Played Games' + globalTitle,
            },
        ],
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        title: 'Not Found' + globalTitle,
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'not-found',
    },
];
