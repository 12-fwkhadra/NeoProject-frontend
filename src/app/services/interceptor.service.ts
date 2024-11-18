import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const url = this.router.url;
    let portal = 'AdminPortal'
    if (request.headers.has('authorization') === false ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          Portal: portal
        }
      });
    }
    return next.handle(request);
  }
}
