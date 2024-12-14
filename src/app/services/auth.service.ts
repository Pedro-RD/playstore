import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
import { User } from '../models';
import { Logger } from '../helpers/logger.helper';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

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
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) {}

    registerUser(userDetails: User) {
        return this.getUserByEmail(userDetails.email).pipe(
            mergeMap((users) => {
                if (users.length > 0) {
                    Logger.error('Email already exists');
                    throw new Error('Email already exists');
                }
                return this.http.post<User>(`${this.API_USERS}`, userDetails);
            }),
            tap((user) => {
                this.loggedUser.next(user);
                this.saveUser(user);
                Logger.log('User registered');
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
                    throw new Error('User not found');
                }
                if (user.email !== newProfile.email) {
                    return this.getUserByEmail(newProfile.email).pipe(
                        map((users) => {
                            if (users.length > 0) {
                                Logger.error('Email already exists');
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
}
