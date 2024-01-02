import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownMenusModule, ModalsModule } from '../../_metronic/partials';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { LeadsComponent } from './leads.component';
import { LeadsDetailsComponent } from './leads-details/leads-details.component';
import { LeadsTableComponent } from './leads-table/leads-table.component';
import { AvatarModule } from 'ngx-avatar';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxMaskModule } from 'ngx-mask';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    LeadsComponent,
    LeadsDetailsComponent,
       LeadsTableComponent
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
    ModalsModule,
    SharedModule,
    DropdownMenusModule,
    NgbDropdownModule,
    ToastrModule.forRoot(),
    NgxDropzoneModule,    
    NgxPaginationModule,
    AvatarModule,
    CarouselModule,
    NgxMaskModule.forRoot(),
    DragDropModule
  ],
  exports: [
    LeadsDetailsComponent,
       LeadsTableComponent
  ],
  providers: [ToastrService],
})
export class LeadModule {}
