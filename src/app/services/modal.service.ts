import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private notificarUpload = new EventEmitter<any>();
  modal: boolean = false;
  constructor() { }

  get _notificarUpload(){
    return this.notificarUpload;
  }
 

  abriModal(){
    this.modal = true;
  }

  cerraModal(){
    this.modal = false;
  }
}
