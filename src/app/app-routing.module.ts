import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LoginredirectService} from "./services/loginredirect.service";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginredirectService] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [LoginredirectService] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginredirectService]
})
export class AppRoutingModule { }
