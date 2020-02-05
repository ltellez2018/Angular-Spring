import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client-interface';
import { ClientService } from '../../services/client.service.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  
  clients$: Observable< Client[] > =  new Observable< Client[] >();

  constructor(private clientService : ClientService) { }

  ngOnInit() {
       this.clients$ = this.clientService.getClients();      
  }

}
