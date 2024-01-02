import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalConfig } from 'src/app/_metronic/partials';
import { ViewingsService } from 'src/app/modules/auth/services/viewing.service';
import Swal from 'sweetalert2';
import { LeadsDetailsComponent } from '../../leads/leads-details/leads-details.component';
import dayjs, { Dayjs } from 'dayjs/esm';
import { ViewingsTableComponent } from '../viewings-table/viewings-table.component';
import { LeadsService } from 'src/app/modules/auth/services/leads.service';
import { Router } from '@angular/router';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import moment from 'moment';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { AuthService } from 'src/app/modules/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewings-details',
  templateUrl: './viewings-details.component.html',
  styleUrls: ['./viewings-details.component.scss']
})
export class ViewingsDetailsComponent implements OnInit {
  @ViewChild('container', { static: false }) container!: ElementRef;
  selectedViewingRef:any = null;
  viewingDetails:any = null;
  userCreateByList: any[] = [];
  userUpdatedByList: any[] = [];
  contactDetails:any =[];
  userData:any;
  isEditViewingPermission:boolean = false;

  ngOnInit(): void {
    var uData = this.authService.userValue;
  if(uData != null){
  this.userData= JSON.parse(uData);
  this.isEditViewingPermission = this.userData.permissionAccess.filter((x:any) => x.permissionId == 19).length > 0;
  }
    this.setInitialBasicDetailForm();
    this.initForm();
    this.dropDownList();
    this.InitiallistingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      this.form.value.page,
      this.form.value.itemsPerPage
    );
    this.setDetailsListing();
    this.getAllLeadType();
    this.getAllLeadStatus();
    this.getAllLeadSubStatus();
    this.getAllLeadPriority();
    this.getProperyTypefilter();
    this.getAllEmirates();
    this.InitalleadData(
      this.ContactBasicForm.value.sortFiled,
      this.ContactBasicForm.value.sortDirection,
      this.page,
      this.itemsPerPage
    );
    this.viewingService.isOpenAddViewing.pipe().subscribe((data: any) => {
      if (data?.AddViewing) {
        this.isSave = false;
        //this.fileInput.nativeElement.value = '';
       
        this.isAdd = true;
        this.isEdit = false;
        this.isView = false;
        this.basic = true;
        this.basic = true;

        //Changes for on load viewing 
        this.viewingDetails = null;
        this.cdr.detectChanges();

        this.tempSelectedListingRef = null;
        this.selectedListingRef = null;
        this.selectedListingpropertyType=null
        this.selectedListingPurpose = null;
  this.selectedListingBed=null
  this.selectedListingEmirate=null
  this.selectedListingLocation=null
  this.selectedListingSubLocation=null
  this.selectedListingPrice=null
        this.selectedListingId = 0;
        this.tempSelectedLeadRef = null;
        this.selectedLeadRef = null;
        this.selectedLeadId = 0;
        this.selectedLeadFirstName = null;
        this.selectedLeadLastName = null;
        this.PeronsalMobile = null;
        this.PersonalPhone = null;
        this.PersonalEmail = null;
        this.WorkMobile = null;
        this.WorkPhone = null;
        this.WorkEmail = null;
        this.OtherMobile = null;
        this.OtherPhone = null;
        this.OtherEmail = null;
        this.cdr.detectChanges();
        this.scrollToElement('sec1');
        this.basicDetailForm.reset();
       
        this.basicDetailForm.markAsUntouched();
        this.basicDetailForm.markAsPristine();
        
    this.basicDetailForm.enable();
   
    this.setInitialBasicDetailForm();
    
      }
      if(data?.EditViewing && data?.Id != undefined && data?.Id != null) {
        this.editViewingId = data?.Id
        this.isSave = false;
        // this.fileInput.nativeElement.value = '';
        
        this.isView = true;
        this.isAdd = false;
        this.isEdit = false;
        this.basic = true;

        //Changes for on load Viewings
        this.viewingDetails = null;
        this.tempSelectedListingRef = null;
        this.selectedListingRef = null;
        this.selectedListingpropertyType=null
        this.selectedListingPurpose = null;
  this.selectedListingBed=null
  this.selectedListingEmirate=null
  this.selectedListingLocation=null
  this.selectedListingSubLocation=null
  this.selectedListingPrice=null
        this.selectedListingId = 0;
        this.tempSelectedLeadRef = null;
        this.selectedLeadRef = null;
        this.selectedLeadId = 0;
        this.selectedLeadFirstName = null;
        this.selectedLeadLastName = null;
        this.PeronsalMobile = null;
        this.PersonalPhone = null;
        this.PersonalEmail = null;
        this.WorkMobile = null;
        this.WorkPhone = null;
        this.WorkEmail = null;
        this.OtherMobile = null;
        this.OtherPhone = null;
        this.OtherEmail = null;
        this.cdr.detectChanges();
       
        this.IsLoading = true;
        this.scrollToElement('sec1');
        this.viewingService.GetViewingDetailsById(this.editViewingId,this.userData.companyId).subscribe((data:any) => {
          this.viewingDetails = data;
          this.basicDetailForm = new FormGroup({
            startDate:new FormControl(data?.startDate != null ? moment(data?.startDate).format("YYYY-MM-DD"):null,[Validators.required]),
          startDateTime:new FormControl(moment(
            data?.startDateTime
          ).format("HH:mm"),[Validators.required]),
          endDate:new FormControl(data?.endDate != null ? moment(data?.endDate).format("YYYY-MM-DD"):null,[Validators.required]),
          endDateTime:new FormControl(moment(
            data?.endDateTime
          ).format("HH:mm"),[Validators.required]),
          statusId:new FormControl(data.statusId),
          agentId:new FormControl(data.agentId,[Validators.required]),
          invite:new FormControl(data.invites),
          notes:new FormControl(data.notes),
          listingId: new FormControl(data.listingId,[Validators.required]),
          leadId: new FormControl(data.leadId,[Validators.required]),
        });
        this.selectedListingId = data?.listingId;
        this.selectedListingRef = data?.listingRef;
        this.selectedListingpropertyType= data?.listingPropertyType
        this.selectedListingPurpose = data?.listingPurpose
        this.selectedListingBed=data?.listingBed
        this.selectedListingEmirate=data?.listingEmirate
        this.selectedListingLocation=data?.ListingLocation
        this.selectedListingSubLocation=data?.listingSubLocation
        this.selectedLeadFirstName = data?.leadFirstName
        this.selectedLeadLastName = data?.leadLastName
        this.PeronsalMobile = this.getMobile(1,data?.mobile) 
        this.WorkMobile = this.getMobile(2,data?.mobile) 
        this.OtherMobile = this.getMobile(3,data?.mobile) 
        this.PersonalPhone = this.getPhone(1,data?.phone)
        this.WorkPhone = this.getPhone(2,data?.phone)
        this.OtherPhone = this.getPhone(1,data?.phone)
        this.PersonalEmail = this.getEmail(1,data?.email)
        this.WorkEmail = this.getEmail(2,data?.email)
        this.OtherEmail = this.getEmail(3,data?.email)
        this.selectedListingPrice=data?.listingPrice
        this.selectedLeadId = data?.leadId;
        this.selectedLeadRef = data?.leadRef;
        this.basicDetailForm.disable();
        this.IsLoading = false;
        this.cdr.detectChanges();
          
        })
      }
    });
  }

  getMobile(type:any,data:any) {
    var mobile = data?.filter((x:any) => x.mobileType == type);
    if(mobile?.length > 0) {
      return mobile.map((x:any) => x.countryCodeString + " " + x.mobile).join(", ");
    }
    else {
      return '';
    }
  }

  getPhone(type:any,data:any) {
    var mobile = data?.filter((x:any) => x.phoneType == type);
    if(mobile?.length > 0) {
      return mobile.map((x:any) => x.countryCodeString + " " + x.phone).join(", ");
    }
    else {
      return '';
    }
  }

  getEmail(type:any,data:any) {
    var mobile = data?.filter((x:any) => x.emailType == type);
    if(mobile?.length > 0) {
      return mobile.map((x:any) => x.email).join(", ");
    }
    else {
      return '';
    }
  }

  selectedTab: any = 'tab1';
  isAdd:boolean = false;
  isEdit:boolean = false;
  isView:boolean = false;
  isSave:boolean = false;
  basicDetailForm: FormGroup;
  basic:boolean = false;
  editViewingId:any = null;
  AllViewingStatus:any =[];
  AllViewingsPackList:any =[];
  tempSelectedListingRef:any = null;
  selectedListingId:number = 0;
  selectedListingRef:any
  selectedListingpropertyType:any
  selectedListingPurpose:any
  selectedListingBed:any
  selectedListingEmirate:any
  selectedListingLocation:any
  selectedListingSubLocation:any
  selectedListingPrice:any
  tempSelectedLeadRef:any = null;
  selectedLeadId:number = 0;
  selectedLeadRef:any;
  selectedLeadFirstName:any;
  selectedLeadLastName:any;
  filterStatus:any = null;
  selectedViewingId: number = 0;
  @Input() public modalConfig: ModalConfig;
  private createViewings: NgbModalRef;
  @ViewChild('datetimePicker') datetimepicker:any;
  @ViewChild('ViewListing')
  private modalContentViewingList: TemplateRef<LeadsDetailsComponent>;
  private ViewList: NgbModalRef;
  @ViewChild('ViewLead')
  private modalContentViewingLead: TemplateRef<LeadsDetailsComponent>;
  private ViewLead: NgbModalRef;
  viewingForm: FormGroup;
  IsLoading: boolean = false;
  Status:boolean=true;
  Type:boolean=true;
  PropertyType:boolean=true;
  ViewingsDetails:FormGroup;
  AllCategory:any[]=[];
  filterAllCategory:any[]=[];
  purposeList:any[]=[];
  filterpurposeList:any [] =[];
  AllLocation:any[]=[];
  AllViewingTimeList:any[]=[];
  searchArea:any;
  openonFocus:boolean = true;
  filterAgent:any = null;
  timeinterval:number = 5;
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'text',
    enableCheckAll: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  page = 1;
  imgUrl = environment.imgUrl;
  itemsPerPage = 25;
  totalItems: any;
  propertyTypeIdTest = 0;
  private modalRef: NgbModalRef;
  selectedDateRange: any;
  files: File[] = [];
  selectedPropertyType: any = '0';
  propertyTypeListTEst: any[] = [];
  propertyTypeList: any[] = [];
  selectedBed: any = '0';
  bedList: any[] = [];
  selectedLocation: any = '0';
  locationList: any[] = [];
  selectedSubLocation: any = '0';
  subLocationList: any[] = [];
  selectedEmirate: any = '0';
  emiratesList: any[] = [];
  totalRecord: number = 0;
  ref: any = '';
  refPlaceholer: any = 'Enter Ref';
  owner: any = '';
  ownerplaceholder: any = 'Enter Owner';
  commision: any = '';
  commisionPlaceholder: any = 'Enter Commision';
  deposit: any = '';
  depositPlaceholder: any = 'Enter Deposit';
  priceSq: any = '';
  priceSqPlaceholder: any = 'Enter Price/Sq M';
  myLocation: any = '';
  myLocationPlaceholder: any = 'Enter my location';
  titleAr: any = '';
  titleArPlaceholder: any = 'Enter titel ar';
  permitNo: any = '';
  permitNoPlaceholder: any = 'Enter permit number';
  selectedAgentOffice: any = '0';
  agentOfficeList: any;
  parking: any = '';
  parkingPlaceholder: any = 'Enter parking';
  listingDetails: any;
  selectedConstructionsStatus: any = '0';
  constructionStatusList: any[] = [];
  form: FormGroup;
  formAdvancedFilter: FormGroup;
  propertyStatusList: any[] = [];
  sourceList: any;
  frequencyList: any[] = [];
  portalList: any[] = [];
  furnishedList: any[] = [];
  filterDataValue: any = '';
  assignToList: any[] = [];
  usageList: any[] = [];
  LanguageList: any = ([] = []);
  ComplitionStatusList: any[] = [];
  bathsList: any[] = [];
  fittedList: any[] = [];
  chequeList: any[] = [];
  featuresList: any;
  sourceOfListingList: any[] = [];
  remindList: any[] = [];
  statusList: any[] = [];
  getDataon2: boolean = false;
  PeronsalMobile:any = null;
  PersonalPhone:any = null;
  PersonalEmail:any = null;
