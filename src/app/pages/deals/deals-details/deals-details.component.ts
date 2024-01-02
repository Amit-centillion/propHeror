import { ChangeDetectorRef, Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from 'src/app/_metronic/partials';
import { DealsService } from 'src/app/modules/auth/services/deals.service';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { LeadsService } from 'src/app/modules/auth/services/leads.service';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { LeadsDetailsComponent } from '../../leads/leads-details/leads-details.component';
import { ViewingsTableComponent } from '../../viewings/viewings-table/viewings-table.component';
import { ViewingsService } from 'src/app/modules/auth/services/viewing.service';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import { AuthService } from 'src/app/modules/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-deals-details',
  templateUrl: './deals-details.component.html',
  styleUrls: ['./deals-details.component.scss']
})
export class DealsDetailsComponent {
  basic:boolean=false;
  isSaveNotes: boolean = false;
  DealNotes:any = [];
  DealNotesForm:FormGroup;
    userCreateByList: any[] = [];
  userUpdatedByList: any[] = [];
  transaction:boolean=false;
  commission:boolean=false;
  additionalDetails:boolean = false;
  @ViewChild('container', { static: false }) container!: ElementRef;
  StatusForm:FormGroup;
  BasicDetailsForm:FormGroup;
  TransactionDetailsForm:FormGroup;
  CommissionDetailsForm:FormGroup;
  AdditionalDetailform: FormGroup;
  AllDealStatusType:any[]=[];
  AllDealSubStatusType:any[]=[];
  purposeList:any[]=[];
  AgentLeadList:any[]=[];
  TransactionTypeList:any[]=[];
  AllCheques:any = [];
  ReminderList:any = [];
  BuyerTypeList:any = [];
  FinanceTypeList:any = [];
  AllSourceList:any = [];
  AllDealPurposeList:any = [];
  isSave:boolean = false;
  selectedTab: any = 'tab1';
  isAdd:boolean = true;
  isEdit:boolean = false;
  isView:boolean = false;
  basicDetailForm: FormGroup;
  editDealId:any = null;
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
  selectedListingOwnerContactReference: any
  selectedListingOwnerFirstName:any
  selectedListingOwnerLastName:any
  selectedListingOwnerPersonalMobile:any
  selectedListingOwnerWorkMobile:any
  selectedListingOwnerOtherMobile:any
  selectedListingOwnerPersonalPhone:any
  selectedListingOwnerWorkPhone:any
  selectedListingOwnerOtherPhone:any
  selectedListingOwnerPersonalEmail:any
  selectedListingOwnerWorkEmail:any
  selectedListingOwnerOtherEmail:any
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
PeronsalMobile:any = null;
PersonalPhone:any = null;
PersonalEmail:any = null;
WorkMobile:any = null;
WorkPhone:any = null;
WorkEmail:any = null;
OtherMobile:any = null;
OtherPhone:any = null;
OtherEmail:any = null;
contactDetails:any =[];
DealDetails:any = null;
userData:any;
ExternalReferralTypeList:any = [];
isEditDealPermission:boolean = false;
companySettings:any;
imgUrl = environment.imgUrl;

  
  @ViewChild('AddViewings') private modalContent: TemplateRef<ViewingsTableComponent>;
constructor(private dealsService : DealsService,private leadsService : LeadsService,private listingSevice : ListingService,private dropDownService : DropdownService,private cdr: ChangeDetectorRef,private formBuilder: FormBuilder,private modalService: NgbModal,private viewingService : ViewingsService,
  private toastr: ToastrService,private authService: AuthService){

}
ngOnInit(){
  var uData = this.authService.userValue;
  if(uData != null){
  this.userData= JSON.parse(uData);
  this.isEditDealPermission = this.userData.permissionAccess.filter((x:any) => x.permissionId == 18).length > 0;
  }
  this.authService.companySetting.subscribe((data:any) => {
    this.companySettings = data;
  })
  this.setStatusForm();
  this.setBasicDetailsForm();
  this.setTransactionDetailsForm();
  this.setCommissionDetailsForm();
  this.setAdditionalDetailform();
  this.dealsService.isOpenAddDeal.pipe().subscribe((data: any) => {
    if(data?.AddDeal){
      this.DealNotes = [];
        this.selectTab('tab1');
      this.isAdd = true;
      this.isEdit = false;
      this.isView = false;
      this.basic=true;
      this.transaction=true;
      this.commission=true;
      this.additionalDetails = true;
      this.isSave = false;
this.DealDetails = null;
        this.tempSelectedListingRef = null;
        this.selectedListingRef = null;
        this.selectedListingpropertyType=null
        this.selectedListingPurpose = null;
  this.selectedListingBed=null
  this.selectedListingEmirate=null
  this.selectedListingLocation=null
  this.selectedListingSubLocation=null
  this.selectedListingPrice=null
  this.selectedListingOwnerContactReference = null
  this.selectedListingOwnerFirstName = null;
  this.selectedListingOwnerLastName = null;
  this.selectedListingOwnerPersonalMobile = null;
  this.selectedListingOwnerWorkMobile = null;
  this.selectedListingOwnerOtherMobile = null;
  this.selectedListingOwnerPersonalPhone = null;
  this.selectedListingOwnerWorkPhone = null;
  this.selectedListingOwnerOtherPhone = null;
  this.selectedListingOwnerPersonalEmail = null;
  this.selectedListingOwnerWorkEmail = null;
  this.selectedListingOwnerOtherEmail = null;
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
      this.scrollToElement('sec0');
      this.setStatusForm();
      this.setBasicDetailsForm();
      this.setTransactionDetailsForm();
      this.setCommissionDetailsForm();
      this.setAdditionalDetailform();
      this.dropDownService.getDealSubStatusById(1).subscribe((data:any) => {
        this.AllDealSubStatusType = data;
        this.StatusForm.get('subStatusId')?.setValue(3);
  })
    }
    if(data?.EditDeal && data?.Id != undefined && data?.Id != null) {
      this.editDealId = data?.Id
      this.isSave = false;
      this.selectTab('tab1');
      // this.fileInput.nativeElement.value = '';
      
      this.isView = true;
      this.isAdd = false;
      this.isEdit = false;
      this.basic = true;
      this.transaction =true;
      this.commission =true;
      this.additionalDetails  = true;

      //Changes for on load Viewings
      this.DealDetails = null;
      this.tempSelectedListingRef = null;
      this.selectedListingRef = null;
      this.selectedListingpropertyType=null
      this.selectedListingPurpose = null;
this.selectedListingBed=null
this.selectedListingEmirate=null
this.selectedListingLocation=null
this.selectedListingSubLocation=null
this.selectedListingPrice=null
this.selectedListingOwnerContactReference = null;
this.selectedListingOwnerFirstName = null;
this.selectedListingOwnerLastName = null;
this.selectedListingOwnerPersonalMobile = null;
this.selectedListingOwnerWorkMobile = null;
this.selectedListingOwnerOtherMobile = null;
this.selectedListingOwnerPersonalPhone = null;
this.selectedListingOwnerWorkPhone = null;
this.selectedListingOwnerOtherPhone = null;
this.selectedListingOwnerPersonalEmail = null;
this.selectedListingOwnerWorkEmail = null;
this.selectedListingOwnerOtherEmail = null;
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
      this.scrollToElement('sec0');
      this.StatusForm.reset();
      this.BasicDetailsForm.reset();
      this.TransactionDetailsForm.reset();
      this.AdditionalDetailform.reset();
      this.dealsService.GetDealDetailById(data.Id,this.userData.companyId).subscribe((data:any) => {
       this.DealDetails = data;
        this.dropDownService.getDealSubStatusById(data?.statusId).subscribe((value:any) => {
        this.AllDealSubStatusType = value;
          this.StatusForm.controls['subStatusId'].setValue(data?.subStatusId);
          this.cdr.detectChanges()
        })
        this.StatusForm = new FormGroup({
          statusId: new FormControl(data?.statusId),
          subStatusId: new FormControl(data?.subStatusId)
        });
        this.BasicDetailsForm = new FormGroup({
          agentId:new FormControl(data?.assignedToId,[Validators.required]),
          purposeId:new FormControl(data?.purposeId,[Validators.required]),
          transactionTypeId:new FormControl(data?.transactionTypeId),
          sourceId:new FormControl(data?.sourceId),
          estimatedDealDate:new FormControl(data?.estimatedDealDate != null ? moment(data?.estimatedDealDate).format("YYYY-MM-DD"):null),
          actualDealDate:new FormControl(data?.actualDealDate != null ? moment(data?.actualDealDate).format("YYYY-MM-DD"):null),
          listingId:new FormControl(data?.listingId,[Validators.required]),
          leadId: new FormControl(data?.leadId,[Validators.required]),
        })

        this.TransactionDetailsForm = new FormGroup({
          dealPrice:new FormControl(data?.dealPrice),
          includeVAT:new FormControl(data?.includeVAT),
          vatAmount:new FormControl({ value: data?.vatAmount, disabled: true }),
          includeTotal:new FormControl({ value: data?.totalIncludingVAT, disabled: true }),
          deposit:new FormControl(data?.deposit)
        })

        this.CommissionDetailsForm = new FormGroup({
          ownerAgencyFee:new FormControl(data?.ownerAgencyFee),
          leadAgencyFee:new FormControl(data?.leadAgencyFee),
          grossCommission:new FormControl(data?.grossCommission),
          includeCommissionVAT:new FormControl(data?.includeCommissionVAT),
          CommissionVATamount:new FormControl({ value: data?.commissionVATAmount, disabled: true }),
          totalGrossCommission:new FormControl({ value: data?.totalIncludingCommissionVAT, disabled: true }),
          externalRef:new FormControl(data?.externalReferral),
          extRefType: new FormControl(data?.externalReferralTypeId),
          externalReferralName:new FormControl(data?.externalReferralName),
          externalReferralCommission:new FormControl(data?.externalReferralCommissionPct),
          externalReferralCommissionText:new FormControl(data?.externalReferralCommission),
          yourCompanyCommission:new FormControl(data?.yourCompanyCommissionPct),
          yourCompanyCommissionText:new FormControl(data?.yourCompanyCommission),
          agentId: new FormControl(data?.agentId),
          agentCommission: new FormControl(data?.commissionPct),
          agentCommissionText: new FormControl(data?.commission),
        })

        this.AdditionalDetailform = new FormGroup({
          cheques: new FormControl(data?.chequesId),
          tenancyStartDate: new FormControl(data?.tenancyStartDate != null ? moment(data?.tenancyStartDate).format("YYYY-MM-DD"):null),
          tenancyRenewalDate: new FormControl(data?.tenancyRenewalDate != null ? moment(data?.tenancyRenewalDate).format("YYYY-MM-DD"):null),
          reminder:new FormControl(data?.remindId),
          buyerType: new FormControl(data?.buyerTypeId),
          financeType: new FormControl(data?.financeTypeId),
        })
        this.selectedListingId = data?.listingId;
        this.selectedLeadId = data?.leadId;
        this.selectedListingRef = data?.listingReference;
        this.selectedListingpropertyType = data?.propertyType;
        this.selectedListingEmirate = data?.emirate;
        this.selectedListingLocation = data?.location;
        this.selectedListingSubLocation = data?.subLocation;
        this.selectedListingPrice = data?.price;
        this.selectedListingOwnerContactReference = data?.ownerContactReference;
        this.selectedListingOwnerFirstName = data?.ownerFirstname;
        this.selectedListingOwnerLastName = data?.ownerLastname;
        this.selectedListingOwnerPersonalMobile = this.getMobile(1,data?.ownerMobiles) ;
        this.selectedListingOwnerWorkMobile= this.getMobile(2,data?.ownerMobiles);
        this.selectedListingOwnerOtherMobile= this.getMobile(3,data?.ownerMobiles);
        this.selectedListingOwnerPersonalPhone = this.getPhone(1,data?.ownerPhones);
        this.selectedListingOwnerWorkPhone = this.getPhone(2,data?.ownerPhones);;
        this.selectedListingOwnerOtherPhone = this.getPhone(3,data?.ownerPhones);;
        this.selectedListingOwnerPersonalEmail = this.getEmail(1,data?.ownerEmails);
        this.selectedListingOwnerWorkEmail = this.getEmail(2,data?.ownerEmails);
        this.selectedListingOwnerOtherEmail = this.getEmail(3,data?.ownerEmails);
        this.selectedLeadRef = data?.leadReference;
        this.selectedLeadFirstName = data?.leadFirstname;
        this.selectedLeadLastName = data?.leadLastname;
        this.PeronsalMobile = this.getMobile(1,data?.leadMobiles) ;
        this.WorkMobile= this.getMobile(2,data?.leadMobiles);
        this.OtherMobile= this.getMobile(3,data?.leadMobiles);
        this.PersonalPhone = this.getPhone(1,data?.leadPhones);
        this.WorkPhone = this.getPhone(2,data?.leadPhones);
        this.OtherPhone = this.getPhone(3,data?.leadPhones);
        this.PersonalEmail = this.getEmail(1,data?.leadEmails);
        this.WorkEmail = this.getEmail(2,data?.leadEmails);
        this.OtherEmail = this.getEmail(3,data?.leadEmails);
        this.cdr.detectChanges();
        this.StatusForm.disable();
      this.BasicDetailsForm.disable();
      this.CommissionDetailsForm.disable();
      this.TransactionDetailsForm.disable();
      this.AdditionalDetailform.disable();
      this.getDealNotesByDealId(this.editDealId);
      this.IsLoading = false;
      this.cdr.detectChanges();
      })
      
    }
  });
  this.getDropDownList();
  this.setInitalDealNotesForm();
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
}

getDropDownList(){
  this.getDealStatus();
  this.getAllAssignedTo();
  // this.getAllDealType();
  this.getAllDealTransactionType();
  this.getAllSourceofListing();
  this.getAllDealPurpose();
  this.getAllCheques();
  this.getAllDealBuyerType();
  this.getAllDealFinanceType();
  this.getReminderList();
  this.getExternalReferralTypeList();
}

getExternalReferralTypeList() {
  this.dropDownService.getExternalReferralType().subscribe((data: any) => {
    this.ExternalReferralTypeList = data;
  });
}

getAllDealBuyerType() {
  this.dropDownService.getAllDealBuyerType().subscribe((data: any) => {
    this.BuyerTypeList = data;
  });
}

getAllDealFinanceType() {
  this.dropDownService.getAllDealFinanceType().subscribe((data: any) => {
    this.FinanceTypeList = data;
  });
}

getAllCheques() {
  this.listingSevice.getCheques().subscribe((data: any | undefined) => {
    this.AllCheques = data;
  });
}

getDealStatus() {
  this.dropDownService.getDealStatus().subscribe((data: any) => {
    this.AllDealStatusType = data;
  });
}

