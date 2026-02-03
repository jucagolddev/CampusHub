/**
 * ==========================================
 * PUNTO DE ENTRADA PRINCIPAL (Frontend)
 * ==========================================
 * Este archivo es el primero en ejecutarse. Su función es "arrancar" (bootstrap)
 * la aplicación Angular utilizando la nueva arquitectura de Componentes Autónomos.
 * Evitamos el uso del clásico 'AppModule' para reducir código repetitivo.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// Iniciamos la aplicación renderizando el componente raíz (AppComponent)
bootstrapApplication(AppComponent, {
  providers: [
    // Configuramos el enrutador global con nuestras rutas definidas
    provideRouter(routes),
    // Importamos HttpClient para poder hacer peticiones a nuestra API Backend
    importProvidersFrom(HttpClientModule)
  ]
}).catch(err => console.error("Error crítico al iniciar la aplicación:", err));
