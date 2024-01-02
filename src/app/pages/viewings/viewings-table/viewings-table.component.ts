import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { ModalConfig } from 'src/app/_metronic/partials/layout/modals/modal.config';
import { LeadsService } from 'src/app/modules/auth/services/leads.service';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { ViewingsService } from 'src/app/modules/auth/services/viewing.service';
import { LeadsDetailsComponent } from '../../leads/leads-details/leads-details.component';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import dayjs, { Dayjs } from 'dayjs/esm';
import { Dropdown } from 'bootstrap';
import { DropdownService } from 'src/app/modules/auth/services/dropdown.service';
import { AuthService } from 'src/app/modules/auth';
import { environment } from 'src/environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-viewings-table',
  templateUrl: './viewings-table.component.html',
  styleUrls: ['./viewings-table.component.scss'],
})
export class ViewingsTableComponent implements OnInit {
  searchViewingForm:FormGroup;
  imgUrl = environment.imgUrl;
  tempViewingList:any  = [];
  ViewingList:any = [];
  userList:any = [];
  totalRecord:any = 0;
  data:any = {
    'AddViewing':true,
    'EditViewing':false,
    'Id':0
  };
  IsLoading:boolean = false;
  sortColumn:any = 'Updated';
  sortDir:boolean = true;
  pageNumber = 1;
  pageSize:number = 25;
  isFilterRef:boolean = false;
  isFilterListingRef: boolean = false;
  isFilterLeadReference: boolean = false;
  isFilterLeadFirstName: boolean = false;
  isFilterLeadLastName: boolean = false;
  isFilterCreatedBy: boolean = false;
  isFilterUpdatedBy: boolean = false;
  statusList:any = [];
  assignToList:any = [];
  SubLocationList:any = [];
  LocationList:any = [];
  EmirateList:any = [];
  propertyTypeList:any = [];
  purposeList:any = [];
  selectedViewingId:number = 0;
  userData:any;
  isAddViewingPermission: boolean = false;
  isDraweropen:boolean = false;
  columnOrder:any=[];
  DeafultcolumnOrder:any = [
    {
      column: 'Reference',
      isVisible: true
    },
    {
      column: 'Status',
      isVisible: true
    }, {
      column: 'Assigned To',
      isVisible: true,
    },
    {
      column: 'Listing Reference',
      isVisible: true,
    },
    {
      column: 'Purpose',
      isVisible: true,
    },
    {
      column: 'Property Type',
      isVisible: true,
    },
    {
      column: 'Emirate',
      isVisible: true,
    },
    {
      column: 'Location',
      isVisible: true,
    }, 
    {
      column: 'Sub Location',
      isVisible: true,
    },
    {
      column: 'Lead Reference',
      isVisible:true,
    }, 
    {
      column: 'Lead First Name',
      isVisible: true,
    },
    {
      column: 'Lead Last Name',
      isVisible: true,
    },
    {
      column: 'Start Date',
      isVisible: true,
    },
    {
      column: 'End Date',
      isVisible: true,
    },
    {
      column: 'Created',
      isVisible: true
    }, 
    {
      column: 'Created By',
      isVisible: true,
    }, 
    {
      column: 'Updated',
      isVisible: true,
    },
    {
      column: 'Updated By',
      isVisible: true,
    }
  ]
  tempcolumnOrder:any;
  @ViewChild('columnSettingmodal') private modalcolumnContent: TemplateRef<ViewingsTableComponent>;
  private modalColumnRef: NgbModalRef;
  @Input() public modalConfig: ModalConfig;
  constructor(private viewingService: ViewingsService,private leadsService: LeadsService,private listingSevice:ListingService,private cdr: ChangeDetectorRef,private dropdownService:DropdownService,private authService: AuthService, private modalColumnService: NgbModal,) {} 

  ngOnInit(){
    var uData = this.authService.userValue;
  if(uData != null){
  this.userData= JSON.parse(uData);
  this.isAddViewingPermission = this.userData.permissionAccess.filter((x:any) => x.permissionId == 13).length > 0;
  }
  this.viewingService.IsOpenDrawer.subscribe((x:any) => {
    if(x != null) {
      this.isDraweropen = x;
    }
  })
    this.setInitialSearchForm();
    this.getColumnOrder();
    this.getDropdownList();
    
    this.viewingService.isOpenListViewing.subscribe(data => {
      if(data) {
        this.pageNumber = 1
        this.pageSize = 25;
        this.sortColumn = 'Updated';
        this.sortDir = true;
        //this.searchContactForm.reset();
        this.searchViewing();
      }
    })
    this.viewingService.selectedViewingId.subscribe((data:any) => {
      this.selectedViewingId = data;
    })
  }

