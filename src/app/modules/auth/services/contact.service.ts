import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthHTTPService } from './auth-http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public baseUrl = environment.apiUrl;
  public token = new HttpHeaders().append(
    'Authorization',
    `Bearer ${this.authService.currentUserValue?.token}`
  );
  public isOpenAddContact = new BehaviorSubject(null);
  public isOpenListContact = new BehaviorSubject(null);
  public SelectedContactId = new BehaviorSubject(null);
  public IsOpenDrawer = new BehaviorSubject(null);

  constructor(
    private authHttpService: AuthHTTPService,
    public httpClient: HttpClient,
    public authService: AuthService
  ) {}

  OpenAddContact(data: any) {
    this.isOpenAddContact.next(data);
  }

  OpenListContact(data: any) {
    this.isOpenListContact.next(data);
  }

  InsertContact(data:any) {
    return this.httpClient.post(this.baseUrl + `ContactDetails/InsertContactDetails`, data);
  }

  UpdateContact(data:any) {
    return this.httpClient.post(this.baseUrl + `ContactDetails/UpdateContactDetails`, data);
  }

  GetContact(data:any,companyId:any) {
    return this.httpClient.get(this.baseUrl + `ContactDetails/GetContactDetailById/${data}/${companyId}`);
  }

  UploadProfilePhoto(data:any) {
    return this.httpClient.post(this.baseUrl + `ContactDetails/UploadProfilePhoto`, data);
  }

  GetAllContactDetails(data:any) {
    return this.httpClient.post(this.baseUrl + `ContactDetails/GetAllContactDetails`, data);
  }

  DownloadExcel(data:any) {
    return this.httpClient.post(this.baseUrl + `ContactDetails/ExportContact`, data, {
      responseType: 'blob'
    });
  }

  InsertContactNotes(data:any) {
    return this.httpClient.post(this.baseUrl + `ContactDetails/InsertContactNotes`, data);
  }

  GetContactNotes(data:any) {
    return this.httpClient.get(this.baseUrl + `ContactDetails/GetContactNotes/${data}`);
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

  checkDuplicateContact(data:any) {
    return this.httpClient.post(this.baseUrl + `ContactDetails/CheckDuplicateContacts`, data);
  }

  SelectContactId(data:any) {
  this.SelectedContactId.next(data);
  }

  openDrawer(data:any) {
    this.IsOpenDrawer.next(data);
  }
}
