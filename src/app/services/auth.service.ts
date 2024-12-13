import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../models';
import { Logger } from '../helpers/logger.helper';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedUser = new BehaviorSubject<User | undefined>({
    id: '06c2',
    name: 'Zé Povinho',
    email: 'zpovinho@mail.pt',
    password: '123456',
    avatar:
      'https://avatars.steamstatic.com/b32358b1a0f188ff07656a0c265b5af916224e96_full.jpg',
  });

  private readonly API_USERS = environment.apiUrl + 'users';
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users?email=${email}`);
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
}
