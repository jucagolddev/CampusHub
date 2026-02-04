import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProjectUploadComponent } from './features/projects/project-upload/project-upload.component';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { UserListComponent } from './features/admin/users/user-list.component';
import { UserRegisterComponent } from './features/admin/register/user-register.component';
import { RoleManagementComponent } from './features/admin/roles/role-management.component';
import { UserProjectManagementComponent } from './features/admin/users/user-project-management.component';
import { CenterManagementComponent } from './features/admin/center-management/center-management.component';
import { authGuard } from './core/guards/auth.guard';

/**
 * ==========================================
 * SISTEMA DE ENRUTAMIENTO CENTRAL
 * ==========================================
 * Aquí definimos todas las rutas de navegación de la aplicación.
 * Separamos la aplicación en dos grandes bloques: Parte Pública y Administración.
 */
export const routes: Routes = [
  // ==========================================
  // BLOQUE PÚBLICO (Layout Principal)
  // ==========================================
  // Usa MainLayoutComponent, que incluye Header y Footer estándar.
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent }, // Página de inicio (Landing)
      { path: 'login', component: LoginComponent }, // Acceso de usuarios
      // Registro público desactivado intencionalmente
      { path: 'projects', component: ProjectListComponent }, // Catálogo de proyectos públicos
      { path: 'projects/:id', component: ProjectDetailComponent }, // Detalles de un proyecto específico
      { path: 'upload', component: ProjectUploadComponent } // Subida de proyectos (provisionalmente aquí)
    ]
  },

  // ==========================================
  // BLOQUE PRIVADO (Panel de Administración)
  // ==========================================
  // Usa AdminLayoutComponent (Sidebar lateral). Protegido por 'authGuard'.
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard], // Guard: Verifica que el usuario haya iniciado sesión
    children: [
      { path: 'dashboard', component: DashboardComponent }, // Panel de control general
      { path: 'usuarios', component: UserListComponent }, // Gestión de usuarios (listar/editar)
      { path: 'registro-sesion', component: UserRegisterComponent }, // Registrar nuevos usuarios
      { path: 'gestion-roles', component: RoleManagementComponent }, // Asignar roles y permisos
      { path: 'gestion-usuarios', component: UserProjectManagementComponent }, // Asignar proyectos a usuarios
      { path: 'centers', component: CenterManagementComponent }, // Gestión de centros educativos
      { path: 'proyectos', component: ProjectListComponent }, // Vista administrativa de proyectos
      { path: 'subir-proyecto', component: ProjectUploadComponent } // Formulario de carga de proyectos
    ]
  },

  // ==========================================
  // REDIRECCIONES
  // ==========================================
  // Cualquier ruta no reconocida redirige a la home.
  { path: '**', redirectTo: '' },
];
