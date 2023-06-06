import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { base_url } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(name: string, email: string, password: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any[]>(`${base_url}/auth/signup`, {
      name,
      email,
      password,
      headers,
    });
  }
}
