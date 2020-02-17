import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       if(this.authService.isAuthenticated()) {
           if(this.isTokenExpirado()) {
             this.authService.logout();
               this.router.navigate(['/login']);
               return false;
           }
         return true;
       }
      this.router.navigate(['/login']);
       return false;       
  }


  isTokenExpirado(): boolean {
    let token   =  this.authService.token;
    let payload =  this.authService.obtenerPayload(token);
    let now = new Date().getTime() / 1000;
    // ! Expiro token
    if(payload.exp < now) {
        return true;
    }
    return false;

  }
  
}
