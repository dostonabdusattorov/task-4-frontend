import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces';
import { Observable } from 'rxjs';
import { base_url } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${base_url}/users`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
  }

  updateUser(user: UserInterface): Observable<UserInterface> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.put<UserInterface>(`${base_url}/users/${user.id}`, null, {
      headers,
    });
  }

  deleteUser(user: UserInterface): Observable<any> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.delete<any>(`${base_url}/users/${user.id}`, {
      headers,
    });
  }
}
