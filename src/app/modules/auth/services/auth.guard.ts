import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  userData:any;
  PermissionAccess:any=[];
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    if(user != null){
    this.userData= JSON.parse(user);
    this.PermissionAccess = this.userData.permissionAccess;
    }
    var url = state.url;

    if(url == "/dashboard") {
      return this.checkPermissionAccess(1);
    }
    if(url == "/listings") {
      return this.checkPermissionAccess(2);
    }
    if(url == "/contacts") {
      return this.checkPermissionAccess(3);
    }
    if(url == "/leads") {
      return this.checkPermissionAccess(4);
    }
    if(url == "/deals") {
      return this.checkPermissionAccess(5);
    }
    if(url == "/viewings") {
      return this.checkPermissionAccess(6);
    }
    if(url == "/settings/company") {
      return this.checkPermissionAccess(7);
    }
    if(url == "/settings/users") {
      return this.checkPermissionAccess(8);
    }
    if(url == "/reports/listings") {
      return this.checkPermissionAccess(23);
    }
    if(url == "/reports/leads") {
      return this.checkPermissionAccess(24);
    }
    if(url == "/reports/viewings") {
      return this.checkPermissionAccess(25);
    }
    if(url == "/reports/deals") {
      return this.checkPermissionAccess(26);
    }
    if(url == "/reports/agent-leaderboard") {
      return this.checkPermissionAccess(27);
    }
    if(url == "/admin/company-setup") {
      return this.checkPermissionAccess(29);
    }
    if(user) {
    var currentUser = this.authService.currentUserValue?.token;
    if(currentUser == undefined){
     currentUser = localStorage.getItem('userToken');
     return true;
    }
    if (currentUser) {
      localStorage.setItem('userToken',currentUser);
      // logged in so return true
      return true;
    }
  }
  else {

    // not logged in so redirect to login page with the return url
    this.authService.logout();
  }
    return false;
  }

  checkPermissionAccess(id:any) {
    var access = this.PermissionAccess?.filter((x:any) => x.permissionId == id);
    if(access?.length > 0) {
      return true;
    }
    this.authService.logout();
    return false;
  }
}
