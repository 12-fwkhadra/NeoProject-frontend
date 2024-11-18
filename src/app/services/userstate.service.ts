import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserstateService {
  private authstate = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.authstate.asObservable();
  private adminstate = new BehaviorSubject<boolean>(false);
  isAdmin = this.adminstate.asObservable();
  private currentrole = new BehaviorSubject('');
  roleCode = this.currentrole.asObservable();

  constructor(private auth: AuthenticationService) { }
  setStatus(auth: boolean, right: boolean, role: string): void {
    this.authstate.next(auth);
    this.adminstate.next(right);
    this.currentrole.next(role);
  }
}
