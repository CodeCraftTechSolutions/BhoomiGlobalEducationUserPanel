import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import ls from 'localstorage-slim';
import { Observable } from 'rxjs';

export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = ls.get('token')?.toString() ?? "";
    console.log("Retrieved Token:", token);

    request = this.addToken(request, token);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string) {
    console.log("Adding token to request");
    if (token) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    } else {
      return request;
    }
  }
}
