import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanySettingsService } from 'src/app/modules/auth/services/company-settings/company-settings.service';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.scss'],
})
export class ListingViewComponent {
  companySettings:any;
  IsLoading: boolean;
  previewData: any;
  public baseUrl = '';
  baseUrlImage = environment.imgUrl;
  displayFilesPhotos: any;
  maxImageCount:any = 5;
  photosdisplay:any = [];
  displayFilesFloorPlan: any;
  displayFilesPDFBrochure: any;
  displayFilesVideos: any;
  displayView: boolean;
  featuresList: any = [];
  display1stImage: boolean;
  display2ndImage: boolean;
  display3rdImage: boolean;
  display4thImage: boolean;
  mapDisplay: boolean;
  companymarketingData:any;
  companyImagePath:any;
  listingDeafaultImage:any;
  companyImgFile:any = null;
  mapLocation: string;
  imgUrl = environment.imgUrl;
  userData:any;
  companyId:any;
  constructor(
    private route: ActivatedRoute,
    private listingSevice: ListingService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private companySettingsService: CompanySettingsService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.mapLocation = '';
    this.mapDisplay = false;
    this.cdr.detectChanges();

    this.route.queryParams.forEach(async (params: any) => {
        console.log('QUERYPARAMS');
        console.log(params);

        this.IsLoading = true;

        // Use await to ensure that getListingDetail completes before moving on
        const listingDetails = await this.getListingDetail(params.id);


        // Now, you can safely access the companyId
        const x = await this.getCompanySettings(this.companyId);

        // After awaiting getCompanySettings, you can access this.companySettings
        console.log(this.companySettings);

        const y = await this.getCompanyLogoImg(this.companyId);
        

        this.baseUrl = this.baseUrlImage + 'ListingDetails/';

        const getPhtots = await this.getImagePhotos('Photos', params.id);
        console.log(this.photosdisplay);
        // The rest of your code...
        const getFeatures = await this.getFeaturesbyId(params.id);
        this.cdr.detectChanges();
    });
}



  getImageFloorPhotos(data: any, id: any) {
    this.displayFilesFloorPlan = [];
    this.listingSevice
      .GetAllImagesPath(data, id)
      .subscribe((data: any | undefined) => {
        this.displayFilesFloorPlan = data;
      });
  }
  getImagePDFBrochure(data: any, id: any) {
    this.displayFilesPDFBrochure = [];
    this.listingSevice
      .GetAllImagesPath(data, id)
      .subscribe((data: any | undefined) => {
        this.displayFilesPDFBrochure = data;
      });
  }
  getImageVideos(data: any, id: any) {
    this.displayFilesVideos = [];
    this.listingSevice
      .GetAllImagesPath(data, id)
      .subscribe((data: any | undefined) => {
        this.displayFilesVideos = data;
      });
  }

