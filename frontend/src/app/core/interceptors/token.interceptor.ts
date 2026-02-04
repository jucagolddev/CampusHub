import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * ==========================================
 * INTERCEPTOR DE TOKEN (TokenInterceptor)
 * ==========================================
 * [PENDIENTE DE IMPLEMENTACIÓN]
 * Su función será interceptar todas las peticiones HTTP salientes
 * y adjuntar el token de autenticación (JWT/UUID) en las cabeceras.
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('authToken');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
