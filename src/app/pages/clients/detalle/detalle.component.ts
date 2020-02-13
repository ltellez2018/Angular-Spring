import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2'
import { HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ModalService } from '../../../services/modal.service';
import { Cliente } from '../../../data/cliente-data';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  fotoSeleccionada: File;
  @Input() cliente: Cliente;
  progreso = 0;
  
  constructor( private clientService: ClientService,
               public modalService: ModalService) { }

  ngOnInit() {}

  

  seleccionarFoto(event) {    
      this.fotoSeleccionada = event.target.files[0];
      this.progreso = 0;
      console.log(this.fotoSeleccionada);   
      if(this.fotoSeleccionada.type.indexOf('image') < 0){
        Swal.fire({
          icon: 'error',
          title: 'Seleccion de archivo',
          text: 'El archivo debe se de tipo imagen',
        });
        this.fotoSeleccionada = null;
      }   
  }

  subirFoto(){    

    if(!this.fotoSeleccionada) {
      Swal.fire({ icon: 'error', title: 'Seleccion de archivo', text: 'Debe seleccionar una foto'});
    }else {
      this.clientService.subirFoto(this.fotoSeleccionada,this.cliente.id)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100);
        }else if(event.type === HttpEventType.Response){
          let response: any = event.body;
          this.cliente = response.cliente;
          this.modalService._notificarUpload.emit(this.cliente);
          Swal.fire({
            icon: 'success',
            title: 'Carga exitosa',
            text: response.mensaje
          });

        }
      
      });
    }
  }

  cerrarModal(){
    this.modalService.cerraModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
