import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewingsTableComponent } from './viewings-table/viewings-table.component';
import { ViewingsComponent } from './viewings.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatInputModule} from '@angular/material/input';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ViewingsDetailsComponent } from './viewings-details/viewings-details.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { AvatarModule } from 'ngx-avatar';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [ViewingsComponent, ViewingsTableComponent, ViewingsDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewingsComponent,
      },
    ]),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
      FormsModule,
      ReactiveFormsModule,
  MatInputModule,
  ToastrModule.forRoot(),
  NgxDaterangepickerMd.forRoot(),
  SharedModule,
  AvatarModule,
  CarouselModule,
  DragDropModule,
  NgxMaskModule.forRoot(),
  ],
  exports: [ViewingsTableComponent, ReactiveFormsModule],
  providers: [ToastrService],
})
export class ViewingsModule {}
