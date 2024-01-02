import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    const user = this.authService.userValue;

   if (user != null) {
    var userDetail = JSON.parse(user);
     // If we have a token, we set it to the header
     request = request.clone({
        setHeaders: {Authorization: `Bearer ${userDetail.token}`}
     });
  }

  return next.handle(request).pipe(
  	catchError((err) => {
   	 if (err instanceof HttpErrorResponse) {
       	 if (err.status === 401) {
       	 this.authService.logout();
     	}
 	 }
  	return throwError(err);
	})
   )
  }
}

