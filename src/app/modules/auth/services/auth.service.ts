import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  public baseUrl = environment.apiUrl;

  public userSubject: BehaviorSubject<null>;
  public companySettingSubject = new BehaviorSubject<any>(null);
    public user: Observable<null>;
  public companySetting: Observable<null>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<any>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: any) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    public httpClient: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
    this.companySettingSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('companySetting')!));
    this.companySetting = this.companySettingSubject.asObservable();
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  validateEmail(username: string){
    const params = new HttpParams().set('username',username)
    return this.httpClient.get(this.baseUrl+`Login/ValidateEmail?${params}`);
  }

  login(data:any) {
    return this.httpClient.post(this.baseUrl + `v1/login`,data, { responseType: 'text' });
  }
  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
        this.userSubject.next(null);
        this.companySettingSubject.next(null);
        localStorage.removeItem('companySetting');
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  public get userValue() {
    return this.userSubject.value;
}

public get companySettingsValue() {
  return this.companySettingSubject.value;
}

  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.authToken).pipe(
      map((user: any) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  // Forgot Passowrd
  sendOtpForgotPassword(username: string){
    const params = new HttpParams().set('username',username)
    return this.httpClient.get(this.baseUrl+`Login/SendOtp?${params}`);
  }
  validateOtpForgotPassword(username: string,otp:string){
    const params = new HttpParams().set('username',username)
    .set('otp',otp)
    return this.httpClient.get(this.baseUrl+`Login/ValidateOtp?${params}`);
  }
  updatePassword(payload:any){
    return this.httpClient.post(this.baseUrl +`Login/UpdatePassword`,payload);
  }
  // Reset Password
  validateActivationLink(token: string){
    const params = new HttpParams().set('token',token)
    // return this.httpClient.post(this.baseUrl+`User/ValidateActivationLink`,params);
    return this.httpClient.post(this.baseUrl + `User/ValidateActivationLink?${params}`, {});
  }
  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
