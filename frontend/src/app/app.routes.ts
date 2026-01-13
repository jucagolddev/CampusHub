import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'login', component: LoginComponent }, <-- Comentario: Para el futuro
    { path: '**', redirectTo: '' } // Redirigir a home si la ruta no existe
];