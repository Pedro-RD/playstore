import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
    BehaviorSubject,
    catchError,
    map,
    mergeMap,
    Observable,
    tap,
} from 'rxjs';
import { User } from '../models';
import { Logger } from '../helpers/logger.helper';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { ErrorBoxService } from './error-box.service';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly STORAGE_KEY = 'loggedUser';
    private readonly loggedUser = new BehaviorSubject<User | undefined>(
        undefined
    );
    private readonly API_USERS = environment.apiUrl + 'users';

    constructor(
        private readonly http: HttpClient,
        private readonly localStorageService: LocalStorageService,
        private readonly errorService: ErrorBoxService,
        private readonly toastService: ToastService,
        private readonly router: Router
    ) {}

    registerUser(userDetails: User) {
        return this.getUserByEmail(userDetails.email).pipe(
            mergeMap((users) => {
                if (users.length > 0) {
                    Logger.error('Email already exists');
                    this.errorService.setError(
                        'Registration failed',
                        'Email already exists'
                    );
                    throw new Error('Email already exists');
                }
                return this.http.post<User>(`${this.API_USERS}`, userDetails);
            }),
            tap((user) => {
                this.loggedUser.next(user);
                this.saveUser(user);
                this.toastService.newNotification({
                    title: 'User registered',
                    body: 'You have successfully registered',
                    type: 'success',
                });
                Logger.log('User registered');
            }),
            catchError((error) => {
                this.errorService.setError(
                    'Registration failed',
                    'It was not possible to register the user'
                );
                Logger.error(`Error registering user: ${error.message}`);
                throw error;
            })
        );
    }

    private getUserByEmail(email: string): Observable<User[]> {
        return this.http.get<User[]>(`${this.API_USERS}?email=${email}`);
    }

    login(email: string, pw: string): Observable<User> {
        Logger.log(`Logging in with email: ${email} and password: ${pw}`);
        return this.http
            .get<User[]>(`${this.API_USERS}?email=${email}&password=${pw}`)
            .pipe(
                map((users) => users[0] || undefined),
                tap((user) => {
                    if (user) {
                        this.loggedUser.next(user);
                        this.saveUser(user);
                    } else {
                        Logger.error('Invalid email or password');
                        this.errorService.setError(
                            'Login failed',
                            'Invalid email or password'
                        );
                        throw new Error('Invalid email or password');
                    }
                })
            );
    }

    updateProfile(newProfile: User): Observable<User> {
        return this.profile().pipe(
            mergeMap((user) => {
                if (!user) {
                    Logger.error('User not found');
                    this.errorService.setError(
                        'User not found',
                        'It was not possible to update the user'
                    );
                    throw new Error('User not found');
                }
                if (user.email !== newProfile.email) {
                    return this.getUserByEmail(newProfile.email).pipe(
                        map((users) => {
                            if (users.length > 0) {
                                Logger.error('Email already exists');
                                this.errorService.setError(
                                    'Email already exists',
                                    'It was not possible to update the user'
                                );
                                throw new Error('Email already exists');
                            }
                            return user;
                        })
                    );
                }
                return this.loggedUser;
            }),
            mergeMap((user) => {
                return this.http.patch<User>(
                    `${this.API_USERS}/${user!.id}`,
                    newProfile
                );
            }),
            tap((user) => {
                this.loggedUser.next(user);
                this.saveUser(user);
                this.toastService.newNotification({
                    title: 'User updated',
                    body: 'You have successfully updated your profile',
                    type: 'success',
                });
                Logger.log('User updated');
            })
        );
    }

    profile(): Observable<User | undefined> {
        return this.loggedUser.asObservable();
    }

    isLogged(): Observable<boolean> {
        return this.loggedUser.asObservable().pipe(map((user) => !!user));
    }

    logout(): void {
        this.localStorageService.removeItem(this.STORAGE_KEY);
        this.loggedUser.next(undefined);
        this.toastService.newNotification({
            title: 'Logged out',
            body: 'You have successfully logged out',
            type: 'info',
        });
        this.router.navigate(['/login']);
    }

    loadUser(): void {
        const user = this.localStorageService.getItem(this.STORAGE_KEY);
        if (user) {
            this.loggedUser.next(JSON.parse(user));
        }
    }

    private saveUser(user: User): void {
        this.localStorageService.setItem(
            this.STORAGE_KEY,
            JSON.stringify(user)
        );
    }

    getUserId(): string | undefined {
        return this.loggedUser.value?.id;
    }
}
