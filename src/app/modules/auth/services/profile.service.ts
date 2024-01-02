import { Injectable } from '@angular/core';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  public baseUrl = environment.apiUrl;
  public token = new HttpHeaders().append(
    'Authorization',
    `Bearer ${this.authService.currentUserValue?.token}`
  );

  constructor(
    private authHttpService: AuthHTTPService,
    public httpClient: HttpClient,
    public authService: AuthService
  ) { }

  updateUser(payload:any){
    return this.httpClient.post(this.baseUrl +`User/UpdateUser`,payload);
  }
  updateProfileImage(data:any) {
    return this.httpClient.post(this.baseUrl + `User/UpdateProfileImage`, data);
  }
}
