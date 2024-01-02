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

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersDetailsComponent } from './users-details/users-details.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UsersDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
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
    NgxPaginationModule
  ],
  exports: [
    UsersDetailsComponent,
    UsersTableComponent
  ],
  providers: [ToastrService],
})
export class UsersModule { }
