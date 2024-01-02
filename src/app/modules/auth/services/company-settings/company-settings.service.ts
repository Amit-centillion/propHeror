import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthHTTPService } from '../auth-http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanySettingsService {
  private refreshData = new BehaviorSubject<boolean>(false);
  public baseUrl = environment.apiUrl;
  public token = new HttpHeaders().append(
    'Authorization',
    `Bearer ${this.authService.currentUserValue?.token}`
  );

  currentEditListingSelectedId: BehaviorSubject<any>;
  public isOpenListing = new BehaviorSubject(null);
  public isOpenEditListingId = new BehaviorSubject(null);
  public isOpenViewListing = new BehaviorSubject(null);
  public isCallCompany = new BehaviorSubject(null);
  public isCallNoteListing = new BehaviorSubject(null);

  constructor(
    private authHttpService: AuthHTTPService,
    public httpClient: HttpClient,
    public authService: AuthService
  ) {}

  CallCompany(isCallCompany:any) {
    this.isCallCompany.next(isCallCompany);
  }

  get refreshData$() {
    return this.refreshData.asObservable();
  }
  triggerRefresh() {
    this.refreshData.next(true);
  }
  getCompanyInfoSettings(companyId :any){
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetCompany/${companyId }`
    );
  }

  setCompanyInfoSettings(data:any){
    return this.httpClient.post(this.baseUrl + `CompanyInfo/UpdateCompany`, data);
  }

  getCompanySystemSettings(companyId :any){
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetCompanySystemSettings/${companyId }`
    );
  }

  setCompanySystemSettings(data:any){
    return this.httpClient.post(this.baseUrl + `CompanyInfo/InsertUpdateCompanySystemSettings`, data);
  }

  getCompanyMarketingSettings(companyId :any){
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetCompanyMarketingSettings/${companyId }`
    );
  }

  setCompanyMarketingSettings(data:any){
    return this.httpClient.post(this.baseUrl + `CompanyInfo/InsertUpdateCompanyMarketingSettings`, data);
  }

  getCompanyPortalSettings(companyId :any){
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetCompanyPortalsSettings/${companyId }`
    );
  }

  setCompanyPortalSettings(data:any){
    return this.httpClient.post(this.baseUrl + `CompanyInfo/InsertUpdateCompanyPortalsSettings`, data);
  }

  getCompanyLeadsSettings(companyId :any){
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetCompanyLeadsSettings/${companyId }`
    );
  }

  setCompanyLeadsSettings(data:any){
    return this.httpClient.post(this.baseUrl + `CompanyInfo/InsertUpdateCompanyLeadsSettings`, data);
  }

  
  getCompanyXmlSettings(companyId :any){
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetCompanyXmlSettings/${companyId }`
    );
  }

  setCompanyXmlSettings(data:any){
    return this.httpClient.post(this.baseUrl + `CompanyInfo/InsertUpdateCompanyXmlSettings`, data);
  }

  UploadCompanyPhoto(data:any) {
    return this.httpClient.post(this.baseUrl + `CompanyInfo/UploadCompanyPhoto`, data);
  }

  UploadCompanyWatermarkPhoto(data:any) {
    return this.httpClient.post(this.baseUrl + `CompanyInfo/UploadWatermarkPhoto`, data);
  }

  UploadCompanyListingPhoto(data:any) {
    return this.httpClient.post(this.baseUrl + `CompanyInfo/UploadCompanyListingPhoto`, data);
  }

  getCompanyMarkettingImages(companyId:any){
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/getCompanyImage/${companyId }`
      );
    }
  GetCompanyUploadedImage(companyId :any,docType:any){
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetCompanyUploadedImage/${docType}/${companyId }`
    );
  }

  deleteCompanyImage(data:any){
    return this.httpClient.post(this.baseUrl + `CompanyInfo/DeleteCompanyImage/${data.CompanyImageName}/${data.CompanyId}`, {});
  }

  deleteCompanyListingImage(data:any){
    return this.httpClient.post(this.baseUrl + `CompanyInfo/DeleteCompanyListingImage/${data.CompanyImageName}/${data.CompanyId}`, {});
  }

  deleteCompanyWatermarkImage(data:any){
    return this.httpClient.post(this.baseUrl + `CompanyInfo/DeleteCompanyWatermarkImage/${data.CompanyImageName}/${data.CompanyId}`, {});
  }

  getCurrencyList() {
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetCurrencyList`
    );
  }

  getSystemCountries() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetCompanyCountries`
    );
  }

  getMeasurementUnits() {
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetMeasuringUnit`
    );
  }

  getTimeZoneList() {
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetTimeZoneList`
    );
  }
  getAllCompaniesAccounts() {
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetAllCompaniesAccounts`
    );
  }

  getAllCompanySettings(id:any) {
    return this.httpClient.get(
      this.baseUrl + `CompanyInfo/GetCompanySettings/${id}`
    );
  }
}
