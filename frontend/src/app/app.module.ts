import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './layout/main-layout/header/header.component';
import { FooterComponent } from './layout/main-layout/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * Este es el corazón de mi aplicación Angular (el AppModule).
 * Aquí es donde declaro qué componentes forman la raíz y qué otros módulos necesito
 * para que todo funcione correctamente, como el enrutado o los componentes de mi layout.
 */
@NgModule({
  // Declaro mi componente principal para que Angular sepa por dónde empezar.
  declarations: [AppComponent],
  // Importo los módulos necesarios. He incluido Header y Footer aquí porque son transversales.
  imports: [BrowserModule, AppRoutingModule, HeaderComponent, FooterComponent],
  providers: [],
  // Indico que AppComponent es el componente que se debe "bootstrappear" al inicio.
  bootstrap: [AppComponent],
})
export class AppModule {}
