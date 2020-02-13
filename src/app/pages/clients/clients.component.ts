import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Observable, pipe, of } from 'rxjs';
import { map, tap, pluck } from 'rxjs/operators';
//* SWEATALERT 2
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { Cliente } from '../../data/cliente-data';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
  clienteSeleccionado: Cliente;
  paginador: {};
  clientes: Cliente[];

  constructor(private clientService : ClientService,
              private modalService: ModalService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {   
    this.activatedRoute.paramMap.subscribe(params => {
        let page:number = +params.get('page'); // Operador + convierte la vairable a number
        if(!page) {
           page = 0;
         }
         this.clientService.getClientsByPage(page)
           .pipe(
               tap(response => console.log('tap',response))
                ).subscribe((response: any) =>  { 
                 this.clientes = response.content; 
                 this.paginador =  {totalPages: response.totalPages , number: response.number, last: response.last, first: response.first};
                }
            
         );
      
      }); 

     
      
      this.modalService._notificarUpload.subscribe(cliente => { 
        this.clientes = this.clientes.map(clienteOriginal => {
          if(cliente.id === clienteOriginal.id) {
            clienteOriginal.foto = cliente.foto;
          }
          return clienteOriginal;
        })
      });
     
  }


  deleteCliente(cliente: Cliente){

    
  

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
                      this.clientes = this.clientes.filter(cli => cli.id !== cliente.id)
        });  
        Swal.fire(
          'Eliminado!',
          `Cliente: ${cliente.nombre} ${cliente.apellido}`,
          'success'
        )
      }
    })  
  }


  abrirModal(cliente: Cliente) {
    console.log("Cliente para modal: ", cliente);
    
    this.clienteSeleccionado = cliente;
    this.modalService.abriModal();
  }
 }
