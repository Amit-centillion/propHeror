import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fakeAsync } from '@angular/core/testing';
// import { ToastrService } from 'ngx-toastr';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})

export class ForgotPasswordComponent implements OnInit {
  passwordVisible : boolean = false;
  forgotPasswordForm: FormGroup;
  responseMessage:string;
  isReadOnly:boolean=false;
  Email:boolean=true;
  showOTP:boolean=false;
  error:boolean=false;
  otpError:boolean=false;
  otpErrorMessage:string='';
  success:boolean=false;
  successMessage:string;
  Submit:boolean=true;
  passwords:boolean=false;
  LoginButton:boolean=false;
  otpSubmit:boolean=false;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;
  IsLoading: boolean = false;
  isSubmitted: boolean=false;
  confirmPasswordMessage:string='';
  passwordMessage:string='';
  disabledSubmit:boolean=false;
  disabledContinue:boolean=false;
  disabledReset:boolean=false;


  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private fb: FormBuilder, private authService: AuthService,private cdr: ChangeDetectorRef,private router:Router) {
    this.isLoading$ = this.authService.isLoading$;
    this.initForm();
  }

  ngOnInit(): void {
    this.isSubmitted=false;
    // this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      otp:[
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ]),
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
  isNumber(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  sendOtpForgotPassword(){
    this.IsLoading = true;
    this.isSubmitted=true;
    this.error=false;
    this.responseMessage='';
    const formvalue=this.forgotPasswordForm.value;
    let username=formvalue.email;
      this.authService.sendOtpForgotPassword(username).subscribe({
        next:(res:any) => {
          if (res.status===200){
            this.IsLoading = false;
            this.isSubmitted=false;
            // this.success=true;
            this.error=false;
            // this.successMessage='OTP sent successfully';
            this.isReadOnly=true;
            this.showOTP=true;
            this.otpSubmit=true;
            this.Submit=false;
          }
          else {
            this.isSubmitted=false;
            this.IsLoading = false;
            // this.toastr.error(res.message);
            this.error=true;
            this.success=false;
            this.otpSubmit=false;
             this.responseMessage=res.message;
          }
          this.cdr.detectChanges();
        }
      });
    }
  validateOtpForgotPassword(){
    this.isSubmitted=true;
    this.otpErrorMessage='';
    const formvalue=this.forgotPasswordForm.value;
      let username=formvalue.email;
      let otp=formvalue.otp;
      this.authService.validateOtpForgotPassword(username,otp).subscribe({
        next:(res:any) => {
          if (res.status===200){
            this.isSubmitted=false;
            this.otpError=false
            this.error=false;
            // this.success=true;
            // this.successMessage=res.message;
            this.showOTP=false;
            this.otpSubmit=false;
            this.passwords=true;
          }
          else {
            this.isSubmitted=false;
            this.otpError=true;
            this.otpErrorMessage='Invalid OTP, please try again with correct OTP';
          }
          this.cdr.detectChanges();
        }
      });
    }
  updatePassword(){
    this.confirmPasswordMessage='';
    this.passwordMessage='';
    this.isSubmitted=true;
    this.error=false;
    this.responseMessage='';
   const formvalue=this.forgotPasswordForm.value;
    if(formvalue.password!==formvalue.confirmpassword){
      this.error=true;
      this.success=false;
      this.confirmPasswordMessage="Password does not match";
      return
     }
   if(this.forgotPasswordForm.invalid===true){
    this.error=true;
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
          this.isSubmitted=false;
          this.error=false;
          this.success=true;
          this.successMessage=res.message;
          this.passwords=false;
          this.Submit=false;
          this.Email=false;
          this.LoginButton=true;
        }
        else {
          this.isSubmitted=false;
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
    this.otpError=false;
    this.isSubmitted=false;
  }
  
  // display: any;
  // timer(minute:any) {
  //   let seconds: number = minute * 60;
  //   let textSec: any = "0";
  //   let statSec: number = 60;

  //   const prefix = minute < 10 ? "0" : "";

  //   const timer = setInterval(() => {
  //     seconds--;
  //     if (statSec != 0) statSec--;
  //     else statSec = 59;

  //     if (statSec < 10) {
  //       textSec = "0" + statSec;
  //     } else textSec = statSec;

  //     this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

  //     if (seconds == 0) {
  //       console.log("finished");
  //       clearInterval(timer);
  //     }
  //   }, 1000);
  // }
}