  getDealSubStatusById(id:any){
    this.dropDownService.getDealSubStatusById(id).subscribe((data: any) => {
      this.AllDealSubStatusType = data;
    });
  }

getAllAssignedTo() {
  this.dropDownService.getAssignedToListByCompanyAndRole(this.userData.companyId,this.userData.roleId,this.userData.id).subscribe((data: any) => {
    this.AgentLeadList = data?.map((x:any) => ({
      ...x,
      profileImage: x.profileImage != null && x.profileImage != '' ? environment.imgUrl + x.profileImage : null
    }));;
  });
}

getAllDealType(){
  this.dropDownService.getAllDealType().subscribe((data: any) => {
    this.purposeList = data;
  });
}

getAllDealTransactionType(){
  this.dropDownService.getAllDealTransactionType().subscribe((data: any) => {
    this.TransactionTypeList = data;
  });
}

getAllSourceofListing() {
  this.dropDownService.getContactSourceList().subscribe((data: any) => {
    this.AllSourceList = data;
  });
}

getAllDealPurpose() {
  this.listingSevice.getPurpose().subscribe((data: any) => {
    this.AllDealPurposeList = data;
  });
}

getReminderList() {
  this.dropDownService.getDealReminderList().subscribe((data: any) => {
    this.ReminderList = data;
  });
}

setStatusForm(){
this.StatusForm = new FormGroup({
  statusId:new FormControl(1),
  subStatusId:new FormControl(null)
})
}

setBasicDetailsForm(){
this.BasicDetailsForm = new FormGroup({
  agentId:new FormControl(null,[Validators.required]),
  purposeId:new FormControl(null,[Validators.required]),
  transactionTypeId:new FormControl(null),
  sourceId:new FormControl(null),
  estimatedDealDate:new FormControl(),
  actualDealDate:new FormControl(),
  listingId:new FormControl(null,[Validators.required]),
  leadId: new FormControl(null,[Validators.required]),
})
}

setTransactionDetailsForm(){
  this.TransactionDetailsForm = new FormGroup({
    dealPrice:new FormControl(),
    includeVAT:new FormControl(false),
    vatAmount:new FormControl({ value: null, disabled: true }),
    includeTotal:new FormControl({ value: null, disabled: true }),
    deposit:new FormControl()
  })
}

setCommissionDetailsForm(){
  this.CommissionDetailsForm = new FormGroup({
    ownerAgencyFee:new FormControl(),
    leadAgencyFee:new FormControl(),
    grossCommission:new FormControl(),
    includeCommissionVAT:new FormControl(false),
    CommissionVATamount:new FormControl({ value: null, disabled: true }),
    totalGrossCommission:new FormControl({ value: null, disabled: true }),
    externalRef:new FormControl(),
    extRefType: new FormControl(),
    externalReferralName:new FormControl(null),
    externalReferralCommission:new FormControl(),
    externalReferralCommissionText:new FormControl(null),
    yourCompanyCommission:new FormControl(),
    yourCompanyCommissionText:new FormControl(null),
    agentId: new FormControl(null),
    agentCommission: new FormControl(),
    agentCommissionText: new FormControl(null),
  })
}

setAdditionalDetailform() {
  this.AdditionalDetailform = new FormGroup({
    cheques: new FormControl(),
    tenancyStartDate: new FormControl(),
    tenancyRenewalDate: new FormControl(),
    reminder:new FormControl(),
    buyerType: new FormControl(),
    financeType: new FormControl(),
  })
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

get assignedto() {
  return this.BasicDetailsForm.get('agentId')!;
}

get purpose() {
  return this.BasicDetailsForm.get('purposeId')!;
}

get listingId() {
  return this.BasicDetailsForm.get('listingId')!;
}

get leadId() {
  return this.BasicDetailsForm.get('leadId')!;
}

onChangeStatus(value:any) {
  this.StatusForm.get('subStatusId')?.setValue(null);
  this.dropDownService.getDealSubStatusById(value).subscribe((data:any) => {
    this.AllDealSubStatusType = data;
    if(value == 2) {
      this.StatusForm.get('subStatusId')?.setValue(6);
    }
    if(value == 1) {
      this.StatusForm.get('subStatusId')?.setValue(3);
    }
  })
}

onChangeDealPrice(data:any) {
  var dealPrice = data.target.value;
  if(dealPrice == undefined || dealPrice == null || dealPrice == "") {
    this.TransactionDetailsForm.controls['vatAmount']?.setValue(null);
    this.TransactionDetailsForm.controls['includeTotal']?.setValue(null);
  }
  else {
  var isIncludeVAT = this.TransactionDetailsForm.get('includeVAT')?.value;
  if(isIncludeVAT) {
    var VATAmount = (dealPrice * 0.05).toFixed(2);
    var TotalVATAmount = (Number(VATAmount) + Number(dealPrice)).toFixed(2);
    this.TransactionDetailsForm.get('vatAmount')?.setValue(VATAmount);
    this.TransactionDetailsForm.get('includeTotal')?.setValue(TotalVATAmount);
  }
  else {
    this.TransactionDetailsForm.get('vatAmount')?.setValue(null);
    this.TransactionDetailsForm.get('includeTotal')?.setValue(null);
  }
}
}

onChangeIncludeVAT(event:any) {
  if(event.target.checked) {
    var DealPrice = this.TransactionDetailsForm.get('dealPrice')?.value;
    if(DealPrice != undefined && DealPrice != null && DealPrice != '') {
      var VATAmount = (DealPrice * 0.05).toFixed(2);
      var TotalVATAmount = (Number(VATAmount) + Number(DealPrice)).toFixed(2);
      this.TransactionDetailsForm.get('vatAmount')?.setValue(VATAmount);
      this.TransactionDetailsForm.get('includeTotal')?.setValue(TotalVATAmount);
    }
    else {
      this.TransactionDetailsForm.get('vatAmount')?.setValue(null);
      this.TransactionDetailsForm.get('includeTotal')?.setValue(null);
    }
  }
  else {
    this.TransactionDetailsForm.get('vatAmount')?.setValue(null);
    this.TransactionDetailsForm.get('includeTotal')?.setValue(null);
  }
}

onChangeGrossCommission(data:any) {
  var grossCommission = data.target.value;
  if(grossCommission == undefined || grossCommission == null || grossCommission == "") {
    this.CommissionDetailsForm.controls['CommissionVATamount']?.setValue(null);
    this.CommissionDetailsForm.controls['totalGrossCommission']?.setValue(null);
    this.CommissionDetailsForm.controls['externalReferralCommissionText'].setValue(null);
  this.CommissionDetailsForm.controls['externalReferralCommission'].setValue(null);  
  this.CommissionDetailsForm.controls['yourCompanyCommissionText'].setValue(null);
  this.CommissionDetailsForm.controls['yourCompanyCommission'].setValue(null);
  this.CommissionDetailsForm.controls['agentCommission'].setValue(null);
  this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
  }
  else {
  var isIncludeVAT = this.CommissionDetailsForm.get('includeCommissionVAT')?.value;
  if(isIncludeVAT) {
    var VATAmount = (grossCommission * 0.05).toFixed(2);
    var TotalVATAmount = (Number(VATAmount) + Number(grossCommission)).toFixed(2);
    this.CommissionDetailsForm.get('CommissionVATamount')?.setValue(VATAmount);
    this.CommissionDetailsForm.get('totalGrossCommission')?.setValue(TotalVATAmount);
  }
  else {
    this.CommissionDetailsForm.get('CommissionVATamount')?.setValue(null);
    this.CommissionDetailsForm.get('totalGrossCommission')?.setValue(null);
  }

  var isexternalRef = this.CommissionDetailsForm.get('externalRef')?.value;
  if(isexternalRef) {
    var percentageexternalRef = this.CommissionDetailsForm.get('externalReferralCommission')?.value;
    if(percentageexternalRef != undefined && percentageexternalRef != null && percentageexternalRef != '') {
      var numberexternalRef = Number(grossCommission * percentageexternalRef * 0.01).toFixed(2);
      this.CommissionDetailsForm.controls['externalReferralCommissionText'].setValue(numberexternalRef);
    } 
    else {
      this.CommissionDetailsForm.controls['externalReferralCommissionText'].setValue(null);
    }

    var percentagecompanyCommission = this.CommissionDetailsForm.get('yourCompanyCommission')?.value;
    if(percentagecompanyCommission != undefined && percentagecompanyCommission != null && percentagecompanyCommission != '') {
      var numbercompanyCommission = Number(grossCommission * percentagecompanyCommission * 0.01).toFixed(2);
      this.CommissionDetailsForm.controls['yourCompanyCommissionText'].setValue(numbercompanyCommission);

      var percentageAgentCommission = this.CommissionDetailsForm.get('agentCommission')?.value;
      var numberCompanyCommissionText = this.CommissionDetailsForm.get('yourCompanyCommissionText')?.value;
      if(percentageAgentCommission != undefined && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != '') {
        var numberagentCommission = Number(percentageAgentCommission * numberCompanyCommissionText * 0.01).toFixed(2);
        this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberagentCommission);
      }
      else {
        this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
      }
    } 
    else {
      this.CommissionDetailsForm.controls['yourCompanyCommissionText'].setValue(null);

    var percentageAgentCommission = this.CommissionDetailsForm.get('agentCommission')?.value;
    var numbergrossCommissionText = this.CommissionDetailsForm.get('grossCommission')?.value;
    if(percentageAgentCommission != undefined && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != '') {
      var numberagentCommission = Number(percentageAgentCommission * numbergrossCommissionText * 0.01).toFixed(2);
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberagentCommission);
    }
    else {
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
    }
    }
  }
  else {
    var percentageAgentCommission = this.CommissionDetailsForm.get('agentCommission')?.value;
    var numbergrossCommissionText = this.CommissionDetailsForm.get('grossCommission')?.value;
    if(percentageAgentCommission != undefined && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != '') {
      var numberagentCommission = Number(percentageAgentCommission * numbergrossCommissionText * 0.01).toFixed(2);
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberagentCommission);
    }
    else {
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
    }
  }

  
}
}

