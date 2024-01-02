import { Component, ViewChild, TemplateRef, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from 'src/app/_metronic/partials/layout/modals/modal.config';
import { AuthService } from 'src/app/modules/auth';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { LeadsService } from 'src/app/modules/auth/services/leads.service';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { UsersService } from 'src/app/modules/auth/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {

  @Input() public modalConfig: ModalConfig;
  @ViewChild('Advancemodal')
  private modalContent: TemplateRef<UsersTableComponent>;
  totalRecord: any;
  page = 1;
  itemsPerPage = 25;
  companyId :any;
  userCred:any;
  totalItems: any;
  IsLoading: boolean;
  filterUserForm: FormGroup;
  userBasicForm: FormGroup;
  LeadTypeList: any[] = [];
  AllStatusType: any[] = [];
  AllSubStatusType: any[] = [];
  AllPriorityType: any[] = [];
  AllLocation: any[] = [];
  AllSubLocation: any[] = [];
  sourceOfListingList: any[] = [];
  AllCategory: any[] = [];
  AllEmirates: any[] = [];
  AgentList: any[] = [];
  private AdvanceFilter: NgbModalRef;
  getDataon2: boolean = false;
  filterDataValue: any = '';
  propertyTypeList: any[] = [];
  contactDetails: any[] = [];
  userDetails: any[] = [];
  userList:any = [];
  isAllowAdduser:boolean = false;
  AllStatusTypess: any[] = [
    { id: 1, name: 'Active' },
    { id: 0, name: 'Inactive' },
  ];
  AllRolesTypess: any[] = [
    { id: 1, name: 'Agent' },
    { id: 2, name: 'Manager' },
    { id: 3, name: 'Admin' },
  ];
  data:any = {
    'AddUser':true,
    'EditUser':false,
    'Id':0
  };
  isAddUserPermission: boolean = false;
  isDraweropen:boolean = false;
  constructor(
    private leadsService: LeadsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private listingSevice: ListingService,
    private cdr: ChangeDetectorRef,
    private userService: UsersService,
    private authService: AuthService,
    private dropdownService: DropdownService

  ) {
    var userData = this.authService.userValue;
    if(userData != null){
      this.userCred= JSON.parse(userData);
      this.isAddUserPermission = this.userCred.permissionAccess.filter((x:any) => x.permissionId == 14).length > 0;
      }
      this.userService.IsOpenDrawer.subscribe((x:any) => {
        if(x != null) {
          this.isDraweropen = x;
        }
      })
    this.userCred != null ? this.companyId = this.userCred.companyId : this.companyId = 1;
    this.setUsers();
   }
  
  async ngOnInit(): Promise<void> {
    //this.IsLoading = true;
    var x = await this.getNofUser(this.userCred.companyId);
    console.log(this.isAllowAdduser);
  
    this.getAllUser();
    this.GetUserDetailsByCompanyId(this.companyId);
    this.userService.isCallUser.pipe().subscribe((data: any) => {
      if (data) {
        this.GetUserDetailsByCompanyId(this.companyId);
        this.userService.OpenLeads(false)
      }
      else {
      }
    });

    this.userService.SelectedUserId.subscribe((data:any) => {
      //this.selectedContactId = data;
      this.userDetails = this.userDetails.map((x:any) => ({
        ...x,
        isSelected: false
      }));
    } )
  }

  async getNofUser(id:any):Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
      this.userService.GetNoOfUser(id).subscribe((data:any) => {
        this.isAllowAdduser = data.isAllowAddUser;
        resolve(true);
      })
      });
  }

  getAllUser() {
    this.dropdownService
    .GetAllUserByCompany(this.userCred.companyId)
    .subscribe((data: any | undefined) => {
      this.userList = data;
    });
  }

  onAddUser() {
    this.data.AddUser=true;
    this.data.EditUser = false;
    this.data.Id = 0;
    this.userService.OpenLeads(this.data);
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
  }

  setUserDetailsListing() {
    this.userBasicForm = this.formBuilder.group({
      email: new FormControl(''),
      roleId: new FormControl(null),
      statusId: new FormControl(null),
      jobTitle: new FormControl(null),
      department: new FormControl(null),
      reraBrn: new FormControl(false),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      mobileNo: new FormControl(''),
      // page: [1],
      // itemsPerPage: [this.itemsPerPage],
      // sortFiled: ['Updated'],
      //sortDirection: [true],
    });

  }

  setUsers() {
    this.filterUserForm = this.formBuilder.group({
      status: new FormControl(),
      email: new FormControl(),
      roleId: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      mobile: new FormControl(),
      jobTitle: new FormControl(),
      department: new FormControl(),
      reraBrn: new FormControl(),
      page: new FormControl(1),
      itemsPerPage: new FormControl(this.itemsPerPage),
      sortFiled: new FormControl('Updated'),
      sortDirection: new FormControl(true),
      CreatedFrom: new FormControl(),
      CreatedTo: new FormControl(),
      CreatedBy: new FormControl(),
      UpdatedFrom: new FormControl(),
      UpdatedTo: new FormControl(),
      UpdatedBy: new FormControl(),
    });
  }

  GetUserDetailsByCompanyId(companyId: any) {
    this.userData('Updated',true,1,this.itemsPerPage)
    // this.IsLoading = true;
    // this.userService.GetUserDetailsByCompanyId(companyId).subscribe((data: any | undefined) => {
    //   this.userDetails = data;
    //   this.IsLoading = false;
    //   // this.userDetails=data.slice.reverse()
    //   if (data.length > 0) {
    //     this.totalItems = data?.length;
    //   } else {
    //     this.totalItems = 0;
    //   }
    //   this.cdr.detectChanges();

    // });

  }

  userData(sortFiled: any, sortDirection: any, page: any, itemsPerPage: any) {
    this.filterUserForm.controls['sortFiled'].setValue(sortFiled);
    this.filterUserForm.controls['sortDirection'].setValue(sortDirection);
    this.filterUserForm.controls['page'].setValue(page);
    this.filterUserForm.controls['itemsPerPage'].setValue(this.itemsPerPage);
    const body = this.filterUserForm.value;
    body.companyId = this.companyId;
    this.IsLoading = true;
    this.cdr.detectChanges();
    this.userService.getAllUserDetailUsingFilter(body).subscribe(
      (data: any | undefined) => {
        this.userDetails = data.map((x:any) => ({
          ...x,
          isSelected: false
        }));;
        this.IsLoading = false;
        if (data.length > 0) {
          this.totalItems = data[0].totalRecords;
        } else {
          this.totalItems = 0;
        }
        this.IsLoading = false;
        this.cdr.detectChanges();
      },
      (error) => {
        this.IsLoading = false;
      }
    )
  }

  leadData(sortFiled: any, sortDirection: any, page: any, itemPerPage: any) {
    this.filterUserForm.controls['sortFiled'].setValue(sortFiled);
    this.filterUserForm.controls['sortDirection'].setValue(sortDirection);
    this.filterUserForm.controls['page'].setValue(page);
    this.filterUserForm.controls['itemsPerPage'].setValue(this.itemsPerPage);
    this.leadsService
      .getAllLeadDetailsUsiFilter(this.filterUserForm.value)
      .subscribe(
        (data: any | undefined) => {
          this.contactDetails = data;
          this.IsLoading = false;
          if (data.length > 0) {
            this.totalItems = data[0].totalRecords;
          } else {
            this.totalItems = 0;
          }
          this.cdr.detectChanges();
          this.IsLoading = false;
        },
        (error) => {
          this.IsLoading = false;
        }
      );
  }

  onFilterSelection(name: any, e: any, page: any, itemPerPage: any) {
    this.page = 1;
    this.filterUserForm.controls[name].setValue(e.target.value);
    this.filterUserForm.controls['page'].setValue(page);
    this.filterUserForm.controls['itemsPerPage'].setValue(itemPerPage); 
    if (e.target.value.length > 2) {
      this.getDataon2 = true;
      this.filterDataValue = e.target.value;
      this.userData(
        this.filterUserForm.value.sortFiled,
        this.filterUserForm.value.sortDirection,
        page,
        itemPerPage
      );
    }
    if (this.filterDataValue != '' && e.target.value.length == 0) {
      this.filterDataValue = '';
      if (this.getDataon2) {
        //this.companyId = 2
        this.userData(
          this.filterUserForm.value.sortFiled,
          this.filterUserForm.value.sortDirection,
          page,
          itemPerPage
        );

      }
      this.getDataon2 = false;
    }
  }

  onFilterSelectionDrp(name: any, e: any, page: any, itemPerPage: any) {
    this.page = 1;
    this.filterUserForm.controls['page'].setValue(this.page);
    this.filterUserForm.controls['itemsPerPage'].setValue(this.itemsPerPage);
    switch (e) {
      case undefined:
        this.filterUserForm.controls[name].setValue(null);
        break;
      default:
        this.filterUserForm.controls[name].setValue(e);
        break;
    }
    this.userData(
      this.filterUserForm.value.sortFiled,
      this.filterUserForm.value.sortDirection,
      page,
      itemPerPage
    );
  }

  onEditUser(value: any) {
    console.log("valuye",value);
    this.data.AddUser=false;
    this.data.EditUser = true;
    this.data.Id = value;
    var user = this.userDetails.find((x:any) => x.userId == value);
    user.isSelected = true;

    var notUser = this.userDetails.filter((x:any) => x.userId != value);
    notUser.forEach((x:any) => {
      x.isSelected = false;
    });
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
    this.userService.OpenLeads(this.data);
  }

  renderPage(event: number) {
    this.page = event;
    this.filterUserForm.controls['page'].setValue(this.page);
    this.filterUserForm.controls['itemsPerPage'].setValue(this.itemsPerPage);
    this.cdr.detectChanges();
    this.userData(
      this.filterUserForm.value.sortFiled,
      this.filterUserForm.value.sortDirection,
      this.filterUserForm.value.page,
      this.filterUserForm.value.itemsPerPage
    );
  }


}


