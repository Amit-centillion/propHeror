import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  passwordVisible:boolean=false;
  responseMessage:string;
  successMessage:string;
  error:boolean=false;
  success:boolean=false;
  tokenValue:string;
  Email:boolean=false;
  passwords:boolean=false;
  LoginButton:boolean=false;
  catchError:boolean=true;
  isReadOnly:boolean=true;
  fetchEmail:string;
  passwordMessage:string='';
  passwordError:boolean=false;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private fb: FormBuilder, private authService: AuthService,private cdr: ChangeDetectorRef,private router:Router,private route: ActivatedRoute) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.getTokenFromUrl();
    this.passwordError=false;
    const token = this.getDecodedAccessToken(this.tokenValue);
    this.fetchEmail=token.email;
    this.initForm();
  }

  get f() {
    return this.resetPasswordForm.controls;
  }
  initForm() {
    this.resetPasswordForm = this.fb.group({
      email: [
        this.fetchEmail,
      ],
      password:[
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(
            RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
          )
     
        ]),
      ],
      confirmpassword:[
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),      
          Validators.pattern(
            RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
          )
        ]),
      ],
    });
  }
  submit() {
    this.errorState = ErrorStates.NotSubmitted;
    const forgotPasswordSubscr = this.authService
      .forgotPassword(this.f.email.value)
      .pipe(first())
      .subscribe((result: boolean) => {
        this.errorState = result ? ErrorStates.NoError : ErrorStates.HasError;
      });
    this.unsubscribe.push(forgotPasswordSubscr);
  }

  getTokenFromUrl() {
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.tokenValue = params['token'];
        this.validateActivationLink();
      }
    });
  }
  validateActivationLink(){
    this.authService.validateActivationLink(this.tokenValue).subscribe({
      next:(res:any) => {
        if (res.status===200){
          this.error=false
          this.Email=true;
          this.passwords=true;
        }
        else {
          this.responseMessage=res.message; 
          this.error=true;
          this.passwords=false;
          this.Email=false;
          this.catchError=false;
        }
        this.cdr.detectChanges();
      }
    });
  }
  updatePassword(){
    this.passwordError=false;
    const formvalue=this.resetPasswordForm.value;
    if(formvalue.password!==formvalue.confirmpassword){
      this.error=true;
      this.success=false;
     this.responseMessage="Password does not match";
     return
    }
    if(this.resetPasswordForm.invalid===true){
      this.passwordError=true;
      this.success=false;
     this.passwordMessage="Enter the new password.Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character (!@#$%&*).";
     return
    }
     const payload={
     username:formvalue.email,
     password:formvalue.password
    }
     this.authService.updatePassword(payload).subscribe({
       next:(res:any) => {
         if (res.status===200){
          this.LoginButton=true;
           this.error=false;
           this.success=true;
           this.successMessage='User account has been successfully activated';
           this.passwords=false;
           this.Email=false;
         }
         else {
          this.error=true;
          this.success=false;
           this.responseMessage=res.message;  
         }
         this.cdr.detectChanges();
       }
     });
   }
   onFormChange(){
    this.error=false; 
    this.passwordError=false;
  }





   getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

}
