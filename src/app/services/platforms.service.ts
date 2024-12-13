import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Genre } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PlatformsService {
  private readonly API_GENRES = environment.apiUrl + 'platform';

  constructor(private httpClient: HttpClient) {}

  getAllPlatforms() {
    return this.httpClient.get<Genre[]>(this.API_GENRES);
  }
}
