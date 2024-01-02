import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  public baseUrl = environment.apiUrl;
  public isOpenLeads = new BehaviorSubject(null);
  public editLeadId = new BehaviorSubject(null);
  public IsOpenDrawer = new BehaviorSubject(null);
  public token = new HttpHeaders().append(
    'Authorization',
    `Bearer ${this.authService.currentUserValue?.token}`
  );
  constructor(public httpClient: HttpClient, public authService: AuthService) {}

  public isCallLead = new BehaviorSubject(null);
  public selectedLeadId = new BehaviorSubject(null);

  CallLead(isCallLead: any) {
    this.isCallLead.next(isCallLead);
  }
  OpenLeads(isOpenLeads: any) {
    this.isOpenLeads.next(isOpenLeads);
  }
  setEditlead(editLeadId: any) {
    this.editLeadId.next(editLeadId);
  }
  getLeadType() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllLeadTypes`);
  }

  getGetAllLeadStatus() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllLeadStatus`);
  }

  getAllLeadSubStatus() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllLeadSubStatus`);
  }

  getAllLeadSubStatusById(id: any) {
    return this.httpClient.get(
      this.baseUrl + `DropDown/GetLeadSubStatusById/${id}`
    );
  }
  getAllLeadPriority() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllLeadPriority`);
  }

  getAllAssignedTo() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllAssignedTo`);
  }
  getAllViewingStatus() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllViewingStatus`);
  }
  getPhoneCode() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetPhoneCode`);
  }
  getAllTitle() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllTitle`);
  }
  getAllCountry() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllCountry`);
  }

  getAllLocation() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllLocation`);
  }

  getAllSubLocation() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllSubLocation`);
  }

  getAllCategory() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllPropertyType`);
  }
  getAllUsage() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllUsage`);
  }

  getAllPurpose() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllPurpose`);
  }
  getAllEmirates() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllEmirates`);
  }
  InsertLeadsDetails(data: any) {
    return this.httpClient.post(
      this.baseUrl + `Leads/InsertLeadsDetails`,
      data
    );
  }

  getAllLeadFinance() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllLeadFinance`);
  }
  getAllBeds() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllBeds`);
  }

  getAllLeadDetailsUsiFilter(data: any) {
    return this.httpClient.post(
      this.baseUrl + `Leads/GetAllLeadsDetails`,
      data
    );
  }
  InsertViewLeadsDetails(data: any) {
    return this.httpClient.post(
      this.baseUrl + `Leads/InsertViewLeadsDetails`,
      data
    );
  }
  GetLeadDetailsByLeadId(id: any,companyId:any) {
    return this.httpClient.get(
      this.baseUrl + `Leads/GetLeadDetailsByLeadId/${id}/${companyId}`
    );
  }
  UpdateLeadDetails(data: any) {
    return this.httpClient.post(
      this.baseUrl + `Leads/UpdateLeadsDetails`,
      data
    );
  }
  UpdateViewLeadsDetails(data: any) {
    return this.httpClient.post(
      this.baseUrl + `Leads/UpdateViewLeadsDetails`,
      data
    );
  }
  GetViewLeadDetailsByLeadId(LeadId: any) {
    return this.httpClient.get(
      this.baseUrl + `Leads/GetViewLeadDetailsByLeadId/${LeadId}`
    );
  }
  GetLeadViewingsByLeadId(LeadId: any,companyId:any) {
    return this.httpClient.get(
      this.baseUrl + `LeadViewing/GetLeadViewingsByLeadId/${LeadId}/${companyId}`
    );
  }
  UpdateLeadViewings() {
    return this.httpClient.get(
      this.baseUrl + `LeadViewing/UpdateLeadViewings`
    );
  }
  SelectLeadId(data:any) {
    this.selectedLeadId.next(data);
    }
    GetViewLeadDetailsByListingRef(id: any) {
      return this.httpClient.get(
        this.baseUrl + `Leads/GetViewLeadDetailsByListingRef/${id}`
      );
    }
    DownloadExcel(data:any) {
      return this.httpClient.post(this.baseUrl + `Leads/ExportLeads`, data, {
        responseType: 'blob'
      });
    }

    openDrawer(data:any) {
      this.IsOpenDrawer.next(data);
    }
    
    InsertLeadNotes(data:any) {
      return this.httpClient.post(this.baseUrl + `Leads/InsertLeadNotes`, data);
    }
  
    GetLeadNotes(data:any) {
      return this.httpClient.get(this.baseUrl + `Leads/GetLeadNotes/${data}`);
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
    

    GetMatchingProperties(data:any) {
      return this.httpClient.post(
        this.baseUrl + `Leads/GetMatchingProperties`,
        data
      );
    }
  

}