  getDropdownList() {
    this.getStatusList();
    this.getAssignedToList();
    this.getPurposeList();
    this.getPropertyTypeList();
    this.getEmiratesList();
    this.getLocationList();
    this.getSubLocationList();
    this.getAllUser();
  }

  getStatusList() {
    this.leadsService.getAllViewingStatus().subscribe((data:any) => {
      this.statusList = data;
    })
  }

  getAssignedToList() {
    this.dropdownService.getAssignedToListByCompanyAndRole(this.userData.companyId,this.userData.roleId,this.userData.id).subscribe((data:any) => {
      this.assignToList = data;
  })
  }

  getPurposeList() {
    this.listingSevice.getPurpose().subscribe((data: any | undefined) => {
      this.purposeList = data;
    });
  }

  getPropertyTypeList() {
    this.listingSevice.GetPropertyType().subscribe((data: any | undefined) => {
      this.propertyTypeList = data;
    });
  }

  getEmiratesList() {
    this.listingSevice.getEmirates().subscribe((data: any | undefined) => {
      this.EmirateList = data;
    });
  }

  getLocationList() {
    this.listingSevice.getLocation().subscribe((data: any | undefined) => {
      this.LocationList = data;
    });
  }

  getSubLocationList() {
    this.listingSevice
    .GetAllSubLocation()
    .subscribe((data: any | undefined) => {
      this.SubLocationList = data;
    });
  }

  setInitialSearchForm() {
    this.searchViewingForm = new FormGroup({
      filterStatus: new FormControl(),
      filterReference: new FormControl(),
      filterAssignedTo: new FormControl(),
      filterListingReference: new FormControl(),
      filterListingPurpose: new FormControl(),
      filterListingPropertyType: new FormControl(),
      filterListingEmirate: new FormControl(),
      filterListingLocation: new FormControl(),
      filterListingSubLocation: new FormControl(),
      filterLeadReference: new FormControl(),
      filterLeadFirstName: new FormControl(),
      filterLeadLastName: new FormControl(),
      filterFromStartDate: new FormControl(),
      filterToStartDate: new FormControl(),
      filterFromEndDate: new FormControl(),
      filterToEndDate: new FormControl(),
      filterCreatedBy: new FormControl(),
      filterFromCreatedDate: new FormControl(),
      filterToCreatedDate: new FormControl(),
      filterUpdatedBy: new FormControl(),
      filterFromUpdatedDate: new FormControl(),
      filterToUpdatedDate: new FormControl(),
    });
  }

  onAdd() {
    this.data.AddViewing=true;
    this.data.EditViewing = false;
    this.data.Id = 0;
    this.viewingService.OpenAddViewing(this.data);
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
  }

  openViewing(id:any) {
    this.data.AddViewing=false;
    this.data.EditViewing = true;
    this.data.Id = id;
    this.selectedViewingId = id;
    setTimeout(() => {
      this.isDraweropen = true;
    }, 1000);
    this.viewingService.OpenAddViewing(this.data);
    this.cdr.detectChanges();
  }

  OnSort(field: string) {
    if (this.sortColumn === field) {
      this.sortDir = this.sortDir === true ? false : true;
    } else {
      this.sortColumn = field;
      this.sortDir = false;
    }
    this.pageNumber = 1;
    this.searchViewing();
  }

  renderPage(event:any ) {
    this.pageNumber = event;
    this.searchViewing();
  }

