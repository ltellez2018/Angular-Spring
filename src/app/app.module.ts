import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectivaComponent } from './directives/directiva/directiva.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import  localeES  from "@angular/common/locales/es-MX";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeES,'es-MX');

// * COMPONENTS
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ClientsFormComponent } from './pages/clients/form/clients-form.component';
import { DetalleComponent } from './pages/clients/detalle/detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DirectivaComponent,
    ClientsComponent,
    ClientsFormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
