import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client-interface';
import { ClientService } from '../../services/client.service.service';
import { Observable, pipe, of } from 'rxjs';
import { map, tap, pluck } from 'rxjs/operators';
//* SWEATALERT 2
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  paginador: {};
  clients$: Observable< Client[] >;

  constructor(private clientService : ClientService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
        //this.clients$ = this.clientService.getClients();      
    this.activatedRoute.paramMap.subscribe(params => {
        let page:number = +params.get('page'); // Operador + convierte la vairable a number
        console.log('Page: ', page);
        
         if(!page) {
           page = 0;
         }
         this.clientService.getClientsByPage(page).pipe(tap(console.log)).subscribe(
            response =>  { 
                this.clients$ = of(response.content); 
                 this.paginador =  {totalPages: response.totalPages , number: response.number, last: response.last, first: response.first}
                }
            
         );
      
      }); 
     
  }
/* 
  ngOnInit() {
    //this.clients$ = this.clientService.getClients();      
    this.activatedRoute.paramMap.subscribe(params => {
     let page:number = +params.get('page'); // Operador + convierte la vairable a number
     console.log('Page: ', page);
     
      if(!page) {
        page = 0;
      }
      this.clients$ = this.clientService.getClientsByPage(page);      
   });
  
} */


  deleteCliente(cliente: Client){

    
  

    Swal.fire({
      title: 'Esta seguro de eliminar el cliente?',
      text: `Cliente: ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, por el momento'
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteCliente(cliente.id).subscribe(()=> {
          this.clients$.pipe(
            tap(console.log),
            map(clientes => clientes.filter(cli => cli.id !== cliente.id)),
            tap(console.log)
        ).subscribe(clientes => this.clients$ = of(clientes));
        });  
        Swal.fire(
          'Eliminado!',
          `Cliente: ${cliente.nombre} ${cliente.apellido}`,
          'success'
        )
      }
    })  
  }

 }