onChangeIncludeCommissionVAT(event:any) {
  if(event.target.checked) {
    var grossCommission = this.CommissionDetailsForm.get('grossCommission')?.value;
    if(grossCommission != undefined && grossCommission != null && grossCommission != '') {
      var VATAmount = (grossCommission * 0.05).toFixed(2);
      var TotalVATAmount = (Number(VATAmount) + Number(grossCommission)).toFixed(2);
      this.CommissionDetailsForm.get('CommissionVATamount')?.setValue(VATAmount);
      this.CommissionDetailsForm.get('totalGrossCommission')?.setValue(TotalVATAmount);
    }
    else {
      this.CommissionDetailsForm.get('CommissionVATamount')?.setValue(null);
      this.CommissionDetailsForm.get('totalGrossCommission')?.setValue(null);
    }
  }
  else {
    this.CommissionDetailsForm.get('CommissionVATamount')?.setValue(null);
    this.CommissionDetailsForm.get('totalGrossCommission')?.setValue(null);
  }
}

onChangeExternalReferral(event:any) {
  this.CommissionDetailsForm.controls['externalReferralCommissionText'].setValue(null);
  this.CommissionDetailsForm.controls['externalReferralCommission'].setValue(null);  
  this.CommissionDetailsForm.controls['yourCompanyCommissionText'].setValue(null);
  this.CommissionDetailsForm.controls['yourCompanyCommission'].setValue(null);

  if(event.target.checked == false) {
    var grossCommission = this.CommissionDetailsForm.get('grossCommission')?.value;
    if(grossCommission != undefined && grossCommission != null && grossCommission != '') {
      var percentageAgentCommission = this.CommissionDetailsForm.get('agentCommission')?.value;
      if(percentageAgentCommission != undefined && percentageAgentCommission != null  && percentageAgentCommission != '') {
        var numberagentCommission = Number(percentageAgentCommission * grossCommission * 0.01).toFixed(2);
        this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberagentCommission);
      }
      else {
        this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
      }
    }
    else {
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
    }
  }
}

