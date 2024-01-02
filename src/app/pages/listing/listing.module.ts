import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownMenusModule, ModalsModule } from '../../_metronic/partials';
import { ListingComponent } from './listing.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownSelectComponent } from 'src/app/_metronic/partials/content/dropdown-menus/dropdown-select/dropdown-select.component';
import { TextboxComponent } from 'src/app/_metronic/partials/content/textbox/textbox.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ListingTableComponent } from './listing-table/listing-table.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListingNotesComponent } from './listing-notes/listing-notes.component';
import { ListingNotesAddComponent } from './listing-notes-add/listing-notes-add.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ListingViewComponent } from './listing-view/listing-view.component';
import { AvatarModule } from "ngx-avatar";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxSortableModule } from 'ngx-sortable';

@NgModule({
  declarations: [
    ListingComponent,
    ListingTableComponent,
    DropdownSelectComponent,
    ListingDetailComponent,
    TextboxComponent,
    ListingNotesComponent,
    ListingNotesAddComponent,
    ListingViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListingComponent,
      },
      {
        path: 'add',
        component: ListingDetailComponent,
      },
      // {
      //   path: 'view',
      //   component: ListingViewComponent,
      // }
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
    NgxDaterangepickerMd.forRoot(),
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    AvatarModule,
    CarouselModule,
    DragDropModule,
    NgxSortableModule 
  ],
  exports: [
    ListingTableComponent,
    DropdownSelectComponent,
    ListingDetailComponent,
    TextboxComponent,
  ],
  providers: [ToastrService],
})
export class ListingModule {}
