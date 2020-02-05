import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { DirectivaComponent } from './directives/directiva/directiva.component';


const routes: Routes = [
  {path: 'clientes', component: ClientsComponent},
  {path: 'diretivas', component: DirectivaComponent},
  {path: '**', pathMatch: 'full' , component: ClientsComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
