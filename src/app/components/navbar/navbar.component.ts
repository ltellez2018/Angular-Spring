import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
//* SWEATALERT 2
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    
  }

  logout(): void {
    Swal.fire( { icon: 'info',title: 'Sesión finalizada', text: `Bye ${this.authService.usuario.username}`});
    this.authService.logout();
    this.router.navigate(['/login']); 

  }
}
