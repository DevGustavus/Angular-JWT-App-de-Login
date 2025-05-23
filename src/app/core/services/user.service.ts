import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LocalHostService } from './local-host.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = `${environment.api}/user`;
  proxyConnection: string = '/user'; // Para localHost

  constructor(
    private httpClient: HttpClient,
    private localHostService: LocalHostService
  ) {}

  getAllUsers(): Observable<HttpResponse<User[]>> {
    return this.httpClient.get<User[]>(this.proxyConnection + '/all', {
      observe: 'response',
    });
  }

  getUserById(id: string): Observable<HttpResponse<User>> {
    return this.httpClient.get<User>(this.proxyConnection + '/' + id, {
      observe: 'response',
    });
  }

  updateUser(user: User): Observable<HttpResponse<User>> {
    const token = this.localHostService.getSessionStorageItem('auth-token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    return this.httpClient.put<User>(
      this.proxyConnection + '/update/' + user.id,
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
