import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  public baseUrl = environment.apiUrl;
  public token = new HttpHeaders().append(
    'Authorization',
    `Bearer ${this.authService.currentUserValue?.token}`
  );
  public isCompanyDetails = new BehaviorSubject(null);
  public isOpenAddContact = new BehaviorSubject(null);
  public isOpenListContact = new BehaviorSubject(null);
  public SelectedContactId = new BehaviorSubject(null);
  public IsOpenDrawer = new BehaviorSubject(null);
  
  constructor(
    private authHttpService: AuthHTTPService,
    public httpClient: HttpClient,
    public authService: AuthService) { }

    insertUpdateCompany(payload:any){
      return this.httpClient.post(this.baseUrl +`CompanyInfo/InsertUpdateCompanyAsync`,payload);
    }
    openDrawer(data:any) {
      this.IsOpenDrawer.next(data);
    }
    // OpenAddContact(data: any) {
    //   this.isOpenAddContact.next(data);
    // }
    // OpenListContact(data: any) {
    //   this.isOpenListContact.next(data);
    // }  
    // SelectContactId(data:any) {
    // this.SelectedContactId.next(data);
    // }
    CompanyDetails(isCompanyDetails: any) {
      this.isCompanyDetails.next(isCompanyDetails);
     }
     getRolesTo() {
      return this.httpClient.get(this.baseUrl + `DropDown/GetAllAssignedTo`);
    }

}
/*
const payload={
  companyId:,
  companyName:,
  numberOfUsers:,
  reraorn:,
  trn:,
  address:,
  phone:,
  email:,
  website:,
  companyProfile:
}


*/