changePercentageexternalReferralCommission(data:any) {
  var percentage = data.target.value;
  var grossCommission = this.CommissionDetailsForm.get('grossCommission')?.value;
  if(percentage != undefined && percentage != null && percentage != '') {
  if(grossCommission != undefined && grossCommission != null && grossCommission != '') {
    var numberExRefCommission = Number(grossCommission * percentage * 0.01).toFixed(2);
    this.CommissionDetailsForm.controls['externalReferralCommissionText'].setValue(numberExRefCommission);
  }
  else {
    this.CommissionDetailsForm.controls['externalReferralCommissionText'].setValue(null);
  }
}
else {
  this.CommissionDetailsForm.controls['externalReferralCommissionText'].setValue(null);
}
}


changeTextexternalReferralCommission(data:any) {
  var number = data.target.value;
  var grossCommission = this.CommissionDetailsForm.get('grossCommission')?.value; 
  if(number != undefined && number != null && number != '') {
  if(grossCommission != undefined && grossCommission != null && grossCommission != '') { 
    var percentageExRefCommission = Number(number/(grossCommission * 0.01)).toFixed(2);
    this.CommissionDetailsForm.controls['externalReferralCommission'].setValue(percentageExRefCommission);
  }
  else {
    this.CommissionDetailsForm.controls['externalReferralCommission'].setValue(null);
  }
}
else {
  this.CommissionDetailsForm.controls['externalReferralCommission'].setValue(null);
}
}

