import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Client } from 'src/app/interfaces/client-interface';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClientService{

  private urlEndPoint = 'http://localhost:8080/api';
  private httpHeader = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient) { }


  getClients() {  
    return this.http.get<Client[]>(`${this.urlEndPoint}/clientes`);
  }

  saveClient(cliente: Partial<Client>):Observable<Client> {
    return this.http.post<Client>(`${this.urlEndPoint}/clientes`, cliente, {headers: this.httpHeader});      
  }

  getCliente(id: string){   
    return this.http.get<Client>(`${this.urlEndPoint}/clientes/${id}`)
  }

  updateCliente(cliente: Partial<Client>) {
    return this.http.put<Client>(`${this.urlEndPoint}/clientes/${cliente.id}`,cliente,{headers: this.httpHeader});      
  }

    deleteCliente(id: number){ 
    return this.http.delete(`${this.urlEndPoint}/clientes/${id}`)
  }
}
