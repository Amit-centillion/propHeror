import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownMenusModule, ModalsModule } from '../../_metronic/partials';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { ContactsComponent } from './contacts.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsTableComponent } from './contacts-table/contacts-table.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AvatarModule } from 'ngx-avatar';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactsTableComponent,
    ContactsDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactsComponent,
      },
      {
        path: 'add',
        component: ContactsDetailComponent,
      }
    ]),
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ModalsModule,
    SharedModule,
    DropdownMenusModule,
    NgbDropdownModule,
    ToastrModule.forRoot(),
    NgxDropzoneModule,
    
    NgxPaginationModule,
    NgxDaterangepickerMd.forRoot(),
    AvatarModule,
    DragDropModule
  ],
  exports: [
    ContactsTableComponent,
    ContactsDetailComponent
  ],
  providers: [ToastrService],
})
export class ContactsModule {}
