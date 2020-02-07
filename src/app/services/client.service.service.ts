import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Client } from 'src/app/interfaces/client-interface';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, pluck } from 'rxjs/operators';
//* SWEATALERT 2
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClientService{

  private urlEndPoint = 'http://localhost:8080/api';
  private httpHeader = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient, private router: Router) { }


  getClients() {  
    return this.http.get<Client[]>(`${this.urlEndPoint}/clientes`);
  }

  saveClient(cliente: Partial<Client>):Observable<Client> {
    return this.http.post<Client>(`${this.urlEndPoint}/clientes`, cliente, {headers: this.httpHeader})
      .pipe(
        tap(console.log),
        catchError( err => {
        console.log(err.error.mensaje);
        Swal.fire( { icon: 'error',title: err.error.mensaje, text: err.error.error});
        return throwError(err);
        }),
        pluck('cliente')
      );           
  }

  getCliente(id: string){   
    return this.http.get<Client>(`${this.urlEndPoint}/clientes/${id}`)
      .pipe(
        catchError(err => {
          this.router.navigate(['/clientes']);
            console.log(err.error.mensaje);
            Swal.fire({
            icon: 'error',
            title: 'Error al editar',
            text: err.error.mensaje,
          });

          return throwError(err);
        })
      )
  }

  updateCliente(cliente: Partial<Client>) {
    return this.http.put<Client>(`${this.urlEndPoint}/clientes/${cliente.id}`,cliente,{headers: this.httpHeader})
    .pipe(
      catchError( err => {
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
}