WorkMobile:any = null;
WorkPhone:any = null;
WorkEmail:any = null;
OtherMobile:any = null;
OtherPhone:any = null;
OtherEmail:any = null;

  ranges: any = {
    'Last 1 Year': [dayjs().subtract(1, 'year'), dayjs()],
  'Last Quarter': [dayjs().subtract(3, 'months').startOf('month'), dayjs().startOf('month').subtract(1, 'millisecond')],
  'Last 3 Months': [dayjs().subtract(3, 'months'), dayjs()],
  'Last Month': [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
  'Last 30 Days': [dayjs().subtract(29, 'days'), dayjs()],
  'Last 7 Days': [dayjs().subtract(6, 'days'), dayjs()],
  'Yesterday': [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')],
  'Today': [dayjs(), dayjs()],
  'Next 7 Days': [dayjs(), dayjs().add(7, 'days')],
  'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
  'This Quarter': [dayjs().startOf('month'), dayjs().add(3, 'months').endOf('month')],
  'Next 1 Year': [dayjs(), dayjs().add(1, 'year')],
  }
  pageNumber=1;
  pageSize=25;
  ContactBasicForm:FormGroup;
  LeadTypeList:any = [];
AllStatusType:any = [];
AllSubStatusType:any = [];
AllPriorityType:any = [];
AllEmirates:any = [];
AgentList:any = [];
AllSubLocation:any = [];
leaditemsPerPage:number = 25;
leadpage:number = 1;
  
  @ViewChild('AddViewings') private modalContent: TemplateRef<ViewingsTableComponent>;
constructor(private leadsService:LeadsService,private listingSevice : ListingService,private viewingService : ViewingsService,  private formBuilder: FormBuilder,private dropdownService: DropdownService,private authService: AuthService,
  private router: Router,
  private modalService: NgbModal,
  private cdr: ChangeDetectorRef,
  private toastr: ToastrService){

}

  dropDownList(){
    this.getAllViewingStatus();
    this.getAllAssignedTo();
    this.getAllCategory();
    this.getPurpose();
    this.getAllLocation();
    // this.getAllViewingTime();
    this.GetPropertyType();
        this.getPropertyStatusList();
        this.getBeds();
        this.getEmirates();
        this.getLocation();
        this.getAllSubLocation();
        this.getConstructionStatus();
        this.getSourceList();
        this.getPortals();
        this.getfrequencyList();
        this.getFurnishedList();
        this.getAllStatus();
        this.getAssignedTo();
        this.getusage();
        this.getComplitionStatus();
        this.getLanguage();
        this.getBaths();
        this.getFitted();
        this.getFrequency();
        this.getcheque();
        this.getAllSourceOfListing();
        this.getAllRemind();
        this.getAllUser();
      }

      getAllViewingStatus(){
        this.leadsService.getAllViewingStatus().subscribe((data:any) => {
          this.AllViewingStatus = data;
        })
      }
    
      getAllAssignedTo(){
        this.dropdownService.getAssignedToListByCompanyAndRole(this.userData.companyId,this.userData.roleId,this.userData.id).subscribe((data:any) => {
            this.AllViewingsPackList = data?.map((x:any) => ({
              ...x,
              profileImage: x.profileImage != null && x.profileImage != '' ? environment.imgUrl + x.profileImage : null
            }));;
        })
      }
    
      getAllCategory(){
        this.leadsService.getAllCategory().subscribe((data:any) => {
          this.AllCategory = data;
          this.filterAllCategory = data.map((x:any) => ({
            ...x,
            checked:false
          }))
        })
      }
    
      
    
      getAllLocation() {
        this.leadsService.getAllLocation().subscribe((data: any) => {
          this.AllLocation = data.map((i: any) => ({
            id: i?.id,
            text: i?.name,
          }));;
        });
      }
    
      getAllViewingTime(){
        this.viewingService.getAllViewingTime().subscribe((data: any | undefined) => {
          this.AllViewingTimeList = data;
        });
      }


  setInitialBasicDetailForm() {
    this.basicDetailForm = new FormGroup({
      listingId: new FormControl(null,[Validators.required]),
      leadId: new FormControl(null, [Validators.required]),
      startDate:new FormControl(null,[Validators.required]),
      startDateTime:new FormControl(null,[Validators.required]),
      endDate:new FormControl(null,[Validators.required]),
      endDateTime:new FormControl(null,[Validators.required]),
      statusId:new FormControl(1),
      agentId:new FormControl(null,Validators.required),
      invite:new FormControl(),
      notes:new FormControl()
    });
  }

  get agent() {
    return this.basicDetailForm.get('agentId')!;
  }

  get startDate() {
    return this.basicDetailForm.get('startDate')!;
  }

  get endDate() {
    return this.basicDetailForm.get('endDate')!;
  }

  get listingId() {
    return this.basicDetailForm.get('listingId')!;
  }

  get leadId() {
    return this.basicDetailForm.get('leadId')!;
  }

  get startDateTime() {
    return this.basicDetailForm.get('startDateTime')!;
  }

  get endDateTime() {
    return this.basicDetailForm.get('endDateTime')!;
  }


  get f(): { [key: string]: AbstractControl } {
    return this.basicDetailForm.controls;
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }



  public scrollToElement = (elementId: string) => {
    const overlayElement = this.container?.nativeElement;
    const targetElement = document.getElementById(elementId);
    const offset = 105.73; // Specify your desired offset value

    if (targetElement) {
      // overlayElement.scrollTop = targetElement.offsetTop - offset;
      if (targetElement.id === 'sec1') {
        console.log(true);
        let x = targetElement.offsetTop - offset;
      }
      let x = targetElement.offsetTop;

      if (overlayElement) {
        overlayElement.scrollTo({
          top: x,
          behavior: 'smooth',
        });
      }
    }
  };

  onEdit() {
    this.isEdit = true;
    this.isAdd = false;
    this.isView = false;
    this.basicDetailForm.enable();
  }

  onSubmit() {
    this.isSave = true;
    if(!this.basicDetailForm.valid) {
      this.scrollToElement('sec2');
      return ;
      //alert('please select agent')
    }else{
      // if(this.selectedListingId == 0 && this.selectedLeadId == 0) {
      //       Swal.fire(
      //         'Error',
      //         'Please select either a Listing or a Lead to save the viewing',
      //         'error'
      //       )
      // }
      // else {
        if(this.isAdd && !this.isEdit) {
      this.viewingService.InsertViewingDetails({
        listingId: this.selectedListingId == 0 ? null : this.selectedListingId,
        leadId: this.selectedLeadId === 0 ? null : this.selectedLeadId,
        startDate:this.basicDetailForm.value?.startDate,
        startDateTime:this.basicDetailForm.value?.startDateTime,
        //startTimeId:this.ViewingsDetails.value?.startTimeId,
        endDate:this.basicDetailForm.value?.endDate,
        endDateTime:this.basicDetailForm.value?.endDateTime,
        //endTimeId:this.ViewingsDetails.value?.endTimeId,
        statusId:this.basicDetailForm.value?.statusId,
        agentId:this.basicDetailForm.value?.agentId,
        invites:this.basicDetailForm.value?.invite,
        notes:this.basicDetailForm.value?.notes,
        createdBy:this.userData.id,
        updatedBy:this.userData.id,
        companyId: this.userData.companyId
      }).subscribe((data:any) => {
        
        this.toastr.success("Viewing added succesfully");
        document?.getElementById('kt_viewing-details_close')?.click();
        //this.IsLoading = false;
        this.viewingService.OpenListViewing(true);
  
      })
      
      }
      if(this.isEdit && !this.isAdd) {
        this.viewingService.EditViewingDetails({
          id: this.editViewingId,
          listingId: this.selectedListingId == 0 ? null : this.selectedListingId,
          leadId: this.selectedLeadId === 0 ? null : this.selectedLeadId,
          startDate:this.basicDetailForm.value?.startDate,
          startDateTime:this.basicDetailForm.value?.startDateTime,
          //startTimeId:this.ViewingsDetails.value?.startTimeId,
          endDate:this.basicDetailForm.value?.endDate,
          endDateTime:this.basicDetailForm.value?.endDateTime,
          //endTimeId:this.ViewingsDetails.value?.endTimeId,
          statusId:this.basicDetailForm.value?.statusId,
          agentId:this.basicDetailForm.value?.agentId,
          invites:this.basicDetailForm.value?.invite,
          notes:this.basicDetailForm.value?.notes,
          updatedBy:this.userData.id,
          companyId: this.userData.companyId,
        }).subscribe((data:any) => {
          this.toastr.success("Viewing updated succesfully");
          document?.getElementById('kt_viewing-details_close')?.click();
        //this.IsLoading = false;
        this.viewingService.OpenListViewing(true);
        })
        
    }
    // }
  }
  }

  onCancel() {
    this.isView = true;
    this.isAdd = false;
    this.isEdit = false;
    this.basic = true;
    this.IsLoading = true;
    this.scrollToElement('sec1');
    this.viewingService.GetViewingDetailsById(this.editViewingId,this.userData.companyId).subscribe((data:any) => {
      this.viewingDetails = data;
      this.basicDetailForm = new FormGroup({
        startDate:new FormControl(data?.startDate != null ? moment(data?.startDate).format("YYYY-MM-DD"):null),
      startDateTime:new FormControl(moment(
        data?.startDateTime
      ).format("HH:mm")),
      endDate:new FormControl(data?.endDate != null ? moment(data?.endDate).format("YYYY-MM-DD"):null),
      endDateTime:new FormControl(moment(
        data?.endDateTime
      ).format("HH:mm")),
      statusId:new FormControl(data.statusId),
      agentId:new FormControl(data.agentId),
      invite:new FormControl(data.invites),
      notes:new FormControl(data.notes),
      listingId: new FormControl(data.listingId,[Validators.required]),
      leadId: new FormControl(data.leadId,[Validators.required]),
    });
    this.selectedListingId = data?.listingId;
    this.selectedListingRef = data?.listingRef;
    this.selectedListingpropertyType= data?.listingPropertyType
    this.selectedListingPurpose = data?.listingPurpose
    this.selectedListingBed=data?.listingBed
    this.selectedListingEmirate=data?.listingEmirate
    this.selectedListingLocation=data?.ListingLocation
    this.selectedListingSubLocation=data?.listingSubLocation
    this.selectedLeadFirstName = data?.leadFirstName
    this.selectedLeadLastName = data?.leadLastName
    this.PeronsalMobile = this.getMobile(1,data?.mobile) 
    this.WorkMobile = this.getMobile(2,data?.mobile) 
    this.OtherMobile = this.getMobile(3,data?.mobile) 
    this.PersonalPhone = this.getPhone(1,data?.phone)
    this.WorkPhone = this.getPhone(2,data?.phone)
    this.OtherPhone = this.getPhone(1,data?.phone)
    this.PersonalEmail = this.getEmail(1,data?.email)
    this.WorkEmail = this.getEmail(2,data?.email)
    this.OtherEmail = this.getEmail(3,data?.email)
    this.selectedListingPrice=data?.listingPrice
    this.selectedLeadId = data?.leadId;
    this.selectedLeadRef = data?.leadRef;
    this.basicDetailForm.disable();
    this.IsLoading = false;
    this.cdr.detectChanges();
  });
  }

  openListingModal() {
    return new Promise<boolean>((resolve) => {
      this.ViewList = this.modalService.open(this.modalContentViewingList, {
        size: 'xl',
      });
      this.ViewList.result.then(resolve, resolve);
    });
  }

  openLeadModal() {
    return new Promise<boolean>((resolve) => {
      this.ViewLead = this.modalService.open(this.modalContentViewingLead, {
        size: 'xl',
      });
      this.ViewLead.result.then(resolve, resolve);
    });
  }

  closeViewList() {
    this.ViewList.close(this.modalConfig);
  }

  closeViewLead() {
    this.ViewLead.close(this.modalConfig);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      listingType: new FormControl('0'),
      reference: new FormControl(''),
      status: new FormControl(),
      assignedToId: new FormControl(),
      usageId: new FormControl(),
      purposeId: new FormControl(),
      propertyTypeId: new FormControl(),
      completionStatusId: new FormControl(),
      bedsId: new FormControl(),
      bathsId: new FormControl(),
      minBUA: new FormControl(),
      maxBUA: new FormControl(),
      minPlotArea: new FormControl(),
      maxPlotArea: new FormControl(),
      furnishedId: new FormControl(),
      fittedId: new FormControl(),
      parkingSpaces: new FormControl(),
      views: new FormControl(''),
      layoutType: new FormControl(''),
      ownershipDuration: new FormControl(),
      reraPermitNumber: new FormControl(''),
      reraTransactionNumber: new FormControl(''),
      titleDeedNumber: new FormControl(''),
      emiratesId: new FormControl(),
      locationId: new FormControl(),
      subLocationId: new FormControl(),
      street: new FormControl(''),
      floor: new FormControl(''),
      unitNumber: new FormControl(''),
      frequencyId: new FormControl(),
      chequeId: new FormControl(),
      minPrice: new FormControl(),
      maxPrice: new FormControl(),
      pricePerSqM: new FormControl(),
      commisionPer: new FormControl(),
      depositPer: new FormControl(),
      commisionAED: new FormControl(),
      depositAED: new FormControl(),
      monthlyServiceCharges: new FormControl(),
      languageId: new FormControl(),
      title: new FormControl(''),
      description: new FormControl(''),
      youtubeVideoLink: new FormControl(''),
      virtualTourLink: new FormControl(''),
      audioTourLink: new FormControl(''),
      videoTourLink: new FormControl(''),
      qrCodeLink: new FormControl(''),
      school: new FormControl(''),
      metro: new FormControl(''),
      medicalCenter: new FormControl(''),
      shoppingMall: new FormControl(''),
      mosques: new FormControl(''),
      beach: new FormControl(''),
      superMarket: new FormControl(''),
      park: new FormControl(''),
      ownerFirstName: new FormControl(''),
      ownerLastName: new FormControl(''),
      ownerMobileNo: new FormControl(''),
      ownerEmail: new FormControl(''),
      tenantFirstName: new FormControl(''),
      tenantLastName: new FormControl(''),
      tenantMobileNo: new FormControl(''),
      tenantEmail: new FormControl(''),
      propertyStatusId: new FormControl(),
      sourceOfListingId: new FormControl(),
      fromExpirationDate: new FormControl(''),
      toExpirationDate: new FormControl(''),
      featured: new FormControl(),
      managed: new FormControl(),
      exclusive: new FormControl(),
      dEWANumber: new FormControl(''),
      sTrNumber: new FormControl(''),
      fromNextAvailable: new FormControl(''),
      toNextAvailable: new FormControl(''),
      remindId: new FormControl(),
      keyLocation: new FormControl(''),
      propertyTenanted: new FormControl(),
      fromRentedAt: new FormControl(),
      toRentedAt: new FormControl(),
      fromRentedUntil: new FormControl(''),
      toRentedUntil: new FormControl(''),
      createdBy: new FormControl(),
      updatedBy: new FormControl(),
      fromListed: new FormControl(''),
      toListed: new FormControl(''),
      fromUpdated: new FormControl(''),
      toUpdated: new FormControl(''),
      fromLastPublishedOn: new FormControl(''),
      toLastPublishedOn: new FormControl(''),
      page: new FormControl(1),
      itemsPerPage: new FormControl(this.itemsPerPage),
      sortFiled: new FormControl('Updated'),
      sortDirection: new FormControl(true),
      agentEmail: new FormControl(''),
      companyId:new FormControl(this.userData.companyId),
      createdUser: new FormControl(this.userData.id),
      roleId: new FormControl(this.userData.roleId),
      userId: new FormControl(this.userData.id)
    });

    var listingTypeControl = this.form.get('listingType');
    if (listingTypeControl) {
      listingTypeControl.setValue('1');
    }

    //this.form.controls['listingType'].setValue('1');
  }

  GetPropertyType() {
    this.listingSevice.GetPropertyType().subscribe((data: any | undefined) => {
      this.propertyTypeList = data;
    });
  }
  getBeds() {
    this.listingSevice.getBeds().subscribe((data: any | undefined) => {
      this.bedList = data;
    });
  }
  getSubLocation(id: any) {
    this.subLocationList = [];
    this.listingSevice
      .GetSubLocationById(id)
      .subscribe((data: any | undefined) => {
        this.subLocationList = data;
        this.AllSubLocation = data;
      });
  }
  selectSubLocation(id: any) {
    this.form.controls['subLocationId'].setValue(null);
    this.getSubLocation(id);
  }
  getEmirates() {
    this.listingSevice.getEmirates().subscribe((data: any | undefined) => {
      this.emiratesList = data;
    });
  }
  getLocation() {
    this.listingSevice.getLocation().subscribe((data: any | undefined) => {
      this.locationList = data;
    });
  }
  getAllSubLocation() {
    this.listingSevice
      .GetAllSubLocation()
      .subscribe((data: any | undefined) => {
        this.subLocationList = data;
      });
  }
  getConstructionStatus() {
    this.listingSevice
      .getConstructionStatus()
      .subscribe((data: any | undefined) => {
        this.constructionStatusList = data;
      });
  }

  listingData(sortFiled: any, sortDirection: any, page: any, itemPerPage: any) {
    this.form.controls['listingType'].setValue('0');
    this.form.controls['sortFiled'].setValue(sortFiled);
    this.form.controls['sortDirection'].setValue(sortDirection);
    this.form.controls['page'].setValue(page);
    this.form.controls['itemsPerPage'].setValue(this.itemsPerPage);
    this.IsLoading = true;
    this.listingDetails = [];
    this.listingSevice.getListingBasic(this.form.value).subscribe(
      (data: any | undefined) => {
        this.listingDetails = data;
        this.IsLoading = false;
        if (data.length > 0) {
          this.totalRecord = data[0].totalRecords;
        } else {
          this.totalRecord = 0;
        }
        this.cdr.detectChanges();
        this.IsLoading = false;
      },
      (error) => {
        this.IsLoading = false;
      }
    );
  }

  InitiallistingData(sortFiled: any, sortDirection: any, page: any, itemPerPage: any) {
    this.form.controls['listingType'].setValue('0');
    this.form.controls['sortFiled'].setValue(sortFiled);
    this.form.controls['sortDirection'].setValue(sortDirection);
    this.form.controls['page'].setValue(page);
    this.form.controls['itemsPerPage'].setValue(this.itemsPerPage);
    
    this.listingDetails = [];
    this.listingSevice.getListingBasic(this.form.value).subscribe(
      (data: any | undefined) => {
        this.listingDetails = data;
        
        if (data.length > 0) {
          this.totalRecord = data[0].totalRecords;
        } else {
          this.totalRecord = 0;
        }
        this.cdr.detectChanges();
      },
      (error) => {
        
      }
    );
  }


  getPropertyStatusList() {
    this.listingSevice
      .getPropertyStatus()
      .subscribe((data: any | undefined) => {
        this.propertyStatusList = data;
      });
  }
  getSourceList() {
    this.listingSevice.GetAllSourceList().subscribe((data: any | undefined) => {
      this.sourceList = data;
    });
  }

  getfrequencyList() {
    this.listingSevice.getFrequency().subscribe((data: any | undefined) => {
      this.frequencyList = data;
    });
  }
  getPortals() {
    this.listingSevice.getPortals().subscribe((data: any | undefined) => {
      this.portalList = data;
    });
  }
  getFurnishedList() {
    this.listingSevice.getFurnished().subscribe((data: any | undefined) => {
      this.furnishedList = data;
    });
  }
  ResetFilter() {
    this.initForm();
    this.GetPropertyType();
    this.getPropertyStatusList();
    this.getBeds();
    this.getEmirates();
    this.getLocation();
    this.getAllSubLocation();
    this.getConstructionStatus();
    this.getSourceList();
    this.getPortals();
    this.getfrequencyList();
    this.getFurnishedList();
    this.listingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      this.form.value.page,
      this.form.value.itemsPerPage
    );
  }
  onAdd() {
    this.listingSevice.OpenListing('Add');
  }

  onView() {
    this.listingSevice.OpenViewListing(true);
  }
  open(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'xl' });
      this.modalRef.result.then(resolve, resolve);
      this.getPropertyStatusList();
    });
  }

  async close(): Promise<void> {
    this.modalRef.close(this.modalConfig);
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.disableDismissButton !== undefined) {
      return;
    }

    if (
      this.modalConfig.shouldDismiss === undefined ||
      (await this.modalConfig.shouldDismiss())
    ) {
      const result =
        this.modalConfig.onDismiss === undefined ||
        (await this.modalConfig.onDismiss());
      this.modalRef.dismiss(result);
    }
  }
  onFilterSelection(name: any, e: any, page: any, itemPerPage: any) {
    this.page = 1;
    this.form.controls[name].setValue(e.target.value);
    this.form.controls['page'].setValue(page);
    this.form.controls['itemsPerPage'].setValue(itemPerPage);
    if (e.target.value.length > 2) {
      this.getDataon2 = true;
      this.filterDataValue = e.target.value;
      this.listingData(
        this.form.value.sortFiled,
        this.form.value.sortDirection,
        page,
        itemPerPage
      );
    }
    if (this.filterDataValue != '' && e.target.value.length == 0) {
      this.filterDataValue = '';
      if (this.getDataon2) {
        this.listingData(
          this.form.value.sortFiled,
          this.form.value.sortDirection,
          page,
          itemPerPage
        );
      }
      this.getDataon2 = false;
    }
  }
  onFilterSelection1st(name: any, e: any, page: any, itemPerPage: any) {
    this.page = 1;
    this.form.controls[name].setValue(e.target.value);
    this.form.controls['page'].setValue(page);
    this.form.controls['itemsPerPage'].setValue(itemPerPage);
    if (e.target.value.length > 0) {
      this.getDataon2 = true;
      this.filterDataValue = e.target.value;
      this.listingData(
        this.form.value.sortFiled,
        this.form.value.sortDirection,
        page,
        itemPerPage
      );
    }
    if (this.filterDataValue != '' && e.target.value.length == 0) {
      this.filterDataValue = '';
      if (this.getDataon2) {
        this.listingData(
          this.form.value.sortFiled,
          this.form.value.sortDirection,
          page,
          itemPerPage
        );
      }
      this.getDataon2 = false;
    }
  }
  onFilterSelectionAdvanceTextFilter(name: any, e: any) {
    if (e.target.value.length > 2) {
      this.getDataon2 = true;
      this.filterDataValue = e.target.value;
    }
    if (this.filterDataValue != '' && e.target.value.length == 0) {
      this.filterDataValue = '';
    }
    this.form.controls[name].setValue(e.target.value);
  }
  onFilterSelectionDrp(name: any, e: any, page: any, itemPerPage: any) {
    this.page = 1;
    this.form.controls['page'].setValue(this.page);
    this.form.controls['itemsPerPage'].setValue(this.itemsPerPage);
    switch (e) {
      case undefined:
        this.form.controls[name].setValue(null);
        break;
      default:
        this.form.controls[name].setValue(e);
        break;
    }
    this.listingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      page,
      itemPerPage
    );
  }
  onFilterSelectionAdvanceFilter(name: any, e: any) {
    switch (e) {
      case undefined:
        this.form.controls[name].setValue(null);
        break;
      default:
        this.form.controls[name].setValue(e);
        break;
    }
  }
  onFilterSelectionDrpSelectionAdvance(name: any, e: any) {
    switch (e) {
      case undefined:
        this.form.controls[name].setValue(null);
        break;
      default:
        // this.form.controls[name].setValue(e);
        break;
    }
  }
  renderPage(event: number) {
    this.page = event;
    this.form.controls['page'].setValue(this.page);
    this.form.controls['itemsPerPage'].setValue(this.itemsPerPage);
    this.listingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      this.form.value.page,
      this.form.value.itemsPerPage
    );
  }
  ResetAdvanceFilter() {
    this.form.reset();
    setTimeout(() => {
      this.initForm();
      this.listingData(
        this.form.value.sortFiled,
        this.form.value.sortDirection,
        this.form.value.page,
        this.form.value.itemsPerPage
      );
    }, 1000);
  }
  getAllStatus() {
    this.listingSevice
      .getAllListingStatus()
      .subscribe((data: any | undefined) => {
        this.statusList = data;
      });
  }
  getAssignedTo() {
    this.dropdownService.getAssignedToListByCompanyAndRole(this.userData.companyId,this.userData.roleId,this.userData.id).subscribe((data: any | undefined) => {
      this.assignToList = data;
      this.AgentList = data;
    });
  }
  getusage() {
    this.listingSevice.getUsage().subscribe((data: any | undefined) => {
      this.usageList = data;
    });
  }
  getPurpose() {
    this.listingSevice.getPurpose().subscribe((data: any | undefined) => {
      this.purposeList = data;
    });
  }
  getProperyType(usageId: any) {
    this.listingSevice
      .GetPropertyTypeByUsageId(usageId)
      .subscribe((data: any | undefined) => {
        this.propertyTypeList = data;
      });
  }

  getProperyTypefilter() {
    this.listingSevice.GetPropertyType().subscribe((data: any | undefined) => {
      this.propertyTypeList = data;
    });
  }
  getComplitionStatus() {
    this.listingSevice
      .getConstructionStatus()
      .subscribe((data: any | undefined) => {
        this.ComplitionStatusList = data;
      });
  }
  getLanguage() {
    this.listingSevice.getLanguage().subscribe((data: any | undefined) => {
      this.LanguageList = data;
    });
  }
  getBaths() {
    this.listingSevice.getBath().subscribe((data: any | undefined) => {
      this.bathsList = data;
    });
  }
  getFurnished() {
    this.listingSevice.getFurnished().subscribe((data: any | undefined) => {
      this.furnishedList = data;
    });
  }
  getFitted() {
    this.listingSevice.getFitted().subscribe((data: any | undefined) => {
      this.fittedList = data;
    });
  }
  getFrequency() {
    this.listingSevice.getFrequency().subscribe((data: any | undefined) => {
      this.frequencyList = data;
    });
  }
  getcheque() {
    this.listingSevice.getCheques().subscribe((data: any | undefined) => {
      this.chequeList = data;
    });
  }
  getFeatures() {
    this.featuresList = [];
    this.listingSevice.getFeatures().subscribe((data: any | undefined) => {
      this.featuresList = data;
    });
  }

  getAllSourceOfListing() {
    this.listingSevice
      .getAllSourceOfListing()
      .subscribe((data: any | undefined) => {
        this.sourceOfListingList = data;
      });
  }
  getAllRemind() {
    this.listingSevice.getAllRemind().subscribe((data: any | undefined) => {
      this.remindList = data;
    });
  }
  onSwitchChange(field: any, e: any) {
    this.form.controls[field].setValue(e.target.checked);
    this.listingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      1,
      this.itemsPerPage
    );
  }
  onAdvanceFilter() {
    this.listingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      this.page,
      this.itemsPerPage
    );
    this.cdr.detectChanges();
  }
  onFilterSelectionDecimal(name: any, e: any, page: any, itemPerPage: any) {
    this.page = 1;
    this.form.controls['page'].setValue(page);
    this.form.controls['itemsPerPage'].setValue(itemPerPage);
    //this.form.controls[name].setValue(e);
    if (e.target.value.length > 0) {
      this.getDataon2 = true;
      this.filterDataValue = e.target.value;
      this.listingData(
        this.form.value.sortFiled,
        this.form.value.sortDirection,
        page,
        itemPerPage
      );
    }
    if (this.filterDataValue != '' && e.target.value.length == 0) {
      this.filterDataValue = '';
      this.form.controls[name].setValue(null);
      if (this.getDataon2) {
        this.listingData(
          this.form.value.sortFiled,
          this.form.value.sortDirection,
          page,
          itemPerPage
        );
      }
      this.getDataon2 = !this.getDataon2;
    }
  }
  onFilterSelectionAdvanceFilterDecimal(name: any, e: any) {
    switch (e) {
      case '':
        this.form.controls[name].setValue(null);
        break;
      default:
        this.form.controls[name].setValue(e.target.value);
        break;
    }
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  getAllUser() {
    this.dropdownService
      .GetAllUserByCompany(this.userData.companyId)
      .subscribe((data: any | undefined) => {
        this.userCreateByList = data;
        this.userUpdatedByList = data;
      });
  }
  
  onSelectListingId(ListingData:any) {
    this.tempSelectedListingRef = ListingData;
  }

  onSelectLeadId(leadData:any) {
    this.tempSelectedLeadRef = leadData;
  }

  openListingorLeadErrorModal() {
    return new Promise<boolean>((resolve) => {
      this.ViewList = this.modalService.open(this.modalContentViewingList, {
        size: 'lg',
      });
      this.ViewList.result.then(resolve, resolve);
    });
  }

  saveListing() {
    if(this.tempSelectedListingRef != null) {
      this.selectedListingId = this.tempSelectedListingRef.id;
      var listingId = this.selectedListingId
      this.basicDetailForm.controls['listingId'].setValue(listingId);
      this.selectedListingRef = this.tempSelectedListingRef.reference;
      this.selectedListingpropertyType= this.tempSelectedListingRef.propertytypeName
      this.selectedListingPurpose = this.tempSelectedListingRef.purposeName
  this.selectedListingBed=this.tempSelectedListingRef.bedsName
  this.selectedListingEmirate=this.tempSelectedListingRef.emiratesName
  this.selectedListingLocation=this.tempSelectedListingRef.locationName
  this.selectedListingSubLocation=this.tempSelectedListingRef.subLocationName
  this.selectedListingPrice=this.tempSelectedListingRef.price
    }
    this.ViewList.close(this.modalConfig);
  }

  closeListing() {
    this.ViewList.close(this.modalConfig);
  }

  saveLead() {
    if(this.tempSelectedLeadRef != null) {
      this.selectedLeadId = this.tempSelectedLeadRef.id;
      var leadId = this.selectedLeadId
      this.basicDetailForm.controls['leadId'].setValue(leadId);
      this.selectedLeadRef = this.tempSelectedLeadRef.reference;
      this.selectedLeadFirstName = this.tempSelectedLeadRef.firstName;
      this.selectedLeadLastName = this.tempSelectedLeadRef.lastName;
        // this.PeronsalMobile = null;
        // this.PersonalPhone = null;
        // this.PersonalEmail = null;
        // this.WorkMobile = null;
        // this.WorkPhone = null;
        // this.WorkEmail = null;
        // this.OtherMobile = null;
        // this.OtherPhone = null;
        // this.OtherEmail = null;

        this.PeronsalMobile = this.getMobile(1,this.tempSelectedLeadRef.leadMobile) 
        this.WorkMobile = this.getMobile(2,this.tempSelectedLeadRef.leadMobile) 
        this.OtherMobile = this.getMobile(3,this.tempSelectedLeadRef.leadMobile) 
        this.PersonalPhone = this.getPhone(1,this.tempSelectedLeadRef.leadPhone)
        this.WorkPhone = this.getPhone(2,this.tempSelectedLeadRef.leadPhone)
        this.OtherPhone = this.getPhone(1,this.tempSelectedLeadRef.leadPhone)
        this.PersonalEmail = this.getEmail(1,this.tempSelectedLeadRef.leadEmail)
        this.WorkEmail = this.getEmail(2,this.tempSelectedLeadRef.leadEmail)
        this.OtherEmail = this.getEmail(3,this.tempSelectedLeadRef.leadEmail)
    }
    this.ViewLead.close(this.modalConfig);
  }

  closeLead() {
    this.ViewLead.close(this.modalConfig);
  }

  closeViewing() {
    this.viewingService.openDrawer(false);
    this.viewingService.SelectViewingId(0);
  }


  onchangeCheckBox(name:any, e: any) {
    this.ContactBasicForm.controls[name].setValue(e); 
  this.leadData(
    this.ContactBasicForm.value.sortFiled,
    this.ContactBasicForm.value.sortDirection,
    this.ContactBasicForm.value.page,
    this.ContactBasicForm.value.itemsPerPage
  );
}

leadData(sortFiled: any, sortDirection: any, page: any, itemPerPage: any) {
  this.ContactBasicForm.controls['sortFiled'].setValue(sortFiled);
  this.ContactBasicForm.controls['sortDirection'].setValue(sortDirection);
  this.ContactBasicForm.controls['page'].setValue(page);
  this.ContactBasicForm.controls['itemsPerPage'].setValue(this.leaditemsPerPage);
  this.IsLoading = true;
  this.leadsService
    .getAllLeadDetailsUsiFilter(this.ContactBasicForm.value)
    .subscribe(
      (data: any | undefined) => {
        this.contactDetails = data;
        this.IsLoading = false;
        if (data.length > 0) {
          this.totalItems = data[0].totalCount;
        } else {
          this.totalItems = 0;
        }
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 1000);
        this.IsLoading = false;
      },
      (error) => {
        this.IsLoading = false;
      }
      );
      console.log("this.ContactBasicForm.value",this.ContactBasicForm.value)
}

