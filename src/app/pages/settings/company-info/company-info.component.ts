import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CompanySettingsService } from 'src/app/modules/auth/services/company-settings/company-settings.service';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit{

  public companyInfoForm: FormGroup;
  companyId:any;
  companyInfoData:any;
  submitted = false;
  userData:any;
  userId:number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private companySettinsService:CompanySettingsService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
  ) {
    this.companyInfoForm = this.formBuilder.group({
      companyName: new FormControl('', [Validators.required]),
      reraorn: new FormControl('', []),
      trn: new FormControl('', []),
      address: new FormControl('', []),
      phone: new FormControl('', []),
      email: new FormControl('', []),
      website: new FormControl('', []),
      companyProfile: new FormControl('', []),
    });
    var userData = localStorage.getItem('usercred');
    if(userData != null){
      this.userData= JSON.parse(userData);
      }
    this.userData!= null ? this.companyId = this.userData.companyId : this.companyId = 1;
  }

  ngOnInit(): void {
    this.getCompanyInfo();
    const userData:any = this.authService.userValue;
    var data=JSON.parse(userData);
    this.userId=data.id;
  }

  isNumber(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  save(){
        this.submitted = true;
    const body = this.companyInfoForm.value;
    body.updatedBy=this.userId;
    if(this.companyInfoForm.valid){
    this.companyId == null ? body.companyId = 0 : body.companyId = this.companyId;
    this.companySettinsService
    .setCompanyInfoSettings(body)
    .subscribe((data: any | undefined) => {
      if( data.status === 200){
        this.toastr.success('Company Info updated successfully');
        this.getCompanyInfo();
      }
      else{
        this.toastr.error('Something went wrong...');
      }
     
    });
  }
  }

  getCompanyInfo(){
    this.companySettinsService
      .getCompanyInfoSettings(this.companyId)
      .subscribe((data: any | undefined) => {
        this.companyInfoData = data[0];
        if(this.companyInfoData){
          this.companyInfoForm.controls['companyName'].setValue(this.companyInfoData.companyName);
          this.companyInfoForm.controls['reraorn'].setValue(this.companyInfoData.reraorn);
          this.companyInfoForm.controls['trn'].setValue(this.companyInfoData.trn);
          this.companyInfoForm.controls['address'].setValue(this.companyInfoData.address);
          this.companyInfoForm.controls['phone'].setValue(this.companyInfoData.phone);
          this.companyInfoForm.controls['email'].setValue(this.companyInfoData.email);
          this.companyInfoForm.controls['website'].setValue(this.companyInfoData.website);
          this.companyInfoForm.controls['companyProfile'].setValue(this.companyInfoData.companyProfile);
        }
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.companyInfoForm.controls;
  }

}

