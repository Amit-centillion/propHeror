import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { LeadsDetailsComponent } from '../../leads/leads-details/leads-details.component';
import { LeadsService } from 'src/app/modules/auth/services/leads.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/modules/auth';
import { ContactService } from 'src/app/modules/auth/services/contact.service';
import { ModalConfig } from 'src/app/_metronic/partials';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { ViewingsService } from 'src/app/modules/auth/services/viewing.service';
import moment from 'moment';
import { CompanySettingsService } from 'src/app/modules/auth/services/company-settings/company-settings.service';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDragMove,
} from '@angular/cdk/drag-drop';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.scss'],
})
export class ListingDetailComponent implements OnInit {
  // @ViewChild('container') container!: ElementRef;
  submitted = false;
  ContactList: any;
  getContactsDetail: any;
  isContact:boolean = false;
  onselectedLeadData:any;
  getTenantContactsDetail: any;
  SearchContactList: boolean = false;
  @Input() public modalConfig: ModalConfig;
  @Input() public modalTenantContentConfig: ModalConfig;
  dispayContactOwner: boolean;
  private createOwnerContact: NgbModalRef;
  @ViewChild('AddOwnerContactModel')
  private modalContent: TemplateRef<ListingDetailComponent>;
  private createTenantContact: NgbModalRef;
  @ViewChild('AddTenantContactModel')
  private modalTenantContent: TemplateRef<ListingDetailComponent>;
  @ViewChild('ViewListing')
  private modalLeadViewingList: TemplateRef<ListingDetailComponent>;
  @ViewChild('container', { static: false }) container!: ElementRef;
  // @ViewChild('targetDiv', { static: false }) targetDiv!: ElementRef;
  data: any = {
    AddListing: true,
    EditListing: false,
    Id: 0,
  };
  imgUrl = environment.imgUrl;
  public datePlaceholderText: string = '';
  createdDate: any;
  tempSelectedTeantContactRef:any= null;
  leadViewingApplay:any = null;
  tempSelectedOwnerContactRef:any= null;
  updatedDate: any;
  selectedListningOwnerContactId:number = 0;
  lastPublishedDate: any;
  selectedListningTenantContactId:number = 0;
  selectedListningTenantSaveContactId:number = 0;
  displayComplition: boolean = false;
  disbledFields: boolean;
  IsLoading: boolean;
  totalLengthTitle: number = 0;
  totalLengthDescription: number = 0;
  totalWordLengthDescription: number = 0;
  isEdit: boolean;
  pricePer: boolean = true;
  id: any = '';
  displayCancel: boolean = false;
  exampleData: any[] = [];
  value: any;
  selectedTab: string = 'tab1';
  public baseUrl = '';
  baseUrlImage = environment.imgUrl;
  ListingId: string = '';
  displayListingId: any = '';
  assignToList: any[] = [];
  usageList: any[] = [];
  purposeList: any[] = [];
  LanguageList: any = ([] = []);
  propertyTypeList: any[] = [];
  ComplitionStatusList: any[] = [];
  bedList: any[] = [];
  bathsList: any[] = [];
  furnishedList: any[] = [];
  fittedList: any[] = [];
  locationList: any[] = [];
  subLocationList: any[] = [];
  emiratesList: any[] = [];
  portalList: any = [];
  frequencyList: any[] = [];
  chequeList: any[] = [];
  featuresList: any = [];
  featuresListFeatures: any = [];
  featuresListAmenities: any = [];
  propertyStatusList: any[] = [];
  sourceOfListingList: any[] = [];
  remindList: any[] = [];
  statusList: any[] = [];
  subStatusList: any[] = [];
  basic = true;
  address = true;
  pricing = true;
  media = true;
  portal = true;
  feature = true;
  neighbourhood = true;
  contact = true;
  additional = true;
  form: FormGroup;
  searchContactForm: FormGroup;
  EditId: any;
  refDisabled: boolean = true;
  isbool: Boolean = true;
  portallistdata: any[] = [];
  featurelistdata: any[] = [];
  displayListing: boolean;
  public fileToUpload: File;
  files: File[] = [];
  listingNotes: any;
  displayPreview: any;
  previewData: any;
  photoList: any;
  displayFilesPhotos: any;
  displayFilesFloorPlan: any;
  displayFilesPDFBrochure: any;
  displayFilesVideos: any;
  noteText: string = '';
  waterMarkPhotos: boolean = false;
  waterMarkFloorPlan: boolean = false;
  waterMarkPdfBrouchure: boolean = false;
  waterMarkVideo: boolean = false;
  phoneCodeList: any[] = [];
  referenceNo: any;
  Viewings: FormGroup;
  getLeadUsingId: any;
  leadDetailsList: any;
  ContactBasicForm: FormGroup;
  totalRecord: any;
  page = 1;
  itemsPerPage = 25;
  totalItems: any;
  private ViewList: NgbModalRef;
  pageNumber = 1;
  pageSize = 25;
  sortColumn: string = 'Updated';
  sortDir: boolean = true;
  userData: any;
  ContactDetailsList: any = [];
  ContactSourceList: any = [];
  ContactTypeList: any = [];
  MobileTypeList: any = [];
  CountryCodeList: any = [];
  CountryList: any = [];
  titleList: any = [];
  GenderList: any = [];
  NationalitiesList: any = [];
  ReligionList: any = [];
  LanguagesList: any = [];
  HobbiesList: any = [];
  isFilterRef: boolean = false;
  isFilterFirstName: boolean = false;
  isFilterLastName: boolean = false;
  isFilterPersonalMobile: boolean = false;
  isFilterWorkMobile: boolean = false;
  isFilterOtherMobile: boolean = false;
  isFilterPersonalPhone: boolean = false;
  isFilterWorkPhone: boolean = false;
  isFilterOtherPhone: boolean = false;
  isFilterPersonalEmail: boolean = false;
  isFilterWorkEmail: boolean = false;
  isFilterOtherEmail: boolean = false;
  isFilterPersonalFax: boolean = false;
  isFilterWorkFax: boolean = false;
  isFilterOtherFax: boolean = false;
  isFilterPersonalPO: boolean = false;
  isFilterPersonalAddressLine1: boolean = false;
  isFilterPersonalAddressLine2: boolean = false;
  isFilterPersonalCity: boolean = false;
  isFilterPersonalState: boolean = false;
  isFilterPersonalZip: boolean = false;
  isFilterWorkPO: boolean = false;
  isFilterWorkAddressLine1: boolean = false;
  isFilterWorkAddressLine2: boolean = false;
  isFilterWorkCity: boolean = false;
  isFilterWorkState: boolean = false;
  isFilterWorkcontory : boolean = false;
  isFilterWorkZip: boolean = false;
  isFilterFacebookLink: boolean = false;
  isFilterTwitterLink: boolean = false;
  isFilterLinkedIn: boolean = false;
  isFilterSkypeLink: boolean = false;
  isFilterGooglePlusLink: boolean = false;
  isFilterInstagramLink: boolean = false;
  isFilterWeChatLink: boolean = false;
  isFilterSocialWebsite: boolean = false;
  isFilterWebsiteLink: boolean = false;
  isFilterCompanyName: boolean = false;
  isFilterDesignation: boolean = false;
  isFilterWebsite: boolean = false;
  viewingList: any = [];
  isViewingSubmitted: boolean = false;
  viewingData: any;
  allViewingStatusList: any = [];
  viewingDataForm: boolean = false;
  addViewingButton: boolean = true;
  getDataon2: boolean = false;
  filterDataValue: any = '';
  AllStatusType: any[] = [];
  AllSubStatusType: any[] = [];
  AgentList: any = [];
  AllLeadFinance: any[] = [];
  LeadTypeList: any[] = [];
  AllPriorityType: any[] = [];
  AllEmirates: any[] = [];
  AllLocation: any[] = [];
  AllSubLocation: any[] = [];
  AllBeds: any[] = [];
  userList: any = [];
  selectedLeadId: number;
  AgentLeadList: any = [];
  companymarketingData: any;
  companyImagePath: any;
  isEditListingPermission: boolean = false;
  isViewListingPermission: boolean = false;
  // isViewingTabListingPermission:boolean =false;
  companySettings: any;
  leaditemsPerPage: number = 25;
  leadpage: number = 1;
  base64Image: any;
  deleteImagesList:any[]=[];
  PeronsalMobile:string='';
  PersonalPhone: string='';
  PersonalEmail:string = '';
  WorkMobile:string='';
  WorkPhone:string='';
  WorkEmail:string='';
  OtherMobile:string='';
  OtherPhone:string='';
  OtherEmail:string='';
  selectedLeadsOwnerId:any =null;
  onSelectioOfContact:any = null;
  onSelectioOfContactTeant:any =null;
  selectedTenantId:number =0;
  isReorderPhotos: boolean = false;
  isReorderFloorPlan: boolean = false;
  isReorderPDFBrochure: boolean = false;
  isReorderVideos: boolean = false;
  
  constructor(
    private listingSevice: ListingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private leadsService: LeadsService,
    private modalService: NgbModal,
    private authService: AuthService,
    private contactService: ContactService,
    private dropdownService: DropdownService,
    private viewingService: ViewingsService,
    private companySettingsService: CompanySettingsService,
    private sanitizer: DomSanitizer
  ) {}

  selectTab(tab: string): void {
    this.selectedTab = tab;
    if (this.selectedTab == 'tab3') {
      this.leadData(
        this.ContactBasicForm.value.sortFiled,
        this.ContactBasicForm.value.sortDirection,
        this.page,
        this.itemsPerPage
      );
      this.GetViewLeadDetailsByListingRef(this.previewData.id);
      this.cancelLead();
    }
  }

  setViewings() {
    this.Viewings = new FormGroup({
      id: new FormControl(0),
      listingId: new FormControl(this.form.value.listingId),
      startDate: new FormControl(null, Validators.required),
      startDateTime: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      endDateTime: new FormControl(null, Validators.required),
      statusId: new FormControl(1, Validators.required),
      notes: new FormControl(),
      leadId: new FormControl(null),
      createdBy: new FormControl(this.userData.id),
      updatedBy: new FormControl(this.userData.id),
      agentId: new FormControl(null, Validators.required),
      companyId: new FormControl(this.userData.companyId),
    });
  }
  getAllImage() {}

