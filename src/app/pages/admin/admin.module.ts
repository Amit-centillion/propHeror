import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsModule } from '../../_metronic/partials';
import { AdminRoutingModule } from './admin-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponent } from './admin.component';
import { CompanySetupComponent } from './company-setup/company-setup.component';
import { CompanySetupDetailsComponent } from './company-setup-details/company-setup-details.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    AdminComponent,
    CompanySetupComponent,
    CompanySetupDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanySetupComponent,
      }, {
        path: '',
        component: CompanySetupDetailsComponent,
      }
    ]),
    ModalsModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SharedModule,
    AdminRoutingModule,
    NgSelectModule,
    NgxPaginationModule
  ],
  exports: [
    CompanySetupComponent,
    CompanySetupDetailsComponent
  ],
  providers: [ToastrService],
})
export class AdminModule { }
