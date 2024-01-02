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
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ModalConfig } from 'src/app/_metronic/partials/layout/modals/modal.config';
import { ContactService } from 'src/app/modules/auth/services/contact.service';
import { LeadsService } from 'src/app/modules/auth/services/leads.service';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { ViewingsService } from 'src/app/modules/auth/services/viewing.service';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { AuthService } from 'src/app/modules/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leads-details',
  templateUrl: './leads-details.component.html',
  styleUrls: ['./leads-details.component.scss'],
})
export class LeadsDetailsComponent {
  @ViewChild('Addcontact')
  private modalContent: TemplateRef<LeadsDetailsComponent>;
  @ViewChild('AddNewcontact')
  private modalContentContact: TemplateRef<LeadsDetailsComponent>;
  @ViewChild('ViewListing')
  private modalContentViewingList: TemplateRef<LeadsDetailsComponent>;
  @ViewChild('ViewMatchingListing')
  private modalContentMatchingList: TemplateRef<LeadsDetailsComponent>;
  @ViewChild('addPropertyListing')
  private modalContentPropertyList: TemplateRef<LeadsDetailsComponent>;
  @ViewChild('addPropertyRequirement')
  private modalContentAddProperty: TemplateRef<LeadsDetailsComponent>;
  imgUrl = environment.imgUrl;
  selectedTab: string = 'tab1';
  IsLoading: boolean = false;
  selectedDate: any = '::::::';
  basic: boolean = false;
  viewingDataForm: boolean = false;
  addViewingButton: boolean = true;
  PropertyReq: boolean = false;
  selectedListingId: number = 0;
  selectedPropertyListningId: number = 0;
  isContactPopup: boolean = true;
  propertyRequirementpopup: boolean = true;
  isCancel: boolean = false;
  isFormSave: boolean = true;
  View: boolean = false;
  propertyHideNull: boolean = true;
  storeIdForViewingData: any;
  storeLeadIdForViewingData: any;
  propertyOne: any = [];
  setViewingDataValue: any = [];
  propertyCollectionData: any = [];
  ContactTypeList: any = [];
  ContactDetailsList: any = [];
  ContactSourceList: any = [];
  LanguagesList: any = [];
  tempSelectedLeadRef: any = null;
  tempSelectedListningPropertyRef: any = null;
  tempSelectedContactRef: any = null;
  leadsDetailsForTime: any;
  ReligionList: any = [];
  NationalitiesList: any = [];
  statusList: any[] = [];
  usageList: any[] = [];
  bedList: any[] = [];
  GenderList: any = [];
  isDisabled: boolean = true;
  titleList: any = [];
  assignToList: any = [];
  data: any = {
    AddContact: true,
    EditContact: false,
    Id: 0,
  };
  totalRecord: number = 0;
  totalRecordContact: number = 0;
  Property1: boolean = false;
  Property2: boolean = false;
  Property3: boolean = false;
  Property4: boolean = false;
  isButtonDisabled: boolean = false;
  isInputDisabled: boolean = true;
  BasicDetails: FormGroup;
  LeadTypeList: any[] = [];
  AllStatusType: any[] = [];
  AllSubStatusType: any[] = [];
  AllPriorityType: any[] = [];
  sourceOfListingList: any[] = [];
  AgentLeadList: any = [];
  AllViewingStatus: any[] = [];
  AllPhoneCode: any[] = [];
  proprtyIdForListing: number;
  storePropertyId: any;
  listingPagechange: any;
  AllTitle: any[] = [];
  AllCountry: any[] = [];
  AllLeadFinance: any[] = [];
  AllBeds: any[] = [];
  AllCategory: any[] = [];
  AllUsage: any[] = [];
  AllPurpose: any[] = [];
  AllEmirates: any[] = [];
  AllLocation: any[] = [];
  getAllnewLocation: any;
  setReference: any;
  propertyOneLocation: any;
  AllSubLocation: any[] = [];
  PropertyRequirements: FormGroup;
  AddPropertyRequirementAddModel: FormGroup;
  Viewings: FormGroup;
  viewAddress: boolean = false;
  ContactList: any;
  getContactsDetail: any = null;
  SearchContactList: boolean = false;
  isSave: boolean = false;
  isViewingSave: boolean = false;
  isFormDataEdit: boolean;
  isFormCancel: boolean = false;
  PropertyRequirementList: any = [];
  MatchingPropertyRequirementList: any = [];
  purposeList: any[] = [];
  onEditLeadId: any;
  propertyTypeList: any[] = [];
  @ViewChild('container', { static: false }) container!: ElementRef;
  page = 1;
  pageMatchingListing = 1;
  itemsPerPage = 25;
  itemsPerPageMatchingListing = 25;
  listningItemPerPage: number = 25;
  totalItems: any;
  form: FormGroup;
  MatchingListingsform: FormGroup;
  private createContact: NgbModalRef;
  private createNewContact: NgbModalRef;
  private ViewList: NgbModalRef;
  private MatchingListView: NgbModalRef;
  private addpropertyList: NgbModalRef;
  private addpropertyRequirement: NgbModalRef;
  editLeadId: any;
  isEdit: boolean;
  isAdd: boolean;
  @Input() public modalConfig: ModalConfig;
  searchContactForm: FormGroup;
  pageNumber = 1;
  pageSize = 25;
  sortColumn: string = 'Updated';
  sortDir: boolean = true;
  listingDetailsList: any;
  MatchinglistingDetails:any = [];
  getListingUsingId: any;
  onSelectingViewingData: any;
  dataForProprtyform: any[] = [];
  leadId: any;
  proprtyIdForAddingdata: number;
  viewingList: any[] = [];
  CountryList: any = [];
  isEditContactDisable: boolean;
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
  contactDetailList: boolean = true;
  selectedContactId: number = 0;
  selectedLeadsContactId: number = 0;
  isEditLeadsPermission: boolean = false;
  companySettings: any;
  storeIdForPropertyRequirement: number = 0;
  userData: any;
  contactId: any;
  isSaveNotes: boolean = false;
  LeadNotes: any = [];
  LeadNotesForm: FormGroup;
  isPropertyReqApply: boolean = false;
  isProperty1Invalid: boolean = false;
  isProperty2Invalid: boolean = false;
  isProperty3Invalid: boolean = false;
  isProperty4Invalid: boolean = false;
  public baseUrl = environment.imgUrl;
  public frontendUrl = environment.frontendUrl;
  previewLinks: any = [];
  previewLinksTableView:any = [];
  totalMatchingListingRecord:any;
  filterMatchingProperty:any = null;
  constructor(
    private leadsService: LeadsService,
    private modalService: NgbModal,
    private listingSevice: ListingService,
    private ViewingsService: ViewingsService,
    private contactService: ContactService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dropdownService: DropdownService,
    private authService: AuthService,
    private elementRef: ElementRef
  ) {}
  ngOnInit(): void {
    var uData = this.authService.userValue;
    if (uData != null) {
      this.userData = JSON.parse(uData);
      this.isEditLeadsPermission =
        this.userData.permissionAccess.filter((x: any) => x.permissionId == 17)
          .length > 0;
    }
    this.authService.companySetting.subscribe((data: any) => {
      this.companySettings = data;
    });
    this.getDropdownList();
    this.initForm();
    this.initMatchingListingForm();
    this.getContactsDetail = '';
    this.getAllListing(this.form.value);
    this.getPurpose();
    this.setSearchForm();
    this.dropDownList();
    this.searchContacts();
    this.getAllStatus();
    this.getusage();
    this.getBeds();
    if (!this.PropertyReq) {
      this.Property1 = false;
      this.Property2 = false;
      this.Property3 = false;
      this.Property4 = false;
    }

    this.leadsService.isOpenLeads.pipe().subscribe((data: any) => {
      if (data?.AddLeads) {
        this.isAdd = true;
        this.tempSelectedContactRef = null;
        this.isFormCancel = false;
        this.isContactPopup = false;
        this.isEditContactDisable = true;
        this.isFormSave = true;
        this.LeadNotes = [];
        this.MatchingPropertyRequirementList = [];
        this.previewLinksTableView = [];
        this.previewLinks = [];
        this.isProperty1Invalid = false;
        this.isProperty2Invalid = false;
        this.isProperty3Invalid = false;
        this.isProperty4Invalid = false;
        this.filterMatchingProperty = null;
        this.enableDataForm();
        this.selectTab('tab1');
        this.scrollToElement('sec1');
        this.initForm();
        this.cdr.detectChanges();
        this.getContactsDetail = '';
        this.getAllListing(this.form.value);
        this.getPurpose();
        this.setSearchForm();
        this.dropDownList();
        this.propertyRequirementpopup = true;
        this.isEdit = false;
        this.isSave = false;
        this.isViewingSave = false;
        this.isFormDataEdit = false;
        this.basic = true;
        this.PropertyReq = true;
        this.View = true;
        this.BasicDetails.reset();
        this.PropertyRequirements.reset();
        this.PropertyRequirementList = [];
        this.Viewings.reset();
        this.BasicDetails.markAsUntouched();
        this.BasicDetails.markAsPristine();
        this.PropertyRequirements.markAsUntouched();
        this.PropertyRequirements.markAsPristine();
        this.Viewings.markAsUntouched();
        this.Viewings.markAsPristine();
      } else {
        if (data?.EditLeads) {
          this.IsLoading = true;
          this.isAdd = false;
          this.isFormCancel = false;
          this.isProperty1Invalid = false;
          this.isProperty2Invalid = false;
          this.isProperty3Invalid = false;
          this.isProperty4Invalid = false;
          this.MatchingPropertyRequirementList = [];
          this.previewLinks = [];
          this.previewLinksTableView = [];
          this.isContactPopup = true;
          this.isEditContactDisable = true;
          this.setReference = null;
          this.setBasicDetails();
          this.filterMatchingProperty = null;
          this.cdr.detectChanges();
          this.selectTab('tab1');
          this.scrollToElement('sec1');
          this.getContactsDetail = '';
          this.basic = true;
          this.PropertyReq = true;
          this.getAllListing(this.form.value);
          this.getPurpose();
          this.setSearchForm();
          this.dropDownList();
          this.onClickSlider();
          // this.leadsDetailsForTime = data;
          this.isEdit = true;
          this.isFormDataEdit = true;
          this.isFormSave = false;
          this.editLeadId = data?.Id;
          this.onEdit(this.editLeadId);
          this.getLeadNotesByLeadId(this.editLeadId);
        }
      }
    });
    this.setBasicDetails();
    this.setInitalLeadNotesForm();
    // this.BasicDetails.controls['SubStatus'].disable();
    // this.BasicDetails.controls['Status'].disable();

    this.setPropertyRequirements();
    this.setViewings();
    this.AddPropertyRequirementModel();
    this.contactService.SelectedContactId.subscribe((data: any) => {
      this.selectedContactId = data;
    });
  }

  setInitalLeadNotesForm() {
    this.LeadNotesForm = new FormGroup({
      Notes: new FormControl(null, Validators.required),
    });
  }