  public scrollToElement = (elementId: string) => {
    const overlayElement = this.container?.nativeElement;
    const targetElement = document.getElementById(elementId);
    const offset = 105.73; // Specify your desired offset value

    if (targetElement) {
      // overlayElement.scrollTop = targetElement.offsetTop - offset;
      if (targetElement.id === 'secStatus') {
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

  setViewingData(data: any) {
    this.Viewings = new FormGroup({
      id: new FormControl(0),
      listingId: new FormControl(this.form.value.listingId),
      startDate: new FormControl(null, Validators.required),
      startDateTime: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      endDateTime: new FormControl(null, Validators.required),
      statusId: new FormControl(1),
      agentId: new FormControl(null, [Validators.required]),
      notes: new FormControl(null),
      leadId: new FormControl(data.id),
      createdBy: new FormControl(this.userData.id),
      updatedBy: new FormControl(this.userData.id),
      companyId: new FormControl(this.userData.companyId)
    });
    this.cdr.detectChanges();
  }
  goDown1() {}
  filesPhotos: any;
  filesFloorPlan: any;
  filesPDFBrouchure: any;
  filesUploadVideo: any;
  filesDocs: any;
  onSelect(event: any) {
    this.filesPhotos.push(...event.addedFiles);
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 2000);
  }
  onSelectPhotos(event: any) {
    let i = 0;
    event.addedFiles.forEach((element: any) => {
      i = i + 1;
      const file = event.addedFiles[i - 1];
      this.filesPhotos.push({ file, watermark: true });
    });
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 3000);

  // if(this.isReorderPhotos == false) {
  //   let i = 0;
  //   event.addedFiles.forEach((element: any) => {
  //     i = i + 1;
  //     const file = event.addedFiles[i - 1];
  //     this.filesPhotos.push({ file, watermark: true });
  //   });
  //   setTimeout(() => {
  //     this.cdr.detectChanges();
  //   }, 3000);
  // } else {
  // this.isReorderPhotos = false;
  // }
  }

  onSelectFloorPlan(event: any) {
    let i = 0;
    event.addedFiles.forEach((element: any) => {
      i = i + 1;
      const file = event.addedFiles[i - 1];
      this.filesFloorPlan.push({ file, watermark: true });
    });
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 3000);



  // if(this.isReorderFloorPlan == false) {
  //   let i = 0;
  //   event.addedFiles.forEach((element: any) => {
  //     i = i + 1;
  //     const file = event.addedFiles[i - 1];
  //     this.filesFloorPlan.push({ file, watermark: true });
  //   });
  //   setTimeout(() => {
  //     this.cdr.detectChanges();
  //   }, 3000);
  // }
  // else {
  //   this.isReorderFloorPlan = false;
  // }
  }
  onSelectPDFBrochure(event: any) {
    let i = 0;
    event.addedFiles.forEach((element: any) => {
      i = i + 1;
      const file = event.addedFiles[i - 1];
      this.filesPDFBrouchure.push({ file, watermark: true });
    });
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 3000);


//   if(this.isReorderPDFBrochure == false) {
//     let i = 0;
//     event.addedFiles.forEach((element: any) => {
//       i = i + 1;
//       const file = event.addedFiles[i - 1];
//       this.filesPDFBrouchure.push({ file, watermark: true });
//     });
//     setTimeout(() => {
//       this.cdr.detectChanges();
//     }, 3000);
//   }
//   else {
// this.isReorderPDFBrochure = false;
//   }
  }
  onSelectUploadVideo(event: any) {
    let i = 0;
    event.addedFiles.forEach((element: any) => {
      i = i + 1;
      const file = event.addedFiles[i - 1];
      this.filesUploadVideo.push({ file, watermark: true });
    });
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 3000);



  // if(this.isReorderVideos == false) {
  //   let i = 0;
  //   event.addedFiles.forEach((element: any) => {
  //     i = i + 1;
  //     const file = event.addedFiles[i - 1];
  //     this.filesUploadVideo.push({ file, watermark: true });
  //   });
  //   setTimeout(() => {
  //     this.cdr.detectChanges();
  //   }, 3000);
  // }
  // else {
  //   this.isReorderVideos = false;
  // }
  }
  onSelectFileDoc(event: any) {
    this.filesDocs.push(...event.addedFiles);
  }
  onRemovePhotos(event: any, index: any) {
    this.filesPhotos.splice(index, 1);
    this.deleteImagesList.push({Type:'Photos',Name:event.file['name'],listingId:this.form.value.listingId});
  }
  onRemoveFloorPlan(event: any, index: any) {
    this.filesFloorPlan.splice(index, 1);
    this.deleteImagesList.push({Type:'FloorPlan',Name:event.file['name'],listingId:this.form.value.listingId});
  }
  onRemovePDFBrochure(event: any, index: any) {
    this.filesPDFBrouchure.splice(index, 1);
    this.deleteImagesList.push({Type:'PDFBrochure',Name:event.file['name'],listingId:this.form.value.listingId});
  }
  onRemoveUploadVideo(event: any, index: any) {
    this.filesUploadVideo.splice(index, 1);
    this.deleteImagesList.push({Type:'PDFBrochure',Name:event.file['name'],listingId:this.form.value.listingId});
  }
  onRemoveDocs(event: any) {
    this.filesDocs.splice(this.filesDocs.indexOf(event), 1);
  }
  getTitleList() {
    this.dropdownService.getTitleList().subscribe((data) => {
      this.titleList = data;
    });
  }
  getNationalityList(){
    this.dropdownService.getCountryList().subscribe((data) => {
      this.NationalitiesList = data;
    });
  }
  getGenderList() {
    this.dropdownService.getGenderList().subscribe((data) => {
      this.GenderList = data;
    });
  }
  getReligionList() {
    this.dropdownService.getReligionList().subscribe((data) => {
      this.ReligionList = data;
    });
  }
  getNativeLanguageList() {
    this.dropdownService.getLanguageList().subscribe((data) => {
      this.LanguagesList = data;
    });
  }
  getContactSourcesList() {
    this.dropdownService.getContactSourceList().subscribe((data) => {
      this.ContactSourceList = data;
    });
  }
  getContactTypeList() {
    this.dropdownService.getContactTypeList().subscribe((data) => {
      this.ContactTypeList = data;
    });
  }
  ngOnInit(): void {
    var uData = this.authService.userValue;
    if (uData != null) {
      this.userData = JSON.parse(uData);
      this.isEditListingPermission =
        this.userData.permissionAccess.filter((x: any) => x.permissionId == 15)
          .length > 0;
      this.isViewListingPermission =
        this.userData.permissionAccess.filter((x: any) => x.permissionId == 22)
          .length > 0;
      // this.isViewingTabListingPermission = this.userData.permissionAccess.filter((x:any) => x.permissionId == 28).length > 0;
    }
    this.authService.companySetting.subscribe((data: any) => {
      this.companySettings = data;
    });
    this.initForm();
    this.getTitleList();
    this.getNationalityList();
    this.getGenderList();
    this.getReligionList();
    this.getNativeLanguageList();
    this.getContactSourcesList();
    this.getContactTypeList();
    this.getAllStatus();
    this.getLanguage();
    this.getViewingStatusList();
    this.getContactsDetail = undefined;
    this.form.controls['status'].setValue(3);
    this.getTenantContactsDetail = undefined;
    this.listingSevice.isOpenListing.pipe().subscribe((data: any) => {
      this.scrollToElement('secStatus');
      if (data?.AddListing) {
        this.tempSelectedTeantContactRef = null;
        this.tempSelectedOwnerContactRef = null;
        this.IsLoading = true;
        this.getContactsDetail = undefined;
        this.getTenantContactsDetail = undefined;
        this.displayFilesPDFBrochure = [];
        this.displayFilesFloorPlan = [];
        this.displayFilesPhotos = [];
        this.displayFilesVideos = [];
        this.filesPhotos = [];
        this.filesFloorPlan = [];
        this.filesPDFBrouchure = [];
        this.filesUploadVideo = [];
        this.submitted = false;
        this.isEdit = false;
        this.displayListing = data;
        if (this.displayListing) {
          this.getPortals();
          this.getFeatures();
          this.getCommon();
          this.id = Guid.create();
          this.id = this.id?.value;
          this.onChangeStatus(3);
          this.locationList = [];
          this.subLocationList = [];
          this.selectTab('tab1');
          this.displayCancel = false;
          this.form.reset();
          this.onEditListing();
          this.basic = true;
          this.address = true;
          this.pricing = true;
          this.media = true;
          this.portal = true;
          this.feature = true;
          this.neighbourhood = true;
          this.contact = true;
          this.additional = true;
          this.getImages(0);
          this.form.controls['status'].setValue(3);
          this.IsLoading = false;
          this.getViewingStatusList();
          setTimeout(() => {
            this.setViewings();
            this.cdr.detectChanges();
          }, 3000);
        }
        this.getCompanyLogoImg(this.userData.companyId);
      } else {
        if (data?.EditListing && data?.Id != 0) {
          this.isContact = true;
          this.IsLoading = true;
          this.initForm();
          this.cdr.detectChanges();
          this.getContactsDetail = undefined;
          this.getTenantContactsDetail = undefined;
          this.displayFilesPDFBrochure = [];
          this.displayFilesFloorPlan = [];
          this.displayFilesPhotos = [];
          this.displayFilesVideos = [];
          this.filesPhotos = [];
          this.filesFloorPlan = [];
          this.filesPDFBrouchure = [];
          this.filesUploadVideo = [];
          this.submitted = false;
          this.getCommon();
          this.isEdit = true;
          this.locationList = [];
          this.subLocationList = [];
          this.displayListingId = data.Id;
          this.displayPreview = data.Id;
          this.displayCancel = false;
          this.onEdit(data.Id);
          this.onPreview();
          this.basic = true;
          this.address = true;
          this.pricing = true;
          this.media = true;
          this.portal = true;
          this.feature = true;
          this.neighbourhood = true;
          this.contact = true;
          this.additional = true;
          this.getViewingStatusList();
          this.setViewings();
          this.cdr.detectChanges();
          this.getCompanyLogoImg(this.userData.companyId);
        }
      }
    });
    this.setDetailsListing();
    this.setSearchForm();
    this.cdr.detectChanges();
    this.getAllLeadStatus();
    this.getAllLeadSubStatus();
    this.getAAgentList();
    this.getAllLeadType();
    this.getAllLeadFinance();
    this.getAllLeadPriority();
    this.getAllEmirates();
    this.getAllLocation();
    this.getAllSubLocation();
    this.getAllBeds();
    this.getAllUser();
    this.getAllAssignedTo();
  }
  getCommon() {
    this.portalList = [];
    this.featuresList = [];
    this.featuresListFeatures = [];
    this.featuresListAmenities = [];
    this.selectTab('tab1');
    this.getusage();
    this.getAssignedTo();
    this.getPurpose();
    this.getComplitionStatus();
    this.getBeds();
    this.getBaths();
    this.getFurnished();
    this.getFitted();
    this.getEmirates();
    this.getFrequency();
    this.getcheque();
    this.getPropertyStatusList();
    this.getAllSourceOfListing();
    this.getAllRemind();
    this.GetPhoneCode();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      status: [null],
      listingId: [''],
      reference: [''],
      assignedToId: [null, Validators.required],
      usageId: [null, Validators.required],
      purposeId: [null, Validators.required],
      propertyTypeId: [null, Validators.required],
      completionStatusId: [null],
      bedsId: [null],
      bathsId: [null],
      buildUpArea: ['', [Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]],
      plotArea: ['', [Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]],
      furnishedId: [null],
      fittedId: [null],
      parkingSpaces: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+([0-9])?$')],
      ],
      views: [''],
      layoutType: [''],
      ownershipDuration: [''],
      reraPermitNumber: ['', [Validators.required]],
      reraTransactionNumber: [''],
      titleDeedNumber: [''],
      createdBy: [3],
      updatedBy: [3],
      listed: [new Date()],
      updated: [new Date()],
      emiratesId: [null, [Validators.required]],
      locationId: [null, [Validators.required]],
      subLocationId: [null],
      street: [''],
      floor: [''],
      unitNumber: [''],
      frequencyId: [null],
      chequeId: [null],
      price: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')],
      ],
      pricePerSqFt: [''],
      commisionPer: ['', [Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]],
      depositPer: ['', [Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]],
      commisionAED: [''],
      depositAED: [''],
      monthlyServiceCharges: [
        '',
        [Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')],
      ],
      languageId: [1],
      school: [''],
      metro: [''],
      medicalCenter: [''],
      shoppingMall: [''],
      mosques: [''],
      beach: [''],
      superMarket: [''],
      park: [''],
      ownerContactId: [''],
      tenantContactId: [''],
      propertyStatusId: [null],
      sourceOfListingId: [null],
      expirationDate: [new Date()],
      featured: [null],
      dEWANumber: [''],
      remindId: [null],
      keyLocation: [''],
      propertyTenanted: [null],
      managed: [null],
      exclusive: [null],
      rentedAt: ['', [Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]],
      nextAvailable: [new Date()],
      sTrNumber: [''],
      rentedUntil: [new Date()],
      portals: [''],
      features: [''],
      title: [''],
      description: [''],
      photos: [''],
      waterMarkDisplayPhoto: [false],
      floorPlan: [''],
      waterMarkDisplayFloorPlan: [false],
      youtubeVideoLink: [''],
      virtualTourLink: [''],
      audioTourLink: [''],
      videoTourLink: [''],
      qrCodeLink: [''],
      pdfBrochure: [''],
      waterMarkDisplayPDFBrochure: [false],
      uploadVideo: [''],
      waterMarkDisplayVideo: [false],
      notes: [''],
      listingDocument: [''],
      documentName: [''],
      lastPublishedOn: [null],
      companyId: [this.userData.companyId]
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
  getBeds() {
    this.listingSevice.getBeds().subscribe((data: any | undefined) => {
      this.bedList = data;
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
  getEmirates() {
    // this.listingSevice.getEmirates().subscribe((data: any | undefined) => {
    //   this.emiratesList = data;
    // });
    this.listingSevice.getEmiratesByCountryId(this.companySettings.countryId).subscribe((data: any | undefined) => {
      this.emiratesList = data;
    });
  }
  getLocation() {
    this.listingSevice.getLocation().subscribe((data: any | undefined) => {
      this.locationList = data;
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
  getPortals() {
    this.portalList = [];
    this.listingSevice.getPortals().subscribe((data: any | undefined) => {
      this.portalList = data;
    });
  }
  getFeatures() {
    this.featuresList = [];
    this.listingSevice.getFeatures().subscribe((data: any | undefined) => {
      this.featuresList = data;
      this.featuresListFeatures = [];
      this.featuresListAmenities = [];
      data.forEach((element: any) => {
        if (element.featuresType == 'Features') {
          this.featuresListFeatures.push(element);
        } else {
          this.featuresListAmenities.push(element);
        }
      });
      this.cdr.detectChanges();
    });
  }

  getPropertyStatusList() {
    this.listingSevice
      .getPropertyStatus()
      .subscribe((data: any | undefined) => {
        this.propertyStatusList = data;
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
  getErrorMessage(control: any, fieldName: string) {
    if (control.hasError('required')) {
      return 'Please enter ' + fieldName + '.';
    }
    if (control.hasError('pattern')) {
      return 'Please enter ' + fieldName + ' in correct format.';
    }
    this.form.value;
    return;
  }
  getRefName() {
    var compName =
      this.form.value.assignedToId != 0 && this.form.value.assignedToId != null
        ? this.assignToList
            .find((field) => field.id === this.form.value.assignedToId)
            .name.substring(0, 3)
        : null;
    var Purpose =
      this.form.value.purposeId != 0 && this.form.value.purposeId != null
        ? this.purposeList
            .find((field) => field.id === this.form.value.purposeId)
            .name.charAt(0)
        : null;
    var property =
      this.form.value.propertyTypeId != 0 &&
      this.form.value.propertyTypeId != null
        ? this.propertyTypeList
            .find((field) => field.id === this.form.value.propertyTypeId)
            .name.charAt(0)
        : null;
    return (Purpose + '-' + property + '-').toLocaleUpperCase();
  }
 async onSubmit() {
    this.portallistdata = [];
    this.portalList.forEach((element: any) => {
      this.portallistdata.push(element.checked);
    });
    this.featurelistdata = [];
    this.featuresListFeatures.forEach((element: any) => {
      this.featurelistdata.push(element.checked);
    });
    this.featuresListAmenities.forEach((element: any) => {
      this.featurelistdata.push(element.checked);
    });
    this.form.controls['portals'].setValue(this.portallistdata.toString());
    this.form.controls['features'].setValue(this.featurelistdata.toString());
    this.submitted = true;
    if (this.form.valid) {
      this.IsLoading = true;
      if (
        (this.isEdit && this.form.value.listingId != '') ||
        this.form.value.listingId != null
      ) {
        if (
          this.form.value.listingId == '' ||
          this.form.value.listingId == null
        ) {
          this.form.value.listingId = this.displayListingId;
        }
        this.form.controls['photos'].setValue(
          this.filesPhotos.length > 0 ? this.form.value.listingId : null
        );
        this.form.controls['floorPlan'].setValue(
          this.filesFloorPlan.length > 0 ? this.form.value.listingId : null
        );
        this.form.controls['pdfBrochure'].setValue(
          this.filesPDFBrouchure.length > 0 ? this.form.value.listingId : null
        );
        this.form.controls['uploadVideo'].setValue(
          this.filesUploadVideo.length > 0 ? this.form.value.listingId : null
        );
        this.form.controls['updated'].setValue(new Date());
        this.form.controls['updatedBy'].setValue(this.userData.id);
        this.form.controls['companyId'].setValue(this.userData.companyId);
        if (this.form.controls['status'].value == 1) {
          this.form.controls['lastPublishedOn'].setValue(new Date());
        }
        try {
        await this.onSelectFile(this.form.value.listingId);
        await this.onRemoveImg();
        await this.onUpdate(this.form.value);
        }
        catch(error) {
          console.error(error);
        }
      } else {
        this.form.controls['reference'].setValue(this.getRefName());
        this.form.controls['listed'].setValue(new Date());
        this.form.controls['listingId'].setValue(this.id);
        this.form.controls['photos'].setValue(
          this.filesPhotos.length > 0 ? this.id : null
        );
        this.form.controls['floorPlan'].setValue(
          this.filesFloorPlan.length > 0 ? this.id : null
        );
        this.form.controls['pdfBrochure'].setValue(
          this.filesPDFBrouchure.length > 0 ? this.id : null
        );
        this.form.controls['uploadVideo'].setValue(
          this.filesUploadVideo.length > 0 ? this.id : null
        );
        1;
        this.form.controls['createdBy'].setValue(this.userData.id);
        this.form.controls['updatedBy'].setValue(this.userData.id);
        try {
        await this.onSelectFile(this.id);
        await this.onRemoveImg();
        if (this.form.controls['status'].value == 1) {
          this.form.controls['lastPublishedOn'].setValue(new Date());
        }
        this.form.controls['companyId'].setValue(this.userData.companyId);
        await this.onSave(this.form.value);
      }
      catch(error) {
        console.error(error);
      }
      }
      
    }

    if (this.form.invalid) {
      let ErrroKey: any[] = [];
      for (const [key] of Object.entries(this.form.controls)) {
        if (this.form.controls[key].status == 'INVALID') {
          ErrroKey.push(key);
        }
      }
      if (ErrroKey.length > 0) {
        switch (ErrroKey[0]) {
          case 'assignedToId':
          case 'usageId':
          case 'purposeId':
          case 'propertyTypeId':
          case 'parkingSpaces':
          case 'reraPermitNumber':
            this.scrollToElement('sec1');
            break;
          case 'emiratesId':
          case 'locationId':
            this.scrollToElement('sec2');
            break;
          case 'price':
          case 'frequencyId':
            this.scrollToElement('sec3');
            break;
          case 'title':
          case 'description':
            this.scrollToElement('sec4');
            break;
          default:
            break;
        }
      }
    }
  }

  async onSave(data: any) {
    await this.listingSevice
      .saveListingDetails(data)
      .then((response) => {
        if (response.status === 200 || response.status === 0) {
          this.IsLoading = false;
          this.toastr.success('Listing added successfully');
          this.listingSevice.CallListing(true);
          this.listingSevice.RemoveCheckBoxSelected(true);
          document?.getElementById('kt_activities_close')?.click();
        } else {
          this.IsLoading = false;
          this.toastr.error('Something went wrong.Please try again letter');
        }
        this.form.reset();
        this.setDropdown();
      })
      .catch((error) => {
        // Handle the error
        this.IsLoading = false;
        this.toastr.error('Something went wrong.Please try again letter');
      });
  }
  async onUpdate(data: any) {
    await this.listingSevice
      .updateListingDetails(data)
      .then((response) => {
        if (response.status === 200 || response.status === 0) {
          this.toastr.success('Listing updated successfully');
          this.IsLoading = false;
          this.listingSevice.CallListing(true);
          this.listingSevice.RemoveCheckBoxSelected(true);
          document?.getElementById('kt_activities_close')?.click();
        } else {
          this.IsLoading = false;
          this.toastr.error('Something went wrong.Please try again letter');
        }
        this.form.reset();
        this.setDropdown();
      })
      .catch((error) => {
        // Handle the error
        this.IsLoading = false;
        this.toastr.error('Something went wrong.Please try again letter');
      });
  }
  getRandomNumbers() {
    const typedArray = new Uint8Array(10);
    const randomValues = window.crypto.getRandomValues(typedArray);
    return randomValues.join('');
  }
  selectSubLocation(e: any) {
    this.subLocationList = [];
    this.form.controls['subLocationId'].setValue(null);
    this.getSubLocation(e);
  }
  getSubLocation(id: any) {
    this.subLocationList = [];
    this.listingSevice
      .GetSubLocationById(id)
      .subscribe((data: any | undefined) => {
        this.subLocationList = data;
      });
  }
  contactRenderPageBy(event:any){
    this.pageNumber = event;
    this.getAllContactDetails();
  }
  onEdit(id: any) {
    this.displayListing = false;
    this.IsLoading = true;
    this.cdr.detectChanges();
    this.listingSevice
      .GetListingDetailsById(id, this.userData.companyId)
      .subscribe((data: any | undefined) => {
        this.onChangeStatus(data.status);
        this.onChangeUsage(data.usageId);
        if (data.ownerContactId != 0 && data.ownerContactId != null) {
          this.onSelectContactData(data.ownerContactId);
        }
        if(data.tenantContactId === 0){
          this.selectedListningTenantContactId = 0;
        }
        else if (data.tenantContactId != 0 && data.tenantContactId != null) {
          this.onSelectTenantContactData(data.tenantContactId);
        }
        this.selectEmiratesByOnEdit(
          data.emiratesId == null ? 0 : data.emiratesId
        );
        if (data.emiratesId === 1 && data.status === 1) {
          this.form.controls['reraPermitNumber'].setValidators([
            Validators.required,
          ]);
          this.form.controls['reraPermitNumber'].updateValueAndValidity();
        } else {
          this.form.controls['reraPermitNumber'].clearValidators();
          this.form.controls['reraPermitNumber'].updateValueAndValidity();
        }
        this.getSubLocation(data.locationId == null ? 0 : data.locationId);
        this.createdDate = data.listed;
        this.updatedDate = data.updated;
        this.lastPublishedDate = data.lastPublishedOn;
        this.setValue(data);
        this.getPortalsbyId(id);
        this.getFeaturesbyId(id);
        this.previewData = data;
        this.form.controls['propertyTypeId'].setValue(data.propertyTypeId);
        setTimeout(() => {
          this.IsLoading = false;
          this.cdr.detectChanges();
        }, 2000);
      });
    this.getImages(id);
  }

  setValue(data: any) {
    // this.form.reset();
    if (data.purposeId == 1) {
      this.displayComplition = true;
    } else {
      this.displayComplition = false;
    }
    this.form.setValue({
      status: data.status,
      listingId: data.listingId,
      reference: data.reference,
      assignedToId: data.assignedToId == 0 ? null : data.assignedToId,
      usageId: data.usageId == 0 ? null : data.usageId,
      purposeId: data.purposeId == 0 ? null : data.purposeId,
      propertyTypeId: data.propertyTypeId,
      completionStatusId:
        data.completionStatusId == 0 ? null : data.completionStatusId,
      bedsId: data.bedsId == 0 ? null : data.bedsId,
      bathsId: data.bathsId == 0 ? null : data.bathsId,
      buildUpArea: data.buildUpArea,
      plotArea: data.plotArea,
      furnishedId: data.furnishedId == 0 ? null : data.furnishedId,
      fittedId: data.fittedId == 0 ? null : data.fittedId,
      parkingSpaces: data.parkingSpaces,
      views: data.views,
      layoutType: data.layoutType,
      ownershipDuration: data.ownershipDuration,
      reraPermitNumber: data.reraPermitNumber,
      reraTransactionNumber: data.reraTransactionNumber,
      titleDeedNumber: data.titleDeedNumber,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      listed: new Date(),
      updated: new Date(),
      emiratesId: data.emiratesId == 0 ? null : data.emiratesId,
      locationId: data.locationId == 0 ? null : data.locationId,
      subLocationId: data.subLocationId == 0 ? null : data.subLocationId,
      street: data.street,
      floor: data.floor,
      unitNumber: data.unitNumber,
      frequencyId: data.frequencyId == 0 ? null : data.frequencyId,
      chequeId: data.chequeId == 0 ? null : data.chequeId,
      price: data.price,
      pricePerSqFt:
        data.pricePerSqFt == 0 || data.pricePerSqFt == 0.0
          ? null
          : data.pricePerSqFt,
      commisionPer:
        data.commisionPer == 0 || data.commisionPer == 0.0
          ? null
          : data.commisionPer,
      commisionAED:
        data.depositPer == 0 || data.depositPer == 0.0
          ? null
          : data.commisionAED,
      depositPer:
        data.depositPer == 0 || data.depositPer == 0.0 ? null : data.depositPer,
      depositAED:
        data.depositAED == 0 || data.depositAED == 0.0 ? null : data.depositAED,
      monthlyServiceCharges: data.monthlyServiceCharges,
      school: data.school,
      metro: data.metro,
      medicalCenter: data.medicalCentre == null ? '' : data.medicalCentre,
      shoppingMall: data.shoppingMall,
      mosques: data.mosques,
      beach: data.beach,
      superMarket: data.supermarket == null ? '' : data.supermarket,
      park: data.park,
      languageId: data.languageId == 1 ? 1 : data.languageId,
      tenantContactId: data.tenantContactId == null ? '' : data.tenantContactId,
      ownerContactId: data.ownerContactId == null ? '' : data.ownerContactId,
      propertyStatusId:
        data.propertyStatusId == 0 ? null : data.propertyStatusId,
      sourceOfListingId:
        data.sourceOfListingId == 0 ? null : data.sourceOfListingId,
      expirationDate:
        data.expirationDate == null ? null : moment(data.expirationDate).format("YYYY-MM-DD"),
      featured: data.featured,
      dEWANumber: data.dewaNumber == null ? '' : data.dewaNumber,
      remindId: data.remindId == 0 ? null : data.remindId,
      keyLocation: data.keyLocation,
      propertyTenanted: data.propertyTenanted ,
      managed: data.managed,
      exclusive: data.exclusive,
      rentedAt: data.rentedAt,
      nextAvailable:
        data.nextAvailable == null ? null : moment(data.nextAvailable).format("YYYY-MM-DD"),
      sTrNumber: data.strNumber == null ? '' : data.strNumber,
      rentedUntil: data.rentedUntil == null ? null : moment(data.rentedUntil).format("YYYY-MM-DD"),
      portals: '',
      features: '',
      title: data.title,
      description: data.description,
      photos: data?.photos == undefined ? '' : data.photos,
      waterMarkDisplayPhoto: data.waterMarkDisplayPhoto ? true : false,
      floorPlan: data?.floorPlan == undefined ? '' : data.floorPlan,
      waterMarkDisplayFloorPlan: data?.waterMarkDisplayFloorPlan ? true : false,
      youtubeVideoLink:
        data?.youtubeVideoLink == undefined ? '' : data.youtubeVideoLink,
      virtualTourLink:
        data?.virtualTourLink == undefined ? '' : data.virtualTourLink,
      audioTourLink: data?.audioTourLink == undefined ? '' : data.audioTourLink,
      videoTourLink: data?.videoTourLink == undefined ? '' : data.videoTourLink,
      qrCodeLink: data?.qrCodeLink == undefined ? '' : data.qrCodeLink,
      pdfBrochure: data?.pdfBrochure == undefined ? '' : data.pdfBrochure,
      waterMarkDisplayPDFBrochure: data.waterMarkDisplayPDFBrochure
        ? true
        : false,
      uploadVideo: data?.uploadVideo == undefined ? '' : data.uploadVideo,
      waterMarkDisplayVideo: data?.waterMarkDisplayVideo ? true : false,
      notes: '',
      listingDocument: '',
      documentName: '',
      lastPublishedOn:
        data.lastPublishedOn == null ? null : new Date(data.lastPublishedOn),
      companyId: this.userData.companyId
    });
    this.totalLengthTitle = data.title == null ? 0 : data.title.length;
    this.totalLengthDescription =
      data.description == null ? 0 : data.description.length;
    this.totalWordLengthDescription =
      data.description == null ? 0 : data.description.split(/\s+/).length;
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 3000);
  }
  onChangePortals(event: any, cat: any) {
    // Use appropriate model type instead of any
    this.portalList.forEach((element: any) => {
      if (element.name == cat.name) {
        return (element.checked = cat.checked);
      }
    });
  }
  onChangeFeatures(event: any, cat: any) {
    // Use appropriate model type instead of any
    this.featuresListFeatures.forEach((element: any) => {
      if (element.name == cat.name) {
        return (element.checked = cat.checked);
      }
    });
  }
  onChangeFeaturesAmenitied(event: any, cat: any) {
    // Use appropriate model type instead of any
    this.featuresListAmenities.forEach((element: any) => {
      if (element.name == cat.name) {
        return (element.checked = cat.checked);
      }
    });
  }
  onChangeUsage(e: any) {
    // this.form.controls['usageId'].setValue(e);
    this.form.controls['propertyTypeId'].setValue(null);
    this.propertyTypeList = [];
    this.getProperyType(e);
  }
  getPortalsbyId(id: string) {
    this.portalList = [];
    this.listingSevice.getPortalsById(id).subscribe((data: any | undefined) => {
      this.portalList = data;
    });
  }
  getFeaturesbyId(id: string) {
    this.featuresList = [];
    this.listingSevice
      .getFeaturesById(id)
      .subscribe((data: any | undefined) => {
        this.featuresList = data;
        this.featuresListFeatures = [];
        this.featuresListAmenities = [];
        data.forEach((element: any) => {
          if (element.featuresType == 'Features') {
            this.featuresListFeatures.push(element);
          } else {
            this.featuresListAmenities.push(element);
          }
        });
        this.cdr.detectChanges();
      });
  }
  getAllStatus() {
    this.listingSevice
      .getAllListingStatus()
      .subscribe((data: any | undefined) => {
        this.statusList = data;
      });
  }
  GetPhoneCode() {
    this.listingSevice.GetPhoneCode().subscribe((data: any | undefined) => {
      this.phoneCodeList = data;
    });
  }
  changeFormula($event: any) {
    this.form.controls['commisionPer'].setValue(
      (
        (Number(
          this.form.value.commisionPer ? this.form.value.commisionPer : null
        ) /
          Number(this.form.value.price ? this.form.value.price : null)) *
        100
      ).toFixed(2) == 'Infinity' ||
        (
          (Number(
            this.form.value.commisionPer ? this.form.value.commisionPer : null
          ) /
            Number(this.form.value.price ? this.form.value.price : null)) *
          100
        ).toFixed(2) == 'NaN' ||
        (
          (Number(
            this.form.value.commisionPer ? this.form.value.commisionPer : null
          ) /
            Number(this.form.value.price ? this.form.value.price : null)) *
          100
        ).toFixed(2) == '0' ||
        (
          (Number(
            this.form.value.commisionPer ? this.form.value.commisionPer : null
          ) /
            Number(this.form.value.price ? this.form.value.price : null)) *
          100
        ).toFixed(2) == '0.00'
        ? null
        : (
            (Number(
              this.form.value.commisionPer ? this.form.value.commisionPer : null
            ) /
              Number(this.form.value.price ? this.form.value.price : null)) *
            100
          ).toFixed(2)
    );
    this.form.controls['pricePerSqFt'].setValue(
      (
        Number(this.form.value.price) /
        Number(this.form.value.buildUpArea ? this.form.value.buildUpArea : null)
      ).toFixed(2) == 'Infinity' ||
        (
          Number(this.form.value.price) /
          Number(
            this.form.value.buildUpArea ? this.form.value.buildUpArea : null
          )
        ).toFixed(2) == 'NaN' ||
        (
          Number(this.form.value.price) /
          Number(
            this.form.value.buildUpArea ? this.form.value.buildUpArea : null
          )
        ).toFixed(2) == '0' ||
        (
          Number(this.form.value.price) /
          Number(
            this.form.value.buildUpArea ? this.form.value.buildUpArea : null
          )
        ).toFixed(2) == '0.00'
        ? null
        : (
            Number(this.form.value.price) /
            Number(
              this.form.value.buildUpArea ? this.form.value.buildUpArea : null
            )
          ).toFixed(2)
    );
    this.form.controls['depositAED'].setValue(
      (
        (Number(this.form.value.price ? this.form.value.price : null) *
          Number(
            this.form.value.depositAED ? this.form.value.depositAED : null
          )) /
        100
      ).toFixed(2) == 'Infinity' ||
        (
          (Number(this.form.value.price ? this.form.value.price : null) *
            Number(
              this.form.value.depositAED ? this.form.value.depositAED : null
            )) /
          100
        ).toFixed(2) == 'NaN' ||
        (
          (Number(this.form.value.price ? this.form.value.price : null) *
            Number(
              this.form.value.depositAED ? this.form.value.depositAED : null
            )) /
          100
        ).toFixed(2) == '0' ||
        (
          (Number(this.form.value.price ? this.form.value.price : null) *
            Number(
              this.form.value.depositAED ? this.form.value.depositAED : null
            )) /
          100
        ).toFixed(2) == '0.00'
        ? null
        : (
            (Number(this.form.value.price ? this.form.value.price : null) *
              Number(
                this.form.value.depositAED ? this.form.value.depositAED : null
              )) /
            100
          ).toFixed(2)
    );
    this.form.controls['depositPer'].setValue(
      (
        (Number(
          this.form.value.depositPer ? this.form.value.depositPer : null
        ) /
          Number(this.form.value.price ? this.form.value.price : null)) *
        100
      ).toFixed(2) == 'Infinity' ||
        (
          (Number(
            this.form.value.depositPer ? this.form.value.depositPer : null
          ) /
            Number(this.form.value.price ? this.form.value.price : null)) *
          100
        ).toFixed(2) == 'NaN' ||
        (
          (Number(
            this.form.value.depositPer ? this.form.value.depositPer : null
          ) /
            Number(this.form.value.price ? this.form.value.price : null)) *
          100
        ).toFixed(2) == '0' ||
        (
          (Number(
            this.form.value.depositPer ? this.form.value.depositPer : null
          ) /
            Number(this.form.value.price ? this.form.value.price : null)) *
          100
        ).toFixed(2) == '0.00'
        ? null
        : (
            (Number(
              this.form.value.depositPer ? this.form.value.depositPer : null
            ) /
              Number(this.form.value.price ? this.form.value.price : null)) *
            100
          ).toFixed(2)
    );
    this.form.controls['commisionAED'].setValue(
      (
        (Number(this.form.value.price ? this.form.value.price : null) *
          Number(
            this.form.value.commisionAED ? this.form.value.commisionAED : null
          )) /
        100
      ).toFixed(2) === 'Infinity' ||
        (
          (Number(this.form.value.price ? this.form.value.price : null) *
            Number(
              this.form.value.commisionAED ? this.form.value.commisionAED : null
            )) /
          100
        ).toFixed(2) == 'NaN' ||
        (
          (Number(this.form.value.price ? this.form.value.price : null) *
            Number(
              this.form.value.commisionAED ? this.form.value.commisionAED : null
            )) /
          100
        ).toFixed(2) == '0' ||
        (
          (Number(this.form.value.price ? this.form.value.price : null) *
            Number(
              this.form.value.commisionAED ? this.form.value.commisionAED : null
            )) /
          100
        ).toFixed(2) == '0.00'
        ? null
        : (
            (Number(this.form.value.price ? this.form.value.price : null) *
              Number(
                this.form.value.commisionAED
                  ? this.form.value.commisionAED
                  : null
              )) /
            100
          ).toFixed(2)
    );
  }
  selectEmirates(e: any) {
    this.locationList = [];
    this.subLocationList = [];
    this.form.controls['locationId'].setValue(null);
    this.form.controls['subLocationId'].setValue(null);
    if (e === 1 && this.form.value.status === 1) {
      this.form.controls['reraPermitNumber'].setValidators([
        Validators.required,
      ]);
      this.form.controls['reraPermitNumber'].updateValueAndValidity();
    } else {
      this.form.controls['reraPermitNumber'].clearValidators();
      this.form.controls['reraPermitNumber'].updateValueAndValidity();
    }
    this.listingSevice
      .getLocationByEmirates(e)
      .subscribe((data: any | undefined) => {
        this.locationList = data;
      });
  }
  selectEmiratesByOnEdit(e: any) {
    this.locationList = [];
    this.listingSevice
      .getLocationByEmirates(e)
      .subscribe((data: any | undefined) => {
        this.locationList = data;
      });
  }
  onPreview() {
    this.disbledFields = true;
    // this.form.controls['status'].disable();
    this.form.controls['assignedToId'].disable();
    this.form.controls['usageId'].disable();
    this.form.controls['purposeId'].disable();
    this.form.controls['propertyTypeId'].disable();
    this.form.controls['completionStatusId'].disable();
    this.form.controls['bedsId'].disable();
    this.form.controls['bathsId'].disable();
    this.form.controls['buildUpArea'].disable();
    this.form.controls['plotArea'].disable();
    this.form.controls['furnishedId'].disable();
    this.form.controls['fittedId'].disable();
    this.form.controls['parkingSpaces'].disable();
    this.form.controls['views'].disable();
    this.form.controls['layoutType'].disable();
    this.form.controls['ownershipDuration'].disable();
    this.form.controls['reraPermitNumber'].disable();
    this.form.controls['reraTransactionNumber'].disable();
    this.form.controls['titleDeedNumber'].disable();
    this.form.controls['createdBy'].disable();
    this.form.controls['updatedBy'].disable();
    this.form.controls['listed'].disable();
    this.form.controls['updated'].disable();
    this.form.controls['emiratesId'].disable();
    this.form.controls['locationId'].disable();
    this.form.controls['subLocationId'].disable();
    this.form.controls['street'].disable();
    this.form.controls['floor'].disable();
    this.form.controls['unitNumber'].disable();
    this.form.controls['frequencyId'].disable();
    this.form.controls['chequeId'].disable();
    this.form.controls['price'].disable();
    this.form.controls['pricePerSqFt'].disable();
    this.form.controls['commisionPer'].disable();
    this.form.controls['depositPer'].disable();
    this.form.controls['commisionAED'].disable();
    this.form.controls['depositAED'].disable();
    this.form.controls['monthlyServiceCharges'].disable();
    this.form.controls['school'].disable();
    this.form.controls['metro'].disable();
    this.form.controls['medicalCenter'].disable();
    this.form.controls['shoppingMall'].disable();
    this.form.controls['mosques'].disable();
    this.form.controls['beach'].disable();
    this.form.controls['superMarket'].disable();
    this.form.controls['park'].disable();
    // this.form.controls['ownerFirstName'].disable();
    // this.form.controls['ownerLastName'].disable();
    // this.form.controls['ownerMobileNo'].disable();
    // this.form.controls['ownerEmail'].disable();
    // this.form.controls['tenantFirstName'].disable();
    // this.form.controls['tenantLastName'].disable();
    // this.form.controls['tenantMobileNo'].disable();
    // this.form.controls['tenantEmail'].disable();
    this.form.controls['propertyStatusId'].disable();
    this.form.controls['sourceOfListingId'].disable();
    this.form.controls['expirationDate'].disable();
    this.form.controls['featured'].disable();
    this.form.controls['dEWANumber'].disable();
    this.form.controls['remindId'].disable();
    this.form.controls['keyLocation'].disable();
    this.form.controls['propertyTenanted'].disable();
    this.form.controls['managed'].disable();
    this.form.controls['exclusive'].disable();
    this.form.controls['rentedAt'].disable();
    this.form.controls['nextAvailable'].disable();
    this.form.controls['sTrNumber'].disable();
    this.form.controls['rentedUntil'].disable();
    this.form.controls['portals'].disable();
    this.form.controls['features'].disable();
    this.form.controls['title'].disable();
    this.form.controls['description'].disable();
    this.form.controls['photos'].disable();
    this.form.controls['floorPlan'].disable();
    this.form.controls['youtubeVideoLink'].disable();
    this.form.controls['virtualTourLink'].disable();
    this.form.controls['audioTourLink'].disable();
    this.form.controls['videoTourLink'].disable();
    this.form.controls['qrCodeLink'].disable();
    this.form.controls['pdfBrochure'].disable();
    this.form.controls['uploadVideo'].disable();
    this.form.controls['listingDocument'].disable();
    this.form.controls['documentName'].disable();
    this.form.controls['languageId'].disable();
  }
  onCancel() {
    this.deleteImagesList=[];
    this.setDropdown();
    this.onEditListing();
    this.displayPreview = this.displayListingId;
    this.onChangeStatus(this.displayPreview.status);
    this.filesPhotos = [];
    this.filesFloorPlan = [];
    this.filesPDFBrouchure = [];
    this.filesUploadVideo = [];
    this.onEdit(this.displayPreview);
    this.isContact = true;
    this.onPreview();
  }

  onEditListing() {
    if (!this.displayListing) {
      this.displayListing = !this.displayListing;
    }
    this.isContact = false;
    this.disbledFields = false;
    // this.form.controls['status'].enable();
    this.form.controls['assignedToId'].enable();
    this.form.controls['usageId'].enable();
    this.form.controls['purposeId'].enable();
    this.form.controls['propertyTypeId'].enable();
    this.form.controls['completionStatusId'].enable();
    this.form.controls['bedsId'].enable();
    this.form.controls['bathsId'].enable();
    this.form.controls['buildUpArea'].enable();
    this.form.controls['plotArea'].enable();
    this.form.controls['furnishedId'].enable();
    this.form.controls['fittedId'].enable();
    this.form.controls['parkingSpaces'].enable();
    this.form.controls['views'].enable();
    this.form.controls['layoutType'].enable();
    this.form.controls['ownershipDuration'].enable();
    this.form.controls['reraPermitNumber'].enable();
    this.form.controls['reraTransactionNumber'].enable();
    this.form.controls['titleDeedNumber'].enable();
    this.form.controls['createdBy'].enable();
    this.form.controls['updatedBy'].enable();
    this.form.controls['listed'].enable();
    this.form.controls['updated'].enable();
    this.form.controls['emiratesId'].enable();
    this.form.controls['locationId'].enable();
    this.form.controls['subLocationId'].enable();
    this.form.controls['street'].enable();
    this.form.controls['floor'].enable();
    this.form.controls['unitNumber'].enable();
    this.form.controls['frequencyId'].enable();
    this.form.controls['chequeId'].enable();
    this.form.controls['price'].enable();
    this.form.controls['pricePerSqFt'].enable();
    this.form.controls['commisionPer'].enable();
    this.form.controls['depositPer'].enable();
    this.form.controls['commisionAED'].enable();
    this.form.controls['depositAED'].enable();
    this.form.controls['monthlyServiceCharges'].enable();
    this.form.controls['school'].enable();
    this.form.controls['metro'].enable();
    this.form.controls['medicalCenter'].enable();
    this.form.controls['shoppingMall'].enable();
    this.form.controls['mosques'].enable();
    this.form.controls['beach'].enable();
    this.form.controls['superMarket'].enable();
    this.form.controls['park'].enable();
    this.form.controls['propertyStatusId'].enable();
    this.form.controls['sourceOfListingId'].enable();
    this.form.controls['expirationDate'].enable();
    this.form.controls['featured'].enable();
    this.form.controls['dEWANumber'].enable();
    this.form.controls['remindId'].enable();
    this.form.controls['keyLocation'].enable();
    this.form.controls['propertyTenanted'].enable();
    this.form.controls['managed'].enable();
    this.form.controls['exclusive'].enable();
    this.form.controls['rentedAt'].enable();
    this.form.controls['nextAvailable'].enable();
    this.form.controls['sTrNumber'].enable();
    this.form.controls['rentedUntil'].enable();
    this.form.controls['portals'].enable();
    this.form.controls['features'].enable();
    this.form.controls['title'].enable();
    this.form.controls['description'].enable();
    this.form.controls['photos'].enable();
    this.form.controls['floorPlan'].enable();
    this.form.controls['youtubeVideoLink'].enable();
    this.form.controls['virtualTourLink'].enable();
    this.form.controls['audioTourLink'].enable();
    this.form.controls['videoTourLink'].enable();
    this.form.controls['qrCodeLink'].enable();
    this.form.controls['pdfBrochure'].enable();
    this.form.controls['uploadVideo'].enable();
    this.form.controls['listingDocument'].enable();
    this.form.controls['documentName'].enable();
    this.form.controls['languageId'].enable();
  }
  onSelect1(event: any) {
    const file = event.addedFiles[event.addedFiles.length - 1];

    this.filesPhotos.push({ file, watermark: true });

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 3000);
  }
  async onSelectFile(uploadId: any) {
    for (const element of this.filesPhotos) {
      if (element) {
        var reader = new FileReader();
        this.fileToUpload = element.file;
        this.form.controls['photos'].setValue(uploadId);
        const formData: FormData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        formData.append('docType', 'Photos');
        formData.append('companyUrl', this.companyImagePath);
        formData.append('companyId', this.userData.companyId);
        formData.append('watermark', element.watermark);
        formData.append('listingId', uploadId);
        var a = await this.uploadiMg(formData);
      }
    }
    for (const element of this.filesFloorPlan)
    {
      if (element) {
        var reader = new FileReader();
        this.fileToUpload = element.file;
        this.form.controls['floorPlan'].setValue(uploadId);
        const formData: FormData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        formData.append('docType', 'FloorPlan');
        formData.append('companyUrl', this.companyImagePath);
        formData.append('companyId', this.userData.companyId);
        formData.append('watermark', element.watermark);
        formData.append('listingId', uploadId);
        var a = await this.uploadiMg(formData);
      }
    };
    for (const element of this.filesPDFBrouchure) {
      if (element) {
        var reader = new FileReader();
        this.fileToUpload = element.file;
        this.form.controls['pdfBrochure'].setValue(uploadId);
        const formData: FormData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        formData.append('companyUrl', this.companyImagePath);
        formData.append('docType', 'PDFBrochure');
        formData.append('companyId', this.userData.companyId);
        formData.append('watermark', element.watermark);
        formData.append('listingId', uploadId);

        var a = await this.uploadiMg(formData);
      }
    };
    for (const element of this.filesUploadVideo) {
      if (element) {
        var reader = new FileReader();
        this.fileToUpload = element.file;
        this.form.controls['uploadVideo'].setValue(uploadId);
        const formData: FormData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        formData.append('docType', 'UploadVideo');
        formData.append('companyUrl', this.companyImagePath);
        formData.append('companyId', this.userData.companyId);
        formData.append('watermark', element.watermark);
        formData.append('listingId', uploadId);

        var a = await this.uploadiMg(formData);
      }
    };
    // this.filesDocs.forEach((element:any) => {
    //   if (element) {
    //     var reader = new FileReader();
    //     this.fileToUpload =element;
    //     this.form.value.documents =this.id;
    //     const formData: FormData = new FormData();
    //     formData.append('file', this.fileToUpload, this.fileToUpload.name);
    //     formData.append('docType', 'Documents');
    //     formData.append('listingId', this.id);
    //     this.listingSevice
    //       .UploadPhoto(formData)
    //       .subscribe((data: any | undefined) => {
    //         this.handleUpload(data);
    //       });
    //   }
    // });
  }
   async uploadiMg(formData: any):Promise<any> {
    
      return new Promise<boolean>((resolve, reject) => {
        this.listingSevice
      .UploadPhoto(formData)
      .then((data: any | undefined) => {
        this.handleUpload(data);
        resolve(true);
      })
      .catch((error) => {
        resolve(false);
      });
      });


  }
  handleUpload(data: any) {
    var data = data.message;
  }
  changesValidators(e: any) {
    if (e == '1') {
      this.form.controls['usageId'].setValidators([Validators.required]);
      this.form.controls['usageId'].updateValueAndValidity();
      this.form.controls['purposeId'].setValidators([Validators.required]);
      this.form.controls['purposeId'].updateValueAndValidity();
      this.form.controls['propertyTypeId'].setValidators([Validators.required]);
      this.form.controls['propertyTypeId'].updateValueAndValidity();
      this.form.controls['buildUpArea'].setValidators([
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['buildUpArea'].updateValueAndValidity();
      this.form.controls['plotArea'].setValidators([
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['plotArea'].updateValueAndValidity();
      this.form.controls['emiratesId'].setValidators([Validators.required]);
      this.form.controls['emiratesId'].updateValueAndValidity();
      this.form.controls['locationId'].setValidators([Validators.required]);
      this.form.controls['locationId'].updateValueAndValidity();
      this.form.controls['price'].setValidators([
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['price'].updateValueAndValidity();
      this.form.controls['commisionPer'].setValidators([
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['commisionPer'].updateValueAndValidity();
      this.form.controls['depositPer'].setValidators([
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['depositPer'].updateValueAndValidity();
      this.form.controls['monthlyServiceCharges'].setValidators([
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['monthlyServiceCharges'].updateValueAndValidity();
      if (this.form.controls['emiratesId'].value === 1) {
        this.form.controls['reraPermitNumber'].setValidators([
          Validators.required,
        ]);
        this.form.controls['reraPermitNumber'].updateValueAndValidity();
      } else {
        this.form.controls['reraPermitNumber'].clearValidators();
        this.form.controls['reraPermitNumber'].updateValueAndValidity();
      }
      this.form.controls['parkingSpaces'].setValidators([
        Validators.pattern('^[0-9]+([0-9])?$'),
      ]);
      this.form.controls['parkingSpaces'].updateValueAndValidity();
      // this.form.controls['ownerEmail'].setValidators([Validators.email]);
      // this.form.controls['ownerEmail'].updateValueAndValidity();
      // this.form.controls['tenantEmail'].setValidators([Validators.email]);
      // this.form.controls['tenantEmail'].updateValueAndValidity();
      this.form.controls['title'].setValidators([Validators.required]);
      this.form.controls['title'].updateValueAndValidity();
      this.form.controls['description'].setValidators([Validators.required]);
      this.form.controls['description'].updateValueAndValidity();
    } else {
      this.form.controls['usageId'].setValidators([Validators.required]);
      this.form.controls['usageId'].updateValueAndValidity();
      this.form.controls['purposeId'].setValidators([Validators.required]);
      this.form.controls['purposeId'].updateValueAndValidity();
      this.form.controls['propertyTypeId'].setValidators([Validators.required]);
      this.form.controls['propertyTypeId'].updateValueAndValidity();
      this.form.controls['buildUpArea'].setValidators([
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['buildUpArea'].updateValueAndValidity();
      this.form.controls['plotArea'].setValidators([
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['plotArea'].updateValueAndValidity();
      this.form.controls['emiratesId'].setValidators([Validators.required]);
      this.form.controls['emiratesId'].updateValueAndValidity();
      this.form.controls['locationId'].clearValidators();
      this.form.controls['locationId'].updateValueAndValidity();
      this.form.controls['price'].setValidators([
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['price'].updateValueAndValidity();
      this.form.controls['commisionPer'].setValidators([
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['commisionPer'].updateValueAndValidity();
      this.form.controls['depositPer'].setValidators([
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['depositPer'].updateValueAndValidity();
      this.form.controls['monthlyServiceCharges'].setValidators([
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['monthlyServiceCharges'].updateValueAndValidity();
      this.form.controls['parkingSpaces'].setValidators([
        Validators.pattern('^[0-9]+([0-9])?$'),
      ]);
      this.form.controls['parkingSpaces'].updateValueAndValidity();
      this.form.controls['rentedAt'].setValidators([
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
      ]);
      this.form.controls['rentedAt'].updateValueAndValidity();
    }
    if (this.submitted) {
      this.submitted = false;
    }
  }

  getImagePhotos(data: any, id: any) {
    this.displayFilesPhotos = [];
    this.listingSevice
      .GetAllImagesPath(data, id)
      .subscribe(async (data: any | undefined) => {
        for (let index = 0; index < data?.result?.length; index++) {
          const element = data?.result[index];
          var imageurl = this.baseUrl + element.imagePath;
          const base641 = await this.toDataURL(imageurl);
          console.log('base641', base641);
          const imageBlob = this.dataURItoBlob_new(base641);
  
          var fileext = element.name.split('.').pop();
          const imageFile = {
            file: new File([imageBlob], element.name, { type: 'image/' + fileext }),
            watermark: element.watermark,
          };
          this.filesPhotos.push(imageFile);
          this.cdr.detectChanges();
          console.log('photos', this.filesPhotos);
        }
  
        this.displayFilesPhotos = data?.result;
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 2000);
      });
  }
  toDataURL(url: any): Promise<string> {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("Failed to fetch image"));
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }
  
  getBase64FromUrl = async (url: any) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  async getBase64ImageFromUrl(imageUrl: any) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }
  dataURItoBlob_new(dataURI: any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  getImageFloorPhotos(data: any, id: any) {
    this.displayFilesFloorPlan = [];
    this.listingSevice
      .GetAllImagesPath(data, id)
      .subscribe(async (data: any | undefined) => {
        for (let index = 0; index < data?.result?.length; index++) {
          const element = data?.result[index];
          var imageurl = this.baseUrl + element.imagePath;
          const base641 = await this.toDataURL(imageurl);
          console.log('base641', base641);
          const imageBlob = this.dataURItoBlob_new(base641);
  
          var fileext = element.name.split('.').pop();
          const imageFile = {
            file: new File([imageBlob], element.name, { type: 'image/' + fileext }),
            watermark: element.watermark,
          };
          this.filesFloorPlan.push(imageFile);
          this.cdr.detectChanges();
          console.log('filesFloorPlan', this.filesFloorPlan);
        }
  
        this.displayFilesFloorPlan = data?.result;
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 2000);
      });
  }
  getImagePDFBrochure(data: any, id: any) {
    this.displayFilesPDFBrochure = [];
    this.listingSevice
      .GetAllImagesPath(data, id)
      .subscribe(async (data: any | undefined) => {
        for (let index = 0; index < data?.result?.length; index++) {
          const element = data?.result[index];
          var imageurl = this.baseUrl + element.imagePath;
          const base641 = await this.toDataURL(imageurl);
          console.log('base641', base641);
          const imageBlob = this.dataURItoBlob_new(base641);
  
          var fileext = element.name.split('.').pop();
          const imageFile = {
            file: new File([imageBlob], element.name, { type: 'image/' + fileext }),
            watermark: element.watermark,
          };
          this.filesPDFBrouchure.push(imageFile);
          this.cdr.detectChanges();
          console.log('filesPDFBrouchure', this.filesPDFBrouchure);
        }
  
        this.displayFilesPDFBrochure = data?.result;
  
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 2000);
      });
  }
  getImageVideos(data: any, id: any) {
    this.displayFilesVideos = [];
    this.listingSevice
      .GetAllImagesPath(data, id)
      .subscribe(async (data: any | undefined) => {
        for (let index = 0; index < data?.result?.length; index++) {
          const element = data?.result[index];
          var imageurl = this.baseUrl + element.imagePath;
          const base641 = await this.toDataURL(imageurl);
          console.log('base641', base641);
          const imageBlob = this.dataURItoBlob_new(base641);
  
          var fileext = element.name.split('.').pop();
          const imageFile = {
            file: new File([imageBlob], element.name, { type: 'image/' + fileext }),
            watermark: element.watermark,
          };
          this.filesUploadVideo.push(imageFile);
          this.cdr.detectChanges();
          console.log('filesUploadVideo', this.filesUploadVideo);
        }
  
        this.displayFilesVideos = data?.result;
  
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 2000);
      });
  }
  setDropdown() {
    this.form.controls['status'].setValue(3);
    this.form.controls['assignedToId'].setValue(null);
    this.form.controls['usageId'].setValue(null);
    this.form.controls['purposeId'].setValue(null);
    this.form.controls['propertyStatusId'].setValue(null);
    this.form.controls['propertyTypeId'].setValue(null);
    this.form.controls['bedsId'].setValue(null);
    this.form.controls['bathsId'].setValue(null);
    this.form.controls['furnishedId'].setValue(null);
    this.form.controls['fittedId'].setValue(null);
    this.form.controls['emiratesId'].setValue(null);
    this.form.controls['locationId'].setValue(null);
    this.form.controls['subLocationId'].setValue(null);
    this.form.controls['chequeId'].setValue(null);
    this.form.controls['sourceOfListingId'].setValue(null);
    this.form.controls['remindId'].setValue(null);
    this.form.controls['exclusive'].setValue(null);
    this.form.controls['managed'].setValue(null);
    this.form.controls['propertyTenanted'].setValue(null);
    this.form.controls['featured'].setValue(null);
    this.form.controls['languageId'].setValue(1);
    this.cdr.detectChanges();
  }
  onChangeStatus(e: any) {
    this.clearValidators();
    this.changesValidators(e);
  }

  onPurposeSelection(e: any) {
    if (e == 2) {
      this.form.controls['frequencyId'].setValidators([Validators.required]);
      this.form.controls['frequencyId'].updateValueAndValidity();
    } else {
      this.form.controls['frequencyId'].clearValidators();
      this.form.controls['frequencyId'].updateValueAndValidity();
    }
  }
  displayCancelBtn() {
    this.displayCancel = true;
  }
  preventDefault(event: Event) {
    event.stopPropagation();
  }
  onchangeWatermarkForPhoto(e: any) {
    this.waterMarkPhotos = !this.waterMarkPhotos;
    this.form.controls['waterMarkDisplayPhoto'].setValue(this.waterMarkPhotos);
  }
  onchangeWatermarkForFloorPlan(e: any) {
    this.waterMarkFloorPlan = !this.waterMarkFloorPlan;
    this.form.controls['waterMarkDisplayFloorPlan'].setValue(
      this.waterMarkFloorPlan
    );
  }
  onchangeWatermarkForPDFBrochure(e: any) {
    this.waterMarkPdfBrouchure = !this.waterMarkPdfBrouchure;
    this.form.controls['waterMarkDisplayPDFBrochure'].setValue(
      this.waterMarkPdfBrouchure
    );
  }
  onchangeWatermarkForVideo(e: any) {
    this.waterMarkVideo = !this.waterMarkVideo;
    this.form.controls['waterMarkDisplayVideo'].setValue(this.waterMarkVideo);
  }

  onChangeDrp(name: any, e: any) {
    this.form.controls[name].setValue(e);
  }
  onTitleCount(e: any) {
    this.totalLengthTitle = e.target.value.length;
  }
  changeAEDFormula(name: any, e: any) {
    this.form.controls[name].setValue(
      (
        (Number(this.form.value.price ? this.form.value.price : 0) *
          Number(e.target.value)) /
        100
      ).toFixed(2) == 'NaN' ||
        (
          (Number(this.form.value.price ? this.form.value.price : 0) *
            Number(e.target.value)) /
          100
        ).toFixed(2) == 'Infinity' ||
        (
          (Number(this.form.value.price ? this.form.value.price : 0) *
            Number(e.target.value)) /
          100
        ).toFixed(2) == '0' ||
        (
          (Number(this.form.value.price ? this.form.value.price : 0) *
            Number(e.target.value)) /
          100
        ).toFixed(2) == '0.00'
        ? null
        : (
            (Number(this.form.value.price ? this.form.value.price : 0) *
              Number(e.target.value)) /
            100
          ).toFixed(2)
    );
  }
  onDescriptionCount(e: any) {
    this.totalLengthDescription = e.target.value.length;
    this.totalWordLengthDescription = e.target.value.split(/\s+/).length;
  }
  changePerFormula(name: any, e: any) {
    this.form.controls[name].setValue(
      (
        (Number(e.target.value) /
          Number(this.form.value.price ? this.form.value.price : 0)) *
        100
      ).toFixed(2) == 'NaN' ||
        (
          (Number(e.target.value) /
            Number(this.form.value.price ? this.form.value.price : 0)) *
          100
        ).toFixed(2) == 'Infinity' ||
        (
          (Number(e.target.value) /
            Number(this.form.value.price ? this.form.value.price : 0)) *
          100
        ).toFixed(2) == '0' ||
        (
          (Number(e.target.value) /
            Number(this.form.value.price ? this.form.value.price : 0)) *
          100
        ).toFixed(2) == '0.00'
        ? null
        : (
            (Number(e.target.value) /
              Number(this.form.value.price ? this.form.value.price : 0)) *
            100
          ).toFixed(2)
    );
  }
  clearValidators() {
    this.form.controls['buildUpArea'].clearValidators();
    this.form.controls['buildUpArea'].updateValueAndValidity();
    this.form.controls['plotArea'].clearValidators();
    this.form.controls['plotArea'].updateValueAndValidity();
    this.form.controls['locationId'].clearValidators();
    this.form.controls['locationId'].updateValueAndValidity();
    this.form.controls['price'].clearValidators();
    this.form.controls['price'].updateValueAndValidity();
    this.form.controls['commisionPer'].clearValidators();
    this.form.controls['commisionPer'].updateValueAndValidity();
    this.form.controls['depositPer'].clearValidators();
    this.form.controls['depositPer'].updateValueAndValidity();
    this.form.controls['monthlyServiceCharges'].clearValidators();
    this.form.controls['monthlyServiceCharges'].updateValueAndValidity();
    this.form.controls['reraPermitNumber'].clearValidators();
    this.form.controls['reraPermitNumber'].updateValueAndValidity();
    // this.form.controls['reraTransactionNumber'].clearValidators();
    // this.form.controls['reraTransactionNumber'].updateValueAndValidity();
    // this.form.controls['titleDeedNumber'].clearValidators();
    // this.form.controls['titleDeedNumber'].updateValueAndValidity();
    this.form.controls['parkingSpaces'].clearValidators();
    this.form.controls['parkingSpaces'].updateValueAndValidity();
    // this.form.controls['ownerEmail'].clearValidators();
    // this.form.controls['ownerEmail'].updateValueAndValidity();
    // this.form.controls['tenantEmail'].clearValidators();
    // this.form.controls['tenantEmail'].updateValueAndValidity();
    this.form.controls['title'].clearValidators();
    this.form.controls['title'].updateValueAndValidity();
    this.form.controls['description'].clearValidators();
    this.form.controls['description'].updateValueAndValidity();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getStatusValue() {
    return this.statusList.find((x) => (x.id = this.form.value.status)).name;
  }
  setDetailsListing() {
    this.ContactBasicForm = this.formBuilder.group({
      reference: new FormControl(),
      leadTypeId: new FormControl(null),
      financeId: new FormControl(null),
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
      listingRef: new FormControl(null),
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
      leadsTypes: new FormControl('2'),
      toUpdated: new FormControl(),
      contactRef: new FormControl(),
      page: [1],
      itemsPerPage: [10],
      sortFiled: ['Updated'],
      sortDirection: [true],
      companyId: this.userData.companyId,
      userId: this.userData.id,
    });
  }
  onLeadSave() {
    if (this.viewingData && this.viewingData.id != 0) {
      this.Viewings.controls['notes'].setValue(this.Viewings.value.notes);
      this.Viewings.controls['agentId'].setValue(this.userData.id);
      this.Viewings.controls['statusId'].setValue(this.Viewings.value.statusId);
      this.Viewings.controls['startDate'].setValue(
        this.Viewings.value.startDate == null
          ? this.getLeadUsingId.startDate
          : this.Viewings.value.startDate
      );
      this.Viewings.controls['startDateTime'].setValue(
        this.Viewings.value.startDateTime == null
          ? this.getLeadUsingId.startDateTime
          : this.Viewings.value.startDateTime
      );
      this.Viewings.controls['endDate'].setValue(
        this.Viewings.value.endDate == null
          ? this.getLeadUsingId.endDate
          : this.Viewings.value.endDate
      );
      this.Viewings.controls['endDateTime'].setValue(
        this.Viewings.value.endDateTime == null
          ? this.getLeadUsingId.endDateTime
          : this.Viewings.value.endDateTime
      );
      this.Viewings.controls['leadId'].setValue(this.getLeadUsingId.id);
      this.Viewings.controls['updatedBy'].setValue(this.userData.id);
      this.Viewings.controls['companyId'].setValue(this.userData.companyId);
      this.viewingService
        .EditViewingDetails(this.Viewings.value)
        .subscribe((data: any) => {
          this.GetViewLeadDetailsByListingRef(this.previewData.id);
          this.toastr.success('Viewing updated successfully');
        });
      this.cancelLead();
    } else {
      this.isViewingSubmitted = true;
      if (this.Viewings.valid) {
        this.Viewings.controls['id'].setValue(0);
        this.Viewings.controls['listingId'].setValue(this.previewData.id);
        this.Viewings.controls['leadId'].setValue(this.getLeadUsingId.id);
        this.Viewings.controls['createdBy'].setValue(this.userData.id);
        this.Viewings.controls['updatedBy'].setValue(this.userData.id);
        this.Viewings.controls['companyId'].setValue(this.userData.companyId);
        this.viewingService
          .InsertViewingDetails(this.Viewings.value)
          .subscribe((data: any) => {
            this.GetViewLeadDetailsByListingRef(this.previewData.id);
            this.toastr.success('Viewing added successfully');
            this.scrollToElement('edit-viewing-tab');
          });
        this.cancelLead();
      }
    }
  }
  cancelLead() {
    this.isViewingSubmitted = false;
    this.leadViewingApplay = null;
    this.selectedLeadId = 0;
    this.getLeadUsingId = null;
    this.viewingData = null;
    this.viewingDataForm = false;
    this.addViewingButton = true;
    this.Viewings.reset();

    this.onChangeViewingStatus(1);
  }
  openViewingLead() {
    this.setDetailsListing();
    this.leadData(
      this.ContactBasicForm.value.sortFiled,
      this.ContactBasicForm.value.sortDirection,
      this.page,
      this.itemsPerPage
    );
    return new Promise<boolean>((resolve) => {
      this.ViewList = this.modalService.open(this.modalLeadViewingList, {
        size: 'lg',
      });
      this.ViewList.result.then(resolve, resolve);
    });
  }
  closeLeadist() {
    if(this.getLeadUsingId == '' || this.getLeadUsingId == undefined)
    {
      this.leadViewingApplay = null;
    }
    this.selectedTenantId = 0;
    this.ViewList.close(this.modalLeadViewingList);
  }
  leadData(sortFiled: any, sortDirection: any, page: any, itemPerPage: any) {
    this.ContactBasicForm.controls['sortFiled'].setValue(sortFiled);
    this.ContactBasicForm.controls['sortDirection'].setValue(sortDirection);
    this.ContactBasicForm.controls['page'].setValue(page);
    this.ContactBasicForm.controls['itemsPerPage'].setValue(this.itemsPerPage);
    this.leadsService
      .getAllLeadDetailsUsiFilter(this.ContactBasicForm.value)
      .subscribe(
        (data: any | undefined) => {
          this.leadDetailsList = data;
          if (data.length > 0) {
            this.totalItems = data[0].totalCount;
          } else {
            this.totalItems = 0;
          }
          this.cdr.detectChanges();
        },
        (error) => {}
      );
  }
  goToLink(url: string) {
    var urlWithId = url + '?id=' + this.form.value.listingId;
    window.open(urlWithId, '_blank');
  }
  closeActivities() {
    this.selectedListningTenantContactId = 0;
    this.tempSelectedTeantContactRef= null;
    this.tempSelectedOwnerContactRef= null;
    this.listingSevice.openDrawer(false);
    this.selectedListningOwnerContactId = 0;

    this.listingSevice.SelectListingId(0);
    this.listingSevice.RemoveCheckBoxSelected(true);
  }
  onSelectContactData(id:any){
    this.selectedListningOwnerContactId = id;
    this.tempSelectedOwnerContactRef = id;
    this.form.controls['ownerContactId'].setValue(id);
    this.contactService
      .GetContact(id, this.userData.companyId)
      .subscribe((data: any) => {
        this.getContactsDetail = data;
        this.dispayContactOwner = true;
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 1000);
        this.closeContact();
      });
  }
  onSelectContact(id: any) {
    this.onSelectioOfContact = id;
    this.tempSelectedOwnerContactRef = id;
    this.onSelectioOfContact = id;
    this.cdr.detectChanges();
    // this.form.controls['ownerContactId'].setValue(id);
    // this.contactService
    //   .GetContact(id, this.userData.companyId)
    //   .subscribe((data: any) => {
    //     this.getContactsDetail = data;
    //     this.dispayContactOwner = true;
    //     setTimeout(() => {
    //       this.cdr.detectChanges();
    //     }, 1000);
    //     this.closeContact();
    //   });
  }
  contactOwnerDataSave(){
    this.selectedListningOwnerContactId = this.onSelectioOfContact;
   this.form.controls['ownerContactId'].setValue( this.onSelectioOfContact);
   this.getContactsDetail = this.ContactDetailsList.find((x:any) => x.id == this.onSelectioOfContact);

   this.dispayContactOwner = true;
   this.cdr.detectChanges();
   this.closeContact();

    // this.contactService
    //   .GetContact( this.onSelectioOfContact, this.userData.companyId)
    //   .subscribe((data: any) => {
    //     this.getContactsDetail = data;
    //     this.dispayContactOwner = true;
    //     // setTimeout(() => {
    //       this.cdr.detectChanges();
    //     // }, 1000);
    //     this.closeContact();
    //   });
  }
  contactOwnerDataClose(){
    this.closeContact();
  }
  onSelectTenantContactData(id: any){
    this.onSelectioOfContactTeant = id;
    this.tempSelectedTeantContactRef = id;
    this.selectedListningTenantSaveContactId = id;
 this.form.controls['tenantContactId'].setValue(id);
    this.contactService
      .GetContact(id, this.userData.companyId)
      .subscribe((data: any) => {
        this.getTenantContactsDetail = data;
        this.cdr.detectChanges();
        this.closeTenantContact();
      });
  }
  onSelectTenantContact(id: any) {
    this.onSelectioOfContactTeant = id;
    this.tempSelectedTeantContactRef = id;
    this.cdr.detectChanges();
  // this.form.controls['tenantContactId'].setValue(id);
    // this.contactService
    //   .GetContact(id, this.userData.companyId)
    //   .subscribe((data: any) => {
    //     this.getTenantContactsDetail = data;
    //     this.cdr.detectChanges();
    //     this.closeTenantContact();
    //   });s
  }
  contactDataTeantClose(){
    if(this.getTenantContactsDetail == '' || this.getTenantContactsDetail == undefined)
    {
      this.tempSelectedTeantContactRef = null;
    }
    this.closeTenantContact();
  }
  contactDataTeantSave(){
  this.selectedListningTenantContactId = this.onSelectioOfContactTeant;
  this.selectedListningTenantSaveContactId = this.selectedListningTenantContactId;
  this.getTenantContactsDetail = this.ContactDetailsList.find((x:any) => x.id === this.onSelectioOfContactTeant);
  this.cdr.detectChanges();
  this.closeTenantContact();
  this.form.controls['tenantContactId'].setValue(this.onSelectioOfContactTeant);
    // this.contactService
    //   .GetContact(this.onSelectioOfContactTeant, this.userData.companyId)
    //   .subscribe((data: any) => {
    //     this.getTenantContactsDetail = data;
    //     this.cdr.detectChanges();
    //     this.closeTenantContact();
    //   });
  }
  AddContact(): Promise<boolean> {
    this.pageNumber = 1;
    //this.getAllContactDetails();
    this.searchContactForm.reset()
    this.searchContacts();
    if(this.isEdit !== false){
      if(this.getContactsDetail == '' || this.getContactsDetail == undefined){
        this.selectedListningOwnerContactId = 0;
      }else{
        this.selectedListningOwnerContactId = this.selectedListningOwnerContactId;
     }
    }
   

    return new Promise<boolean>((resolve) => {
      this.createOwnerContact = this.modalService.open(this.modalContent, {
        size: 'lg',
      });
      this.createOwnerContact.result.then(resolve, resolve);
    });
  }
  AddTenantContact(): Promise<boolean> {
    this.pageNumber = 1;
    this.getAllContactDetails();
    this.searchContactForm.reset()
    if(this.isEdit !== false){
      if(this.getTenantContactsDetail == '' || this.getTenantContactsDetail == undefined){
        this.selectedListningTenantContactId = 0;
      }else{
        this.selectedListningTenantContactId = this.selectedListningTenantSaveContactId
      }
    }
    else if(this.isEdit == false && this.tempSelectedTeantContactRef == null){
      this.selectedListningTenantContactId = 0;
    }
  
    this.searchContacts();
    return new Promise<boolean>((resolve) => {
      this.createTenantContact = this.modalService.open(
        this.modalTenantContent,
        {
          size: 'lg',
        }
      );
      this.createTenantContact.result.then(resolve, resolve);
    });
  }
  async closeContact(): Promise<void> {
    if(this.getContactsDetail == '' || this.getContactsDetail == undefined){
      this.tempSelectedOwnerContactRef = null;
    }
    this.createOwnerContact.close(this.modalConfig);
  }
  async closeTenantContact(): Promise<void> {
    if(this.getTenantContactsDetail == '' || this.getTenantContactsDetail == undefined)
    {
      this.tempSelectedTeantContactRef = null;
      this.selectedListningTenantContactId = 0;
    }
    this.createTenantContact.close(this.modalTenantContentConfig);
  }
  onChangeSubStatus(e: any) {
    this.getAllLeadSubStatusById(e);
  }
  getAllLeadSubStatusById(id: any) {
    this.leadsService.getAllLeadSubStatusById(id).subscribe((data: any) => {
      this.subStatusList = data;
    });
  }
  onSwitchChange(field: any, e: any) {
    if (e.target.checked == true) {
      this.form.controls[field].setValue(true);
    } else {
      this.form.controls[field].setValue(false);
    }
  }

  setSearchForm() {
    this.searchContactForm = new FormGroup({
      filterVip: new FormControl(),
      filterAssignee: new FormControl(),
      filterRef: new FormControl(),
      filterTitle: new FormControl(),
      filterFirstName: new FormControl(),
      filterLastName: new FormControl(),
      filterGender: new FormControl(),
      //filterDOB: new FormControl(),
      filterFromDOB: new FormControl(),
      filterToDOB: new FormControl(),
      filterNationality1: new FormControl(),
      filterNationality2: new FormControl(),
      filterReligion: new FormControl(),
      filterNativeLanguage: new FormControl(),
      filterSecondLanguage: new FormControl(),
      filterPersonalMobile: new FormControl(),
      filterWorkMobile: new FormControl(),
      filterOtherMobile: new FormControl(),
      filterPersonalPhone: new FormControl(),
      filterWorkPhone: new FormControl(),
      filterOtherPhone: new FormControl(),
      filterPersonalEmail: new FormControl(),
      filterWorkEmail: new FormControl(),
      filterOtherEmail: new FormControl(),
      // filterPersonalFax: new FormControl(),
      // filterWorkFax: new FormControl(),
      // filterOtherFax: new FormControl(),
      filterPersonalPO: new FormControl(),
      filterPersonalAddressLine1: new FormControl(),
      filterPersonalAddressLine2: new FormControl(),
      filterPersonalCity: new FormControl(),
      filterPersonalZipCode: new FormControl(),
      filterPersonalState: new FormControl(),
      filterPersonalCountry: new FormControl(),
      filterWorkPO: new FormControl(),
      filterWorkAddressLine1: new FormControl(),
      filterWorkAddressLine2: new FormControl(),
      filterWorkCity: new FormControl(),
      filterWorkZipCode: new FormControl(),
      filterWorkState: new FormControl(),
      filterWorkCountry: new FormControl(),
      filterFacebookLink: new FormControl(),
      filterTwitterLink: new FormControl(),
      filterLinkedInLink: new FormControl(),
      filterSkypeLink: new FormControl(),
      filterGooglePlusLink: new FormControl(),
      filterInstagramLink: new FormControl(),
      filterWeChatLink: new FormControl(),
      // filterSocialWebsite: new FormControl(),
      filterWebsiteLink: new FormControl(),
      filterContactSource: new FormControl(),
      filterCompanyName: new FormControl(),
      filterDesignation: new FormControl(),
      filterWesbite: new FormControl(),
      filterContactType: new FormControl(),
      //filterCreated: new FormControl(),
      filterCreatedBy: new FormControl(),
      //filterUpdated: new FormControl(),
      filterUpdatedBy: new FormControl(),
      filterCreatedFrom: new FormControl(),
      filterCreatedTo: new FormControl(),
      filterUpdatedFrom: new FormControl(),
      filterUpdatedTo: new FormControl(),
    });
  }

  getAllContactDetails() {
    this.ContactDetailsList = [];
    this.contactService
      .GetAllContactDetails({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sortColumn: this.sortColumn,
        sortDir: this.sortDir,
        // filterVip: this.searchContactForm.value?.filterVip == null ? false : this.searchContactForm.value?.filterVip,
        filterVip: this.searchContactForm.value?.filterVip,
        filterAssignee: this.searchContactForm.value?.filterAssignee,
        filterRef: this.searchContactForm.value?.filterRef,
        filterTitle: this.searchContactForm.value?.filterTitle,
        filterFirstName: this.searchContactForm.value?.filterFirstName,
        filterLastName: this.searchContactForm.value?.filterLastName,
        filterGender: this.searchContactForm.value?.filterGender,
        //filterDOB: this.searchContactForm.value?.filterDOB,
        // filterFromDOB: this.searchContactForm.value?.filterFromDOB,
        // filterToDOB: this.searchContactForm.value?.filterToDOB,
        filterNationality1: this.searchContactForm.value?.filterNationality1,
        filterNationality2: this.searchContactForm.value?.filterNationality2,
        filterReligion: this.searchContactForm.value?.filterReligion,
        filterNativeLanguage: this.searchContactForm.value?.filterNativeLanguage,
        filterSecondLanguage:
          this.searchContactForm.value?.filterSecondLanguage,
        filterPersonalMobile:
          this.searchContactForm.value?.filterPersonalMobile,
        filterWorkMobile: this.searchContactForm.value?.filterWorkMobile,
        filterOtherMobile: this.searchContactForm.value?.filterOtherMobile,
        filterPersonalPhone: this.searchContactForm.value?.filterPersonalPhone,
        filterWorkPhone: this.searchContactForm.value?.filterWorkPhone,
        filterOtherPhone: this.searchContactForm.value?.filterOtherPhone,
        filterPersonalEmail: this.searchContactForm.value?.filterPersonalEmail,
        filterWorkEmail: this.searchContactForm.value?.filterWorkEmail,
        filterOtherEmail: this.searchContactForm.value?.filterOtherEmail,
        // filterPersonalFax: this.searchContactForm.value?.filterPersonalFax,
        // filterWorkFax: this.searchContactForm.value?.filterWorkFax,
        // filterOtherFax: this.searchContactForm.value?.filterOtherFax,
        filterPersonalPO: this.searchContactForm.value?.filterPersonalPO,
        filterPersonalAddressLine1:
          this.searchContactForm.value?.filterPersonalAddressLine1,
        filterPersonalAddressLine2:
          this.searchContactForm.value?.filterPersonalAddressLine2,
        filterPersonalCity: this.searchContactForm.value?.filterPersonalCity,
        filterPersonalZipCode:
          this.searchContactForm.value?.filterPersonalZipCode,
        filterPersonalState: this.searchContactForm.value?.filterPersonalState,
        filterPersonalCountry:
          this.searchContactForm.value?.filterPersonalCountry,
        filterWorkPO: this.searchContactForm.value?.filterWorkPO,
        filterWorkAddressLine1:
          this.searchContactForm.value?.filterWorkAddressLine1,
        filterWorkAddressLine2:
          this.searchContactForm.value?.filterWorkAddressLine2,
        filterWorkCity: this.searchContactForm.value?.filterWorkCity,
        filterWorkZipCode: this.searchContactForm.value?.filterWorkZipCode,
        filterWorkState: this.searchContactForm.value?.filterWorkState,
        filterWorkCountry: this.searchContactForm.value?.filterWorkCountry,
        filterFacebookLink: this.searchContactForm.value?.filterFacebookLink,
        filterTwitterLink: this.searchContactForm.value?.filterTwitterLink,
        filterLinkedInLink: this.searchContactForm.value?.filterLinkedInLink,
        filterSkypeLink: this.searchContactForm.value?.filterSkypeLink,
        filterGooglePlusLink:
          this.searchContactForm.value?.filterGooglePlusLink,
        filterInstagramLink: this.searchContactForm.value?.filterInstagramLink,
        filterWeChatLink: this.searchContactForm.value?.filterWeChatLink,
        // filterSocialWebsite: this.searchContactForm.value?.filterSocialWebsite,
        filterWebsiteLink: this.searchContactForm.value?.filterWebsiteLink,
        filterContactSource: this.searchContactForm.value?.filterContactSource,
        filterCompanyName: this.searchContactForm.value?.filterCompanyName,
        filterDesignation: this.searchContactForm.value?.filterDesignation,
        filterWebsite: this.searchContactForm.value?.filterWebsite,
        filterContactType: this.searchContactForm.value?.filterContactType,
        //filterCreated: this.searchContactForm.value?.filterCreated,
        filterCreatedFrom: this.searchContactForm.value?.filterCreatedFrom,
        filterCreatedTo: this.searchContactForm.value?.filterCreatedTo,
        filterUpdatedFrom: this.searchContactForm.value?.filterUpdatedFrom,
        filterUpdatedTo: this.searchContactForm.value?.filterUpdatedTo,
        filterCreatedBy: this.searchContactForm.value?.filterCreatedBy,
        //filterUpdated: this.searchContactForm.value?.filterUpdated,
        filterUpdatedBy: this.searchContactForm.value?.filterUpdatedBy,
        companyId: this.userData.companyId,
        roleId: this.userData.roleId,
        userId: this.userData.id
  
      })
      .subscribe((data) => {
        this.ContactList = data;
        this.ContactDetailsList = data;
        if (this.ContactDetailsList.length > 0) {
          this.totalRecord = this.ContactDetailsList[0].totalCount;
        } else {
          this.totalRecord = 0;
        }
        this.cdr.detectChanges();
      });
  }

  getMobile(type: any, data: any) {
    var mobile = data?.filter((x: any) => x.mobileType == type);
    if (mobile.length > 0) {
      return mobile
        .map((x: any) => x.countryCodeString + ' ' + x.mobile)
        .join(', ');
    } else {
      return '';
    }
  }

  getPhone(type: any, data: any) {
    var mobile = data?.filter((x: any) => x.phoneType == type);
    if (mobile.length > 0) {
      return mobile
        .map((x: any) => x.countryCodeString + ' ' + x.phone)
        .join(', ');
    } else {
      return '';
    }
  }

  getEmail(type: any, data: any) {
    var mobile = data?.filter((x: any) => x.emailType == type);
    if (mobile.length > 0) {
      return mobile.map((x: any) => x.email).join(', ');
    } else {
      return '';
    }
  }

  getFax(type: any, data: any) {
    var mobile = data?.filter((x: any) => x.faxType == type);
    if (mobile.length > 0) {
      return mobile
        .map((x: any) => x.countryCodeString + ' ' + x.fax)
        .join(', ');
    } else {
      return '';
    }
  }

  getPO(type: any, data: any) {
    var address = data?.filter((x: any) => x.addressType == type);
    if (address.length > 0) {
      return address[0].poBox;
    } else {
      return '';
    }
  }

  getAddressLine1(type: any, data: any) {
    var address = data?.filter((x: any) => x.addressType == type);
    if (address.length > 0) {
      return address[0].addressLine1;
    } else {
      return '';
    }
  }

  getAddressLine2(type: any, data: any) {
    var address = data?.filter((x: any) => x.addressType == type);
    if (address.length > 0) {
      return address[0].addressLine2;
    } else {
      return '';
    }
  }

  getCity(type: any, data: any) {
    var address = data?.filter((x: any) => x.addressType == type);
    if (address.length > 0) {
      return address[0].city;
    } else {
      return '';
    }
  }

  getZipCode(type: any, data: any) {
    var address = data?.filter((x: any) => x.addressType == type);
    if (address.length > 0) {
      return address[0].zipCode;
    } else {
      return '';
    }
  }

  getState(type: any, data: any) {
    var address = data?.filter((x: any) => x.addressType == type);
    if (address.length > 0) {
      return address[0].state;
    } else {
      return '';
    }
  }

  getCountry(type: any, data: any) {
    var address = data?.filter((x: any) => x.addressType == type);
    if (address.length > 0) {
      return address[0].countryString;
    } else {
      return '';
    }
  }

  filterContact() {
    this.pageSize = 25;
    this.pageNumber = 1;
    this.searchContacts();
  }

  searchContacts() {
    this.IsLoading = true;
    this.contactService
      .GetAllContactDetails({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sortColumn: this.sortColumn,
        sortDir: this.sortDir,
        //filterVip: this.searchContactForm.value?.filterVip == null ? false : this.searchContactForm.value?.filterVip,
        filterVip: this.searchContactForm.value?.filterVip,
        FilterAssignee: this.searchContactForm.value?.filterAssignee,
        filterRef: this.searchContactForm.value?.filterRef,
        filterTitle: this.searchContactForm.value?.filterTitle,
        filterFirstName: this.searchContactForm.value?.filterFirstName,
        filterLastName: this.searchContactForm.value?.filterLastName,
        filterGender: this.searchContactForm.value?.filterGender,
        //filterDOB: this.searchContactForm.value?.filterDOB,
        filterFromDOB: this.searchContactForm.value?.filterFromDOB,
        filterToDOB: this.searchContactForm.value?.filterToDOB,
        filterNationality1: this.searchContactForm.value?.filterNationality1,
        filterNationality2: this.searchContactForm.value?.filterNationality2,
        filterReligion: this.searchContactForm.value?.filterReligion,
        filterNativeLanguage: this.searchContactForm.value?.filterNativeLanguage,
        filterSecondLanguage:
          this.searchContactForm.value?.filterSecondLanguage,
        filterPersonalMobile:
          this.searchContactForm.value?.filterPersonalMobile,
        filterWorkMobile: this.searchContactForm.value?.filterWorkMobile,
        filterOtherMobile: this.searchContactForm.value?.filterOtherMobile,
        filterPersonalPhone: this.searchContactForm.value?.filterPersonalPhone,
        filterWorkPhone: this.searchContactForm.value?.filterWorkPhone,
        filterOtherPhone: this.searchContactForm.value?.filterOtherPhone,
        filterPersonalEmail: this.searchContactForm.value?.filterPersonalEmail,
        filterWorkEmail: this.searchContactForm.value?.filterWorkEmail,
        filterOtherEmail: this.searchContactForm.value?.filterOtherEmail,
        // filterPersonalFax: this.searchContactForm.value?.filterPersonalFax,
        // filterWorkFax: this.searchContactForm.value?.filterWorkFax,
        // filterOtherFax: this.searchContactForm.value?.filterOtherFax,
        filterPersonalPO: this.searchContactForm.value?.filterPersonalPO,
        filterPersonalAddressLine1:
          this.searchContactForm.value?.filterPersonalAddressLine1,
        filterPersonalAddressLine2:
          this.searchContactForm.value?.filterPersonalAddressLine2,
        filterPersonalCity: this.searchContactForm.value?.filterPersonalCity,
        filterPersonalZipCode:
          this.searchContactForm.value?.filterPersonalZipCode,
        filterPersonalState: this.searchContactForm.value?.filterPersonalState,
        filterPersonalCountry:
          this.searchContactForm.value?.filterPersonalCountry,
        filterWorkPO: this.searchContactForm.value?.filterWorkPO,
        filterWorkAddressLine1:
          this.searchContactForm.value?.filterWorkAddressLine1,
        filterWorkAddressLine2:
          this.searchContactForm.value?.filterWorkAddressLine2,
        filterWorkCity: this.searchContactForm.value?.filterWorkCity,
        filterWorkZipCode: this.searchContactForm.value?.filterWorkZipCode,
        filterWorkState: this.searchContactForm.value?.filterWorkState,
        filterWorkCountry: this.searchContactForm.value?.filterWorkCountry,
        filterFacebookLink: this.searchContactForm.value?.filterFacebookLink,
        filterTwitterLink: this.searchContactForm.value?.filterTwitterLink,
        filterLinkedInLink: this.searchContactForm.value?.filterLinkedInLink,
        filterSkypeLink: this.searchContactForm.value?.filterSkypeLink,
        filterGooglePlusLink:
          this.searchContactForm.value?.filterGooglePlusLink,
        filterInstagramLink: this.searchContactForm.value?.filterInstagramLink,
        filterWeChatLink: this.searchContactForm.value?.filterWeChatLink,
        // filterSocialWebsite: this.searchContactForm.value?.filterSocialWebsite,
        filterWebsiteLink: this.searchContactForm.value?.filterWebsiteLink,
        filterContactSource: this.searchContactForm.value?.filterContactSource,
        filterCompanyName: this.searchContactForm.value?.filterCompanyName,
        filterDesignation: this.searchContactForm.value?.filterDesignation,
        filterWebsite: this.searchContactForm.value?.filterWebsite,
        filterContactType: this.searchContactForm.value?.filterContactType,
        //filterCreated: this.searchContactForm.value?.filterCreated,
        filterCreatedBy: this.searchContactForm.value?.filterCreatedBy,
        //filterUpdated: this.searchContactForm.value?.filterUpdated,
        filterCreatedFrom: this.searchContactForm.value?.filterCreatedFrom,
        filterCreatedTo: this.searchContactForm.value?.filterCreatedTo,
        filterUpdatedFrom: this.searchContactForm.value?.filterUpdatedFrom,
        filterUpdatedTo: this.searchContactForm.value?.filterUpdatedTo,
        filterUpdatedBy: this.searchContactForm.value?.filterUpdatedBy,
        companyId: this.userData.companyId,
        roleId: this.userData.roleId,
        userId: this.userData.id
  
      })
      .subscribe((data) => {
        this.ContactList = data;
        this.ContactDetailsList = data;
        if (this.ContactDetailsList.length > 0) {
          this.totalRecord = this.ContactDetailsList[0].totalCount;
        } else {
          this.totalRecord = 0;
        }
        this.IsLoading = false;
        this.cdr.detectChanges();
      });
  }

  OnSort(field: string) {
    if (this.sortColumn === field) {
      this.sortDir = this.sortDir === true ? false : true;
    } else {
      this.sortColumn = field;
      this.sortDir = false;
    }
    this.pageNumber = 1;
    this.searchContacts();
  }
  renderPage(event: any) {
    this.pageNumber = event;
    this.searchContacts();
  }

  MinCharSearch(e: any, data: any) {
    switch (data) {
      case 'Ref':
        if (
          this.searchContactForm.value?.filterRef.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterRef)
        ) {
          this.isFilterRef = false;
          if (this.searchContactForm.value?.filterRef.length >= 3) {
            this.isFilterRef = true;
          }

          this.filterContact();
        }
        break;
      case 'FirstName':
        if (
          this.searchContactForm.value?.filterFirstName.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterFirstName)
        ) {
          this.isFilterFirstName = false;
          if (this.searchContactForm.value?.filterFirstName.length >= 3) {
            this.isFilterFirstName = true;
          }
          this.filterContact();
        }
        break;
      case 'LastName':
        if (
          this.searchContactForm.value?.filterLastName.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterLastName)
        ) {
          this.isFilterLastName = false;
          if (this.searchContactForm.value?.filterLastName.length >= 3) {
            this.isFilterLastName = true;
          }
          this.filterContact();
        }
        break;
      case 'PersonalMobile':
        if (
          this.searchContactForm.value?.filterPersonalMobile.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterPersonalMobile)
        ) {
          this.isFilterPersonalMobile = false;
          if (this.searchContactForm.value?.filterPersonalMobile.length >= 3) {
            this.isFilterPersonalMobile = true;
          }
          this.filterContact();
        }
        break;
      case 'WorkMobile':
        if (
          this.searchContactForm.value?.filterWorkMobile.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWorkMobile)
        ) {
          this.isFilterWorkMobile = false;
          if (this.searchContactForm.value?.filterWorkMobile.length >= 3) {
            this.isFilterWorkMobile = true;
          }
          this.filterContact();
        }
        break;
      case 'OtherMobile':
        if (
          this.searchContactForm.value?.filterOtherMobile.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterOtherMobile)
        ) {
          this.isFilterOtherMobile = false;
          if (this.searchContactForm.value?.filterOtherMobile.length >= 3) {
            this.isFilterOtherMobile = true;
          }
          this.filterContact();
        }
        break;
      case 'PersonalPhone':
        if (
          this.searchContactForm.value?.filterPersonalPhone.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterPersonalPhone)
        ) {
          this.isFilterPersonalPhone = false;
          if (this.searchContactForm.value?.filterPersonalPhone.length >= 3) {
            this.isFilterPersonalPhone = true;
          }
          this.filterContact();
        }
        break;
      case 'WorkPhone':
        if (
          this.searchContactForm.value?.filterWorkPhone.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWorkPhone)
        ) {
          this.isFilterWorkPhone = false;
          if (this.searchContactForm.value?.filterWorkPhone.length >= 3) {
            this.isFilterWorkPhone = true;
          }
          this.filterContact();
        }
        break;
      case 'OtherPhone':
        if (
          this.searchContactForm.value?.filterOtherPhone.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterOtherPhone)
        ) {
          this.isFilterOtherPhone = false;
          if (this.searchContactForm.value?.filterOtherPhone.length >= 3) {
            this.isFilterOtherPhone = true;
          }
          this.filterContact();
        }
        break;
      case 'PersonalEmail':
        if (
          this.searchContactForm.value?.filterPersonalEmail.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterPersonalEmail)
        ) {
          this.isFilterPersonalEmail = false;
          if (this.searchContactForm.value?.filterPersonalEmail.length >= 3) {
            this.isFilterPersonalEmail = true;
          }
          this.filterContact();
        }
        break;
      case 'WorkEmail':
        if (
          this.searchContactForm.value?.filterWorkEmail.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWorkEmail)
        ) {
          this.isFilterWorkEmail = false;
          if (this.searchContactForm.value?.filterWorkEmail.length >= 3) {
            this.isFilterWorkEmail = true;
          }
          this.filterContact();
        }
        break;
      case 'OtherEmail':
        if (
          this.searchContactForm.value?.filterOtherEmail.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterOtherEmail)
        ) {
          this.isFilterOtherEmail = false;
          if (this.searchContactForm.value?.filterOtherEmail.length >= 3) {
            this.isFilterOtherEmail = true;
          }
          this.filterContact();
        }
        break;
      case 'PersonalFax':
        if (
          this.searchContactForm.value?.filterPersonalFax.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterPersonalFax)
        ) {
          this.isFilterPersonalFax = false;
          if (this.searchContactForm.value?.filterPersonalFax.length >= 3) {
            this.isFilterPersonalFax = true;
          }
          this.filterContact();
        }
        break;
      case 'WorkFax':
        if (
          this.searchContactForm.value?.filterWorkFax.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWorkFax)
        ) {
          this.isFilterWorkFax = false;
          if (this.searchContactForm.value?.filterWorkFax.length >= 3) {
            this.isFilterWorkFax = true;
          }
          this.filterContact();
        }
        break;
      case 'OtherFax':
        if (
          this.searchContactForm.value?.filterOtherFax.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterOtherFax)
        ) {
          this.isFilterOtherFax = false;
          if (this.searchContactForm.value?.filterOtherFax.length >= 3) {
            this.isFilterOtherFax = true;
          }
          this.filterContact();
        }
        break;
      case 'PersonalPO':
        if (
          this.searchContactForm.value?.filterPersonalPO.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterPersonalPO)
        ) {
          this.isFilterPersonalPO = false;
          if (this.searchContactForm.value?.filterPersonalPO.length >= 3) {
            this.isFilterPersonalPO = true;
          }
          this.filterContact();
        }
        break;
      case 'PersonalAddressLine1':
        if (
          this.searchContactForm.value?.filterPersonalAddressLine1.length >=
            3 ||
          (e.target.value.length == 0 &&
            this.isFilterRef &&
            this.isFilterPersonalAddressLine1)
        ) {
          this.isFilterPersonalAddressLine1 = false;
          if (
            this.searchContactForm.value?.filterPersonalAddressLine1.length >= 3
          ) {
            this.isFilterPersonalAddressLine1 = true;
          }
          this.filterContact();
        }
        break;
      case 'PersonalAddressLine2':
        if (
          this.searchContactForm.value?.filterPersonalAddressLine2.length >=
            3 ||
          (e.target.value.length == 0 && this.isFilterPersonalAddressLine2)
        ) {
          this.isFilterPersonalAddressLine2 = false;
          if (
            this.searchContactForm.value?.filterPersonalAddressLine2.length >= 3
          ) {
            this.isFilterPersonalAddressLine2 = true;
          }
          this.filterContact();
        }
        break;
      case 'PersonalCity':
        if (
          this.searchContactForm.value?.filterPersonalCity.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterPersonalCity)
        ) {
          this.isFilterPersonalCity = false;
          if (this.searchContactForm.value?.filterPersonalCity.length >= 3) {
            this.isFilterPersonalCity = true;
          }
          this.filterContact();
        }
        break;
      case 'PersonalZipCode':
        if (
          this.searchContactForm.value?.filterPersonalCity.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterPersonalZip)
        ) {
          this.isFilterPersonalZip = false;
          if (this.searchContactForm.value?.filterPersonalCity.length >= 3) {
            this.isFilterPersonalZip = true;
          }
          this.filterContact();
        }
        break;
      case 'PersonalState':
        if (
          this.searchContactForm.value?.filterPersonalState.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterPersonalState)
        ) {
          this.isFilterPersonalState = false;
          if (this.searchContactForm.value?.filterPersonalState.length >= 3) {
            this.isFilterPersonalState = true;
          }
          this.filterContact();
        }
        break;
      case 'WorkPO':
        if (
          this.searchContactForm.value?.filterWorkPO.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWorkPO)
        ) {
          this.isFilterWorkPO = false;
          if (this.searchContactForm.value?.filterWorkPO.length >= 3) {
            this.isFilterWorkPO = true;
          }
          this.filterContact();
        }
        break;
      case 'WorkAddressLine1':
        if (
          this.searchContactForm.value?.filterWorkAddressLine1.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWorkAddressLine1)
        ) {
          this.isFilterWorkAddressLine1 = false;
          if (
            this.searchContactForm.value?.filterWorkAddressLine1.length >= 3
          ) {
            this.isFilterWorkAddressLine1 = true;
          }
          this.filterContact();
        }
        break;
      case 'WorkAddressLine2':
        if (
          this.searchContactForm.value?.filterWorkAddressLine2.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWorkAddressLine2)
        ) {
          this.isFilterWorkAddressLine2 = false;
          if (
            this.searchContactForm.value?.filterWorkAddressLine2.length >= 3
          ) {
            this.isFilterWorkAddressLine2 = true;
          }
          this.filterContact();
        }
        break;
      case 'WorkCity':
        if (
          this.searchContactForm.value?.filterWorkCity.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWorkCity)
        ) {
          this.isFilterWorkCity = false;
          if (this.searchContactForm.value?.filterWorkCity.length >= 3) {
            this.isFilterWorkCity = true;
          }
          this.filterContact();
        }
        break;
      case 'WorkZipCode':
        if (
          this.searchContactForm.value?.filterWorkZipCode.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWorkZip)
        ) {
          this.isFilterWorkZip = false;
          if (this.searchContactForm.value?.filterWorkZipCode.length >= 3) {
            this.isFilterWorkZip = true;
          }
          this.filterContact();
        }
        break;
      case 'WorkState':
        if (
          this.searchContactForm.value?.filterWorkState.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWorkState)
        ) {
          this.isFilterWorkZip = false;
          if (this.searchContactForm.value?.filterWorkState.length >= 3) {
            this.isFilterWorkState = true;
          }
          this.filterContact();
        }
        break;
        case 'workCountry':
          if (
            this.searchContactForm.value?.filterWorkCountry.length >= 3 ||
            (e.target.value.length == 0 && this.isFilterWorkcontory)
          ) {
            this.isFilterWorkZip = false;
            if (this.searchContactForm.value?.filterWorkCountry.length >= 3) {
              this.isFilterWorkcontory = true;
            }
            this.filterContact();
          }
          break;
      case 'FacebookLink':
        if (
          this.searchContactForm.value?.filterFacebookLink.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterFacebookLink)
        ) {
          this.isFilterFacebookLink = false;
          if (this.searchContactForm.value?.filterFacebookLink.length >= 3) {
            this.isFilterFacebookLink = true;
          }
          this.filterContact();
        }
        break;
      case 'TwitterLink':
        if (
          this.searchContactForm.value?.filterTwitterLink.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterTwitterLink)
        ) {
          this.isFilterTwitterLink = false;
          if (this.searchContactForm.value?.filterTwitterLink.length >= 3) {
            this.isFilterTwitterLink = true;
          }
          this.filterContact();
        }
        break;
      case 'LinkedInLink':
        if (
          this.searchContactForm.value?.filterLinkedInLink.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterTwitterLink)
        ) {
          this.isFilterTwitterLink = false;
          if (this.searchContactForm.value?.filterLinkedInLink.length >= 3) {
            this.isFilterTwitterLink = true;
          }
          this.filterContact();
        }
        break;
      case 'SkypeLink':
        if (
          this.searchContactForm.value?.filterSkypeLink.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterSkypeLink)
        ) {
          this.isFilterSkypeLink = false;
          if (this.searchContactForm.value?.filterSkypeLink.length >= 3) {
            this.isFilterSkypeLink = true;
          }
          this.filterContact();
        }
        break;
      case 'GooglePlusLink':
        if (
          this.searchContactForm.value?.filterGooglePlusLink.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterGooglePlusLink)
        ) {
          this.isFilterGooglePlusLink = false;
          if (this.searchContactForm.value?.filterGooglePlusLink.length >= 3) {
            this.isFilterGooglePlusLink = true;
          }
          this.filterContact();
        }
        break;
      case 'InstagramLink':
        if (
          this.searchContactForm.value?.filterInstagramLink.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterInstagramLink)
        ) {
          this.isFilterInstagramLink = false;
          if (this.searchContactForm.value?.filterInstagramLink.length >= 3) {
            this.isFilterInstagramLink = true;
          }
          this.filterContact();
        }
        break;
      case 'WeChatLink':
        if (
          this.searchContactForm.value?.filterWeChatLink.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWeChatLink)
        ) {
          this.isFilterWeChatLink = false;
          if (this.searchContactForm.value?.filterWeChatLink.length >= 3) {
            this.isFilterWeChatLink = true;
          }
          this.filterContact();
        }
        break;
      case 'SocialWebsite':
        if (
          this.searchContactForm.value?.filterSocialWebsite.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterSocialWebsite)
        ) {
          this.isFilterSocialWebsite = false;
          if (this.searchContactForm.value?.filterSocialWebsite.length >= 3) {
            this.isFilterSocialWebsite = true;
          }
          this.filterContact();
        }
        break;
      case 'WebsiteLink':
        if (
          this.searchContactForm.value?.filterWebsiteLink.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWebsiteLink)
        ) {
          this.isFilterWebsiteLink = false;
          if (this.searchContactForm.value?.filterWebsiteLink.length >= 3) {
            this.isFilterWebsiteLink = true;
          }
          this.filterContact();
        }
        break;
      case 'CompanyName':
        if (
          this.searchContactForm.value?.filterCompanyName.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterCompanyName)
        ) {
          this.isFilterCompanyName = false;
          if (this.searchContactForm.value?.filterCompanyName.length >= 3) {
            this.isFilterCompanyName = true;
          }
          this.filterContact();
        }
        break;
      case 'Designation':
        if (
          this.searchContactForm.value?.filterDesignation.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterDesignation)
        ) {
          this.isFilterDesignation = false;
          if (this.searchContactForm.value?.filterDesignation.length >= 3) {
            this.isFilterDesignation = true;
          }
          this.filterContact();
        }
        break;
      case 'Website':
        if (
          this.searchContactForm.value?.filterFirstName.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterWebsite)
        ) {
          this.isFilterWebsite = false;
          if (this.searchContactForm.value?.filterFirstName.length >= 3) {
            this.isFilterWebsite = true;
          }
          this.filterContact();
        }
        break;
    }
  }
  getAssignedTo() {
    this.dropdownService
      .getAssignedToListByCompanyAndRole(
        this.userData.companyId,
        this.userData.roleId,
        this.userData.id
      )
      .subscribe((data: any | undefined) => {
        this.assignToList = data?.map((x:any) => ({
          ...x,
          profileImage: x.profileImage != null && x.profileImage != '' ? environment.imgUrl + x.profileImage : null
        }));
      });
  }

  async onRemoveImg() {
    for (const element of this.deleteImagesList) {
      await this.listingSevice.DeletedListingImage(element.Type, element.Name, element.listingId)
        .toPromise(); // Assuming DeletedListingImage returns an Observable, convert it to a Promise
      // this.getImagesAfterRemove(element.Type, element.listingId);
    }
    this.deleteImagesList = [];
  }

  getImages(id: any) {
    if (id == 0) {
      this.baseUrl = this.baseUrlImage + 'ListingDetails/' + 0 + '/';
    } else {
      this.baseUrl = this.baseUrlImage + 'ListingDetails/';
    }
    this.getImagePhotos('Photos', id);
    this.getImageFloorPhotos('FloorPlan', id);
    this.getImagePDFBrochure('PDFBrochure', id);
    this.getImageVideos('UploadVideo', id);
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 1000);
  }
  getImagesAfterRemove(type: any, id: any) {
    if (id == 0) {
      this.baseUrl = this.baseUrlImage + 'ListingDetails/' + 0 + '/';
    } else {
      this.baseUrl = this.baseUrlImage + 'ListingDetails/';
    }
    switch (type) {
      case 'Photos':
        this.getImagePhotos('Photos', id);
        break;
      case 'FloorPlan':
        this.getImageFloorPhotos('FloorPlan', id);
        break;
      case 'PDFBrochure':
        this.getImagePDFBrochure('PDFBrochure', id);
        break;
      case 'UploadVideo':
        this.getImageVideos('UploadVideo', id);
        break;
    }
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 1000);
  }
  GetViewLeadDetailsByListingRef(id: any) {
    this.listingSevice
      .GetListingViewingsByListingId(id,this.userData.companyId)
      .subscribe((data: any) => {
        this.viewingList = data;
        this.cdr.detectChanges();
      });
  }
  get fv(): { [key: string]: AbstractControl } {
    return this.Viewings.controls;
  }
  OnViewingEdit(value: any) {
    this.leadsService.GetLeadDetailsByLeadId(value.leadId,this.userData.companyId).subscribe((result:any) => {
      this.selectedLeadId = result.id;
      this.leadViewingApplay = result.id;
      this.getLeadUsingId = result;
      this.PeronsalMobile = this.getMobile(1,value?.leadMobile) 
    this.WorkMobile = this.getMobile(2,value?.leadMobile) 
    this.OtherMobile = this.getMobile(3,value?.leadMobile) 
    this.PersonalPhone = this.getPhone(1,value?.leadPhone)
    this.WorkPhone = this.getPhone(2,value?.leadPhone)
    this.OtherPhone = this.getPhone(1,value?.leadPhone)
    this.PersonalEmail = this.getEmail(1,value?.leadEmail)
    this.WorkEmail = this.getEmail(2,value?.leadEmail)
    this.OtherEmail = this.getEmail(3,value?.leadEmail)

      this.viewingData = value;
    this.Viewings.controls['statusId'].setValue(Number(value.statusId));
    this.Viewings.controls['notes'].setValue(value.notes);
    this.Viewings.controls['id'].setValue(value.id);
    this.Viewings.controls['listingId'].setValue(value.listingId);
    this.Viewings.controls['leadId'].setValue(value.leadId);
    this.Viewings.controls['agentId'].setValue(value.agentId),
      this.Viewings.controls['startDate'].setValue(
        value.startDate != null
          ? moment(value.startDate).format('YYYY-MM-DD')
          : null
      );
    this.Viewings.controls['startDateTime'].setValue(
      value.startDateTime != null
        ? moment(value.startDateTime).format('HH:mm')
        : null
    );
    this.Viewings.controls['endDate'].setValue(
      value.endDate != null ? moment(value.endDate).format('YYYY-MM-DD') : null
    );
    this.Viewings.controls['endDateTime'].setValue(
      value.endDateTime != null
        ? moment(value.endDateTime).format('HH:mm')
        : null
    );
    this.viewingDataForm = true;
    this.addViewingButton = false;

    this.scrollToElement('edit-viewing-tab');
    this.cdr.detectChanges();
    })
   
    // this.setViewingData(this.getLeadUsingId);
    
  }
  getViewingStatusList() {
    this.leadsService.getAllViewingStatus().subscribe((data: any) => {
      this.allViewingStatusList = data;
    });
  }
  onChangeViewingStatus(e: any) {
    this.Viewings.controls['statusId'].setValue(e);
    this.cdr.detectChanges();
  }

  onSelectionChange(value: any) {
    this.leadViewingApplay = value?.id;
    // Handle the event here
    this.onselectedLeadData = value;
    // this.closeLeadist();
  }
  onCancelList() {
    if(this.getLeadUsingId == '' || this.getLeadUsingId == undefined)
    {
      this.leadViewingApplay = null;
    }
    // this.getLeadUsingId = '';
    this.closeLeadist();
  }

  onSaveList() {
    this.getLeadUsingId = this.onselectedLeadData;
    this.selectedLeadId = this.onselectedLeadData.id;
    this.PeronsalMobile = this.getMobile(1,this.onselectedLeadData?.leadMobile) 
    this.WorkMobile = this.getMobile(2,this.onselectedLeadData?.leadMobile) 
    this.OtherMobile = this.getMobile(3,this.onselectedLeadData?.leadMobile) 
    this.PersonalPhone = this.getPhone(1,this.onselectedLeadData?.leadPhone)
    this.WorkPhone = this.getPhone(2,this.onselectedLeadData?.leadPhone)
    this.OtherPhone = this.getPhone(1,this.onselectedLeadData?.leadPhone)
    this.PersonalEmail = this.getEmail(1,this.onselectedLeadData?.leadEmail)
    this.WorkEmail = this.getEmail(2,this.onselectedLeadData?.leadEmail)
    this.OtherEmail = this.getEmail(3,this.onselectedLeadData?.leadEmail)
    this.cdr.detectChanges();

    this.closeLeadist();
  }
  onEditWatermarkForVideos(Id: any, Type: any, ListingId: any, Status: any) {
    this.IsLoading = true;
    this.listingSevice
      .EditListingImage(Id, Type, ListingId, Status)
      .subscribe((data: any | undefined) => {
        var data = data;
        this.getImagesAfterRemove(Type, ListingId);
        this.IsLoading = false;
      });
  }
  onEditWatermarkForPDFBrouchure(
    Id: any,
    Type: any,
    ListingId: any,
    Status: any
  ) {
    this.IsLoading = true;
    this.listingSevice
      .EditListingImage(Id, Type, ListingId, Status)
      .subscribe((data: any | undefined) => {
        var data = data;
        this.getImagesAfterRemove(Type, ListingId);
        this.IsLoading = false;
      });
  }

  onEditWatermarkForFloorPlan(Id: any, Type: any, ListingId: any, Status: any) {
    this.IsLoading = true;
    this.listingSevice
      .EditListingImage(Id, Type, ListingId, Status)
      .subscribe((data: any | undefined) => {
        var data = data;
        this.getImagesAfterRemove(Type, ListingId);
        this.IsLoading = false;
      });
  }
  onEditWatermarkForPhotos(Id: any, Type: any, ListingId: any, Status: any) {
    this.IsLoading = true;
    this.listingSevice
      .EditListingImage(Id, Type, ListingId, Status)
      .subscribe((data: any | undefined) => {
        var data = data;
        this.getImagesAfterRemove(Type, ListingId);
        this.IsLoading = false;
      });
  }

  onViewingAdd() {
    this.leadViewingApplay = null;
    this.viewingDataForm = true;
    this.addViewingButton = false;
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
  getAAgentList() {
    this.dropdownService
      .getAssignedToListByCompany(this.userData.companyId)
      .subscribe((data) => {
        this.AgentList = data;
      });
  }
  getAllLeadType() {
    this.leadsService.getLeadType().subscribe((data: any) => {
      this.LeadTypeList = data;
    });
  }
  getAllLeadFinance() {
    this.leadsService.getAllLeadFinance().subscribe((data: any) => {
      this.AllLeadFinance = data;
    });
  }

  getAllLeadPriority() {
    this.leadsService.getAllLeadPriority().subscribe((data: any) => {
      this.AllPriorityType = data;
    });
  }
  onchangeCheckBox(name: any, e: any) {
    this.ContactBasicForm.controls[name].setValue(e);
    this.leadData(
      this.ContactBasicForm.value.sortFiled,
      this.ContactBasicForm.value.sortDirection,
      this.ContactBasicForm.value.page,
      this.ContactBasicForm.value.itemsPerPage
    );
  }

  getAllEmirates() {
    this.leadsService.getAllEmirates().subscribe((data: any) => {
      this.AllEmirates = data;
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
  getAllAssignedTo() {
    this.dropdownService
      .getAssignedToListByCompanyAndRole(
        this.userData.companyId,
        this.userData.roleId,
        this.userData.id
      )
      .subscribe((data:any) => {
        this.AgentLeadList = data?.map((x:any) => ({
          ...x,
          profileImage: x.profileImage != null && x.profileImage != '' ? environment.imgUrl + x.profileImage : null
        }));
      });
  }
  getCompanyLogoImg(id: any) {
    this.companySettingsService
      .getCompanyMarkettingImages(id)
      .subscribe((data: any | undefined) => {
        this.companymarketingData = data.result;
        if (
          this.companymarketingData.watermarkPath != '' &&
          this.companymarketingData.watermarkPath != null
        ) {
          this.companyImagePath = `${this.companymarketingData.watermarkPath}`;
        }
      });
  }

  renderleadPage(event: number) {
    this.leadpage = event;
    this.ContactBasicForm.controls['page'].setValue(this.leadpage);
    this.ContactBasicForm.controls['itemsPerPage'].setValue(
      this.leaditemsPerPage
    );
    this.leadData(
      this.ContactBasicForm.value.sortFiled,
      this.ContactBasicForm.value.sortDirection,
      this.ContactBasicForm.value.page,
      this.ContactBasicForm.value.itemsPerPage
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.filesPhotos,
      event.previousIndex,
      event.currentIndex
    );
    console.log('filesPhotos', this.filesPhotos);
  }
  dropFloorPlan(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.filesFloorPlan,
      event.previousIndex,
      event.currentIndex
    );
    // this.filesFloorPlan= this.filesFloorPlan;
  }
  dropPDFBrouchure(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.filesPDFBrouchure,
      event.previousIndex,
      event.currentIndex
    );
    // this.filesPDFBrouchure= this.filesPDFBrouchure;
  }
  dropUploadVideo(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.filesUploadVideo,
      event.previousIndex,
      event.currentIndex
    );
    //  this.filesUploadVideo= this.filesUploadVideo;
  }

  isNumber(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  
  onDragStartPhotos(event:any) {
    this.isReorderPhotos = true;
  }

  OnDroppedPhotos(event:any) {
    // this.isReorderPhotos = false;
  }

  onlistSortedPhotos(event:any) {

this.isReorderPhotos = true;
  }

  onDragStartFloorPlan(event:any) {
    this.isReorderFloorPlan = true;
  }

  OnDroppedFloorPlan(event:any) {
    // this.isReorderFloorPlan = false;
  }

  onlistSortedFloorPlan(event:any) {

this.isReorderFloorPlan = true;
  }

  onDragStartPDFBrochure(event:any) {
    this.isReorderPDFBrochure = true;
  }

  OnDroppedPDFBrochure(event:any) {
    // this.isReorderPDFBrochure = false;
  }

  onlistSortedPDFBrochure(event:any) {

this.isReorderPDFBrochure = true;
  }

  onDragStartVideos(event:any) {
    this.isReorderVideos = true;
  }

  OnDroppedVideos(event:any) {
    // this.isReorderVideos = false;
  }

  onlistSortedVideos(event:any) {

this.isReorderVideos = true;
  }

}
