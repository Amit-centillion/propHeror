import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { Environment } from 'prismjs';
import { ModalConfig } from 'src/app/_metronic/partials';
import { AuthService } from 'src/app/modules/auth';
import { DealsService } from 'src/app/modules/auth/services/deals.service';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { LeadsService } from 'src/app/modules/auth/services/leads.service';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-deals-table',
  templateUrl: './deals-table.component.html',
  styleUrls: ['./deals-table.component.scss']
})
export class DealsTableComponent {
  isSelectAllDeals:boolean = false;
  exportDealId:any = [];
  selectedDealId:number = 0;
  searchDealsForm:FormGroup;
  advanceSearchDealsForm: FormGroup;
  IsLoading:boolean = false;
  DealDetailsList:any = [];
  totalRecord:number = 0;
  pageNumber:number = 1;
  pageSize:number = 25;
  sortColumn:any = 'Updated';
  sortDir:Boolean = true;
  StatusList:any =[];
  SubStatusList:any = [];
  AssignedToList:any = [];
  PurposeList:any = [];
  TransactionTypeLIst:any = [];
  sourceList :any = [];
  AgentList:any = []
  ChequeList:any = [];
  reminderList:any = [];
  buyerTypeList:any = [];
  fincanceTypeList:any = [];
  userList:any =[];
  SourceList:any = [];
  PropertyTypeList:any = [];
  BedsList:any = [];
  EmirateList:any = [];
  LocationList:any = [];
  SubLocationList:any = [];
  isFilterRef:boolean = false;
  isListingRef:boolean = false;
  isminListingPrice:boolean = false;
  ismaxListingPrice:boolean = false;
  isListingContactRef:boolean = false;
  isListingOwnerFirstName:boolean = false;
  isListingOwnerLastName:boolean = false;
  isOwnerPersonalMobile:boolean = false;
  isOwnerWorkMobile:boolean = false;
  isOwnerOtherMobile:boolean = false
  isOwnerPersonalPhone:boolean = false;
  isOwnerWorkPhone:boolean = false;
  isOwnerOtherPhone:boolean = false;
  isOwnerPersonalEmail:boolean = false;
  isOwnerWorkEmail:boolean = false;
  isOwnerOtherEmail:boolean = false;
  isLeadRef:boolean = false;
  isLeadFirstName:boolean = false;
  isLeadLastName:boolean = false;
  LeadPersonalMobile:boolean = false;
  isLeadWorkMobile:boolean = false;
  isLeadOtherMobile:boolean = false;
  isLeadPersonalPhone:boolean = false;
  isLeadWorkPhone:boolean = false;
  isLeadOtherPhone:boolean = false;
  isLeadPersonalEmail: boolean = false;
  isLeadWorkEmail:boolean = false;
  isLeadOtherEmail:boolean = false;
  isminDealPrice:boolean = false;
  ismaxDealPrice:boolean = false;
  isVATAmount:boolean = false;
  isminTotalVATPrice:boolean = false;
  ismaxTotalVATPrice: boolean = false;
  isDeposit: boolean = false;
  isminOwnerAgencyFee:boolean = false;
  ismaxOwnerAgencyFee:boolean = false;
  isminLeadAgencyFee: boolean = false;
  ismaxLeadAgencyFee: boolean = false;
  isminGrossCommission:boolean = false;
  ismaxGrossCommission: boolean = false;
  isCommissionVATAmount: boolean = false;
  ismintotalcommissionVATAmount:boolean = false;
  ismaxtotalcommissionVATAmount: boolean = false;
  isExternalReferralName:boolean = false;
  isminExternalReferralCommisionPer: boolean = false;
  ismaxExternalReferralCommisionPer: boolean = false;
  isminExternalReferralCommisionAmount: boolean = false;
  ismaxExternalReferralCommisionAmount: boolean = false;
  isminYourCompanyCommisionPer: boolean = false;
  ismaxYourCompanyCommisionPer: boolean = false;
  minYourCompanyCommisionAmount: boolean = false;
  ismaxYourCompanyCommisionAmount: boolean = false;
  isminCommisionPer : boolean = false;
  ismaxCommisionPer: boolean = false;
  isminCommisionAmount: boolean = false;
  ismaxCommisionAmount: boolean = false;
  userData:any;
  companySettings:any;
  isDraweropen:boolean = false;
  imgUrl = environment.imgUrl; 
  @ViewChild('advanceSearch') private modalContent: TemplateRef<DealsTableComponent>;
  @Input() public modalConfig: ModalConfig;
  private modalRef: NgbModalRef;

  columnOrder:any=[];
  DeafultcolumnOrder:any = [
    {
      column: 'Reference',
      isVisible: true
    },
    {
      column: 'Status',
      isVisible: true
    }, {
      column: 'Sub Status',
      isVisible: true,
    },
    {
      column: 'Assigned To',
      isVisible: true,
    },
    {
      column: 'Purpose',
      isVisible: true,
    },
    {
      column: 'Transaction Type',
      isVisible: true,
    },
    {
      column: 'Listing Reference',
      isVisible: true,
    },
    {
      column: 'Property Type',
      isVisible: true,
    }, 
    {
      column: 'Beds',
      isVisible: true,
    },
    {
      column: 'Emirate',
      isVisible:true,
    }, 
    {
      column: 'Location',
      isVisible: true,
    },
    {
      column: 'Sub Location',
      isVisible: true,
    },
    {
      column: 'Price',
      isVisible: true,
    },
    {
      column: 'Owner Contact Reference',
      isVisible: true,
    },
    {
      column: 'Owner First Name',
      isVisible: true
    }, 
    {
      column: 'Owner Last Name',
      isVisible: true,
    }, 
    {
      column: 'Owner Personal Mobile',
      isVisible: true,
    },
    {
      column: 'Owner Work Mobile',
      isVisible: true,
    },
    {
      column: 'Owner Other Mobile',
      isVisible: true,
    },
    {
      column: 'Owner Personal Phone',
      isVisible: true,
    },
    {
      column: 'Owner Work Phone',
      isVisible: true,
    },
    {
      column: 'Owner Other Phone',
      isVisible: true,
    },
    {
      column: 'Owner Personal Email',
      isVisible: true,
    },
    {
      column: 'Owner Work Email',
      isVisible: true,
    },
    {
      column: 'Owner Other Email',
      isVisible: true,
    },
    {
      column: 'Lead Reference',
      isVisible: true,
    },
    {
      column: 'Buyer/Tenant First Name',
      isVisible: true,
    },
    {
      column: 'Buyer/Tenant Last Name',
      isVisible: true,
    },
    {
      column: 'Buyer/Tenant Personal Mobile',
      isVisible: true,
    },
    {
      column: 'Buyer/Tenant Work Mobile',
      isVisible: true,
    },
    {
      column: 'Buyer/Tenant Other Mobile',
      isVisible: true,
    },
    {
      column: 'Buyer/Tenant Personal Phone',
      isVisible: true,
    },
    {
      column: 'Buyer/Tenant Work Phone',
      isVisible: true,
    },
    {
      column: 'Buyer/Tenant Other Phone',
      isVisible: true,
    },
    {
      column: 'Buyer/Tenant Personal Email',
      isVisible: true,
    },
    {
      column: 'Buyer/Tenant Work Email',
      isVisible: true,
    },
    {
      column: 'Buyer/Tenant Other Email',
      isVisible: true,
    },
    {
      column: 'Source',
      isVisible: true,
    },
    {
      column: 'Estimated Deal Date',
      isVisible: true,
    },
    {
      column: 'Actual Deal Date',
      isVisible: true,
    },
    {
      column: 'Deal Price',
      isVisible: true,
    },
    {
      column: 'Include VAT',
      isVisible: true,
    },
    {
      column: 'VAT Amount',
      isVisible: true,
    },
    {
      column: 'Total (inc. VAT)',
      isVisible: true,
    },
    {
      column: 'Deposit',
      isVisible: true,
    },
    {
      column: 'Owner Agency Fee',
      isVisible: true,
    },
    {
      column: 'Lead Agency Fee',
      isVisible: true,
    },
    {
      column: 'Gross Commission',
      isVisible: true,
    },
    {
      column: 'Include Commission VAT',
      isVisible: true,
    },
    {
      column: 'Commission VAT Amount',
      isVisible: true,
    },
    {
      column: 'Total (inc. Commission VAT)',
      isVisible: true,
    },
    {
      column: 'External Referral',
      isVisible: true,
    },
    {
      column: 'External Referral Type',
      isVisible: true,
    },
    {
      column: 'Exteranl Referral Name',
      isVisible: true,
    },
    {
      column: 'External Referral Commission %',
      isVisible: true,
    },
    {
      column: 'External Referral Commission Amount',
      isVisible: true,
    },
    {
      column: 'Your Company Commission %',
      isVisible: true,
    },
    {
      column: 'Your Company Commission Amount',
      isVisible: true,
    },
    {
      column: 'Agent',
      isVisible: true,
    },
    {
      column: 'Commission %',
      isVisible: true,
    },
    {
      column: 'Commission Amount',
      isVisible: true,
    },
    {
      column: 'Cheques',
      isVisible: true,
    },
    {
      column: 'Tenancy Start Date',
      isVisible: true,
    },
    {
      column: 'Tenancy Renewal Date',
      isVisible: true,
    },
    {
      column: 'Reminder',
      isVisible: true,
    },
    {
      column: 'Buyer Type',
      isVisible: true,
    },
    {
      column: 'Finance Type',
      isVisible: true,
    },
    {
      column: 'Created',
      isVisible: true,
    },
    {
      column: 'Created By',
      isVisible: true,
    },
    {
      column: 'Updated',
      isVisible: true,
    },
    {
      column: 'Updated By',
      isVisible: true,
    },
  ]
  tempcolumnOrder:any;
  @ViewChild('columnSettingmodal') private modalcolumnContent: TemplateRef<DealsTableComponent>;
  private modalColumnRef: NgbModalRef;
  
  constructor(private dealsService : DealsService,private leadsService: LeadsService,private cdr:ChangeDetectorRef,private modalService: NgbModal,private dropDownService: DropdownService,private listingSevice:ListingService,
    private authService: AuthService,private modalColumnService: NgbModal) {

  }

  data:any = {
    'AddDeal':true,
    'EditDeal':false,
    'Id':0
  };
  isAddDealPermission:boolean = false;


  isDateSelected: boolean[] = new Array(12).fill(false);

  onDateSelected(event: Event, index: number): void {
    console.log(event, index);
    const inputElement = event.target as HTMLInputElement;

    // Check if a date is selected by verifying that the input's value is not empty
    this.isDateSelected[index] = inputElement.value !== '';
  }


  ngOnInit() {
    var uData = this.authService.userValue;
    if(uData != null){
    this.userData= JSON.parse(uData);
    this.isAddDealPermission = this.userData.permissionAccess.filter((x:any) => x.permissionId == 12).length > 0;
    }
    this.dealsService.IsOpenDrawer.subscribe((x:any) => {
      if(x != null) {
        this.isDraweropen = x;
      }
    })
    this.authService.companySetting.subscribe((data:any) => {
      this.companySettings = data;
    })
    this.getDropdownList();
  this.setSearchDealForm();
  this.setAdvanceSearchDealForm();
  this.getColumnOrder();
  // this.getAllDeals();
  this.dealsService.isOpenListDeal.subscribe(data => {
    if(data) {
      this.pageNumber = 1
      this.pageSize = 25;
      this.sortColumn = 'Updated';
      this.sortDir = true;
      //this.searchContactForm.reset();
      this.searchDeals();
    }
  })
  this.dealsService.SelectedDealId.subscribe((data:any) => {
    this.selectedDealId = data;
    this.DealDetailsList = this.DealDetailsList.map((x:any) => ({
      ...x,
      isSelected: false
    }));
  } )
  }

