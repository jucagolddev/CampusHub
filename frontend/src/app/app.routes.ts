import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CenterRegistrationComponent } from './features/admin/center-registration/center-registration.component';
import { ProjectUploadComponent } from './features/projects/project-upload/project-upload.component';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';

/**
 * He definido aquí el mapa de navegación de mi aplicación.
 * Asocio cada URL con el componente que quiero que se cargue dinámicamente.
 * Esto me permite tener una Single Page Application (SPA) fluida.
 */
export const routes: Routes = [
  // Esta es mi página de aterrizaje donde muestro los proyectos más importantes.
  { path: '', component: HomeComponent },

  // Aquí defino los accesos para mi sistema de autenticación de usuarios.
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Gestión Administrativa
  { path: 'admin/centers', component: CenterRegistrationComponent },

  // Estas rutas gestionan todo lo relacionado con el catálogo de mis proyectos.
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },

  // Mi sección para que los alumnos puedan subir sus propias creaciones.
  { path: 'upload', component: ProjectUploadComponent },

  // He añadido esta ruta comodín para que, si el usuario escribe algo que no existe,
  // siempre lo mande de vuelta al inicio. Así evito errores 404 perdidos.
  { path: '**', redirectTo: '' },
];
