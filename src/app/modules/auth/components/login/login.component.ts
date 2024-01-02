import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  // defaultAuth: any = {
  //   username: '',
  //   password: '',
  // };
  passwordVisible : boolean = false;
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  responseMessage:string;
  error:boolean=false;
  IsLoading: boolean = false;
  success:boolean=false;
  successMessage:string='';
  errorMessage:string='';
  passwordErrorMessage:string='';
  passwordError:boolean=false;
  isSubmitted: boolean=false;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.isSubmitted=false;
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['',
        Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: ['',
        Validators.compose([
        Validators.required
      ])]
    });
  }

  validateEmail(){
    this.isSubmitted=true
    this.error=false;
    this.responseMessage='';
    if(this.loginForm.valid){
      this.IsLoading = true;
      const formvalue=this.loginForm.value;
      let username=formvalue.username;
      this.authService.validateEmail(username).subscribe({
        next:(res:any) => {
          if (res.status===200){
            console.log(res);
            this.IsLoading = false;
            this.error=false;
            this.responseMessage='';
            this.submit();
            this.isSubmitted=false;
          }
          else {
            this.isSubmitted=false;
            this.IsLoading = false;  
            this.success=false;
            this.responseMessage=res.message;
            this.error=true;
          }
          this.cdr.detectChanges();
        }
      });
    }
  }
  submit() {
    this.isSubmitted=true;
    this.IsLoading = true;
    this.error=false;
    this.responseMessage='';
    this.passwordError=false;
    this.passwordErrorMessage='';
    this.hasError = false;
      var formValues = this.loginForm.value;
      this.authService
      .login(formValues).pipe(first())
      .subscribe((data: any | undefined) => {
        this.IsLoading = false;
        if(data){
          this.isSubmitted=false;
          var result = data;
          var response = JSON.parse(result)
          const token = this.getDecodedAccessToken(response.token);
          localStorage.setItem('user', JSON.stringify(data));
          this.authService.userSubject.next(data);
          localStorage.setItem('companySetting', JSON.stringify(response.companySettings));
          this.authService.companySettingSubject.next(response.companySettings);
          localStorage.setItem('usercred',data);
          this.authService.currentUserSubject.next(result.toString());
        if(response.roleId == 4) {
          this.router.navigateByUrl('/admin/company-setup')
        }
        else {
          this.isSubmitted=false;
          this.router.navigateByUrl('/listings');
        }
        }
        else{
          this.IsLoading = false;
          this.passwordError=true;
          this.passwordErrorMessage="Incorrect password. Please try again";
        }
        this.cdr.detectChanges();
      }
      );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  onFormChange(){
    this.error=false; 
    this.success=false;
    this.passwordError=false;
    this.isSubmitted=false;
  }
}

