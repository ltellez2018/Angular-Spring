import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
//* SWEATALERT 2
import Swal from 'sweetalert2'
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    let role = next.data['role'] as string;
    console.log('Role: ', role);

    if (this.authService.hasRole(role)) {
      return true;
    }
    Swal.fire({ icon: 'warning', title: 'Acceso denegado', text: `${this.authService.usuario.username} sin acceso al recurso` });
    this.router.navigate(['/clientes']);
    return false;
  }

}
