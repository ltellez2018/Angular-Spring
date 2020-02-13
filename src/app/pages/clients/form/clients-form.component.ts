import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


//* SWEATALERT 2
import Swal from 'sweetalert2'


import { Cliente } from '../../../data/cliente-data';
import { Region } from '../../../data/region-data';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html'
})
export class ClientsFormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  regiones: Region[];
  titulo: string = "Crear Cliente";

  errores: string[];

  constructor(private clienteService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    });

    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  create(): void {
    console.log(this.cliente);
    this.clienteService.saveClient(this.cliente)
      .subscribe(
        cliente => {
          this.router.navigate(['/clientes']);
          Swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    console.log(this.cliente);
    this.clienteService.saveClient(this.cliente)
      .subscribe(
        (json:any) => {
          this.router.navigate(['/clientes']);
          Swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
