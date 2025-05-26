import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>('/auth/login', { email, password })
      .pipe(
        tap(value => {
          sessionStorage.setItem('id', value.id);
          sessionStorage.setItem('username', value.name);
          sessionStorage.setItem('email', value.email);
          sessionStorage.setItem('role', value.role);
          sessionStorage.setItem('auth-token', value.token);
        })
      );
  }

  signup(
    name: string,
    email: string,
    password: string
  ): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>('/auth/register', {
        name,
        email,
        password,
      })
      .pipe(
        tap(value => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
        })
      );
  }

  logout(): void {
    sessionStorage.clear();
  }
}
