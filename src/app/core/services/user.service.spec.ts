import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LocalHostService } from './local-host.service';
import { User } from '../models/user.model';

describe('UserService (Jest)', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let localHostService: LocalHostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, LocalHostService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    localHostService = TestBed.inject(LocalHostService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar todos os usuários com header Authorization', () => {
    jest
      .spyOn(localHostService, 'getSessionStorageItem')
      .mockReturnValue('fake-token');

    service.getAllUsers().subscribe();

    const req = httpMock.expectOne('/user/all');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush([]);
  });

  it('deve buscar usuário por ID com header Authorization', () => {
    jest
      .spyOn(localHostService, 'getSessionStorageItem')
      .mockReturnValue('fake-token');

    service.getUserById('123').subscribe();

    const req = httpMock.expectOne('/user/123');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush({});
  });

  it('deve atualizar usuário com header Authorization', () => {
    jest
      .spyOn(localHostService, 'getSessionStorageItem')
      .mockReturnValue('fake-token');

    const user: User = {
      id: '123',
      name: 'Novo Nome',
      email: 'novo@email.com',
      role: '1',
    };

    service.updateUser(user).subscribe();

    const req = httpMock.expectOne('/user/update/123');
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    expect(req.request.body).toEqual({
      name: 'Novo Nome',
      email: 'novo@email.com',
      role: '1',
    });
    req.flush(user);
  });

  it('deve deletar usuário com header Authorization', () => {
    jest
      .spyOn(localHostService, 'getSessionStorageItem')
      .mockReturnValue('fake-token');

    service.deleteUserById('123', 'executor-456').subscribe();

    const req = httpMock.expectOne('/user/delete/123?executorId=executor-456');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(null);
  });

  it('não deve adicionar Authorization se não houver token', () => {
    jest.spyOn(localHostService, 'getSessionStorageItem').mockReturnValue(null);

    service.getAllUsers().subscribe();

    const req = httpMock.expectOne('/user/all');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush([]);
  });
});
