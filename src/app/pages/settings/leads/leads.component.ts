import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanySettingsService } from 'src/app/modules/auth/services/company-settings/company-settings.service';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit{

  public leadsForm: FormGroup;
  companyId:any;
  companyLeadsData:any;
  statusList:any[]=[
    {id:0,name:'Inactive'},{id:1,name:'Active'}];
  userData:any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private companySettinsService:CompanySettingsService,
    private cdr: ChangeDetectorRef
  ) {
    this.leadsForm = this.formBuilder.group({
      status: new FormControl(0, []),
      imap: new FormControl('', []),
      email: new FormControl('', []),
      password: new FormControl('', []),
      port: new FormControl('', []),
    });
    var userData = localStorage.getItem('usercred');
    if(userData != null){
      this.userData= JSON.parse(userData);
      }
    this.userData!= null ? this.companyId = this.userData.companyId : this.companyId = 1;
  }

  ngOnInit(): void {
    this.getCompanyLeads();
    this.leadsForm.controls['status'].setValue(0);
  }

  save(){
    const body = this.leadsForm.value;
    this.companyId == null ? body.companyId= 0 : body.companyId = this.companyId;
    this.companySettinsService
    .setCompanyLeadsSettings(body)
    .subscribe((data: any | undefined) => {
      //this.toastr.success('Leads added successfully.');
      
      if( data.status === 200){
        this.toastr.success('Leads updated successfully');
        this.getCompanyLeads();
      }
      else{
        this.toastr.error('Something went wrong...');
      }
    });

  }

  getCompanyLeads(){
    this.companySettinsService
      .getCompanyLeadsSettings(this.companyId)
      .subscribe((data: any | undefined) => {
        this.companyLeadsData = data[0];
        if(this.companyLeadsData){
          this.companyLeadsData.status == false ? this.leadsForm.controls['status'].setValue(0) :
          this.leadsForm.controls['status'].setValue(1);          
         // this.leadsForm.controls['status'].setValue(this.companyLeadsData.status);
          this.leadsForm.controls['imap'].setValue(this.companyLeadsData.imap);
          this.leadsForm.controls['email'].setValue(this.companyLeadsData.email);
          this.leadsForm.controls['password'].setValue(this.companyLeadsData.password);
          this.leadsForm.controls['port'].setValue(this.companyLeadsData.port);
        }
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.leadsForm.controls;
  }

}
