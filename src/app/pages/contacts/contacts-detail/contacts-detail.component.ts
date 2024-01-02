import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth';
import { ContactService } from 'src/app/modules/auth/services/contact.service';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.scss'],
})
export class ContactsDetailComponent implements OnInit {
  basic: boolean = false;
  IsLoading:boolean = false;
  isSaveNotes:boolean = false;
  contactNotes:any = [];
  id: any = '';
  @ViewChild('container', { static: false }) container!: ElementRef;
  iscontactdetails: boolean = true;
  isSocialMedia: boolean = true;
  isAdditionalInfo: boolean = true;
  basicDetailForm: FormGroup;
  ContactNotesForm: FormGroup;
  assignToList: any = [];
  titleList: any = [];
  GenderList: any = [];
  Nationalities!: FormArray;
  NationalitiesList: any = [];
  ReligionList: any = [];
  Languages!: FormArray;
  LanguagesList: any = [];
  isDuplicateMobile: boolean = false;
  isDuplicateEmail: boolean = false;
  isDuplicatePhone: boolean = false;
  DuplicateMobileId:any = null;
  DuplicateEmailId:any = null;
  DuplicatePhoneId:any = null;
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
  
  baseUrlImage = environment.imgUrl;
  HobbiesList: any = [
    {
      id: 1,
      checked: false,
      text: 'Astrology',
    },
    {
      id: 2,
      checked: false,
      text: 'Astronomy',
    },
    {
      id: 3,
      checked: false,
      text: 'Badminton',
    },
  ];
  Hobbies:any=[];
  selectedTab: string = 'tab1';
  contactForm: FormGroup;
  SocialMediaForm: FormGroup;
  AdditionalInfoForm: FormGroup;
  ContactSourceList: any = [];
  ContactTypeList: any = [];
  MobileTypeList: any = [];
  CountryCodeList: any = [];
  CountryList: any = [];
  isAdd:boolean = false
  isEdit:boolean = false;
  isView:boolean = false;
  imagePath:any;

  Mobiles: FormArray;
  Phones: FormArray;
  // Faxes: FormArray;
  Emails: FormArray;
  Addresses: FormArray;
  contactDetails:any=null;
  formData:FormData;
  imgFile:any = null;
  @ViewChild('fileInput') fileInput: any;
  editContactId=null;;
  isAddressDetails:boolean=false
  addressForm:FormGroup;
  isSave:boolean = false;
  userData:any
  isEditContactPermission:boolean=false;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dropdownService: DropdownService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    var uData = this.authService.userValue;
  if(uData != null){
  this.userData= JSON.parse(uData);
  this.isEditContactPermission = this.userData.permissionAccess.filter((x:any) => x.permissionId == 16).length > 0;
  }
    this.getDropdownList();

    this.contactService.isOpenAddContact.pipe().subscribe((data: any) => {
      if (data?.AddContact) {
        this.isSave = false;

        //Changes for on Load Contact details
        this.contactDetails = null;
        this.contactNotes = [];
        this.editContactId = null;
        this.selectTab('tab1');
        this.isDuplicateEmail = false;
        this.isDuplicateMobile = false;
        this.DuplicateMobileId = null;
        this.DuplicateEmailId = null;
        this.isDuplicatePhone = false;
        this.DuplicatePhoneId = null;
        this.cdr.detectChanges();
        
        //this.fileInput.nativeElement.value = '';
        this.Hobbies = [];
        this.imagePath=null
        this.isAdd = true;
        this.isEdit = false;
        this.isView = false;
        this.basic = true;
        this.isAdditionalInfo = true;
        this.isSocialMedia = true;
        this.iscontactdetails = true;
        this.isAddressDetails = true;
        this.scrollToElement('sec1');
        this.basicDetailForm.reset();
        this.contactForm.reset();
        this.addressForm.reset();
        this.SocialMediaForm.reset();
        this.AdditionalInfoForm.reset();
        this.basicDetailForm.markAsUntouched();
        this.basicDetailForm.markAsPristine();
        this.addressForm.markAsUntouched();
        this.addressForm.markAsPristine();
        this.contactForm.markAsUntouched();
        this.contactForm.markAsPristine();
        this.SocialMediaForm.markAsUntouched();
        this.SocialMediaForm.markAsPristine();
        this.AdditionalInfoForm.markAsUntouched();
        this.AdditionalInfoForm.markAsPristine();
        this.contactForm.enable();
    this.basicDetailForm.enable();
    this.addressForm.enable();
    this.SocialMediaForm.enable();
    this.AdditionalInfoForm.enable();
    this.setInitialBasicDetailForm();
    
    
    this.setInitialContactForm();
    this.setInitialAddressForm();
    this.addMobile();
    this.addPhone();
    // this.addFax();
    this.addEmail();
    this.addAddress();
    this.setInitailSocialMediaForm();
    this.setInitalAdditionalForm();
    this.Nationalities = this.AdditionalInfoForm.get('Nationalities') as FormArray;
    this.Nationalities.push(this.createNationality({}));
    this.Languages = this.AdditionalInfoForm.get('Languages') as FormArray;
    this.Languages.push(this.createLanguage({}));
    // this.basicDetailForm.controls['Ref'].disable();
    // this.AdditionalInfoForm.controls['CreatedBy'].disable();
      }
      if(data?.EditContact && data?.Id != undefined && data?.Id != null) {
        this.editContactId= data?.Id
        this.isSave = false;
        this.selectTab('tab1');
        this.isDuplicateEmail = false;
        this.isDuplicateMobile = false;
        this.DuplicateMobileId = null;
        this.DuplicateEmailId = null;
        this.isDuplicatePhone = false;
        this.DuplicatePhoneId = null;
        // this.fileInput.nativeElement.value = '';
        this.imagePath = null;
        this.imgFile = null;
        this.isView = true;
        this.isAdd = false;
        this.isEdit = false;
        this.basic = true;
        this.isAdditionalInfo = true;
        this.isSocialMedia = true;
        this.iscontactdetails = true;
        this.isAddressDetails = true;

        //Changes for on Load Contact details
        this.contactDetails = null;
        this.cdr.detectChanges();
        this.basicDetailForm.reset();
        this.contactForm.reset();
        this.addressForm.reset();
        this.SocialMediaForm.reset();
        this.AdditionalInfoForm.reset();

        this.IsLoading = true;
        this.cdr.detectChanges();
        this.scrollToElement('sec1');
        this.contactService.GetContact(this.editContactId,this.userData.companyId).subscribe((data:any) => {
          this.setViewForm(data);
          this.contactDetails = data;
          this.getContactNotesByContactId(this.editContactId);
          this.cdr.detectChanges();
          this.IsLoading = false;
        })
      }
    });
    this.setInitialBasicDetailForm();
    this.setInitalContactNotesForm();
   
