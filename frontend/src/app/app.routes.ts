import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProjectUploadComponent } from './features/projects/project-upload/project-upload.component';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';

/**
 * Configuración de Rutas de la Aplicación
 * Define la correspondencia entre las URLs del navegador y los componentes de Angular.
 */
export const routes: Routes = [
  // Ruta de Inicio: Carga el escaparate de proyectos
  { path: '', component: HomeComponent },

  // Rutas de Autenticación: Login y Registro de nuevos usuarios
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas de Proyectos: Listado y Detalle
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },

  // Ruta de Carga: Formulario para subir nuevos proyectos (protección de ruta pendiente)
  { path: 'upload', component: ProjectUploadComponent },

  // Ruta Comodín (Wildcard): Redirige cualquier URL no reconocida al inicio
  { path: '**', redirectTo: '' },
];