  getAllDeals() {
    this.IsLoading = true;
    this.dealsService.GetAllDeals({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortColumn: this.sortColumn,
      sortDir: this.sortDir,
      filterRef: this.searchDealsForm.get('filterRef')?.value,
      filterStatus: this.searchDealsForm.get('filterStatus')?.value,
      filterSubStatus: this.searchDealsForm.get('filterSubStatus')?.value,
      filterAssignedTo: this.searchDealsForm.get('filterAssignedTo')?.value,
      filterPurpose: this.searchDealsForm.get('filterPurpose')?.value,
      filterTransaction: this.searchDealsForm.get('filterTransaction')?.value,
      filterSource: this.searchDealsForm.get('filterSource')?.value,
      filterEstimatedDealDateFrom: this.searchDealsForm.get('filterEstimatedDealDateFrom')?.value,
      filterEstimatedDealDateTo: this.searchDealsForm.get('filterEstimatedDealDateTo')?.value,
      filterActualDealDateFrom: this.searchDealsForm.get('filterActualDealDateFrom')?.value,
      filterActualDealDateTo: this.searchDealsForm.get('filterActualDealDateTo')?.value,
      minDealPrice: this.searchDealsForm.get('minDealPrice')?.value,
      maxDealPrice: this.searchDealsForm.get('maxDealPrice')?.value,
      filterIncludeVAT: this.searchDealsForm.get('filterIncludeVAT')?.value,
      filterVATAmount: this.searchDealsForm.get('filterVATAmount')?.value,
      minTotalVATPrice: this.searchDealsForm.get('minTotalVATPrice')?.value,
      maxTotalVATPrice: this.searchDealsForm.get('maxTotalVATPrice')?.value,
      filterDeposit: this.searchDealsForm.get('filterDeposit')?.value,
      minOwnerAgencyFee: this.searchDealsForm.get('minOwnerAgencyFee')?.value,
      maxOwnerAgencyFee: this.searchDealsForm.get('maxOwnerAgencyFee')?.value,
      minLeadAgencyFee: this.searchDealsForm.get('minLeadAgencyFee')?.value,
      maxLeadAgencyFee: this.searchDealsForm.get('maxLeadAgencyFee')?.value,
      minGrossCommission: this.searchDealsForm.get('minGrossCommission')?.value,
      maxGrossCommission: this.searchDealsForm.get('maxGrossCommission')?.value,
      filterIncludeCommissionVAT: this.searchDealsForm.get('filterIncludeCommissionVAT')?.value,
      filterCommissionVATAmount: this.searchDealsForm.get('filterCommissionVATAmount')?.value,
      mintotalcommissionVATAmount: this.searchDealsForm.get('mintotalcommissionVATAmount')?.value,
      maxtotalcommissionVATAmount: this.searchDealsForm.get('maxtotalcommissionVATAmount')?.value,
      filterExternalReferral: this.searchDealsForm.get('filterExternalReferral')?.value,
      filterExternalReferralType: this.searchDealsForm.get('filterExternalReferralType')?.value,
      filterExternalReferralName: this.searchDealsForm.get('filterExternalReferralName')?.value,
      minExternalReferralCommisionPer: this.searchDealsForm.get('minExternalReferralCommisionPer')?.value,
      maxExternalReferralCommisionPer: this.searchDealsForm.get('maxExternalReferralCommisionPer')?.value,
      minExternalReferralCommisionAmount: this.searchDealsForm.get('minExternalReferralCommisionAmount')?.value,
      maxExternalReferralCommisionAmount: this.searchDealsForm.get('maxExternalReferralCommisionAmount')?.value,
      minYourCompanyCommisionPer: this.searchDealsForm.get('minYourCompanyCommisionPer')?.value,
      maxYourCompanyCommisionPer: this.searchDealsForm.get('maxYourCompanyCommisionPer')?.value,
      minYourCompanyCommisionAmount: this.searchDealsForm.get('minYourCompanyCommisionAmount')?.value,
      maxYourCompanyCommisionAmount: this.searchDealsForm.get('maxYourCompanyCommisionAmount')?.value,
      filterAgent: this.searchDealsForm.get('filterAgent')?.value,
      minCommisionPer: this.searchDealsForm.get('minCommisionPer')?.value,
      maxCommisionPer: this.searchDealsForm.get('maxCommisionPer')?.value,
      minCommisionAmount: this.searchDealsForm.get('minCommisionAmount')?.value,
      maxCommisionAmount: this.searchDealsForm.get('maxCommisionAmount')?.value,
      filterCheque: this.searchDealsForm.get('filterCheque')?.value,
      filterTenancyStartDateFrom: this.searchDealsForm.get('filterTenancyStartDateFrom')?.value,
      filterTenancyStartDateTo: this.searchDealsForm.get('filterTenancyStartDateTo')?.value,
      filterTenancyRenewalDateFrom: this.searchDealsForm.get('filterTenancyRenewalDateFrom')?.value,
      filterTenancyRenewalDateTo: this.searchDealsForm.get('filterTenancyRenewalDateTo')?.value,
      filterReminder: this.searchDealsForm.get('filterReminder')?.value,
      filterBuyerType: this.searchDealsForm.get('filterBuyerType')?.value,
      filterFinanceType: this.searchDealsForm.get('filterFinanceType')?.value,
      filterCreatedBy: this.searchDealsForm.get('filterCreatedBy')?.value,
  filterUpdatedBy: this.searchDealsForm.get('filterUpdatedBy')?.value,
  filterCreatedFrom: this.searchDealsForm.get('filterCreatedFrom')?.value,
  filterCreatedTo: this.searchDealsForm.get('filterCreatedTo')?.value,
  filterUpdatedFrom: this.searchDealsForm.get('filterUpdatedFrom')?.value,
  filterUpdatedTo: this.searchDealsForm.get('filterUpdatedTo')?.value,
  filterListingRef: this.searchDealsForm.get('filterListingRef')?.value,
  filterListingPropertyType: this.searchDealsForm.get('filterListingPropertyType')?.value,
  filterListingBeds: this.searchDealsForm.get('filterListingBeds')?.value,
  filterListingEmirate: this.searchDealsForm.get('filterListingEmirate')?.value,
  filterListingLocation: this.searchDealsForm.get('filterListingLocation')?.value,
  filterListingSubLocation: this.searchDealsForm.get('filterListingSubLocation')?.value,
  minListingPrice: this.searchDealsForm.get('minListingPrice')?.value,
  maxListingPrice: this.searchDealsForm.get('maxListingPrice')?.value,
  filterListingContactRef: this.searchDealsForm.get('filterListingContactRef')?.value,
  filterListingOwnerFirstName: this.searchDealsForm.get('filterListingOwnerFirstName')?.value,
  filterListingOwnerLastName: this.searchDealsForm.get('filterListingOwnerLastName')?.value,
  filterOwnerPersonalMobile: this.searchDealsForm.get('filterOwnerPersonalMobile')?.value,
  filterOwnerWorkMobile: this.searchDealsForm.get('filterOwnerWorkMobile')?.value,
  filterOwnerOtherMobile: this.searchDealsForm.get('filterOwnerOtherMobile')?.value,
  filterOwnerPersonalPhone: this.searchDealsForm.get('filterOwnerPersonalPhone')?.value,
  filterOwnerWorkPhone: this.searchDealsForm.get('filterOwnerWorkPhone')?.value,
  filterOwnerOtherPhone: this.searchDealsForm.get('filterOwnerOtherPhone')?.value,
  filterOwnerPersonalEmail: this.searchDealsForm.get('filterOwnerPersonalEmail')?.value,
  filterOwnerWorkEmail: this.searchDealsForm.get('filterOwnerWorkEmail')?.value,
  filterOwnerOtherEmail: this.searchDealsForm.get('filterOwnerOtherEmail')?.value,
  filterLeadRef: this.searchDealsForm.get('filterLeadRef')?.value,
  filterLeadFirstName: this.searchDealsForm.get('filterLeadFirstName')?.value,
  filterLeadLastName: this.searchDealsForm.get('filterLeadLastName')?.value,
  filterLeadPersonalMobile: this.searchDealsForm.get('filterLeadPersonalMobile')?.value,
  filterLeadWorkMobile: this.searchDealsForm.get('filterLeadWorkMobile')?.value,
  filterLeadOtherMobile: this.searchDealsForm.get('filterLeadOtherMobile')?.value,
  filterLeadPersonalPhone: this.searchDealsForm.get('filterLeadPersonalPhone')?.value,
  filterLeadWorkPhone: this.searchDealsForm.get('filterLeadWorkPhone')?.value,
  filterLeadOtherPhone: this.searchDealsForm.get('filterLeadOtherPhone')?.value,
  filterLeadPersonalEmail: this.searchDealsForm.get('filterLeadPersonalEmail')?.value,
  filterLeadWorkEmail: this.searchDealsForm.get('filterLeadWorkEmail')?.value,
  filterLeadOtherEmail: this.searchDealsForm.get('filterLeadOtherEmail')?.value,
  companyId: this.userData.companyId,
  roleId: this.userData.roleId,
  userId: this.userData.id
    }).subscribe((data:any) => {
       this.IsLoading = false;
        this.DealDetailsList = data;
        if(this.DealDetailsList.length > 0) {
        this.totalRecord = this.DealDetailsList[0].totalCount;
        }
        else {
          this.totalRecord = 0;
        }
        this.cdr.detectChanges();
    })
  }

