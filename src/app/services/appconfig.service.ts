import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppconfigService {
  appConfig:any;
  constructor(private http: HttpClient) { }

  loadAppConfig() {
    const promise = new Promise<void>((resolve, reject) => {
      this.http.get('/assets/settings.json').subscribe({
        next: (res: any) => {
          this.appConfig = res[0];
          resolve();
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }
  get apiBaseUrl() : string {

    return this.appConfig['apiUrl'];
  }
}