  scrollContent() {
    const overlayElement = this.container.nativeElement;
    let targetElement: any = this.elementRef.nativeElement.querySelector(
      '.vewingsDatacontent'
    );
    const offset = 105.73;
    if (targetElement) {
      if (targetElement === 'viewingSection') {
        targetElement.offsetTop - offset;
      }
      let x = targetElement.offsetTop;
      overlayElement.scrollTo({
        top: x,
        behavior: 'smooth',
      });
      targetElement = null;
    }
  }
  closeLeads() {
    this.leadsService.openDrawer(false);
    this.tempSelectedContactRef = null;
    this.selectedLeadsContactId = 0;
    this.PropertyRequirementList = [];
    this.disableForm();
    this.propertyRequirementpopup = false;
    this.disableForm();
    this.isFormDataEdit = true;
    this.isFormSave = false;
    this.isFormCancel = false;
    this.leadsService.SelectLeadId(0);
    this.isSave = false;
    this.isViewingSave = false;
    this.onClickSlider();
    this.Viewings.reset();
    this.Viewings.controls['statusId'].setValue(1);
    this.getListingUsingId = '';
    this.viewingDataForm = false;
    this.addViewingButton = true;
  }
  get startDate() {
    return this.Viewings.get('startDate')!;
  }
  get viewingAgentId() {
    return this.Viewings.get('viewingAgentId')!;
  }
  get startDateTime() {
    return this.Viewings.get('startDateTime')!;
  }
  get endDate() {
    return this.Viewings.get('endDate')!;
  }
  get endDateTime() {
    return this.Viewings.get('endDateTime')!;
  }

  get dateTime() {
    return this.Viewings.get('dateTime')!;
  }
  get LeadsAgent1() {
    return this.BasicDetails.get('LeadsAgent1')!;
  }
  get agnetValue() {
    return this.Viewings.get('agentId');
  }
  get LeadType() {
    return this.BasicDetails.get('LeadType')!;
  }
  get status() {
    return this.BasicDetails.get('Status')!;
  }
  get SubStatus() {
    return this.BasicDetails.get('SubStatus')!;
  }
  get Source() {
    return this.BasicDetails.get('Source')!;
  }
  dropDownList() {
    this.getLeadType();
    this.getAllLeadStatus();
    this.getAllLeadPriority();
    this.getAllSourceOfListing();
    this.getAllAssignedTo();
    this.getAllViewingStatus();
    this.getPhoneCode();
    this.getAllTitle();
    this.getAllCountry();
    this.getAllLeadFinance();
    this.getAllCategory();
    this.getAllUsage();
    this.getAllPurpose();
    this.getAllBeds();
    this.getAllEmirates();
    this.getAllLocation();
    this.getAllSubLocation();
  }
  selectTab(tab: string): void {
    this.selectedTab = tab;
    if (tab == 'tab3') {
      this.isSaveNotes = false;
      this.setInitalLeadNotesForm();
      this.cdr.detectChanges();
    }
    if (tab == 'tab4') {
      if (this.MatchingPropertyRequirementList.length > 0) {
        this.MatchingPropertyRequirementList =
          this.MatchingPropertyRequirementList.map((x: any) => ({
            ...x,
            showLocationDetails: false,
            showMatchingProperties: false,
            matchingProperties: [],
          }));
          this.filterMatchingProperty = null;
      } else {
        this.MatchingPropertyRequirementList = [];
        this.previewLinks = [];
        this.previewLinksTableView = [];
        this.filterMatchingProperty = null;
      }
    }
  }
  testFucntion(data: any) {
    this.proprtyIdForAddingdata = data;
  }
  public scrollToElement = (elementId: string) => {
    const overlayElement = this.container.nativeElement;
    const targetElement = document.getElementById(elementId);
    const offset = 105.73; // Specify your desired offset value

    if (targetElement) {
      // overlayElement.scrollTop = targetElement.offsetTop - offset;
      if (targetElement.id === 'sec1') {
        // console.log(true);
        let x = targetElement.offsetTop - offset;
      }
      let x = targetElement.offsetTop;
      overlayElement.scrollTo({
        top: x,
        behavior: 'smooth',
      });
    }
  };

