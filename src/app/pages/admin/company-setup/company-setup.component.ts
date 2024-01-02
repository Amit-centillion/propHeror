import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminService } from 'src/app/modules/auth/services/admin.service';
import { CompanySettingsService } from 'src/app/modules/auth/services/company-settings/company-settings.service';
import { UsersService } from 'src/app/modules/auth/services/users.service';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.scss']
})

export class CompanySetupComponent {
  getAllCompanyAccounts:any[]=[];
  isDraweropen:boolean = false;
  totalRecord: any;
  selectedCompanyId:number = 0;
  page = 1;
  itemsPerPage = 25;
  AllStatusTypes: any[] = [
    { id: 1, name: 'Active' },
    { id: 0, name: 'Inactive' },
  ];
  data:any = {
    'addCompany':true,
    'editCompany':false,
    'Id':0
  };
  companyDetails: any[] = [];
  constructor(private companySettingService:CompanySettingsService,private userService:UsersService,private adminService:AdminService,private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.getAllCompaniesAccounts();
    this.companySettingService.refreshData$.subscribe((shouldRefresh) => {
      if (shouldRefresh) {
        this.getAllCompaniesAccounts();
      }
    });
    this.adminService.IsOpenDrawer.subscribe((x:any) => {
      if(x != null) {
        this.isDraweropen = x;
      }
    });
    this.companySettingService.isCallCompany.pipe().subscribe((data: any) => {
      if (data) {       
    this.getAllCompaniesAccounts();
      }
    });     
  }

  getAllCompaniesAccounts(){
    this.companySettingService.getAllCompaniesAccounts().subscribe({
      next:(res:any) => {
        this.getAllCompanyAccounts=res;
        this.totalRecord=this.getAllCompaniesAccounts.length;
        this.cdr.detectChanges();
      }
    });
  }
  onEditCompany(id: any) {
    this.data.addCompany=false;
    this.data.editCompany = true;
    this.data.Id = id;
    this.selectedCompanyId = id;
    var company = this.getAllCompanyAccounts.find((x:any) => x.companyId == id);
    company.isSelected = true;

    var notcompany = this.getAllCompanyAccounts.filter((x:any) => x.companyId != id);
    notcompany.forEach((x:any) => {
      x.isSelected = false;
    });
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
    this.adminService.CompanyDetails(this.data);
  }
  onAddCompany() {
    this.data.addCompany=true;
    this.data.editCompany = false;
    this.data.Id = 0;
    this.adminService.CompanyDetails(this.data);
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
  }

  renderPage(event: number) {
    this.page = event;
  }
}