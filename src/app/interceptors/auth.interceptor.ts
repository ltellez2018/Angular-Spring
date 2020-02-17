import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';

// * RXJS
import { Observable, throwError } from 'rxjs';
import { catchError, tap, pluck, map } from 'rxjs/operators';
//* CUSTOMS
import { AuthService } from '../services/auth.service';
//* SWEATALERT 2
import Swal from 'sweetalert2'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
        private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {


        return next.handle(req).pipe(
            catchError(error => {

                if (error.status == 401) {
                    if (this.authService.isAuthenticated()) {
                        this.authService.logout();
                    }
                    this.router.navigate(['/login']);
                }

                if (error.status == 403) {
                    Swal.fire({ icon: 'warning', title: 'Acceso denegado', text: `${this.authService.usuario.username} sin acceso al recurso` });
                    this.router.navigate(['/clientes']);
                }
                return throwError(error)
            })
        );
    }
}