import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppconfigService } from './appconfig.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasendService {

  constructor(private http: HttpClient, private appconf: AppconfigService) { }

  addTransaction(data: any): Observable<any> {
    let url: string = `${this.appconf.apiBaseUrl}/add_tran/`;
    return this.http.post<any>(url, data, {headers: {'Content-Type': 'application/json'}});
  }

}