  searchDeals() {
    this.IsLoading = true;
    this.dealsService.GetAllDeals({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortColumn: this.sortColumn,
      sortDir: this.sortDir,
      filterRef: this.searchDealsForm.get('filterRef')?.value,
      filterStatus: this.searchDealsForm.get('filterStatus')?.value,
      filterSubStatus: this.searchDealsForm.get('filterSubStatus')?.value,
      filterAssignedTo: this.searchDealsForm.get('filterAssignedTo')?.value,
      filterPurpose: this.searchDealsForm.get('filterPurpose')?.value,
      filterTransaction: this.searchDealsForm.get('filterTransaction')?.value,
      filterSource: this.searchDealsForm.get('filterSource')?.value,
      filterEstimatedDealDateFrom: this.searchDealsForm.get('filterEstimatedDealDateFrom')?.value,
      filterEstimatedDealDateTo: this.searchDealsForm.get('filterEstimatedDealDateTo')?.value,
      filterActualDealDateFrom: this.searchDealsForm.get('filterActualDealDateFrom')?.value,
      filterActualDealDateTo: this.searchDealsForm.get('filterActualDealDateTo')?.value,
      minDealPrice: this.searchDealsForm.get('minDealPrice')?.value,
      maxDealPrice: this.searchDealsForm.get('maxDealPrice')?.value,
      filterIncludeVAT: this.searchDealsForm.get('filterIncludeVAT')?.value,
      filterVATAmount: this.searchDealsForm.get('filterVATAmount')?.value,
      minTotalVATPrice: this.searchDealsForm.get('minTotalVATPrice')?.value,
      maxTotalVATPrice: this.searchDealsForm.get('maxTotalVATPrice')?.value,
      filterDeposit: this.searchDealsForm.get('filterDeposit')?.value,
      minOwnerAgencyFee: this.searchDealsForm.get('minOwnerAgencyFee')?.value,
      maxOwnerAgencyFee: this.searchDealsForm.get('maxOwnerAgencyFee')?.value,
      minLeadAgencyFee: this.searchDealsForm.get('minLeadAgencyFee')?.value,
      maxLeadAgencyFee: this.searchDealsForm.get('maxLeadAgencyFee')?.value,
      minGrossCommission: this.searchDealsForm.get('minGrossCommission')?.value,
      maxGrossCommission: this.searchDealsForm.get('maxGrossCommission')?.value,
      filterIncludeCommissionVAT: this.searchDealsForm.get('filterIncludeCommissionVAT')?.value,
      filterCommissionVATAmount: this.searchDealsForm.get('filterCommissionVATAmount')?.value,
      mintotalcommissionVATAmount: this.searchDealsForm.get('mintotalcommissionVATAmount')?.value,
      maxtotalcommissionVATAmount: this.searchDealsForm.get('maxtotalcommissionVATAmount')?.value,
      filterExternalReferral: this.searchDealsForm.get('filterExternalReferral')?.value,
      filterExternalReferralType: this.searchDealsForm.get('filterExternalReferralType')?.value,
      filterExternalReferralName: this.searchDealsForm.get('filterExternalReferralName')?.value,
      minExternalReferralCommisionPer: this.searchDealsForm.get('minExternalReferralCommisionPer')?.value,
      maxExternalReferralCommisionPer: this.searchDealsForm.get('maxExternalReferralCommisionPer')?.value,
      minExternalReferralCommisionAmount: this.searchDealsForm.get('minExternalReferralCommisionAmount')?.value,
      maxExternalReferralCommisionAmount: this.searchDealsForm.get('maxExternalReferralCommisionAmount')?.value,
      minYourCompanyCommisionPer: this.searchDealsForm.get('minYourCompanyCommisionPer')?.value,
      maxYourCompanyCommisionPer: this.searchDealsForm.get('maxYourCompanyCommisionPer')?.value,
      minYourCompanyCommisionAmount: this.searchDealsForm.get('minYourCompanyCommisionAmount')?.value,
      maxYourCompanyCommisionAmount: this.searchDealsForm.get('maxYourCompanyCommisionAmount')?.value,
      filterAgent: this.searchDealsForm.get('filterAgent')?.value,
      minCommisionPer: this.searchDealsForm.get('minCommisionPer')?.value,
      maxCommisionPer: this.searchDealsForm.get('maxCommisionPer')?.value,
      minCommisionAmount: this.searchDealsForm.get('minCommisionAmount')?.value,
      maxCommisionAmount: this.searchDealsForm.get('maxCommisionAmount')?.value,
      filterCheque: this.searchDealsForm.get('filterCheque')?.value,
      filterTenancyStartDateFrom: this.searchDealsForm.get('filterTenancyStartDateFrom')?.value,
      filterTenancyStartDateTo: this.searchDealsForm.get('filterTenancyStartDateTo')?.value,
      filterTenancyRenewalDateFrom: this.searchDealsForm.get('filterTenancyRenewalDateFrom')?.value,
      filterTenancyRenewalDateTo: this.searchDealsForm.get('filterTenancyRenewalDateTo')?.value,
      filterReminder: this.searchDealsForm.get('filterReminder')?.value,
      filterBuyerType: this.searchDealsForm.get('filterBuyerType')?.value,
      filterFinanceType: this.searchDealsForm.get('filterFinanceType')?.value,
      filterCreatedBy: this.searchDealsForm.get('filterCreatedBy')?.value,
  filterUpdatedBy: this.searchDealsForm.get('filterUpdatedBy')?.value,
  filterCreatedFrom: this.searchDealsForm.get('filterCreatedFrom')?.value,
  filterCreatedTo: this.searchDealsForm.get('filterCreatedTo')?.value,
  filterUpdatedFrom: this.searchDealsForm.get('filterUpdatedFrom')?.value,
  filterUpdatedTo: this.searchDealsForm.get('filterUpdatedTo')?.value,
  filterListingRef: this.searchDealsForm.get('filterListingRef')?.value,
  filterListingPropertyType: this.searchDealsForm.get('filterListingPropertyType')?.value,
  filterListingBeds: this.searchDealsForm.get('filterListingBeds')?.value,
  filterListingEmirate: this.searchDealsForm.get('filterListingEmirate')?.value,
  filterListingLocation: this.searchDealsForm.get('filterListingLocation')?.value,
  filterListingSubLocation: this.searchDealsForm.get('filterListingSubLocation')?.value,
  minListingPrice: this.searchDealsForm.get('minListingPrice')?.value,
  maxListingPrice: this.searchDealsForm.get('maxListingPrice')?.value,
  filterListingContactRef: this.searchDealsForm.get('filterListingContactRef')?.value,
  filterListingOwnerFirstName: this.searchDealsForm.get('filterListingOwnerFirstName')?.value,
  filterListingOwnerLastName: this.searchDealsForm.get('filterListingOwnerLastName')?.value,
  filterOwnerPersonalMobile: this.searchDealsForm.get('filterOwnerPersonalMobile')?.value,
  filterOwnerWorkMobile: this.searchDealsForm.get('filterOwnerWorkMobile')?.value,
  filterOwnerOtherMobile: this.searchDealsForm.get('filterOwnerOtherMobile')?.value,
  filterOwnerPersonalPhone: this.searchDealsForm.get('filterOwnerPersonalPhone')?.value,
  filterOwnerWorkPhone: this.searchDealsForm.get('filterOwnerWorkPhone')?.value,
  filterOwnerOtherPhone: this.searchDealsForm.get('filterOwnerOtherPhone')?.value,
  filterOwnerPersonalEmail: this.searchDealsForm.get('filterOwnerPersonalEmail')?.value,
  filterOwnerWorkEmail: this.searchDealsForm.get('filterOwnerWorkEmail')?.value,
  filterOwnerOtherEmail: this.searchDealsForm.get('filterOwnerOtherEmail')?.value,
  filterLeadRef: this.searchDealsForm.get('filterLeadRef')?.value,
  filterLeadFirstName: this.searchDealsForm.get('filterLeadFirstName')?.value,
  filterLeadLastName: this.searchDealsForm.get('filterLeadLastName')?.value,
  filterLeadPersonalMobile: this.searchDealsForm.get('filterLeadPersonalMobile')?.value,
  filterLeadWorkMobile: this.searchDealsForm.get('filterLeadWorkMobile')?.value,
  filterLeadOtherMobile: this.searchDealsForm.get('filterLeadOtherMobile')?.value,
  filterLeadPersonalPhone: this.searchDealsForm.get('filterLeadPersonalPhone')?.value,
  filterLeadWorkPhone: this.searchDealsForm.get('filterLeadWorkPhone')?.value,
  filterLeadOtherPhone: this.searchDealsForm.get('filterLeadOtherPhone')?.value,
  filterLeadPersonalEmail: this.searchDealsForm.get('filterLeadPersonalEmail')?.value,
  filterLeadWorkEmail: this.searchDealsForm.get('filterLeadWorkEmail')?.value,
  filterLeadOtherEmail: this.searchDealsForm.get('filterLeadOtherEmail')?.value,
  companyId: this.userData.companyId,
  roleId: this.userData.roleId,
  userId: this.userData.id
    }).subscribe((data:any) => {
       this.IsLoading = false;
        this.DealDetailsList = data;
        if(this.DealDetailsList.length > 0) {
        this.totalRecord = this.DealDetailsList[0].totalCount;
        }
        else {
          this.totalRecord = 0;
        }
        this.cdr.detectChanges();
    })
  }

  getDropdownList() {
    this.getDealStatusList();
    this.getDealSubStatusList();
    this.getAssignedToList();
    this.getPurposeList();
    this.getTransactionTypeList();
    this.getPropertyTypeList();
    this.getBedsList();
    this.getEmiratesList();
    this.getLocationList();
    this.getSubLocationLIst();
    this.getSourceList();
    this.getAgentList();
    this.getChequesList();
    this.getReminderList();
    this.getBuyerTypeList();
    this.getFinanceTypeList();
    this.getUserList();
  }

  getDealStatusList() {
    this.dropDownService.getDealStatus().subscribe((data: any) => {
      this.StatusList = data;
    });
  }

  getDealSubStatusList() {
    this.dropDownService.getDealSubStatus().subscribe((data: any) => {
      this.SubStatusList = data;
    });
  }

  getAssignedToList() {
    this.dropDownService.getAssignedToListByCompanyAndRole(this.userData.companyId,this.userData.roleId,this.userData.id).subscribe((data: any) => {
      this.AssignedToList = data;
      this.AgentList = data;
    });
  }

  getPurposeList() {
    this.listingSevice.getPurpose().subscribe((data: any) => {
      this.PurposeList = data;
    });
  }

  getTransactionTypeList() {
    this.dropDownService.getAllDealTransactionType().subscribe((data: any) => {
      this.TransactionTypeLIst = data;
    });
  }

  getPropertyTypeList() {
    this.listingSevice.GetPropertyType().subscribe((data: any | undefined) => {
      this.PropertyTypeList = data;
    });
  }

  getBedsList() {
    this.listingSevice.getBeds().subscribe((data: any | undefined) => {
      this.BedsList = data;
    });
  }

  getEmiratesList() {
    this.listingSevice.getEmirates().subscribe((data: any | undefined) => {
      this.EmirateList = data;
    });
  }

  getLocationList() {
    this.listingSevice.getLocation().subscribe((data: any | undefined) => {
      this.LocationList = data;
    });
  }

  getSubLocationLIst() {
    this.listingSevice
    .GetAllSubLocation()
    .subscribe((data: any | undefined) => {
      this.SubLocationList = data;
    });
  }

  getSourceList() {
    this.dropDownService.getContactSourceList().subscribe((data: any) => {
      this.SourceList = data;
    });
  }

  getAgentList() {

  }

  getChequesList() {
    this.listingSevice.getCheques().subscribe((data: any | undefined) => {
      this.ChequeList = data;
    });
  }

  getReminderList() {
    this.dropDownService.getDealReminderList().subscribe((data: any) => {
      this.reminderList = data;
    });
  }

  getBuyerTypeList() {
    this.dropDownService.getAllDealBuyerType().subscribe((data: any) => {
      this.buyerTypeList = data;
    });
  }

  getFinanceTypeList() {
    this.dropDownService.getAllDealFinanceType().subscribe((data: any) => {
      this.fincanceTypeList = data;
    });
  }

  getUserList() {
    this.dropDownService
    .GetAllUserByCompany(this.userData.companyId)
    .subscribe((data: any | undefined) => {
      this.userList = data;
    });
  }
  SelectAllDeals(event:any) {
    if(event.target.checked) {
      this.isSelectAllDeals = true;
      var DealsData = this.DealDetailsList;
      DealsData.forEach((x:any) => {
      x.isSelected = true;
    });
      this.exportDealId = (this.DealDetailsList.filter((x:any) => x.isSelected == true).map((z:any) => z.id));
    }
    else {
      this.isSelectAllDeals = false;
      var DealsData = this.DealDetailsList;
      DealsData.forEach((x:any) => {
      x.isSelected = false;
    });
    this.exportDealId = [];
    }
    this.cdr.detectChanges();    
  }
  SelectDealsDataTable(event:any,id:any){
    if(event.target.checked) {
      this.exportDealId.push(id);
      var exportDealsData = this.DealDetailsList.length;
      var selectedDetailList = this.DealDetailsList.filter((x:any) => x.isSelected == true).length;
      if(exportDealsData == selectedDetailList) {
        this.isSelectAllDeals = true;
      }
      else {
        this.isSelectAllDeals = false;
      }
    }
    else {
      const index:number = this.exportDealId.indexOf(id);
      if(index !== -1) {
        this.exportDealId.splice(index,1);
      }
      var exportDealsData = this.DealDetailsList.length;
      var selectedDetailList = this.DealDetailsList.filter((x:any) => x.isSelected == true).length;
      if(exportDealsData == selectedDetailList) {
        this.isSelectAllDeals = true;
      }
      else {
        this.isSelectAllDeals = false;
      }
    }
    this.cdr.detectChanges();  }
    