    this.setInitialContactForm();
    this.setInitialAddressForm();
    this.addMobile();
    this.addPhone();
    // this.addFax();
    this.addEmail();
    this.addAddress();
    this.setInitailSocialMediaForm();
    this.setInitalAdditionalForm();
    this.Nationalities = this.AdditionalInfoForm.get('Nationalities') as FormArray;
    this.Nationalities.push(this.createNationality({}));
    this.Languages = this.AdditionalInfoForm.get('Languages') as FormArray;
    this.Languages.push(this.createLanguage({}));
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
  }

  getAssignedToList() {
    this.dropdownService.getAssignedToListByCompanyAndRole(this.userData.companyId,this.userData.roleId,this.userData.id).subscribe((data:any) => {
      this.assignToList = data?.map((x:any) => ({
        ...x,
        profileImage: x.profileImage != null && x.profileImage != '' ? environment.imgUrl + x.profileImage : null
      }));
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
    this.dropdownService.getCountryCodeList().subscribe((data:any) => {
      this.CountryCodeList = data.map((x:any) => ({
        id: x.id,
        name: x.name + '(' + x.code.trim() + ')',
        code:  x.code.trim()
      }));
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

  setInitialBasicDetailForm() {
    this.basicDetailForm = new FormGroup({
      //Vip: new FormControl(false),
      AssignedTo: new FormControl(null,Validators.required),
      Ref: new FormControl({ value: '', disabled: true }),
      Title: new FormControl(),
      FirstName: new FormControl(null,Validators.required),
      LastName: new FormControl(null),
      //Gender: new FormControl(),
      //DateofBirth: new FormControl(),
      //Nationalities: new FormArray([]),
      //Religion: new FormControl(),
      //Languages: new FormArray([]),
      //Hobbies: new FormControl(),
    });
  }

  setInitalContactNotesForm() {
    this.ContactNotesForm = new FormGroup({ 
      Notes: new FormControl(null,Validators.required)
    })
  }

  setInitialContactForm() {
    this.contactForm = new FormGroup({
      Mobiles: new FormArray([]),
      Phones: new FormArray([]),
      // Faxes: new FormArray([]),
      //Addresses: new FormArray([]),
      Emails: new FormArray([]),
    }, { validators: this.customFormValidator });
  }

  customFormValidator(control: AbstractControl): ValidationErrors | null {
    if (control instanceof FormGroup) {
      // Check if any of the FormArrays have at least one value
      const mobilesArray = control.get('Mobiles') as FormArray;
      const phonesArray = control.get('Phones') as FormArray;
      const emailsArray = control.get('Emails') as FormArray;

      const mobilesNotEmpty = mobilesArray.controls.some(mobileControl => {
        const countryCode = mobileControl.get('CountryCode')?.value;
        const mobile = mobileControl.get('Mobile')?.value;
        const mobileType = mobileControl.get('MobileType')?.value;

        if(countryCode == null || mobile == null || mobileType == null || countryCode == '' || mobile == '' || mobileType == '')
        {
          return false;
        }

        return true;
      });
      const phonesNotEmpty = phonesArray.controls.some(mobileControl => {
        const countryCode = mobileControl.get('CountryCode')?.value;
        const phone = mobileControl.get('Phone')?.value;
        const phoneType = mobileControl.get('PhoneType')?.value;

        if(countryCode == null || phone == null || phoneType == null || phone == '' || phoneType == '' || countryCode == '')
        {
          return false;
        }

        return true;
      });
      const emailsNotEmpty = emailsArray.controls.some(mobileControl => {
        const email = mobileControl.get('Email')?.value;
        const emailType = mobileControl.get('EmailType')?.value;

        if(mobileControl.status == 'INVALID') {
          return false;
        }

        if(email == null || emailType == null || email == '' || emailType == '')
        {
          return false;
        }

        return true;
      });

      // If at least one of the arrays has a value, mark the form as valid
      if (mobilesNotEmpty || phonesNotEmpty || emailsNotEmpty) {
        return null;
      } else {
        // All arrays are empty, mark the form as invalid with a custom error key
        return { 'noData': true };
      }
    }
    return null; // Return null for other types of controls
  }

  setInitialAddressForm() {
    this.addressForm = new FormGroup({
      Addresses: new FormArray([]),
    })
  }

  setInitailSocialMediaForm() {
    this.SocialMediaForm = new FormGroup({
      FacebookLink: new FormControl(),
      TwitterLink: new FormControl(),
      LinkedInLink: new FormControl(),
      SkypeLink: new FormControl(),
      GooglePlusLink: new FormControl(),
      InstagramLink: new FormControl(),
      WeChatLink: new FormControl(),
      // Website: new FormControl(),
      WebsiteLink: new FormControl(),
    });
  }

  setInitalAdditionalForm() {
    this.AdditionalInfoForm = new FormGroup({
      Vip: new FormControl(false),
      Gender: new FormControl(),
      DateofBirth: new FormControl(),
      ContactSource: new FormControl(),
      CompanyName: new FormControl(),
      Designation: new FormControl(),
      Website: new FormControl(),
      ContactType: new FormControl(),
      CreatedBy: new FormControl({ value: '', disabled: true }),
      Nationalities: new FormArray([]),
      Religion: new FormControl(),
      Languages: new FormArray([]),
    });
  }

  get firstName() {
    return this.basicDetailForm.get('FirstName')!;
  }

  get lastName() {
    return this.basicDetailForm.get('LastName')!;
  }

  get assignedto() {
    return this.basicDetailForm.get('AssignedTo')!;
  }

  createLanguage(value: any): FormGroup {
    return this.formBuilder.group({
      id: [value?.id != null && value?.id != undefined ? value.id : 0],
      Language: [value?.language],
    });
  }

  createNationality(value: any): FormGroup {
    return this.formBuilder.group({
      id: [value?.id != null && value?.id != undefined ? value.id : 0],
      Nationality: [value?.nationality],
    });
  }

  createMobile(value: any): FormGroup {
    return this.formBuilder.group({
      id: [value?.id != null && value?.id != undefined ? value.id : 0],
      MobileType: [value?.mobileType],
      CountryCode: [value?.countryCode],
      Mobile: [value?.mobile],
    });
  }

  createPhone(value: any): FormGroup {
    return this.formBuilder.group({
      id: [value?.id != null && value?.id != undefined ? value.id : 0],
      PhoneType: [value?.phoneType],
      CountryCode: [value?.countryCode],
      Phone: [value?.phone],
    });
  }

  // createFax(value: any): FormGroup {
  //   return this.formBuilder.group({
  //     id: [value?.id != null && value?.id != undefined ? value.id : 0],
  //     FaxType: [value?.faxType],
  //     CountryCode: [value?.countryCode],
  //     Fax: [value?.fax],
  //   });
  // }

  createEmail(value: any): FormGroup {
    return this.formBuilder.group({
      id: [value?.id != null && value?.id != undefined ? value.id : 0],
      EmailType: [value?.emailType],
      Email: [value?.email,[Validators.email]],
    });
  }

  createAddress(value: any): FormGroup {
    return this.formBuilder.group({
      id: [value?.id != null && value?.id != undefined ? value.id : 0],
      AddressType: [value?.addressType],
      POBox: [value?.poBox],
      AddressLine1: [value?.addressLine1],
      AddressLine2: [value?.addressLine2],
      City: [value?.city],
      ZipCode: [value?.zipCode],
      State: [value?.state],
      Country: [value?.country],
    });
  }

  addNationality() {
    this.Nationalities = this.AdditionalInfoForm.get('Nationalities') as FormArray;
    this.Nationalities.push(this.createNationality({}));
  }

  addLanguage() {
    this.Languages = this.AdditionalInfoForm.get('Languages') as FormArray;
    this.Languages.push(this.createLanguage({}));
  }

  addMobile() {
    this.Mobiles = this.contactForm.get('Mobiles') as FormArray;
    this.Mobiles.push(this.createMobile({}));
    var items: any = this.contactForm.get('Mobiles') as FormArray;
    if (items.controls.length == 1) {
      // items.controls[0].controls['CountryCode'].setValidators(
      //   Validators.required
      // );
      // items.controls[0].controls['CountryCode'].updateValueAndValidity();
      
      // items.controls[0].controls['Mobile'].setValidators(Validators.required);
      // items.controls[0].controls['Mobile'].updateValueAndValidity();
    
      // // Patch the value of MobileType after setting the validators
      items.controls[0].controls['MobileType'].patchValue(1);
    
      // // Set validators for MobileType
      // items.controls[0].controls['MobileType'].setValidators(
      //   Validators.required
      // );
      // items.controls[0].controls['MobileType'].updateValueAndValidity();
    }
    if (items.controls.length == 3) {
      // this.changeMobileType(1);
    }
  }

  addPhone() {
    this.Phones = this.contactForm.get('Phones') as FormArray;
    this.Phones.push(this.createPhone({}));
    var items: any = this.contactForm.get('Phones') as FormArray;
    if(items.controls.length == 1) {
      items.controls[0].controls['PhoneType'].setValue(1);
    }
    if (items.controls.length == 3) {
      // this.changePhoneType(1);
    }
  }

  // addFax() {
  //   this.Faxes = this.contactForm.get('Faxes') as FormArray;
  //   this.Faxes.push(this.createFax({}));
  //   var items: any = this.contactForm.get('Faxes') as FormArray;
  //   if (items.controls.length == 3) {
  //     // this.changeFaxType(1);
  //   }
  // }

  addAddress() {
    this.Addresses = this.addressForm.get('Addresses') as FormArray;
    this.Addresses.push(this.createAddress({}));
    var items: any = this.addressForm.get('Addresses') as FormArray;
    if (items.controls.length == 2) {
      var currentValue = items.controls[0].controls['AddressType'].value;
      if (items.controls.length == 2) {
        if (currentValue == 1) {
          items.controls[1].controls['AddressType'].setValue(2);
        }
        if (currentValue == 2) {
          items.controls[1].controls['MobileType'].setValue(1);
        }
      }
    }
  }

  addEmail() {
    this.Emails = this.contactForm.get('Emails') as FormArray;
    this.Emails.push(this.createEmail({}));
    var items: any = this.contactForm.get('Emails') as FormArray;
    if (items.controls.length == 1) {
      // items.controls[0].controls['EmailType'].setValidators(
      //   Validators.required
      // );
      // items.controls[0].controls['Email'].setValidators([Validators.required,Validators.email]);
      // items.controls[0].controls['EmailType'].updateValueAndValidity();
      // items.controls[0].controls['Email'].updateValueAndValidity();
      items.controls[0].controls['EmailType'].setValue(1);
    }
    var items: any = this.contactForm.get('Emails') as FormArray;
    if (items.controls.length == 3) {
      //this.changeEmailType(1);
    }
  }

  removeNationality(index: any) {
    this.NationslityFormGroups.removeAt(index);
  }

  removeLanguage(index: any) {
    this.LanguageFormGroups.removeAt(index);
  }

  removeMobile(index: any) {
    this.MobileFormGroups.removeAt(index);
  }

  removePhone(index: any) {
    this.PhoneFormGroups.removeAt(index);
  }

  // removeFax(index: any) {
  //   this.FaxFormGroups.removeAt(index);
  // }

  removeAddress(index: any) {
    this.AddressFormGroups.removeAt(index);
  }

  removeEmail(index: any) {
    this.EmailFormGroups.removeAt(index);
  }

  get NationslityFormGroups() {
    return this.AdditionalInfoForm.get('Nationalities') as FormArray;
  }

  get LanguageFormGroups() {
    return this.AdditionalInfoForm.get('Languages') as FormArray;
  }

  get MobileFormGroups() {
    return this.contactForm.get('Mobiles') as FormArray;
  }

  get PhoneFormGroups() {
    return this.contactForm.get('Phones') as FormArray;
  }

  // get FaxFormGroups() {
  //   return this.contactForm.get('Faxes') as FormArray;
  // }

  get AddressFormGroups() {
    return this.addressForm.get('Addresses') as FormArray;
  }

  get EmailFormGroups() {
    return this.contactForm.get('Emails') as FormArray;
  }

  public scrollToElement = (elementId: string) => {
    const overlayElement = this.container?.nativeElement;
    const targetElement = document.getElementById(elementId);
    const offset = 105.73; // Specify your desired offset value

    if (targetElement) {
      // overlayElement.scrollTop = targetElement.offsetTop - offset;
      if (targetElement.id === 'sec1') {
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
  changeMobileType(i: any) {
    var items: any = this.contactForm.get('Mobiles') as FormArray;
    if (i == 1) {
      var currentValue = items.controls[i].controls['MobileType'].value;
      if (items.controls.length == 3) {
        if (currentValue == 2) {
          items.controls[2].controls['MobileType'].setValue(3);
        }
        if (currentValue == 3) {
          items.controls[2].controls['MobileType'].setValue(2);
        }
      }
    }
    if (i == 2) {
      var currentValue = items.controls[0].controls['MobileType'];
      if (items.controls.length == 3) {
        if (currentValue == 2) {
          items.controls[1].controls['MobileType'].setValue('3');
        }
        if (currentValue == 3) {
          items.controls[1].controls['MobileType'].setValue('2');
        }
      }
    }
  }

  changeAddressType(i: any) {
    var items: any = this.addressForm.get('Addresses') as FormArray;
    if (i == 0) {
      var currentValue = items.controls[i].controls['AddressType'].value;
      if (items.controls.length == 2) {
        if (currentValue == 1) {
          items.controls[1].controls['AddressType'].setValue(2);
        }
        if (currentValue == 2) {
          items.controls[1].controls['AddressType'].setValue(1);
        }
      }
    }
    if (i == 1) {
      var currentValue = items.controls[0].controls['AddressType'].value;
      if (items.controls.length == 2) {
        if (currentValue == 1) {
          items.controls[0].controls['AddressType'].setValue(2);
        }
        if (currentValue == 2) {
          items.controls[0].controls['MobileType'].setValue(1);
        }
      }
    }
  }

  changePhoneType(i: any) {
    var items: any = this.contactForm.get('Phones') as FormArray;
    if (i == 1) {
      var currentValue = items.controls[i].controls['PhoneType'].value;
      if (items.controls.length == 3) {
        if (currentValue == 2) {
          items.controls[2].controls['PhoneType'].setValue(3);
        }
        if (currentValue == 3) {
          items.controls[2].controls['PhoneType'].setValue(2);
        }
      }
    }
    if (i == 2) {
      var currentValue = items.controls[0].controls['PhoneType'];
      if (items.controls.length == 3) {
        if (currentValue == 2) {
          items.controls[1].controls['PhoneType'].setValue('3');
        }
        if (currentValue == 3) {
          items.controls[1].controls['PhoneType'].setValue('2');
        }
      }
    }
  }

  // changeFaxType(i: any) {
  //   var items: any = this.contactForm.get('Faxes') as FormArray;
  //   if (i == 1) {
  //     var currentValue = items.controls[i].controls['FaxType'].value;
  //     if (items.controls.length == 3) {
  //       if (currentValue == 2) {
  //         items.controls[2].controls['FaxType'].setValue(3);
  //       }
  //       if (currentValue == 3) {
  //         items.controls[2].controls['FaxType'].setValue(2);
  //       }
  //     }
  //   }
  //   if (i == 2) {
  //     var currentValue = items.controls[0].controls['FaxType'];
  //     if (items.controls.length == 3) {
  //       if (currentValue == 2) {
  //         items.controls[1].controls['FaxType'].setValue('3');
  //       }
  //       if (currentValue == 3) {
  //         items.controls[1].controls['FaxType'].setValue('2');
  //       }
  //     }
  //   }
  // }

  changeEmailType(i: any) {
    var items: any = this.contactForm.get('Emails') as FormArray;
    if (i == 1) {
      var currentValue = items.controls[i].controls['EmailType'].value;
      if (items.controls.length == 3) {
        if (currentValue == 2) {
          items.controls[2].controls['EmailType'].setValue(3);
        }
        if (currentValue == 3) {
          items.controls[2].controls['EmailType'].setValue(2);
        }
      }
    }
    if (i == 2) {
      var currentValue = items.controls[0].controls['EmailType'];
      if (items.controls.length == 3) {
        if (currentValue == 2) {
          items.controls[1].controls['EmailType'].setValue('3');
        }
        if (currentValue == 3) {
          items.controls[1].controls['EmailType'].setValue('2');
        }
      }
    }
  }

  getErrorMessage(control: any) {
    return 'This field is required';
  }

  async onSubmit() {
    this.isSave = true;
    var basicDetails = this.basicDetailForm;
    var contactDetails = this.contactForm;
    var SocialMedia = this.SocialMediaForm;
    var additionalInfo = this.AdditionalInfoForm;
    var addressDetails = this.addressForm;

    if (!this.basicDetailForm.valid) {
      const formControls = this.basicDetailForm.controls;
      for (const control of Object.keys(this.basicDetailForm.controls)) {
        this.basicDetailForm.controls[control].markAsTouched();
      }
      // for (const controlName in formControls) {
      //   if (
      //     formControls.hasOwnProperty(controlName) &&
      //     formControls[controlName].invalid
      //   ) {
      //     const control = formControls[controlName];
      //     const errorMessage = this.getErrorMessage(control);
      //     const fieldName =
      //       controlName.charAt(0).toUpperCase() + controlName.slice(1);
      //     this.toastr.error(errorMessage, fieldName);
      //   }
      // }
    }

    if (!this.contactForm.valid) {
      for (const control of Object.keys(this.contactForm.controls)) {
        const controlId = this.contactForm.controls[control];

        // Check if the control is a FormArray
        if (controlId instanceof FormArray) {
          const formArray = controlId as FormArray;

          // Mark each control within the FormArray as touched
          formArray.controls.forEach((arrayControl: any) => {
            Object.values(arrayControl.controls).forEach((control: any) => {
              control.markAsTouched();
            });
            arrayControl.markAsTouched();
          });
        } else {
          // Mark regular controls as touched
          controlId.markAsTouched();
        }
      }
      const formControls = this.contactForm.controls;
      // for (const controlName in formControls) {
      //   if (
      //     formControls.hasOwnProperty(controlName) &&
      //     formControls[controlName].invalid
      //   ) {
      //     const control = formControls[controlName];
      //     const errorMessage = this.getErrorMessage(control);
      //     const fieldName =
      //       controlName.charAt(0).toUpperCase() + controlName.slice(1);
      //     this.toastr.error(errorMessage, fieldName);
      //   }
      // }
    }

    if (!this.addressForm.valid) {
      for (const control of Object.keys(this.addressForm.controls)) {
        const controlId = this.addressForm.controls[control];

        // Check if the control is a FormArray
        if (controlId instanceof FormArray) {
          const formArray = controlId as FormArray;

          // Mark each control within the FormArray as touched
          formArray.controls.forEach((arrayControl: any) => {
            Object.values(arrayControl.controls).forEach((control: any) => {
              control.markAsTouched();
            });
            arrayControl.markAsTouched();
          });
        } else {
          // Mark regular controls as touched
          controlId.markAsTouched();
        }
      }
      const formControls = this.addressForm.controls;
      // for (const controlName in formControls) {
      //   if (
      //     formControls.hasOwnProperty(controlName) &&
      //     formControls[controlName].invalid
      //   ) {
      //     const control = formControls[controlName];
      //     const errorMessage = this.getErrorMessage(control);
      //     const fieldName =
      //       controlName.charAt(0).toUpperCase() + controlName.slice(1);
      //     this.toastr.error(errorMessage, fieldName);
      //   }
      // }
    }

    if (!this.SocialMediaForm.valid) {
      const formControls = this.SocialMediaForm.controls;
      for (const control of Object.keys(this.SocialMediaForm.controls)) {
        this.SocialMediaForm.controls[control].markAsTouched();
      }
      // for (const controlName in formControls) {
      //   if (
      //     formControls.hasOwnProperty(controlName) &&
      //     formControls[controlName].invalid
      //   ) {
      //     const control = formControls[controlName];
      //     const errorMessage = this.getErrorMessage(control);
      //     const fieldName =
      //       controlName.charAt(0).toUpperCase() + controlName.slice(1);
      //     this.toastr.error(errorMessage, fieldName);
      //   }
      // }
    }

    if (!this.AdditionalInfoForm.valid) {
      const formControls = this.AdditionalInfoForm.controls;
      for (const control of Object.keys(this.AdditionalInfoForm.controls)) {
        this.AdditionalInfoForm.controls[control].markAsTouched();
      }
      // for (const controlName in formControls) {
      //   if (
      //     formControls.hasOwnProperty(controlName) &&
      //     formControls[controlName].invalid
      //   ) {
      //     const control = formControls[controlName];
      //     const errorMessage = this.getErrorMessage(control);
      //     const fieldName =
      //       controlName.charAt(0).toUpperCase() + controlName.slice(1);
      //     this.toastr.error(errorMessage, fieldName);
      //   }
      // }
    }

    if(!this.basicDetailForm.valid) {
      this.scrollToElement('sec1');
      return;
    }

    if(!this.contactForm.valid) {
      this.scrollToElement('sec2');
      return;
    }

    if(!this.AdditionalInfoForm.valid) {
      this.scrollToElement('sec4');
      return;
    }

    if(!this.addressForm.valid) {
      this.scrollToElement('sec5');
      return;
    }

    if(!this.SocialMediaForm.valid) {
      this.scrollToElement('sec3');
      return;
    }

    

    if (
      basicDetails.invalid ||
      contactDetails.invalid ||
      SocialMedia.invalid ||
      additionalInfo.invalid || addressDetails.invalid
    ) {
      return;
    } else {
      // var checkDuplicateContact = await this.checkDuplicateContact(this.editContactId,this.contactForm.value?.Mobiles,this.contactForm.value?.Emails,this.contactForm.value?.Phones,this.basicDetailForm.value?.FirstName,this.basicDetailForm.value?.LastName);
      // if(checkDuplicateContact == true) {
      //   this.scrollToElement('sec2');
      //   return;
      // }
      if(this.isAdd && !this.isEdit) {
        //this.IsLoading = true;
      this.contactService
        .InsertContact({
          //vip: this.basicDetailForm.value?.Vip == null ? false : this.basicDetailForm.value?.Vip,
          vip: this.AdditionalInfoForm.value?.Vip == null ? false : this.AdditionalInfoForm.value?.Vip,
          AssignedToId: this.basicDetailForm.value?.AssignedTo,
          titleId: this.basicDetailForm.value?.Title,
          firstName: this.basicDetailForm.value?.FirstName,
          lastName: this.basicDetailForm.value?.LastName,
          genderId: this.AdditionalInfoForm.value?.Gender,
          dateOfBirth: this.AdditionalInfoForm.value?.DateofBirth,
          religionId: this.AdditionalInfoForm.value?.Religion,
          hobbies: this.Hobbies,
          Nationalities: this.AdditionalInfoForm.value?.Nationalities,
          Spoken: this.AdditionalInfoForm.value?.Languages,
          Mobile: this.contactForm.value?.Mobiles,
          Phone: this.contactForm.value?.Phones,
          // Fax: this.contactForm.value?.Faxes,
          Email: this.contactForm.value?.Emails,
          ContactAddress: this.addressForm.value?.Addresses,
          FacebookLink: this.SocialMediaForm.value?.FacebookLink,
          TwitterLink: this.SocialMediaForm.value?.TwitterLink,
          LinkedinLink: this.SocialMediaForm.value?.LinkedInLink,
          SkypeLink: this.SocialMediaForm.value?.SkypeLink,
          GooglePlusLink: this.SocialMediaForm.value?.GooglePlusLink,
          InstagramLink: this.SocialMediaForm.value?.InstagramLink,
          WeChatLink: this.SocialMediaForm.value?.WeChatLink,
          // Websites: this.SocialMediaForm.value?.Website,
          WebsiteLink: this.SocialMediaForm.value?.WebsiteLink,
          ContactSourceId: this.AdditionalInfoForm.value?.ContactSource,
          CompanyName: this.AdditionalInfoForm.value?.CompanyName,
          Designation: this.AdditionalInfoForm.value?.Designation,
          Website: this.AdditionalInfoForm.value?.Website,
          ContactTypeId: this.AdditionalInfoForm.value?.ContactType,
          createdBy:this.userData.id,
          updatedBy:this.userData.id,
          companyId: this.userData.companyId
        })
        .subscribe((data: any) => {
          
          if(data?.status == 200) {
          // this.UploadProfilePhoto(data?.message);
          this.toastr.success('Contact added successfully');
          document?.getElementById('kt_contact-details_close')?.click();
          //this.IsLoading = false;
          this.contactService.OpenListContact(true);
          }
          else if(data?.status == '-1') {
            this.scrollToElement('sec1');
            if(data.result.isDuplicateMobile == true) {
              this.isDuplicateMobile = true;
              this.DuplicateMobileId = data.result.duplicateMobileId;
              this.cdr.detectChanges();
            }
            else {
              this.isDuplicateMobile = false;
              this.DuplicateMobileId = null;
              this.cdr.detectChanges();
            }
            if(data.result.isDuplicateEmail == true) {
              this.isDuplicateEmail = true;
              this.DuplicateEmailId = data.result.duplicateEmailId;
              this.cdr.detectChanges();
            }
            else {
              this.isDuplicateEmail = false;
              this.DuplicateEmailId = null;
              this.cdr.detectChanges();
            }
            if(data.result.isDuplicatePhone == true) {
              this.isDuplicatePhone = true;
              this.DuplicatePhoneId = data.result.duplicatePhoneId;
              this.cdr.detectChanges();
            }
            else {
              this.isDuplicatePhone = false;
              this.DuplicatePhoneId = null;
              this.cdr.detectChanges();
            }
          }
          else {
            this.toastr.error("Something went wrong");
            document?.getElementById('kt_contact-details_close')?.click();
          //this.IsLoading = false;
          this.contactService.OpenListContact(true);
          }
          
        });
      }
      if(this.isEdit && !this.isAdd) {
        this.IsLoading = true;
        this.contactService
        .UpdateContact({
          id:this.editContactId,
          //vip: this.basicDetailForm.value?.Vip == null ? false : this.basicDetailForm.value?.Vip,
          vip: this.AdditionalInfoForm.value?.Vip == null ? false : this.AdditionalInfoForm.value?.Vip,
          AssignedToId: this.basicDetailForm.value?.AssignedTo,
          titleId: this.basicDetailForm.value?.Title,
          firstName: this.basicDetailForm.value?.FirstName,
          lastName: this.basicDetailForm.value?.LastName,
          genderId: this.AdditionalInfoForm.value?.Gender,
          dateOfBirth: this.AdditionalInfoForm.value?.DateofBirth,
          religionId: this.AdditionalInfoForm.value?.Religion,
          hobbies: this.Hobbies,
          Nationalities: this.AdditionalInfoForm.value?.Nationalities,
          Spoken: this.AdditionalInfoForm.value?.Languages,
          Mobile: this.contactForm.value?.Mobiles,
          Phone: this.contactForm.value?.Phones,
          // Fax: this.contactForm.value?.Faxes,
          Email: this.contactForm.value?.Emails,
          ContactAddress: this.addressForm.value?.Addresses,
          FacebookLink: this.SocialMediaForm.value?.FacebookLink,
          TwitterLink: this.SocialMediaForm.value?.TwitterLink,
          LinkedinLink: this.SocialMediaForm.value?.LinkedInLink,
          SkypeLink: this.SocialMediaForm.value?.SkypeLink,
          GooglePlusLink: this.SocialMediaForm.value?.GooglePlusLink,
          InstagramLink: this.SocialMediaForm.value?.InstagramLink,
          WeChatLink: this.SocialMediaForm.value?.WeChatLink,
          // Websites: this.SocialMediaForm.value?.Website,
          WebsiteLink: this.SocialMediaForm.value?.WebsiteLink,
          ContactSourceId: this.AdditionalInfoForm.value?.ContactSource,
          CompanyName: this.AdditionalInfoForm.value?.CompanyName,
          Designation: this.AdditionalInfoForm.value?.Designation,
          Website: this.AdditionalInfoForm.value?.Website,
          ContactTypeId: this.AdditionalInfoForm.value?.ContactType,
          updatedBy:this.userData.id,
          companyId: this.userData.companyId,
        })
        .subscribe((data: any) => {
          

          if(data.status == 200) {
          // this.UploadProfilePhoto(this.editContactId);
          this.toastr.success('Contact updated successfully');
          document?.getElementById('kt_contact-details_close')?.click();
          this.contactService.OpenListContact(true);
          }
          else if(data?.status == '-1') {
            this.scrollToElement('sec1');
            if(data.result.isDuplicateMobile == true) {
              this.isDuplicateMobile = true;
              this.DuplicateMobileId = data.result.duplicateMobileId;
              this.cdr.detectChanges();
            }
            else {
              this.isDuplicateMobile = false;
              this.DuplicateMobileId = null;
              this.cdr.detectChanges();
            }
            if(data.result.isDuplicateEmail == true) {
              this.isDuplicateEmail = true;
              this.DuplicateEmailId = data.result.duplicateEmailId;
              this.cdr.detectChanges();
            }
            else {
              this.isDuplicateEmail = false;
              this.DuplicateEmailId = null;
              this.cdr.detectChanges();
            }
            if(data.result.isDuplicatePhone == true) {
              this.isDuplicatePhone = true;
              this.DuplicatePhoneId = data.result.duplicatePhoneId;
              this.cdr.detectChanges();
            }
            else {
              this.isDuplicatePhone = false;
              this.DuplicatePhoneId = null;
              this.cdr.detectChanges();
            }
          }
          else {
            this.toastr.error('Something went wrong');
            document?.getElementById('kt_contact-details_close')?.click();
            this.contactService.OpenListContact(true);
          }
          this.IsLoading = false;
          this.cdr.detectChanges();
        });
      }
    }
  }

  async checkDuplicateContact(contactId:any,Mobiles:any,Emails:any,Phones:any,FirstName:any,LastName:any) {
    return new Promise<boolean>((resolve, reject) => {
      this.contactService
        .checkDuplicateContact({
          contactId: contactId,
          mobiles:Mobiles,
          emails:Emails,
          companyId: this.userData.companyId,
          phones: Phones,
          FirstName: FirstName,
          LastName: LastName
        })
        .subscribe((data: any | undefined) => {
          if(data.isDuplicateMobile == true) {
            this.isDuplicateMobile = true;
            this.DuplicateMobileId = data.duplicateMobileId;
            this.cdr.detectChanges();
            resolve(true);
          }
          else {
            this.isDuplicateMobile = false;
            this.DuplicateMobileId = null;
            this.cdr.detectChanges();
          }
          if(data.isDuplicateEmail == true) {
            this.isDuplicateEmail = true;
            this.DuplicateEmailId = data.duplicateEmailId;
            this.cdr.detectChanges();
             resolve(true);
          }
          else {
            this.isDuplicateEmail = false;
            this.DuplicateEmailId = null;
            this.cdr.detectChanges();
          }
          if(data.isDuplicatePhone == true) {
            this.isDuplicatePhone = true;
            this.DuplicatePhoneId = data.duplicatePhoneId;
            this.cdr.detectChanges();
            resolve(true);
          }
          else {
            this.isDuplicatePhone = false;
            this.DuplicatePhoneId = null;
            this.cdr.detectChanges();
          }
          resolve(false);
        });
      });
  }

  UploadProfilePhoto(data: any) {
    if(data != null && data != '') {
      const formData = new FormData();
      formData.append("ProfilePhoto", this.imgFile);
      formData.append("Id", data);
      this.contactService.UploadProfilePhoto(formData).subscribe(data => {
        console.log("Photo uploaded successfully");
      })
    }
  }

  isNumber(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    if(tab == 'tab2') {
      this.isSaveNotes = false;
      this.setInitalContactNotesForm();
      this.cdr.detectChanges();
    }
  }

  setViewForm(data:any) {
    this.setEditBasicDetailForm(data);
    this.setEditSocialMediaForm(data);
    this.setEditAdditionalInfoForm(data);
    this.setEditInitialContactForm(data);
    this.setEditAddressForm(data);
    this.contactForm.disable();
    this.basicDetailForm.disable();
    this.SocialMediaForm.disable();
    this.AdditionalInfoForm.disable();
    this.addressForm.disable();
  }

  setEditBasicDetailForm(data:any) {
    this.basicDetailForm = new FormGroup({
      //Vip: new FormControl(data?.vip),
      AssignedTo: new FormControl(data?.assignedToId,Validators.required),
      Ref: new FormControl(data?.ref),
      Title: new FormControl(data?.titleId),
      FirstName: new FormControl(data?.firstName, Validators.required),
      LastName: new FormControl(data?.lastName),
      //Gender: new FormControl(data?.genderId),
      //DateofBirth: new FormControl(data?.dateOfBirth != null ? moment(data?.dateOfBirth).format("YYYY-MM-DD"):null),
      //Nationalities: new FormArray([]),
      //Religion: new FormControl(data?.religionId),
      //Languages: new FormArray([]),
      //Hobbies: new FormControl(),
    });
if(data?.photo != null && data?.photo != '') {
    this.imagePath = this.baseUrlImage + data?.photo; 
}
    

    // this.Nationalities = this.basicDetailForm.get('Nationalities') as FormArray;
    
    //   var element = {id:0,nationality:data?.nationality1}
    //   this.Nationalities.push(this.createNationality(element));

    // if(data?.nationality2 != undefined && data?.nationality2 != null && data?.nationality2 != '') {
    //   var elementNationality2 = {id:0,nationality:data?.nationality2}
    //   this.Nationalities.push(this.createNationality(elementNationality2));
    // }
    // var Nationalityform = this.basicDetailForm.get('Nationalities') as FormArray;
    // Nationalityform.controls.forEach((control: any) => {
    //   control.controls['id'].disable();
    //   control.controls['Nationality'].disable();

    // });

    
  }

  setEditSocialMediaForm(data:any) {
    this.SocialMediaForm = new FormGroup({
      FacebookLink: new FormControl(data?.facebookLink),
      TwitterLink: new FormControl(data?.twitterLink),
      LinkedInLink: new FormControl(data?.linkedInLink),
      SkypeLink: new FormControl(data?.skypeLink),
      GooglePlusLink: new FormControl(data?.googlePlusLink),
      InstagramLink: new FormControl(data?.instagramLink),
      WeChatLink: new FormControl(data?.weChatLink),
      // Website: new FormControl(data?.websites),
      WebsiteLink: new FormControl(data?.websiteLink),
    });
  }

  setEditAddressForm(data:any) {
    this.addressForm = new FormGroup({
      Addresses: new FormArray([]),
    });

    this.Addresses = this.addressForm.get('Addresses') as FormArray;
    data?.contactAddress.forEach((element: any) => {
      this.Addresses.push(this.createAddress(element));
    });
  }

  setEditInitialContactForm(data:any) {
    this.contactForm = new FormGroup({
      Mobiles: new FormArray([]),
      Phones: new FormArray([]),
      // Faxes: new FormArray([]),
      //Addresses: new FormArray([]),
      Emails: new FormArray([]),
    }, { validators: this.customFormValidator });

    this.Mobiles = this.contactForm.get('Mobiles') as FormArray;

    if(data?.mobile.length == 0) {
      this.Mobiles.push(this.createMobile({}))
      var Mobile:any = this.contactForm.get('Mobiles') as FormArray;
      Mobile.controls[0].controls['MobileType'].setValue(1);
    }
    
    data?.mobile.forEach((element: any) => {
      this.Mobiles.push(this.createMobile(element));
    });

    var mobilesrequired:any = this.contactForm.get('Mobiles') as FormArray;
    // mobilesrequired.controls[0].controls['MobileType'].setValidators(
    //   Validators.required
    // );
    // mobilesrequired.controls[0].controls['CountryCode'].setValidators(
    //   Validators.required
    // );
    // mobilesrequired.controls[0].controls['Mobile'].setValidators(Validators.required);
    // mobilesrequired.controls[0].controls['MobileType'].updateValueAndValidity();
    // mobilesrequired.controls[0].controls['CountryCode'].updateValueAndValidity();
    // mobilesrequired.controls[0].controls['Mobile'].updateValueAndValidity();
    this.Phones = this.contactForm.get('Phones') as FormArray;

    if(data?.phone.length == 0) {
      this.Phones.push(this.createPhone({}))
      var Phone:any = this.contactForm.get('Phones') as FormArray;
      Phone.controls[0].controls['PhoneType'].setValue(1);
    }
    
    data?.phone.forEach((element: any) => {
      this.Phones.push(this.createPhone(element));
    });

    // this.Faxes = this.contactForm.get('Faxes') as FormArray;

    // if(data?.fax.length == 0) {
    //   this.Faxes.push(this.createFax({}))
    // }

    // data?.fax.forEach((element: any) => {
    //   this.Faxes.push(this.createFax(element));
    // });

    this.Emails = this.contactForm.get('Emails') as FormArray;

    if(data?.email.length == 0) {
      this.Emails.push(this.createEmail({}))
      var Email:any = this.contactForm.get('Emails') as FormArray;
      Email.controls[0].controls['EmailType'].setValue(1);
    }


    data?.email.forEach((element: any) => {
      this.Emails.push(this.createEmail(element));
    });

   
    // var emailrequired:any = this.contactForm.get('Emails') as FormArray;
    // emailrequired.controls[0].controls['EmailType'].setValidators(
    //   Validators.required
    // );
    
    // emailrequired.controls[0].controls['Email'].setValidators(Validators.required);
    // emailrequired.controls[0].controls['EmailType'].updateValueAndValidity();
    // emailrequired.controls[0].controls['Email'].updateValueAndValidity();

    // this.Addresses = this.contactForm.get('Addresses') as FormArray;
    // data?.contactAddress.forEach((element: any) => {
    //   this.Addresses.push(this.createAddress(element));
    // });
  }

  setEditAdditionalInfoForm(data:any) {
    this.AdditionalInfoForm = new FormGroup({
      Vip: new FormControl(data?.vip),
      Gender: new FormControl(data?.genderId),
      DateofBirth: new FormControl(data?.dateOfBirth != null ? moment(data?.dateOfBirth).format("YYYY-MM-DD"):null),
      ContactSource: new FormControl(data?.contactSourceId),
      CompanyName: new FormControl(data?.companyName),
      Designation: new FormControl(data?.designation),
      Website: new FormControl(data?.website),
      ContactType: new FormControl(data?.contactTypeId),
      CreatedBy: new FormControl(''),
      Nationalities: new FormArray([]),
      Religion: new FormControl(data?.religionId),
      Languages: new FormArray([]),
    });

    this.Nationalities = this.AdditionalInfoForm.get('Nationalities') as FormArray;
    
      var element = {id:0,nationality:data?.nationality1}
      this.Nationalities.push(this.createNationality(element));

    if(data?.nationality2 != undefined && data?.nationality2 != null && data?.nationality2 != '') {
      var elementNationality2 = {id:0,nationality:data?.nationality2}
      this.Nationalities.push(this.createNationality(elementNationality2));
    }
    var Nationalityform = this.AdditionalInfoForm.get('Nationalities') as FormArray;
    Nationalityform.controls.forEach((control: any) => {
      control.controls['id'].disable();
      control.controls['Nationality'].disable();

    });

    this.Languages = this.AdditionalInfoForm.get('Languages') as FormArray;
    var elementLanguage = {id:0,language:data?.nativeLanguage}
      this.Languages.push(this.createLanguage(elementLanguage));

      if(data?.secondLanguage != undefined && data?.secondLanguage != null && data?.secondLanguage != '') {
        var elementsecondLanguage = {id:0,language:data?.secondLanguage}
        this.Languages.push(this.createLanguage(elementsecondLanguage));
      }

      var LanguageForm = this.AdditionalInfoForm.get('Languages') as FormArray;
      LanguageForm.controls.forEach((control: any) => {
      control.controls['id'].disable();
      control.controls['Language'].disable();

    });
    if(data?.hobbiesId != null && data?.hobbiesId != '') {
this.Hobbies = data?.hobbiesId.split(',').map(Number);
    }
    else {
      this.Hobbies = [];
    }
    // this.Hobbies= this.HobbiesList.filter(
    //   (i:any) =>
    //     data?.hobbiesId
    //       ?.split(",")
    //       ?.findIndex((res: any) => Number.parseInt(res) === i?.id) !== -1
    // );
  }

  onEdit() {
    this.isEdit = true;
    this.isAdd = false;
    this.isView = false;
    this.contactForm.enable();
    this.basicDetailForm.enable();
    this.SocialMediaForm.enable();
    this.AdditionalInfoForm.enable();
    this.addressForm.enable();
    // this.basicDetailForm.controls['Ref'].disable();
    // this.AdditionalInfoForm.controls['CreatedBy'].disable();
  }

  previewImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePath = reader.result as string;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  this.imgFile = event.target.files[0]
  
  }

  onCancel() {
    this.isView = true;
        this.isAdd = false;
        this.isEdit = false;
        this.basic = true;
        this.isAdditionalInfo = true;
        this.isSocialMedia = true;
        this.iscontactdetails = true;
        this.isAddressDetails = true;
        this.IsLoading = true;
        this.scrollToElement('sec1');
        this.contactService.GetContact(this.editContactId,this.userData.companyId).subscribe((data:any) => {
          this.setViewForm(data);
          this.contactDetails = data;
          this.isDuplicateEmail = false;
          this.isDuplicateMobile = false;
          this.DuplicateMobileId = null;
          this.DuplicateEmailId = null;
          this.isDuplicatePhone = false;
          this.DuplicatePhoneId = null;
          this.cdr.detectChanges();
          this.IsLoading = false;
        })
  }

  DeleteImage() {
    this.imagePath=null;
    this.imgFile = null;
  }

  closeContact() {
    this.contactService.openDrawer(false);
    this.contactService.SelectContactId(0);
  }

  SaveContactNotes() {
    this.isSaveNotes = true;
    if (!this.ContactNotesForm.valid) {
      return;
    }
    else {
      this.contactService
        .InsertContactNotes({
          contactId: this.editContactId,
          notes: this.ContactNotesForm.get('Notes')?.value,
          createdBy:this.userData.id,
          updatedBy:this.userData.id,
          companyId: this.userData.companyId
        })
        .subscribe((data: any) => {
          if(data?.status == 200) {
          // this.UploadProfilePhoto(data?.message);
          this.isSaveNotes = false;
          this.setInitalContactNotesForm();
          this.cdr.detectChanges();
          this.getContactNotesByContactId(this.editContactId);
          this.toastr.success('Notes added successfully');
          }
          else {
            this.toastr.error("Something went wrong");
          }
        });
    }
  }

  changeMobileDetail() {
    this.isDuplicateMobile = false;
    this.DuplicateMobileId = null;
    this.cdr.detectChanges();
  }

  changeEmailDetail() {
    this.isDuplicateEmail = false;
    this.DuplicateEmailId = null;
    this.cdr.detectChanges();
  }

  changePhoneDetail() {
    this.isDuplicatePhone = false;
    this.DuplicatePhoneId = null;
    this.cdr.detectChanges();
  }

  getContactNotesByContactId(contactId:any) {
    this.contactService.GetContactNotes(contactId).subscribe((data:any) => {
      this.contactNotes = data;
      this.cdr.detectChanges();
    })
  }

  get Notes() {
    return this.ContactNotesForm.get('Notes')!;
  }
  
}