  setBasicDetails() {
    this.BasicDetails = new FormGroup({
      LeadsAgent1: new FormControl(null, Validators.required),
      Reference: new FormControl({ value: '', disabled: true }),
      EnquiryDate: new FormControl(''),
      LeadType: new FormControl(null, Validators.required),
      Finance: new FormControl(false),
      CreatedBy: new FormControl({ value: '', disabled: true }),
      Status: new FormControl(null, Validators.required),
      SubStatus: new FormControl(null, Validators.required),
      Priority: new FormControl(false),
      HotLead: new FormControl(false),
      Source: new FormControl(null, Validators.required),
      AgentReferral: new FormControl(''),
    });
  }
  disableForm() {
    this.BasicDetails.controls['SubStatus'].disable();
    this.BasicDetails.controls['Status'].disable();
    this.BasicDetails.controls['LeadsAgent1'].disable();
    this.BasicDetails.controls['Reference'].disable();
    this.BasicDetails.controls['EnquiryDate'].disable();
    this.BasicDetails.controls['LeadType'].disable();
    this.BasicDetails.controls['Finance'].disable();
    this.BasicDetails.controls['CreatedBy'].disable();
    this.BasicDetails.controls['Priority'].disable();
    this.BasicDetails.controls['Source'].disable();
    this.BasicDetails.controls['HotLead'].disable();
    this.BasicDetails.controls['AgentReferral'].disable();

    // this.BasicDetails.disable();
    // this.PropertyRequirements.disable();
  }
  enableDataForm() {
    this.BasicDetails.controls['SubStatus'].enable();
    this.BasicDetails.controls['Status'].enable();
    this.BasicDetails.controls['LeadsAgent1'].enable();
    this.BasicDetails.controls['Reference'].enable();
    this.BasicDetails.controls['LeadType'].enable();
    this.BasicDetails.controls['EnquiryDate'].enable();
    this.BasicDetails.controls['Finance'].enable();
    this.BasicDetails.controls['CreatedBy'].enable();
    this.BasicDetails.controls['Priority'].enable();
    this.BasicDetails.controls['Source'].enable();
    this.BasicDetails.controls['HotLead'].enable();
    this.BasicDetails.controls['AgentReferral'].enable();
  }
  enquireyDateisDisable() {
    this.BasicDetails.controls['EnquiryDate'].disable();
  }
  isFormEdit() {
    this.isAdd = false;
    this.isContactPopup = false;
    this.isEditContactDisable = false;
    this.propertyRequirementpopup = true;
    this.isFormDataEdit = false;
    this.isFormCancel = true;
    this.isFormSave = true;
    this.enableDataForm();
    this.enquireyDateisDisable();
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
  isFormCancle() {
    this.isContactPopup = true;
    this.isEditContactDisable = true;
    this.propertyRequirementpopup = false;
    this.disableForm();
    this.isFormDataEdit = true;
    this.isFormSave = false;
    this.isFormCancel = false;
  }
  filterContact() {
    this.pageSize = 25;
    this.pageNumber = 1;
    this.searchContacts();
  }
  contactRenderPage(event: any) {
    this.pageNumber = event;
    this.searchContacts();
  }
  searchContacts() {
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
        filterNativeLanguage: this.searchContactForm.value?.NativeLanguage,
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
        userId: this.userData.id,
      })
      .subscribe((data) => {
        this.ContactDetailsList = data;
        if (this.ContactDetailsList.length > 0) {
          this.totalRecordContact = this.ContactDetailsList[0].totalCount;
        } else {
          this.totalRecord = 0;
        }
        this.cdr.detectChanges();
      });
  }
  setPropertyRequirements() {
    this.PropertyRequirements = new FormGroup({
      propertyId: new FormControl(''),
      purposeId: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      minBedsId: new FormControl(),
      maxBedsId: new FormControl(null),
      emirateId: new FormControl(null, [Validators.required]),
      minPrice: new FormControl(),
      maxPrice: new FormControl(),
      locationId: new FormControl(),
      minArea: new FormControl(''),
      maxArea: new FormControl(''),
      subLocationId: new FormControl(''),
      unit: new FormControl(''),
      layoutType: new FormControl(''),
    });
  }

  AddPropertyRequirementModel() {
    this.AddPropertyRequirementAddModel = new FormGroup({
      propertyId: new FormControl(),
      purposeId: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      minBedsId: new FormControl(),
      maxBedsId: new FormControl(),
      emirateId: new FormControl(null, [Validators.required]),
      minPrice: new FormControl(),
      maxPrice: new FormControl(),
      locationId: new FormControl(),
      minArea: new FormControl(),
      maxArea: new FormControl(),
      subLocationId: new FormControl(),
      unit: new FormControl(),
      layoutType: new FormControl(),
    });
  }

  AddProperty(data: any) {
    this.isPropertyReqApply = false;
    if (this.leadsDetailsForTime?.propertyRequirement[0]?.propertyId == data) {
      let emiratesId =
        this.leadsDetailsForTime?.propertyRequirement[0]?.emirateId;
      let locationId =
        this.leadsDetailsForTime?.propertyRequirement[0]?.locationId;
      this.showingEmirates(emiratesId);
      this.showingLocation(locationId);
    } else if (
      this.leadsDetailsForTime?.propertyRequirement[1]?.propertyId == data
    ) {
      let emiratesId =
        this.leadsDetailsForTime?.propertyRequirement[1]?.emirateId;
      let locationId =
        this.leadsDetailsForTime?.propertyRequirement[1]?.locationId;
      this.showingEmirates(emiratesId);
      this.showingLocation(locationId);
    } else if (
      this.leadsDetailsForTime?.propertyRequirement[2]?.propertyId == data
    ) {
      let emiratesId =
        this.leadsDetailsForTime?.propertyRequirement[2]?.emirateId;
      let locationId =
        this.leadsDetailsForTime?.propertyRequirement[2]?.locationId;
      this.showingEmirates(emiratesId);
      this.showingLocation(locationId);
    } else if (
      this.leadsDetailsForTime?.propertyRequirement[3]?.propertyId == data
    ) {
      let emiratesId =
        this.leadsDetailsForTime?.propertyRequirement[3]?.emirateId;
      let locationId =
        this.leadsDetailsForTime?.propertyRequirement[3]?.locationId;
      this.showingEmirates(emiratesId);
      this.showingLocation(locationId);
    }
    let isErr = true;
    this.PropertyRequirementList.map((item: any) => {
      if (item.propertyId === data - 1) {
        isErr = false;
      }
    });

    this.testFucntion(data);
    return new Promise<boolean>((resolve) => {
      if (isErr && data != 1) {
        alert(`Please add details for Property ${data - 1} first.`);
      } else if (detail) {
        var detail = this.PropertyRequirementList.filter(
          (x: any) => x.propertyId == 2
        );
        if (!detail) {
          alert('Please add details for Property 2 first.');
        }
      } else {
        this.addpropertyRequirement = this.modalService.open(
          this.modalContentAddProperty,
          { size: 'xl' }
        );
        this.addpropertyRequirement.result.then(resolve, resolve);
        var filter = this.PropertyRequirementList.filter(
          (x: any) => x.propertyId == data
        );
        if (filter.length > 0) {
          this.PropertyRequirements = new FormGroup({
            propertyId: new FormControl(data),
            purposeId: new FormControl(
              filter[0].purposeId != null ? Number(filter[0].purposeId) : null,
              [Validators.required]
            ),
            categoryId: new FormControl(
              filter[0].categoryId != null
                ? Number(filter[0].categoryId)
                : null,
              [Validators.required]
            ),
            minBedsId: new FormControl(filter[0].minBedsId),
            maxBedsId: new FormControl(filter[0].maxBedsId),
            emirateId: new FormControl(filter[0].emirateId != null ? Number(filter[0].emirateId) : null, [
              Validators.required,
            ]),
            minPrice: new FormControl(filter[0].minPrice),
            maxPrice: new FormControl(filter[0].maxPrice),
            locationId: new FormControl(filter[0].locationId != null ? Number(filter[0].locationId) : null),
            minArea: new FormControl(filter[0].minArea),
            maxArea: new FormControl(filter[0].maxArea),
            subLocationId: new FormControl(filter[0].subLocationId != null ? Number(filter[0].subLocationId) : null),
            unit: new FormControl(filter[0].unit),
            layoutType: new FormControl(filter[0].layoutType),
          });
        } else {
          this.PropertyRequirements = new FormGroup({
            propertyId: new FormControl(data),
            purposeId: new FormControl(null, [Validators.required]),
            categoryId: new FormControl(null, [Validators.required]),
            minBedsId: new FormControl(),
            maxBedsId: new FormControl(),
            emirateId: new FormControl(null, [Validators.required]),
            minPrice: new FormControl(),
            maxPrice: new FormControl(),
            locationId: new FormControl(),
            minArea: new FormControl(),
            maxArea: new FormControl(),
            subLocationId: new FormControl(),
            unit: new FormControl(),
            layoutType: new FormControl(),
          });
        }
      }
    });
  }

  saveAddPropertyRquirement(proprtyIdForListing: any) {
    this.isPropertyReqApply = true;
    var listingRef:any = null;
    if (this.PropertyRequirements.valid) {
      const data = this.PropertyRequirementList.findIndex(
        (obj: any) => obj.propertyId === this.proprtyIdForAddingdata
      );
      if (data >= 0) {
        for (let i = 0; i < this.PropertyRequirementList.length; i++) {
          if (
            this.PropertyRequirementList[i].propertyId ===
            this.proprtyIdForAddingdata
          ) {
            this.PropertyRequirementList.findIndex(
              (c: any) => c.propertyId == this.proprtyIdForAddingdata
            );
            listingRef = this.PropertyRequirementList[data].listingRef;
            this.PropertyRequirementList.splice(data, 1);
            if (this.PropertyRequirementList.length > 0) {
              this.PropertyRequirementList.sort(
                (a: any, b: any) => a.propertyId - b.propertyId
              );
            }
            this.checkPropertyRequirement(this.PropertyRequirementList);
          }
        }
      }
      this.addpropertyRequirement.close(this.modalConfig);
      // var obj = this.PropertyRequirements.value;
      let updatedPayload = {
        ...this.PropertyRequirements.value,
        leadId: this.editLeadId,
        id: this.editLeadId,
        listingRef: listingRef,
      };

      this.PropertyRequirementList.push(updatedPayload);
      if (this.PropertyRequirementList.length > 0) {
        this.PropertyRequirementList.sort(
          (a: any, b: any) => a.propertyId - b.propertyId
        );
      }
      this.checkPropertyRequirement(this.PropertyRequirementList);
      this.propertyCollectionData = this.PropertyRequirementList;
    } else {
    }
  }
  propertyReqClose() {
    this.isPropertyReqApply = false;
    this.PropertyRequirements.controls['purposeId'].clearValidators();
    this.PropertyRequirements.controls['purposeId'].updateValueAndValidity();
    this.PropertyRequirements.controls['categoryId'].clearValidators();
    this.PropertyRequirements.controls['categoryId'].updateValueAndValidity();
    this.PropertyRequirements.controls['emirateId'].clearValidators();
    this.PropertyRequirements.controls['emirateId'].updateValueAndValidity();
    this.addpropertyRequirement.close(this.modalConfig);
  }
  getDetail(field: any, propertyId: any) {
    var detail = this.PropertyRequirementList.filter(
      (x: any) => x.propertyId == propertyId
    );
    if (detail.length > 0) {
      switch (field) {
        case 'Price':
          return detail[0]?.maxPrice;
        case 'Purpose':
          const purposeId = detail[0]?.purposeId;
          return this.AllPurpose.find((x: any) => x.id == purposeId)?.name;
        case 'Category':
          const categoryId = detail[0].categoryId;
          return this.AllCategory.find((x: any) => x.id == categoryId)?.name;
        case 'Sub-location':
          const subLocationIdDetail = detail[0].subLocationId;
          return this.SubLocationList.find(
            (x: any) => x.id == subLocationIdDetail
          )?.name;
        case 'minPrice':
          const minPrice = detail[0].minPrice;
          return minPrice;
        case 'maxPrice':
          const maxPrice = detail[0].maxPrice;
          return maxPrice;
        case 'Emirate':
          const emirateId = detail[0].emirateId;
          return this.AllEmirates.find((x: any) => x.id == emirateId)?.name;
        case 'Location':
          const locationId = detail[0].locationId;
          return this.LocationList.find((x: any) => x.id == locationId)?.name;
        case 'minBeds':
          const minBeadsId = detail[0].minBedsId;
          return this.AllBeds.find((x: any) => x.id == minBeadsId)?.bedsQuantity;
        case 'maxBeds':
          const maxBedsId = detail[0].maxBedsId;
          return this.AllBeds.find((x: any) => x.id == maxBedsId)?.bedsQuantity;
        case 'minArea':
          return detail[0]?.minArea;
        case 'maxArea':
          return detail[0]?.maxArea;
        case 'Unit':
          return detail[0]?.unit;
        case 'layoutType':
          return detail[0]?.layoutType;
      }
    }
    return null;
  }

  setViewings() {
    let agentId = this.userData.id;
    this.Viewings = new FormGroup({
      id: new FormControl(null),
      leadId: new FormControl(''),
      ListingRef: new FormControl(''),
      viewingAgentId: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      startDateTime: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      endDateTime: new FormControl(null, [Validators.required]),
      statusId: new FormControl(1),
      agentId: new FormControl(agentId),
      notes: new FormControl(),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.BasicDetails.controls;
  }
  saveList() {}
  renderLeadsPage(event: number) {
    this.page = event;
    this.form.controls['page'].setValue(this.page);
    this.form.controls['itemsPerPage'].setValue(this.listningItemPerPage);
    this.listingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      this.form.value.page,
      this.form.value.listningItemPerPage
    );
  }
  cancelList() {
    this.selectedListingId = 0;
    this.isViewingSave = false;
    this.Viewings.reset();
    this.getListingUsingId = '';
    this.Viewings.controls['statusId'].setValue(1);
    this.viewingDataForm = false;
    this.addViewingButton = true;
    this.scrollContent();
  }

  async close(): Promise<void> {
    if (this.getContactsDetail == '') {
      this.tempSelectedContactRef = null;
    }
    this.createContact.close(this.modalConfig);
  }
  async closeContact(): Promise<void> {
    this.createNewContact.close(this.modalConfig);
  }

  AddContact() {
    this.pageNumber = 1;
    this.searchContactForm.reset();
    this.searchContacts();
    if (this.isFormDataEdit == false && this.isFormDataEdit !== false) {
      return this.createContact.close(this.modalConfig);
    } else if (
      this.isFormDataEdit == false &&
      this.isFormCancel == false &&
      this.isFormSave !== false
    ) {
      return new Promise<boolean>((resolve) => {
        this.createContact = this.modalService.open(this.modalContent, {
          size: 'xl',
        });
        this.createContact.result.then(resolve, resolve);
      });
    } else if (this.isFormSave !== false) {
      return this.createContact.close(this.modalConfig);
    } else if (this.isFormSave) {
      return new Promise<boolean>((resolve) => {
        this.createContact = this.modalService.open(this.modalContent, {
          size: 'xl',
        });
        this.createContact.result.then(resolve, resolve);
      });
    }
  }

  addNewContact(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.createNewContact = this.modalService.open(this.modalContentContact, {
        size: 'xl',
      });
      this.createNewContact.result.then(resolve, resolve);
    });
  }
  addAddressDetails() {
    this.viewAddress = !this.viewAddress;
  }
  getDropdownList() {
    this.getAssignedToList();
    this.getTitleList();
    this.getGenderList();
    this.getNationalityList();
    this.getReligionList();
    this.getNativeLanguageList();
    // this.getHobbiesList();
    // this.getTypeList();
    // this.getCountryCodeList();
    this.getCountryList();
    this.getContactSourcesList();
    this.getContactTypeList();
    this.getLocations();
    this.getsublocations();
    this.GetPropertyType();
  }
  LocationList: any = [];
  getLocations() {
    this.listingSevice.getLocation().subscribe((data: any | undefined) => {
      this.LocationList = data;
    });
  }
  SubLocationList: any = [];
  getsublocations() {
    this.listingSevice
      .GetAllSubLocation()
      .subscribe((data: any | undefined) => {
        this.SubLocationList = data;
      });
  }
  getContactTypeList() {
    this.dropdownService.getContactTypeList().subscribe((data) => {
      this.ContactTypeList = data;
    });
  }

  getContactSourcesList() {
    this.dropdownService.getContactSourceList().subscribe((data) => {
      this.ContactSourceList = data;
    });
  }
  getNativeLanguageList() {
    this.dropdownService.getLanguageList().subscribe((data) => {
      this.LanguagesList = data;
    });
  }
  getReligionList() {
    this.dropdownService.getReligionList().subscribe((data) => {
      this.ReligionList = data;
    });
  }
  getNationalityList() {
    this.dropdownService.getCountryList().subscribe((data) => {
      this.NationalitiesList = data;
    });
  }
  getGenderList() {
    this.dropdownService.getGenderList().subscribe((data) => {
      this.GenderList = data;
    });
  }
  getCountryList() {
    this.dropdownService.getCountryList().subscribe((data) => {
      this.CountryList = data;
    });
  }
  getTitleList() {
    this.dropdownService.getTitleList().subscribe((data) => {
      this.titleList = data;
    });
  }
  getAssignedToList() {
    this.dropdownService
      .getAssignedToListByCompanyAndRole(
        this.userData.companyId,
        this.userData.roleId,
        this.userData.id
      )
      .subscribe((data: any) => {
        this.assignToList = data?.map((x: any) => ({
          ...x,
          profileImage:
            x.profileImage != null && x.profileImage != ''
              ? environment.imgUrl + x.profileImage
              : null,
        }));
      });
  }
  getAllStatus() {
    this.listingSevice
      .getAllListingStatus()
      .subscribe((data: any | undefined) => {
        this.statusList = data;
      });
  }
  getusage() {
    this.listingSevice.getUsage().subscribe((data: any | undefined) => {
      this.usageList = data;
    });
  }
  getBeds() {
    this.listingSevice.getBeds().subscribe((data: any | undefined) => {
      this.bedList = data;
    });
  }
  openViewing(id: any) {
    this.data.AddContact = false;
    this.data.EditContact = true;
    this.data.Id = id;
    this.selectedContactId = id;
    this.contactService.OpenAddContact(this.data);
  }
  listingData(sortFiled: any, sortDirection: any, page: any, itemPerPage: any) {
    this.IsLoading = true;
    this.form.controls['sortFiled'].setValue(sortFiled);
    this.form.controls['sortDirection'].setValue(sortDirection);
    this.form.controls['page'].setValue(page);
    this.form.controls['itemsPerPage'].setValue(this.listningItemPerPage);
    this.listingDetailsList = [];
    this.listingSevice.getListingBasic(this.form.value).subscribe(
      (data: any | undefined) => {
        this.listingDetailsList = data;
        this.selectedPropertyData(this.storePropertyId);
        if (data != null && data.length > 0) {
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
  // searchContacts() {
  //   this.contactService
  //     .GetAllContactDetails({
  //       pageNumber: this.pageNumber,
  //       pageSize: this.pageSize,
  //       sortColumn: this.sortColumn,
  //       sortDir: this.sortDir,
  //       filterVip:null,
  //       filterAssignee: this.searchContactForm.value?.filterAssignee,
  //       filterRef: this.searchContactForm.value?.filterRef,
  //       filterTitle: this.searchContactForm.value?.filterTitle,
  //       filterFirstName: this.searchContactForm.value?.filterFirstName,
  //       filterLastName: this.searchContactForm.value?.filterLastName,
  //       filterGender: this.searchContactForm.value?.filterGender,
  //       filterDOB: this.searchContactForm.value?.filterDOB,
  //       // filterFromDOB: this.searchContactForm.value?.filterFromDOB,
  //       // filterToDOB: this.searchContactForm.value?.filterToDOB,
  //       filterNationality1: this.searchContactForm.value?.filterNationality1,
  //       filterNationality2: this.searchContactForm.value?.filterNationality2,
  //       filterReligion: this.searchContactForm.value?.filterReligion,
  //       filterNativeLanguage: this.searchContactForm.value?.NativeLanguage,
  //       filterSecondLanguage:
  //         this.searchContactForm.value?.filterSecondLanguage,
  //       filterPersonalMobile:
  //         this.searchContactForm.value?.filterPersonalMobile,
  //       filterWorkMobile: this.searchContactForm.value?.filterWorkMobile,
  //       filterOtherMobile: this.searchContactForm.value?.filterOtherMobile,
  //       filterPersonalPhone: this.searchContactForm.value?.filterPersonalPhone,
  //       filterWorkPhone: this.searchContactForm.value?.filterWorkPhone,
  //       filterOtherPhone: this.searchContactForm.value?.filterOtherPhone,
  //       filterPersonalEmail: this.searchContactForm.value?.filterPersonalEmail,
  //       filterWorkEmail: this.searchContactForm.value?.filterWorkEmail,
  //       filterOtherEmail: this.searchContactForm.value?.filterOtherEmail,
  //       filterPersonalFax: this.searchContactForm.value?.filterPersonalFax,
  //       filterWorkFax: this.searchContactForm.value?.filterWorkFax,
  //       filterOtherFax: this.searchContactForm.value?.filterOtherFax,
  //       filterPersonalPO: this.searchContactForm.value?.filterPersonalPO,
  //       filterPersonalAddressLine1:
  //         this.searchContactForm.value?.filterPersonalAddressLine1,
  //       filterPersonalAddressLine2:
  //         this.searchContactForm.value?.filterPersonalAddressLine2,
  //       filterPersonalCity: this.searchContactForm.value?.filterPersonalCity,
  //       filterPersonalZipCode:
  //         this.searchContactForm.value?.filterPersonalZipCode,
  //       filterPersonalState: this.searchContactForm.value?.filterPersonalState,
  //       filterPersonalCountry:
  //         this.searchContactForm.value?.filterPersonalCountry,
  //       filterWorkPO: this.searchContactForm.value?.filterWorkPO,
  //       filterWorkAddressLine1:
  //         this.searchContactForm.value?.filterWorkAddressLine1,
  //       filterWorkAddressLine2:
  //         this.searchContactForm.value?.filterWorkAddressLine2,
  //       filterWorkCity: this.searchContactForm.value?.filterWorkCity,
  //       filterWorkZipCode: this.searchContactForm.value?.filterWorkZipCode,
  //       filterWorkState: this.searchContactForm.value?.filterWorkState,
  //       filterWorkCountry: this.searchContactForm.value?.filterWorkCountry,
  //       filterFacebookLink: this.searchContactForm.value?.filterFacebookLink,
  //       filterTwitterLink: this.searchContactForm.value?.filterTwitterLink,
  //       filterLinkedInLink: this.searchContactForm.value?.filterLinkedInLink,
  //       filterSkypeLink: this.searchContactForm.value?.filterSkypeLink,
  //       filterGooglePlusLink:
  //         this.searchContactForm.value?.filterGooglePlusLink,
  //       filterInstagramLink: this.searchContactForm.value?.filterInstagramLink,
  //       filterWeChatLink: this.searchContactForm.value?.filterWeChatLink,
  //       filterSocialWebsite: this.searchContactForm.value?.filterSocialWebsite,
  //       filterWebsiteLink: this.searchContactForm.value?.filterWebsiteLink,
  //       filterContactSource: this.searchContactForm.value?.filterContactSource,
  //       filterCompanyName: this.searchContactForm.value?.filterCompanyName,
  //       filterDesignation: this.searchContactForm.value?.filterDesignation,
  //       filterWebsite: this.searchContactForm.value?.filterWebsite,
  //       filterContactType: this.searchContactForm.value?.filterContactType,
  //       filterCreated: this.searchContactForm.value?.filterCreated,
  //       // filterCreatedFrom: this.searchContactForm.value?.filterCreatedFrom,
  //       // filterCreatedTo: this.searchContactForm.value?.filterCreatedTo,
  //       // filterUpdatedFrom: this.searchContactForm.value?.filterUpdatedFrom,
  //       // filterUpdatedTo: this.searchContactForm.value?.filterUpdatedTo,
  //       filterCreatedBy: this.searchContactForm.value?.filterCreatedBy,
  //       filterUpdated: this.searchContactForm.value?.filterUpdated,
  //       filterUpdatedBy: this.searchContactForm.value?.filterUpdatedBy,
  //     })
  //     .subscribe((data: any) => {
  //       this.ContactList = data;
  //     });
  // }
  openViewingList() {
    this.page = 1;
    this.initForm();
    this.listingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      this.form.value.page,
      this.form.value.itemsPerPage
    );
    return new Promise<boolean>((resolve) => {
      this.ViewList = this.modalService.open(this.modalContentViewingList, {
        size: 'xl',
      });
      this.ViewList.result.then(resolve, resolve);
    });
  }
  closeViewList() {
    if (this.getListingUsingId == '') {
      this.tempSelectedLeadRef = null;
    }
    this.ViewList.close(this.modalConfig);
  }
  ViewListingDataClose() {
    // if(this.setViewingDataValue == null || this.setViewingDataValue == ''){
    //     this.getListingUsingId = '';
    //   }
    if (this.getListingUsingId == '') {
      this.tempSelectedLeadRef = null;
    }
    this.ViewList.close(this.modalConfig);
  }
  ViewListingDataSave() {
    this.listingSevice
      .GetListingDetailsById(
        this.storeIdForViewingData,
        this.userData.companyId
      )
      .subscribe((data: any | undefined) => {
        this.selectedListingId = data?.id;
        this.getListingUsingId = data;
        this.dataForProprtyform = data;
        this.cdr.detectChanges();
        this.Viewings.controls['ListingRef'].setValue(
          this.getListingUsingId?.reference
        );
      });

    this.ViewList.close(this.modalConfig);
  }
  addPropertyList(propertyId: any) {
    this.storePropertyId = propertyId;
    this.selectedPropertyData(this.storePropertyId);
    this.page = 1;
    this.initForm();
    this.listingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      this.form.value.page,
      this.form.value.itemsPerPage
    );
    this.proprtyIdForListing = propertyId;
    return new Promise<boolean>((resolve) => {
      let isErr = true;
      this.PropertyRequirementList.map((item: any) => {
        if (item.propertyId === propertyId - 1) {
          isErr = false;
        }
      });
      if (isErr && propertyId != 1) {
        alert(`Please add details for Property ${propertyId - 1} first.`);
      } else if (detail) {
        var detail = this.PropertyRequirementList.filter(
          (x: any) => x.propertyId == 2
        );
        if (!detail) {
          alert('Please add details for Property 2 first.');
        }
      } else {
        this.addpropertyList = this.modalService.open(
          this.modalContentPropertyList,
          { size: 'xl' }
        );
        this.addpropertyList.result.then(resolve, resolve);
      }
    });
  }
  selectedPropertyData(propertyId: any) {
    if (propertyId == 1) {
      let data = this.PropertyRequirementList.find(
        (x: any) => x.propertyId == propertyId
      );
      if (data == undefined) {
        this.tempSelectedListningPropertyRef = null;
        this.selectedPropertyListningId = 0;
      } else {
        let findListningData = this.listingDetailsList.find(
          (a: any) => a.reference == data?.listingRef
        );
        this.selectedPropertyListningId = findListningData?.id;
        this.tempSelectedListningPropertyRef = findListningData?.id;
      }
    } else if (propertyId == 2) {
      let data = this.PropertyRequirementList.find(
        (x: any) => x.propertyId == propertyId
      );
      if (data == undefined) {
        this.tempSelectedListningPropertyRef = null;
        this.selectedPropertyListningId = 0;
      } else {
        let findListningData = this.listingDetailsList.find(
          (a: any) => a.reference == data?.listingRef
        );
        this.selectedPropertyListningId = findListningData?.id;
        this.tempSelectedListningPropertyRef = findListningData?.id;
      }
    } else if (propertyId == 3) {
      let data = this.PropertyRequirementList.find(
        (x: any) => x.propertyId == propertyId
      );
      if (data == undefined) {
        this.tempSelectedListningPropertyRef = null;
        this.selectedPropertyListningId = 0;
      } else {
        let findListningData = this.listingDetailsList.find(
          (a: any) => a.reference == data?.listingRef
        );
        this.selectedPropertyListningId = findListningData?.id;
        this.tempSelectedListningPropertyRef = findListningData?.id;
      }
    } else {
      let data = this.PropertyRequirementList.find(
        (x: any) => x.propertyId == propertyId
      );
      if (data == undefined) {
        this.tempSelectedListningPropertyRef = null;
        this.selectedPropertyListningId = 0;
      } else {
        let findListningData = this.listingDetailsList.find(
          (a: any) => a.reference == data?.listingRef
        );
        this.selectedPropertyListningId = findListningData?.id;
        this.tempSelectedListningPropertyRef = findListningData?.id;
      }
    }
  }
  closePropertyList() {
    this.tempSelectedListningPropertyRef = 0;
    this.addpropertyList.close(this.modalConfig);
  }
  SavePropertyListing(argument: any) {
    const propertyFormData: any = this.dataForProprtyform;
    let payload: any = {
      categoryId: propertyFormData?.propertyTypeId,
      purposeId: propertyFormData?.purposeId,
      emirateId: propertyFormData?.emiratesId,
      id: this?.leadId,
      leadId: this?.editLeadId,
      listingRef: propertyFormData?.reference,
      locationId: propertyFormData?.locationId,
      minArea: propertyFormData?.buildUpArea,
      minBedsId: propertyFormData?.bedsId,
      minPrice: propertyFormData?.price,
      propertyId: argument,
      subLocationId: propertyFormData?.subLocationId,
      unit: propertyFormData?.unitNumber,
      layoutType: propertyFormData?.layoutType,
    };
    this.addpropertyList.close(this.modalConfig);
    let data = this.PropertyRequirementList.find(
      (obj: any) => obj.propertyId === argument
    );
    let findListningData = this.listingDetailsList.find(
      (a: any) => a.reference == data?.listingRef
    );
    if (
      data?.listingRef === findListningData?.reference &&
      this.storeIdForPropertyRequirement == 0
    ) {
    } else {
      for (let i = 0; i < this.PropertyRequirementList.length; i++) {
        if (this.PropertyRequirementList[i].propertyId == argument) {
          var index = this.PropertyRequirementList.findIndex(
            (c: any) => c.propertyId === argument
          );
          if (this.selectedPropertyListningId === findListningData?.id) {
          } else {
            this.PropertyRequirementList.splice(index, 1);
            if (this.PropertyRequirementList.length > 0) {
              this.PropertyRequirementList.sort(
                (a: any, b: any) => a.propertyId - b.propertyId
              );
            }
            this.checkPropertyRequirement(this.PropertyRequirementList);
          }
        }
      }
      if (this.selectedPropertyListningId === findListningData?.id) {
      } else {
        this.PropertyRequirementList.push(payload);
        if (this.PropertyRequirementList.length > 0) {
          this.PropertyRequirementList.sort(
            (a: any, b: any) => a.propertyId - b.propertyId
          );
        }
        this.checkPropertyRequirement(this.PropertyRequirementList);
      }
      if (!this.PropertyRequirementList.value == undefined) {
        this.PropertyRequirementList.splice(
          this.PropertyRequirementList.value.propertyId === argument
        );
        if (this.PropertyRequirementList.length > 0) {
          this.PropertyRequirementList.sort(
            (a: any, b: any) => a.propertyId - b.propertyId
          );
        }
        this.checkPropertyRequirement(this.PropertyRequirementList);
      }
    }
  }
  closeProperty() {
    this.addpropertyList.close(this.modalConfig);
  }
  closePropertyRequirement() {
    this.addpropertyRequirement.close(this.modalConfig);
  }

  SaveContacts() {}

  getLeadType() {
    this.leadsService.getLeadType().subscribe((data: any) => {
      this.LeadTypeList = data;
    });
  }
  getAllLeadStatus() {
    this.leadsService.getGetAllLeadStatus().subscribe((data: any) => {
      this.AllStatusType = data;
    });
  }
  getAllLeadSubStatusById(id: any) {
    this.leadsService.getAllLeadSubStatusById(id).subscribe((data: any) => {
      this.AllSubStatusType = data;
      this.cdr.detectChanges();
    });
  }
  getAllLeadPriority() {
    this.leadsService.getAllLeadPriority().subscribe((data: any) => {
      this.AllPriorityType = data;
    });
  }

  getAllSourceOfListing() {
    this.listingSevice.getAllSourceOfListing().subscribe((data: any) => {
      this.sourceOfListingList = data;
    });
  }
  getAllAssignedTo() {
    this.dropdownService
      .getAssignedToListByCompany(this.userData.companyId)
      .subscribe((data) => {
        this.AgentLeadList = data;
      });
  }
  getAllViewingStatus() {
    this.leadsService.getAllViewingStatus().subscribe((data: any) => {
      this.AllViewingStatus = data;
    });
  }
  getPhoneCode() {
    this.leadsService.getPhoneCode().subscribe((data: any) => {
      this.AllPhoneCode = data;
    });
  }
  getAllTitle() {
    this.leadsService.getAllTitle().subscribe((data: any) => {
      this.AllTitle = data;
    });
  }
  getAllCountry() {
    this.leadsService.getAllCountry().subscribe((data: any) => {
      this.AllCountry = data;
    });
  }

  getAllLeadFinance() {
    this.leadsService.getAllLeadFinance().subscribe((data: any) => {
      this.AllLeadFinance = data;
    });
  }
  getAllBeds() {
    this.leadsService.getAllBeds().subscribe((data: any) => {
      this.AllBeds = data;
    });
  }
  getAllCategory() {
    this.leadsService.getAllCategory().subscribe((data: any) => {
      this.AllCategory = data;
    });
  }
  getAllUsage() {
    this.leadsService.getAllUsage().subscribe((data: any) => {
      this.AllUsage = data;
    });
  }

  getAllPurpose() {
    this.leadsService.getAllPurpose().subscribe((data: any) => {
      this.AllPurpose = data;
    });
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
  getNewAllLocation() {}
  getAllSubLocation() {
    this.leadsService.getAllSubLocation().subscribe((data: any) => {
      this.AllSubLocation = data;
    });
  }
  onClickSlider() {
    this.Property1 = false;
    this.Property2 = false;
    this.Property3 = false;
    this.Property4 = false;
  }

  getErrorMessage(control: any) {
    return 'This field is required';
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
  getRefName() {
    var compName =
      this.form.value.assignedToId != 0 && this.form.value.assignedToId != null
        ? this.AgentLeadList.find(
            (field: any) => field.id === this.form.value.assignedToId
          ).name.substring(0, 3)
        : null;
    return 'L-'.toLocaleUpperCase();
  }
  onSubmit() {
    this.isSave = true;
    

    // var basicDetail = this.BasicDetails;
    if (!this.BasicDetails.valid) {
      const formControls = this.BasicDetails.controls;
      for (const control of Object.keys(this.BasicDetails.controls)) {
        this.BasicDetails.controls[control].markAsTouched();
      }
      for (const controlName in formControls) {
        if (
          formControls.hasOwnProperty(controlName) &&
          formControls[controlName].invalid
        ) {
          const control = formControls[controlName];
          const errorMessage = this.getErrorMessage(control);
          const fieldName =
            controlName.charAt(0).toUpperCase() + controlName.slice(1);
          // this.toastr.error(errorMessage, fieldName);
        }
      }
    }
    if (this.BasicDetails.invalid && this.getContactsDetail === '') {
      this.scrollToElement('sec1');
      return;
    }
    if (this.getContactsDetail === '') {
      this.scrollToElement('sec1');
      return;
    }
    if (!this.BasicDetails.valid) {
    }
    if (!this.BasicDetails.valid) {
      this.scrollToElement('sec2');
      return;
    }

    // if (!this.Viewings.valid) {
    //   const formControls = this.Viewings.controls;
    //   for (const control of Object.keys(this.Viewings.controls)) {
    //     this.Viewings.controls[control].markAsTouched();
    //   }
    //   for (const controlName in formControls) {
    //     if (
    //       formControls.hasOwnProperty(controlName) &&
    //       formControls[controlName].invalid
    //     ) {
    //       const control = formControls[controlName];
    //       const errorMessage = this.getErrorMessage(control);
    //       const fieldName =
    //         controlName.charAt(0).toUpperCase() + controlName.slice(1);

    //       // this.toastr.error(errorMessage, fieldName);
    //     }
    //   }
    // }

    // const viewDetailPayload = [
    //   {
    //     dateTime: this.Viewings.value?.DateTime,

    //     agentId: this.Viewings.value?.Agent,

    //     viewingStatusId: this.Viewings.value?.ViewingsStatus,

    //     clientName: this.Viewings.value?.ClientName,

    //     requestViewingPackId: this.Viewings.value?.RequestViewingPack,

    //     notes: this.Viewings.value?.ViewingNotes,
    //   },
    // ];

    if (!this.BasicDetails.invalid) {
      if (!this.isEdit) {
        if (this.PropertyRequirementList.length > 0) {
          this.PropertyRequirementList.sort(
            (a: any, b: any) => a.propertyId - b.propertyId
          );
        }
        this.checkPropertyRequirement(this.PropertyRequirementList);
        if (
          this.isProperty1Invalid ||
          this.isProperty2Invalid ||
          this.isProperty3Invalid ||
          this.isProperty4Invalid
        ) {
          this.scrollToElement('sec2');
          return;
        }
        this.isFormCancel = false;
        this.leadsService
          .InsertLeadsDetails({
            contactRef:
              this.getContactsDetail?.id == null
                ? null
                : this.getContactsDetail?.id,

            AgentId: this.BasicDetails.value?.LeadsAgent1,
            Reference: this.getRefName(),
            EnquiryDate: this.BasicDetails.value?.EnquiryDate,
            LeadTypeId: this.BasicDetails.value?.LeadType,
            LeadFinanceId: this.BasicDetails.value?.Finance,
            CreatedBy: this.BasicDetails.value?.CreatedBy,
            LeadStatusId: this.BasicDetails.value?.Status,
            LeadSubStatusId: this.BasicDetails.value?.SubStatus,
            LeadPriorityId: this.BasicDetails.value?.Priority,
            HotDeal: this.BasicDetails.value?.HotLead,
            SourceId: this.BasicDetails.value?.Source,
            AgentReferral: this.BasicDetails.value?.AgentReferral,
            ShareThisLead: this.BasicDetails.value?.ShareThisLead,
            // LeadViewings:[this.Viewings],
            propertyRequirement: this.PropertyRequirementList,
            createdBy: this.userData.id,
            updatedBy: this.userData.id,
            companyId: this.userData.companyId,
            // leadViewings:viewDetailPayload
          })
          .subscribe((data: any) => {
            if (data.status == 200) {
              this.leadsService.CallLead(true);
              this.toastr.success('Lead added successfully');
              document?.getElementById('kt_leads-details_close')?.click();
            } else {
              this.toastr.error('Something went wrong');
            }
          });
      } else {
        if (this.PropertyRequirementList.length > 0) {
          this.PropertyRequirementList.sort(
            (a: any, b: any) => a.propertyId - b.propertyId
          );
        }
        this.checkPropertyRequirement(this.PropertyRequirementList);
        if (
          this.isProperty1Invalid ||
          this.isProperty2Invalid ||
          this.isProperty3Invalid ||
          this.isProperty4Invalid
        ) {
          this.scrollToElement('sec2');
          return;
        }
        this.isFormCancel = false;
        this.leadsService
          .UpdateLeadDetails({
            id: this.leadId,
            leadId: this.leadId,
            contactRef:
              this.getContactsDetail?.id == null
                ? null
                : this.getContactsDetail?.id,

            AgentId: this.BasicDetails.value?.LeadsAgent1,
            EnquiryDate: this.BasicDetails.value?.EnquiryDate,
            LeadTypeId: this.BasicDetails.value?.LeadType,
            LeadFinanceId: this.BasicDetails.value?.Finance,
            CreatedBy: this.BasicDetails.value?.CreatedBy,
            LeadStatusId: this.BasicDetails.value?.Status,
            LeadSubStatusId: this.BasicDetails.value?.SubStatus,
            LeadPriorityId: this.BasicDetails.value?.Priority,
            HotDeal: this.BasicDetails.value?.HotLead,
            SourceId: this.BasicDetails.value?.Source,
            AgentReferral: this.BasicDetails.value?.AgentReferral,
            ShareThisLead: this.BasicDetails.value?.ShareThisLead,
            // LeadViewings:[this.Viewings],
            propertyRequirement: this.PropertyRequirementList,
            createdBy: this.userData.id,
            updatedBy: this.userData.id,
            companyId: this.userData.companyId,
            // leadViewings:viewDetailPayload
          })
          .subscribe((data: any) => {
            if (data?.status == 200) {
              this.leadsService.CallLead(true);
              document?.getElementById('kt_leads-details_close')?.click();
              this.toastr.success('Lead updated successfully');
            } else {
              this.toastr.error('Something went wrong');
            }
          });
      }
      document?.getElementById('kt_leads-details_close')?.click();
      this.isSave = false;
      this.PropertyRequirementList = [];
      this.BasicDetails.reset();
      this.Viewings.reset();
    }
  }

  onSelectContact(id: any) {
    this.contactId = id;
    this.tempSelectedContactRef = id;

    if (this.isFormDataEdit !== false)
      if (this.selectedLeadsContactId > 0) {
        this.contactService
          .GetContact(id, this.userData.companyId)
          .subscribe((data: any) => {
            this.getContactsDetail = data;
            this.cdr.detectChanges();
            return this.getContactsDetail;
          });
      } else {
        this.contactService
          .GetContact(id, this.userData.companyId)
          .subscribe((data: any) => {
            this.getContactsDetail = data;
            this.cdr.detectChanges();
            return this.getContactsDetail;
          });
      }
  }
  contactDataClose() {
    if (this.getContactsDetail == '') {
      this.tempSelectedContactRef = null;
    }
    // this.getListingUsingId = '';
    // this.getContactsDetail = '';
    this.createContact.close(this.modalConfig);
  }
  contactDataSave() {
    this.selectedLeadsContactId = this.contactId;
    this.getContactsDetail = this.ContactDetailsList?.find(
      (x: any) => x.id == this.contactId
    );
    this.cdr.detectChanges();
    this.createContact.close(this.modalConfig);
    this.cdr.detectChanges();

    // this.contactService.GetContact(this.contactId,this.userData.companyId).subscribe((data: any) => {
    //   this.getContactsDetail = data;
    //   this.cdr.detectChanges();
    //      return this.getContactsDetail;
    // });
    // this.cdr.detectChanges();

    // this.createContact.close(this.modalConfig);
  }
  onChangeSubStatus(e: any) {
    this.BasicDetails.controls['SubStatus'].setValue(null);
    this.getAllLeadSubStatusById(e);
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      listingType: ['0'],

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
      companyId: [this.userData.companyId],
      createdUser: [this.userData.id],
      roleId: this.userData.roleId,
      userId: this.userData.id,
    });
  }

  initMatchingListingForm(): void {
    this.MatchingListingsform = this.formBuilder.group({
      listingType: ['0'],

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
      companyId: [this.userData.companyId],
      createdUser: [this.userData.id],
      roleId: this.userData.roleId,
      userId: this.userData.id,
      matchingListingRef: [],
    });
  }
  getAllListing(data: any) {
    this.listingData(
      this.form.value.sortFiled,
      this.form.value.sortDirection,
      this.form.value.page,
      this.form.value.itemsPerPage
    );
    // this.listingSevice.getListingBasic(data).subscribe((data: any) => {
    //   this.listingDetailsList = data;
    //   this.propertyCollectionData = this.listingDetailsList;
    // });
  }
  getPurpose() {
    this.listingSevice.getPurpose().subscribe((data: any | undefined) => {
      this.purposeList = data;
    });
  }
  onSelectListing(id: any) {
    this.selectedPropertyListningId = id;
    this.storeIdForPropertyRequirement = id;
    this.tempSelectedListningPropertyRef = id;
    this.tempSelectedLeadRef = id;
    this.storeIdForViewingData = id;
    this.dataForProprtyform = this.listingDetailsList?.find(
      (x: any) => x.listingId == id
    );
    this.cdr.detectChanges();
    // this.listingSevice
    // .GetListingDetailsById(this.storeIdForViewingData,this.userData.companyId)
    // .subscribe((data: any | undefined) => {
    //   this.dataForProprtyform = data;
    //   this.cdr.detectChanges();
    // });
  }
  onSelectProprtyLeads(id: any) {
    this.listingSevice
      .GetListingDetailsById(id, this.userData.companyId)
      .subscribe((data: any | undefined) => {
        this.PropertyRequirementList = data;
      });
  }
  GetPropertyType() {
    this.listingSevice.GetPropertyType().subscribe((data: any | undefined) => {
      this.propertyTypeList = data;
    });
  }
  onViewingAdd() {
    this.tempSelectedLeadRef = null;
    this.selectedListingId = 0;
    this.viewingDataForm = true;
    this.addViewingButton = false;
  }
  onViewing() {
    this.isViewingSave = true;
    if (!this.Viewings.valid) {
      const formControls = this.Viewings.controls;
      for (const control of Object.keys(this.Viewings.controls)) {
        this.Viewings.controls[control].markAllAsTouched();
      }
      for (const controlName in formControls) {
        if (
          formControls.hasOwnProperty(controlName) &&
          formControls[controlName].invalid
        ) {
          const control = formControls[controlName];
          this.getErrorMessage(control);
          controlName.charAt(0).toUpperCase() + controlName.slice(1);
        }
      }
      if (!this.Viewings.valid) {
        this.scrollToElement('viewingSec1');
        return;
      }
      if (
        this.getListingUsingId === undefined ||
        this.getListingUsingId === null ||
        this.getListingUsingId === ''
      ) {
        this.scrollToElement('viewingSec1');
        return;
      }
    } else if (
      this.getListingUsingId === undefined ||
      this.getListingUsingId === '' ||
      this.getListingUsingId === null ||
      !this.getListingUsingId
    ) {
      return;
    } else if (this.Viewings.value?.id == null) {
      let viewingDataPayload = {
        leadId: this.onEditLeadId === 0 ? null : this.onEditLeadId,
        listingId:
          this.getListingUsingId == 0 ? null : this.getListingUsingId?.id,
        startDate: this.Viewings.value?.startDate,
        startDateTime: this.Viewings.value?.startDateTime,
        endDate: this.Viewings.value?.endDate,
        endDateTime: this.Viewings.value?.endDateTime,
        statusId: this.Viewings.value?.statusId,
        agentId: this.Viewings.value?.viewingAgentId,
        notes: this.Viewings.value?.notes,
        createdBy: this.userData.id,
        updatedBy: this.userData.id,
        companyId: this.userData.companyId,
      };
      this.ViewingsService.InsertViewingDetails(viewingDataPayload).subscribe(
        (data: any) => {
          this.toastr.success('Viewing added successfully');
          this.Viewings.reset();
          this.getListingUsingId = '';
          this.GetViewLeadDetailsByLeadId(this.onEditLeadId);
          this.Viewings.controls['statusId'].setValue(1);
          this.scrollContent();
          this.viewingDataForm = false;
          this.addViewingButton = true;
        }
      );
      this.isViewingSave = false;
    } else {
      let viewingDataPayload = {
        id: this.Viewings.value?.id,
        leadId: this.onEditLeadId === 0 ? null : this.onEditLeadId,
        listingId:
          this.getListingUsingId == 0 ? null : this.getListingUsingId?.id,
        startDate: this.Viewings.value?.startDate,
        startDateTime: this.Viewings.value?.startDateTime,
        endDate: this.Viewings.value?.endDate,
        endDateTime: this.Viewings.value?.endDateTime,
        statusId: this.Viewings.value?.statusId,
        agentId: this.Viewings.value?.viewingAgentId,
        notes: this.Viewings.value?.notes,
        createdBy: this.userData.id,
        updatedBy: this.userData.id,
        companyId: this.userData.companyId,
      };
      this.ViewingsService.EditViewingDetails(viewingDataPayload).subscribe(
        (data: any) => {
          this.toastr.success('Viewing updated successfully');
          this.Viewings.reset();
          this.getListingUsingId = '';
          this.GetViewLeadDetailsByLeadId(this.onEditLeadId);
          this.Viewings.controls['statusId'].setValue(1);
          this.scrollContent();
          this.viewingDataForm = false;
          this.addViewingButton = true;
        }
      );
      this.isViewingSave = false;
    }
  }
  onEdit(id: any) {
    this.onEditLeadId = id;
    this.leadsService
      .GetLeadDetailsByLeadId(id, this.userData.companyId)
      .subscribe((data: any) => {
        this.onSelectContact(data?.contactRef);
        this.cdr.detectChanges();
        this.leadsDetailsForTime = data;
        this.getAllLeadSubStatusById(data.leadStatusId);
        this.PropertyRequirementList = data.propertyRequirement;
        this.MatchingPropertyRequirementList = data.propertyRequirement.map(
          (x: any) => ({
            ...x,
            showLocationDetails: false,
            showMatchingProperties: false,
            matchingProperties: [],
          })
        );
        this.previewLinks = [];
        this.previewLinksTableView = [];
        if (this.PropertyRequirementList.length > 0) {
          this.PropertyRequirementList.sort(
            (a: any, b: any) => a.propertyId - b.propertyId
          );
        }
        this.checkPropertyRequirement(this.PropertyRequirementList);
        this.setReference = data.reference;
        this.leadId = data?.id;
        this.propertyRequirementpopup = false;
        this.GetViewLeadDetailsByLeadId(data?.id);
        this.setValuePropertyRequirements(data?.propertyRequirement);
        this.setValueBasicDetails(data);
        this.Viewings.controls['statusId'].setValue(1);
      });
  }
  editViewIngData(id: any) {
    this.tempSelectedLeadRef = id;
    this.viewingDataForm = true;
    this.addViewingButton = false;
    this.setViewingDataValue = id;
    this.setValueForviewinng(this.setViewingDataValue);
    this.leadsService
      .GetViewLeadDetailsByLeadId(id)
      .subscribe((data: any | undefined) => {});
    this.scrollContent();
  }
  setValueForviewinng(data: any) {
    this.Viewings = new FormGroup({
      id: new FormControl(data?.id == null ? null : data?.id),
      leadId: new FormControl(data?.leadId),
      viewingAgentId: new FormControl(data?.agentId, [Validators.required]),
      ListingRef: new FormControl(data?.listingReference, [
        Validators.required,
      ]),
      startDate: new FormControl(
        data?.startDate != null
          ? moment(data?.startDate).format('YYYY-MM-DD')
          : null,
        [Validators.required]
      ),
      startDateTime: new FormControl(
        moment(data?.startDateTime).format('HH:mm:ss'),
        [Validators.required]
      ),
      endDate: new FormControl(
        data?.endDate != null
          ? moment(data?.endDate).format('YYYY-MM-DD')
          : null,
        [Validators.required]
      ),
      endDateTime: new FormControl(
        moment(data?.endDateTime).format('HH:mm:ss'),
        [Validators.required]
      ),
      statusId: new FormControl(parseInt(data?.statusId)),
      agentId: new FormControl(data?.agentId),
      notes: new FormControl(data?.notes),
    });
    let dataFind = this.listingDetailsList.filter(
      (x: any) => x.reference === this.Viewings.value.ListingRef
    );
    this.storeIdForViewingData = dataFind[0]?.listingId;
    this.selectedListingId = dataFind[0]?.id;
    this.getListingUsingId = dataFind[0];
  }
  setValueBasicDetails(data: any) {
    this.BasicDetails = new FormGroup({
      LeadsAgent1: new FormControl(data.agentId, Validators.required),
      Reference: new FormControl({ value: data.reference, disabled: true }),
      EnquiryDate: new FormControl(
        data?.enquiryDate != null
          ? moment(data?.enquiryDate).format('YYYY-MM-DD')
          : null
      ),
      LeadType: new FormControl(data.leadTypeId, Validators.required),
      Finance: new FormControl(data.leadFinanceId),
      CreatedBy: new FormControl({ value: data.createdBy, disabled: true }),
      Status: new FormControl(data.leadStatusId, Validators.required),
      SubStatus: new FormControl(data.leadSubStatusId, Validators.required),
      Priority: new FormControl(
        data.leadPriorityId == 0 ? null : data.leadPriorityId
      ),
      HotLead: new FormControl(data.hotDeal),
      Source: new FormControl(data.sourceId, Validators.required),
      AgentReferral: new FormControl(data.agentReferral),
      propertyRequirement: new FormControl(),
    });
    this.IsLoading = false;
    this.cdr.detectChanges();
    this.disableForm();
  }

  setValuePropertyRequirements(data: any) {
    // setTimeout(() => {
    //   this.selectEmirates(null,data[0]?.emirateId);
    //   this.selectSubLocation(null,data[0]?.locationId);
    // }, 3000);
    const payload = data[1];
    // data.forEach((element:any) => {
    //   this.PropertyRequirementList.push(data);
    // });
    // this.BasicDetails.controls['propertyRequirement'].setValue(data);
  }
  GetViewLeadDetailsByLeadId(leadsId: any) {
    this.storeIdForViewingData = leadsId;
    this.leadsService
      .GetLeadViewingsByLeadId(leadsId, this.userData.companyId)
      .subscribe((data: any | undefined) => {
        this.setViewingData(data);
      });
  }

  setViewingData(data: any) {
    this.viewingList = data;
    this.cdr.detectChanges();
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
    this.getAllListing(this.form.value);
  }
  getDataon2: boolean;
  filterDataValue: any;
  onFilterSelection(name: any, e: any, page: any, itemPerPage: any) {
    this.page = 1;
    this.form.controls[name].setValue(e.target.value);
    this.form.controls['page'].setValue(page);
    this.form.controls['itemsPerPage'].setValue(itemPerPage);
    if (e.target.value.length > 2) {
      this.getDataon2 = true;
      this.filterDataValue = e.target.value;
      this.getAllListing(this.form.value);
    }
    if (this.filterDataValue != '' && e.target.value.length == 0) {
      this.filterDataValue = '';
      if (this.getDataon2) {
        this.getAllListing(this.form.value);
      }
      this.getDataon2 = false;
    }
  }
  onFilterSelectionContactDrp(name: any, e: any, page: any, itemPerPage: any) {
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
    this.getAllListing(this.form.value);
  }
  getDataon2Contact: boolean;
  filterDataValueContact: any;
  onFilterSelectionContact(name: any, e: any, page: any, itemPerPage: any) {
    this.page = 1;
    this.form.controls[name].setValue(e.target.value);
    this.form.controls['page'].setValue(page);
    this.form.controls['itemsPerPage'].setValue(itemPerPage);
    if (e.target.value.length > 2) {
      this.getDataon2Contact = true;
      this.filterDataValueContact = e.target.value;
      this.getAllListing(this.form.value);
    }
    if (this.filterDataValueContact != '' && e.target.value.length == 0) {
      this.filterDataValueContact = '';
      if (this.getDataon2Contact) {
        this.getAllListing(this.form.value);
      }
      this.getDataon2Contact = false;
    }
  }
  selectEmirates(e: any, id: any) {
    this.PropertyRequirements.controls['locationId'].setValue(null);
    this.PropertyRequirements.controls['subLocationId'].setValue(null);
    this.AllLocation = [];
    this.AllSubLocation = [];
    if (e == null) {
      // this.PropertyRequirements.controls['locationId'].setValue(null);
      this.listingSevice
        .getLocationByEmirates(id)
        .subscribe((data: any | undefined) => {
          this.AllLocation = data;
        });
      this.cdr.detectChanges();
    } else {
      this.listingSevice
        .getLocationByEmirates(e)
        .subscribe((data: any | undefined) => {
          this.AllLocation = data;
        });
    }
    this.cdr.detectChanges();
  }
  showingEmirates(id: any) {
    this.listingSevice
      .getLocationByEmirates(id)
      .subscribe((data: any | undefined) => {
        this.AllLocation = data;
      });
  }
  showingLocation(id: any) {
    this.listingSevice
      .GetSubLocationById(id)
      .subscribe((data: any | undefined) => {
        this.AllSubLocation = data;
      });
  }
  showingSublication(id: any) {}
  selectSubLocation(e: any, locationId: any) {
    this.PropertyRequirements.controls['subLocationId'].setValue(null);
    this.AllSubLocation = [];
    if (e == null) {
      this.getSubLocation(locationId);
    } else {
      this.getSubLocation(e);
    }
  }
  getSubLocation(id: any) {
    this.AllSubLocation = [];
    // this.PropertyRequirements.controls['subLocationId'].setValue(null);
    this.listingSevice
      .GetSubLocationById(id)
      .subscribe((data: any | undefined) => {
        this.AllSubLocation = data;
      });
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
          this.searchContactForm.value?.filterFirstName.length >= 3 ||
          (e.target.value.length == 0 && this.isFilterDesignation)
        ) {
          this.isFilterDesignation = false;
          if (this.searchContactForm.value?.filterFirstName.length >= 3) {
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
  getSubstatusValue(subStatus: any) {
    if (subStatus == null) {
      subStatus = 0;
    }
    var data = this.AllSubStatusType.find((x) => (x.id = subStatus));
    if (data) {
      return data.name;
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

  SaveLeadNotes() {
    this.isSaveNotes = true;
    if (!this.LeadNotesForm.valid) {
      return;
    } else {
      this.leadsService
        .InsertLeadNotes({
          leadId: this.editLeadId,
          notes: this.LeadNotesForm.get('Notes')?.value,
          createdBy: this.userData.id,
          updatedBy: this.userData.id,
          companyId: this.userData.companyId,
        })
        .subscribe((data: any) => {
          if (data?.status == 200) {
            // this.UploadProfilePhoto(data?.message);
            this.isSaveNotes = false;
            this.setInitalLeadNotesForm();
            this.cdr.detectChanges();
            this.getLeadNotesByLeadId(this.editLeadId);
            this.toastr.success('Notes added successfully');
          } else {
            this.toastr.error('Something went wrong');
          }
        });
    }
  }

  getLeadNotesByLeadId(leadId: any) {
    this.leadsService.GetLeadNotes(leadId).subscribe((data: any) => {
      this.LeadNotes = data;
      this.cdr.detectChanges();
    });
  }

  get Notes() {
    return this.LeadNotesForm.get('Notes')!;
  }

  get purpose() {
    return this.PropertyRequirements.get('purposeId')!;
  }

  get propertyType() {
    return this.PropertyRequirements.get('categoryId')!;
  }

  get emirate() {
    return this.PropertyRequirements.get('emirateId')!;
  }

  checkPropertyRequirement(data: any) {
    var propertyrequirements = data;
    if (data != null && data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        var propertyReq = data[i];
        if (i == 0) {
          if (
            propertyReq.categoryId == null ||
            propertyReq.categoryId == '' ||
            propertyReq.emirateId == null ||
            propertyReq.emirateId == '' ||
            propertyReq.purposeId == null ||
            propertyReq.purposeId == ''
          ) {
            this.isProperty1Invalid = true;
          } else {
            this.isProperty1Invalid = false;
          }
        }
        if (i == 1) {
          if (
            propertyReq.categoryId == null ||
            propertyReq.categoryId == '' ||
            propertyReq.emirateId == null ||
            propertyReq.emirateId == '' ||
            propertyReq.purposeId == null ||
            propertyReq.purposeId == ''
          ) {
            this.isProperty2Invalid = true;
          } else {
            this.isProperty2Invalid = false;
          }
        }
        if (i == 2) {
          if (
            propertyReq.categoryId == null ||
            propertyReq.categoryId == '' ||
            propertyReq.emirateId == null ||
            propertyReq.emirateId == '' ||
            propertyReq.purposeId == null ||
            propertyReq.purposeId == ''
          ) {
            this.isProperty3Invalid = true;
          } else {
            this.isProperty3Invalid = false;
          }
        }
        if (i == 3) {
          if (
            propertyReq.categoryId == null ||
            propertyReq.categoryId == '' ||
            propertyReq.emirateId == null ||
            propertyReq.emirateId == '' ||
            propertyReq.purposeId == null ||
            propertyReq.purposeId == ''
          ) {
            this.isProperty4Invalid = true;
          } else {
            this.isProperty4Invalid = false;
          }
        }
      }
    }
  }

  getPropertyListing(listingRef: any) {
    var ref: any = '(' + listingRef + ')';
    return ref;
  }

  toggleLocationDetails(index: number) {
    this.MatchingPropertyRequirementList[index].showLocationDetails =
      !this.MatchingPropertyRequirementList[index].showLocationDetails;
    this.cdr.detectChanges();
  }

  getMatchingProperties(i: any, property: any) {
    this.IsLoading = true;
    this.previewLinks = [];
    this.previewLinksTableView = [];
    this.filterMatchingProperty = property;
    this.leadsService
      .GetMatchingProperties({
        propertyType: property.categoryId,
        purpose: property.purposeId,
        emirate: property.emirateId,
        location: property.locationId,
        sublocation: property.subLocationId,
        minBeds: property.minBedsId,
        maxBeds: property.maxBedsId,
        minPrice: property.minPrice,
        maxPrice: property.maxPrice,
        minArea: property.minArea,
        maxArea: property.maxArea,
        companyId: this.userData.companyId,
        roleId: this.userData.roleId,
        listingRef: property.listingRef,
        userId: this.userData.id,
      })
      .subscribe((data: any) => {
        this.IsLoading = false;
        this.MatchingPropertyRequirementList.forEach((x: any) => {
          x.showMatchingProperties = false;
          x.matchingProperties = [];
        });
        this.MatchingPropertyRequirementList[i].showMatchingProperties = true;
        this.MatchingPropertyRequirementList[i].matchingProperties = data?.map(
          (x: any) => ({
            ...x,
            isChecked: false,
          })
        );
        this.cdr.detectChanges();
      });
  }

  getLeadMobileNo(mobile: any) {
    if (mobile != null && mobile.length > 0) {
      //Personal Mobile
      var PersonalMobile = mobile.find((x: any) => x.mobileType == 1);
      if (PersonalMobile != undefined) {
        return (PersonalMobile.countryCodeString + PersonalMobile.mobile).replace(/\s/g, "");
      }

      var WorkMobile = mobile.find((x: any) => x.mobileType == 2);
      if (WorkMobile != undefined) {
        return (WorkMobile.countryCodeString + WorkMobile.mobile).replace(/\s/g, "");
      }

      var OtherMobile = mobile.find((x: any) => x.mobileType == 3);
      if (OtherMobile != undefined) {
        return (OtherMobile.countryCodeString + OtherMobile.mobile).replace(/\s/g, "");
      }
    }
    return null;
  }

  sendWhatsappMessage() {
    var contact = this.getContactsDetail;
    var MobileNo: any = null;
    if (contact != null) {
      MobileNo = this.getLeadMobileNo(contact.mobile);
    }
    if (this.previewLinks.length > 0) {
      var links: any = this.previewLinks.map(
        (x: any) => this.frontendUrl + 'listings/view?id=' + x
      );

      const formattedLinks = links
        .map((link: any, index: any) => `${index + 1}. ${link}`)
        .join('\n');

      const message = `Hello,\n\nI've found some properties that fit what you're looking for:\n\n${formattedLinks}\n\nCheck them out and let me know which ones catch your eye!\n\nThanks!`;

      const encodedMessage = encodeURIComponent(message);

      if (MobileNo == null) {
        const waMeLink = `https://wa.me/?text=${encodedMessage}`;
        // Open the link in a new tab or redirect the user to the link
        window.open(waMeLink, '_blank');
      } else {
        const waMeLink =
          `https://wa.me/${MobileNo}?text=${encodedMessage}`;
        // Open the link in a new tab or redirect the user to the link
        window.open(waMeLink, '_blank');
      }
    }
  }

  sendWhatsappMessageTableView() {
    var contact = this.getContactsDetail;
    var MobileNo: any = null;
    if (contact != null) {
      MobileNo = this.getLeadMobileNo(contact.mobile);
    }
    if (this.previewLinksTableView.length > 0) {
      var links: any = this.previewLinksTableView.map(
        (x: any) => this.frontendUrl + 'listings/view?id=' + x
      );

      const formattedLinks = links
        .map((link: any, index: any) => `${index + 1}. ${link}`)
        .join('\n');

      const message = `Hello,\n\nI've found some properties that fit what you're looking for:\n\n${formattedLinks}\n\nCheck them out and let me know which ones catch your eye!\n\nThanks!`;

      const encodedMessage = encodeURIComponent(message);

      if (MobileNo == null) {
        const waMeLink = `https://wa.me/?text=${encodedMessage}`;
        window.open(waMeLink, '_blank');
      } else {
        const waMeLink =
          `https://wa.me/${MobileNo}?text=${encodedMessage}`;
        window.open(waMeLink, '_blank');
      }
    }
  }

  addRemovePreviewLink(event: any) {
    if (event.target.checked) {
      var previewLinkExist = this.previewLinks.find(
        (x: any) => x == event.target.value
      );
      if (previewLinkExist == undefined) {
        this.previewLinks.push(event.target.value);
      }
    } else {
      const index: number = this.previewLinks.indexOf(event.target.value);
      if (index !== -1) {
        this.previewLinks.splice(index, 1);
      }
    }
  }

  addRemovePreviewLinkTableView(event:any) {
    if (event.target.checked) {
      var previewLinkExist = this.previewLinksTableView.find(
        (x: any) => x == event.target.value
      );
      if (previewLinkExist == undefined) {
        this.previewLinksTableView.push(event.target.value);
      }
    } else {
      const index: number = this.previewLinksTableView.indexOf(event.target.value);
      if (index !== -1) {
        this.previewLinksTableView.splice(index, 1);
      }
    }
  }

  closeViewMatchingListings() {
    this.previewLinksTableView = [];
    this.MatchingListView.close(this.modalConfig);
  }

  onFilterMatchingListingSelection(name: any, e: any, page: any, itemPerPage: any) {
    this.pageMatchingListing = 1;
    this.MatchingListingsform.controls[name].setValue(e.target.value);
    this.MatchingListingsform.controls['page'].setValue(page);
    this.MatchingListingsform.controls['itemsPerPage'].setValue(itemPerPage);
    if (e.target.value.length > 2) {
      this.getDataon2 = true;
      this.filterDataValue = e.target.value;
      this.getAllMatchingListing(this.MatchingListingsform.value);
    }
    if (this.filterDataValue != '' && e.target.value.length == 0) {
      this.filterDataValue = '';
      if (this.getDataon2) {
        this.getAllMatchingListing(this.MatchingListingsform.value);
      }
      this.getDataon2 = false;
    }
  }

  onFilterMatchingListingSelectionDrp(name: any, e: any, page: any, itemPerPage: any) {
    this.pageMatchingListing = 1;
    this.MatchingListingsform.controls['page'].setValue(this.pageMatchingListing);
    this.MatchingListingsform.controls['itemsPerPage'].setValue(this.itemsPerPageMatchingListing);
    switch (e) {
      case undefined:
        this.MatchingListingsform.controls[name].setValue(null);
        break;
      default:
        this.MatchingListingsform.controls[name].setValue(e);
        break;
    }
    this.getAllMatchingListing(this.form.value);
  }

  onFilterMatchingListingSelectionDecimal(name: any, e: any, page: any, itemPerPage: any) {
    this.pageMatchingListing = 1;
    this.MatchingListingsform.controls['page'].setValue(page);
    this.MatchingListingsform.controls['itemsPerPage'].setValue(itemPerPage);
    //this.form.controls[name].setValue(e);
    if (e.target.value.length > 0) {
      this.getDataon2 = true;
      this.filterDataValue = e.target.value;
      this.listingMatchingData(
        this.MatchingListingsform.value.sortFiled,
        this.MatchingListingsform.value.sortDirection,
        page,
        itemPerPage
      );
    }
    if (this.filterDataValue != '' && e.target.value.length == 0) {
      this.filterDataValue = '';
      this.MatchingListingsform.controls[name].setValue(null);
      if (this.getDataon2) {
        this.listingMatchingData(
          this.MatchingListingsform.value.sortFiled,
          this.MatchingListingsform.value.sortDirection,
          page,
          itemPerPage
        );
      }
      this.getDataon2 = !this.getDataon2;
    }
  }

  onFilterMatchingListingSelection1st(name: any, e: any, page: any, itemPerPage: any) {
    this.pageMatchingListing = 1;
    this.MatchingListingsform.controls[name].setValue(e.target.value);
    this.MatchingListingsform.controls['page'].setValue(page);
    this.MatchingListingsform.controls['itemsPerPage'].setValue(itemPerPage);
    if (e.target.value.length > 0) {
      this.getDataon2 = true;
      this.filterDataValue = e.target.value;
      this.listingMatchingData(
        this.MatchingListingsform.value.sortFiled,
        this.MatchingListingsform.value.sortDirection,
        page,
        itemPerPage
      );
    }
    if (this.filterDataValue != '' && e.target.value.length == 0) {
      this.filterDataValue = '';
      if (this.getDataon2) {
        this.listingMatchingData(
          this.MatchingListingsform.value.sortFiled,
          this.MatchingListingsform.value.sortDirection,
          page,
          itemPerPage
        );
      }
      this.getDataon2 = false;
    }
  }

  getAllMatchingListing(data: any) {
    this.listingMatchingData(
      this.MatchingListingsform.value.sortFiled,
      this.MatchingListingsform.value.sortDirection,
      this.MatchingListingsform.value.page,
      this.MatchingListingsform.value.itemsPerPage
    );
    // this.listingSevice.getListingBasic(data).subscribe((data: any) => {
    //   this.listingDetailsList = data;
    //   this.propertyCollectionData = this.listingDetailsList;
    // });
  }

  listingMatchingData(sortFiled: any, sortDirection: any, page: any, itemPerPage: any) {
    this.IsLoading = true;
    this.MatchingListingsform.controls['sortFiled'].setValue(sortFiled);
    this.MatchingListingsform.controls['sortDirection'].setValue(sortDirection);
    this.MatchingListingsform.controls['page'].setValue(page);
    this.MatchingListingsform.controls['itemsPerPage'].setValue(this.itemsPerPageMatchingListing);
    this.MatchinglistingDetails = [];
    this.listingSevice.getListingBasic(this.MatchingListingsform.value).subscribe(
      (data: any | undefined) => {
        this.MatchinglistingDetails = data?.map((x:any) => ({
          ...x,
          isSelected: false
        }));
        //this.selectedPropertyData(this.storePropertyId);
        if (data.length > 0) {
          this.totalMatchingListingRecord = data[0].totalRecords;
        } else {
          this.totalMatchingListingRecord = 0;
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

  renderMatchingListingPage(event: number) {
    this.pageMatchingListing = event;
    this.MatchingListingsform.controls['page'].setValue(this.pageMatchingListing);
    this.MatchingListingsform.controls['itemsPerPage'].setValue(this.itemsPerPageMatchingListing);
    this.listingMatchingData(
      this.MatchingListingsform.value.sortFiled,
      this.MatchingListingsform.value.sortDirection,
      this.MatchingListingsform.value.page,
      this.MatchingListingsform.value.itemsPerPage
    );
  }

  openViewingMatchingList() {
    this.previewLinksTableView = [];
    this.pageMatchingListing = 1;
    this.initMatchingListingForm();
    if(this.filterMatchingProperty != null) {
      if(this.filterMatchingProperty.categoryId != null) {
        this.MatchingListingsform.controls['propertyTypeId'].setValue(this.filterMatchingProperty.categoryId);
      }
      if(this.filterMatchingProperty.purposeId != null) { 
        this.MatchingListingsform.controls['purposeId'].setValue(this.filterMatchingProperty.purposeId);
      }
      if(this.filterMatchingProperty.emirateId != null) {
        this.MatchingListingsform.controls['emiratesId'].setValue(this.filterMatchingProperty.emirateId);
      }
      if(this.filterMatchingProperty.locationId != null) {
        this.MatchingListingsform.controls['locationId'].setValue(this.filterMatchingProperty.locationId);
      }
      if(this.filterMatchingProperty.subLocationId != null) {
        this.MatchingListingsform.controls['subLocationId'].setValue(this.filterMatchingProperty.subLocationId);
      }
      if(this.filterMatchingProperty.minBedsId != null) {
        this.MatchingListingsform.controls['bedsId'].setValue(this.filterMatchingProperty.minBedsId);
      }
      if(this.filterMatchingProperty.minPrice != null) {
        this.MatchingListingsform.controls['minPrice'].setValue(this.filterMatchingProperty.minPrice);
      }
      if(this.filterMatchingProperty.maxPrice != null) {
        this.MatchingListingsform.controls['maxPrice'].setValue(this.filterMatchingProperty.maxPrice);
      }
      if(this.filterMatchingProperty.minArea != null) {
        this.MatchingListingsform.controls['minBUA'].setValue(this.filterMatchingProperty.minArea);
      }
      if(this.filterMatchingProperty.maxArea != null) {
        this.MatchingListingsform.controls['maxBUA'].setValue(this.filterMatchingProperty.maxArea);
      }
      if(this.filterMatchingProperty.listingRef != null) {
        this.MatchingListingsform.controls['matchingListingRef'].setValue(this.filterMatchingProperty.listingRef);
      }
    }
    this.listingMatchingData(
      this.MatchingListingsform.value.sortFiled,
      this.MatchingListingsform.value.sortDirection,
      this.MatchingListingsform.value.page,
      this.MatchingListingsform.value.itemsPerPage
    );
    return new Promise<boolean>((resolve) => {
      this.MatchingListView = this.modalService.open(this.modalContentMatchingList, {
        size: 'xl',
      });
      this.MatchingListView.result.then(resolve, resolve);
    });
  }
}
