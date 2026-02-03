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
 * INTERCEPTOR DE ERRORES (ErrorInterceptor)
 * ==========================================
 * [PENDIENTE DE IMPLEMENTACIÓN]
 * Centralizará el manejo de errores HTTP globales.
 * Ejemplo: Redirigir al login si recibimos un 401 Unauthorized.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
