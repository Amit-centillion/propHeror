import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  public baseUrl = environment.apiUrl;
  public token = new HttpHeaders().append(
    'Authorization',
    `Bearer ${this.authService.currentUserValue?.token}`
  );

  currentEditListingSelectedId: BehaviorSubject<any>;
  public isOpenListing = new BehaviorSubject(null);
  public isOpenViewListing = new BehaviorSubject(null);
  public isCallListing = new BehaviorSubject(null);
  public isCallNoteListing = new BehaviorSubject(null);
  public isRemoveCheckBoxSelected = new BehaviorSubject(null);
  public SelectedListingId = new BehaviorSubject(null);
  public IsOpenDrawer = new BehaviorSubject(null);
  constructor(
    private authHttpService: AuthHTTPService,
    public httpClient: HttpClient,
    public authService: AuthService
  ) {}
  get currentListingSelectedId(): any {
    return this.currentEditListingSelectedId.value;
  }

  set currentListingSelectedId(data: any) {
    this.currentEditListingSelectedId.next(data);
  }
  OpenListing(isOpenListing: any) {
    this.isOpenListing.next(isOpenListing);
  }
  OpenViewListing(isOpenViewListing: any) {
    this.isOpenViewListing.next(isOpenViewListing);
  }
  CallListing(isCallListing: any) {
    this.isCallListing.next(isCallListing);
  }
  RemoveCheckBoxSelected(isRemoveCheckBoxSelected: any) {
    this.isRemoveCheckBoxSelected.next(isRemoveCheckBoxSelected);
  }
  CallNotListing(isCallNoteListing: any) {
    this.isCallNoteListing.next(isCallNoteListing);
  }
  //get baths list
  getBath() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllBaths`);
  }
  //get beds list
  getBeds() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllBeds`);
  }
  //get category list
  GetPropertyType() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllPropertyType`);
  }
  //get property type using usage id
  GetPropertyTypeByUsageId(UsageId: number) {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetPropertyTypeByUsageId/${UsageId}`
    );
  }
  //get listing details
  getListingDetails() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllListingDetails`);
  }
  //get address
  getAddress() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllAddress`);
  }
  //get assign to
  getAssignedTo() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllAssignedTo`);
  }
  //get cheques
  getCheques() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllCheques`);
  }
  //get construction status
  getConstructionStatus() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllConstructionStatus`
    );
  }
  //get contact
  getContact() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllContact`);
  }
  //get location
  getLocation() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllLocation`);
  }
  //get location
  GetAllSubLocation() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllSubLocation`);
  }
  //get sub location
  GetSubLocationById(locationId: any) {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetSubLocationById/${locationId}`
    );
  }
  //get Emirates
  getEmirates() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllEmirates`);
  }

  getEmiratesByCountryId(countryId:any) {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllEmiratesByCountryId/${countryId}`);
  }

  //get usage
  getUsage() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllUsage`);
  }
  //get purpose
  getPurpose() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllPurpose`);
  }
  //get all furnished
  getFurnished() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllFurnished`);
  }
  //get all fitted
  getFitted() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllFitted`);
  }
  //save listing details
  saveListingDetails(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.baseUrl + `BasicDetails`, data)
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  //get listing by id
  GetListingDetailsById(id: any,companyId:any) {
    return this.httpClient.get(this.baseUrl + `BasicDetails/${id}/${companyId}`);
  }
  GetPreviewListingDetailsById(id:any) {
    return this.httpClient.get(this.baseUrl + `BasicDetails/PreviewListing/${id}`);
  }
  //edit listing details
  updateListingDetails(data: any): Promise<any> {
    return this.httpClient
      .put(this.baseUrl + `BasicDetails`, data)
      .toPromise()
      .then((response) => response)
      .catch((error) => {
        console.error('An error occurred', error);
        throw error;
      });
  }
  //get all Frequency
  getFrequency() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllFrequency`);
  }
  //get all Cheque
  getCheque() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllCheques`);
  }

  //get basic listing details
  getListingBasic(data: any) {
    return this.httpClient.post(
      this.baseUrl + `BasicDetails/GetAllBasicDetails`,
      data
    );
  }
  getPortals() {
    return this.httpClient.get(this.baseUrl + `Portals`);
  }
  getFeatures() {
    return this.httpClient.get(this.baseUrl + `Features`);
  }
  getPropertyStatus() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllPropertyStatus`);
  }
  getAllSourceOfListing() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllSourceOfListing`
    );
  }
  getAllRemind() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllRemind`);
  }

  getPortalsById(id: any) {
    return this.httpClient.get(this.baseUrl + `Portals/${id}`);
  }
  getFeaturesById(id: any) {
    return this.httpClient.get(this.baseUrl + `Features/${id}`);
  }
  getAllListingStatus() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllStatus`);
  }
  //get location by emirates
  getLocationByEmirates(id: any) {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetLocationById/${id}`
    );
  }

  GetAllSourceList() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllSourceOfListing`
    );
  } //upload img listing details
  UploadPhoto(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.baseUrl + `BasicDetails/Upload`, data)
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  GetAllImagesPath(data: any, id: any) {
    return this.httpClient.get(
      this.baseUrl + `BasicDetails/getImagesListing/${data}/${id}`
    );
  }
  //save listing notes
  saveListingNotes(data: any) {
    return this.httpClient.post(this.baseUrl + `ListingNotes`, data);
  } //getListingNotesUsingLocationId
  getListingNotesUsingLocationId(id: any) {
    return this.httpClient.get(this.baseUrl + `ListingNotes/${id}`);
  }

  //get language
  getLanguage() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllLanguage`);
  }
  //Get PhoneCode
  GetPhoneCode() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetPhoneCode`);
  }
  //Get  AllUser
  GetAllUser() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllUser`);
  }

  //get listing xml feed property finder
  GetXMlFeesPropertyFinder(clId: any, pId: any) {
    return this.httpClient.post(
      this.baseUrl +
        `XML/GetXMlFeesPropertyFinder/${clId}/${pId}`,
      { headers: this.token }
    );
  }

  DeletedListingImage(Type: any, ImageName: any, ListingId: any) {
    return this.httpClient.post(
      this.baseUrl +
        `BasicDetails/DeletedListingImage/${Type}/${ImageName}/${ListingId}`,
      { headers: this.token }
    );
  }
  
  EditListingImage(Id:any,Type: any, ListingId: any, Status: any) {
    return this.httpClient.get(
      this.baseUrl +
        `BasicDetails/toggleWatermark/${Id}/${Type}/${ListingId}/${Status}`,
      { headers: this.token }
    );
  }
  //save listing viewing
  InsertListingViewings(data: any) {
    return this.httpClient.post(this.baseUrl + `ListingViewings/InsertListingViewings`, data);
  } 
  //get listing view bt listing id
  GetListingViewingsByListingId(id: any,companyId:any) {
    return this.httpClient.get(this.baseUrl + `ListingViewings/GetListingViewingsByListingId/${id}/${companyId}`);
  }

  DownloadExcel(data:any) {
    return this.httpClient.post(this.baseUrl + `BasicDetails/ExportListings`, data, {
      responseType: 'blob'
    });
  }

  saveColumnOrder(data:any) {
    return this.httpClient.post(
      this.baseUrl + `User/SaveColumns`,
      data
    );
  }

  getColumnOrder(userId:any,table:any) {
    return this.httpClient.get(this.baseUrl + `User/GetColumns/${userId}/${table}`);
  }

  openDrawer(data:any) {
    this.IsOpenDrawer.next(data);
  }

  SelectListingId(data:any) {
    this.SelectedListingId.next(data);
    }
}
