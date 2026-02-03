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
import { CenterRegistrationComponent } from './features/admin/center-registration/center-registration.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Layout Principal (Público) con Header y Footer
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      // Registro público eliminado
      { path: 'projects', component: ProjectListComponent },
      { path: 'projects/:id', component: ProjectDetailComponent },
      { path: 'upload', component: ProjectUploadComponent }
    ]
  },

  // Rutas de Administración (Sidebar Only)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', component: UserListComponent },
      { path: 'registro-sesion', component: UserRegisterComponent },
      { path: 'gestion-roles', component: RoleManagementComponent },
      { path: 'gestion-usuarios', component: UserProjectManagementComponent },
      { path: 'centers', component: CenterRegistrationComponent },
      { path: 'proyectos', component: ProjectListComponent },
      { path: 'subir-proyecto', component: ProjectUploadComponent }
    ]
  },

  // Redirección por defecto
  { path: '**', redirectTo: '' },
];
