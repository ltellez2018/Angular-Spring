import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../data/usuario-data';
//* SWEATALERT 2
import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  titulo = "Inicie Sesión";

  constructor(private authService: AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/clientes']); 
      Swal.fire( { icon: 'info',title: 'La Session ya se ha iniciado', text: `Hola ${this.authService.usuario.username}`});
    }
  }


  login():void{
    if( !this.usuario.username || !this.usuario.password ){
      Swal.fire( { icon: 'error', title: 'Error en Login', text: 'Usuario y Password requeridos'});
      return;
    };

    this.authService.login(this.usuario).subscribe(response => {
          
          this.authService.guardarUsuario(response.access_token);
          this.authService.guardarToken(response.access_token);
          let usuario = this.authService.usuario;   
          console.log(usuario);      
          this.router.navigate(['/clientes']); 
          Swal.fire( { icon: 'success',title: 'Session iniciada', text: `Hola ${usuario.username}`});
    },err => {
      if(err.status == 400){
        Swal.fire( { icon: 'error', title: 'Error en Login', text: 'Usuario y/o Password incorrectos'});
      }

    });

  }

}
  