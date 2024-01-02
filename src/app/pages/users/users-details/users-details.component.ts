import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalConfig } from 'src/app/_metronic/partials/layout/modals/modal.config';
import { AuthService } from 'src/app/modules/auth';
import { ContactService } from 'src/app/modules/auth/services/contact.service';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { LeadsService } from 'src/app/modules/auth/services/leads.service';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { UsersService } from 'src/app/modules/auth/services/users.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent {

  @ViewChild('Addcontact')
  private modalContent: TemplateRef<UsersDetailsComponent>;
  @ViewChild('AddNewcontact')
  private modalContentContact: TemplateRef<UsersDetailsComponent>;
  @ViewChild('ViewListing')
  private modalContentViewingList: TemplateRef<UsersDetailsComponent>;
  @ViewChild('addPropertyListing')
  private modalContentPropertyList: TemplateRef<UsersDetailsComponent>;
  @ViewChild('addPropertyRequirement')
  private modalContentAddProperty: TemplateRef<UsersDetailsComponent>;
  selectedTab: string = 'tab1';
  basic: boolean = false;
  View: boolean = false;
  Property1: boolean = false;
  Property2: boolean = false;
  Property3: boolean = false;
  Property4: boolean = false;
  BasicDetails: FormGroup;
  BasicUserDetails: FormGroup;
  LeadTypeList: any[] = [];
  AllStatusType: any[] = [];
  AllSubStatusType: any[] = [];
  AllPriorityType: any[] = [];
  sourceOfListingList: any[] = [];
  AgentLeadList: any[] = [];
  AllViewingStatus: any[] = [];
  AllPhoneCode: any[] = [];
  AllTitle: any[] = [];
  AllCountry: any[] = [];
  AllLeadFinance: any[] = [];
  AllBeds: any[] = [];
  AllCategory: any[] = [];
  AllEmirates: any[] = [];
  AllLocation: any[] = [];
  AllSubLocation: any[] = [];
  PropertyRequirements: FormGroup;
  AddPropertyRequirementAddModel: FormGroup;
  Viewings: FormGroup;
  viewAddress: boolean = false;
  ContactList: any;
  getContactsDetail: any;
  SearchContactList: boolean = false;
  PropertyRequirementList: any = [];
  purposeList: any[] = [];
  propertyTypeList: any[] = [];
  MobileTypeList: any = [];
  Mobiles: FormArray;
  CountryCodeList: any = [];
  isDuplicateEmail = false;
  IsLoading:boolean = false;
  @ViewChild('container', { static: false }) container!: ElementRef;
  page = 1;
  itemsPerPage = 25;
  totalItems: any;
  form: FormGroup;
  isView: boolean = false;
  isEditUserPermission: boolean = false;
  private createContact: NgbModalRef;
  private createNewContact: NgbModalRef;
  private ViewList: NgbModalRef;
  private addpropertyList: NgbModalRef;
  private addpropertyRequirement: NgbModalRef;

  editLeadId: any;
  isEdit: boolean;
  status_new: any;
  @Input() public modalConfig: ModalConfig;
  searchContactForm: FormGroup;
  pageNumber = 1;
  pageSize = 10;
  sortColumn: string = 'Updated';
  sortDir: boolean = true;
  listingDetailsList: any;
  getListingUsingId: any;
  leadId: any;
  userId: any;
  viewingList: any[] = [];
  statuses: any[] = [];
  roleUses: any[] = [];
  AllRolesTypess: any[] = [
    { id: 1, name: 'Agent' },
    { id: 2, name: 'Manager' },
    { id: 3, name: 'Admin' },
  ];
  AllStatusTypes: any[] = [
    { id: 1, name: 'Active' },
    { id: 0, name: 'Inactive' },
  ];
  isSubmitted: boolean;
  displayCancel: boolean = false;
  displayListing: boolean;
  disbledFields: boolean;
  companyId : any;
  userCred:any;
  firstName:string='';
  lastName:string='';
  constructor(
    private leadsService: LeadsService,
    private modalService: NgbModal,
    private dropdownService: DropdownService,
    private listingSevice: ListingService,
    private toastr: ToastrService,
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private userServices: UsersService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    var userData = this.authService.userValue;
    if(userData != null){
      this.userCred= JSON.parse(userData);
      this.isEditUserPermission = this.userCred.permissionAccess.filter((x:any) => x.permissionId == 21).length > 0;
      }
    this.userCred != null ? this.companyId = this.userCred.companyId : this.companyId = 1;
   }

  ngOnInit(): void {
    this.isDuplicateEmail = false;
    this.getContactsDetail = '';
    this.isEdit = false;
    this.getCountryCodeList();
    this.userServices.isOpenLeads.pipe().subscribe((data: any) => {
      if (data?.AddUser) {
        this.selectTab('tab1');
        this.scrollToElement('secStatus');
        this.getContactsDetail = '';
        this.setUserBasicDetails();
        this.isDuplicateEmail = false;
        this.isSubmitted = false;
        this.isEdit = false;
        this.basic = true;
        this.View = true;
        this.BasicUserDetails.reset();
        this.BasicUserDetails.markAsUntouched();
        this.BasicUserDetails.markAsPristine();
        this.displayListing = true;
        this.displayCancel = false
        this.BasicUserDetails.controls['Status'].setValue(1);
      }
      if (data?.EditUser && data?.Id != undefined && data?.Id != null) {
       
            this.selectTab('tab1');
            this.scrollToElement('secStatus');
            this.setUserBasicDetails();
            this.isEdit = true;
            this.editLeadId = data?.Id;
            this.onUserEdit(this.editLeadId);
            this.isDuplicateEmail = false;
            this.isSubmitted = false;
            this.disbledFields = true;
            this.basic = true;
            this.displayListing = false
          this.basic = true;
      }
    });
    this.setUserBasicDetails();
  }
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  public scrollToElement = (elementId: string) => {
    const overlayElement = this.container.nativeElement;
    const targetElement = document.getElementById(elementId);
    const offset = 105.73; // Specify your desired offset value

    if (targetElement) {
      // overlayElement.scrollTop = targetElement.offsetTop - offset;
      if (targetElement.id === 'sec1') {
        console.log(this.userServices.isOpenLeads);
        let x = targetElement.offsetTop - offset;
      }
      let x = targetElement.offsetTop;
      overlayElement.scrollTo({
        top: x,
        behavior: 'smooth',
      });
    }
  };

  setUserBasicDetails() {
    this.BasicUserDetails = new FormGroup({
      Status: new FormControl(null),
      email: new FormControl('abc', [Validators.required,Validators.pattern('^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$')]),
      role: new FormControl(1, [Validators.required]),
     
      jobTitle: new FormControl(''),
      department: new FormControl(''),
      reraBrn: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      Mobile: new FormControl(''),
      CountryCode: new FormControl(''),
      companyId: new FormControl(''),
      userIds: new FormControl(),
    });
    this.cdr.detectChanges();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.BasicUserDetails.controls;
  }

  saveList() {
    console.log('save');
  }

  cancelList() {
    console.log('cancle');
  }

  async close(): Promise<void> {
    this.createContact.close(this.modalConfig);
  }
  async closeContact(): Promise<void> {
    this.createNewContact.close(this.modalConfig);
  }

  openViewingList() {
    return new Promise<boolean>((resolve) => {
      this.ViewList = this.modalService.open(this.modalContentViewingList, {
        size: 'lg',
      });
      this.ViewList.result.then(resolve, resolve);
    });
  }
  onChangeEmail(event:any){
    this.isDuplicateEmail = false;
  }
  closeViewList() {
    this.ViewList.close(this.modalConfig);
  }

  addPropertyList() {
    return new Promise<boolean>((resolve) => {
      this.addpropertyList = this.modalService.open(
        this.modalContentPropertyList,
        { size: 'lg' }
      );
      this.addpropertyList.result.then(resolve, resolve);
    });
  }

  closePropertyList() {
    this.addpropertyList.close(this.modalConfig);
  }

  closePropertyRequirement() {
    this.addpropertyRequirement.close(this.modalConfig);
  }

  onUserSubmit() {
    this.isSubmitted = true;
    if (!this.BasicUserDetails.valid) { 
      const formControls = this.BasicUserDetails.controls;
      for (const control of Object.keys(this.BasicUserDetails.controls)) {
        this.BasicUserDetails.controls[control].markAsTouched();
      }
      for (const controlName in formControls) {
        if (
          formControls.hasOwnProperty(controlName) &&
          formControls[controlName].invalid
        ) {
          const control = formControls[controlName];
          const fieldName =
            controlName.charAt(0).toUpperCase() + controlName.slice(1);
        }
      }
    }

    if (!this.BasicUserDetails.invalid) {
      if (!this.isEdit) {
        const body = {
          companyId: this.companyId,
          email: this.BasicUserDetails.value?.email,
          roleId: this.BasicUserDetails.value?.role,
          Status: this.BasicUserDetails.value?.Status,
          jobTitle: this.BasicUserDetails.value?.jobTitle,
          department: this.BasicUserDetails.value?.department,
          reraBrn: this.BasicUserDetails.value?.reraBrn,
          firstName: this.BasicUserDetails.value?.firstName,
          lastName: this.BasicUserDetails.value?.lastName,
          Mobile: this.BasicUserDetails.value?.Mobile,
          CountryCode: this.BasicUserDetails.value?.CountryCode,
          roleName: '',
          statusName: '',
          createdBy:this.userCred.id,
          updatedBy:this.userCred.id
        }
        this.userServices
          .InsertUsersDetails(body)
          .subscribe((data: any) => {
            this.userServices.GetUserDetailsByCompanyId(this.companyId);
            if(data.status == -1){
            this.isDuplicateEmail = true;
            this.cdr.detectChanges();
            return false;
            }
           else if (data.status == 200) {
              this.userServices.CallUser(true);
              this.toastr.success('User added successfully');
              document?.getElementById('kt_user-details_close')?.click();
              this.userServices.OpenLeads(true);
              this.BasicUserDetails.reset();
            }
            else if (data.status == 0) {
              this.toastr.error(data.message);
              this.BasicUserDetails.reset();
            }
            else {
              this.toastr.error(data.message);
              this.BasicUserDetails.reset();
            }
          });
      }
      else {
        var data = {
          companyId: this.companyId,
          userId: this.BasicUserDetails.controls['userIds'].value,
          email: this.BasicUserDetails.value?.email,
          roleId: this.BasicUserDetails.value?.role,
          Status: this.BasicUserDetails.value?.Status,
          jobTitle: this.BasicUserDetails.value?.jobTitle,
          department: this.BasicUserDetails.value?.department,
          reraBrn: this.BasicUserDetails.value?.reraBrn,
          firstName: this.BasicUserDetails.value?.firstName,
          lastName: this.BasicUserDetails.value?.lastName,
          Mobile: this.BasicUserDetails.value?.Mobile,
          CountryCode: this.BasicUserDetails.value?.CountryCode,
          roleName: '',
          statusName: '',
          updatedBy:this.userCred.id
        }
        this.userServices
          .UpdateUsersDetails(data)
          .subscribe((data: any) => {
            if(data.status == -1){
              this.isDuplicateEmail = true;
              this.cdr.detectChanges();
              return false;
              }
           else if (data?.status == 200) {
              this.userServices.CallUser(true);
              this.BasicUserDetails.reset();
              this.toastr.success('User updated successfully');
              document?.getElementById('kt_user-details_close')?.click();
              this.userServices.OpenLeads(true)
            } else {
              this.toastr.error('Something went wrong');
            }
          });
      }
     // this.BasicUserDetails.reset();
    }
  }

  displayCancelBtn() {
    this.displayCancel = true;
  }

  onEditUser() {
    this.disbledFields = false;
    if (!this.displayListing) {
      this.displayListing = !this.displayListing;
    }
    this.BasicUserDetails.controls['Status'].enable();
    this.BasicUserDetails.controls['email'].enable();
    this.BasicUserDetails.controls['role'].enable();
    this.BasicUserDetails.controls['firstName'].enable();
    this.BasicUserDetails.controls['lastName'].enable();
    this.BasicUserDetails.controls['Mobile'].enable();
    this.BasicUserDetails.controls['CountryCode'].enable();
    this.BasicUserDetails.controls['jobTitle'].enable();
    this.BasicUserDetails.controls['department'].enable();
    this.BasicUserDetails.controls['Status'].enable();
    this.BasicUserDetails.controls['reraBrn'].enable();
    this.BasicUserDetails.controls['email'].setValidators([Validators.required,Validators.pattern('^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$')]);
    this.BasicUserDetails.controls['email'].updateValueAndValidity();
    this.BasicUserDetails.controls['role'].setValidators([Validators.required]);
    this.BasicUserDetails.controls['role'].updateValueAndValidity();
    this.BasicUserDetails.controls['firstName'].setValidators([Validators.required]);
    this.BasicUserDetails.controls['firstName'].updateValueAndValidity();
    this.BasicUserDetails.controls['lastName'].setValidators([Validators.required]);
    this.BasicUserDetails.controls['lastName'].updateValueAndValidity();
  }

  onPreview() {
    this.disbledFields = true
    this.BasicUserDetails.controls['Status'].disable();
    this.BasicUserDetails.controls['email'].disable();
    this.BasicUserDetails.controls['role'].disable();
    this.BasicUserDetails.controls['firstName'].disable();
    this.BasicUserDetails.controls['lastName'].disable();
    this.BasicUserDetails.controls['Mobile'].disable();
    this.BasicUserDetails.controls['CountryCode'].disable();
    this.BasicUserDetails.controls['jobTitle'].disable();
    this.BasicUserDetails.controls['department'].disable();
    this.BasicUserDetails.controls['Status'].disable();
    this.BasicUserDetails.controls['reraBrn'].disable();
  }

  onCancel() {
    this.isDuplicateEmail = false;
    this.displayListing = false;
    this.IsLoading = true;
    this.userServices.getUserDeatilsByUserId(this.editLeadId,this.userCred.companyId).subscribe((data: any) => {
      this.setUserValueBasicDetais(data);
      this.BasicUserDetails.disable();
      this.cdr.detectChanges();
      this.basic = true;
      this.IsLoading = false;
      // this.userId=data?.id;
      // this.GetViewUserDeatilsByUserId(data?.id)
    })
  }

  onUserEdit(id: any) {
    this.firstName = '';
    this.lastName = '';
    this.IsLoading = true;
    this.userServices.getUserDeatilsByUserId(id,this.userCred.companyId).subscribe((data: any) => {
      this.setUserValueBasicDetais(data);
      this.BasicUserDetails.disable();
      this.cdr.detectChanges();
      this.basic = true;
      this.IsLoading = false;
      // this.userId=data?.id;
      // this.GetViewUserDeatilsByUserId(data?.id)
    })
  }

  setUserValueBasicDetais(data: any) {
    data.status == true ? this.status_new = 1 : this.status_new = 0;
    this.firstName= data.firstName;
    this.lastName= data.lastName;
    this.BasicUserDetails = new FormGroup({
      email: new FormControl(data.email,[Validators.required,Validators.pattern('^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$')]),
      role: new FormControl(data.roleId,[Validators.required]),
      Status: new FormControl(this.status_new),
      jobTitle: new FormControl(data.jobTitle),
      department: new FormControl(data.department),
      reraBrn: new FormControl(data.rerabrn),
      firstName: new FormControl(data.firstName,[Validators.required]),
      lastName: new FormControl(data.lastName,[Validators.required]),
      Mobile: new FormControl(data.mobile),
      CountryCode: new FormControl(data.countryCode),
      companyId: new FormControl(data.companyId),
      userIds: new FormControl(data.userId)
    });
    this.cdr.detectChanges();
  }

  GetViewUserDeatilsByUserId(userId: any) {
    this.userServices.getUserDeatilsByUserId(userId,this.userCred.companyId).subscribe((data: any | undefined) => {
      this.setViewingData(data);
    });
  }

  setViewingData(data: any) {
    this.viewingList = data;
  }

  isNumber(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getCountryCodeList() {
    this.dropdownService.getCountryCodeList().subscribe((data: any) => {
      this.CountryCodeList = data.map((x: any) => ({
        id: x.id,
        name: x.name + '(' + x.code.trim() + ')',
        code: x.code.trim()
      }));
    });
  }

  changeStatus(event:any){
    console.log("id",event)
  }

  closeUser() {
    this.userServices.openDrawer(false);
    this.userServices.SelectUserId(0);
  }

}
