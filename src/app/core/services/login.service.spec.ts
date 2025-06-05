import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { LoginResponse } from '../types/login-response.type';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);

    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call /auth/login and store sessionStorage values', done => {
      const mockResponse: LoginResponse = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        token: 'fake-token-123',
      };

      service.login('john@example.com', 'password123').subscribe(response => {
        expect(response).toEqual(mockResponse);

        expect(sessionStorage.getItem('id')).toBe('123');
        expect(sessionStorage.getItem('username')).toBe('John Doe');
        expect(sessionStorage.getItem('email')).toBe('john@example.com');
        expect(sessionStorage.getItem('role')).toBe('admin');
        expect(sessionStorage.getItem('auth-token')).toBe('fake-token-123');

        done();
      });

      const req = httpMock.expectOne('/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        email: 'john@example.com',
        password: 'password123',
      });
      req.flush(mockResponse);
    });
  });

  describe('signup', () => {
    it('should call /auth/register and store sessionStorage values', done => {
      const mockResponse: LoginResponse = {
        id: '456',
        name: 'Jane Doe',
        email: 'jane@example.com',
        role: 'user',
        token: 'fake-token-456',
      };

      service
        .signup('Jane Doe', 'jane@example.com', 'securePass!')
        .subscribe(response => {
          expect(response).toEqual(mockResponse);

          expect(sessionStorage.getItem('auth-token')).toBe('fake-token-456');
          expect(sessionStorage.getItem('username')).toBe('Jane Doe');

          done();
        });

      const req = httpMock.expectOne('/auth/register');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'securePass!',
      });
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('should clear sessionStorage', () => {
      sessionStorage.setItem('id', '123');
      sessionStorage.setItem('username', 'John Doe');
      sessionStorage.setItem('auth-token', 'token');

      service.logout();

      expect(sessionStorage.getItem('id')).toBeNull();
      expect(sessionStorage.getItem('username')).toBeNull();
      expect(sessionStorage.getItem('auth-token')).toBeNull();
    });
  });
});
