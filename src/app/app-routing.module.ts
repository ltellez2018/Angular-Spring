import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { DirectivaComponent } from './directives/directiva/directiva.component';
import { ClientsFormComponent } from './pages/clients/form/clients-form.component';
import { LoginComponent } from './pages/usuarios/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { DetalleFacturaComponent } from './pages/facturas/detalle-factura.component';
import { FacturasComponent } from './pages/facturas/facturas.component';


const routes: Routes = [
  {path: 'clientes', component: ClientsComponent},
  {path: 'diretivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientsFormComponent},
  {path: 'clientes/page/:page', component: ClientsComponent},
  {path: 'cliente/form', component: ClientsFormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN' }},
  {path: 'cliente/form/:id', component: ClientsFormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN' }},
  {path: 'login', component: LoginComponent},
  {path: 'facturas/:id', component: DetalleFacturaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER' }},  
  {path: 'facturas/form/:clienteId', component: FacturasComponent , canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN' }},   
  {path: '**', pathMatch: 'full' , component: ClientsComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
