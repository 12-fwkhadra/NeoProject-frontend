import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginredirectService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot):  Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');

    // Only handle the 'login' path
    if (route.routeConfig?.path === 'login') {
      if (token) {
        let svcres = true;

          this.auth.authValidation(token).pipe(
            map((result) => {
              if (result.role === 'admin') {
                // Navigate to admin dashboard
                this.router.navigateByUrl('/dashboard');
              } else {
                // If the role is not recognized, redirect to login
                this.router.navigateByUrl('/login');
              }
              svcres = false;
            }),
            catchError((err) => {
              this.router.navigateByUrl('/login');
              return of(true); // Allow navigation to the login page
              })
            );
            return svcres;
      }
    }

    // For other paths, just allow navigation
    return true;
  }
}