InitalleadData(sortFiled: any, sortDirection: any, page: any, itemPerPage: any) {
  this.ContactBasicForm.controls['sortFiled'].setValue(sortFiled);
  this.ContactBasicForm.controls['sortDirection'].setValue(sortDirection);
  this.ContactBasicForm.controls['page'].setValue(page);
  this.ContactBasicForm.controls['itemsPerPage'].setValue(this.leaditemsPerPage);
  this.leadsService
    .getAllLeadDetailsUsiFilter(this.ContactBasicForm.value)
    .subscribe(
      (data: any | undefined) => {
        this.contactDetails = data;
        
        if (data.length > 0) {
          this.totalItems = data[0].totalCount;
        } else {
          this.totalItems = 0;
        }
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 1000);
        
      },
      (error) => {
       
      }
      );
      console.log("this.ContactBasicForm.value",this.ContactBasicForm.value)
}

setDetailsListing() {
  this.ContactBasicForm = this.formBuilder.group({
    reference: new FormControl(),
      leadTypeId: new FormControl(null),
      financeId:new FormControl(null),
      statusId: new FormControl(null),
      subStatusId: new FormControl(null),
      priorityId: new FormControl(null),
      hot: new FormControl(null),
      firstName: new FormControl(),
      lastName: new FormControl(),
      phone: new FormControl(),
      personalMobile: new FormControl(),
      workMobile: new FormControl(),
      otherMobile: new FormControl(),
      personalPhone: new FormControl(),
      workPhone: new FormControl(),
      otherPhone: new FormControl(),
      personalEmail: new FormControl(),
      workEmail: new FormControl(),
      otherEmail: new FormControl(),
      categoryId: new FormControl(null),
      listingRef:new FormControl(null),
      emirateId: new FormControl(null),
      locationId: new FormControl(null),
      subLocationId: new FormControl(null),
      beds: new FormControl(),
      minBed: new FormControl(),
      maxBed: new FormControl(),
      price: new FormControl(),
      minPrice: new FormControl(),
      maxPrice: new FormControl(),
      minArea: new FormControl(),
      maxArea: new FormControl(),
      builtupArea: new FormControl(),
      layoutType: new FormControl(),
      unit: new FormControl(),
      sourceId: new FormControl(null),
      agentId: new FormControl(null),
      fromEnquiryDate: new FormControl(),
      toEnquiryDate: new FormControl(),
      fromDateUpdated: new FormControl(),
      toDateUpdated: new FormControl(),
      agentReferral: new FormControl(null),
      shareThisLead: new FormControl(),
      contactCompany: new FormControl(),
      email: new FormControl(),
      fromCreated: new FormControl(),
      toCreated: new FormControl(),
      FromUpdated: new FormControl(),
      leadsTypes:new FormControl('2'),
      toUpdated: new FormControl(),
      contactRef: new FormControl(),
    page: new FormControl(1),
    itemsPerPage: new FormControl(this.leaditemsPerPage),
    sortFiled: new FormControl('Updated'),
    sortDirection: new FormControl(true),
    companyId: new FormControl(this.userData.companyId),
    userId: new FormControl(this.userData.id),
    roleId: new FormControl(this.userData.roleId),
  });
  console.log(" this.ContactBasicForm", this.ContactBasicForm)
}

