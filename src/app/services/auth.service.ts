import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {BehaviorSubject, catchError, map, mergeMap, Observable, tap} from 'rxjs';
import { User } from '../models';
import { Logger } from '../helpers/logger.helper';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedUser = new BehaviorSubject<User | undefined>(
    undefined
  );
  private readonly API_USERS = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {}

  registerUser(userDetails: User) {
    return this.getUserByEmail(userDetails.email).pipe(
      mergeMap((users) => {
        if (users.length > 0) {
          Logger.error('Email already exists');
          throw new Error('Email already exists');
        }
        return this.http.post(`${this.API_USERS}users`, userDetails);
      }),
      tap((user) => {
        this.loggedUser.next(userDetails);
      })
    );
  }

  private getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_USERS}users?email=${email}`);
  }

  login(email: string, pw: string): Observable<User> {
    return this.http
      .get<User[]>(`${this.API_USERS}?email=${email}&&password=${pw}`)
      .pipe(
        map((users) => users[0] || undefined),
        tap((user) => {
          if (user) {
            this.loggedUser.next(user);
          } else {
            console.warn('Invalid login');
          }
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
    this.loggedUser.next(undefined);
  }

  updateProfile(updatedProfile: User): Observable<User> {
    const currentUser = this.loggedUser.getValue();

    if (!currentUser) {
      throw new Error('No logged-in user found. Update cannot proceed.');
    }

    // Ensure the `id` exists in the updated profile
    if (!updatedProfile.id) {
      updatedProfile.id = currentUser.id; // Fallback to the current user's ID
    }

    return this.http
      .patch<User>(`${this.API_USERS}/${currentUser.id}`, updatedProfile)
      .pipe(
        tap((user) => {
          // Update the BehaviorSubject with the latest data
          this.loggedUser.next(user);
          Logger.log('Profile updated successfully:', user);
        }),
        map((user) => {
          Logger.log('Returning updated user from server:', user);
          return user; // Return the updated user
        }),
        catchError((error) => {
          Logger.error('Error updating profile:', error);
          throw error; // Re-throw error for further handling
        })
      );
  }

}
