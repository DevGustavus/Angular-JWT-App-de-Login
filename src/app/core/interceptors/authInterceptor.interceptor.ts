import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalHostService } from '../services/local-host.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const localHostService = inject(LocalHostService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        // Token expirado ou inválido
        localHostService.clearSessionStorage();
        alert('Sua sessão expirou. Faça login novamente.');
        router.navigate(['/login'], {
          queryParams: { sessionExpired: true },
        });
      }

      return throwError(() => error);
    })
  );
};
