import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {UserstateService} from "../services/userstate.service";
import {delay} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  user:any;
  isLoading = false;
  constructor(private auth: AuthenticationService, private router: Router, private state: UserstateService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.user = {};
  }
  onLogin(): void {

    this.auth.login(this.user).pipe(

      delay(1500)
    ).subscribe((user) => {
      localStorage.setItem('token', user.auth_token);
      if (user.role === 'admin') {
        this.state.setStatus(true, true, 'admin');
        this.router.navigateByUrl('/dashboard');
       } else {
        this.state.setStatus(true, false, '');
        this.router.navigateByUrl('/login');
      }
    }, err => {
      this.messageService.add({ severity: 'error', detail: err.error.message });
      this.isLoading = false;
    });
  }
}