  exportDealsData(){
    this.IsLoading = true;
    this.dealsService.ExportDeal({
      dealIds:this.exportDealId,
      companyId:this.userData.companyId,
      sortColumn:'Updated',
      sortDir: true,
      roleId: this.userData.roleId,
      userId: this.userData.id
    }).
    subscribe((data:any) => {
      this.IsLoading = false;
      this.cdr.detectChanges();
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Deals.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });  
  }
  setSearchDealForm() {
    this.searchDealsForm = new FormGroup({
      filterRef: new FormControl(),
      filterStatus: new FormControl(),
      filterSubStatus: new FormControl(),
      filterAssignedTo: new FormControl(),
      filterPurpose: new FormControl(),
      filterTransaction: new FormControl(),
      filterSource:new FormControl(),
      filterEstimatedDealDateFrom:new FormControl(),
      filterEstimatedDealDateTo:new FormControl(),
      filterActualDealDateFrom: new FormControl(),
      filterActualDealDateTo: new FormControl(),
      minDealPrice: new FormControl(),
      maxDealPrice: new FormControl(),
      filterIncludeVAT: new FormControl(),
      filterVATAmount: new FormControl(),
      minTotalVATPrice: new FormControl(),
      maxTotalVATPrice: new FormControl(),
      filterDeposit: new FormControl(),
      minOwnerAgencyFee: new FormControl(),
      maxOwnerAgencyFee: new FormControl(),
      minLeadAgencyFee: new FormControl(),
      maxLeadAgencyFee: new FormControl(),
      minGrossCommission: new FormControl(),
      maxGrossCommission: new FormControl(),
      filterIncludeCommissionVAT: new FormControl(),
      filterCommissionVATAmount: new FormControl(),
      mintotalcommissionVATAmount: new FormControl(),
      maxtotalcommissionVATAmount: new FormControl(),
      filterExternalReferral: new FormControl(),
      filterExternalReferralType: new FormControl(),
      filterExternalReferralName: new FormControl(),
      minExternalReferralCommisionPer: new FormControl(),
      maxExternalReferralCommisionPer: new FormControl(),
      minExternalReferralCommisionAmount: new FormControl(),
      maxExternalReferralCommisionAmount: new FormControl(),
      minYourCompanyCommisionPer: new FormControl(),
      maxYourCompanyCommisionPer: new FormControl(),
      minYourCompanyCommisionAmount: new FormControl(),
      maxYourCompanyCommisionAmount: new FormControl(),
      filterAgent: new FormControl(),
      minCommisionPer: new FormControl(),
      maxCommisionPer: new FormControl(),
      minCommisionAmount: new FormControl(),
      maxCommisionAmount: new FormControl(),
      filterCheque: new FormControl(),
      filterTenancyStartDateFrom: new FormControl(),
      filterTenancyStartDateTo: new FormControl(),
      filterTenancyRenewalDateFrom: new FormControl(),
      filterTenancyRenewalDateTo: new FormControl(),
      filterReminder: new FormControl(),
      filterBuyerType: new FormControl(),
      filterFinanceType: new FormControl(),
      filterCreatedBy: new FormControl(),
  filterUpdatedBy: new FormControl(),
  filterCreatedFrom: new FormControl(),
  filterCreatedTo: new FormControl(),
  filterUpdatedFrom: new FormControl(),
  filterUpdatedTo: new FormControl(),
  filterListingRef: new FormControl(),
  filterListingPropertyType: new FormControl(),
  filterListingBeds: new FormControl(),
  filterListingEmirate: new FormControl(),
  filterListingLocation: new FormControl(),
  filterListingSubLocation: new FormControl(),
  minListingPrice: new FormControl(),
  maxListingPrice: new FormControl(),
  filterListingContactRef: new FormControl(),
  filterListingOwnerFirstName: new FormControl(),
  filterListingOwnerLastName: new FormControl(),
  filterOwnerPersonalMobile: new FormControl(),
  filterOwnerWorkMobile: new FormControl(),
  filterOwnerOtherMobile: new FormControl(),
  filterOwnerPersonalPhone: new FormControl(),
  filterOwnerWorkPhone: new FormControl(),
  filterOwnerOtherPhone: new FormControl(),
  filterOwnerPersonalEmail: new FormControl(),
  filterOwnerWorkEmail: new FormControl(),
  filterOwnerOtherEmail: new FormControl(),
  filterLeadRef:new FormControl(),
  filterLeadFirstName: new FormControl(),
  filterLeadLastName: new FormControl(),
  filterLeadPersonalMobile: new FormControl(),
  filterLeadWorkMobile: new FormControl(),
  filterLeadOtherMobile: new FormControl(),
  filterLeadPersonalPhone: new FormControl(),
  filterLeadWorkPhone: new FormControl(),
  filterLeadOtherPhone: new FormControl(),
  filterLeadPersonalEmail: new FormControl(),
  filterLeadWorkEmail: new FormControl(),
  filterLeadOtherEmail: new FormControl(),
    })
  }

  setAdvanceSearchDealForm() {
    this.advanceSearchDealsForm = new FormGroup({
      filterRef: new FormControl(),
      filterStatus: new FormControl(),
      filterSubStatus: new FormControl(),
      filterAssignedTo: new FormControl(),
      filterPurpose: new FormControl(),
      filterTransaction: new FormControl(),
      filterSource:new FormControl(),
      filterEstimatedDealDateFrom:new FormControl(),
      filterEstimatedDealDateTo:new FormControl(),
      filterActualDealDateFrom: new FormControl(),
      filterActualDealDateTo: new FormControl(),
      minDealPrice: new FormControl(),
      maxDealPrice: new FormControl(),
      filterIncludeVAT: new FormControl(),
      filterVATAmount: new FormControl(),
      minTotalVATPrice: new FormControl(),
      maxTotalVATPrice: new FormControl(),
      filterDeposit: new FormControl(),
      minOwnerAgencyFee: new FormControl(),
      maxOwnerAgencyFee: new FormControl(),
      minLeadAgencyFee: new FormControl(),
      maxLeadAgencyFee: new FormControl(),
      minGrossCommission: new FormControl(),
      maxGrossCommission: new FormControl(),
      filterIncludeCommissionVAT: new FormControl(),
      filterCommissionVATAmount: new FormControl(),
      mintotalcommissionVATAmount: new FormControl(),
      maxtotalcommissionVATAmount: new FormControl(),
      filterExternalReferral: new FormControl(),
      filterExternalReferralType: new FormControl(),
      filterExternalReferralName: new FormControl(),
      minExternalReferralCommisionPer: new FormControl(),
      maxExternalReferralCommisionPer: new FormControl(),
      minExternalReferralCommisionAmount: new FormControl(),
      maxExternalReferralCommisionAmount: new FormControl(),
      minYourCompanyCommisionPer: new FormControl(),
      maxYourCompanyCommisionPer: new FormControl(),
      minYourCompanyCommisionAmount: new FormControl(),
      maxYourCompanyCommisionAmount: new FormControl(),
      filterAgent: new FormControl(),
      minCommisionPer: new FormControl(),
      maxCommisionPer: new FormControl(),
      minCommisionAmount: new FormControl(),
      maxCommisionAmount: new FormControl(),
      filterCheque: new FormControl(),
      filterTenancyStartDateFrom: new FormControl(),
      filterTenancyStartDateTo: new FormControl(),
      filterTenancyRenewalDateFrom: new FormControl(),
      filterTenancyRenewalDateTo: new FormControl(),
      filterReminder: new FormControl(),
      filterBuyerType: new FormControl(),
      filterFinanceType: new FormControl(),
      filterCreatedBy: new FormControl(),
  filterUpdatedBy: new FormControl(),
  filterCreatedFrom: new FormControl(),
  filterCreatedTo: new FormControl(),
  filterUpdatedFrom: new FormControl(),
  filterUpdatedTo: new FormControl(),
  filterListingRef: new FormControl(),
  filterListingPropertyType: new FormControl(),
  filterListingBeds: new FormControl(),
  filterListingEmirate: new FormControl(),
  filterListingLocation: new FormControl(),
  filterListingSubLocation: new FormControl(),
  minListingPrice: new FormControl(),
  maxListingPrice: new FormControl(),
  filterListingContactRef: new FormControl(),
  filterListingOwnerFirstName: new FormControl(),
  filterListingOwnerLastName: new FormControl(),
  filterOwnerPersonalMobile: new FormControl(),
  filterOwnerWorkMobile: new FormControl(),
  filterOwnerOtherMobile: new FormControl(),
  filterOwnerPersonalPhone: new FormControl(),
  filterOwnerWorkPhone: new FormControl(),
  filterOwnerOtherPhone: new FormControl(),
  filterOwnerPersonalEmail: new FormControl(),
  filterOwnerWorkEmail: new FormControl(),
  filterOwnerOtherEmail: new FormControl(),
  filterLeadRef:new FormControl(),
  filterLeadFirstName: new FormControl(),
  filterLeadLastName: new FormControl(),
  filterLeadPersonalMobile: new FormControl(),
  filterLeadWorkMobile: new FormControl(),
  filterLeadOtherMobile: new FormControl(),
  filterLeadPersonalPhone: new FormControl(),
  filterLeadWorkPhone: new FormControl(),
  filterLeadOtherPhone: new FormControl(),
  filterLeadPersonalEmail: new FormControl(),
  filterLeadWorkEmail: new FormControl(),
  filterLeadOtherEmail: new FormControl(),
    })
  }


  onAdd() {
    this.data.AddDeal=true;
    this.data.EditDeal = false;
    this.data.Id = 0;
    this.dealsService.OpenAddDeal(this.data);
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
  }

