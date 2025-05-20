import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = `${environment.api}/user`;
  proxyConnection: string = '/user'; // Para localHost

  constructor(private httpClient: HttpClient) {}

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
    return this.httpClient.put<User>(
      this.proxyConnection + '/update/' + user.id,
      user,
      {
        observe: 'response',
      }
    );
  }
}
