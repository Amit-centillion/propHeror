import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthHTTPService } from './auth-http';
import { AuthService } from './auth.service';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  public baseUrl = environment.apiUrl;
  

  
  constructor(private authHttpService: AuthHTTPService,
    public httpClient: HttpClient,
    public authService: AuthService) { }


    getListingReport(data:any) {
      return this.httpClient.post(this.baseUrl + `Report/ListingReport`,data);
    }
    getViewingReport(data:any){
      return this.httpClient.post(this.baseUrl + `Report/ViewingReport`,data);
    }
    getAgentRport(data:any){
      return this.httpClient.post(this.baseUrl + `Report/AgentLeaderboardReport`,data);
    }
    getLeadReport(data:any) {
      return this.httpClient.post(this.baseUrl + `Report/LeadReport`,data);
    }
    getLeadReportWithConversion(data:any) {
      return this.httpClient.post(this.baseUrl + `Report/LeadReportWithConversionRate`,data);
    }
}