changePercentagecompanyCommission(data:any) {
  var percentage = data.target.value;
  var grossCommission = this.CommissionDetailsForm.get('grossCommission')?.value;
  if(percentage != undefined && percentage != null && percentage != '') {
  if(grossCommission != undefined && grossCommission != null && grossCommission != '') {
    var numberExRefCommission = Number(grossCommission * percentage * 0.01).toFixed(2);
    this.CommissionDetailsForm.controls['yourCompanyCommissionText'].setValue(numberExRefCommission);

    var percentageAgentCommission = this.CommissionDetailsForm.get('agentCommission')?.value;
    var numberCompanyCommissionText = this.CommissionDetailsForm.get('yourCompanyCommissionText')?.value;
    if(percentageAgentCommission != undefined && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != '') {
      var numberagentCommission = Number(percentageAgentCommission * numberCompanyCommissionText * 0.01).toFixed(2);
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberagentCommission);
    }
    else {
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
    }
  }
  else {
    this.CommissionDetailsForm.controls['yourCompanyCommissionText'].setValue(null);

    var percentageAgentCommission = this.CommissionDetailsForm.get('agentCommission')?.value;
    var numbergrossCommissionText = this.CommissionDetailsForm.get('grossCommission')?.value;
    if(percentageAgentCommission != undefined && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != '') {
      var numberagentCommission = Number(percentageAgentCommission * numbergrossCommissionText * 0.01).toFixed(2);
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberagentCommission);
    }
    else {
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
    }
  }
}
else {
  this.CommissionDetailsForm.controls['yourCompanyCommissionText'].setValue(null);

  var percentageAgentCommission = this.CommissionDetailsForm.get('agentCommission')?.value;
    var numbergrossCommissionText = this.CommissionDetailsForm.get('grossCommission')?.value;
    if(percentageAgentCommission != undefined && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != '') {
      var numberagentCommission = Number(percentageAgentCommission * numbergrossCommissionText * 0.01).toFixed(2);
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberagentCommission);
    }
    else {
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
    }
}
}

changeTextcompanyCommission(data:any) {
  var number = data.target.value;
  var grossCommission = this.CommissionDetailsForm.get('grossCommission')?.value; 
  if(number != undefined && number != null && number != '') {
  if(grossCommission != undefined && grossCommission != null && grossCommission != '') { 
    var percentageExRefCommission = Number(number/(grossCommission * 0.01)).toFixed(2);
    this.CommissionDetailsForm.controls['yourCompanyCommission'].setValue(percentageExRefCommission);

    var percentageAgentCommission = this.CommissionDetailsForm.get('agentCommission')?.value;
    var numberCompanyCommissionText = this.CommissionDetailsForm.get('yourCompanyCommissionText')?.value;
    if(percentageAgentCommission != undefined && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != '') {
      var numberagentCommission = Number(percentageAgentCommission * numberCompanyCommissionText * 0.01).toFixed(2);
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberagentCommission);
    }
    else {
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);

      var percentageAgentCommission = this.CommissionDetailsForm.get('agentCommission')?.value;
    var numbergrossCommissionText = this.CommissionDetailsForm.get('grossCommission')?.value;
    if(percentageAgentCommission != undefined && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != '') {
      var numberagentCommission = Number(percentageAgentCommission * numbergrossCommissionText * 0.01).toFixed(2);
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberagentCommission);
    }
    else {
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
    }
    }
  }
  else {
    this.CommissionDetailsForm.controls['yourCompanyCommission'].setValue(null);

    var percentageAgentCommission = this.CommissionDetailsForm.get('agentCommission')?.value;
    var numbergrossCommissionText = this.CommissionDetailsForm.get('grossCommission')?.value;
    if(percentageAgentCommission != undefined && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != null && percentageAgentCommission != '') {
      var numberagentCommission = Number(percentageAgentCommission * numbergrossCommissionText * 0.01).toFixed(2);
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberagentCommission);
    }
    else {
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
    }
  }
}
else {
  this.CommissionDetailsForm.controls['yourCompanyCommission'].setValue(null);

  var percentageAgentCommission = this.CommissionDetailsForm.get('agentCommission')?.value;
  var numbergrossCommissionText = this.CommissionDetailsForm.get('grossCommission')?.value;
  if(percentageAgentCommission != undefined && percentageAgentCommission != null && percentageAgentCommission != '') {
    var numberagentCommission = Number(percentageAgentCommission * numbergrossCommissionText * 0.01).toFixed(2);
    this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberagentCommission);
  }
  else {
    this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
  }
}
}

changePercentageagentCommission(data:any) {
  var percentage = data.target.value;
  var companyCommission = this.CommissionDetailsForm.get('yourCompanyCommissionText')?.value;
  if(percentage != undefined && percentage != null && percentage != '') {
  if(companyCommission != undefined && companyCommission != null && companyCommission != '') {
    var numberExRefCommission = Number(companyCommission * percentage * 0.01).toFixed(2);
    this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberExRefCommission);
  }
  else {
    this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
    var grossCommission = this.CommissionDetailsForm.get('grossCommission')?.value;
    if(grossCommission != undefined && grossCommission != null && grossCommission != '') {
      var numberExRefCommission = Number(grossCommission * percentage * 0.01).toFixed(2);
    this.CommissionDetailsForm.controls['agentCommissionText'].setValue(numberExRefCommission);
    }
    else {
      this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
    }
  }
}
else {
  this.CommissionDetailsForm.controls['agentCommissionText'].setValue(null);
}
}

changeTextagentCommission(data:any) {
  var number = data.target.value;
  var companyCommission = this.CommissionDetailsForm.get('yourCompanyCommission')?.value; 
  if(number != undefined && number != null && number != '') {
  if(companyCommission != undefined && companyCommission != null && companyCommission != '') { 
    var percentageExRefCommission = Number(number/(companyCommission * 0.01)).toFixed(2);
    this.CommissionDetailsForm.controls['agentCommission'].setValue(percentageExRefCommission);
  }
  else {
    this.CommissionDetailsForm.controls['agentCommission'].setValue(null);

    var grossCommission = this.CommissionDetailsForm.get('grossCommission')?.value;
    if(grossCommission != undefined && grossCommission != null && grossCommission != '') {
      var numberExRefCommission = Number(number/(grossCommission * 0.01)).toFixed(2);
    this.CommissionDetailsForm.controls['agentCommission'].setValue(numberExRefCommission);
    }
    else {
      this.CommissionDetailsForm.controls['agentCommission'].setValue(null);
    }
  }
}
else {
  this.CommissionDetailsForm.controls['agentCommission'].setValue(null);
}
}

changePurpose(data:any) {
  if(data == 1) {
    this.AdditionalDetailform.controls['cheques'].setValue(null);
    this.AdditionalDetailform.controls['tenancyStartDate'].setValue(null);
    this.AdditionalDetailform.controls['tenancyRenewalDate'].setValue(null);
    this.AdditionalDetailform.controls['reminder'].setValue(null);
  }
  if(data == 2) {
    this.AdditionalDetailform.controls['buyerType'].setValue(null);
    this.AdditionalDetailform.controls['financeType'].setValue(null);
  }
}

onEdit() {
  this.isEdit = true;
  this.isAdd = false;
  this.isView = false;
  this.StatusForm.enable();
  this.BasicDetailsForm.enable();
  this.TransactionDetailsForm.enable();
  this.CommissionDetailsForm.enable();
  this.AdditionalDetailform.enable();

  this.TransactionDetailsForm.get('vatAmount')?.disable();
  this.TransactionDetailsForm.get('includeTotal')?.disable();
  this.CommissionDetailsForm.get('CommissionVATamount')?.disable();
  this.CommissionDetailsForm.get('totalGrossCommission')?.disable();
}

