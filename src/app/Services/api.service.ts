import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: any = {}): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params })
      .pipe(
        tap((res) => this.getReutnData(res)),
        catchError((err) => this.getformatErrors(err))
      );
  };

  getById(path: string, id: number, params: any = {}): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}${id}`, { params })
      .pipe(
        tap((res) => this.getReutnData(res)),
        catchError((err) => this.getformatErrors(err))
      );
  };


  getWithParms(path: string, params: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params })
      .pipe(
        tap((res) => this.getReutnData(res)),
        catchError((err) => this.getformatErrors(err))
      );
  };

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    ).pipe(
      tap((res) => this.putReutnData(res)),
      catchError((err) => this.postPutFormatErrors(err))
    );
  }

  private putReutnData(res: any) {
    return res || {};
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body
    ).pipe(
      tap((res) => this.postReutnData(res)),
      catchError((err) => this.postPutFormatErrors(err))
    );
  };

  delete(path: string, body: Object = {}): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`,
      body
    ).pipe(
      tap((res) => this.deleteReturnData(res)),
      catchError(this.formatErrors)
    );
  }

  private deleteReturnData(res: any) {
    if (res && res.status && res.message) {
      if (res && res.code == 0) {
      } else {
      }
    }
    return res || {};
  }

  private getReutnData(res: any) {
    return res || {};
  }
  public getformatErrors(error: any): any {
    return throwError(error);
  }

  private postReutnData(res: any) {
    return res || {};
  }


  public postPutFormatErrors(error: any): any {
    try {

    } catch {

    } finally {

      return throwError(error.error);
    }
  }
}
