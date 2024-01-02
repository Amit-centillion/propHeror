import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
  @Input() appHeaderDefaulMenuDisplay: boolean;
  @Input() isRtl: boolean;
  itemClass: string = 'ms-1 ms-lg-3';
  userData:any;
  username: string = '';
  btnClass: string = 'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  userAvatarClass: string = 'symbol-35px symbol-md-40px show menu-dropdown';
  btnIconClass: string = 'fs-2 fs-md-1';
  UserImagePath:string="./assets/media/logos/default-dark.svg";
  imgUrl = environment.imgUrl;
  showUserImage:boolean = true;
  showUserDp:boolean = true;
  constructor(
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    var uData = this.authService.userValue;
    if(uData != null){
      this.userData= JSON.parse(uData);
      this.username = this.userData.firstName +' '+ this.userData.lastName;
      }
    
    this.userData = this.authService.userValue;
    var data=JSON.parse(this.userData);
    this.UserImagePath = `${this.imgUrl}${data.profileImage}`;
    if(data.profileImage == null){
      this.showUserImage = false
    }else{
      this.showUserDp =false
    }
  }

}
