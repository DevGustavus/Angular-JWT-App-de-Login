import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { apiPrefixInterceptor } from './core/interceptors/httpConnection.interceptor';
import { authInterceptor } from './core/interceptors/authInterceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(
      withInterceptors([
        apiPrefixInterceptor,
        loadingInterceptor,
        authInterceptor,
      ])
    ),
  ],
};