  openDeals(id:any) {
    this.data.AddDeal=false;
    this.data.EditDeal = true;
    this.data.Id = id;
    this.selectedDealId = id;
    var contact = this.DealDetailsList.find((x:any) => x.id == id);
    contact.isSelected = true;

    var notcontact = this.DealDetailsList.filter((x:any) => x.id != id);
    notcontact.forEach((x:any) => {
      x.isSelected = false;
    });
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
    this.dealsService.OpenAddDeal(this.data);
    this.cdr.detectChanges();
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

  openAdvancedSearch(): Promise<boolean> {
    this.setAdvanceSearchDealFormBySearch();
    return new Promise<boolean>((resolve) => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'xl' });
      this.modalRef.result.then(resolve, resolve);
    });
  }

  closeAdvanceSearch() {
    this.modalRef.close(this.modalConfig);
  }

  renderPage(event:any) {
this.pageNumber = event;
    this.searchDeals();
  }

  OnSort(field:any) {
    if (this.sortColumn === field) {
      this.sortDir = this.sortDir === true ? false : true;
    } else {
      this.sortColumn = field;
      this.sortDir = false;
    }
    this.pageNumber = 1;
    this.searchDeals();
  }

  filterDeals() {
    this.setAdvanceSearchDealFormBySearch()
    this.cdr.detectChanges();
    this.pageSize = 25;
    this.pageNumber = 1;
    //this.IsLoading = true;
    this.searchDeals();
  }

  setAdvanceSearchDealFormBySearch() {
    this.advanceSearchDealsForm = new FormGroup({
      filterRef: new FormControl(this.searchDealsForm.get('filterRef')?.value),
      filterStatus: new FormControl(this.searchDealsForm.get('filterStatus')?.value),
      filterSubStatus: new FormControl(this.searchDealsForm.get('filterSubStatus')?.value),
      filterAssignedTo: new FormControl(this.searchDealsForm.get('filterAssignedTo')?.value),
      filterPurpose: new FormControl(this.searchDealsForm.get('filterPurpose')?.value),
      filterTransaction: new FormControl(this.searchDealsForm.get('filterTransaction')?.value),
      filterSource:new FormControl(this.searchDealsForm.get('filterSource')?.value),
      filterEstimatedDealDateFrom:new FormControl(this.searchDealsForm.get('filterEstimatedDealDateFrom')?.value != null && this.searchDealsForm.get('filterEstimatedDealDateFrom')?.value != '' ? moment(this.searchDealsForm.get('filterEstimatedDealDateFrom')?.value).format("YYYY-MM-DD") : null),
      filterEstimatedDealDateTo:new FormControl(this.searchDealsForm.get('filterEstimatedDealDateTo')?.value != null && this.searchDealsForm.get('filterEstimatedDealDateTo')?.value != ''? moment(this.searchDealsForm.get('filterEstimatedDealDateTo')?.value).format("YYYY-MM-DD") : null),
      filterActualDealDateFrom: new FormControl(this.searchDealsForm.get('filterActualDealDateFrom')?.value != null && this.searchDealsForm.get('filterActualDealDateFrom')?.value != '' ? moment(this.searchDealsForm.get('filterActualDealDateFrom')?.value).format("YYYY-MM-DD") : null),
      filterActualDealDateTo: new FormControl(this.searchDealsForm.get('filterActualDealDateTo')?.value != null && this.searchDealsForm.get('filterActualDealDateTo')?.value != '' ? moment(this.searchDealsForm.get('filterActualDealDateTo')?.value).format("YYYY-MM-DD") : null),
      minDealPrice: new FormControl(this.searchDealsForm.get('minDealPrice')?.value),
      maxDealPrice: new FormControl(this.searchDealsForm.get('maxDealPrice')?.value),
      filterIncludeVAT: new FormControl(this.searchDealsForm.get('filterIncludeVAT')?.value),
      filterVATAmount: new FormControl(this.searchDealsForm.get('filterVATAmount')?.value),
      minTotalVATPrice: new FormControl(this.searchDealsForm.get('minTotalVATPrice')?.value),
      maxTotalVATPrice: new FormControl(this.searchDealsForm.get('maxTotalVATPrice')?.value),
      filterDeposit: new FormControl(this.searchDealsForm.get('filterDeposit')?.value),
      minOwnerAgencyFee: new FormControl(this.searchDealsForm.get('minOwnerAgencyFee')?.value),
      maxOwnerAgencyFee: new FormControl(this.searchDealsForm.get('maxOwnerAgencyFee')?.value),
      minLeadAgencyFee: new FormControl(this.searchDealsForm.get('minLeadAgencyFee')?.value),
      maxLeadAgencyFee: new FormControl(this.searchDealsForm.get('maxLeadAgencyFee')?.value),
      minGrossCommission: new FormControl(this.searchDealsForm.get('minGrossCommission')?.value),
      maxGrossCommission: new FormControl(this.searchDealsForm.get('maxGrossCommission')?.value),
      filterIncludeCommissionVAT: new FormControl(this.searchDealsForm.get('filterIncludeCommissionVAT')?.value),
      filterCommissionVATAmount: new FormControl(this.searchDealsForm.get('filterCommissionVATAmount')?.value),
      mintotalcommissionVATAmount: new FormControl(this.searchDealsForm.get('mintotalcommissionVATAmount')?.value),
      maxtotalcommissionVATAmount: new FormControl(this.searchDealsForm.get('maxtotalcommissionVATAmount')?.value),
      filterExternalReferral: new FormControl(this.searchDealsForm.get('filterExternalReferral')?.value),
      filterExternalReferralType: new FormControl(this.searchDealsForm.get('filterExternalReferralType')?.value),
      filterExternalReferralName: new FormControl(this.searchDealsForm.get('filterExternalReferralName')?.value),
      minExternalReferralCommisionPer: new FormControl(this.searchDealsForm.get('minExternalReferralCommisionPer')?.value),
      maxExternalReferralCommisionPer: new FormControl(this.searchDealsForm.get('maxExternalReferralCommisionPer')?.value),
      minExternalReferralCommisionAmount: new FormControl(this.searchDealsForm.get('minExternalReferralCommisionAmount')?.value),
      maxExternalReferralCommisionAmount: new FormControl(this.searchDealsForm.get('maxExternalReferralCommisionAmount')?.value),
      minYourCompanyCommisionPer: new FormControl(this.searchDealsForm.get('minYourCompanyCommisionPer')?.value),
      maxYourCompanyCommisionPer: new FormControl(this.searchDealsForm.get('maxYourCompanyCommisionPer')?.value),
      minYourCompanyCommisionAmount: new FormControl(this.searchDealsForm.get('minYourCompanyCommisionAmount')?.value),
      maxYourCompanyCommisionAmount: new FormControl(this.searchDealsForm.get('maxYourCompanyCommisionAmount')?.value),
      filterAgent: new FormControl(this.searchDealsForm.get('filterAgent')?.value),
      minCommisionPer: new FormControl(this.searchDealsForm.get('minCommisionPer')?.value),
      maxCommisionPer: new FormControl(this.searchDealsForm.get('maxCommisionPer')?.value),
      minCommisionAmount: new FormControl(this.searchDealsForm.get('minCommisionAmount')?.value),
      maxCommisionAmount: new FormControl(this.searchDealsForm.get('maxCommisionAmount')?.value),
      filterCheque: new FormControl(this.searchDealsForm.get('filterCheque')?.value),
      filterTenancyStartDateFrom: new FormControl(this.searchDealsForm.get('filterTenancyStartDateFrom')?.value != null && this.searchDealsForm.get('filterTenancyStartDateFrom')?.value != '' ? moment(this.searchDealsForm.get('filterTenancyStartDateFrom')?.value).format("YYYY-MM-DD") : null),
      filterTenancyStartDateTo: new FormControl(this.searchDealsForm.get('filterTenancyStartDateTo')?.value != null && this.searchDealsForm.get('filterTenancyStartDateTo')?.value != '' ? moment(this.searchDealsForm.get('filterTenancyStartDateTo')?.value).format("YYYY-MM-DD") : null),
      filterTenancyRenewalDateFrom: new FormControl(this.searchDealsForm.get('filterTenancyRenewalDateFrom')?.value != null && this.searchDealsForm.get('filterTenancyRenewalDateFrom')?.value != '' ? moment(this.searchDealsForm.get('filterTenancyRenewalDateFrom')?.value).format("YYYY-MM-DD") : null),
      filterTenancyRenewalDateTo: new FormControl(this.searchDealsForm.get('filterTenancyRenewalDateTo')?.value != null && this.searchDealsForm.get('filterTenancyRenewalDateTo')?.value != '' ? moment(this.searchDealsForm.get('filterTenancyRenewalDateTo')?.value).format("YYYY-MM-DD") : null),
      filterReminder: new FormControl(this.searchDealsForm.get('filterReminder')?.value),
      filterBuyerType: new FormControl(this.searchDealsForm.get('filterBuyerType')?.value),
      filterFinanceType: new FormControl(this.searchDealsForm.get('filterFinanceType')?.value),
      filterCreatedBy: new FormControl(this.searchDealsForm.get('filterCreatedBy')?.value),
  filterUpdatedBy: new FormControl(this.searchDealsForm.get('filterUpdatedBy')?.value),
  filterCreatedFrom: new FormControl(this.searchDealsForm.get('filterCreatedFrom')?.value != null && this.searchDealsForm.get('filterCreatedFrom')?.value != '' ? moment(this.searchDealsForm.get('filterCreatedFrom')?.value).format("YYYY-MM-DD") : null),
  filterCreatedTo: new FormControl(this.searchDealsForm.get('filterCreatedTo')?.value != null && this.searchDealsForm.get('filterCreatedTo')?.value != '' ? moment(this.searchDealsForm.get('filterCreatedTo')?.value).format("YYYY-MM-DD") : null),
  filterUpdatedFrom: new FormControl(this.searchDealsForm.get('filterUpdatedFrom')?.value != null && this.searchDealsForm.get('filterUpdatedFrom')?.value != '' ? moment(this.searchDealsForm.get('filterUpdatedFrom')?.value).format("YYYY-MM-DD") : null),
  filterUpdatedTo: new FormControl(this.searchDealsForm.get('filterUpdatedTo')?.value != null && this.searchDealsForm.get('filterUpdatedTo')?.value != '' ? moment(this.searchDealsForm.get('filterUpdatedTo')?.value).format("YYYY-MM-DD") : null),
  filterListingRef: new FormControl(this.searchDealsForm.get('filterListingRef')?.value),
  filterListingPropertyType: new FormControl(this.searchDealsForm.get('filterListingPropertyType')?.value),
  filterListingBeds: new FormControl(this.searchDealsForm.get('filterListingBeds')?.value),
  filterListingEmirate: new FormControl(this.searchDealsForm.get('filterListingEmirate')?.value),
  filterListingLocation: new FormControl(this.searchDealsForm.get('filterListingLocation')?.value),
  filterListingSubLocation: new FormControl(this.searchDealsForm.get('filterListingSubLocation')?.value),
  minListingPrice: new FormControl(this.searchDealsForm.get('minListingPrice')?.value),
  maxListingPrice: new FormControl(this.searchDealsForm.get('maxListingPrice')?.value),
  filterListingContactRef: new FormControl(this.searchDealsForm.get('filterListingContactRef')?.value),
  filterListingOwnerFirstName: new FormControl(this.searchDealsForm.get('filterListingOwnerFirstName')?.value),
  filterListingOwnerLastName: new FormControl(this.searchDealsForm.get('filterListingOwnerLastName')?.value),
  filterOwnerPersonalMobile: new FormControl(this.searchDealsForm.get('filterOwnerPersonalMobile')?.value),
  filterOwnerWorkMobile: new FormControl(this.searchDealsForm.get('filterOwnerWorkMobile')?.value),
  filterOwnerOtherMobile: new FormControl(this.searchDealsForm.get('filterOwnerOtherMobile')?.value),
  filterOwnerPersonalPhone: new FormControl(this.searchDealsForm.get('filterOwnerPersonalPhone')?.value),
  filterOwnerWorkPhone: new FormControl(this.searchDealsForm.get('filterOwnerWorkPhone')?.value),
  filterOwnerOtherPhone: new FormControl(this.searchDealsForm.get('filterOwnerOtherPhone')?.value),
  filterOwnerPersonalEmail: new FormControl(this.searchDealsForm.get('filterOwnerPersonalEmail')?.value),
  filterOwnerWorkEmail: new FormControl(this.searchDealsForm.get('filterOwnerWorkEmail')?.value),
  filterOwnerOtherEmail: new FormControl(this.searchDealsForm.get('filterOwnerOtherEmail')?.value),
  filterLeadRef:new FormControl(this.searchDealsForm.get('filterLeadRef')?.value),
  filterLeadFirstName: new FormControl(this.searchDealsForm.get('filterLeadFirstName')?.value),
  filterLeadLastName: new FormControl(this.searchDealsForm.get('filterLeadLastName')?.value),
  filterLeadPersonalMobile: new FormControl(this.searchDealsForm.get('filterLeadPersonalMobile')?.value),
  filterLeadWorkMobile: new FormControl(this.searchDealsForm.get('filterLeadWorkMobile')?.value),
  filterLeadOtherMobile: new FormControl(this.searchDealsForm.get('filterLeadOtherMobile')?.value),
  filterLeadPersonalPhone: new FormControl(this.searchDealsForm.get('filterLeadPersonalPhone')?.value),
  filterLeadWorkPhone: new FormControl(this.searchDealsForm.get('filterLeadWorkPhone')?.value),
  filterLeadOtherPhone: new FormControl(this.searchDealsForm.get('filterLeadOtherPhone')?.value),
  filterLeadPersonalEmail: new FormControl(this.searchDealsForm.get('filterLeadPersonalEmail')?.value),
  filterLeadWorkEmail: new FormControl(this.searchDealsForm.get('filterLeadWorkEmail')?.value),
  filterLeadOtherEmail: new FormControl(this.searchDealsForm.get('filterLeadOtherEmail')?.value),
    })
    this.AdvanceSearchsetClassforDate('filterEstimatedDealDateFrom');
    this.AdvanceSearchsetClassforDate('filterEstimatedDealDateTo');
    this.AdvanceSearchsetClassforDate('filterActualDealDateFrom');
    this.AdvanceSearchsetClassforDate('filterActualDealDateTo');
    this.AdvanceSearchsetClassforDate('filterTenancyStartDateFrom');
    this.AdvanceSearchsetClassforDate('filterTenancyStartDateTo');
    this.AdvanceSearchsetClassforDate('filterTenancyRenewalDateFrom');
    this.AdvanceSearchsetClassforDate('filterTenancyRenewalDateTo');
    this.AdvanceSearchsetClassforDate('filterCreatedFrom');
    this.AdvanceSearchsetClassforDate('filterCreatedTo');
    this.AdvanceSearchsetClassforDate('filterUpdatedFrom');
    this.AdvanceSearchsetClassforDate('filterUpdatedTo');
  }

  AdvanceSearchsetClassforDate(formControlName:any) { 
    if(this.advanceSearchDealsForm.controls[formControlName].value != null && this.advanceSearchDealsForm.controls[formControlName].value != '') {
      this.advanceSearchDealsForm.controls[formControlName].markAsDirty();
    }
    else {
      this.advanceSearchDealsForm.controls[formControlName].markAsPristine();
    }
  }

  setSearchDealFormByAdvanceSearch() {
    this.searchDealsForm = new FormGroup({
      filterRef: new FormControl(this.advanceSearchDealsForm.get('filterRef')?.value),
      filterStatus: new FormControl(this.advanceSearchDealsForm.get('filterStatus')?.value),
      filterSubStatus: new FormControl(this.advanceSearchDealsForm.get('filterSubStatus')?.value),
      filterAssignedTo: new FormControl(this.advanceSearchDealsForm.get('filterAssignedTo')?.value),
      filterPurpose: new FormControl(this.advanceSearchDealsForm.get('filterPurpose')?.value),
      filterTransaction: new FormControl(this.advanceSearchDealsForm.get('filterTransaction')?.value),
      filterSource:new FormControl(this.advanceSearchDealsForm.get('filterSource')?.value),
      filterEstimatedDealDateFrom:new FormControl(this.advanceSearchDealsForm.get('filterEstimatedDealDateFrom')?.value != null && this.advanceSearchDealsForm.get('filterEstimatedDealDateFrom')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterEstimatedDealDateFrom')?.value).format("YYYY-MM-DD") : null),
      filterEstimatedDealDateTo:new FormControl(this.advanceSearchDealsForm.get('filterEstimatedDealDateTo')?.value != null && this.advanceSearchDealsForm.get('filterEstimatedDealDateTo')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterEstimatedDealDateTo')?.value).format("YYYY-MM-DD") : null),
      filterActualDealDateFrom: new FormControl(this.advanceSearchDealsForm.get('filterActualDealDateFrom')?.value != null && this.advanceSearchDealsForm.get('filterActualDealDateFrom')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterActualDealDateFrom')?.value).format("YYYY-MM-DD") : null),
      filterActualDealDateTo: new FormControl(this.advanceSearchDealsForm.get('filterActualDealDateTo')?.value != null && this.advanceSearchDealsForm.get('filterActualDealDateTo')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterActualDealDateTo')?.value).format("YYYY-MM-DD") : null),
      minDealPrice: new FormControl(this.advanceSearchDealsForm.get('minDealPrice')?.value),
      maxDealPrice: new FormControl(this.advanceSearchDealsForm.get('maxDealPrice')?.value),
      filterIncludeVAT: new FormControl(this.advanceSearchDealsForm.get('filterIncludeVAT')?.value),
      filterVATAmount: new FormControl(this.advanceSearchDealsForm.get('filterVATAmount')?.value),
      minTotalVATPrice: new FormControl(this.advanceSearchDealsForm.get('minTotalVATPrice')?.value),
      maxTotalVATPrice: new FormControl(this.advanceSearchDealsForm.get('maxTotalVATPrice')?.value),
      filterDeposit: new FormControl(this.advanceSearchDealsForm.get('filterDeposit')?.value),
      minOwnerAgencyFee: new FormControl(this.advanceSearchDealsForm.get('minOwnerAgencyFee')?.value),
      maxOwnerAgencyFee: new FormControl(this.advanceSearchDealsForm.get('maxOwnerAgencyFee')?.value),
      minLeadAgencyFee: new FormControl(this.advanceSearchDealsForm.get('minLeadAgencyFee')?.value),
      maxLeadAgencyFee: new FormControl(this.advanceSearchDealsForm.get('maxLeadAgencyFee')?.value),
      minGrossCommission: new FormControl(this.advanceSearchDealsForm.get('minGrossCommission')?.value),
      maxGrossCommission: new FormControl(this.advanceSearchDealsForm.get('maxGrossCommission')?.value),
      filterIncludeCommissionVAT: new FormControl(this.advanceSearchDealsForm.get('filterIncludeCommissionVAT')?.value),
      filterCommissionVATAmount: new FormControl(this.advanceSearchDealsForm.get('filterCommissionVATAmount')?.value),
      mintotalcommissionVATAmount: new FormControl(this.advanceSearchDealsForm.get('mintotalcommissionVATAmount')?.value),
      maxtotalcommissionVATAmount: new FormControl(this.advanceSearchDealsForm.get('maxtotalcommissionVATAmount')?.value),
      filterExternalReferral: new FormControl(this.advanceSearchDealsForm.get('filterExternalReferral')?.value),
      filterExternalReferralType: new FormControl(this.advanceSearchDealsForm.get('filterExternalReferralType')?.value),
      filterExternalReferralName: new FormControl(this.advanceSearchDealsForm.get('filterExternalReferralName')?.value),
      minExternalReferralCommisionPer: new FormControl(this.advanceSearchDealsForm.get('minExternalReferralCommisionPer')?.value),
      maxExternalReferralCommisionPer: new FormControl(this.advanceSearchDealsForm.get('maxExternalReferralCommisionPer')?.value),
      minExternalReferralCommisionAmount: new FormControl(this.advanceSearchDealsForm.get('minExternalReferralCommisionAmount')?.value),
      maxExternalReferralCommisionAmount: new FormControl(this.advanceSearchDealsForm.get('maxExternalReferralCommisionAmount')?.value),
      minYourCompanyCommisionPer: new FormControl(this.advanceSearchDealsForm.get('minYourCompanyCommisionPer')?.value),
      maxYourCompanyCommisionPer: new FormControl(this.advanceSearchDealsForm.get('maxYourCompanyCommisionPer')?.value),
      minYourCompanyCommisionAmount: new FormControl(this.advanceSearchDealsForm.get('minYourCompanyCommisionAmount')?.value),
      maxYourCompanyCommisionAmount: new FormControl(this.advanceSearchDealsForm.get('maxYourCompanyCommisionAmount')?.value),
      filterAgent: new FormControl(this.advanceSearchDealsForm.get('filterAgent')?.value),
      minCommisionPer: new FormControl(this.advanceSearchDealsForm.get('minCommisionPer')?.value),
      maxCommisionPer: new FormControl(this.advanceSearchDealsForm.get('maxCommisionPer')?.value),
      minCommisionAmount: new FormControl(this.advanceSearchDealsForm.get('minCommisionAmount')?.value),
      maxCommisionAmount: new FormControl(this.advanceSearchDealsForm.get('maxCommisionAmount')?.value),
      filterCheque: new FormControl(this.advanceSearchDealsForm.get('filterCheque')?.value),
      filterTenancyStartDateFrom: new FormControl(this.advanceSearchDealsForm.get('filterTenancyStartDateFrom')?.value != null && this.advanceSearchDealsForm.get('filterTenancyStartDateFrom')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterTenancyStartDateFrom')?.value).format("YYYY-MM-DD") : null),
      filterTenancyStartDateTo: new FormControl(this.advanceSearchDealsForm.get('filterTenancyStartDateTo')?.value != null && this.advanceSearchDealsForm.get('filterTenancyStartDateTo')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterTenancyStartDateTo')?.value).format("YYYY-MM-DD") : null),
      filterTenancyRenewalDateFrom: new FormControl(this.advanceSearchDealsForm.get('filterTenancyRenewalDateFrom')?.value != null && this.advanceSearchDealsForm.get('filterTenancyRenewalDateFrom')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterTenancyRenewalDateFrom')?.value).format("YYYY-MM-DD") : null),
      filterTenancyRenewalDateTo: new FormControl(this.advanceSearchDealsForm.get('filterTenancyRenewalDateTo')?.value != null && this.advanceSearchDealsForm.get('filterTenancyRenewalDateTo')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterTenancyRenewalDateTo')?.value).format("YYYY-MM-DD") : null),
      filterReminder: new FormControl(this.advanceSearchDealsForm.get('filterReminder')?.value),
      filterBuyerType: new FormControl(this.advanceSearchDealsForm.get('filterBuyerType')?.value),
      filterFinanceType: new FormControl(this.advanceSearchDealsForm.get('filterFinanceType')?.value),
      filterCreatedBy: new FormControl(this.advanceSearchDealsForm.get('filterCreatedBy')?.value),
  filterUpdatedBy: new FormControl(this.advanceSearchDealsForm.get('filterUpdatedBy')?.value),
  filterCreatedFrom: new FormControl(this.advanceSearchDealsForm.get('filterCreatedFrom')?.value != null && this.advanceSearchDealsForm.get('filterCreatedFrom')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterCreatedFrom')?.value).format("YYYY-MM-DD") : null),
  filterCreatedTo: new FormControl(this.advanceSearchDealsForm.get('filterCreatedTo')?.value != null && this.advanceSearchDealsForm.get('filterCreatedTo')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterCreatedTo')?.value).format("YYYY-MM-DD") : null),
  filterUpdatedFrom: new FormControl(this.advanceSearchDealsForm.get('filterUpdatedFrom')?.value != null && this.advanceSearchDealsForm.get('filterUpdatedFrom')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterUpdatedFrom')?.value).format("YYYY-MM-DD") : null),
  filterUpdatedTo: new FormControl(this.advanceSearchDealsForm.get('filterUpdatedTo')?.value != null && this.advanceSearchDealsForm.get('filterUpdatedTo')?.value != '' ? moment(this.advanceSearchDealsForm.get('filterUpdatedTo')?.value).format("YYYY-MM-DD") : null),
  filterListingRef: new FormControl(this.advanceSearchDealsForm.get('filterListingRef')?.value),
  filterListingPropertyType: new FormControl(this.advanceSearchDealsForm.get('filterListingPropertyType')?.value),
  filterListingBeds: new FormControl(this.advanceSearchDealsForm.get('filterListingBeds')?.value),
  filterListingEmirate: new FormControl(this.advanceSearchDealsForm.get('filterListingEmirate')?.value),
  filterListingLocation: new FormControl(this.advanceSearchDealsForm.get('filterListingLocation')?.value),
  filterListingSubLocation: new FormControl(this.advanceSearchDealsForm.get('filterListingSubLocation')?.value),
  minListingPrice: new FormControl(this.advanceSearchDealsForm.get('minListingPrice')?.value),
  maxListingPrice: new FormControl(this.advanceSearchDealsForm.get('maxListingPrice')?.value),
  filterListingContactRef: new FormControl(this.advanceSearchDealsForm.get('filterListingContactRef')?.value),
  filterListingOwnerFirstName: new FormControl(this.advanceSearchDealsForm.get('filterListingOwnerFirstName')?.value),
  filterListingOwnerLastName: new FormControl(this.advanceSearchDealsForm.get('filterListingOwnerLastName')?.value),
  filterOwnerPersonalMobile: new FormControl(this.advanceSearchDealsForm.get('filterOwnerPersonalMobile')?.value),
  filterOwnerWorkMobile: new FormControl(this.advanceSearchDealsForm.get('filterOwnerWorkMobile')?.value),
  filterOwnerOtherMobile: new FormControl(this.advanceSearchDealsForm.get('filterOwnerOtherMobile')?.value),
  filterOwnerPersonalPhone: new FormControl(this.advanceSearchDealsForm.get('filterOwnerPersonalPhone')?.value),
  filterOwnerWorkPhone: new FormControl(this.advanceSearchDealsForm.get('filterOwnerWorkPhone')?.value),
  filterOwnerOtherPhone: new FormControl(this.advanceSearchDealsForm.get('filterOwnerOtherPhone')?.value),
  filterOwnerPersonalEmail: new FormControl(this.advanceSearchDealsForm.get('filterOwnerPersonalEmail')?.value),
  filterOwnerWorkEmail: new FormControl(this.advanceSearchDealsForm.get('filterOwnerWorkEmail')?.value),
  filterOwnerOtherEmail: new FormControl(this.advanceSearchDealsForm.get('filterOwnerOtherEmail')?.value),
  filterLeadRef:new FormControl(this.advanceSearchDealsForm.get('filterLeadRef')?.value),
  filterLeadFirstName: new FormControl(this.advanceSearchDealsForm.get('filterLeadFirstName')?.value),
  filterLeadLastName: new FormControl(this.advanceSearchDealsForm.get('filterLeadLastName')?.value),
  filterLeadPersonalMobile: new FormControl(this.advanceSearchDealsForm.get('filterLeadPersonalMobile')?.value),
  filterLeadWorkMobile: new FormControl(this.advanceSearchDealsForm.get('filterLeadWorkMobile')?.value),
  filterLeadOtherMobile: new FormControl(this.advanceSearchDealsForm.get('filterLeadOtherMobile')?.value),
  filterLeadPersonalPhone: new FormControl(this.advanceSearchDealsForm.get('filterLeadPersonalPhone')?.value),
  filterLeadWorkPhone: new FormControl(this.advanceSearchDealsForm.get('filterLeadWorkPhone')?.value),
  filterLeadOtherPhone: new FormControl(this.advanceSearchDealsForm.get('filterLeadOtherPhone')?.value),
  filterLeadPersonalEmail: new FormControl(this.advanceSearchDealsForm.get('filterLeadPersonalEmail')?.value),
  filterLeadWorkEmail: new FormControl(this.advanceSearchDealsForm.get('filterLeadWorkEmail')?.value),
  filterLeadOtherEmail: new FormControl(this.advanceSearchDealsForm.get('filterLeadOtherEmail')?.value),
    })
    this.FilterSearchsetClassforDate('filterEstimatedDealDateFrom');
    this.FilterSearchsetClassforDate('filterEstimatedDealDateTo');
    this.FilterSearchsetClassforDate('filterActualDealDateFrom');
    this.FilterSearchsetClassforDate('filterActualDealDateTo');
    this.FilterSearchsetClassforDate('filterTenancyStartDateFrom');
    this.FilterSearchsetClassforDate('filterTenancyStartDateTo');
    this.FilterSearchsetClassforDate('filterTenancyRenewalDateFrom');
    this.FilterSearchsetClassforDate('filterTenancyRenewalDateTo');
    this.FilterSearchsetClassforDate('filterCreatedFrom');
    this.FilterSearchsetClassforDate('filterCreatedTo');
    this.FilterSearchsetClassforDate('filterUpdatedFrom');
    this.FilterSearchsetClassforDate('filterUpdatedTo');
  }

  FilterSearchsetClassforDate(formControlName:any) { 
    if(this.searchDealsForm.controls[formControlName].value != null && this.searchDealsForm.controls[formControlName].value != '') {
      this.searchDealsForm.controls[formControlName].markAsDirty();
    }
    else {
      this.searchDealsForm.controls[formControlName].markAsPristine();
    }
  }

  ApplyAdvanceSearch() {
this.setSearchDealFormByAdvanceSearch();
this.closeAdvanceSearch();
this.filterDeals();
  }

  ResetAdvanceSearch() {
    this.searchDealsForm.reset();
    this.advanceSearchDealsForm.reset();
    this.closeAdvanceSearch();
    this.filterDeals();
  }

  MinCharSearch(e:any,data:any) {
    switch (data) {
      case 'Ref':
        if (
          this.searchDealsForm.value?.filterRef.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterRef)
        ) {
          this.isFilterRef = false;
          if (this.searchDealsForm.value?.filterRef.length >= 3) {
            this.isFilterRef = true;
          }

          this.filterDeals();
        }
        break;

      case 'ListingRef':
        if (
          this.searchDealsForm.value?.filterListingRef.length >= 3 ||
          (e.target.value.length == 0 && this.isListingRef)
        ) {
          this.isListingRef = false;
          if (this.searchDealsForm.value?.filterListingRef.length >= 3) {
            this.isListingRef = true;
          }

          this.filterDeals();
        }
        break;

      case 'minListingPrice':
        if (
          this.searchDealsForm.value?.minListingPrice.length >= 1 ||
          (e.target.value.length == 0 && this.isminListingPrice)
        ) {
          this.isminListingPrice = false;
          if (this.searchDealsForm.value?.minListingPrice.length >= 1) {
            this.isminListingPrice = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxListingPrice':
        if (
          this.searchDealsForm.value?.maxListingPrice.length >= 1 ||
          (e.target.value.length == 0 && this.ismaxListingPrice)
        ) {
          this.ismaxListingPrice = false;
          if (this.searchDealsForm.value?.maxListingPrice.length >= 1) {
            this.ismaxListingPrice = true;
          }

          this.filterDeals();
        }
        break;

      case 'ListingContactRef':
        if (
          this.searchDealsForm.value?.filterListingContactRef.length >= 3 ||
          (e.target.value.length == 0 && this.isListingContactRef)
        ) {
          this.isListingContactRef = false;
          if (this.searchDealsForm.value?.filterListingContactRef.length >= 3) {
            this.isListingContactRef = true;
          }

          this.filterDeals();
        }
        break;

      case 'ListingOwnerFirstName':
        if (
          this.searchDealsForm.value?.filterListingOwnerFirstName.length >= 3 ||
          (e.target.value.length == 0 && this.isListingOwnerFirstName)
        ) {
          this.isListingOwnerFirstName = false;
          if (
            this.searchDealsForm.value?.filterListingOwnerFirstName.length >= 3
          ) {
            this.isListingOwnerFirstName = true;
          }

          this.filterDeals();
        }
        break;

      case 'ListingOwnerLastName':
        if (
          this.searchDealsForm.value?.filterListingOwnerLastName.length >= 3 ||
          (e.target.value.length == 0 && this.isListingOwnerLastName)
        ) {
          this.isListingOwnerLastName = false;
          if (
            this.searchDealsForm.value?.filterListingOwnerLastName.length >= 3
          ) {
            this.isListingOwnerLastName = true;
          }

          this.filterDeals();
        }
        break;

      case 'OwnerPersonalMobile':
        if (
          this.searchDealsForm.value?.filterOwnerPersonalMobile.length >= 3 ||
          (e.target.value.length == 0 && this.isOwnerPersonalMobile)
        ) {
          this.isOwnerPersonalMobile = false;
          if (
            this.searchDealsForm.value?.filterOwnerPersonalMobile.length >= 3
          ) {
            this.isOwnerPersonalMobile = true;
          }

          this.filterDeals();
        }
        break;

      case 'OwnerWorkMobile':
        if (
          this.searchDealsForm.value?.filterOwnerWorkMobile.length >= 3 ||
          (e.target.value.length == 0 && this.isOwnerWorkMobile)
        ) {
          this.isOwnerWorkMobile = false;
          if (this.searchDealsForm.value?.filterOwnerWorkMobile.length >= 3) {
            this.isOwnerWorkMobile = true;
          }

          this.filterDeals();
        }
        break;

      case 'OwnerOtherMobile':
        if (
          this.searchDealsForm.value?.filterOwnerOtherMobile.length >= 3 ||
          (e.target.value.length == 0 && this.isOwnerOtherMobile)
        ) {
          this.isOwnerOtherMobile = false;
          if (this.searchDealsForm.value?.filterOwnerOtherMobile.length >= 3) {
            this.isOwnerOtherMobile = true;
          }

          this.filterDeals();
        }
        break;

      case 'OwnerPersonalPhone':
        if (
          this.searchDealsForm.value?.filterOwnerPersonalPhone.length >= 3 ||
          (e.target.value.length == 0 && this.isOwnerPersonalPhone)
        ) {
          this.isOwnerPersonalPhone = false;
          if (
            this.searchDealsForm.value?.filterOwnerPersonalPhone.length >= 3
          ) {
            this.isOwnerPersonalPhone = true;
          }

          this.filterDeals();
        }
        break;

      case 'OwnerWorkPhone':
        if (
          this.searchDealsForm.value?.filterOwnerWorkPhone.length >= 3 ||
          (e.target.value.length == 0 && this.isOwnerWorkPhone)
        ) {
          this.isOwnerWorkPhone = false;
          if (this.searchDealsForm.value?.filterOwnerWorkPhone.length >= 3) {
            this.isOwnerWorkPhone = true;
          }

          this.filterDeals();
        }
        break;

      case 'OwnerOtherPhone':
        if (
          this.searchDealsForm.value?.filterOwnerOtherPhone.length >= 3 ||
          (e.target.value.length == 0 && this.isOwnerOtherPhone)
        ) {
          this.isOwnerOtherPhone = false;
          if (this.searchDealsForm.value?.filterOwnerOtherPhone.length >= 3) {
            this.isOwnerOtherPhone = true;
          }

          this.filterDeals();
        }
        break;

      case 'OwnerPersonalEmail':
        if (
          this.searchDealsForm.value?.filterOwnerPersonalEmail.length >= 3 ||
          (e.target.value.length == 0 && this.isOwnerPersonalEmail)
        ) {
          this.isOwnerPersonalEmail = false;
          if (
            this.searchDealsForm.value?.filterOwnerPersonalEmail.length >= 3
          ) {
            this.isOwnerPersonalEmail = true;
          }

          this.filterDeals();
        }
        break;

      case 'OwnerWorkEmail':
        if (
          this.searchDealsForm.value?.filterOwnerWorkEmail.length >= 3 ||
          (e.target.value.length == 0 && this.isOwnerWorkEmail)
        ) {
          this.isOwnerWorkEmail = false;
          if (this.searchDealsForm.value?.filterOwnerWorkEmail.length >= 3) {
            this.isOwnerWorkEmail = true;
          }

          this.filterDeals();
        }
        break;

      case 'OwnerOtherEmail':
        if (
          this.searchDealsForm.value?.filterOwnerOtherEmail.length >= 3 ||
          (e.target.value.length == 0 && this.isOwnerOtherEmail)
        ) {
          this.isOwnerOtherEmail = false;
          if (this.searchDealsForm.value?.filterOwnerOtherEmail.length >= 3) {
            this.isOwnerOtherEmail = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadRef':
        if (
          this.searchDealsForm.value?.filterLeadRef.length >= 3 ||
          (e.target.value.length == 0 && this.isLeadRef)
        ) {
          this.isLeadRef = false;
          if (this.searchDealsForm.value?.filterLeadRef.length >= 3) {
            this.isLeadRef = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadFirstName':
        if (
          this.searchDealsForm.value?.filterLeadFirstName.length >= 3 ||
          (e.target.value.length == 0 && this.isLeadFirstName)
        ) {
          this.isLeadFirstName = false;
          if (this.searchDealsForm.value?.filterLeadFirstName.length >= 3) {
            this.isLeadFirstName = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadLastName':
        if (
          this.searchDealsForm.value?.filterLeadLastName.length >= 3 ||
          (e.target.value.length == 0 && this.isLeadLastName)
        ) {
          this.isLeadLastName = false;
          if (this.searchDealsForm.value?.filterLeadLastName.length >= 3) {
            this.isLeadLastName = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadPersonalMobile':
        if (
          this.searchDealsForm.value?.filterLeadPersonalMobile.length >= 3 ||
          (e.target.value.length == 0 && this.LeadPersonalMobile)
        ) {
          this.LeadPersonalMobile = false;
          if (
            this.searchDealsForm.value?.filterLeadPersonalMobile.length >= 3
          ) {
            this.LeadPersonalMobile = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadWorkMobile':
        if (
          this.searchDealsForm.value?.filterLeadWorkMobile.length >= 3 ||
          (e.target.value.length == 0 && this.isLeadWorkMobile)
        ) {
          this.isLeadWorkMobile = false;
          if (this.searchDealsForm.value?.filterLeadWorkMobile.length >= 3) {
            this.isLeadWorkMobile = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadOtherMobile':
        if (
          this.searchDealsForm.value?.filterLeadOtherMobile.length >= 3 ||
          (e.target.value.length == 0 && this.isLeadOtherMobile)
        ) {
          this.isLeadOtherMobile = false;
          if (this.searchDealsForm.value?.filterLeadOtherMobile.length >= 3) {
            this.isLeadOtherMobile = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadPersonalPhone':
        if (
          this.searchDealsForm.value?.filterLeadPersonalPhone.length >= 3 ||
          (e.target.value.length == 0 && this.isLeadPersonalPhone)
        ) {
          this.isLeadPersonalPhone = false;
          if (this.searchDealsForm.value?.filterLeadPersonalPhone.length >= 3) {
            this.isLeadPersonalPhone = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadWorkPhone':
        if (
          this.searchDealsForm.value?.filterLeadWorkPhone.length >= 3 ||
          (e.target.value.length == 0 && this.isLeadWorkPhone)
        ) {
          this.isLeadWorkPhone = false;
          if (this.searchDealsForm.value?.filterLeadWorkPhone.length >= 3) {
            this.isLeadWorkPhone = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadOtherPhone':
        if (
          this.searchDealsForm.value?.filterLeadOtherPhone.length >= 3 ||
          (e.target.value.length == 0 && this.isLeadOtherPhone)
        ) {
          this.isLeadOtherPhone = false;
          if (this.searchDealsForm.value?.filterLeadOtherPhone.length >= 3) {
            this.isLeadOtherPhone = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadPersonalEmail':
        if (
          this.searchDealsForm.value?.filterLeadPersonalEmail.length >= 3 ||
          (e.target.value.length == 0 && this.isLeadPersonalEmail)
        ) {
          this.isLeadPersonalEmail = false;
          if (this.searchDealsForm.value?.filterLeadPersonalEmail.length >= 3) {
            this.isLeadPersonalEmail = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadWorkEmail':
        if (
          this.searchDealsForm.value?.filterLeadWorkEmail.length >= 3 ||
          (e.target.value.length == 0 && this.isLeadWorkEmail)
        ) {
          this.isLeadWorkEmail = false;
          if (this.searchDealsForm.value?.filterLeadWorkEmail.length >= 3) {
            this.isLeadWorkEmail = true;
          }

          this.filterDeals();
        }
        break;

      case 'LeadOtherEmail':
        if (
          this.searchDealsForm.value?.filterLeadOtherEmail.length >= 3 ||
          (e.target.value.length == 0 && this.isLeadOtherEmail)
        ) {
          this.isLeadOtherEmail = false;
          if (this.searchDealsForm.value?.filterLeadOtherEmail.length >= 3) {
            this.isLeadOtherEmail = true;
          }

          this.filterDeals();
        }
        break;

      case 'minDealPrice':
        if (
          this.searchDealsForm.value?.minDealPrice.length >= 1 ||
          (e.target.value.length == 0 && this.isminDealPrice)
        ) {
          this.isminDealPrice = false;
          if (this.searchDealsForm.value?.minDealPrice.length >= 1) {
            this.isminDealPrice = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxDealPrice':
        if (
          this.searchDealsForm.value?.maxDealPrice.length >= 1 ||
          (e.target.value.length == 0 && this.ismaxDealPrice)
        ) {
          this.ismaxDealPrice = false;
          if (this.searchDealsForm.value?.maxDealPrice.length >= 1) {
            this.ismaxDealPrice = true;
          }

          this.filterDeals();
        }
        break;

      case 'VATAmount':
        if (
          this.searchDealsForm.value?.filterVATAmount.length >= 1 ||
          (e.target.value.length == 0 && this.isVATAmount)
        ) {
          this.isVATAmount = false;
          if (this.searchDealsForm.value?.filterVATAmount.length >= 1) {
            this.isVATAmount = true;
          }

          this.filterDeals();
        }
        break;

      case 'minTotalVATPrice':
        if (
          this.searchDealsForm.value?.minTotalVATPrice.length >= 1 ||
          (e.target.value.length == 0 && this.isminTotalVATPrice)
        ) {
          this.isminTotalVATPrice = false;
          if (this.searchDealsForm.value?.minTotalVATPrice.length >= 1) {
            this.isminTotalVATPrice = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxTotalVATPrice':
        if (
          this.searchDealsForm.value?.maxTotalVATPrice.length >= 1 ||
          (e.target.value.length == 0 && this.ismaxTotalVATPrice)
        ) {
          this.ismaxTotalVATPrice = false;
          if (this.searchDealsForm.value?.maxTotalVATPrice.length >= 1) {
            this.ismaxTotalVATPrice = true;
          }

          this.filterDeals();
        }
        break;

      

      case 'Deposit':
        if (
          this.searchDealsForm.value?.filterDeposit.length >= 1 ||
          (e.target.value.length == 0 && this.isDeposit)
        ) {
          this.isDeposit = false;
          if (this.searchDealsForm.value?.filterDeposit.length >= 1) {
            this.isDeposit = true;
          }

          this.filterDeals();
        }
        break;

      case 'minOwnerAgencyFee':
        if (
          this.searchDealsForm.value?.minOwnerAgencyFee.length >= 1 ||
          (e.target.value.length == 0 && this.isminOwnerAgencyFee)
        ) {
          this.isminOwnerAgencyFee = false;
          if (this.searchDealsForm.value?.minOwnerAgencyFee.length >= 1) {
            this.isminOwnerAgencyFee = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxOwnerAgencyFee':
        if (
          this.searchDealsForm.value?.maxOwnerAgencyFee.length >= 1 ||
          (e.target.value.length == 0 && this.ismaxOwnerAgencyFee)
        ) {
          this.ismaxOwnerAgencyFee = false;
          if (this.searchDealsForm.value?.maxOwnerAgencyFee.length >= 1) {
            this.ismaxOwnerAgencyFee = true;
          }

          this.filterDeals();
        }
        break;

      case 'minLeadAgencyFee':
        if (
          this.searchDealsForm.value?.minLeadAgencyFee.length >= 1 ||
          (e.target.value.length == 0 && this.isminLeadAgencyFee)
        ) {
          this.isminLeadAgencyFee = false;
          if (this.searchDealsForm.value?.minLeadAgencyFee.length >= 1) {
            this.isminLeadAgencyFee = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxLeadAgencyFee':
        if (
          this.searchDealsForm.value?.maxLeadAgencyFee.length >= 1 ||
          (e.target.value.length == 0 && this.ismaxLeadAgencyFee)
        ) {
          this.ismaxLeadAgencyFee = false;
          if (this.searchDealsForm.value?.maxLeadAgencyFee.length >= 1) {
            this.ismaxLeadAgencyFee = true;
          }

          this.filterDeals();
        }
        break;

      case 'minGrossCommission':
        if (
          this.searchDealsForm.value?.minGrossCommission.length >= 1 ||
          (e.target.value.length == 0 && this.isminGrossCommission)
        ) {
          this.isminGrossCommission = false;
          if (this.searchDealsForm.value?.minGrossCommission.length >= 1) {
            this.isminGrossCommission = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxGrossCommission':
        if (
          this.searchDealsForm.value?.maxGrossCommission.length >= 1 ||
          (e.target.value.length == 0 && this.ismaxGrossCommission)
        ) {
          this.ismaxGrossCommission = false;
          if (this.searchDealsForm.value?.maxGrossCommission.length >= 1) {
            this.ismaxGrossCommission = true;
          }

          this.filterDeals();
        }
        break;

      case 'CommissionVATAmount':
        if (
          this.searchDealsForm.value?.filterCommissionVATAmount.length >= 1 ||
          (e.target.value.length == 0 && this.isCommissionVATAmount)
        ) {
          this.isCommissionVATAmount = false;
          if (
            this.searchDealsForm.value?.filterCommissionVATAmount.length >= 1
          ) {
            this.isCommissionVATAmount = true;
          }

          this.filterDeals();
        }
        break;

      case 'mintotalcommissionVATAmount':
        if (
          this.searchDealsForm.value?.mintotalcommissionVATAmount.length >= 1 ||
          (e.target.value.length == 0 && this.ismintotalcommissionVATAmount)
        ) {
          this.ismintotalcommissionVATAmount = false;
          if (
            this.searchDealsForm.value?.mintotalcommissionVATAmount.length >= 1
          ) {
            this.ismintotalcommissionVATAmount = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxtotalcommissionVATAmount':
        if (
          this.searchDealsForm.value?.maxtotalcommissionVATAmount.length >= 1 ||
          (e.target.value.length == 0 && this.ismaxtotalcommissionVATAmount)
        ) {
          this.ismaxtotalcommissionVATAmount = false;
          if (
            this.searchDealsForm.value?.maxtotalcommissionVATAmount.length >= 1
          ) {
            this.ismaxtotalcommissionVATAmount = true;
          }

          this.filterDeals();
        }
        break;

      case 'ExternalReferralName':
        if (
          this.searchDealsForm.value?.filterExternalReferralName.length >= 3 ||
          (e.target.value.length == 0 && this.isExternalReferralName)
        ) {
          this.isExternalReferralName = false;
          if (
            this.searchDealsForm.value?.filterExternalReferralName.length >= 3
          ) {
            this.isExternalReferralName = true;
          }

          this.filterDeals();
        }
        break;

      case 'minExternalReferralCommisionPer':
        if (
          this.searchDealsForm.value?.minExternalReferralCommisionPer.length >=
            1 ||
          (e.target.value.length == 0 && this.isminExternalReferralCommisionPer)
        ) {
          this.isminExternalReferralCommisionPer = false;
          if (
            this.searchDealsForm.value?.minExternalReferralCommisionPer
              .length >= 1
          ) {
            this.isminExternalReferralCommisionPer = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxExternalReferralCommisionPer':
        if (
          this.searchDealsForm.value?.maxExternalReferralCommisionPer.length >=
            1 ||
          (e.target.value.length == 0 && this.ismaxExternalReferralCommisionPer)
        ) {
          this.ismaxExternalReferralCommisionPer = false;
          if (
            this.searchDealsForm.value?.maxExternalReferralCommisionPer
              .length >= 1
          ) {
            this.ismaxExternalReferralCommisionPer = true;
          }

          this.filterDeals();
        }
        break;

      case 'minExternalReferralCommisionAmount':
        if (
          this.searchDealsForm.value?.minExternalReferralCommisionAmount
            .length >= 1 ||
          (e.target.value.length == 0 && this.isminExternalReferralCommisionAmount)
        ) {
          this.isminExternalReferralCommisionAmount = false;
          if (
            this.searchDealsForm.value?.minExternalReferralCommisionAmount
              .length >= 1
          ) {
            this.isminExternalReferralCommisionAmount = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxExternalReferralCommisionAmount':
        if (
          this.searchDealsForm.value?.maxExternalReferralCommisionAmount
            .length >= 1 ||
          (e.target.value.length == 0 && this.ismaxExternalReferralCommisionAmount)
        ) {
          this.ismaxExternalReferralCommisionAmount = false;
          if (
            this.searchDealsForm.value?.maxExternalReferralCommisionAmount
              .length >= 1
          ) {
            this.ismaxExternalReferralCommisionAmount = true;
          }

          this.filterDeals();
        }
        break;

      case 'minYourCompanyCommisionPer':
        if (
          this.searchDealsForm.value?.minYourCompanyCommisionPer.length >= 1 ||
          (e.target.value.length == 0 && this.isminYourCompanyCommisionPer)
        ) {
          this.isminYourCompanyCommisionPer = false;
          if (
            this.searchDealsForm.value?.minYourCompanyCommisionPer.length >= 1
          ) {
            this.isminYourCompanyCommisionPer = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxYourCompanyCommisionPer':
        if (
          this.searchDealsForm.value?.maxYourCompanyCommisionPer.length >= 1 ||
          (e.target.value.length == 0 && this.ismaxYourCompanyCommisionPer)
        ) {
          this.ismaxYourCompanyCommisionPer = false;
          if (
            this.searchDealsForm.value?.maxYourCompanyCommisionPer.length >= 1
          ) {
            this.ismaxYourCompanyCommisionPer = true;
          }

          this.filterDeals();
        }
        break;

      case 'minYourCompanyCommisionAmount':
        if (
          this.searchDealsForm.value?.minYourCompanyCommisionAmount.length >=
            1 ||
          (e.target.value.length == 0 && this.minYourCompanyCommisionAmount)
        ) {
          this.minYourCompanyCommisionAmount = false;
          if (
            this.searchDealsForm.value?.minYourCompanyCommisionAmount.length >=
            1
          ) {
            this.minYourCompanyCommisionAmount = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxYourCompanyCommisionAmount':
        if (
          this.searchDealsForm.value?.maxYourCompanyCommisionAmount.length >=
            1 ||
          (e.target.value.length == 0 && this.ismaxYourCompanyCommisionAmount)
        ) {
          this.ismaxYourCompanyCommisionAmount = false;
          if (
            this.searchDealsForm.value?.maxYourCompanyCommisionAmount.length >=
            1
          ) {
            this.ismaxYourCompanyCommisionAmount = true;
          }

          this.filterDeals();
        }
        break;

      case 'minCommisionPer':
        if (
          this.searchDealsForm.value?.minCommisionPer.length >= 1 ||
          (e.target.value.length == 0 && this.isminCommisionPer)
        ) {
          this.isminCommisionPer = false;
          if (this.searchDealsForm.value?.minCommisionPer.length >= 1) {
            this.isminCommisionPer = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxCommisionPer':
        if (
          this.searchDealsForm.value?.maxCommisionPer.length >= 1 ||
          (e.target.value.length == 0 && this.ismaxCommisionPer)
        ) {
          this.ismaxCommisionPer = false;
          if (this.searchDealsForm.value?.maxCommisionPer.length >= 1) {
            this.ismaxCommisionPer = true;
          }

          this.filterDeals();
        }
        break;

      case 'minCommisionAmount':
        if (
          this.searchDealsForm.value?.minCommisionAmount.length >= 1 ||
          (e.target.value.length == 0 && this.isminCommisionAmount)
        ) {
          this.isminCommisionAmount = false;
          if (this.searchDealsForm.value?.minCommisionAmount.length >= 1) {
            this.isminCommisionAmount = true;
          }

          this.filterDeals();
        }
        break;

      case 'maxCommisionAmount':
        if (
          this.searchDealsForm.value?.maxCommisionAmount.length >= 1 ||
          (e.target.value.length == 0 && this.ismaxCommisionAmount)
        ) {
          this.ismaxCommisionAmount = false;
          if (this.searchDealsForm.value?.maxCommisionAmount.length >= 1) {
            this.ismaxCommisionAmount = true;
          }

          this.filterDeals();
        }
        break;
    }
  } 

  openColumnSettings(): Promise<boolean> {
    let columnOrder = this.columnOrder
    this.tempcolumnOrder = JSON.parse(JSON.stringify(columnOrder));
    return new Promise<boolean>((resolve) => {
      this.modalColumnRef = this.modalColumnService.open(this.modalcolumnContent, { size: 'md' });
      this.modalColumnRef.result.then(resolve, resolve);
    });
  }

  async closeColumnSettings(): Promise<void> {
    this.modalColumnRef.close(this.modalConfig);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tempcolumnOrder, event.previousIndex, event.currentIndex);
  }

  saveColumnSettings() {
    this.IsLoading = true;
    let tempColumnOrder:any = this.tempcolumnOrder;
    this.columnOrder = JSON.parse(JSON.stringify(tempColumnOrder));
    this.dealsService.saveColumnOrder({
      userId: this.userData.id,
      tableName: 'Deals',
      columnDetails: this.columnOrder
    }).subscribe((data:any) => {
      this.IsLoading = false;
      this.cdr.detectChanges();
      this.closeColumnSettings();
    })
  }

  getColumnOrder(){
      this.IsLoading = true;
      this.dealsService
        .getColumnOrder(this.userData.id,'Deals')
        .subscribe((data: any | undefined) => {
          if(data != null && data.length > 0) {
          this.columnOrder = data;
          }
          else {
            this.columnOrder = this.DeafultcolumnOrder;
          }
          this.getAllDeals();
          this.IsLoading = false;
        });

      }


}
