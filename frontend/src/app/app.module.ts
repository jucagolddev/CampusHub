import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './layout/main-layout/header/header.component';
import { FooterComponent } from './layout/main-layout/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HeaderComponent, FooterComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
