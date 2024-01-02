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

import { LeadsComponent } from './leads.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeadsStatusComponent } from './leads-status/leads-status.component';
import { LeadsConversionComponent } from './leads-conversion/leads-conversion.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    LeadsComponent,
    LeadsStatusComponent,
    LeadsConversionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LeadsComponent,
      }
    ]),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgApexchartsModule,
    NgbDropdownModule,
    ToastrModule.forRoot(),
    NgxDropzoneModule,    
    NgxPaginationModule,
    DragDropModule
  ],
  exports: [ LeadsStatusComponent, LeadsConversionComponent ],
  providers: [ToastrService],
})
export class LeadsModule { }
