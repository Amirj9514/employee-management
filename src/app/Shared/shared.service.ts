import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  sharedData = new BehaviorSubject({});
  constructor(private httpClient: HttpClient, private router: Router , private navCtrl: NavController) {}


  navigateBack(){
    this.navCtrl.back();
  }
  
  getTimeZone() {
    return '?timezone=' + Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: any = '';
    if (error.status === 400) {
      errorMessage = 'Bad Request (400)';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized (401)';
    } else {
      errorMessage = `Error: ${error.message}`;
    }
    // this.toastS.setToast({
    //   show: true,
    //   message: errorMessage ?? 'Something went wrong',
    //   severity: 'error',
    // });
    return throwError(() => ({
      success: false,
      error: errorMessage,
      status: error.status,
    }));
  }

  private getToken() {
    let localStorageData = JSON.parse(
      localStorage.getItem('sharedData@EMPLOYEEMANAGEMENT') || '{}'
    );
    if (localStorageData && localStorageData.token) {
      return localStorageData.token ?? null;
    }
    return null;
  }

  /** to get data this.sharedService.getData().subscribe((data: any) => {}) **/
  public getData() {
    let storedData = localStorage.getItem('sharedData@EMPLOYEEMANAGEMENT');
    this.sharedData.next(JSON.parse(storedData || '{}'));
    return this.sharedData.asObservable();
  }

  /** to insert data this.sharedService.insertData({ key: 'name', val: response.data }) **/
  public insertData(data: any) {
    this.sharedData.next({
      ...this.sharedData.getValue(),
      [data.key]: data.val,
    });

    localStorage.setItem(
      'sharedData@EMPLOYEEMANAGEMENT',
      JSON.stringify(this.sharedData.value)
    );
  }

  /** Get Request with auth Token **/
  public sendGetRequest(target: string, jwtToken?: string): Observable<any> {
    if (!jwtToken) {
      jwtToken = this.getToken();
    }
    const headers_object = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient
      .get<any>(environment.apiUrl + target, httpOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /** Post Request with token auth **/
  public sendPostRequest(target: string, data: any): Observable<any> {
    let token = this.getToken();
    const headers_object = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient
      .post<any>(environment.apiUrl + target, data, httpOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /** Delete Request with token auth **/
  public sendDeleteRequest(target: string): Observable<any> {
    let token = this.getToken();
    const headers_object = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient
      .delete<any>(environment.apiUrl + target, httpOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /** Put Request with token auth **/
  public sendPutRequest(target: string, data: any): Observable<any> {
    let token = this.getToken();
    const headers_object = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient
      .put<any>(environment.apiUrl + target, data, httpOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }

  public sendDownloadRequest(target: string) {
    let token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
    });

    this.httpClient
      .get(target, {
        headers,
        responseType: 'blob' as 'json',
        observe: 'response',
      })
      .subscribe(
        (response) => {
          const blob = response.body as Blob;
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = 'downloaded_file.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(objectUrl);
        },
        (error) => {
          console.error('Error downloading file:', error);
        }
      );
  }

  public getBlob(target: string, jwtToken?: string): Observable<any> {
    if (!jwtToken) {
      jwtToken = this.getToken(); // Your own method to fetch token
    }

    const headers_object = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });

    const httpOptions = {
      headers: headers_object,
      responseType: 'blob' as 'json', // Important: cast to 'json' for TypeScript
    };

    return this.httpClient
      .get<Blob>(environment.apiUrl + target, httpOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }
}