onSubmit() {
  this.isSave = true;
  if(this.BasicDetailsForm.invalid) {
    this.scrollToElement('sec1');
    return ;
  }

  if(this.TransactionDetailsForm.invalid) {
    this.scrollToElement('sec2');
    return ;
  }

  if(this.CommissionDetailsForm.invalid) {
    this.scrollToElement('sec3');
    return ;
  }

  if(this.AdditionalDetailform.invalid) {
    this.scrollToElement('sec4');
    return ;
  }

  if(this.isAdd && !this.isEdit) {
    this.dealsService.InsertDealDetails({
      statusId: this.StatusForm.get('statusId')?.value,
      subStatusId:this.StatusForm.get('subStatusId')?.value,
      assignedToId: this.BasicDetailsForm.get('agentId')?.value,
      purposeId:this.BasicDetailsForm.get('purposeId')?.value,
      transactionTypeId:this.BasicDetailsForm.get('transactionTypeId')?.value,
      listingId:this.BasicDetailsForm.get('listingId')?.value,
      leadId:this.BasicDetailsForm.get('leadId')?.value,
      sourceId:this.BasicDetailsForm.get('sourceId')?.value,
      estimatedDealDate:this.BasicDetailsForm.get('estimatedDealDate')?.value,
      actualDealDate:this.BasicDetailsForm.get('actualDealDate')?.value,
      dealPrice:this.TransactionDetailsForm.get('dealPrice')?.value,
      includeVAT:this.TransactionDetailsForm.get('includeVAT')?.value == null ? false : this.TransactionDetailsForm.get('includeVAT')?.value,
      vatAmount:this.TransactionDetailsForm.get('vatAmount')?.value,
      totalIncludingVAT:this.TransactionDetailsForm.get('includeTotal')?.value,
      deposit:this.TransactionDetailsForm.get('deposit')?.value,
      ownerAgencyFee: this.CommissionDetailsForm.get('ownerAgencyFee')?.value,
      leadAgencyFee: this.CommissionDetailsForm.get('leadAgencyFee')?.value,
      grossCommission: this.CommissionDetailsForm.get('grossCommission')?.value,
      includeCommissionVAT:this.CommissionDetailsForm.get('includeCommissionVAT')?.value == null ? false : this.CommissionDetailsForm.get('includeCommissionVAT')?.value,
      commissionVATAmount:this.CommissionDetailsForm.get('CommissionVATamount')?.value,
      totalIncludingCommissionVAT : this.CommissionDetailsForm.get('totalGrossCommission')?.value,
      externalReferral:this.CommissionDetailsForm.get('externalRef')?.value == null ? false : this.CommissionDetailsForm.get('externalRef')?.value,
      externalReferralTypeId:this.CommissionDetailsForm.get('extRefType')?.value,
      externalReferralName:this.CommissionDetailsForm.get('externalReferralName')?.value,
      externalReferralCommissionPct:this.CommissionDetailsForm.get('externalReferralCommission')?.value,
      externalReferralCommission:this.CommissionDetailsForm.get('externalReferralCommissionText')?.value,
      yourCompanyCommissionPct:this.CommissionDetailsForm.get('yourCompanyCommission')?.value,
      yourCompanyCommission:this.CommissionDetailsForm.get('yourCompanyCommissionText')?.value,
      agentId: this.CommissionDetailsForm.get('agentId')?.value,
      commissionPct:this.CommissionDetailsForm.get('agentCommission')?.value,
      commission:this.CommissionDetailsForm.get('agentCommissionText')?.value,
      chequesId:this.AdditionalDetailform.get('cheques')?.value,
      tenancyStartDate:this.AdditionalDetailform.get('tenancyStartDate')?.value,
      tenancyRenewalDate:this.AdditionalDetailform.get('tenancyRenewalDate')?.value,
      remindId:this.AdditionalDetailform.get('reminder')?.value,
      buyerTypeId:this.AdditionalDetailform.get('buyerType')?.value,
      financeTypeId:this.AdditionalDetailform.get('financeType')?.value,
      createdBy:this.userData.id,
      updatedBy:this.userData.id,
      companyId: this.userData.companyId
    }).subscribe((data:any) => {
      
      this.toastr.success("Deal added succesfully");
      document?.getElementById('kt_deals-details_close')?.click();
      //this.IsLoading = false;
      this.dealsService.OpenListDeal(true);

    })
    
    }

    if(this.isEdit && !this.isAdd) {
      this.dealsService.EditDealDetails({
        id: this.editDealId,
        statusId: this.StatusForm.get('statusId')?.value,
        subStatusId:this.StatusForm.get('subStatusId')?.value,
        assignedToId: this.BasicDetailsForm.get('agentId')?.value,
        purposeId:this.BasicDetailsForm.get('purposeId')?.value,
        transactionTypeId:this.BasicDetailsForm.get('transactionTypeId')?.value,
        listingId:this.BasicDetailsForm.get('listingId')?.value,
        leadId:this.BasicDetailsForm.get('leadId')?.value,
        sourceId:this.BasicDetailsForm.get('sourceId')?.value,
        estimatedDealDate:this.BasicDetailsForm.get('estimatedDealDate')?.value,
        actualDealDate:this.BasicDetailsForm.get('actualDealDate')?.value,
        dealPrice:this.TransactionDetailsForm.get('dealPrice')?.value,
        includeVAT:this.TransactionDetailsForm.get('includeVAT')?.value == null ? false : this.TransactionDetailsForm.get('includeVAT')?.value,
        vatAmount:this.TransactionDetailsForm.get('vatAmount')?.value,
        totalIncludingVAT:this.TransactionDetailsForm.get('includeTotal')?.value,
        deposit:this.TransactionDetailsForm.get('deposit')?.value,
        ownerAgencyFee: this.CommissionDetailsForm.get('ownerAgencyFee')?.value,
        leadAgencyFee: this.CommissionDetailsForm.get('leadAgencyFee')?.value,
        grossCommission: this.CommissionDetailsForm.get('grossCommission')?.value,
        includeCommissionVAT:this.CommissionDetailsForm.get('includeCommissionVAT')?.value == null ? false : this.CommissionDetailsForm.get('includeCommissionVAT')?.value,
        commissionVATAmount:this.CommissionDetailsForm.get('CommissionVATamount')?.value,
        totalIncludingCommissionVAT : this.CommissionDetailsForm.get('totalGrossCommission')?.value,
        externalReferral:this.CommissionDetailsForm.get('externalRef')?.value == null ? false : this.CommissionDetailsForm.get('externalRef')?.value,
        externalReferralTypeId:this.CommissionDetailsForm.get('extRefType')?.value,
        externalReferralName:this.CommissionDetailsForm.get('externalReferralName')?.value,
        externalReferralCommissionPct:this.CommissionDetailsForm.get('externalReferralCommission')?.value,
        externalReferralCommission:this.CommissionDetailsForm.get('externalReferralCommissionText')?.value,
        yourCompanyCommissionPct:this.CommissionDetailsForm.get('yourCompanyCommission')?.value,
        yourCompanyCommission:this.CommissionDetailsForm.get('yourCompanyCommissionText')?.value,
        agentId: this.CommissionDetailsForm.get('agentId')?.value,
        commissionPct:this.CommissionDetailsForm.get('agentCommission')?.value,
        commission:this.CommissionDetailsForm.get('agentCommissionText')?.value,
        chequesId:this.AdditionalDetailform.get('cheques')?.value,
        tenancyStartDate:this.AdditionalDetailform.get('tenancyStartDate')?.value,
        tenancyRenewalDate:this.AdditionalDetailform.get('tenancyRenewalDate')?.value,
        remindId:this.AdditionalDetailform.get('reminder')?.value,
        buyerTypeId:this.AdditionalDetailform.get('buyerType')?.value,
        financeTypeId:this.AdditionalDetailform.get('financeType')?.value,
        updatedBy:this.userData.id,
        companyId: this.userData.companyId
      }).subscribe((data:any) => {
        
        this.toastr.success("Deal updated succesfully");
        document?.getElementById('kt_deals-details_close')?.click();
        //this.IsLoading = false;
        this.dealsService.OpenListDeal(true);
  
      })
    }
}

