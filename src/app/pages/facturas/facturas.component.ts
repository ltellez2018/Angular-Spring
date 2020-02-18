import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormControl, Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';
import { FacturaService } from '../../services/factura.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
//* DATA
import { Producto } from '../../data/producto-data';
import { Factura } from '../../data/factura-data';
import { ItemFactura } from '../../data/item-factura-data';

//* SWEATALERT 2
import Swal from 'sweetalert2'

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva Factura';
  factura : Factura = new Factura();

  autoCompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(private clientService: ClientService, 
              private activatedRoute: ActivatedRoute,
              private facturaService: FacturaService,
              private router: Router) { }

  ngOnInit() {
    
    //* Parametros enviamos por url
    this.activatedRoute.paramMap.subscribe(params => {
        let clienteId = +params.get('clienteId');
        this.clientService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });
    
    //* 
    this.productosFiltrados = this.autoCompleteControl.valueChanges
      .pipe(
        tap(console.log),
        map(value => typeof value === 'string'? value : value.nombre),
        flatMap(value => value ?this._filter(value) :[])
      );

  }
  


  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.fltrarProdcutos(filterValue);
  }


  mostrarNombre(producto?: Producto): string | undefined {
    return producto? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    console.log('Producto Seleccionado: ', producto);
   
    if(this.existeItem(producto.id)) {
        this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;   
      this.factura.items.push(nuevoItem);
    }
    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  actualizarCantidad(id: number, event:any):void {
    let cantidad = event.target.value as number;
    
    //* Sin numeros negativos
    if(cantidad ==0 ) {
      return this.deleteItem(id);
       
    }
    this.factura.items = this.factura.items.map((item:ItemFactura) => {
          if(id === item.producto.id){
            item.cantidad = cantidad;
          }
          return item;
      });

  }

  private existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach( (item: ItemFactura) => {
        if(id === item.producto.id) {
          existe = true;
        }
    });
    return existe;
  }

  private incrementaCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item:ItemFactura) => {
          if(id === item.producto.id){
            ++item.cantidad;
          }
          return item;
      });
    
  }

  deleteItem(id: number) : void {
    this.factura.items = this.factura.items.filter( (item: ItemFactura) => id !== item.producto.id);
  }

  create(facturaForm ):void{
    console.log('Factura a crear: ', this.factura);

    if(this.factura.items.length == 0) {
        this.autoCompleteControl.setErrors({'invalid': true});
    }

    if(facturaForm.form.valid && this.factura.items.length > 0) {
      this.facturaService.create(this.factura)
      .subscribe(response => {
        Swal.fire('Factura Creada', `La factura ${this.factura.descripcion} ha sido creada con éxito`, 'success');
        this.router.navigate(['/clientes']);
      });
    }
    
    
  }

}
