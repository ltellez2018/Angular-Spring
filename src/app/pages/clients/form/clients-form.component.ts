import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

//* RXJS
import { Observable } from 'rxjs';
//* CUSTOM
import { ClientService } from '../../../services/client.service.service';
import { Client } from 'src/app/interfaces/client-interface';
//* SWEATALERT 2
import Swal from 'sweetalert2'

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html'
})
export class ClientsFormComponent implements OnInit, AfterContentInit {

  cliente: Client;
  
  clientForm: FormGroup;
  constructor(private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.cargarCliente();
  }

  ngAfterContentInit() {
    this.cliente = {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
      createAt: ''
    }
    this.initForm();
  }

  // **************************************************** //
  // ***            'INIT FORM'                       *** //
  // **************************************************** //

  private initForm() {
    this.clientForm = new FormGroup({
      nombre: new FormControl(this.cliente.nombre, { validators: [Validators.required] }),
      apellido: new FormControl(this.cliente.apellido, { validators: [Validators.required] }),
      email: new FormControl(this.cliente.email, { validators: [Validators.required, Validators.email] })
    });
  }

  // **************************************************** //
  // ***            'GET CLIENTE'                     *** //
  // **************************************************** //

  private cargarCliente() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clientService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
          this.initForm();
        });
      }
    });

  }

  // **************************************************** //
  // ***         'SUBMIT VALUES FORM'                 *** //
  // **************************************************** //

  onSubmit() {
    if(this.cliente.id !==0 ){
      this.updateCliente();
    }else{
      this.saveCliente();
    }
    this.initForm();
  }

  // **************************************************** //
  // ***            'Update CLIENTE'                  *** //
  // **************************************************** //
  private updateCliente() {
    this.clientService.updateCliente({
                                        nombre: this.clientForm.value.nombre,
                                        apellido: this.clientForm.value.apellido,
                                        email: this.clientForm.value.email,
                                        id: this.cliente.id,
                                        createAt: this.cliente.createAt
                                      }).subscribe(cliente => this.sweatAlert('Cliente actualizado con exito',cliente));                                      
  }

  // **************************************************** //
  // ***            'Crear CLIENTE'                   *** //
  // **************************************************** //
  private saveCliente() {
            this.clientService.saveClient({
                                            nombre: this.clientForm.value.nombre,
                                            apellido: this.clientForm.value.apellido,
                                            email: this.clientForm.value.email
            }).subscribe(cliente => this.sweatAlert('Cliente creado con exito',cliente));
  }


  //*HELPERS
  private sweatAlert = (mensaje: String, cliente: Client) =>{
      Swal.fire({
        icon: 'success',
        title: mensaje,
        text: `${cliente.nombre}  ${cliente.apellido}`,
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/clientes'])
  };
  
}