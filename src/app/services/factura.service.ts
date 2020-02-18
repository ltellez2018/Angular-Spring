import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Factura } from '../data/factura-data';
import { Producto } from '../data/producto-data';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private urlEndPoint = 'http://localhost:8080/api/facturas';

  constructor(private http: HttpClient, private router: Router) { }



  //**  Fetch Facturas **//
  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }


  //**  delete Factura **//
  delete(id: number) {
    return this.http.delete(`${this.urlEndPoint}/${id}`);
  }

  //**  Filtrar productos **//
  fltrarProdcutos(termino: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${termino}`);
  }

  //**  Save Factura  **//
  create (factura: Factura): Observable<Factura>{
    return this.http.post<Factura>(`${this.urlEndPoint}`, factura );
    
  }

}
