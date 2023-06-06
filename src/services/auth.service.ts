import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { base_url } from '../constants';
import { UserInterface } from 'src/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  signup(
    name: string,
    email: string,
    password: string
  ): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${base_url}/auth/signup`, {
      name,
      email,
      password,
      headers: this.headers,
    });
  }

  signin(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${base_url}/auth/signin`, {
      email,
      password,
      headers: this.headers,
    });
  }

  signout() {
    localStorage.removeItem('token');
  }
}