onCancel() {
  this.isView = true;
  this.isAdd = false;
  this.isEdit = false;
  this.basic = true;
  this.transaction = true;
  this.commission = true;
  this.additionalDetails = true;
  this.IsLoading = true;
  this.scrollToElement('sec0');
  this.dealsService.GetDealDetailById(this.editDealId,this.userData.companyId).subscribe((data:any) => {
   this.DealDetails = data;
    this.dropDownService.getDealSubStatusById(data?.statusId).subscribe((value:any) => {
    this.AllDealSubStatusType = value;
      this.StatusForm.controls['subStatusId'].setValue(data?.subStatusId);
      this.cdr.detectChanges()
    })
    this.StatusForm = new FormGroup({
      statusId: new FormControl(data?.statusId),
      subStatusId: new FormControl(data?.subStatusId)
    });
    this.BasicDetailsForm = new FormGroup({
      agentId:new FormControl(data?.assignedToId,[Validators.required]),
      purposeId:new FormControl(data?.purposeId,[Validators.required]),
      transactionTypeId:new FormControl(data?.transactionTypeId),
      sourceId:new FormControl(data?.sourceId),
      estimatedDealDate:new FormControl(data?.estimatedDealDate != null ? moment(data?.estimatedDealDate).format("YYYY-MM-DD"):null),
      actualDealDate:new FormControl(data?.actualDealDate != null ? moment(data?.actualDealDate).format("YYYY-MM-DD"):null),
      listingId:new FormControl(data?.listingId,[Validators.required]),
      leadId: new FormControl(data?.leadId,[Validators.required]),
    })

    this.TransactionDetailsForm = new FormGroup({
      dealPrice:new FormControl(data?.dealPrice),
      includeVAT:new FormControl(data?.includeVAT),
      vatAmount:new FormControl({ value: data?.vatAmount, disabled: true }),
      includeTotal:new FormControl({ value: data?.totalIncludingVAT, disabled: true }),
      deposit:new FormControl(data?.deposit)
    })

    this.CommissionDetailsForm = new FormGroup({
      ownerAgencyFee:new FormControl(data?.ownerAgencyFee),
      leadAgencyFee:new FormControl(data?.leadAgencyFee),
      grossCommission:new FormControl(data?.grossCommission),
      includeCommissionVAT:new FormControl(data?.includeCommissionVAT),
      CommissionVATamount:new FormControl({ value: data?.commissionVATAmount, disabled: true }),
      totalGrossCommission:new FormControl({ value: data?.totalIncludingCommissionVAT, disabled: true }),
      externalRef:new FormControl(data?.externalReferral),
      extRefType: new FormControl(data?.externalReferralTypeId),
      externalReferralName:new FormControl(data?.externalReferralName),
      externalReferralCommission:new FormControl(data?.externalReferralCommissionPct),
      externalReferralCommissionText:new FormControl(data?.externalReferralCommission),
      yourCompanyCommission:new FormControl(data?.yourCompanyCommissionPct),
      yourCompanyCommissionText:new FormControl(data?.yourCompanyCommission),
      agentId: new FormControl(data?.agentId),
      agentCommission: new FormControl(data?.commissionPct),
      agentCommissionText: new FormControl(data?.commission),
    })

    this.AdditionalDetailform = new FormGroup({
      cheques: new FormControl(data?.chequesId),
      tenancyStartDate: new FormControl(data?.tenancyStartDate != null ? moment(data?.tenancyStartDate).format("YYYY-MM-DD"):null),
      tenancyRenewalDate: new FormControl(data?.tenancyRenewalDate != null ? moment(data?.tenancyRenewalDate).format("YYYY-MM-DD"):null),
      reminder:new FormControl(data?.remindId),
      buyerType: new FormControl(data?.buyerTypeId),
      financeType: new FormControl(data?.financeTypeId),
    })

    this.selectedListingId = data?.listingId;
        this.selectedLeadId = data?.leadId;
        this.selectedListingRef = data?.listingReference;
        this.selectedListingpropertyType = data?.propertyType;
        this.selectedListingEmirate = data?.emirate;
        this.selectedListingLocation = data?.location;
        this.selectedListingSubLocation = data?.subLocation;
        this.selectedListingPrice = data?.price;
        this.selectedListingOwnerContactReference = data?.ownerContactReference;
        this.selectedListingOwnerFirstName = data?.ownerFirstname;
        this.selectedListingOwnerLastName = data?.ownerLastname;
        this.selectedListingOwnerPersonalMobile = this.getMobile(1,data?.ownerMobiles) ;
        this.selectedListingOwnerWorkMobile= this.getMobile(2,data?.ownerMobiles);
        this.selectedListingOwnerOtherMobile= this.getMobile(3,data?.ownerMobiles);
        this.selectedListingOwnerPersonalPhone = this.getPhone(1,data?.ownerPhones);
        this.selectedListingOwnerWorkPhone = this.getPhone(2,data?.ownerPhones);;
        this.selectedListingOwnerOtherPhone = this.getPhone(3,data?.ownerPhones);;
        this.selectedListingOwnerPersonalEmail = this.getEmail(1,data?.ownerEmails);
        this.selectedListingOwnerWorkEmail = this.getEmail(2,data?.ownerEmails);
        this.selectedListingOwnerOtherEmail = this.getEmail(3,data?.ownerEmails);
        this.selectedLeadRef = data?.leadReference;
        this.selectedLeadFirstName = data?.leadFirstname;
        this.selectedLeadLastName = data?.leadLastname;
        this.PeronsalMobile = this.getMobile(1,data?.leadMobiles) ;
        this.WorkMobile= this.getMobile(2,data?.leadMobiles);
        this.OtherMobile= this.getMobile(3,data?.leadMobiles);
        this.PersonalPhone = this.getPhone(1,data?.leadPhones);
        this.WorkPhone = this.getPhone(2,data?.leadPhones);
        this.OtherPhone = this.getPhone(3,data?.leadPhones);
        this.PersonalEmail = this.getEmail(1,data?.leadEmails);
        this.WorkEmail = this.getEmail(2,data?.leadEmails);
        this.OtherEmail = this.getEmail(3,data?.leadEmails);
    
    this.StatusForm.disable();
  this.BasicDetailsForm.disable();
  this.CommissionDetailsForm.disable();
  this.TransactionDetailsForm.disable();
  this.AdditionalDetailform.disable();
  this.IsLoading = false;
  this.cdr.detectChanges();
  })
}

