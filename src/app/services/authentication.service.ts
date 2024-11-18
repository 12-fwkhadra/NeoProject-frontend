import { Injectable } from '@angular/core';
import { AppconfigService } from './appconfig.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private appconf: AppconfigService) { }
  login(user:any): Observable<any> {
    let url: string = `${this.appconf.apiBaseUrl}/auth/login/`;
    return this.http.post<any>(url, user, {headers: {'Content-Type': 'application/json'}});
  }
  authValidation(token:any): Observable<any> {
    let url: string = `${this.appconf.apiBaseUrl}/auth/status/`;
    return this.http.get(url, {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}});
  }
  logout(token:any): Observable<any> {
    let url: string = `${this.appconf.apiBaseUrl}/auth/logout/`;
    return this.http.get(url, {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}});
  }
}
