import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { SystemComponent } from './system/system.component';
import { XmlComponent } from './xml/xml.component';
import { LeadsComponent } from './leads/leads.component';
import { MarketingComponent } from './marketing/marketing.component';
import { PortalsComponent } from './portals/portals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ModalsModule, DropdownMenusModule } from 'src/app/_metronic/partials';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { ClipboardModule } from 'ngx-clipboard';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    SettingsComponent,
    CompanyInfoComponent,
    SystemComponent,
    XmlComponent,
    LeadsComponent,
    MarketingComponent,
    PortalsComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SettingsRoutingModule,
    ModalsModule,
    SharedModule,
    ClipboardModule,
    NgSelectModule,
    DropdownMenusModule,
  ],
  providers: [ToastrService],
})
export class SettingsModule { }
