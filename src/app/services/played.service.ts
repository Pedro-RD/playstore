import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayedService {
  private readonly API = environment.apiUrl + 'played';
  constructor(private httpClient: HttpClient) {}
}
