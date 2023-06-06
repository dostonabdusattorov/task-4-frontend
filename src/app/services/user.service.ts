import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private base_url = 'http://localhost:3000';

  getAllUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImRvc3RvbiIsImVtYWlsIjoidGVzdDNAdGVzdDMuY29tIiwicGFzc3dvcmQiOiJhNzY5OTY3MTQ1ZDUyMjkzLjU1OTk5OGU5Y2VlZTkyMzI4MmY3NjgwM2VkZGIyZjVlNjQ1MmM2YjJiZGM3ZDdkOWU5ZmY1YTZjNTczOWE2N2IiLCJsYXN0TG9naW5UaW1lIjoiVHVlIEp1biAwNiAyMDIzIDE0OjAwOjQ4IEdNVCswNTAwIChVemJla2lzdGFuIFN0YW5kYXJkIFRpbWUpIiwicmVnaXN0cmF0aW9uVGltZSI6IlR1ZSBKdW4gMDYgMjAyMyAxMjozNTowMSBHTVQrMDUwMCAoVXpiZWtpc3RhbiBTdGFuZGFyZCBUaW1lKSIsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE2ODYwNDIwNDh9._ofhozTskSPLU5IWgQ6PdKzuEbbLXdEsYeDKZCVKYQI'
    );
    return this.http.get<User[]>(`${this.base_url}/users/`, { headers });
  }
}
