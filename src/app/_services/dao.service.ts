import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import config from '../_config/config.js';

@Injectable({
  providedIn: 'root',
})
export abstract class DaoService<T> {
  apiBaseUrl: string = config.API_BASE_URL;

  constructor(private http: HttpClient, private endpoint: string) {}

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiBaseUrl}/${this.endpoint}`);
  }
}
