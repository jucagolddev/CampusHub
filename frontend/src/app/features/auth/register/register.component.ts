import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MasterDataService } from '../../../core/services/master-data.service';

/**
 * ¡Aquí es donde nacen mis nuevos usuarios!
 * Gestiono el proceso de registro, asegurándome de que los datos estén completos
 * y que las contraseñas coincidan antes de darles la bienvenida oficial.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  // Datos del nuevo perfil vinculados mediante ngModel
  nombre = '';
  apellidos = '';
  username = '';
  email = '';
  password = '';
  repeatPassword = '';
  
  // Nuevos campos académicos
  rolId: number | null = null;
  centroId: number | null = null;
  tituloId: number | null = null;

  // Listas de datos maestros
  roles: any[] = [];
  centros: any[] = [];
  titulos: any[] = [];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private masterDataService: MasterDataService
  ) {}

  ngOnInit(): void {
    // Cargar listas al iniciar
    this.masterDataService.getRoles().subscribe(data => this.roles = data);
    this.masterDataService.getCentros().subscribe(data => this.centros = data);
    this.masterDataService.getTitulos().subscribe(data => this.titulos = data);
  }

  /**
   * Me pongo en marcha en cuanto el usuario le da al botón de registrarse.
   * Hago unas comprobaciones de seguridad rápidas y, si todo está OK,
   * creo la nueva cuenta a través de mi AuthService.
   */
  onSubmit(): void {
    // Verificación de seguridad básica: coincidencia de contraseñas
    if (this.password !== this.repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Validación de campos obligatorios
    if (
      this.username &&
      this.email &&
      this.password &&
      this.rolId // Rol es obligatorio ahora
    ) {
      // Validación condicional: Si no es admin (1), requiere centro
      // Esto es una regla de negocio ejemplo
      
      this.authService.register({
        userName: this.username,
        email: this.email,
        password: this.password,
        rolId: this.rolId,
        centroId: this.centroId || undefined,
        tituloId: this.tituloId || undefined
      }).subscribe({
        next: () => {
             alert('Registro exitoso. ¡Bienvenido!');
             this.router.navigate(['/']);
        },
        error: (err) => {
             console.error(err);
             alert('Error al registrar usuario: ' + (err.error?.error || 'Error desconocido'));
        }
      });

    } else {
      alert('Por favor, completa todos los campos obligatorios (incluyendo Rol)');
    }
  }
}
