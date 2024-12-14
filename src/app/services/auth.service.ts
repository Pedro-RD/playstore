import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
import { User } from '../models';
import { Logger } from '../helpers/logger.helper';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedUser = new BehaviorSubject<User | undefined>(
    undefined
  );
  private readonly API_USERS = environment.apiUrl + 'users';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.restoreSession();
  }

  private getLoginInfo() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      return atob(token);
    }
    return null;
  }

  private restoreSession(): void {
    const info = this.getLoginInfo()
    if (info) {
      const [email, password] = info.split(':')
      this.http
        .get<User[]>(`${this.API_USERS}?email=${email}&password=${password}`)
        .subscribe(
          (users) => {
            const user = users[0];
            if (user) {
              this.loggedUser.next(user);
            } else {
              this.deleteLoginInfo();
            }
          },
          () => {
            this.deleteLoginInfo();
          }
        );
    }
  }

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

  private deleteLoginInfo() {
    sessionStorage.clear();
    // localStorage.removeItem('token');
  }

  private saveLoginInfo(email: string, pw: string) {
    const token = btoa(`${email}:${pw}`); // simple hash
    sessionStorage.setItem('authToken', token);
    this.router.navigate(['/']);
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
            this.saveLoginInfo(email, pw);
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
    this.deleteLoginInfo()
    this.loggedUser.next(undefined);
    this.router.navigate(['login']);
  }
}
