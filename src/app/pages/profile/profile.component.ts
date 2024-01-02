import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { ProfileService } from 'src/app/modules/auth/services/profile.service';
import { UsersService } from 'src/app/modules/auth/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{
  profileForm: FormGroup;
  UserImagePath:any;
  userImgFile:any;
  userData:any;
  getUserByUserId:any;
  getCompanyDetails:any;
  submitted = false;
  isImageChange:boolean=false;
  CountryCodeList: any = [];
  AllStatusTypes: any[] = [
    { id: true, name: 'Active' },
    { id: false, name: 'Inactive'},
  ];
  imgUrl = environment.imgUrl;
  constructor(
    private formBuilder: FormBuilder,
    private profileService:ProfileService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private userService:UsersService,
    private toastr: ToastrService,
    private dropdownService: DropdownService,
  )
  {
    this.profileForm = this.formBuilder.group({
      profilePhoto: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      jobTitle: new FormControl(''),
      department: new FormControl(''),
      brn: new FormControl(''),
      importLead: new FormControl(true),
      status: new FormControl(''),
      Imap: new FormControl(''),
      secondaryEmail: new FormControl(''),
      password: new FormControl(''),
      port: new FormControl(''),
      mobile:new FormControl(''),
      countryCode:new FormControl('')
    });
  }

  ngOnInit(): void {
    this.isImageChange=false;
    this.getCountryCodeList();
    this.userData = this.authService.userValue;
    var data=JSON.parse(this.userData);
    this.getUserDeatilsByUserId(data.id,data.companyId);
    this.getUserLeadImportSettings(data.id);
   }
   get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }
  isNumber(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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

  setformValue() {
    this.UserImagePath = `${this.imgUrl}${this.getUserByUserId.profileImage}`;
    this.profileForm.controls['email'].setValue(this.getUserByUserId.email);
    this.profileForm.controls['role'].setValue(this.getUserByUserId.roleName);
    this.profileForm.controls['firstName'].setValue(this.getUserByUserId.firstName);
    this.profileForm.controls['lastName'].setValue(this.getUserByUserId.lastName);
    this.profileForm.controls['jobTitle'].setValue(this.getUserByUserId.jobTitle);
    this.profileForm.controls['department'].setValue(this.getUserByUserId.department);
    this.profileForm.controls['brn'].setValue(this.getUserByUserId.rerabrn);
    this.profileForm.controls['status'].setValue(this.getUserByUserId.status);
    this.profileForm.controls['mobile'].setValue(this.getUserByUserId.mobile);
    this.profileForm.controls['countryCode'].setValue(this.getUserByUserId.countryCode);
    this.cdr.detectChanges();
  }
  setSecondaryFields(){
    this.profileForm.controls['importLead'].setValue(this.getCompanyDetails.isEnabled);
    this.profileForm.controls['Imap'].setValue(this.getCompanyDetails.imap);
    this.profileForm.controls['secondaryEmail'].setValue(this.getCompanyDetails.email);
    this.profileForm.controls['password'].setValue(this.getCompanyDetails.password);
    this.profileForm.controls['port'].setValue(this.getCompanyDetails.port);
  }
  previewUserImage(event: any) {
    this.isImageChange=false;
    this.isImageChange=true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.UserImagePath = reader.result as string;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
    this.userImgFile = event.target.files[0];
  }
  DeleteUserImage() {
    this.isImageChange=false;
    this.isImageChange=true;
    this.UserImagePath="";
    this.userImgFile = "";
    this.f['profilePhoto'].setValue("");
  }
  updateProfileImage() {
    const userId=this.getUserByUserId.userId;
    if(userId != null && userId != '') {
      const formData = new FormData();
      formData.append("ProfileImage", this.userImgFile);
      formData.append("UserId", userId);
       this.profileService.updateProfileImage(formData).subscribe((data:any) => {
        if( data.status === 200){
        }
        else{
        }
        this.cdr.detectChanges();
      });
    }
  }
  getUserDeatilsByUserId(id:number,companyId:number){
    this.userService.getUserDeatilsByUserId(id,companyId).subscribe({
      next:(res:any) => {
        this.getUserByUserId=res;
        this.userImgFile=this.getUserByUserId.profileImage;
        this.UserImagePath=this.getUserByUserId.profileImage;
        this.setformValue();
        this.cdr.detectChanges();
      }
    });
  }
  getUserLeadImportSettings(id:number){
    this.userService.getUserLeadImportSettings(id).subscribe({
      next:(res:any) => {
        this.getCompanyDetails=res;
        this.setSecondaryFields();
      }
    });
  }
  updateUser(){
    this.submitted = true;
    const formvalue=this.profileForm.value;
    const userLeadImportSettings={
      isEnabled:formvalue.importLead,
      imap:formvalue.Imap,
      email:formvalue.secondaryEmail,
      password:formvalue.password,
      port:formvalue.port
    }
     const payload={
      userId:this.getUserByUserId.userId,
      companyId:this.getUserByUserId.companyId,
      email:this.getUserByUserId.email,
      roleId:this.getUserByUserId.roleId,
      countryCode:formvalue.countryCode,
      firstName:formvalue.firstName,
      lastName:formvalue.lastName,
      mobile:formvalue.mobile,
      jobTitle:formvalue.jobTitle,
      department:formvalue.department,
      rerabrn:formvalue.brn,
      status:formvalue.status,
      updatedBy:this.getUserByUserId.userId,
      userLeadImportSettings:userLeadImportSettings
    }
    if(this.profileForm.valid){
      this.profileService.updateUser(payload).subscribe({
        next:(res:any) => {
          if (res.status===200){
            if(this.isImageChange===true){
              this.updateProfileImage();
            }
           this.toastr.success("User updated successfully");
          }
          else {
           this.toastr.error(res.message);
          }
          this.cdr.detectChanges();
        }
      });
    }
  }


    
}
