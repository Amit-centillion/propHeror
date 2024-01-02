import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanySettingsService } from 'src/app/modules/auth/services/company-settings/company-settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss']
})
export class XmlComponent {
  public xmlForm: FormGroup;
  companyId:any;
  companySystemData:any;
  xmlList = [{id:1,name:'Company'},{id:2,name:'Agent'}];
  userData:any;
    constructor(
    private formBuilder: FormBuilder,
    private companySettinsService:CompanySettingsService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.xmlForm = this.formBuilder.group({
      xmlEmail: new FormControl(1, []),
      xmlMobile: new FormControl(1, []),
      xmlName: new FormControl(1, []),
      companyEmail : new FormControl('', []),
    });
    var userData = localStorage.getItem('usercred');
    if(userData != null){
      this.userData= JSON.parse(userData);
      }
    this.userData!= null ? this.companyId = this.userData.companyId : this.companyId = 1;
  }

  ngOnInit(): void {
    this.getCompanyXmlSettings();
  }

  save(){
    const body = this.xmlForm.value;
    this.companyId == null ? body.companyId= 0 : body.companyId = this.companyId;
    this.companySettinsService
    .setCompanyXmlSettings(body)
    .subscribe((data: any | undefined) => {
     // this.toastr.success('Xml added successfully.');
     if( data.status === 200){
      this.toastr.success('Xml updated successfully');
      this.getCompanyXmlSettings();
    }
    else{
      this.toastr.error('Something went wrong...');
    }
   });

  }

  getCompanyXmlSettings(){
     this.companySettinsService
      .getCompanyXmlSettings(this.companyId)
      .subscribe((data: any | undefined) => {
        this.companySystemData = data[0];
        if(this.companySystemData){
          this.xmlForm.controls['xmlEmail'].setValue(this.companySystemData.xmlEmail);
          this.xmlForm.controls['xmlMobile'].setValue(this.companySystemData.xmlMobile);
          this.xmlForm.controls['xmlName'].setValue(this.companySystemData.xmlName);
          this.xmlForm.controls['companyEmail'].setValue(this.companySystemData.companyEmail);
        }
      }); 
  }

  get f(): { [key: string]: AbstractControl } {
    return this.xmlForm.controls;
  }

}
