import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import 'select2';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from 'src/app/_metronic/partials/layout/modals/modal.config';
import { ListingDetailComponent } from '../listing-detail/listing-detail.component';
import { Moment } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { environment } from 'src/environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-listing-table',
  templateUrl: './listing-table.component.html',
  styleUrls: ['./listing-table.component.scss'],
})
export class ListingTableComponent implements OnInit {
  private elementRef: ElementRef;
  private renderer: Renderer2;
  @ViewChild(ListingDetailComponent) AddListing: ListingDetailComponent;
  data: any = {
    AddListing: true,
    EditListing: false,
    Id: 0,
  };
  isSelectAllListing:boolean = false;
  exportListingId:any = [];
  page = 1;
  itemsPerPage = 25;
  totalItems: any;
  imgUrl = environment.imgUrl;
  propertyTypeIdTest = 0;
  IsLoading: boolean = false;
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
  displayEdit: boolean;
  listingDetails: any = [];
  selectedConstructionsStatus: any = '0';
  constructionStatusList: any[] = [];
  form: FormGroup;
  userData:any;
  isDraweropen:boolean = false;
  formAdvance = {
    listingType: 0,
    reference: '',
    status: null,
    assignedToId: null,
    usageId: null,
    purposeId: null,
    propertyTypeId: null,
    completionStatusId: null,
    bedsId: null,
    bathsId: null,
    minBUA: null,
    maxBUA: null,
    minPlotArea: null,
    maxPlotArea: null,
    furnishedId: null,
    fittedId: null,
    parkingSpaces: null,
    views: '',
    layoutType: '',
    ownershipDuration: null,
    reraPermitNumber: '',
    reraTransactionNumber: '',
    titleDeedNumber: '',
    emiratesId: null,
    locationId: null,
    subLocationId: null,
    street: '',
    floor: '',
    unitNumber: '',
    frequencyId: null,
    chequeId: null,
    minPrice: null,
    maxPrice: null,
    pricePerSqM: null,
    commisionPer: null,
    depositPer: null,
    commisionAED: null,
    depositAED: null,
    monthlyServiceCharges: null,
    languageId: null,
    title: '',
    description: '',
    youtubeVideoLink: '',
    virtualTourLink: '',
    audioTourLink: '',
    videoTourLink: '',
    qrCodeLink: '',
    school: '',
    metro: '',
    medicalCenter: '',
    shoppingMall: '',
    mosques: '',
    beach: '',
    superMarket: '',
    park: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerMobileNo: '',
    ownerEmail: '',
    tenantFirstName: '',
    tenantLastName: '',
    tenantMobileNo: '',
    tenantEmail: '',
    propertyStatusId: null,
    sourceOfListingId: null,
    fromExpirationDate: '',
    toExpirationDate: '',
    featured: null,
    managed: null,
    exclusive: null,
    dEWANumber: '',
    sTrNumber: '',
    fromNextAvailable: '',
    toNextAvailable: '',
    remindId: null,
    keyLocation: '',
    propertyTenanted: null,
    fromRentedAt: null,
    toRentedAt: null,
    fromRentedUntil: '',
    toRentedUntil: '',
    createdBy: null,
    updatedBy: null,
    fromListed: '',
    toListed: '',
    fromUpdated: '',
    toUpdated: '',
    fromLastPublishedOn: '',
    toLastPublishedOn: '',
    page: 1,
    itemsPerPage: this.itemsPerPage,
    sortFiled: 'Updated',
    sortDirection: true,
    agentEmail: '',
    createdUser:0
  };
  isAddListingPermission: boolean = false;
  propertyStatusList: any[] = [];
  sourceList: any;
  frequencyList: any[] = [];
  portalList: any[] = [];
  furnishedList: any[] = [];
  filterDataValue: any = '';
  assignToList: any[] = [];
  usageList: any[] = [];
  purposeList: any[] = [];
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
  userCreateByList: any[] = [];
  userUpdatedByList: any[] = [];
  isApplyFilter: boolean;
  uData:any;
  mylistingData:1;
  companySettings:any;
  @ViewChild('modal') private modalContent: TemplateRef<ListingTableComponent>;
  @Input() public modalConfig: ModalConfig;
  listingType:any;
  

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
      column: 'Availability',
      isVisible: true,
    },
    {
      column: 'Assigned To',
      isVisible: true,
    },
    {
      column: 'Usage',
      isVisible: true,
    },
    {
      column: 'Purpose',
      isVisible: true,
    },
    {
      column: 'Property Type',
      isVisible: true,
    },
    {
      column: 'Completion Status',
      isVisible: true,
    }, 
    {
      column: 'Beds',
      isVisible: true,
    },
    {
      column: 'Baths',
      isVisible:true,
    }, 
    {
      column: 'Built-up Area',
      isVisible: true,
    },
    {
      column: 'Plot Area',
      isVisible: true,
    },
    {
      column: 'Furnished',
      isVisible: true,
    },
    {
      column: 'Fitted',
      isVisible: true,
    },
    {
      column: 'Parking Spaces',
      isVisible: true
    }, 
    {
      column: 'Views',
      isVisible: true,
    }, 
    {
      column: 'Layout Type',
      isVisible: true,
    },
    {
      column: 'Tenure',
      isVisible: true,
    },
    {
      column: 'RERA Permit No.',
      isVisible: true,
    },
    {
      column: 'RERA Transaction No.',
      isVisible: true,
    },
    {
      column: 'Title Deed No.',
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
      column: 'Street',
      isVisible: true,
    },
    {
      column: 'Floor',
      isVisible: true,
    },
    {
      column: 'Unit No.',
      isVisible: true,
    },
    {
      column: 'Frequency',
      isVisible: true,
    },
    {
      column: 'Cheques',
      isVisible: true,
    },
    {
      column: 'Price',
      isVisible: true,
    },
    {
      column: 'Price/Sq.Ft.',
      isVisible: true,
    },
    {
      column: 'Commission %',
      isVisible: true,
    },
    {
      column: 'Commission',
      isVisible: true,
    },
    {
      column: 'Deposit %',
      isVisible: true,
    },
    {
      column: 'Deposit',
      isVisible: true,
    },
    {
      column: 'Monthly Service Charges',
      isVisible: true,
    },
    {
      column: 'Language',
      isVisible: true,
    },
    {
      column: 'Title',
      isVisible: true,
    },
    {
      column: 'Description',
      isVisible: true,
    },
    {
      column: 'Youtube Video Link',
      isVisible: true,
    },
    {
      column: '360 Virtual Tour Link',
      isVisible: true,
    },
    {
      column: 'Audio Tour Link',
      isVisible: true,
    },
    {
      column: 'Video Tour Link',
      isVisible: true,
    },
    {
      column: 'QR Code Link',
      isVisible: true,
    },
    {
      column: 'School',
      isVisible: true,
    },
    {
      column: 'Metro',
      isVisible: true,
    },
    {
      column: 'Medical Center',
      isVisible: true,
    },
    {
      column: 'Shopping Mall',
      isVisible: true,
    },
    {
      column: 'Mosques',
      isVisible: true,
    },
    {
      column: 'Beach',
      isVisible: true,
    },
    {
      column: 'Super Market',
      isVisible: true,
    },
    {
      column: 'Park',
      isVisible: true,
    },
    {
      column: 'Owner First Name',
      isVisible: true,
    },
    {
      column: 'Owner Last Name',
      isVisible: true,
    },
    {
      column: 'Owner Mobile',
      isVisible: true,
    },
    {
      column: 'Owner Email',
      isVisible: true,
    },
    {
      column: 'Tenant First Name',
      isVisible: true,
    },
    {
      column: 'Tenant Last Name',
      isVisible: true,
    },
    {
      column: 'Tenant Mobile',
      isVisible: true,
    },
    {
      column: 'Tenant Email',
      isVisible: true,
    },
    {
      column: 'Source Of Listing',
      isVisible: true,
    },
    {
      column: 'Expiration Date',
      isVisible: true,
    },
    {
      column: 'Featured',
      isVisible: true,
    },
    {
      column: 'Managed',
      isVisible: true,
    },
    {
      column: 'Exclusive',
      isVisible: true,
    },
    {
      column: 'DEWA No.',
      isVisible: true,
    },
    {
      column: 'STR No.',
      isVisible: true,
    },
    {
      column: 'Next Available',
      isVisible: true,
    },
    {
      column: 'Remind',
      isVisible: true,
    },
    {
      column: 'Key Location',
      isVisible: true,
    },
    {
      column: 'Property Tenanted',
      isVisible: true,
    },
    {
      column: 'Rented At',
      isVisible: true,
    },
    {
      column: 'Rented Until',
      isVisible: true,
    },
    {
      column: 'Last Published On',
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
  @ViewChild('columnSettingmodal') private modalcolumnContent: TemplateRef<ListingTableComponent>;
  private modalColumnRef: NgbModalRef;

  constructor(
    private listingSevice: ListingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,    
    private toastr: ToastrService,
    private authService: AuthService,
    private dropdownService: DropdownService,
    private modalColumnService: NgbModal
  ) {}

  ngOnInit(): void {
    var uData = this.authService.userValue;
    if(uData != null){
    this.userData= JSON.parse(uData);
    this.isAddListingPermission = this.userData.permissionAccess.filter((x:any) => x.permissionId == 9).length > 0;
    this.listingType = this.userData.id;  
    this.mylistingData = this.userData.id;
    }
    this.listingSevice.IsOpenDrawer.subscribe((x:any) => {
      if(x != null) {
        this.isDraweropen = x;
      }
    })
    this.authService.companySetting.subscribe((data:any) => {
      this.companySettings = data;
    })
    this.listingSevice.SelectedListingId.subscribe((data:any) => {
      //this.selectedContactId = data;
      this.listingDetails = this.listingDetails?.map((x:any) => ({
        ...x,
        isSelected: false
      }));
    } )
    this.initForm();
    this.getAllStatus();
    this.getColumnOrder();
    // this.listingData(
    //   this.form.value.sortFiled,
    //   this.form.value.sortDirection,
    //   this.form.value.page,
    //   this.form.value.itemsPerPage
    // );
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
    this.getPurpose();
    this.getComplitionStatus();
    this.getLanguage();
    this.getBaths();
    this.getFitted();
    this.getFrequency();
    this.getcheque();
    this.getAllSourceOfListing();
    this.getAllRemind();
    this.getAllUser();
    this.listingSevice.isCallListing.pipe().subscribe((data: any) => {
      if (data) {
        this.initForm();
        this.GetPropertyType();
        this.getBeds();
        this.getEmirates();
        this.getLocation();
        this.getAllSubLocation();
        this.getConstructionStatus();
        this.form.controls['listingType'].setValue(this.listingType.toString());
        this.listingData(
          this.form.value.sortFiled,
          this.form.value.sortDirection,
          this.form.value.page,
          this.form.value.itemsPerPage
        );
      } else {
      }
    });

    this.listingSevice.isRemoveCheckBoxSelected
      .pipe()
      .subscribe((data: any) => {
        if (data) {
          this.listingDetails.forEach((element: any) => {
            element.selected = false;
          });
        }
      });
      
      this.form.controls['listingType'].setValue(this.userData.id.toString());
      this.cdr.detectChanges();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      listingType: [this.userData.id],
      reference: [''],
      status: [null],
      assignedToId: [null],
      usageId: [null],
      purposeId: [null],
      propertyTypeId: [null],
      completionStatusId: [null],
      bedsId: [null],
      bathsId: [null],
      minBUA: [null],
      maxBUA: [null],
      minPlotArea: [null],
      maxPlotArea: [null],
      furnishedId: [null],
      fittedId: [null],
      parkingSpaces: [null],
      views: [''],
      layoutType: [''],
      ownershipDuration: [null],
      reraPermitNumber: [''],
      reraTransactionNumber: [''],
      titleDeedNumber: [''],
      emiratesId: [null],
      locationId: [null],
      subLocationId: [null],
      street: [''],
      floor: [''],
      unitNumber: [''],
      frequencyId: [null],
      chequeId: [null],
      minPrice: [null],
      maxPrice: [null],
      pricePerSqM: [null],
      commisionPer: [null],
      depositPer: [null],
      commisionAED: [null],
      depositAED: [null],
      monthlyServiceCharges: [null],
      languageId: [null],
      title: [''],
      description: [''],
      youtubeVideoLink: [''],
      virtualTourLink: [''],
      audioTourLink: [''],
      videoTourLink: [''],
      qrCodeLink: [''],
      school: [''],
      metro: [''],
      medicalCenter: [''],
      shoppingMall: [''],
      mosques: [''],
      beach: [''],
      superMarket: [''],
      park: [''],
      ownerFirstName: [''],
      ownerLastName: [''],
      ownerMobileNo: [''],
      ownerEmail: [''],
      tenantFirstName: [''],
      tenantLastName: [''],
      tenantMobileNo: [''],
      tenantEmail: [''],
      propertyStatusId: [null],
      sourceOfListingId: [null],
      fromExpirationDate: [''],
      toExpirationDate: [''],
      featured: [null],
      managed: [null],
      exclusive: [null],
      dEWANumber: [''],
      sTrNumber: [''],
      fromNextAvailable: [''],
      toNextAvailable: [''],
      remindId: [null],
      keyLocation: [''],
      propertyTenanted: [null],
      fromRentedAt: [null],
      toRentedAt: [null],
      fromRentedUntil: [''],
      toRentedUntil: [''],
      createdBy: [null],
      updatedBy: [null],
      fromListed: [''],
      toListed: [''],
      fromUpdated: [''],
      toUpdated: [''],
      fromLastPublishedOn: [''],
      toLastPublishedOn: [''],
      page: [1],
      itemsPerPage: [this.itemsPerPage],
      sortFiled: ['Updated'],
      sortDirection: [true],
      agentEmail: [''],
      companyId:[this.userData.companyId],
      createdUser:[this.userData.id],
      roleId: this.userData.roleId,
      userId: this.userData.id
    });
    var listingTypeControl = this.form.get('listingType');
    if (listingTypeControl) {
      listingTypeControl.setValue(this.userData.id);
    }

    this.formAdvance.reference = this.form.value.reference;
    this.formAdvance.status = this.form.value.status;
    this.formAdvance.assignedToId = this.form.value.assignedToId;
    this.formAdvance.usageId = this.form.value.usageId;
    this.formAdvance.purposeId = this.form.value.purposeId;
    this.formAdvance.propertyTypeId = this.form.value.propertyTypeId;
    this.formAdvance.completionStatusId = this.form.value.completionStatusId;
    this.formAdvance.bedsId = this.form.value.bedsId;
    this.formAdvance.bathsId = this.form.value.bathsId;
    this.formAdvance.minBUA = this.form.value.minBUA;
    this.formAdvance.maxBUA = this.form.value.maxBUA;
    this.formAdvance.minPlotArea = this.form.value.minPlotArea;
    this.formAdvance.maxPlotArea = this.form.value.maxPlotArea;
    this.formAdvance.furnishedId = this.form.value.furnishedId;
    this.formAdvance.fittedId = this.form.value.fittedId;
    this.formAdvance.parkingSpaces = this.form.value.parkingSpaces;
    this.formAdvance.views = this.form.value.views;
    this.formAdvance.layoutType = this.form.value.layoutType;
    this.formAdvance.ownershipDuration = this.form.value.ownershipDuration;
    this.formAdvance.reraPermitNumber = this.form.value.reraPermitNumber;
    this.formAdvance.reraTransactionNumber =
      this.form.value.reraTransactionNumber;
    this.formAdvance.titleDeedNumber = this.form.value.titleDeedNumber;
    this.formAdvance.emiratesId = this.form.value.emiratesId;
    this.formAdvance.locationId = this.form.value.locationId;
    this.formAdvance.subLocationId = this.form.value.subLocationId;
    this.formAdvance.street = this.form.value.street;
    this.formAdvance.floor = this.form.value.floor;
    this.formAdvance.unitNumber = this.form.value.unitNumber;
    this.formAdvance.frequencyId = this.form.value.frequencyId;
    this.formAdvance.chequeId = this.form.value.chequeId;
    this.formAdvance.minPrice = this.form.value.minPrice;
    this.formAdvance.maxPrice = this.form.value.maxPrice;
    this.formAdvance.pricePerSqM = this.form.value.pricePerSqM;
    this.formAdvance.commisionPer = this.form.value.depositPer;
    this.formAdvance.depositPer = this.form.value.propertyTypeId;
    this.formAdvance.commisionAED = this.form.value.commisionAED;
    this.formAdvance.depositAED = this.form.value.depositAED;
    this.formAdvance.monthlyServiceCharges =
      this.form.value.monthlyServiceCharges;
    this.formAdvance.languageId = this.form.value.languageId;
    this.formAdvance.title = this.form.value.title;
    this.formAdvance.description = this.form.value.description;
    this.formAdvance.youtubeVideoLink = this.form.value.youtubeVideoLink;
    this.formAdvance.virtualTourLink = this.form.value.virtualTourLink;
    this.formAdvance.audioTourLink = this.form.value.audioTourLink;
    this.formAdvance.videoTourLink = this.form.value.videoTourLink;
    this.formAdvance.qrCodeLink = this.form.value.qrCodeLink;
    this.formAdvance.school = this.form.value.school;
    this.formAdvance.metro = this.form.value.metro;
    this.formAdvance.medicalCenter = this.form.value.medicalCenter;
    this.formAdvance.shoppingMall = this.form.value.shoppingMall;
    this.formAdvance.mosques = this.form.value.mosques;
    this.formAdvance.beach = this.form.value.beach;
    this.formAdvance.superMarket = this.form.value.superMarket;
    this.formAdvance.park = this.form.value.park;
    this.formAdvance.ownerFirstName = this.form.value.ownerFirstName;
    this.formAdvance.ownerLastName = this.form.value.ownerLastName;
    this.formAdvance.ownerMobileNo = this.form.value.ownerMobileNo;
    this.formAdvance.ownerEmail = this.form.value.ownerEmail;
    this.formAdvance.tenantFirstName = this.form.value.tenantFirstName;
    this.formAdvance.tenantLastName = this.form.value.tenantLastName;
    this.formAdvance.tenantMobileNo = this.form.value.tenantMobileNo;
    this.formAdvance.tenantEmail = this.form.value.tenantEmail;
    this.formAdvance.propertyStatusId = this.form.value.propertyStatusId;
    this.formAdvance.sourceOfListingId = this.form.value.sourceOfListingId;
    this.formAdvance.fromExpirationDate = this.form.value.fromExpirationDate;
    this.formAdvance.toExpirationDate = this.form.value.toExpirationDate;
    this.formAdvance.featured = this.form.value.featured;
    this.formAdvance.managed = this.form.value.managed;
    this.formAdvance.exclusive = this.form.value.exclusive;
    this.formAdvance.dEWANumber = this.form.value.dEWANumber;
    this.formAdvance.sTrNumber = this.form.value.sTrNumber;
    this.formAdvance.fromNextAvailable = this.form.value.fromNextAvailable;
    this.formAdvance.toNextAvailable = this.form.value.toNextAvailable;
    this.formAdvance.remindId = this.form.value.remindId;
    this.formAdvance.keyLocation = this.form.value.keyLocation;
    this.formAdvance.propertyTenanted = this.form.value.propertyTenanted;
    this.formAdvance.fromRentedAt = this.form.value.fromRentedAt;
    this.formAdvance.toRentedAt = this.form.value.toRentedAt;
    this.formAdvance.fromRentedUntil = this.form.value.fromRentedUntil;
    this.formAdvance.toRentedUntil = this.form.value.toRentedUntil;
    this.formAdvance.createdBy = this.form.value.createdBy;
    this.formAdvance.updatedBy = this.form.value.updatedBy;
    this.formAdvance.fromListed = this.form.value.fromListed;
    this.formAdvance.toListed = this.form.value.toListed;
    this.formAdvance.fromUpdated = this.form.value.fromUpdated;
    this.formAdvance.toUpdated = this.form.value.toUpdated;
    this.formAdvance.fromLastPublishedOn = this.form.value.fromLastPublishedOn;
    this.formAdvance.toLastPublishedOn = this.form.value.toLastPublishedOn;
    this.formAdvance.agentEmail = this.form.value.agentEmail;
    this.formAdvance.createdUser = this.form.value.createdUser;
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
    this.IsLoading = true;
    this.form.controls['sortFiled'].setValue(sortFiled);
    this.form.controls['sortDirection'].setValue(sortDirection);
    this.form.controls['page'].setValue(page);
    this.form.controls['itemsPerPage'].setValue(this.itemsPerPage);
    this.formAdvance = this.form.value;
    this.listingDetails = [];
    this.listingSevice.getListingBasic(this.form.value).subscribe(
      (data: any | undefined) => {
        this.isSelectAllListing = false;
        this.listingDetails = data.map((x:any) => ({
          ...x,
          isSelected: false
        }));;
        this.exportListingId = [];
        if (data.length > 0) {
          this.totalRecord = data[0].totalRecords;
        } else {
          this.totalRecord = 0;
        }
        this.IsLoading = false;
        this.cdr.detectChanges();
      },
      (error) => {
        this.toastr.error(error.message);
        this.IsLoading = false;
        this.cdr.detectChanges();
      }
    );
  }
  onEdit(value: any) {
    // this.listingDetails.forEach((element: any) => {
    //   if (element.listingId === value) {
    //     element.selected = true;
    //   } else {
    //     element.selected = false;
    //   }
    // });
    this.data.AddListing = false;
    this.data.EditListing = true;
    this.data.Id = value;

    var listing = this.listingDetails.find((x:any) => x.listingId == value);
    listing.isSelected = true;

    var notlisting = this.listingDetails.filter((x:any) => x.listingId != value);
    notlisting.forEach((x:any) => {
      x.isSelected = false;
    });

    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
    this.listingSevice.OpenListing(this.data);
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
    this.data.AddListing = true;
    this.data.EditListing = false;
    this.data.Id = 0;
    this.listingSevice.OpenListing(this.data);
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
  }

  onView() {
    this.listingSevice.OpenViewListing(true);
  }
  open(): Promise<boolean> {
    if (!this.isApplyFilter) {
      this.form.controls['reference'].setValue(this.formAdvance.reference);
      this.form.controls['status'].setValue(this.formAdvance.status);
      this.form.controls['assignedToId'].setValue(
        this.formAdvance.assignedToId
      );
      this.form.controls['usageId'].setValue(this.formAdvance.usageId);
      this.form.controls['purposeId'].setValue(this.formAdvance.purposeId);
      this.form.controls['propertyTypeId'].setValue(
        this.formAdvance.propertyTypeId
      );
      this.form.controls['completionStatusId'].setValue(
        this.formAdvance.completionStatusId
      );
      this.form.controls['bedsId'].setValue(this.formAdvance.bedsId);
      this.form.controls['bathsId'].setValue(this.formAdvance.bathsId);
      this.form.controls['minBUA'].setValue(this.formAdvance.minBUA);
      this.form.controls['maxBUA'].setValue(this.formAdvance.maxBUA);
      this.form.controls['minPlotArea'].setValue(this.formAdvance.minPlotArea);
      this.form.controls['maxPlotArea'].setValue(this.formAdvance.maxPlotArea);
      this.form.controls['furnishedId'].setValue(this.formAdvance.furnishedId);
      this.form.controls['fittedId'].setValue(this.formAdvance.fittedId);
      this.form.controls['parkingSpaces'].setValue(
        this.formAdvance.parkingSpaces
      );
      this.form.controls['views'].setValue(this.formAdvance.views);
      this.form.controls['layoutType'].setValue(this.formAdvance.layoutType);
      this.form.controls['ownershipDuration'].setValue(
        this.formAdvance.ownershipDuration
      );
      this.form.controls['reraPermitNumber'].setValue(
        this.formAdvance.reraPermitNumber
      );
      this.form.controls['reraTransactionNumber'].setValue(
        this.formAdvance.reraTransactionNumber
      );
      this.form.controls['titleDeedNumber'].setValue(
        this.formAdvance.titleDeedNumber
      );
      this.form.controls['emiratesId'].setValue(this.formAdvance.emiratesId);
      this.form.controls['locationId'].setValue(this.formAdvance.locationId);
      this.form.controls['subLocationId'].setValue(
        this.formAdvance.subLocationId
      );
      this.form.controls['street'].setValue(this.formAdvance.street);
      this.form.controls['floor'].setValue(this.formAdvance.floor);
      this.form.controls['unitNumber'].setValue(this.formAdvance.unitNumber);
      this.form.controls['frequencyId'].setValue(this.formAdvance.frequencyId);
      this.form.controls['chequeId'].setValue(this.formAdvance.chequeId);
      this.form.controls['minPrice'].setValue(this.formAdvance.minPrice);
      this.form.controls['maxPrice'].setValue(this.formAdvance.maxPrice);
      this.form.controls['pricePerSqM'].setValue(this.formAdvance.pricePerSqM);
      this.form.controls['commisionPer'].setValue(this.formAdvance.depositPer);
      this.form.controls['depositPer'].setValue(
        this.formAdvance.propertyTypeId
      );
      this.form.controls['commisionAED'].setValue(
        this.formAdvance.commisionAED
      );
      this.form.controls['depositAED'].setValue(this.formAdvance.depositAED);
      this.form.controls['monthlyServiceCharges'].setValue(
        this.formAdvance.monthlyServiceCharges
      );
      this.form.controls['languageId'].setValue(this.formAdvance.languageId);
      this.form.controls['title'].setValue(this.formAdvance.title);
      this.form.controls['description'].setValue(this.formAdvance.description);
      this.form.controls['youtubeVideoLink'].setValue(
        this.formAdvance.youtubeVideoLink
      );
      this.form.controls['virtualTourLink'].setValue(
        this.formAdvance.virtualTourLink
      );
      this.form.controls['audioTourLink'].setValue(
        this.formAdvance.audioTourLink
      );
      this.form.controls['videoTourLink'].setValue(
        this.formAdvance.videoTourLink
      );
      this.form.controls['qrCodeLink'].setValue(this.formAdvance.qrCodeLink);
      this.form.controls['school'].setValue(this.formAdvance.school);
      this.form.controls['metro'].setValue(this.formAdvance.metro);
      this.form.controls['medicalCenter'].setValue(
        this.formAdvance.medicalCenter
      );
      this.form.controls['shoppingMall'].setValue(
        this.formAdvance.shoppingMall
      );
      this.form.controls['mosques'].setValue(this.formAdvance.mosques);
      this.form.controls['beach'].setValue(this.formAdvance.beach);
      this.form.controls['superMarket'].setValue(this.formAdvance.superMarket);
      this.form.controls['park'].setValue(this.formAdvance.park);
      this.form.controls['ownerFirstName'].setValue(
        this.formAdvance.ownerFirstName
      );
      this.form.controls['ownerLastName'].setValue(
        this.formAdvance.ownerLastName
      );
      this.form.controls['ownerMobileNo'].setValue(
        this.formAdvance.ownerMobileNo
      );
      this.form.controls['ownerEmail'].setValue(this.formAdvance.ownerEmail);
      this.form.controls['tenantFirstName'].setValue(
        this.formAdvance.tenantFirstName
      );
      this.form.controls['tenantLastName'].setValue(
        this.formAdvance.tenantLastName
      );
      this.form.controls['tenantMobileNo'].setValue(
        this.formAdvance.tenantMobileNo
      );
      this.form.controls['tenantEmail'].setValue(this.formAdvance.tenantEmail);
      this.form.controls['propertyStatusId'].setValue(
        this.formAdvance.propertyStatusId
      );
      this.form.controls['sourceOfListingId'].setValue(
        this.formAdvance.sourceOfListingId
      );
      this.form.controls['fromExpirationDate'].setValue(
        this.formAdvance.fromExpirationDate
      );
      this.form.controls['toExpirationDate'].setValue(
        this.formAdvance.toExpirationDate
      );
      this.form.controls['featured'].setValue(this.formAdvance.featured);
      this.form.controls['managed'].setValue(this.formAdvance.managed);
      this.form.controls['exclusive'].setValue(this.formAdvance.exclusive);
      this.form.controls['dEWANumber'].setValue(this.formAdvance.dEWANumber);
      this.form.controls['sTrNumber'].setValue(this.formAdvance.sTrNumber);
      this.form.controls['fromNextAvailable'].setValue(
        this.formAdvance.fromNextAvailable
      );
      this.form.controls['toNextAvailable'].setValue(
        this.formAdvance.toNextAvailable
      );
      this.form.controls['remindId'].setValue(this.formAdvance.remindId);
      this.form.controls['keyLocation'].setValue(this.formAdvance.keyLocation);
      this.form.controls['propertyTenanted'].setValue(
        this.formAdvance.propertyTenanted
      );
      this.form.controls['fromRentedAt'].setValue(
        this.formAdvance.fromRentedAt
      );
      this.form.controls['toRentedAt'].setValue(this.formAdvance.toRentedAt);
      this.form.controls['fromRentedUntil'].setValue(
        this.formAdvance.fromRentedUntil
      );
      this.form.controls['toRentedUntil'].setValue(
        this.formAdvance.toRentedUntil
      );
      this.form.controls['createdBy'].setValue(this.formAdvance.createdBy);
      this.form.controls['updatedBy'].setValue(this.formAdvance.updatedBy);
      this.form.controls['fromListed'].setValue(this.formAdvance.fromListed);
      this.form.controls['toListed'].setValue(this.formAdvance.toListed);
      this.form.controls['fromUpdated'].setValue(this.formAdvance.fromUpdated);
      this.form.controls['toUpdated'].setValue(this.formAdvance.toUpdated);
      this.form.controls['fromLastPublishedOn'].setValue(
        this.formAdvance.fromLastPublishedOn
      );
      this.form.controls['toLastPublishedOn'].setValue(
        this.formAdvance.toLastPublishedOn
      );
      this.form.controls['agentEmail'].setValue(this.formAdvance.agentEmail);
      this.form.controls['createdUser'].setValue(this.userData.id);
    }
    return new Promise<boolean>((resolve) => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'xl' });
      this.isApplyFilter = false;
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
  onFilterSelection1(name: any, e: any, page: any, itemPerPage: any) {
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

  onFilterDateSelection(name: any, e: any, page: any, itemPerPage: any) {
    this.page = 1;
    this.form.controls[name].setValue(e.target.value);
    this.form.controls['page'].setValue(page);
    this.form.controls['itemsPerPage'].setValue(itemPerPage);
    this.listingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      page,
      itemPerPage
    );
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
    // this.form.controls[name].setValue(e.target.value);
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
    if(name == 'listingType') {
      if(e == 0) {
      this.listingType = e;
      }
      else {
        this.listingType = this.userData.id;
      }
    }
    this.listingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      page,
      itemPerPage
    );
  }
  onFilterSelectionAdvanceFilter(name: any, e: any) {
    // switch (e) {
    //   case undefined:
    //     this.form.controls[name].setValue(null);
    //     break;
    //   default:
    //     // this.form.controls[name].setValue(e);
    //     break;
    // }
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
      this.initForm();
      this.form.controls['listingType'].setValue(this.userData.id?.toString());
      this.listingData(
        this.form.value.sortFiled,
        this.form.value.sortDirection,
        this.form.value.page,
        this.form.value.itemsPerPage
      );
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
    this.isApplyFilter = true;
    this.form.controls['reference'].setValue(this.form.value.reference);
    this.form.controls['status'].setValue(this.form.value.status);
    this.form.controls['assignedToId'].setValue(this.form.value.assignedToId);
    this.form.controls['usageId'].setValue(this.form.value.usageId);
    this.form.controls['purposeId'].setValue(this.form.value.purposeId);
    this.form.controls['propertyTypeId'].setValue(
      this.form.value.propertyTypeId
    );
    this.form.controls['completionStatusId'].setValue(
      this.form.value.completionStatusId
    );
    this.form.controls['bedsId'].setValue(this.form.value.bedsId);
    this.form.controls['bathsId'].setValue(this.form.value.bathsId);
    this.form.controls['minBUA'].setValue(this.form.value.minBUA);
    this.form.controls['maxBUA'].setValue(this.form.value.maxBUA);
    this.form.controls['minPlotArea'].setValue(this.form.value.minPlotArea);
    this.form.controls['maxPlotArea'].setValue(this.form.value.maxPlotArea);
    this.form.controls['furnishedId'].setValue(this.form.value.furnishedId);
    this.form.controls['fittedId'].setValue(this.form.value.fittedId);
    this.form.controls['parkingSpaces'].setValue(this.form.value.parkingSpaces);
    this.form.controls['views'].setValue(this.form.value.views);
    this.form.controls['layoutType'].setValue(this.form.value.layoutType);
    this.form.controls['ownershipDuration'].setValue(
      this.form.value.ownershipDuration
    );
    this.form.controls['reraPermitNumber'].setValue(
      this.form.value.reraPermitNumber
    );
    this.form.controls['reraTransactionNumber'].setValue(
      this.form.value.reraTransactionNumber
    );
    this.form.controls['titleDeedNumber'].setValue(
      this.form.value.titleDeedNumber
    );
    this.form.controls['emiratesId'].setValue(this.form.value.emiratesId);
    this.form.controls['locationId'].setValue(this.form.value.locationId);
    this.form.controls['subLocationId'].setValue(this.form.value.subLocationId);
    this.form.controls['street'].setValue(this.form.value.street);
    this.form.controls['floor'].setValue(this.form.value.floor);
    this.form.controls['unitNumber'].setValue(this.form.value.unitNumber);
    this.form.controls['frequencyId'].setValue(this.form.value.frequencyId);
    this.form.controls['chequeId'].setValue(this.form.value.chequeId);
    this.form.controls['minPrice'].setValue(this.form.value.minPrice);
    this.form.controls['maxPrice'].setValue(this.form.value.maxPrice);
    this.form.controls['pricePerSqM'].setValue(this.form.value.pricePerSqM);
    this.form.controls['commisionPer'].setValue(this.form.value.depositPer);
    this.form.controls['depositPer'].setValue(this.form.value.propertyTypeId);
    this.form.controls['commisionAED'].setValue(this.form.value.commisionAED);
    this.form.controls['depositAED'].setValue(this.form.value.depositAED);
    this.form.controls['monthlyServiceCharges'].setValue(
      this.form.value.monthlyServiceCharges
    );
    this.form.controls['languageId'].setValue(this.form.value.languageId);
    this.form.controls['title'].setValue(this.form.value.title);
    this.form.controls['description'].setValue(this.form.value.description);
    this.form.controls['youtubeVideoLink'].setValue(
      this.form.value.youtubeVideoLink
    );
    this.form.controls['virtualTourLink'].setValue(
      this.form.value.virtualTourLink
    );
    this.form.controls['audioTourLink'].setValue(this.form.value.audioTourLink);
    this.form.controls['videoTourLink'].setValue(this.form.value.videoTourLink);
    this.form.controls['qrCodeLink'].setValue(this.form.value.qrCodeLink);
    this.form.controls['school'].setValue(this.form.value.school);
    this.form.controls['metro'].setValue(this.form.value.metro);
    this.form.controls['medicalCenter'].setValue(this.form.value.medicalCenter);
    this.form.controls['shoppingMall'].setValue(this.form.value.shoppingMall);
    this.form.controls['mosques'].setValue(this.form.value.mosques);
    this.form.controls['beach'].setValue(this.form.value.beach);
    this.form.controls['superMarket'].setValue(this.form.value.superMarket);
    this.form.controls['park'].setValue(this.form.value.park);
    this.form.controls['ownerFirstName'].setValue(
      this.form.value.ownerFirstName
    );
    this.form.controls['ownerLastName'].setValue(this.form.value.ownerLastName);
    this.form.controls['ownerMobileNo'].setValue(this.form.value.ownerMobileNo);
    this.form.controls['ownerEmail'].setValue(this.form.value.ownerEmail);
    this.form.controls['tenantFirstName'].setValue(
      this.form.value.tenantFirstName
    );
    this.form.controls['tenantLastName'].setValue(
      this.form.value.tenantLastName
    );
    this.form.controls['tenantMobileNo'].setValue(
      this.form.value.tenantMobileNo
    );
    this.form.controls['tenantEmail'].setValue(this.form.value.tenantEmail);
    this.form.controls['propertyStatusId'].setValue(
      this.form.value.propertyStatusId
    );
    this.form.controls['sourceOfListingId'].setValue(
      this.form.value.sourceOfListingId
    );
    this.form.controls['fromExpirationDate'].setValue(
      this.form.value.fromExpirationDate
    );
    this.form.controls['toExpirationDate'].setValue(
      this.form.value.toExpirationDate
    );
    this.form.controls['featured'].setValue(this.form.value.featured);
    this.form.controls['managed'].setValue(this.form.value.managed);
    this.form.controls['exclusive'].setValue(this.form.value.exclusive);
    this.form.controls['dEWANumber'].setValue(this.form.value.dEWANumber);
    this.form.controls['sTrNumber'].setValue(this.form.value.sTrNumber);
    this.form.controls['fromNextAvailable'].setValue(
      this.form.value.fromNextAvailable
    );
    this.form.controls['toNextAvailable'].setValue(
      this.form.value.toNextAvailable
    );
    this.form.controls['remindId'].setValue(this.form.value.remindId);
    this.form.controls['keyLocation'].setValue(this.form.value.keyLocation);
    this.form.controls['propertyTenanted'].setValue(
      this.form.value.propertyTenanted
    );
    this.form.controls['fromRentedAt'].setValue(this.form.value.fromRentedAt);
    this.form.controls['toRentedAt'].setValue(this.form.value.toRentedAt);
    this.form.controls['fromRentedUntil'].setValue(
      this.form.value.fromRentedUntil
    );
    this.form.controls['toRentedUntil'].setValue(this.form.value.toRentedUntil);
    this.form.controls['createdBy'].setValue(this.form.value.createdBy);
    this.form.controls['updatedBy'].setValue(this.form.value.updatedBy);
    this.form.controls['fromListed'].setValue(this.form.value.fromListed);
    this.form.controls['toListed'].setValue(this.form.value.toListed);
    this.form.controls['fromUpdated'].setValue(this.form.value.fromUpdated);
    this.form.controls['toUpdated'].setValue(this.form.value.toUpdated);
    this.form.controls['fromLastPublishedOn'].setValue(
      this.form.value.fromLastPublishedOn
    );
    this.form.controls['toLastPublishedOn'].setValue(
      this.form.value.toLastPublishedOn
    );
    this.form.controls['agentEmail'].setValue(this.form.value.agentEmail);
    this.form.controls['createdUser'].setValue(this.userData.id);

    if (this.isApplyFilter) {
      this.formAdvance = this.form.value;
    }

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
    // switch (e) {
    //   case '':
    //     this.form.controls[name].setValue(null);
    //     break;
    //   case '0':
    //     this.form.controls[name].setValue(null);
    //     break;
    //   case '0.00':
    //     this.form.controls[name].setValue(null);
    //     break;
    //   default:
    //     this.form.controls[name].setValue(e.target.value);
    //     break;
    // }
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  getAllUser() { 
    this.dropdownService
    .GetAllAssignedToByCompany(this.userData.companyId).subscribe((data: any | undefined) => {
      this.userCreateByList = data;
      this.userUpdatedByList = data;
    });
  }  
  SelectListing(event:any,id:any) {
    if(event.target.checked) {
      this.exportListingId.push(id);
      var contactDetailList = this.listingDetails.length;
      var selectedDetailList = this.listingDetails.filter((x:any) => x.isSelected == true).length;
      if(contactDetailList == selectedDetailList) {
        this.isSelectAllListing = true;
      }
      else {
        this.isSelectAllListing = false;
      }
    }
    else {
      const index:number = this.exportListingId.indexOf(id);
      if(index !== -1) {
        this.exportListingId.splice(index,1);
      }
      var contactDetailList = this.listingDetails.length;
      var selectedDetailList = this.listingDetails.filter((x:any) => x.isSelected == true).length;
      if(contactDetailList == selectedDetailList) {
        this.isSelectAllListing = true;
      }
      else {
        this.isSelectAllListing = false;
      }
    }
    this.cdr.detectChanges();
  }
  SelectAllListing(event:any) {
    if(event.target.checked) {
      this.isSelectAllListing = true;
      var contacts = this.listingDetails;
      contacts.forEach((x:any) => {
      x.isSelected = true;
    });
      this.exportListingId = (this.listingDetails.filter((x:any) => x.isSelected == true).map((z:any) => z.listingId));
    }
    else {
      this.isSelectAllListing = false;
      var contacts = this.listingDetails;
      contacts.forEach((x:any) => {
      x.isSelected = false;
    });
    this.exportListingId = [];
    }
    this.cdr.detectChanges();
  }

  exportListing(){
    this.IsLoading = true;
    this.listingSevice.DownloadExcel({
      ListingIds : this.exportListingId,
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
      a.download = 'Listing.xlsx';
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
    this.listingSevice.saveColumnOrder({
      userId: this.userData.id,
      tableName: 'Listings',
      columnDetails: this.columnOrder
    }).subscribe((data:any) => {
      this.IsLoading = false;
      this.cdr.detectChanges();
      this.closeColumnSettings();
    })
  }

  getColumnOrder(){
      this.IsLoading = true;
      this.listingSevice
        .getColumnOrder(this.userData.id,'Listings')
        .subscribe((data: any | undefined) => {
          if(data != null && data.length > 0) {
          this.columnOrder = data;
          }
          else {
            this.columnOrder = this.DeafultcolumnOrder;
          }
          this.listingData(
            this.form.value.sortFiled,
            this.form.value.sortDirection,
            this.form.value.page,
            this.form.value.itemsPerPage
          );
          // this.IsLoading = false;
        });

      }
}
