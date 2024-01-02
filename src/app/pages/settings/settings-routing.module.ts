import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { LeadsComponent } from './leads/leads.component';
import { PortalsComponent } from './portals/portals.component';
import { SystemComponent } from './system/system.component';
import { MarketingComponent } from './marketing/marketing.component';
import { XmlComponent } from './xml/xml.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {path:'', component:CompanyInfoComponent},
      {path:'xml', component:XmlComponent},
      {path:'leads', component:LeadsComponent},
      {path:'portals', component:PortalsComponent},
      {path:'system', component:SystemComponent},
      {path:'marketing',component:MarketingComponent}
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
