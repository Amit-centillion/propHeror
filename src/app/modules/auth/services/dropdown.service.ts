import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthHTTPService } from './auth-http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  public baseUrl = environment.apiUrl;
  public token = new HttpHeaders().append(
    'Authorization',
    `Bearer ${this.authService.currentUserValue?.token}`
  );

  constructor(
    private authHttpService: AuthHTTPService,
    public httpClient: HttpClient,
    public authService: AuthService
  ) {}

  getAssignedToList() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllAssignedTo`);
  }

  getAssignedToListByCompany(data:any) {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllAssignedToByCompany/${data}`);
  }

  getAssignedToListByCompanyAndRole(companyId:any,roleId:any,userId:any) {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllAssignedToByCompanyAndRole/${companyId}/${roleId}/${userId}`);
  }

  getTitleList() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllTitle`);
  }

  getGenderList() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllGender`);
  }

  getCountryList() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllCountry`);
  }

  getReligionList() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllReligion`);
  }

  getLanguageList() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllLanguage`);
  }

  getHobbiesList() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllHobbies`);
  }

  getCountryCodeList() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetPhoneCode`);
  }

  getContactSourceList() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllSourceOfListing`
    );
  }

  getContactTypeList() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllContactType`);
  }

  getContactDetailTypeList() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllContactDetailsType`
    );
  }

  getAllDealType() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllDealType`);
  }

  getDealStatus() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllLeadStatus`);
  }

  getDealSubStatus() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetDealSubStatus`);
  }

  getDealSubStatusById(id:any) {
    return this.httpClient.get(this.baseUrl + `DropDown/GetDealSubStatusById/${id}`);
  }

  getAllDealTransactionType() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllDealTransactionType`
    );
  }

  getAllDealPurpose() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllDealPurpose`
    );
  }

  getAllDealBuyerType() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllDealBuyerType`
    );
  }

  getAllDealFinanceType() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllDealFinanceType`
    );
  }

  getDealReminderList() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllDealReminder`
    );
  }

  GetAllUserByCompany(data:any) {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllUserByCompany/${data}`
    );
  }
  GetAllAssignedToByCompany(data:any) {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllAssignedToByCompany/${data}`
    );
  }

  getExternalReferralType() {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetAllDealExternalReferralType`
    );
  }
}