  async getFeaturesbyId(id: string):Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
    this.featuresList = [];
    this.listingSevice
      .getFeaturesById(id)
      .subscribe((data: any | undefined) => {
        data.forEach((element: any) => {
          if (element.checked) {
            this.featuresList.push(element);
          }
        });
        resolve(true);
      });
    });
  }
  getMapLocation() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.mapLocation);
  } 
  async getCompanyLogoImg(id: any):Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
      this.companySettingsService
        .getCompanyMarkettingImages(id)
        .subscribe((data: any | undefined) => {
          console.log("data.result",data.result)
          this.companymarketingData = data.result;
          if(this.companymarketingData?.companyLogoPath != '' && this.companymarketingData?.companyLogoPath != null){
            this.companyImagePath = `${this.imgUrl}${this.companymarketingData.companyLogoPath}`;
          }else{
            // this.companyImagePath = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8462ea22404695.563122125aca7.jpg";
          }
           if(this.companymarketingData?.defaultListingImagePath != '' && this.companymarketingData?.defaultListingImagePath != null){
            this.listingDeafaultImage = `${this.imgUrl}${this.companymarketingData.defaultListingImagePath}`;
          }else{
            // this.listingDeafaultImage="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8462ea22404695.563122125aca7.jpg";
          }
          resolve(true);
        });
      });
      }

      async getCompanySettings(id: any):Promise<any> {
        return new Promise<boolean>((resolve, reject) => {
          this.companySettingsService
            .getCompanySystemSettings(id)
            .subscribe((data: any | undefined) => {
              this.companySettings = data[0];
              resolve(true);
            });
          });
          }

      async getImagePhotos(data: any, id: any):Promise<any> {
        return new Promise<boolean>((resolve, reject) => {
        this.displayFilesPhotos = [];
        this.photosdisplay = [];
        this.listingSevice
          .GetAllImagesPath(data, id)
          .subscribe((data: any | undefined) => {
            this.displayFilesPhotos = data.result == null ? []:data.result;
            if(this.displayFilesPhotos.length >= this.maxImageCount) {
              for(var i=0; i<this.maxImageCount; i++) {
                  this.photosdisplay.push(this.baseUrl + this.displayFilesPhotos[i].imagePath);
              }
            }
            else if(this.displayFilesPhotos.length == 0) {
              for(var i=0; i<this.maxImageCount; i++) {
                if(this.listingDeafaultImage != null) {
                this.photosdisplay.push(this.listingDeafaultImage);
                }
            }
            }
            else if(this.displayFilesPhotos.length < this.maxImageCount) {
              for(var i=0; i<this.displayFilesPhotos.length; i++) {
                this.photosdisplay.push(this.baseUrl + this.displayFilesPhotos[i].imagePath);
            }
            if(this.maxImageCount - this.displayFilesPhotos.length > 0) {
              for(var i=0; i<this.maxImageCount - this.displayFilesPhotos.length; i++) {
                if(this.listingDeafaultImage != undefined && this.listingDeafaultImage != null)
                this.photosdisplay.push(this.listingDeafaultImage);
              }
            }
            }
            if (this.displayFilesPhotos.length > 4) {
              this.display1stImage = true;
              this.display2ndImage = true;
              this.display3rdImage = true;
              this.display4thImage = true;
            } else if (this.displayFilesPhotos.length > 3) {
              this.display1stImage = true;
              this.display2ndImage = true;
              this.display3rdImage = true;
              this.display4thImage = false;
            } else if (this.displayFilesPhotos.length > 2) {
              this.display1stImage = true;
              this.display2ndImage = true;
              this.display3rdImage = false;
              this.display4thImage = false;
            } else if (this.displayFilesPhotos.length > 1) {
              this.display1stImage = true;
              this.display2ndImage = false;
              this.display3rdImage = false;
              this.display4thImage = false;
            } else {
              this.display1stImage = false;
              this.display2ndImage = false;
              this.display3rdImage = false;
              this.display4thImage = false;
            }
            resolve(true);
          });
          
        });
      }

      async getListingDetail(id:any):Promise<any> {
        return new Promise<boolean>((resolve, reject) => {
          this.listingSevice
          .GetPreviewListingDetailsById(id)
          .subscribe((data: any | undefined) => {
            this.IsLoading = false;
            this.companyId = data.companyId;
            this.previewData = data;
            if (this.previewData.subLocationName != null) {
              this.mapLocation =
                'https://www.google.com/maps?q=' +
                this.previewData.subLocationName +
                ',' +
                this.previewData.locationName +
                ',' +
                this.previewData.emiratesName +
                '&output=embed';
              this.mapDisplay = true;
              this.cdr.detectChanges();
            } else if (this.previewData.locationName != null) {
              this.mapLocation =
                'https://www.google.com/maps?q=' +
                this.previewData.locationName +
                ',' +
                this.previewData.emiratesName +
                '&output=embed';
              this.mapDisplay = true;
              this.cdr.detectChanges();
            } else {
              this.mapLocation =
                'https://www.google.com/maps?q=' +
                this.previewData.emiratesName +
                '&output=embed';
              this.mapDisplay = true;
  
              this.cdr.detectChanges();
             
            }
              this.displayView = true;
              this.cdr.detectChanges();
              resolve(true);
          });
          });
      }
      
}
