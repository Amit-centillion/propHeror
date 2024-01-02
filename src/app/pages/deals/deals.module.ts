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
import { DealsComponent } from './deals.component';
import { DealsTableComponent } from './deals-table/deals-table.component';
import { DealsDetailsComponent } from './deals-details/deals-details.component';
import { AvatarModule } from 'ngx-avatar';
import { NgxMaskModule } from 'ngx-mask';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    DealsComponent,
    DealsTableComponent,
    DealsDetailsComponent
    ,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DealsComponent,
      }, {
        path: '',
        component: DealsDetailsComponent,
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
    NgxMaskModule.forRoot(),
    CarouselModule,
    DragDropModule
  ],
  exports: [
    DealsTableComponent,
    DealsDetailsComponent
  ],
  providers: [ToastrService],
})
export class DealModule {}
