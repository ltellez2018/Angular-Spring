import { Injectable } from '@angular/core';

import * as dataFile from '../data/clients.json';
import { of } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService{

  constructor() { }


  getClients() {
    return of(dataFile.clients);    
  }
}
