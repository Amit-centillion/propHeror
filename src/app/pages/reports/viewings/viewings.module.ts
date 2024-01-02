import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ViewingsComponent } from './viewings.component';


@NgModule({
  declarations: [
    ViewingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewingsComponent,
      }
    ]),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbDropdownModule,
    NgApexchartsModule,
    ToastrModule.forRoot(),
    NgxDropzoneModule,    
    NgxPaginationModule
  ],
  exports: [
  ],
  providers: [ToastrService],
})
export class ViewingsModule { }
