import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanySettingsService } from 'src/app/modules/auth/services/company-settings/company-settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-portals',
  templateUrl: './portals.component.html',
  styleUrls: ['./portals.component.scss']
})
export class PortalsComponent {
  userData:any;
  public companyPortalsForm: FormGroup;
  backendUrl = environment.portalUrl;
  companyId:any;
  companyPortalsData:any=[];
  ischecked1 :boolean=true;
  ch1=0;
  checked2 :boolean=false;
  checked3 :boolean=false;
  isShow =false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private companySettinsService:CompanySettingsService,
    private cdr: ChangeDetectorRef
  ) {
    var userData = localStorage.getItem('usercred');
    if(userData != null){
      this.userData= JSON.parse(userData);
      }
    this.userData!= null ? this.companyId = this.userData.companyId : this.companyId = 1;
    this.setPortalsForm();
    this.getCompanyInfo();
  }

 
  isCopied: boolean[] = [];

  setPortalsForm() {
    this.companyPortalsForm = new FormGroup({
      bayutDubizzleAPIKey: new FormControl()
    });
  }

  copyToClipboard(event: any, index: number) {
    // Change the button text to "Copied"
    this.isCopied[index] = true;

    // Access the setTimeout function to revert the text after 2 seconds (2000 milliseconds)
    setTimeout(() => {
      this.isCopied[index] = false;
    }, 2); // 2000 milliseconds = 2 seconds
  }
  ngOnInit(): void {
   
  }

  save(){
console.log("this.companyPortalsData",this.companyPortalsData);
    this.companySettinsService
    .setCompanyPortalSettings({
      companyPortalsList:this.companyPortalsData,
      bayutAndDubizzleAPIKey: this.companyPortalsForm.get('bayutDubizzleAPIKey')?.value,
      companyId: this.companyId,
      userId: this.userData.id,
      IsNewCompany: false
    })
    .subscribe((data: any | undefined) => {
    //  this.toastr.success('Portals added successfully.');
    //  this.getCompanyInfo();

      if( data.status === 200){
        this.toastr.success('Portals updated successfully');
        this.getCompanyInfo();
      }
      else{
        this.toastr.error('Something went wrong...');
      }
    }); 

  }

  getCompanyInfo(){
    this.companySettinsService
      .getCompanyPortalSettings(this.companyId)
      .subscribe((data: any | undefined) => {
        this.companyPortalsData = data?.companyPortalsList.map((x:any) => ({
          ...x,
          url: (x.portalId == 1) ?  (this.backendUrl + 'xml?cl='+ this.userData.companyId + '&pid=3') : (x.portalId == 2) ? (this.backendUrl  + 'xml?cl='+ this.userData.companyId + '&pid=2') : (this.backendUrl  + 'xml?cl='+ this.userData.companyId + '&pid=1')  
        }));
        this.companyPortalsForm = new FormGroup({
          bayutDubizzleAPIKey : new FormControl(data?.bayutAndDubizzleAPIKey)
        });
        if(this.companyPortalsData){
   // console.log("this.companyPortalsData",this.companyPortalsData);
        this.isShow = true;
          //this.companyPortalsForm.controls['portalsIds'].setValue(this.companyPortalsData.portalsIds);
        }
        this.cdr.detectChanges();
      });
  }

  /* get f(): { [key: string]: AbstractControl } {
    return this.companyPortalsForm.controls;
  }
 */
  checkStatus(item:any){
    item.isChecked = !item.isChecked;
  }

  check1(item:any){
    item.ischecked1 = !item.ischecked1;
  }


  check2($event:any){
    this.checked2 = !this.checked2;
   }

   check3($event:any){
    this.checked3 = !this.checked3;
   }

}

