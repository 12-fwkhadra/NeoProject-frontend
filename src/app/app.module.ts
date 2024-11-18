import {APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- Import BrowserAnimationsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { MessageService } from 'primeng/api';
import {AuthenticationService} from "./services/authentication.service";
import {LoginredirectService} from "./services/loginredirect.service";
import {AppconfigService} from "./services/appconfig.service";
import {InterceptorService} from "./services/interceptor.service";
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {PasswordModule} from "primeng/password";
import { DashboardComponent } from './dashboard/dashboard.component';
import {CalendarModule} from "primeng/calendar";
import {MatTooltip} from "@angular/material/tooltip";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import { MatIconModule } from '@angular/material/icon';
import {RadioButtonModule} from "primeng/radiobutton";
import { ViewClientComponent } from './dashboard/view-client/view-client.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTransactionComponent } from './dashboard/add-transaction/add-transaction.component';
import {InputTextModule} from "primeng/inputtext";


const globalRippleConfig: RippleGlobalOptions = {
  disabled: true
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ViewClientComponent,
    AddTransactionComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatIcon,
        PasswordModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CalendarModule,
        MatTooltip,
        PaginatorModule,
        TableModule,
        MatIconModule,
        RadioButtonModule,
        MatDialogModule,
        InputTextModule

    ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AuthenticationService,
    LoginredirectService,
    AppconfigService,
    MessageService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (appConfigService: AppconfigService) => () => appConfigService.loadAppConfig(),
      deps: [AppconfigService]
    },
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
