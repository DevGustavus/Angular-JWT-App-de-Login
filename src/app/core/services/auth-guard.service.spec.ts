import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { Observable } from 'rxjs';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let routerMock: { navigate: jest.Mock };

  beforeEach(() => {
    routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [AuthGuardService, { provide: Router, useValue: routerMock }],
    });

    service = TestBed.inject(AuthGuardService);
    sessionStorage.clear();
  });

  it('should allow activation if auth-token is present in sessionStorage', () => {
    sessionStorage.setItem('auth-token', 'fake-token');

    const canActivate = service.canActivate({} as any, {} as any);

    if (typeof canActivate === 'boolean') {
      expect(canActivate).toBe(true);
    } else if (
      canActivate instanceof Promise ||
      canActivate instanceof Observable
    ) {
      // Para o caso de Observable ou Promise, aguardaria e testaria (não aplicável aqui pois retornamos boolean direto)
    }
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should deny activation and redirect to /login if auth-token is missing', () => {
    const canActivate = service.canActivate({} as any, {} as any);

    if (typeof canActivate === 'boolean') {
      expect(canActivate).toBe(false);
    }

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
