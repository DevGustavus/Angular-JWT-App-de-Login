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

  private getAuthHeaders(): HttpHeaders | undefined {
    const token = this.localHostService.getSessionStorageItem('auth-token');
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;
  }

  getAllUsers(): Observable<HttpResponse<User[]>> {
    const headers = this.getAuthHeaders();

    return this.httpClient.get<User[]>('/user/all', {
      headers,
      observe: 'response',
    });
  }

  getUserById(id: string): Observable<HttpResponse<User>> {
    const headers = this.getAuthHeaders();

    return this.httpClient.get<User>('/user/' + id, {
      headers,
      observe: 'response',
    });
  }

  updateUser(user: User): Observable<HttpResponse<User>> {
    const headers = this.getAuthHeaders();

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

  deleteUserById(id: string): Observable<HttpResponse<void>> {
    const headers = this.getAuthHeaders();

    return this.httpClient.delete<void>('/user/delete/' + id, {
      headers,
      observe: 'response',
    });
  }
}
