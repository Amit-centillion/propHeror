import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AdminService } from 'src/app/modules/auth/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { CompanySettingsService } from 'src/app/modules/auth/services/company-settings/company-settings.service';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';

@Component({
  selector: 'app-company-setup-details',
  templateUrl: './company-setup-details.component.html',
  styleUrls: ['./company-setup-details.component.scss']
})

export class CompanySetupDetailsComponent implements OnInit{
  basic: boolean = true;
  displayCollase=true;
  companySetupForm: FormGroup;
  getAllCompanyAccounts:any[]=[];
  selectedCompany:any={};
  isDuplicateEmail = false;
  submitted = false;
  isEdit = false;
  oncancel=false;
  onEdit=false;
  onSave=true;
  companyID:number;
  createdBy:number;
  userId:number;
  timeZoneData:any[]=[];
  getAllCountry:any[]=[];
  CurrencyList: any[] =[];
  CountryList:any = [];
  // measuringUnitList:any[]=[];
  measuringUnitList:any[]=[
    {id:1,name:'Square Feet'},{id:2,name:'Square Meter'}
  ]
  CountryCodeList: any[] = [];
  companyName:string='';
  AllStatusTypes: any[] = [
    { id: true, name: 'Active'},
    { id: false, name: 'Inactive' },
  ];
  AllRolesTypess: any[] = [
    { id: 1, name: 'Agent' },
    { id: 2, name: 'Manager' },
    { id: 3, name: 'Admin' },
  ];
  AllRolesTypes:any[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private adminService:AdminService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private toastr: ToastrService,
    private companySettingService:CompanySettingsService,
    private dropdownService: DropdownService,
  ){
    this.companySetupForm = this.formBuilder.group({
      companyName: new FormControl('', [Validators.required]),
      numberOfUsers: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
      // reraorn: new FormControl('', [Validators.required]),
      // trn: new FormControl('', [Validators.required]),
      // address: new FormControl('', [Validators.required]),
      // phone: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
      email: new FormControl('', [Validators.required]),
      // website: new FormControl('', [Validators.required]),
      // companyProfile: new FormControl('', [Validators.required]),
      country: new FormControl(null),
      currency: new FormControl('', [Validators.required]),
      measuringUnit: new FormControl('', [Validators.required]),
      timezone: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      lastName:new FormControl('', [Validators.required]),
      firstName:new FormControl('', [Validators.required]),
      // CountryCode: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      countryId: new FormControl('', [Validators.required]),
      adminUserId: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.isDuplicateEmail = false;
    this.submitted = false;
    const userData:any = this.authService.userValue;
    var data=JSON.parse(userData);
    this.userId=data.id;
    this.getTimeZoneList();
    this.getCurrencyList();
    this.getCountryList();
    this.getMeasurementUnits();
    this.getAllCompaniesAccounts();
    this.getRolesTo();
    this.getCountryList();
    this.adminService.isCompanyDetails.pipe().subscribe((data: any) => {
      if(data?.addCompany){
        this.isDuplicateEmail = false;
        this.submitted = false;
        this.isEdit=false;
        this.onSave=true;
        this.oncancel=false;
        this.onEdit=false;
        this.companySetupForm.reset();
        this.companySetupForm.enable();
        this.basic = true;
        this.companySetupForm.controls['status'].setValue(true);
      }
      if (data?.editCompany && data?.Id != undefined && data?.Id != null) {
               this.isDuplicateEmail = false;
               this.submitted = false;
               this.setFormValue(data?.Id);
               this.basic = true;
      }

    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.companySetupForm.controls;
  }
  isNumber(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
//   getCountryCodeList() {
//     this.dropdownService.getCountryCodeList().subscribe((data: any) => {
//       this.CountryCodeList = data.map((x: any) => ({
//         id: x.id,
//         name: x.name + '(' + x.code.trim() + ')',
//         code: x.code.trim()
//       }));
//     });
// }
  getTimeZoneList(){
    this.companySettingService.getTimeZoneList().subscribe({
      next:(res:any) => {
        this.timeZoneData=res;
      }
    });
  }
  getCountryList(){
    this.companySettingService.getSystemCountries().subscribe({
      next:(res:any) => {
        this.getAllCountry=res;
      }
    }); 
  }
  getAllCompaniesAccounts(){
    this.companySettingService.getAllCompaniesAccounts().subscribe({
      next:(res:any) => {
        this.getAllCompanyAccounts=res;
      }
    });
  }
  getCurrencyList(){
    this.companySettingService.getCurrencyList().subscribe({
      next:(res:any) => {
        this.CurrencyList=res;
      }
    });
  }
  
  getMeasurementUnits(){
    this.companySettingService.getMeasurementUnits().subscribe({
      next:(res:any) => {
        this.measuringUnitList=res;
      }
    });
  }
  getRolesTo(){
    this.adminService.getRolesTo().subscribe({
      next:(res:any) => {
        this.AllRolesTypes=res;
      }
    }); 
  }
  insertCompany(){
    this.submitted=true;
    const formvalue=this.companySetupForm.value;
    const companySystemSettings={
      companyId:null,
      currency:formvalue.currency,
      measuringUnit:formvalue.measuringUnit,
      timezone:formvalue.timezone,
      countryId:formvalue.countryId
    }
    const payload={
      companyId:null,
      companyName:formvalue.companyName,
      numberOfUsers:formvalue.numberOfUsers,
      reraorn:null,
      trn:null,
      address:null,
      phone:null,
      email:formvalue.email,
      website:null,
      companyProfile:null,
      firstName:formvalue.firstName,
      lastName:formvalue.lastName,
      createdBy:this.userId,
      updatedBy:null,
      countryCodeId:null,
      status:formvalue.status,
      role:formvalue.role,
      companySystemSettings:companySystemSettings
    }
    if (this.companySetupForm.invalid) {
      let ErrroKey: any[] = [];
      for (const [key] of Object.entries(this.companySetupForm.controls)) {
        if (this.companySetupForm.controls[key].status == 'INVALID') {
          ErrroKey.push(key);
        }
      }
      if (ErrroKey.length > 0) {
        switch (ErrroKey[0]) {
        }
      }
    }
    if(this.companySetupForm.valid){
      this.adminService.insertUpdateCompany(payload).subscribe({
        next:(res:any) => {
          if(res.status == -1){
            this.isDuplicateEmail = true;
            this.cdr.detectChanges();
            return false;
            }
         else if (res.status===200){
           this.toastr.success(res.message);
           this.companySettingService.CallCompany(true);
           this.companySettingService.triggerRefresh();
           document?.getElementById('kt_company_setup_details_close')?.click();
          }
          else {
           this.toastr.error(res.message);
          }
          this.cdr.detectChanges();
        }
      });
    }
  }
  updateCompany(){
    this.submitted=true;
    const formvalue=this.companySetupForm.value;
    const companySystemSettings={
      companyId:this.companyID,
      currency:formvalue.currency,
      measuringUnit:formvalue.measuringUnit,
      timezone:formvalue.timezone,
      countryId:formvalue.countryId
    }
    const payload={
      companyId:this.companyID,
      companyName:formvalue.companyName,
      numberOfUsers:formvalue.numberOfUsers,
      reraorn:null,
      trn:null,
      address:null,
      phone:null,
      email:formvalue.email,
      website:null,
      companyProfile:null,
      firstName:formvalue.firstName,
      lastName:formvalue.lastName,
      createdBy:this.userId,
      updatedBy:this.userId,
      countryCodeId:null,
      status:formvalue.status,
      role:formvalue.role,
      companySystemSettings:companySystemSettings,
      adminuserId: formvalue.adminUserId
    }
    if(this.companySetupForm.valid){
      this.adminService.insertUpdateCompany(payload).subscribe({
        next:(res:any) => {
          if(res.status == -1){
            this.isDuplicateEmail = true;
            this.cdr.detectChanges();
            return false;
            }
          else if (res.status===200){
           this.toastr.success(res.message);
           this.companySettingService.CallCompany(true);
           this.companySettingService.triggerRefresh();
           document?.getElementById('kt_company_setup_details_close')?.click();
          }
          else {
           this.toastr.error(res.message);
          }
          this.cdr.detectChanges();
        }
      });
    }
  }
  save(){
    if(this.isEdit===true){
      this.updateCompany();
    }
    else{
      this.insertCompany();   
    }
  }
  setFormValue(Id:number){
  this.companyID=Id;
  this.isEdit=true;
  this.onSave=false;
  this.onEdit=true;
  this.oncancel=false;
    this.selectedCompany = this.getAllCompanyAccounts.filter((x: any) => {
      return x.companyId == Id;
    });
    this.companySetupForm.disable();
    this.companyName=this.selectedCompany[0]?.companyName;
    this.createdBy=this.selectedCompany[0]?.createdBy;
    this.companySetupForm.controls['companyName'].setValue(this.selectedCompany[0]?.companyName);
    this.companySetupForm.controls['numberOfUsers'].setValue(this.selectedCompany[0]?.numberOfUsers);
    this.companySetupForm.controls['email'].setValue(this.selectedCompany[0]?.email);
    this.companySetupForm.controls['currency'].setValue(this.selectedCompany[0]?.currency);
    this.companySetupForm.controls['country'].setValue(this.selectedCompany[0]?.countryId);
    this.companySetupForm.controls['measuringUnit'].setValue(this.selectedCompany[0]?.measuringUnit);
    this.companySetupForm.controls['timezone'].setValue(this.selectedCompany[0]?.timezone);
    this.companySetupForm.controls['status'].setValue(this.selectedCompany[0]?.status);
    this.companySetupForm.controls['role'].setValue(this.selectedCompany[0]?.roleId);
    this.companySetupForm.controls['firstName'].setValue(this.selectedCompany[0]?.firstName);
    this.companySetupForm.controls['lastName'].setValue(this.selectedCompany[0]?.lastName);
    this.companySetupForm.controls['countryId'].setValue(this.selectedCompany[0]?.countryId);
    this.companySetupForm.controls['adminUserId'].setValue(this.selectedCompany[0]?.adminUserId);
  }

  editCompany(){
    this.onEdit=false;
    this.oncancel=true;
    this.onSave=true;
    this.companySetupForm.enable();
  }
  onCancel(){
    this.isEdit=true;
    this.onSave=false;
    this.onEdit=true;
    this.oncancel=false;
    this.isDuplicateEmail = false;
    this.companySetupForm.disable();
    this.companySetupForm.controls['companyName'].setValue(this.selectedCompany[0]?.companyName);
    this.companySetupForm.controls['numberOfUsers'].setValue(this.selectedCompany[0]?.numberOfUsers);
    this.companySetupForm.controls['email'].setValue(this.selectedCompany[0]?.email);
    this.companySetupForm.controls['currency'].setValue(this.selectedCompany[0]?.currency);
    this.companySetupForm.controls['country'].setValue(this.selectedCompany[0]?.countryId);
    this.companySetupForm.controls['measuringUnit'].setValue(this.selectedCompany[0]?.measuringUnit);
    this.companySetupForm.controls['timezone'].setValue(this.selectedCompany[0]?.timezone);
    this.companySetupForm.controls['status'].setValue(this.selectedCompany[0]?.status);
    this.companySetupForm.controls['role'].setValue(this.selectedCompany[0]?.roleId);
    this.companySetupForm.controls['firstName'].setValue(this.selectedCompany[0]?.firstName);
    this.companySetupForm.controls['lastName'].setValue(this.selectedCompany[0]?.lastName);
    this.companySetupForm.controls['adminUserId'].setValue(this.selectedCompany[0]?.adminUserId);
  }
  closeCompanyDetails() {
    this.adminService.openDrawer(false);
    this.getAllCompaniesAccounts();
    this.cdr.detectChanges();
  }
  onFormChange(){
    this.isDuplicateEmail = false;
  }
}
