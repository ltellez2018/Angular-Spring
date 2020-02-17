import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuario } from '../data/usuario-data';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if(this._usuario! = null) {
      return this._usuario;
    }else if(this._usuario == null &&  
                sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }else {
      return new Usuario;
    }

  }

  public get token(): string {
    if(this._token! = null) {
      return this._token;
    }else if(this._token == null &&  
                sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }else {
      return null;
    }
    
  }


  login(usuario: Usuario): Observable<any> {

    const urlEndPoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');
    let httpHeader = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + credenciales });
    let params = new HttpParams()
    .set('grant_type', 'password')
    .set('username', usuario.username)
    .set('password', usuario.password);
    console.log('params: ', params.toString());
 
    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeader })

  }


  guardarUsuario(accessToken: string) {
    let payload = this.obtenerPayload(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
    
  }

  guardarToken(accessToken: string) {
    this._token = accessToken;
    sessionStorage.setItem('token',this._token);
  }


  obtenerPayload(accessToken: string):any {
    if(accessToken != null) {
      return  JSON.parse(atob(accessToken.split(".")[1]));
    }else{
      return null;
    }
  }

  isAuthenticated(): boolean {

    let payload = this.obtenerPayload(this.token);    
    if(payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }else {
      return false;
    }

  }

  hasRole (role: string) :boolean {
    if(this.usuario.roles.includes(role)){
      return true;
    }else {
      return false;
    }
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
  }



}
