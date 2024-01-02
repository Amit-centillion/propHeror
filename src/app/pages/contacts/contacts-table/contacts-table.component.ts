import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from 'src/app/_metronic/partials';
import { AuthService } from 'src/app/modules/auth';
import { ContactService } from 'src/app/modules/auth/services/contact.service';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {
  contactForm:FormGroup;
  IsLoading:boolean =false;
  isSelectAllContact:boolean = false;
  data:any = {
    'AddContact':true,
    'EditContact':false,
    'Id':0
  };
  exportContactId:any = [];
  selectedContactId:number = 0;
  searchContactForm: FormGroup;
  pageNumber = 1;
  pageSize = 25;
  sortColumn:string = 'Updated';
  sortDir:boolean = true;
  ContactDetailsList:any = [];
  assignToList:any=[];
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
  HobbiesList:any = [];
  totalRecord: number = 0;
  isFilterRef:boolean = false;
  isFilterFirstName:boolean = false;
  isFilterLastName: boolean = false;
  isFilterPersonalMobile:boolean = false;
  isFilterWorkMobile:boolean = false;
  isFilterOtherMobile:boolean = false;
  isFilterPersonalPhone:boolean = false;
  isFilterWorkPhone:boolean = false;
  isFilterOtherPhone:boolean = false;
  isFilterPersonalEmail:boolean = false;
  isFilterWorkEmail:boolean = false;
  isFilterOtherEmail:boolean = false;
  isFilterPersonalFax:boolean = false;
  isFilterWorkFax:boolean = false;
  isFilterOtherFax:boolean = false;
  isFilterPersonalPO:boolean = false;
  isFilterPersonalAddressLine1:boolean = false;
  isFilterPersonalAddressLine2:boolean = false;
  isFilterPersonalCity:boolean = false;
  isFilterPersonalState:boolean = false;
  isFilterPersonalZip:boolean = false;
  isFilterWorkPO:boolean = false;
  isFilterWorkAddressLine1:boolean = false;
  isFilterWorkAddressLine2:boolean = false;
  isFilterWorkCity:boolean = false;
  isFilterWorkState:boolean = false;
  isFilterWorkZip:boolean = false;
  isFilterFacebookLink:boolean = false;
  isFilterTwitterLink:boolean = false;
  isFilterLinkedIn:boolean = false;
  isFilterSkypeLink:boolean = false;
  isFilterGooglePlusLink:boolean = false;
  isFilterInstagramLink:boolean = false;
  isFilterWeChatLink:boolean = false;
  isFilterSocialWebsite:boolean = false;
  isFilterWebsiteLink:boolean = false;
  isFilterCompanyName:boolean = false;
  isFilterDesignation:boolean = false;
  isFilterWebsite:boolean=false;
  userList:any = [];
  userData:any;
  isAddContactPermission: boolean = false;
  isDraweropen:boolean = false;
  imgUrl = environment.imgUrl;

  columnOrder:any=[];
  DeafultcolumnOrder:any = [
    {
      column: 'Reference',
      isVisible: true
    },
    {
      column: 'Assigned To',
      isVisible: true
    }, {
      column: 'Title',
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
      isVisible: true,
    }, 
    {
      column: 'Personal Phone',
      isVisible: true,
    },
    {
      column: 'Work Phone',
      isVisible:true,
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
      isVisible: true,
    },
    {
      column: 'Other Email',
      isVisible: true,
    },
    {
      column: 'Personal PO Box',
      isVisible: true
    }, 
    {
      column: 'Personal Address Line 1',
      isVisible: true,
    }, 
    {
      column: 'Personal Address Line 2',
      isVisible: true,
    },
    {
      column: 'Personal City',
      isVisible: true,
    },
    {
      column: 'Personal Zip Code',
      isVisible: true,
    },
    {
      column: 'Personal State',
      isVisible: true,
    },
    {
      column: 'Personal Country',
      isVisible: true,
    },
    {
      column: 'Work PO Box',
      isVisible: true,
    },
    {
      column: 'Work Address Line 1',
      isVisible: true,
    },
    {
      column: 'Work Address Line 2',
      isVisible: true,
    },
    {
      column: 'Work City',
      isVisible: true,
    },
    {
      column: 'Work Zip Code',
      isVisible: true,
    },
    {
      column: 'Work State',
      isVisible: true,
    },
    {
      column: 'Work Country',
      isVisible: true,
    },
    {
      column: 'Facebook Link',
      isVisible: true,
    },
    {
      column: 'Instagram Link',
      isVisible: true,
    },
    {
      column: 'Twitter Link',
      isVisible: true,
    },
    {
      column: 'LinkedIn Link',
      isVisible: true,
    },
    {
      column: 'Google+ Link',
      isVisible: true,
    },
    {
      column: 'Skype Link',
      isVisible: true,
    },
    {
      column: 'WeChat Link',
      isVisible: true,
    },
    {
      column: 'Personal Website',
      isVisible: true,
    },
    {
      column: 'VIP',
      isVisible: true,
    },
    {
      column: 'Gender',
      isVisible: true,
    },
    {
      column: 'Date of Birth',
      isVisible: true,
    },
    {
      column: 'Nationality',
      isVisible: true,
    },
    {
      column: 'Second Nationality',
      isVisible: true,
    },
    {
      column: 'Religion',
      isVisible: true,
    },
    {
      column: 'Native Language',
      isVisible: true,
    },
    {
      column: 'Second Language',
      isVisible: true,
    },
    {
      column: 'Contact Source',
      isVisible: true,
    },
    {
      column: 'Company Name',
      isVisible: true,
    },
    {
      column: 'Designation',
      isVisible: true,
    },
    {
      column: 'Website',
      isVisible: true,
    },
    {
      column: 'Contact Type',
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
    }
  ]
  tempcolumnOrder:any;
  @ViewChild('columnSettingmodal') private modalcolumnContent: TemplateRef<ContactsTableComponent>;
  private modalColumnRef: NgbModalRef;
  @Input() public modalConfig: ModalConfig;

  ngOnInit(): void {
    var uData = this.authService.userValue;
  if(uData != null){
  this.userData= JSON.parse(uData);
  this.isAddContactPermission = this.userData.permissionAccess.filter((x:any) => x.permissionId == 10).length > 0;
  }
  this.contactService.IsOpenDrawer.subscribe((x:any) => {
    if(x != null) {
      this.isDraweropen = x;
    }
  })
    this.getDropdownList();
    this.setSearchForm();
    this.getColumnOrder();
   // this.getAllContactDetails();
    this.contactService.isOpenListContact.subscribe(data => {
      if(data) {
        this.pageNumber = 1
        this.pageSize = 25;
        this.sortColumn = 'Updated';
        this.sortDir = true;
        //this.searchContactForm.reset();
        this.searchContacts();
      }
    })
    this.contactService.SelectedContactId.subscribe((data:any) => {
      this.selectedContactId = data;
      this.ContactDetailsList = this.ContactDetailsList.map((x:any) => ({
        ...x,
        isSelected: false
      }));
    } )
  }

  getDropdownList() {
    this.getAssignedToList();
    this.getTitleList();
    this.getGenderList();
    this.getNationalityList();
    this.getReligionList();
    this.getNativeLanguageList();
    this.getHobbiesList();
    this.getTypeList();
    this.getCountryCodeList();
    this.getCountryList();
    this.getContactSourcesList();
    this.getContactTypeList();
    this.getAllUser();
  }

  getAllUser() {
    this.dropdownService
    .GetAllUserByCompany(this.userData.companyId)
    .subscribe((data: any | undefined) => {
      this.userList = data;
    });
  }

  getAssignedToList() {
    this.dropdownService.getAssignedToListByCompanyAndRole(this.userData.companyId,this.userData.roleId,this.userData.id).subscribe((data) => {
      this.assignToList = data;
    });
  }

  getTitleList() {
    this.dropdownService.getTitleList().subscribe((data) => {
      this.titleList = data;
    });
  }

  getGenderList() {
    this.dropdownService.getGenderList().subscribe((data) => {
      this.GenderList = data;
    });
  }

  getNationalityList() {
    this.dropdownService.getCountryList().subscribe((data) => {
      this.NationalitiesList = data;
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

  getHobbiesList() {
    this.dropdownService.getHobbiesList().subscribe((data: any) => {
      this.HobbiesList = data.map((i: any) => ({
        id: i?.id,
        text: i?.name,
      }));
    });
  }

  getTypeList() {
    this.dropdownService.getContactDetailTypeList().subscribe((data) => {
      this.MobileTypeList = data;
    });
  }

  getCountryCodeList() {
    this.dropdownService.getCountryCodeList().subscribe((data) => {
      this.CountryCodeList = data;
    });
  }

  getCountryList() {
    this.dropdownService.getCountryList().subscribe((data) => {
      this.CountryList = data;
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

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,    
    private router: Router,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private dropdownService: DropdownService,
    private listingSevice:ListingService,
    private authService: AuthService,
    private modalColumnService: NgbModal
  ) {}

  setSearchForm() {
    this.searchContactForm = new FormGroup({
      filterVip:new FormControl(),
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
  filterUpdatedTo: new FormControl()
    });
  }

  getAllContactDetails() {
     this.IsLoading = true;
    this.contactService.GetAllContactDetails({
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
      filterNativeLanguage: this.searchContactForm.value?.NativeLanguage,
      filterSecondLanguage: this.searchContactForm.value?.filterSecondLanguage,
      filterPersonalMobile: this.searchContactForm.value?.filterPersonalMobile,
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
filterPersonalAddressLine1: this.searchContactForm.value?.filterPersonalAddressLine1,
filterPersonalAddressLine2: this.searchContactForm.value?.filterPersonalAddressLine2,
filterPersonalCity: this.searchContactForm.value?.filterPersonalCity,
filterPersonalZipCode: this.searchContactForm.value?.filterPersonalZipCode,
filterPersonalState: this.searchContactForm.value?.filterPersonalState,
filterPersonalCountry: this.searchContactForm.value?.filterPersonalCountry,
filterWorkPO: this.searchContactForm.value?.filterWorkPO,
filterWorkAddressLine1: this.searchContactForm.value?.filterWorkAddressLine1,
filterWorkAddressLine2: this.searchContactForm.value?.filterWorkAddressLine2,
filterWorkCity: this.searchContactForm.value?.filterWorkCity,
filterWorkZipCode: this.searchContactForm.value?.filterWorkZipCode,
filterWorkState: this.searchContactForm.value?.filterWorkState,
filterWorkCountry: this.searchContactForm.value?.filterWorkCountry,
filterFacebookLink: this.searchContactForm.value?.filterFacebookLink,
filterTwitterLink: this.searchContactForm.value?.filterTwitterLink,
filterLinkedInLink: this.searchContactForm.value?.filterLinkedInLink,
filterSkypeLink: this.searchContactForm.value?.filterSkypeLink,
filterGooglePlusLink: this.searchContactForm.value?.filterGooglePlusLink,
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
    }).subscribe((data:any) => {
       this.IsLoading = false;
       this.isSelectAllContact = false;
       this.exportContactId = [];
        this.ContactDetailsList = data.map((x:any) => ({
          ...x,
          isSelected: false
        }));
        if(this.ContactDetailsList.length > 0) {
        this.totalRecord = this.ContactDetailsList[0].totalCount;
        }
        else {
          this.totalRecord = 0;
        }
        this.cdr.detectChanges();
    })
  }
  
  onAdd() {
    this.data.AddContact=true;
    this.data.EditContact = false;
    this.data.Id = 0;
    this.contactService.OpenAddContact(this.data);
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
  }

  openViewing(id:any) {
    this.data.AddContact=false;
    this.data.EditContact = true;
    this.data.Id = id;
    this.selectedContactId = id;
    var contact = this.ContactDetailsList.find((x:any) => x.id == id);
    contact.isSelected = true;

    var notcontact = this.ContactDetailsList.filter((x:any) => x.id != id);
    notcontact.forEach((x:any) => {
      x.isSelected = false;
    });
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
    this.contactService.OpenAddContact(this.data);

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

  getFax(type:any,data:any) {
    var mobile = data?.filter((x:any) => x.faxType == type);
    if(mobile.length > 0) {
      return mobile.map((x:any) => x.countryCodeString + " " + x.fax).join(", ");
    }
    else {
      return '';
    }
  }

  getPO(type:any,data:any) {
    var address = data?.filter((x:any) => x.addressType == type);
    if(address.length > 0) {
      return  address[0].poBox;
    }
    else {
      return '';
    }
  }

  getAddressLine1(type:any,data:any) {
    var address = data?.filter((x:any) => x.addressType == type);
    if(address.length > 0) {
      return  address[0].addressLine1;
    }
    else {
      return '';
  }
}

  getAddressLine2(type:any,data:any) {
    var address = data?.filter((x:any) => x.addressType == type);
    if(address.length > 0) {
      return  address[0].addressLine2;
    }
    else {
      return '';
  }
}

  getCity(type:any,data:any) {
    var address = data?.filter((x:any) => x.addressType == type);
    if(address.length > 0) {
      return  address[0].city;
    }
    else {
      return '';
    }
  }

  getZipCode(type:any,data:any) {
    var address = data?.filter((x:any) => x.addressType == type);
    if(address.length > 0) {
      return  address[0].zipCode;
    }
    else {
      return '';
    }
  }

  getState(type:any,data:any) {
    var address = data?.filter((x:any) => x.addressType == type);
    if(address.length > 0) {
      return  address[0].state;
    }
    else {
      return '';
    }
  }

  getCountry(type:any,data:any) {
    var address = data?.filter((x:any) => x.addressType == type);
    if(address.length > 0) {
      return  address[0].countryString;
    }
    else {
      return '';
    }
  }

  filterContact() {
    this.pageSize = 25;
    this.pageNumber = 1;
    this.IsLoading = true;
    this.searchContacts();
  }

  searchContacts() {
    this.IsLoading=true;
    this.contactService.GetAllContactDetails({
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
      filterSecondLanguage: this.searchContactForm.value?.filterSecondLanguage,
      filterPersonalMobile: this.searchContactForm.value?.filterPersonalMobile,
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
filterPersonalAddressLine1: this.searchContactForm.value?.filterPersonalAddressLine1,
filterPersonalAddressLine2: this.searchContactForm.value?.filterPersonalAddressLine2,
filterPersonalCity: this.searchContactForm.value?.filterPersonalCity,
filterPersonalZipCode: this.searchContactForm.value?.filterPersonalZipCode,
filterPersonalState: this.searchContactForm.value?.filterPersonalState,
filterPersonalCountry: this.searchContactForm.value?.filterPersonalCountry,
filterWorkPO: this.searchContactForm.value?.filterWorkPO,
filterWorkAddressLine1: this.searchContactForm.value?.filterWorkAddressLine1,
filterWorkAddressLine2: this.searchContactForm.value?.filterWorkAddressLine2,
filterWorkCity: this.searchContactForm.value?.filterWorkCity,
filterWorkZipCode: this.searchContactForm.value?.filterWorkZipCode,
filterWorkState: this.searchContactForm.value?.filterWorkState,
filterWorkCountry: this.searchContactForm.value?.filterWorkCountry,
filterFacebookLink: this.searchContactForm.value?.filterFacebookLink,
filterTwitterLink: this.searchContactForm.value?.filterTwitterLink,
filterLinkedInLink: this.searchContactForm.value?.filterLinkedInLink,
filterSkypeLink: this.searchContactForm.value?.filterSkypeLink,
filterGooglePlusLink: this.searchContactForm.value?.filterGooglePlusLink,
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
    }).subscribe((data:any) => {
      this.IsLoading = false;
      this.isSelectAllContact = false;
      this.exportContactId = [];
      this.ContactDetailsList = data.map((x:any) => ({
        ...x,
        isSelected: false
      }));
        if(this.ContactDetailsList.length > 0) {
          this.totalRecord = this.ContactDetailsList[0].totalCount;
          }
          else {
            this.totalRecord = 0;
          }
        this.cdr.detectChanges();
    })
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
  renderPage(event:any) {
    this.pageNumber = event;
    this.searchContacts();
  }

  MinCharSearch(e:any,data:any) {
    switch(data) {
      case "Ref":
        if (this.searchContactForm.value?.filterRef.length >= 3 || (e.target.value.length == 0 && this.isFilterRef )) {
          this.isFilterRef = false;
          if(this.searchContactForm.value?.filterRef.length >= 3) {
            this.isFilterRef = true;
          }
          
          this.filterContact();
        }
        break;
      case "FirstName":
        if (this.searchContactForm.value?.filterFirstName.length >= 3 || (e.target.value.length == 0 && this.isFilterFirstName )) {
          this.isFilterFirstName = false;
          if(this.searchContactForm.value?.filterFirstName.length >= 3) {
            this.isFilterFirstName = true;
          }
          this.filterContact();
        }
        break;
      case "LastName":
        if (this.searchContactForm.value?.filterLastName.length >= 3 || (e.target.value.length == 0 && this.isFilterLastName )) {
          this.isFilterLastName = false;
          if(this.searchContactForm.value?.filterLastName.length >= 3) {
            this.isFilterLastName = true;
          }
          this.filterContact();
        }
        break;
      case "PersonalMobile":
        if (this.searchContactForm.value?.filterPersonalMobile.length >= 3 || (e.target.value.length == 0 && this.isFilterPersonalMobile )) {
          this.isFilterPersonalMobile = false;
          if(this.searchContactForm.value?.filterPersonalMobile.length >= 3) {
            this.isFilterPersonalMobile = true;
          }
          this.filterContact();
        }
        break;
      case "WorkMobile":
        if (this.searchContactForm.value?.filterWorkMobile.length >= 3 || (e.target.value.length == 0 && this.isFilterWorkMobile )) {
          this.isFilterWorkMobile = false;
          if(this.searchContactForm.value?.filterWorkMobile.length >= 3) {
            this.isFilterWorkMobile = true;
          }
          this.filterContact();
        }
        break;
      case "OtherMobile":
        if (this.searchContactForm.value?.filterOtherMobile.length >= 3 || (e.target.value.length == 0 && this.isFilterOtherMobile )) {
          this.isFilterOtherMobile = false;
          if(this.searchContactForm.value?.filterOtherMobile.length >= 3) {
            this.isFilterOtherMobile = true;
          }
          this.filterContact();
        }
        break;
      case "PersonalPhone":
        if (this.searchContactForm.value?.filterPersonalPhone.length >= 3 || (e.target.value.length == 0 && this.isFilterPersonalPhone )) {
          this.isFilterPersonalPhone = false;
          if(this.searchContactForm.value?.filterPersonalPhone.length >= 3) {
            this.isFilterPersonalPhone = true;
          }
          this.filterContact();
        }
        break;
      case "WorkPhone":
        if (this.searchContactForm.value?.filterWorkPhone.length >= 3 || (e.target.value.length == 0 && this.isFilterWorkPhone )) {
          this.isFilterWorkPhone = false;
          if(this.searchContactForm.value?.filterWorkPhone.length >= 3) {
            this.isFilterWorkPhone = true;
          }
          this.filterContact();
        }
        break;
      case "OtherPhone":
        if (this.searchContactForm.value?.filterOtherPhone.length >= 3 || (e.target.value.length == 0 && this.isFilterOtherPhone )) {
          this.isFilterOtherPhone = false;
          if(this.searchContactForm.value?.filterOtherPhone.length >= 3) {
            this.isFilterOtherPhone = true;
          }
          this.filterContact();
        }
        break;
      case "PersonalEmail":
        if (this.searchContactForm.value?.filterPersonalEmail.length >= 3 || (e.target.value.length == 0 && this.isFilterPersonalEmail )) {
          this.isFilterPersonalEmail = false;
          if(this.searchContactForm.value?.filterPersonalEmail.length >= 3) {
            this.isFilterPersonalEmail = true;
          }
          this.filterContact();
        }
        break;
      case "WorkEmail":
        if (this.searchContactForm.value?.filterWorkEmail.length >= 3 || (e.target.value.length == 0 && this.isFilterWorkEmail )) {
          this.isFilterWorkEmail = false;
          if(this.searchContactForm.value?.filterWorkEmail.length >= 3) {
            this.isFilterWorkEmail = true;
          }
          this.filterContact();
        }
        break;
      case "OtherEmail":
        if (this.searchContactForm.value?.filterOtherEmail.length >= 3 || (e.target.value.length == 0 && this.isFilterOtherEmail )) {
          this.isFilterOtherEmail = false;
          if(this.searchContactForm.value?.filterOtherEmail.length >= 3) {
            this.isFilterOtherEmail = true;
          }
          this.filterContact();
        }
        break;
      case "PersonalFax":
        if (this.searchContactForm.value?.filterPersonalFax.length >= 3 || (e.target.value.length == 0 && this.isFilterPersonalFax )) {
          this.isFilterPersonalFax = false;
          if(this.searchContactForm.value?.filterPersonalFax.length >= 3) {
            this.isFilterPersonalFax = true;
          }
          this.filterContact();
        }
        break;
      case "WorkFax":
        if (this.searchContactForm.value?.filterWorkFax.length >= 3 || (e.target.value.length == 0 && this.isFilterWorkFax )) {
          this.isFilterWorkFax = false;
          if(this.searchContactForm.value?.filterWorkFax.length >= 3) {
            this.isFilterWorkFax = true;
          }
          this.filterContact();
        }
        break;
      case "OtherFax":
        if (this.searchContactForm.value?.filterOtherFax.length >= 3 || (e.target.value.length == 0 && this.isFilterOtherFax )) {
          this.isFilterOtherFax = false;
          if(this.searchContactForm.value?.filterOtherFax.length >= 3) {
            this.isFilterOtherFax = true;
          }
          this.filterContact();
        }
        break;
      case "PersonalPO":
        if (this.searchContactForm.value?.filterPersonalPO.length >= 3 || (e.target.value.length == 0 && this.isFilterPersonalPO )) {
          this.isFilterPersonalPO = false;
          if(this.searchContactForm.value?.filterPersonalPO.length >= 3) {
            this.isFilterPersonalPO = true;
          }
          this.filterContact();
        }
        break;
      case "PersonalAddressLine1":
        if (this.searchContactForm.value?.filterPersonalAddressLine1.length >= 3 || (e.target.value.length == 0 && this.isFilterRef && this.isFilterPersonalAddressLine1 )) {
          this.isFilterPersonalAddressLine1 = false;
          if(this.searchContactForm.value?.filterPersonalAddressLine1.length >= 3) {
            this.isFilterPersonalAddressLine1 = true;
          }
          this.filterContact();
        }
        break;
      case "PersonalAddressLine2":
        if (this.searchContactForm.value?.filterPersonalAddressLine2.length >= 3 || (e.target.value.length == 0 && this.isFilterPersonalAddressLine2 )) {
          this.isFilterPersonalAddressLine2 = false;
          if(this.searchContactForm.value?.filterPersonalAddressLine2.length >= 3) {
            this.isFilterPersonalAddressLine2 = true;
          }
          this.filterContact();
        }
        break;
      case "PersonalCity":
        if (this.searchContactForm.value?.filterPersonalCity.length >= 3 || (e.target.value.length == 0 && this.isFilterPersonalCity )) {
          this.isFilterPersonalCity = false;
          if(this.searchContactForm.value?.filterPersonalCity.length >= 3) {
            this.isFilterPersonalCity = true;
          }
          this.filterContact();
        }
        break;
      case "PersonalZipCode":
        if (this.searchContactForm.value?.filterPersonalCity.length >= 3 || (e.target.value.length == 0 && this.isFilterPersonalZip )) {
          this.isFilterPersonalZip = false;
          if(this.searchContactForm.value?.filterPersonalCity.length >= 3) {
            this.isFilterPersonalZip = true;
          }
          this.filterContact();
        }
        break;
      case "PersonalState":
        if (this.searchContactForm.value?.filterPersonalState.length >= 3 || (e.target.value.length == 0 && this.isFilterPersonalState )) {
          this.isFilterPersonalState = false;
          if(this.searchContactForm.value?.filterPersonalState.length >= 3) {
            this.isFilterPersonalState = true;
          }
          this.filterContact();
        }
        break;
      case "WorkPO":
        if (this.searchContactForm.value?.filterWorkPO.length >= 3 || (e.target.value.length == 0 && this.isFilterWorkPO )) {
          this.isFilterWorkPO = false;
          if(this.searchContactForm.value?.filterWorkPO.length >= 3) {
            this.isFilterWorkPO = true;
          }
          this.filterContact();
        }
        break;
      case "WorkAddressLine1":
        if (this.searchContactForm.value?.filterWorkAddressLine1.length >= 3 || (e.target.value.length == 0 && this.isFilterWorkAddressLine1 )) {
          this.isFilterWorkAddressLine1 = false;
          if(this.searchContactForm.value?.filterWorkAddressLine1.length >= 3) {
            this.isFilterWorkAddressLine1 = true;
          }
          this.filterContact();
        }
        break;
      case "WorkAddressLine2":
        if (this.searchContactForm.value?.filterWorkAddressLine2.length >= 3 || (e.target.value.length == 0 && this.isFilterWorkAddressLine2 )) {
          this.isFilterWorkAddressLine2 = false;
          if(this.searchContactForm.value?.filterWorkAddressLine2.length >= 3) {
            this.isFilterWorkAddressLine2 = true;
          }
          this.filterContact();
        }
        break;
      case "WorkCity":
        if (this.searchContactForm.value?.filterWorkCity.length >= 3 || (e.target.value.length == 0 && this.isFilterWorkCity )) {
          this.isFilterWorkCity = false;
          if(this.searchContactForm.value?.filterWorkCity.length >= 3) {
            this.isFilterWorkCity = true;
          }
          this.filterContact();
        }
        break;
      case "WorkZipCode":
        if (this.searchContactForm.value?.filterWorkZipCode.length >= 3 || (e.target.value.length == 0 && this.isFilterWorkZip )) {
          this.isFilterWorkZip = false;
          if(this.searchContactForm.value?.filterWorkZipCode.length >= 3) {
            this.isFilterWorkZip = true;
          }
          this.filterContact();
        }
        break;
      case "WorkState":
        if (this.searchContactForm.value?.filterWorkState.length >= 3 || (e.target.value.length == 0 && this.isFilterWorkState )) {
          this.isFilterWorkZip = false;
          if(this.searchContactForm.value?.filterWorkState.length >= 3) {
            this.isFilterWorkState = true;
          }
          this.filterContact();
        }
        break;
      case "FacebookLink":
        if (this.searchContactForm.value?.filterFacebookLink.length >= 3 || (e.target.value.length == 0 && this.isFilterFacebookLink )) {
          this.isFilterFacebookLink = false;
          if(this.searchContactForm.value?.filterFacebookLink.length >= 3) {
            this.isFilterFacebookLink = true;
          }
          this.filterContact();
        }
        break;
      case "TwitterLink":
        if (this.searchContactForm.value?.filterTwitterLink.length >= 3 || (e.target.value.length == 0 && this.isFilterTwitterLink )) {
          this.isFilterTwitterLink = false;
          if(this.searchContactForm.value?.filterTwitterLink.length >= 3) {
            this.isFilterTwitterLink = true;
          }
          this.filterContact();
        }
        break;
      case "LinkedInLink":
        if (this.searchContactForm.value?.filterLinkedInLink.length >= 3 || (e.target.value.length == 0 && this.isFilterTwitterLink )) {
          this.isFilterTwitterLink = false;
          if(this.searchContactForm.value?.filterLinkedInLink.length >= 3) {
            this.isFilterTwitterLink = true;
          }
          this.filterContact();
        }
        break;
      case "SkypeLink":
        if (this.searchContactForm.value?.filterSkypeLink.length >= 3 || (e.target.value.length == 0 && this.isFilterSkypeLink )) {
          this.isFilterSkypeLink = false;
          if(this.searchContactForm.value?.filterSkypeLink.length >= 3) {
            this.isFilterSkypeLink = true;
          }
          this.filterContact();
        }
        break;
      case "GooglePlusLink":
        if (this.searchContactForm.value?.filterGooglePlusLink.length >= 3 || (e.target.value.length == 0 && this.isFilterGooglePlusLink )) {
          this.isFilterGooglePlusLink = false;
          if(this.searchContactForm.value?.filterGooglePlusLink.length >= 3) {
            this.isFilterGooglePlusLink = true;
          }
          this.filterContact();
        }
        break;
      case "InstagramLink":
        if (this.searchContactForm.value?.filterInstagramLink.length >= 3 || (e.target.value.length == 0 && this.isFilterInstagramLink )) {
          this.isFilterInstagramLink = false;
          if(this.searchContactForm.value?.filterInstagramLink.length >= 3) {
            this.isFilterInstagramLink = true;
          }
          this.filterContact();
        }
        break;
      case "WeChatLink":
        if (this.searchContactForm.value?.filterWeChatLink.length >= 3 || (e.target.value.length == 0 && this.isFilterWeChatLink )) {
          this.isFilterWeChatLink = false;
          if(this.searchContactForm.value?.filterWeChatLink.length >= 3) {
            this.isFilterWeChatLink = true;
          }
          this.filterContact();
        }
        break;
      case "SocialWebsite":
        if (this.searchContactForm.value?.filterSocialWebsite.length >= 3 || (e.target.value.length == 0 && this.isFilterSocialWebsite )) {
          this.isFilterSocialWebsite = false;
          if(this.searchContactForm.value?.filterSocialWebsite.length >= 3) {
            this.isFilterSocialWebsite = true;
          }
          this.filterContact();
        }
        break;
      case "WebsiteLink":
        if (this.searchContactForm.value?.filterWebsiteLink.length >= 3 || (e.target.value.length == 0 && this.isFilterWebsiteLink )) {
          this.isFilterWebsiteLink = false;
          if(this.searchContactForm.value?.filterWebsiteLink.length >= 3) {
            this.isFilterWebsiteLink = true;
          }
          this.filterContact();
        }
        break;
      case "CompanyName":
        if (this.searchContactForm.value?.filterCompanyName.length >= 3 || (e.target.value.length == 0 && this.isFilterCompanyName )) {
          this.isFilterCompanyName = false;
          if(this.searchContactForm.value?.filterCompanyName.length >= 3) {
            this.isFilterCompanyName = true;
          }
          this.filterContact();
        }
        break;
      case "Designation":
        if (this.searchContactForm.value?.filterFirstName.length >= 3 || (e.target.value.length == 0 && this.isFilterDesignation )) {
          this.isFilterDesignation = false;
          if(this.searchContactForm.value?.filterFirstName.length >= 3) {
            this.isFilterDesignation = true;
          }
          this.filterContact();
        }
        break;
      case "Website":
        if (this.searchContactForm.value?.filterFirstName.length >= 3 || (e.target.value.length == 0 && this.isFilterWebsite )) {
          this.isFilterWebsite = false
          if(this.searchContactForm.value?.filterFirstName.length >= 3) {
            this.isFilterWebsite = true;
          }
          this.filterContact();
        }
        break;
    }
  }

  SelectContact(event:any,id:any) {
    if(event.target.checked) {
      this.exportContactId.push(id);
      var contactDetailList = this.ContactDetailsList.length;
      var selectedDetailList = this.ContactDetailsList.filter((x:any) => x.isSelected == true).length;
      if(contactDetailList == selectedDetailList) {
        this.isSelectAllContact = true;
      }
      else {
        this.isSelectAllContact = false;
      }
    }
    else {
      const index:number = this.exportContactId.indexOf(id);
      if(index !== -1) {
        this.exportContactId.splice(index,1);
      }
      var contactDetailList = this.ContactDetailsList.length;
      var selectedDetailList = this.ContactDetailsList.filter((x:any) => x.isSelected == true).length;
      if(contactDetailList == selectedDetailList) {
        this.isSelectAllContact = true;
      }
      else {
        this.isSelectAllContact = false;
      }
    }
    this.cdr.detectChanges();
  }

  SelectAllContact(event:any) {
    if(event.target.checked) {
      this.isSelectAllContact = true;
      var contacts = this.ContactDetailsList;
      contacts.forEach((x:any) => {
      x.isSelected = true;
    });
      this.exportContactId = (this.ContactDetailsList.filter((x:any) => x.isSelected == true).map((z:any) => z.id));
    }
    else {
      this.isSelectAllContact = false;
      var contacts = this.ContactDetailsList;
      contacts.forEach((x:any) => {
      x.isSelected = false;
    });
    this.exportContactId = [];
    }
    this.cdr.detectChanges();
  }

  exportContact() {
    this.IsLoading = true;
    this.contactService.DownloadExcel({
      contactIds : this.exportContactId,
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
      a.download = 'Contact.xlsx';
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
    this.contactService.saveColumnOrder({
      userId: this.userData.id,
      tableName: 'Contacts',
      columnDetails: this.columnOrder
    }).subscribe((data:any) => {
      this.IsLoading = false;
      this.cdr.detectChanges();
      this.closeColumnSettings();
    })
  }

  getColumnOrder(){
      this.IsLoading = true;
      this.contactService
        .getColumnOrder(this.userData.id,'Contacts')
        .subscribe((data: any | undefined) => {
          if(data != null && data.length > 0) {
          this.columnOrder = data;
          }
          else {
            this.columnOrder = this.DeafultcolumnOrder;
          }
          this.getAllContactDetails();
          this.IsLoading = false;
        });

      }

}
