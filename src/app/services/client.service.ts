import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { catchError, tap, pluck, map } from 'rxjs/operators';
//* SWEATALERT 2
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { DatePipe, formatDate } from "@angular/common";
import { Region } from '../data/region-data';
import { Cliente } from '../data/cliente-data';

//*


@Injectable({
  providedIn: 'root'
})
export class ClientService{

  private urlEndPoint = 'http://localhost:8080/api';
  private httpHeader = new HttpHeaders({'Content-type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) {    
   
   }

   getRegiones(): Observable<Region[]>{
      return this.http.get<Region[]>(`${this.urlEndPoint}/clientes/regiones`);
   }


  getClients() {  
    /* return this.http.get<Client[]>(`${this.urlEndPoint}/clientes`); */
    return this.http.get<Cliente[]>(`${this.urlEndPoint}/clientes`)
      .pipe(
          map( (clientes :Cliente[]) =>  clientes.map(cliente => ( { ...cliente,
                                                                        //createAt: new DatePipe('es-MX').transform(cliente.createAt,'EEEE dd, MMMM yyyy'),
                                                                        createAt: formatDate(cliente.createAt,'dd-MM-yyyy','en_US'),
                                                                        nombre: cliente.nombre.toUpperCase()} )))
          );
  }

  getClientsByPage(page: number) {  
    
    /* return this.http.get<Client[]>(`${this.urlEndPoint}/clientes`); */
    return this.http.get(`${this.urlEndPoint}/clientes/page/${page}`);
    
  }

  
/*   getClientsByPage(page: number) {  
    console.log('getClientsByPage: ' , page);
    
  
    return this.http.get<Client[]>(`${this.urlEndPoint}/clientes/page/${page}`)
      .pipe( 
          tap(console.log),
          pluck<any,Client[]>('content'),
          map( (clientes :Client[]) =>  clientes.map(cliente => ( { ...cliente,
                                                                        //createAt: new DatePipe('es-MX').transform(cliente.createAt,'EEEE dd, MMMM yyyy'),
                                                                        createAt: formatDate(cliente.createAt,'dd-MM-yyyy','en_US'),
                                                                        nombre: cliente.nombre.toUpperCase()} ))),
          tap(console.log)
          );
  } 
  */

  saveClient(cliente: Partial<Cliente>):Observable<Cliente> {
    return this.http.post<Cliente>(`${this.urlEndPoint}/clientes`, cliente, {headers: this.httpHeader})
      .pipe(
        tap(console.log),
        catchError( err => {
          if(err.status === 400){
            return throwError(err);
          }
          console.log(err.error.mensaje);
          Swal.fire( { icon: 'error',title: err.error.mensaje, text: err.error.error});
          return throwError(err);
        }),
      );           
  }

  getCliente(id: number){   
    return this.http.get<Cliente>(`${this.urlEndPoint}/clientes/${id}`)
      .pipe(
        catchError(err => {
            this.router.navigate(['/clientes']);
            Swal.fire({ icon: 'error', title: 'Error al editar', text: err.error.mensaje});
            return throwError(err);
        })
      )
  }

  updateCliente(cliente: Partial<Cliente>) {
    return this.http.put<Cliente>(`${this.urlEndPoint}/clientes/${cliente.id}`,cliente,{headers: this.httpHeader})
    .pipe(
      catchError( err => {
        if(err.status === 400){
          return throwError(err);
        }
        console.log(err.error.mensaje);
        Swal.fire({ icon: 'error', title: err.error.mensaje, text: err.error.error });
        return throwError(err);
      }),       
      pluck('cliente')
    );           
}

    deleteCliente(id: number){ 
    return this.http.delete(`${this.urlEndPoint}/clientes/${id}`)
    .pipe(catchError( err => {
      console.log(err.error.mensaje);
      Swal.fire({
        icon: 'error',
        title: err.error.mensaje,
        text: err.error.error,
      });
      return throwError(err);
    }));           
  }

  subirFoto(archivo: File, id):Observable<HttpEvent<any>>{
    let formData = new FormData()
    formData.append("archivo",archivo);
    formData.append("id",id);
    
    const req = new HttpRequest('POST',`${this.urlEndPoint}/clientes/upload`,formData,{reportProgress: true});

  /*   return this.http.request(req)
        .pipe(
          map((response:any) => response.cliente as Client),
          catchError( err => {
            console.log(err.error.mensaje);
            Swal.fire({
              icon: 'error',
              title: err.error.mensaje,
              text: err.error.error,
            });
            return throwError(err);
          })
        ); */

        return this.http.request(req);
  }
}