selectTab(tab:any) {
  this.selectedTab = tab;
  if(tab == 'tab2') {
    this.isSaveNotes = false;
    this.setInitalDealNotesForm();
    this.cdr.detectChanges();
  }
}

closeDeals() {
  this.dealsService.openDrawer(false);
  this.dealsService.SelectDealId(0);
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
    createdUser:new FormControl(this.userData.id),
    roleId: new FormControl(this.userData.roleId),
    userId: new FormControl(this.userData.id)
  });

  var listingTypeControl = this.form.get('listingType');
  if (listingTypeControl) {
    listingTypeControl.setValue(this.userData.id);
  }

  //this.form.controls['listingType'].setValue('1');
}

dropDownList(){
  this.getAllViewingStatus();
  this.getAllAssignedTo();
  this.getAllCategory();
  this.getPurpose();
  this.getAllLocation();
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
          this.updateXML();
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
          
          this.updateXML();
        },
        (error) => {
          
        }
      );
    }
  
    updateXML() {
      // this.listingSevice.InsertXMlFeesListing(0,0,0).subscribe(
      //   (data: any) => {
      //     console.log('xml', data);
      //   },
      //   (error) => {
      //     console.log('xml', error);
      //   }
      // );
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
      this.dropDownService.getAssignedToListByCompanyAndRole(this.userData.companyId,this.userData.roleId,this.userData.id).subscribe((data: any | undefined) => {
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
      this.listingSevice
        .GetAllUser()
        .subscribe((data: any | undefined) => {
          this.userCreateByList = data;
          this.userUpdatedByList = data;
        });
    }
    
    onSelectListingId(ListingData:any) {
      this.tempSelectedListingRef = ListingData;
    }

    
  saveListing() {
    if(this.tempSelectedListingRef != null) {
      this.selectedListingId = this.tempSelectedListingRef.id;
      var listingId = this.selectedListingId
      this.BasicDetailsForm.controls['listingId'].setValue(listingId);
      this.selectedListingRef = this.tempSelectedListingRef.reference;
      this.selectedListingpropertyType= this.tempSelectedListingRef.propertytypeName
      this.selectedListingPurpose = this.tempSelectedListingRef.purposeName
  this.selectedListingBed=this.tempSelectedListingRef.bedsName
  this.selectedListingEmirate=this.tempSelectedListingRef.emiratesName
  this.selectedListingLocation=this.tempSelectedListingRef.locationName
  this.selectedListingSubLocation=this.tempSelectedListingRef.subLocationName
  this.selectedListingPrice=this.tempSelectedListingRef.price
  this.selectedListingOwnerContactReference = this.tempSelectedListingRef.ownerContactReference
  this.selectedListingOwnerFirstName = this.tempSelectedListingRef.ownerFirstname
  this.selectedListingOwnerLastName = this.tempSelectedListingRef.ownerLastname


  this.selectedListingOwnerPersonalMobile = this.getMobile(1,this.tempSelectedListingRef.ownerMobiles) 
  this.selectedListingOwnerWorkMobile = this.getMobile(2,this.tempSelectedListingRef.ownerMobiles) 
  this.selectedListingOwnerOtherMobile = this.getMobile(3,this.tempSelectedListingRef.ownerMobiles) 
  this.selectedListingOwnerPersonalPhone = this.getPhone(1,this.tempSelectedListingRef.ownerPhones)
  this.selectedListingOwnerWorkPhone = this.getPhone(2,this.tempSelectedListingRef.ownerPhones)
  this.selectedListingOwnerOtherPhone = this.getPhone(1,this.tempSelectedListingRef.ownerPhones)
  this.selectedListingOwnerPersonalEmail = this.getEmail(1,this.tempSelectedListingRef.ownerEmails)
  this.selectedListingOwnerWorkEmail = this.getEmail(2,this.tempSelectedListingRef.ownerEmails)
  this.selectedListingOwnerOtherEmail = this.getEmail(3,this.tempSelectedListingRef.ownerEmails)
    }
    this.ViewList.close(this.modalConfig);
  }

  closeListing() {
    this.ViewList.close(this.modalConfig);
  }

  getAllViewingStatus(){
        this.leadsService.getAllViewingStatus().subscribe((data:any) => {
          this.AllViewingStatus = data;
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

    openListingModal() {
    return new Promise<boolean>((resolve) => {
      this.ViewList = this.modalService.open(this.modalContentViewingList, {
        size: 'xl',
      });
      this.ViewList.result.then(resolve, resolve);
    });
  }

    closeViewList() {
    this.ViewList.close(this.modalConfig);
  }

  openLeadModal() {
    return new Promise<boolean>((resolve) => {
      this.ViewLead = this.modalService.open(this.modalContentViewingLead, {
        size: 'xl',
      });
      this.ViewLead.result.then(resolve, resolve);
    });
  }

  closeViewLead() {
    this.ViewLead.close(this.modalConfig);
  }

  onSelectLeadId(leadData:any) {
    this.tempSelectedLeadRef = leadData;
  }

  openListingorLeadErrorModal() {
    return new Promise<boolean>((resolve) => {
      this.ViewList = this.modalService.open(this.modalContentViewingList, {
        size: 'xl',
      });
      this.ViewList.result.then(resolve, resolve);
    });
  }

  saveLead() {
    if(this.tempSelectedLeadRef != null) {
      this.selectedLeadId = this.tempSelectedLeadRef.id;
      var leadId = this.selectedLeadId
      this.BasicDetailsForm.controls['leadId'].setValue(leadId);
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

setInitalDealNotesForm() {
  this.DealNotesForm = new FormGroup({ 
    Notes: new FormControl(null,Validators.required)
  })
}

SaveDealNotes() {
  this.isSaveNotes = true;
  if (!this.DealNotesForm.valid) {
    return;
  }
  else {
    this.dealsService
      .InsertDealNotes({
        dealId: this.editDealId,
        notes: this.DealNotesForm.get('Notes')?.value,
        createdBy:this.userData.id,
        updatedBy:this.userData.id,
        companyId: this.userData.companyId
      })
      .subscribe((data: any) => {
        if(data?.status == 200) {
        // this.UploadProfilePhoto(data?.message);
        this.isSaveNotes = false;
        this.setInitalDealNotesForm();
        this.cdr.detectChanges();
        this.getDealNotesByDealId(this.editDealId);
        this.toastr.success('Notes added successfully');
        }
        else {
          this.toastr.error("Something went wrong");
        }
      });
  }
}

getDealNotesByDealId(dealId:any) {
  this.dealsService.GetDealNotes(dealId).subscribe((data:any) => {
    this.DealNotes = data;
    this.cdr.detectChanges();
  })
}

get Notes() {
  return this.DealNotesForm.get('Notes')!;
}


}