  searchViewing() {
    this.IsLoading = true;
    this.viewingService.GetAllViewings({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortColumn: this.sortColumn,
      sortDir: this.sortDir,
      status: this.searchViewingForm.value?.filterStatus,
      reference: this.searchViewingForm.value?.filterReference,
      assignedTo: this.searchViewingForm.value?.filterAssignedTo,
      listingReference: this.searchViewingForm.value?.filterListingReference,
      purpose: this.searchViewingForm.value?.filterListingPurpose,
      propertyType: this.searchViewingForm.value?.filterListingPropertyType,
      emirate: this.searchViewingForm.value?.filterListingEmirate,
      location: this.searchViewingForm.value?.filterListingLocation,
      subLocation: this.searchViewingForm.value?.filterListingSubLocation,
      leadReference: this.searchViewingForm.value?.filterLeadReference,
      leadFirstName: this.searchViewingForm.value?.filterLeadFirstName,
      leadLastName: this.searchViewingForm.value?.filterLeadLastName,
      fromStartDate: this.searchViewingForm.value?.filterFromStartDate,
      toStartDate: this.searchViewingForm.value?.filterToStartDate,
      fromEndDate: this.searchViewingForm.value?.filterFromEndDate,
      toEndDate: this.searchViewingForm.value?.filterToEndDate,
      createdBy: this.searchViewingForm.value?.filterCreatedBy,
      fromCreated: this.searchViewingForm.value?.filterFromCreatedDate,
      toCreated: this.searchViewingForm.value?.filterToCreatedDate,
      updatedBy: this.searchViewingForm.value?.filterUpdatedBy,
      fromUpdated: this.searchViewingForm.value?.filterFromUpdatedDate,
      toUpdated: this.searchViewingForm.value?.filterToUpdatedDate,
      companyId: this.userData.companyId,
      roleId: this.userData.roleId,
      userId: this.userData.id
    }).subscribe(data => {
       this.IsLoading = false;
        this.ViewingList = data;
        if(this.ViewingList.length > 0) {
        this.totalRecord = this.ViewingList[0].totalCount;
        }
        else {
          this.totalRecord = 0;
        }
        this.cdr.detectChanges();
    })
  }

  filterViewing() {
    this.pageSize = 25;
    this.pageNumber = 1;
    this.IsLoading = true;
    this.searchViewing();
  }

  MinCharSearch(e:any,data:any) {
    switch(data) {
      case "Reference":
        if (this.searchViewingForm.value?.filterReference.length >= 3 || (e.target.value.length == 0 && this.isFilterRef )) {
          this.isFilterRef = false;
          if(this.searchViewingForm.value?.filterReference.length >= 3) {
            this.isFilterRef = true;
          }
          this.filterViewing();
        }
        break;
        case "ListingReference":
          if (this.searchViewingForm.value?.filterListingReference.length >= 3 || (e.target.value.length == 0 && this.isFilterListingRef )) {
            this.isFilterListingRef = false;
            if(this.searchViewingForm.value?.filterListingReference.length >= 3) {
              this.isFilterListingRef = true;
            }
            this.filterViewing();
          }
          break;
          case "LeadReference":
            if (this.searchViewingForm.value?.filterLeadReference.length >= 3 || (e.target.value.length == 0 && this.isFilterLeadReference )) {
              this.isFilterLeadReference = false;
              if(this.searchViewingForm.value?.filterLeadReference.length >= 3) {
                this.isFilterLeadReference = true;
              }
              this.filterViewing();
            }
            break;
            case "LeadFirstName":
            if (this.searchViewingForm.value?.filterLeadFirstName.length >= 3 || (e.target.value.length == 0 && this.isFilterLeadFirstName )) {
              this.isFilterLeadFirstName = false;
              if(this.searchViewingForm.value?.filterLeadFirstName.length >= 3) {
                this.isFilterLeadFirstName = true;
              }
              this.filterViewing();
            }
            break;
            case "LeadLastName":
            if (this.searchViewingForm.value?.filterLeadLastName.length >= 3 || (e.target.value.length == 0 && this.isFilterLeadLastName )) {
              this.isFilterLeadLastName = false;
              if(this.searchViewingForm.value?.filterLeadLastName.length >= 3) {
                this.isFilterLeadLastName = true;
              }
              this.filterViewing();
            }
            break;
            case "CreatedBy":
            if (this.searchViewingForm.value?.filterCreatedBy.length >= 3 || (e.target.value.length == 0 && this.isFilterCreatedBy )) {
              this.isFilterCreatedBy = false;
              if(this.searchViewingForm.value?.filterCreatedBy.length >= 3) {
                this.isFilterCreatedBy = true;
              }
              this.filterViewing();
            }
            break;
            case "UpdatedBy":
            if (this.searchViewingForm.value?.filterUpdatedBy.length >= 3 || (e.target.value.length == 0 && this.isFilterUpdatedBy )) {
              this.isFilterUpdatedBy = false;
              if(this.searchViewingForm.value?.filterUpdatedBy.length >= 3) {
                this.isFilterUpdatedBy = true;
              }
              this.filterViewing();
            }
            break;
      
    }
  }

