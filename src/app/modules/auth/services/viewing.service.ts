import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ViewingsService {
  public baseUrl = environment.apiUrl;
//   public isOpenLeads = new BehaviorSubject(null);
  public token = new HttpHeaders().append(
    'Authorization',
    `Bearer ${this.authService.currentUserValue}`
  );

  public isOpenAddViewing = new BehaviorSubject(null);
  public isOpenListViewing = new BehaviorSubject(null);
  public selectedViewingId = new BehaviorSubject(null);
  public IsOpenDrawer = new BehaviorSubject(null);
  constructor(public httpClient: HttpClient, public authService: AuthService) {}

  OpenAddViewing(data: any) {
    this.isOpenAddViewing.next(data);
  }

  OpenListViewing(data: any) {
    this.isOpenListViewing.next(data);
  }


  getAllViewingTime() {
    return this.httpClient.get(this.baseUrl + `DropDown/GetAllViewingTime`);
  }

  InsertViewingDetails(data: any) {
    return this.httpClient.post(
      this.baseUrl + `ViewingDetails/InsertViewingDetails`,
      data
    );
  }

  EditViewingDetails(data: any) {
    return this.httpClient.post(
      this.baseUrl + `ViewingDetails/UpdateViewingDetails`,
      data
    );
  }

  GetViewingDetailsById(data:any,companyId:any){
    console.log("this.token",this.token)
    return this.httpClient.get(this.baseUrl + `ViewingDetails/GetViewingDetailsById/${data}/${companyId}`);
  }

  GetAllViewings(data:any) {
    return this.httpClient.post(
      this.baseUrl + `ViewingDetails/GetAllViewingDetails`,
      data
    );
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

  SelectViewingId(data:any) {
  this.selectedViewingId.next(data);
  }

  openDrawer(data:any) {
    this.IsOpenDrawer.next(data);
  }
}
