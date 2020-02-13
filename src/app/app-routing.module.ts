import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { DirectivaComponent } from './directives/directiva/directiva.component';
import { ClientsFormComponent } from './pages/clients/form/clients-form.component';
import { DetalleComponent } from './pages/clients/detalle/detalle.component';


const routes: Routes = [
  {path: 'clientes', component: ClientsComponent},
  {path: 'diretivas', component: DirectivaComponent},
  {path: 'cliente/form', component: ClientsFormComponent},
  {path: 'cliente/form/:id', component: ClientsFormComponent},
  {path: 'clientes/page/:page', component: ClientsComponent},
  {path: '**', pathMatch: 'full' , component: ClientsComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
