import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  isSettings= false;
  userData:any;
  PermissionAccess:any=[];
  
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    var uData = this.authService.userValue;
    if(uData != null){
    this.userData= JSON.parse(uData);
    this.PermissionAccess = this.userData.permissionAccess;
    }
  }

  getPermissionAccess(id:any) {
    var checkModule = this.PermissionAccess?.filter((x:any) => x.permissionId == id);
    if(checkModule?.length > 0) {
      return true;
    }
    return false;
  }

  isActive(){
    
   this.isSettings = ["/settings/xml","/settings/system","/settings/leads","/settings/marketing","/settings/portals",,"/settings/info"].includes(this.router.url);
console.log("isSettings",this.isSettings)
    return this.isSettings;
}
}