getAllLeadType() {
  this.leadsService.getLeadType().subscribe((data: any) => {
    this.LeadTypeList = data;
  });
}

getAllLeadStatus() {
  this.leadsService.getGetAllLeadStatus().subscribe((data: any) => {
    this.AllStatusType = data;
  });
}

getAllLeadSubStatus() {
  this.leadsService.getAllLeadSubStatus().subscribe((data: any) => {
    this.AllSubStatusType = data;
  });
}

getAllLeadPriority() {
  this.leadsService.getAllLeadPriority().subscribe((data: any) => {
    this.AllPriorityType = data;
  });
}


getAllEmirates() {
  this.leadsService.getAllEmirates().subscribe((data: any) => {
    this.AllEmirates = data;
  });
}

onFilterLeadSelection(name: any, e: any, page: any, itemPerPage: any) {
  this.page = 1;
  this.ContactBasicForm.controls[name].setValue(e.target.value);
  this.ContactBasicForm.controls['page'].setValue(page);
  this.ContactBasicForm.controls['itemsPerPage'].setValue(itemPerPage);
  if (e.target.value.length > 2) {
    this.getDataon2 = true;
    this.filterDataValue = e.target.value;
    this.leadData(
      this.ContactBasicForm.value.sortFiled,
      this.ContactBasicForm.value.sortDirection,
      page,
      itemPerPage
    );
  }
  if (this.filterDataValue != '' && e.target.value.length == 0) {
    this.filterDataValue = '';
    if (this.getDataon2) {
      this.leadData(
        this.ContactBasicForm.value.sortFiled,
        this.ContactBasicForm.value.sortDirection,
        page,
        itemPerPage
      );
    }
    this.getDataon2 = false;
  }
}

onFilterLeadSelectionDrp(name: any, e: any, page: any, itemPerPage: any) {
  this.leadpage = 1;
  this.ContactBasicForm.controls['page'].setValue(this.leadpage);
  this.ContactBasicForm.controls['itemsPerPage'].setValue(this.leaditemsPerPage);
  switch (e) {
    case undefined:
      this.ContactBasicForm.controls[name].setValue(null);
      break;
    default:
      this.ContactBasicForm.controls[name].setValue(e);
      break;
  }
  this.leadData(
    this.ContactBasicForm.value.sortFiled,
    this.ContactBasicForm.value.sortDirection,
    page,
    itemPerPage
  );
}

renderleadPage(event: number) {
  this.leadpage = event;
  this.ContactBasicForm.controls['page'].setValue(this.leadpage);
  this.ContactBasicForm.controls['itemsPerPage'].setValue(this.leaditemsPerPage);
  this.leadData(
    this.ContactBasicForm.value.sortFiled,
    this.ContactBasicForm.value.sortDirection,
    this.ContactBasicForm.value.page,
    this.ContactBasicForm.value.itemsPerPage
  );
}
}
