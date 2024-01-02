import {
  Component,
  ViewChild,
  TemplateRef,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from 'src/app/_metronic/partials/layout/modals/modal.config';
import { AuthService } from 'src/app/modules/auth';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { LeadsService } from 'src/app/modules/auth/services/leads.service';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { environment } from 'src/environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-leads-table',
  templateUrl: './leads-table.component.html',
  styleUrls: ['./leads-table.component.scss'],
})
export class LeadsTableComponent {
  @Input() public modalConfig: ModalConfig;
  @ViewChild('Advancemodal')
  private modalContent: TemplateRef<LeadsTableComponent>;
  imgUrl = environment.imgUrl;
  totalRecord: any;
  isApplyFilter: boolean;
  isSelectAllLeads:boolean = false;
  changeSearchList:any;
  page = 1;
  itemsPerPage = 25;
  companySettings:any;
  totalItems: any;
  isAddLeadsPermission: boolean = false;
  selectedLeadId:number = 0;
  IsLoading: boolean;
  ContactBasicForm: FormGroup;
  exportListningId:any = [];
  LeadTypeList: any[] = [];
  AllStatusType: any[] = [];
  AllSubStatusType: any[] = [];
  AllPriorityType: any[] = [];
  AllLocation: any[] = [];
  AllSubLocation: any[] = [];
  sourceOfListingList: any[] = [];
  AllCategory: any[] = [];
  AllEmirates: any[] = [];
  userList:any = [];
  AllLeadFinance :any[] = [];
  AllBeds: any[] = [];
  data:any ={
    'AddLeads':true,
    'EditLeads':false,
    'Id':0
  }
  advancefillterForm = {
    reference:'',
    statusId:null,
    subStatusId:null,
    leadTypeId:null,
    leadFinanceId:null,
    priorityId:null,
    hot:null,
    firstName:'',
    lastName:'',
    phone:'',
    personalMobile:'',
    workMobile:'',
    otherMobile:'',
    personalPhone:'',
    workPhone:'',
    otherPhone:'',
    personalEmail:'',
    workEmail:'',
    otherEmail:'',
    categoryId:null,
    listingRef:'',
    emirateId:null,
    locationId:null,
    subLocationId:null,
    beds:null,
    minBedId:null,
    maxBedId:null,
    price:'',
    minPrice:'',
    maxPrice:'',
    minBUA:'',
    maxBUA:'',
    builtupArea:'',
    layoutType:null,
    unit:'',
    sourceId:null,
    agentId:null,
    fromEnquiryDate:null,
    toEnquiryDate:null,
    fromDateUpdated:null,
    toDateUpdated:null,
    agentReferral:null,
    contactCompany:null,
    email:'',
    fromCreated:'',
    fromUpdated:'',
    contactRef:'',
    updatedBy:null,
    createdBy:null
  }
  AgentList: any = [];
  private AdvanceFilter: NgbModalRef;
  getDataon2: boolean = false;
  filterDataValue: any = '';
  propertyTypeList: any[] = [];
  leadsDetails: any[] = [];
  userData:any;
  isDraweropen:boolean = false;

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
      column: 'Contact Reference',
      isVisible: true,
    },
    {
      column: 'First Name',
      isVisible: true,
    },
    {
      column: 'Last Name',
      isVisible: true,
    },
    {
      column: 'Personal Mobile',
      isVisible: true,
    }, 
    {
      column: 'Work Mobile',
      isVisible: true,
    },
    {
      column: 'Other Mobile',
      isVisible:true,
    }, 
    {
      column: 'Personal Phone',
      isVisible: true,
    },
    {
      column: 'Work Phone',
      isVisible: true,
    },
    {
      column: 'Other Phone',
      isVisible: true,
    },
    {
      column: 'Personal Email',
      isVisible: true,
    },
    {
      column: 'Work Email',
      isVisible: true
    }, 
    {
      column: 'Other Email',
      isVisible: true,
    }, 
    {
      column: 'Enquiry Date',
      isVisible: true,
    },
    {
      column: 'Lead Type',
      isVisible: true,
    },
    {
      column: 'Finance',
      isVisible: true,
    },
    {
      column: 'Priority',
      isVisible: true,
    },
    {
      column: 'Hot Lead',
      isVisible: true,
    },
    {
      column: 'Source',
      isVisible: true,
    },
    {
      column: 'Agent Referral',
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
      column: 'Emirate',
      isVisible: true,
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
      column: 'Beds',
      isVisible: true,
    },
    {
      column: 'Price',
      isVisible: true,
    },
    {
      column: 'Built-up Area',
      isVisible: true,
    },
    {
      column: 'Layout Type',
      isVisible: true,
    },
    {
      column: 'Unit',
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
  @ViewChild('columnSettingmodal') private modalcolumnContent: TemplateRef<LeadsTableComponent>;
  private modalColumnRef: NgbModalRef;
  constructor(
    private leadsService: LeadsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private listingSevice: ListingService,
    private cdr: ChangeDetectorRef,
    private dropdownService: DropdownService,
    private authService: AuthService,
    private modalColumnService: NgbModal
  ) {}
  ngOnInit(): void {
    var uData = this.authService.userValue;
  if(uData != null){
  this.userData= JSON.parse(uData);
  this.isAddLeadsPermission = this.userData.permissionAccess.filter((x:any) => x.permissionId == 11).length > 0;
  }
  this.authService.companySetting.subscribe((data:any) => {
    this.companySettings = data;
  })

  this.leadsService.IsOpenDrawer.subscribe((x:any) => {
    if(x != null) {
      this.isDraweropen = x;
    }
  })

    this.IsLoading = true;
    this.setDetailsListing();
    this.getAllLeadType();
    this.getAllLeadStatus();
    this.getAllLeadSubStatus();
    this.getAllLeadPriority();
    this.getAllLocation();
    this.getAllSubLocation();
    this.getAllSourceOfListing();
    this.getAssignedTo();
    this.getProperyType();
    this.getAllEmirates();
    this.getAllBeds();
    this.getAllLeadFinance();
    this.getAllUser();
    this.getColumnOrder();
    
    this.leadsService.selectedLeadId.subscribe((data:any) => {
      this.selectedLeadId = data;
      this.leadsDetails = this.leadsDetails.map((x:any) => ({
        ...x,
        isSelected: false
      }));
    } )
    this.leadsService.isCallLead.pipe().subscribe((data: any) => {
      if (data) {
        this.leadData(
          this.ContactBasicForm.value.sortFiled,
          this.ContactBasicForm.value.sortDirection,
          this.page,
          this.itemsPerPage
        );
      } else {
      }
      this.leadsService.selectedLeadId.subscribe((data:any) => {
        this.selectedLeadId = data;
      } )
    });
  }

  openAdvanceFilter(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.isApplyFilter = false;
      this.AdvanceFilter = this.modalService.open(this.modalContent, {
        size: 'xl',
      });
      this.AdvanceFilter.result.then(resolve, resolve);
    });
  }

  async close(): Promise<void> {
    this.IsLoading = true;
    this.leadData(
      this.ContactBasicForm.value.sortFiled,
      this.ContactBasicForm.value.sortDirection,
      this.page,
      this.itemsPerPage
    );
    this.AdvanceFilter.close(this.modalConfig);
  }
  closeAdvanceSearchPopup(){
    this.AdvanceFilter.close(this.modalConfig);
    this.ContactBasicForm.controls['reference'].setValue(this.changeSearchList.reference);
    this.ContactBasicForm.controls['statusId'].setValue(this.changeSearchList.statusId);
    this.ContactBasicForm.controls['subStatusId'].setValue(this.changeSearchList.subStatusId);
    this.ContactBasicForm.controls['leadTypeId'].setValue(this.changeSearchList.leadTypeId);
    this.ContactBasicForm.controls['leadFinanceId'].setValue(this.changeSearchList.leadFinanceId);
    this.ContactBasicForm.controls['priorityId'].setValue(this.changeSearchList.priorityId);
    this.ContactBasicForm.controls['hot'].setValue(this.changeSearchList.hot);
    this.ContactBasicForm.controls['firstName'].setValue(this.changeSearchList.firstName);
    this.ContactBasicForm.controls['lastName'].setValue(this.changeSearchList.lastName);
    this.ContactBasicForm.controls['phone'].setValue(this.changeSearchList.phone);
    this.ContactBasicForm.controls['personalMobile'].setValue(this.changeSearchList.personalMobile);
    this.ContactBasicForm.controls['workMobile'].setValue(this.changeSearchList.workMobile);
    this.ContactBasicForm.controls['otherMobile'].setValue(this.changeSearchList.otherMobile);
    this.ContactBasicForm.controls['personalPhone'].setValue(this.changeSearchList.personalPhone);
    this.ContactBasicForm.controls['workPhone'].setValue(this.changeSearchList.workPhone);
    this.ContactBasicForm.controls['otherPhone'].setValue(this.changeSearchList.otherPhone);
    this.ContactBasicForm.controls['personalEmail'].setValue(this.changeSearchList.personalEmail);
    this.ContactBasicForm.controls['workEmail'].setValue(this.changeSearchList.workEmail);
    this.ContactBasicForm.controls['otherEmail'].setValue(this.changeSearchList.otherEmail);
    this.ContactBasicForm.controls['categoryId'].setValue(this.changeSearchList.categoryId);
    this.ContactBasicForm.controls['listingRef'].setValue(this.changeSearchList.listingRef);
    this.ContactBasicForm.controls['emirateId'].setValue(this.changeSearchList.emirateId);
    this.ContactBasicForm.controls['locationId'].setValue(this.changeSearchList.locationId);
    this.ContactBasicForm.controls['subLocationId'].setValue(this.changeSearchList.subLocationId);
    this.ContactBasicForm.controls['beds'].setValue(this.changeSearchList.beds);
    this.ContactBasicForm.controls['minBedId'].setValue(this.changeSearchList.minBedId);
    this.ContactBasicForm.controls['maxBedId'].setValue(this.changeSearchList.maxBedId);
    this.ContactBasicForm.controls['price'].setValue(this.changeSearchList.price);
    this.ContactBasicForm.controls['minPrice'].setValue(this.changeSearchList.minPrice);
    this.ContactBasicForm.controls['maxPrice'].setValue(this.changeSearchList.maxPrice);
    this.ContactBasicForm.controls['minBUA'].setValue(this.changeSearchList.minBUA);
    this.ContactBasicForm.controls['maxBUA'].setValue(this.changeSearchList.maxBUA);
    this.ContactBasicForm.controls['builtupArea'].setValue(this.changeSearchList.builtupArea);
    this.ContactBasicForm.controls['layoutType'].setValue(this.changeSearchList.layoutType);
    this.ContactBasicForm.controls['unit'].setValue(this.changeSearchList.unit);
    this.ContactBasicForm.controls['sourceId'].setValue(this.changeSearchList.sourceId);
    this.ContactBasicForm.controls['agentId'].setValue(this.changeSearchList.agentId);
    this.ContactBasicForm.controls['fromEnquiryDate'].setValue(this.changeSearchList.fromEnquiryDate);
    this.ContactBasicForm.controls['toEnquiryDate'].setValue(this.changeSearchList.toEnquiryDate);
    this.ContactBasicForm.controls['fromDateUpdated'].setValue(this.changeSearchList.fromDateUpdated);
    this.ContactBasicForm.controls['toDateUpdated'].setValue(this.changeSearchList.toDateUpdated);
    this.ContactBasicForm.controls['agentReferral'].setValue(this.changeSearchList.agentReferral);
    this.ContactBasicForm.controls['shareThisLead'].setValue(this.changeSearchList.shareThisLead);
    this.ContactBasicForm.controls['contactCompany'].setValue(this.changeSearchList.contactCompany);
    this.ContactBasicForm.controls['email'].setValue(this.changeSearchList.email);
    this.ContactBasicForm.controls['fromCreated'].setValue(this.changeSearchList.fromCreated);
    this.ContactBasicForm.controls['toCreated'].setValue(this.changeSearchList.toCreated);
    this.ContactBasicForm.controls['fromUpdated'].setValue(this.changeSearchList.fromUpdated);
    this.ContactBasicForm.controls['leadsTypes'].setValue(this.changeSearchList.leadsTypes);
    this.ContactBasicForm.controls['toUpdated'].setValue(this.changeSearchList.toUpdated);
    this.ContactBasicForm.controls['contactRef'].setValue(this.changeSearchList.contactRef);
    this.ContactBasicForm.controls['updatedBy'].setValue(this.changeSearchList.updatedBy);
    this.ContactBasicForm.controls['createdBy'].setValue(this.changeSearchList.createdBy);

  }
  onAdd() {
    this.data.AddLeads=true;
    this.data.EditLeads = false;
    this.data.Id = 0;
    this.leadsService.OpenLeads(this.data);
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
  }
  getAllBeds() {
    this.leadsService.getAllBeds().subscribe((data: any) => {
      this.AllBeds = data;
    });
  }
  getAllUser() {
    this.dropdownService
    .GetAllAssignedToByCompany(this.userData.companyId)
    .subscribe((data: any | undefined) => {
      this.userList = data;
    });
  }
  getAllLeadFinance() {
    this.leadsService.getAllLeadFinance().subscribe((data: any) => {
      this.AllLeadFinance = data;
    });
  }
  setDetailsListing() {
    this.ContactBasicForm = this.formBuilder.group({
      reference: [''],
      statusId: [null],
      subStatusId: [null],
      leadTypeId: [null],
      leadFinanceId:[null],
      priorityId: [null],
      hot: [null],
      firstName: [''],
      lastName: [''],
      phone: [''],
      personalMobile: [''],
      workMobile: [''],
      otherMobile: [''],
      personalPhone: [''],
      workPhone: [''],
      otherPhone: [''],
      personalEmail: [''],
      workEmail: [''],
      otherEmail: [''],
      categoryId:[null],
      listingRef:[''],
      emirateId: [null],
      locationId:[null],
      subLocationId: [null],
      beds: [null],
      minBedId: [null],
      maxBedId: [null],
      price: [''],
      minPrice: [''],
      maxPrice: [''],
      minBUA: [''],
      maxBUA: [''],
      builtupArea:[''],
      layoutType: [''],
      unit: [''],
      sourceId: [null],
      agentId:[null],
      fromEnquiryDate: [''],
      toEnquiryDate: [''],
      fromDateUpdated: [''],
      toDateUpdated: [''],
      agentReferral: [null],
      shareThisLead: [null],
      contactCompany: [null],
      email: [''],
      fromCreated: [''],
      toCreated:[''],
      fromUpdated: [''],
      leadsTypes:new FormControl('1'),
      toUpdated: [''],
      contactRef:[''],
      page: [1],
      itemsPerPage: [this.itemsPerPage],
      sortFiled: ['Updated'],
      sortDirection: [true],
      companyId: this.userData.companyId,
      roleId: this.userData.roleId,
      userId: this.userData.id,
      updatedBy:[null],
      createdBy:[null]
    });
    this.advancefillterForm = this.ContactBasicForm.value;

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

  getAllLocation() {
    this.leadsService.getAllLocation().subscribe((data: any) => {
      this.AllLocation = data;
    });
  }

  getAllSubLocation() {
    this.leadsService.getAllSubLocation().subscribe((data: any) => {
      this.AllSubLocation = data;
    });
  }

  getAllSourceOfListing() {
    this.listingSevice.getAllSourceOfListing().subscribe((data: any) => {
      this.sourceOfListingList = data;
    });
  }

  getAllCategory() {
    this.leadsService.getAllCategory().subscribe((data: any) => {
      this.AllCategory = data;
    });
  }
  getAllEmirates() {
    this.leadsService.getAllEmirates().subscribe((data: any) => {
      this.AllEmirates = data;
    });
  }
  SelectAllLeads(event:any) {
    if(event.target.checked) {
      this.isSelectAllLeads = true;
      var leadsData = this.leadsDetails;
      leadsData.forEach((x:any) => {
      x.isSelected = true;
    });
      this.exportListningId = (this.leadsDetails.filter((x:any) => x.isSelected == true).map((z:any) => z.id));
    }
    else {
      this.isSelectAllLeads = false;
      var leadsData = this.leadsDetails;
      leadsData.forEach((x:any) => {
      x.isSelected = false;
    });
    this.exportListningId = [];
    }
    this.cdr.detectChanges();    
  }
  onAdvanceFilter() {
    this.isApplyFilter = true;
    if (this.isApplyFilter) {
      this.ContactBasicForm.controls['reference'].setValue(this.ContactBasicForm.value?.reference);
      this.ContactBasicForm.controls['statusId'].setValue(this.ContactBasicForm.value.statusId);
      this.ContactBasicForm.controls['subStatusId'].setValue(this.ContactBasicForm.value.subStatusId);
      this.ContactBasicForm.controls['leadTypeId'].setValue(this.ContactBasicForm.value.leadTypeId);
      this.ContactBasicForm.controls['leadFinanceId'].setValue(this.ContactBasicForm.value.leadFinanceId);
      this.ContactBasicForm.controls['priorityId'].setValue(this.ContactBasicForm.value.priorityId);
      this.ContactBasicForm.controls['hot'].setValue(this.ContactBasicForm.value.hot);
      this.ContactBasicForm.controls['firstName'].setValue(this.ContactBasicForm.value.firstName);
      this.ContactBasicForm.controls['lastName'].setValue(this.ContactBasicForm.value.lastName);
      this.ContactBasicForm.controls['phone'].setValue(this.ContactBasicForm.value.phone);
      this.ContactBasicForm.controls['personalMobile'].setValue(this.ContactBasicForm.value.personalMobile);
      this.ContactBasicForm.controls['workMobile'].setValue(this.ContactBasicForm.value.workMobile);
      this.ContactBasicForm.controls['otherMobile'].setValue(this.ContactBasicForm.value.otherMobile);
      this.ContactBasicForm.controls['personalPhone'].setValue(this.ContactBasicForm.value.personalPhone);
      this.ContactBasicForm.controls['workPhone'].setValue(this.ContactBasicForm.value.workPhone);
      this.ContactBasicForm.controls['otherPhone'].setValue(this.ContactBasicForm.value.otherPhone);
      this.ContactBasicForm.controls['personalEmail'].setValue(this.ContactBasicForm.value.personalEmail);
      this.ContactBasicForm.controls['workEmail'].setValue(this.ContactBasicForm.value.workEmail);
      this.ContactBasicForm.controls['otherEmail'].setValue(this.ContactBasicForm.value.otherEmail);
      this.ContactBasicForm.controls['categoryId'].setValue(this.ContactBasicForm.value.categoryId);
      this.ContactBasicForm.controls['listingRef'].setValue(this.ContactBasicForm.value.listingRef);
      this.ContactBasicForm.controls['emirateId'].setValue(this.ContactBasicForm.value.emirateId);
      this.ContactBasicForm.controls['locationId'].setValue(this.ContactBasicForm.value.locationId);
      this.ContactBasicForm.controls['subLocationId'].setValue(this.ContactBasicForm.value.subLocationId);
      this.ContactBasicForm.controls['beds'].setValue(this.ContactBasicForm.value.beds);
      this.ContactBasicForm.controls['minBedId'].setValue(this.ContactBasicForm.value.minBedId);
      this.ContactBasicForm.controls['maxBedId'].setValue(this.ContactBasicForm.value.maxBedId);
      this.ContactBasicForm.controls['price'].setValue(this.ContactBasicForm.value.price);
      this.ContactBasicForm.controls['minPrice'].setValue(this.ContactBasicForm.value.minPrice);
      this.ContactBasicForm.controls['maxPrice'].setValue(this.ContactBasicForm.value.maxPrice);
      this.ContactBasicForm.controls['minBUA'].setValue(this.ContactBasicForm.value.minBUA);
      this.ContactBasicForm.controls['maxBUA'].setValue(this.ContactBasicForm.value.maxBUA);
      this.ContactBasicForm.controls['builtupArea'].setValue(this.ContactBasicForm.value.builtupArea);
      this.ContactBasicForm.controls['layoutType'].setValue(this.ContactBasicForm.value.layoutType);
      this.ContactBasicForm.controls['unit'].setValue(this.ContactBasicForm.value.unit);
      this.ContactBasicForm.controls['sourceId'].setValue(this.ContactBasicForm.value.sourceId);
      this.ContactBasicForm.controls['agentId'].setValue(this.ContactBasicForm.value.agentId);
      this.ContactBasicForm.controls['fromEnquiryDate'].setValue(this.ContactBasicForm.value.fromEnquiryDate);
      this.ContactBasicForm.controls['toEnquiryDate'].setValue(this.ContactBasicForm.value.toEnquiryDate);
      this.ContactBasicForm.controls['fromDateUpdated'].setValue(this.ContactBasicForm.value.fromDateUpdated);
      this.ContactBasicForm.controls['toDateUpdated'].setValue(this.ContactBasicForm.value.toDateUpdated);
      this.ContactBasicForm.controls['agentReferral'].setValue(this.ContactBasicForm.value.agentReferral);
      this.ContactBasicForm.controls['shareThisLead'].setValue(this.ContactBasicForm.value.shareThisLead);
      this.ContactBasicForm.controls['contactCompany'].setValue(this.ContactBasicForm.value.contactCompany);
      this.ContactBasicForm.controls['email'].setValue(this.ContactBasicForm.value.email);
      this.ContactBasicForm.controls['fromCreated'].setValue(this.ContactBasicForm.value.fromCreated);
      this.ContactBasicForm.controls['toCreated'].setValue(this.ContactBasicForm.value.toCreated);
      this.ContactBasicForm.controls['fromUpdated'].setValue(this.ContactBasicForm.value.fromUpdated);
      this.ContactBasicForm.controls['leadsTypes'].setValue(this.ContactBasicForm.value.leadsTypes);
      this.ContactBasicForm.controls['toUpdated'].setValue(this.ContactBasicForm.value.toUpdated);
      this.ContactBasicForm.controls['contactRef'].setValue(this.ContactBasicForm.value.contactRef);
      this.ContactBasicForm.controls['updatedBy'].setValue(this.ContactBasicForm.value.updatedBy);
      this.ContactBasicForm.controls['createdBy'].setValue(this.ContactBasicForm.value.createdBy);
      this.advancefillterForm = this.ContactBasicForm.value;
    }
    this.changeSearchList = this.ContactBasicForm.value;
  }
  onFilterSelectionAdvanceFilter(name: any, e: any) {
    switch (e) {
      case undefined:
        this.ContactBasicForm.controls[name]?.setValue(null);
        break;
      default:
        this.ContactBasicForm.controls[name]?.setValue(e);
        break;
    }
  }
  onFilterSelectionAdvanceTextFilter(name: any, e: any) {
    this.ContactBasicForm.controls[name].setValue(e.target.value);
    if (e.target.value.length > 2) {
      this.getDataon2 = true;
      this.filterDataValue = e.target.value;
    }
    if (this.filterDataValue != '' && e.target.value.length == 0) {
      this.filterDataValue = '';
    }
  }
  leadData(sortFiled: any, sortDirection: any, page: any, itemPerPage: any) {
    this.IsLoading = true;
    this.ContactBasicForm.controls['sortFiled'].setValue(sortFiled);
    this.ContactBasicForm.controls['sortDirection'].setValue(sortDirection);
    this.ContactBasicForm.controls['page'].setValue(page);
    this.ContactBasicForm.controls['itemsPerPage'].setValue(this.itemsPerPage);
    this.leadsService
      .getAllLeadDetailsUsiFilter(this.ContactBasicForm.value)
      .subscribe(
        (data: any | undefined) => {
          this.changeSearchList = this.ContactBasicForm.value;
          this.leadsDetails = data;
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
  }
  onFilterSelection(name: any, e: any, page: any, itemPerPage: any) {
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

  onFilterDateSelection(name: any, e: any, page: any, itemPerPage: any) {
    this.page = 1;
    this.ContactBasicForm.controls['page'].setValue(this.page);
    this.ContactBasicForm.controls['itemsPerPage'].setValue(this.itemsPerPage);
    this.ContactBasicForm.controls[name]?.setValue(e.target.value);
    this.leadData(
      this.ContactBasicForm.value.sortFiled,
      this.ContactBasicForm.value.sortDirection,
      page,
      itemPerPage
    );
  }

  onFilterSelectionDrp(name: any, e: any, page: any, itemPerPage: any) {
    this.page = 1;
    this.ContactBasicForm.controls['page'].setValue(this.page);
    this.ContactBasicForm.controls['itemsPerPage'].setValue(this.itemsPerPage);
    switch (e) {
      case undefined:
        this.ContactBasicForm.controls[name]?.setValue(null);
        break;
      default:
        this.ContactBasicForm.controls[name]?.setValue(e);
        break;
    }
    this.leadData(
      this.ContactBasicForm.value.sortFiled,
      this.ContactBasicForm.value.sortDirection,
      page,
      itemPerPage
    );
  }
  onSwitchChange(field: any, e: any) {
    this.ContactBasicForm.controls[field].setValue(e.target.checked);
    this.leadData(
      this.ContactBasicForm.value.sortFiled,
      this.ContactBasicForm.value.sortDirection,
      1,
      this.itemsPerPage
    );
  }
  SelectListningDataTable(event:any,id:any){
    if(event.target.checked) {
      this.exportListningId.push(id);
      var leadsDatalList = this.leadsDetails.length;
      var selectedDetailList = this.leadsDetails.filter((x:any) => x.isSelected == true).length;
      if(leadsDatalList == selectedDetailList) {
        this.isSelectAllLeads = true;
      }
      else {
        this.isSelectAllLeads = false;
      }
    }
    else {
      const index:number = this.exportListningId.indexOf(id);
      if(index !== -1) {
        this.exportListningId.splice(index,1);
      }
      var leadsDatalList = this.leadsDetails.length;
      var selectedDetailList = this.leadsDetails.filter((x:any) => x.isSelected == true).length;
      if(leadsDatalList == selectedDetailList) {
        this.isSelectAllLeads = true;
      }
      else {
        this.isSelectAllLeads = false;
      }
    }
    this.cdr.detectChanges();  }
  onEdit(value: any) {
    this.data.AddLeads=false;
    this.data.EditLeads = true;
    this.data.Id = value;
    this.selectedLeadId = value;
    var contact = this.leadsDetails.find((x:any) => x.id == value);
    contact.isSelected = true;

    var notcontact = this.leadsDetails.filter((x:any) => x.id != value);
    notcontact.forEach((x:any) => {
      x.isSelected = false;
    });
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
    this.leadsService.OpenLeads(this.data);
  }
  getMobile(type:any,data:any) {
    var mobile = data?.filter((x:any) => x.mobileType == type);
    if(mobile.length > 0) {
      return mobile.map((x:any) => x.countryCodeString + " " + x.mobile).join(", ");
    }
    else {
      return '';
    }
  }
  getPhone(type:any,data:any) {
    var mobile = data?.filter((x:any) => x.phoneType == type);
    if(mobile.length > 0) {
      return mobile.map((x:any) => x.countryCodeString + " " + x.phone).join(", ");
    }
    else {
      return '';
    }
  }

  getEmail(type:any,data:any) {
    var mobile = data?.filter((x:any) => x.emailType == type);
    if(mobile.length > 0) {
      return mobile.map((x:any) => x.email).join(", ");
    }
    else {
      return '';
    }
  }
  renderPage(event: number) {
    this.page = event;
    this.ContactBasicForm.controls['page'].setValue(this.page);
    this.ContactBasicForm.controls['itemsPerPage'].setValue(this.itemsPerPage);
    this.leadData(
      this.ContactBasicForm.value.sortFiled,
      this.ContactBasicForm.value.sortDirection,
      this.ContactBasicForm.value.page,
      this.ContactBasicForm.value.itemsPerPage
    );
  }
  getAssignedTo() {
    // this.listingSevice.getAssignedTo().subscribe((data: any | undefined) => {
    //   this.AgentList = data;
    // });
    this.dropdownService.getAssignedToListByCompanyAndRole(this.userData.companyId,this.userData.roleId,this.userData.id).subscribe((data) => {
      this.AgentList = data;
    });
  }
  getProperyType() {
    this.listingSevice.GetPropertyType().subscribe((data: any | undefined) => {
      this.propertyTypeList = data;
    });
  }
  ResetAdvanceFilter() {
    this.ContactBasicForm.reset();
    setTimeout(() => {
      this.setDetailsListing();
      this.leadData(
        this.ContactBasicForm.value.sortFiled,
        this.ContactBasicForm.value.sortDirection,
        this.ContactBasicForm.value.page,
        this.ContactBasicForm.value.itemsPerPage
      );
    }, 1000);
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
  exportLeads() {
    this.IsLoading = true;
    this.leadsService.DownloadExcel({
      leadIds : this.exportListningId,
      companyId: this.userData.companyId,
      sortColumn: 'Updated',
      sortDir: true,
      roleId: this.userData.roleId,
      userId: this.userData.id
    }).subscribe((data:any) => {
      this.IsLoading = false;
      this.cdr.detectChanges();
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Leads.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
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
    this.leadsService.saveColumnOrder({
      userId: this.userData.id,
      tableName: 'Leads',
      columnDetails: this.columnOrder
    }).subscribe((data:any) => {
      this.IsLoading = false;
      this.cdr.detectChanges();
      this.closeColumnSettings();
    })
  }

  getColumnOrder(){
      this.IsLoading = true;
      this.leadsService
        .getColumnOrder(this.userData.id,'Leads')
        .subscribe((data: any | undefined) => {
          if(data != null && data.length > 0) {
          this.columnOrder = data;
          }
          else {
            this.columnOrder = this.DeafultcolumnOrder;
          }
          this.leadData(
            this.ContactBasicForm.value.sortFiled,
            this.ContactBasicForm.value.sortDirection,
            this.page,
            this.itemsPerPage
          );
          this.IsLoading = false;
        });

      }
}
