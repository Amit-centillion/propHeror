import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  public baseUrl = environment.apiUrl;
  public isOpenAddDeal = new BehaviorSubject(null);
  public isOpenListDeal = new BehaviorSubject(null);
  public SelectedDealId = new BehaviorSubject(null);
  public IsOpenDrawer = new BehaviorSubject(null);
  public token = new HttpHeaders().append(
    'Authorization',
    `Bearer ${this.authService.currentUserValue}`
  );
  constructor(public httpClient: HttpClient, public authService: AuthService) {}

  OpenAddDeal(data: any) {
    this.isOpenAddDeal.next(data);
  }
  getAllLeadSubStatusById(){
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllLeadSubStatus`);
  }

  OpenListDeal(data: any) {
    this.isOpenListDeal.next(data);
  }

  InsertDealDetails(data: any) {
    return this.httpClient.post(
      this.baseUrl + `Deal/InsertDealDetails`,
      data
    );
  }

  EditDealDetails(data: any) {
    return this.httpClient.post(
      this.baseUrl + `Deal/UpdateDealsDetails`,
      data
    );
  }

  GetDealDetailById(data:any,companyId:any) {
    return this.httpClient.get(
      this.baseUrl + `Deal/GetDealDetailsById/${data}/${companyId}`
    );
  }

  GetAllDeals(data:any) {
    return this.httpClient.post(
      this.baseUrl + `Deal/GetAllDealDetails`,
      data
    );
  }

  SelectDealId(data:any) {
    this.SelectedDealId.next(data);
    }

    
  GetAllDealReportDeails(data:any) {
    return this.httpClient.post(
      this.baseUrl + `Report/DealReport`,
      data
    );
  }

  InsertDealNotes(data:any) {
    return this.httpClient.post(this.baseUrl + `Deal/InsertDealNotes`, data);
  }

  GetDealNotes(data:any) {
    return this.httpClient.get(this.baseUrl + `Deal/GetDealNotes/${data}`);
  }

  openDrawer(data:any) {
    this.IsOpenDrawer.next(data);
  }
  ExportDeal(data:any){
    return this.httpClient.post(this.baseUrl + `Deal/ExportDeals`,data,{
      responseType: 'blob'
    })
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
}
