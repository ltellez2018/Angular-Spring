import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { Factura } from 'src/app/data/factura-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html'
})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;
  titulo: string = 'Factura';

  constructor(private facturasService: FacturaService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //* OBTIENE EL PARAMETRO ID DE LA URL
    this.activatedRoute.paramMap.subscribe(params => {
      let id = + params.get('id');
      //* FETCH FACTURA
      this.facturasService.getFactura(id).subscribe(factura => {
        this.factura = factura;
      });

    });
  }



}
