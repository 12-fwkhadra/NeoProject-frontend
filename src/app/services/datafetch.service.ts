import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AppconfigService } from './appconfig.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatafetchService {

  constructor(private http: HttpClient, private appconf: AppconfigService) { }

    private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Get the token from localStorage (or wherever it's stored)
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Directly set the Authorization header
    });

    return headers;
  }

  getAllClients(filter:any, page: number, perpage:number): Observable<any> {
    let url: string = `${this.appconf.apiBaseUrl}/clients/`;
    let queryParams: string[] = [];

    if (filter.search_query) {
      queryParams.push(`search_query=${filter.search_query}`);
    }
    if (filter.send_date !== undefined) {
      queryParams.push(`date=${filter.date}`);
    }
    if (filter && filter.country !== undefined) {
      queryParams.push(`country=${filter.country}`);
    }
    if (page !== undefined) {
      queryParams.push(`page=${page}`);
    }
    if (perpage !== undefined) {
      queryParams.push(`per_page=${perpage}`);
    }
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }
    const headers = this.getAuthHeaders();
    return this.http.get<any>(url, {headers});
  }

    exportClients(filter:any): Observable<any> {
    let url: string = `${this.appconf.apiBaseUrl}/clients/export/`;
    let queryParams: string[] = [];

    if (filter.search_query) {
      queryParams.push(`search_query=${filter.search_query}`);
    }
    if (filter.send_date !== undefined) {
      queryParams.push(`date=${filter.date}`);
    }
    if (filter && filter.country !== undefined) {
      queryParams.push(`country=${filter.country}`);
    }
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }
    const headers = this.getAuthHeaders();
    return this.http.get<any>(url, { responseType: 'blob' as 'json' });
  }

  getClientTransactions(cid: number, dateRange:any): Observable<any> {
    let url: string = `${this.appconf.apiBaseUrl}/clients/${cid}/`;
    const params = {
      dateRange: dateRange
    };
    return this.http.get<any>(url, {params: params});
  }

  getCountries(): Observable<any> {
    let url: string = `${this.appconf.apiBaseUrl}/countries/`;
    return this.http.get<any>(url);
  }

  getCurrencies(): Observable<any> {
    let url: string = `${this.appconf.apiBaseUrl}/currencies/`;
    return this.http.get<any>(url);
  }

  deleteTran(tid: number): Observable<any> {
    let url: string = `${this.appconf.apiBaseUrl}/transaction/delete`;
    return this.http.get<any>(url + '/' + tid + '/');
  }
}
