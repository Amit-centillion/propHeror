import { Component, Input, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { LayoutType } from '../../../core/configs/config';
import { LayoutInitService } from '../../../core/layout-init.service';
import { LayoutService } from '../../../core/layout.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  currentComponentName: string="";
  constructor(private router: Router, private layout: LayoutService, private layoutInit: LayoutInitService) {}

ngOnInit(): void {
  this.updateTitle();
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.updateTitle();
    }
  });
}

updateTitle(): void {
  
  switch (this.router.url) {
    case '/admin/company-setup':
      this.currentComponentName = 'Company Setup';
      break;
    case '/profile':
      this.currentComponentName = 'My Profile';
      break;
    case '/listings':
      this.currentComponentName = 'Listings';
      break;
    case '/contacts':
      this.currentComponentName = 'Contacts';
      break;  
      case '/leads':
      this.currentComponentName = 'Leads';
      break;
      case '/users':
        this.currentComponentName = 'Users';
        break;
      case '/deals':
      this.currentComponentName = 'Deals';
      break;
      case '/viewings':
      this.currentComponentName = 'Viewings';
      break;
      case '/settings/company':
      this.currentComponentName = 'Company';
      break;
      case '/settings/company/system':
      this.currentComponentName = 'Company';
      break;
      case '/settings/company/xml':
      this.currentComponentName = 'Company';
      break;
      case '/settings/company/leads':
      this.currentComponentName = 'Company';
      break;
      case '/settings/company/marketing':
      this.currentComponentName = 'Company';
      break;
      case '/settings/company/portals':
      this.currentComponentName = 'Company';
      break;
      case '/settings/users':
      this.currentComponentName = 'Users';
      break;
      
      case '/reports/listings':
      this.currentComponentName = 'Listings Report';
      break;
      case '/reports/leads':
      this.currentComponentName = 'Leads Report';
      break;
      case '/reports/viewings':
      this.currentComponentName = 'Viewings Report';
      break;
      case '/reports/deals':
      this.currentComponentName = 'Deals Report';
      break;
      case '/reports/agent-leaderboard':
      this.currentComponentName = 'Agent Leaderboard';
      break;
    default:
      this.currentComponentName = 'Dashboard';
      break;
  }
}

};
