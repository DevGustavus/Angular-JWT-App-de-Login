import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const proxyConnection = '/proxy'; // ajuste conforme seu serviço
  const apiUrl = `${environment.apiBaseUrl}`;

  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  if (/^http(s)?:\/\//.test(req.url)) {
    return next(req);
  }

  const baseUrl = isLocalhost ? proxyConnection : apiUrl;

  const apiReq = req.clone({
    url: `${baseUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}`,
  });

  return next(apiReq);
};
