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

  /**
   * Send GET request for list of all instances of entity
   */
  findAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiBaseUrl}/${this.endpoint}`);
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiBaseUrl}/${this.endpoint}/${id}`);
  }

  /**
   * Send POST request to create new instance of entity
   * @param newObject Object to be posted
   */
  create(newObject: T): Observable<T[]> {
    return this.http.post<T[]>(
      `${this.apiBaseUrl}/${this.endpoint}`,
      newObject,
    );
  }
}
