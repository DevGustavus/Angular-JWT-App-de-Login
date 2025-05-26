import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LocalHostService } from './local-host.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private localHostService: LocalHostService
  ) {}

  getAllUsers(): Observable<HttpResponse<User[]>> {
    return this.httpClient.get<User[]>('/user/all', {
      observe: 'response',
    });
  }

  getUserById(id: string): Observable<HttpResponse<User>> {
    return this.httpClient.get<User>('/user/' + id, {
      observe: 'response',
    });
  }

  updateUser(user: User): Observable<HttpResponse<User>> {
    const token = this.localHostService.getSessionStorageItem('auth-token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    return this.httpClient.put<User>(
      '/user/update/' + user.id,
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      {
        headers,
        observe: 'response',
      }
    );
  }
}
