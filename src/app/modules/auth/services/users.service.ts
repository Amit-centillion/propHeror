import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public baseUrl = environment.apiUrl;
  public isOpenEditListingId = new BehaviorSubject(null);
  public isOpenListing = new BehaviorSubject(null);
  public isOpenLeads = new BehaviorSubject(null);
  public editLeadId = new BehaviorSubject(null);
  public SelectedUserId = new BehaviorSubject(null);
  public IsOpenDrawer = new BehaviorSubject(null);
  public token = new HttpHeaders().append(
    'Authorization',
    `Bearer ${this.authService.currentUserValue}`
  );
  constructor(public httpClient: HttpClient, public authService: AuthService) {}
  OpenLeads(isOpenLeads: any) {
   this.isOpenLeads.next(isOpenLeads);
  }
  setEditlead(editLeadId:any){
    this.editLeadId.next(editLeadId);
  }
  OpenListing(isOpenListing: any) {
    this.isOpenListing.next(isOpenListing);
  }
  OpenEditListing(isOpenEditListingId: any) {
    this.isOpenEditListingId.next(isOpenEditListingId);
  }
  createUser(data:any){
    return this.httpClient.post(this.baseUrl + `User/InsertUserAsync`, data);
  }

  public isCallUser = new BehaviorSubject(null);

  CallUser(isCallUser: any) {
    this.isCallUser.next(isCallUser);
  }




  GetUserDetailsByCompanyId(companyId : any) {
    return this.httpClient.get(
      this.baseUrl + `User/GetUsersByCompanyIdAsync/${companyId}`);
  }
  getAllUserDetailUsingFilter(data : any) {
    return this.httpClient.post(
      this.baseUrl + `User/GetAllUserDetails`,
      data
    );
  }

  getUserDeatilsByUserId(userId:any,companyId:any){
    return this.httpClient.get(
      this.baseUrl + `User/GetUserByUserId/${userId}/${companyId}`
    // this.baseUrl + `Leads/GetViewLeadDetailsByLeadId/${LeadId}`,
    
    );
  }
  getUserLeadImportSettings(userId:any){
    const params = new HttpParams().set('userId',userId)
    return this.httpClient.get(
      this.baseUrl + `User/GetUserLeadImportSettings?${params}`
    );
  }

  getRolesTo() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllAssignedTo`);
  }


  GetStatus() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllPropertyType`);
  }

  InsertUsersDetails(data: any) {
    return this.httpClient.post(
      this.baseUrl + `User/InsertUserAsync`,
      data
    );
  }

  UpdateUsersDetails(data: any) {
    return this.httpClient.post(
      this.baseUrl + `User/UpdateUser`,
      data
    );
  }

  openDrawer(data:any) {
    this.IsOpenDrawer.next(data);
  }

  SelectUserId(data:any) {
    this.SelectedUserId.next(data);
    }

    GetNoOfUser(companyId:any) {
      return this.httpClient.get(
        this.baseUrl + `User/GetNoofUser/${companyId}`,
      );
    }
}
