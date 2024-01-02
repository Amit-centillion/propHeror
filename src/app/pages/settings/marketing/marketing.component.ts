import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanySettingsService } from 'src/app/modules/auth/services/company-settings/company-settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit{
  userData:any;
  public marketingForm: FormGroup;
  companyId:any;
  companymarketingData:any;
  companyImagePath:any;
  companyImgFile:any = null;
  watermarkImagePath:any;
  watermarkImgFile:any = null;
  listingImagePath:any;
  listingImgFile:any = null;
  imgFile = null;
  isDeleteCompanyPhoto = false;
  isDeleteListingPhoto = false;
  isDeleteWatermarkPhoto = false;
  imgUrl = environment.imgUrl;
  isCompanyUplaod = false;
  isWatermarkUplaod = false;
  isListingUplaod = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companySettinsService:CompanySettingsService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.marketingForm = this.formBuilder.group({
      companyLogoPath: new FormControl('', []),
      watermarkPath: new FormControl('', []),
      defaultListingImagePath: new FormControl('', []),
    });
    var userData = localStorage.getItem('usercred');
    if(userData != null){
      this.userData= JSON.parse(userData);
      }
    this.userData!= null ? this.companyId = this.userData.companyId : this.companyId = 1;
  }

  ngOnInit(): void {
   this.getCompanyImages();
  }

  save(){
    this.isListingUplaod ? this.UploadCompanyListingPhoto(): '';
    this.isCompanyUplaod ? this.UploadCompanyPhoto(): '';
    this.isWatermarkUplaod ? this.UploadCompanyWatermarkPhoto() : '';

    this.isDeleteCompanyPhoto ? this.deleCompanyLogoApi() : '';
    this.isDeleteListingPhoto ? this.deleCompanyListingApi() : '';
    this.isDeleteWatermarkPhoto ? this.deleCompanyWatermarkApi() : '';
  }

  getCompanyImages(){
    this.companySettinsService
      .getCompanyMarkettingImages(this.companyId)
      .subscribe((data: any | undefined) => {
        console.log("data.result",data.result)
        this.companymarketingData = data.result;
        if(this.companymarketingData.companyLogoPath != '' && this.companymarketingData.companyLogoPath != null){
          this.companyImagePath = `${this.imgUrl}${this.companymarketingData.companyLogoPath}`;
        }
        if(this.companymarketingData.defaultListingImagePath != '' && this.companymarketingData.defaultListingImagePath != null){
          this.listingImagePath = `${this.imgUrl}${this.companymarketingData.defaultListingImagePath}`;
        }
        if(this.companymarketingData.watermarkPath != '' && this.companymarketingData.watermarkPath != null){
          this.watermarkImagePath = `${this.imgUrl}${this.companymarketingData.watermarkPath}`;
        }
        this.cdr.detectChanges();
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.marketingForm.controls;
  }

  previewCompanyImage(event: any) {
    this.isCompanyUplaod = true;
    this.isDeleteCompanyPhoto = false;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.companyImagePath = reader.result as string;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
    this.companyImgFile = event.target.files[0]; 
  }

  DeleteCompanyImage() {
    this.companyImagePath=null;
    this.companyImgFile = null;
    this.f['companyLogoPath'].setValue("");
    this.isDeleteCompanyPhoto = true;
    this.isCompanyUplaod = false;
  }

  previewWatermarkImage(event: any) {
    this.isWatermarkUplaod = true;
    this.isDeleteWatermarkPhoto = false;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.watermarkImagePath = reader.result as string;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  
  this.watermarkImgFile = event.target.files[0]
  
  }

  DeleteWatermarkImage() {
    this.watermarkImagePath=null;
    this.watermarkImgFile = null;
    this.f['watermarkPath'].setValue("");
    this.isDeleteWatermarkPhoto = true;
    this.isWatermarkUplaod = false;
  }

  previewListingImage(event: any) {
    this.isListingUplaod = true;
    this.isDeleteListingPhoto = false;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.listingImagePath = reader.result as string;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
    
  this.listingImgFile = event.target.files[0]
  
  }

  DeleteListingImage() {
    this.listingImagePath=null;
    this.listingImgFile = null;
    this.f['defaultListingImagePath'].setValue("");
    this.isDeleteListingPhoto = true;
    this.isListingUplaod=false
  }

  UploadCompanyPhoto() {
    if(this.companyId != null && this.companyId != '') {
      const formData = new FormData();
      formData.append("CompanyPhoto", this.companyImgFile);
      formData.append("Id", this.companyId);
       this.companySettinsService.UploadCompanyPhoto(formData).subscribe((data:any) => {
        if( data.status === 200){
          this.toastr.success('Marketing updated successfully');
        }
        else{
          this.toastr.error('Something went wrong...');
        }
      }) 
    }
  }

  UploadCompanyWatermarkPhoto() {
    if(this.companyId != null && this.companyId != '') {
      const formData = new FormData();
      formData.append("WatermarkPhoto", this.watermarkImgFile);
      formData.append("Id", this.companyId);
       this.companySettinsService.UploadCompanyWatermarkPhoto(formData).subscribe((data:any) => {
        if( data.status === 200){
          this.toastr.success('Marketing updated successfully');
        }
        else{
          this.toastr.error('Something went wrong...');
        }
      }) 
    }
  }

  UploadCompanyListingPhoto() {

    if(this.companyId != null && this.companyId != '') {
      const formData = new FormData();
      formData.append("CompanyListingPhoto", this.listingImgFile);
      formData.append("Id", this.companyId);
       this.companySettinsService.UploadCompanyListingPhoto(formData).subscribe((data:any) => {
        if( data.status === 200){
          this.toastr.success('Marketing updated successfully');
        }
        else{
          this.toastr.error('Something went wrong...');
        }
      }) 
    }
  }

  deleCompanyLogoApi(){
    if(this.companymarketingData.companyLogoPath !=null && this.companymarketingData.companyLogoPath != '')
    {
    const myArray = this.companymarketingData.companyLogoPath.split("\\");
    const data = {
      CompanyImageName : myArray[2],
      CompanyId : this.companyId
    };
    this.companySettinsService.deleteCompanyImage(data).subscribe((data:any) => {
      if( data.status === 200){
        this.toastr.success('Image deleted successfully');
      }
      else{
      this.toastr.error('Something went wrong...');
      }
    }); 
  }
  }

  deleCompanyWatermarkApi(){
  if(this.companymarketingData.watermarkPath !=null && this.companymarketingData.watermarkPath != '')
    {
      const myArray = this.companymarketingData.watermarkPath.split("\\");
    const data = {
      CompanyImageName : myArray[2],
      CompanyId : this.companyId
    };
    this.companySettinsService.deleteCompanyWatermarkImage(data).subscribe((data:any) => {
      if( data.status === 200){
        this.toastr.success('Image deleted successfully');
      }
    else{
        this.toastr.error('Something went wrong...');
      }
    });
  }
  }

  deleCompanyListingApi(){
    if(this.companymarketingData.defaultListingImagePath !=null && this.companymarketingData.defaultListingImagePath != '')
    {
    const myArray = this.companymarketingData.defaultListingImagePath.split("\\");
    const data = {
      CompanyImageName : myArray[2],
      CompanyId : this.companyId
    };
    this.companySettinsService.deleteCompanyListingImage(data).subscribe((data:any) => {
     if( data.status === 200){
        this.toastr.success('Image deleted successfully');
      }
      else{
        this.toastr.error('Something went wrong...');
     }
    }) ;
  }
  }

}