  getAllViewings() {
    this.IsLoading = true;
    this.viewingService.GetAllViewings({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortColumn: this.sortColumn,
      sortDir: this.sortDir,
      status: this.searchViewingForm.value?.filterStatus,
      reference: this.searchViewingForm.value?.filterReference,
      assignedTo: this.searchViewingForm.value?.filterAssignedTo,
      listingReference: this.searchViewingForm.value?.filterListingReference,
      purpose: this.searchViewingForm.value?.filterListingPurpose,
      propertyType: this.searchViewingForm.value?.filterListingPropertyType,
      emirate: this.searchViewingForm.value?.filterListingEmirate,
      location: this.searchViewingForm.value?.filterListingLocation,
      subLocation: this.searchViewingForm.value?.filterListingSubLocation,
      leadReference: this.searchViewingForm.value?.filterLeadReference,
      leadFirstName: this.searchViewingForm.value?.filterLeadFirstName,
      leadLastName: this.searchViewingForm.value?.filterLeadLastName,
      fromStartDate: this.searchViewingForm.value?.filterFromStartDate,
      toStartDate: this.searchViewingForm.value?.filterToStartDate,
      fromEndDate: this.searchViewingForm.value?.filterFromEndDate,
      toEndDate: this.searchViewingForm.value?.filterToEndDate,
      createdBy: this.searchViewingForm.value?.filterCreatedBy,
      fromCreated: this.searchViewingForm.value?.filterFromCreatedDate,
      toCreated: this.searchViewingForm.value?.filterToCreatedDate,
      updatedBy: this.searchViewingForm.value?.filterUpdatedBy,
      fromUpdated: this.searchViewingForm.value?.filterFromUpdatedDate,
      toUpdated: this.searchViewingForm.value?.filterToUpdatedDate,
      companyId: this.userData.companyId,
      roleId: this.userData.roleId,
      userId: this.userData.id
    }).subscribe(data => {
       this.IsLoading = false;
        this.ViewingList = data;
        if(this.ViewingList.length > 0) {
        this.totalRecord = this.ViewingList[0].totalCount;
        }
        else {
          this.totalRecord = 0;
        }
        this.cdr.detectChanges();
    })
  }

  getAllUser() {
    this.dropdownService
      .GetAllUserByCompany(this.userData.companyId)
      .subscribe((data: any | undefined) => {
        this.userList = data;
      });
  }

  openColumnSettings(): Promise<boolean> {
    let columnOrder = this.columnOrder
    this.tempcolumnOrder = JSON.parse(JSON.stringify(columnOrder));
    return new Promise<boolean>((resolve) => {
      this.modalColumnRef = this.modalColumnService.open(this.modalcolumnContent, { size: 'md' });
      this.modalColumnRef.result.then(resolve, resolve);
    });
  }

  async closeColumnSettings(): Promise<void> {
    this.modalColumnRef.close(this.modalConfig);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tempcolumnOrder, event.previousIndex, event.currentIndex);
  }

  saveColumnSettings() {
    this.IsLoading = true;
    let tempColumnOrder:any = this.tempcolumnOrder;
    this.columnOrder = JSON.parse(JSON.stringify(tempColumnOrder));
    this.viewingService.saveColumnOrder({
      userId: this.userData.id,
      tableName: 'Viewings',
      columnDetails: this.columnOrder
    }).subscribe((data:any) => {
      this.IsLoading = false;
      this.cdr.detectChanges();
      this.closeColumnSettings();
    })
  }

  getColumnOrder(){
      this.IsLoading = true;
      this.viewingService
        .getColumnOrder(this.userData.id,'Viewings')
        .subscribe((data: any | undefined) => {
          if(data != null && data.length > 0) {
          this.columnOrder = data;
          }
          else {
            this.columnOrder = this.DeafultcolumnOrder;
          }
          this.getAllViewings();
          this.IsLoading = false;
        });

      }
}
