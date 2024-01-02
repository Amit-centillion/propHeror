import { Component, ViewChild, OnInit,ChangeDetectorRef } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { AuthService } from 'src/app/modules/auth';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportsService } from 'src/app/modules/auth/services/reports.service';
import { DealsService } from 'src/app/modules/auth/services/deals.service';

const primaryColor = "#3c96d2";
const secondaryColor = getCSSVariableValue('--bs-secondary');
const infoColor = getCSSVariableValue('--bs-info');
const successColor = getCSSVariableValue('--bs-success');
const warningColor = getCSSVariableValue('--bs-warning');
const dangerColor = getCSSVariableValue('--bs-danger');

const goldenColor = "#d5a500";
const silverColor = "#b7b7b7";
const bronzeColor = "#a17419";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  IsLoading: boolean = false;
  reportForm: FormGroup;
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;
  constructor(
    private listingSevice: ListingService,
    private authService: AuthService,
    private reportService: ReportsService,
    private dealsService: DealsService,
    private cdr: ChangeDetectorRef
    ) {}

  chartOptionsListings: any = {};
  chartOptionsLeads: any = {};
  chartOptionsLeadsConversion: any = {};
  chartOptionsViewings: any = {};
  chartOptionsDeals: any = {};
  chartOptionsAgents: any = {};
  PermissionAccess:any=[];
  userData:any;
  FilterByList:any = [
    {
      id:1,
      text: 'Published Listings'
    },
    {
      id:2,
      text: 'Successful Leads'
    },
    {
      id:3,
      text: 'Successful Deals'
    }
  ]
  CreatedDateFilter:any = [
    {
      id:1,
      text: 'Last 30 Days (including Today)'
    },
     {
      id:8,
      text: 'Today'
    },
    {
      id:2,
      text: 'Yesterday',
    }
   ,
    {
      id: 3,
      text: 'Last 7 Days (including Today)'
    },
    {
      id:4,
      text: 'This Month',
    },
    {
      id:5,
      text: 'Last Month',
    },
    {
      id:6,
      text: 'All Time'
    },
    {
      id:7,
      text: 'Custom Range'
    }
  ]
  async openModal() {
    return await this.modalComponent.open();
  }

  getPermissionAccess(id:any) {
    var checkModule = this.PermissionAccess?.filter((x:any) => x.permissionId == id);
    if(checkModule?.length > 0) {
      return true;
    }
    return false;
  }


  ngOnInit(): void {
    var uData = this.authService.userValue;
    if(uData != null){
    this.userData= JSON.parse(uData);
    this.PermissionAccess = this.userData.permissionAccess;
    }
    this.initForm()
    this.chartOptionsListings = getChartOptionsListings(350);
    this.getListingReportDetail();
    this.chartOptionsLeads = getChartOptionsLeads(350);
    this.getAllLeadReport();
    this.chartOptionsLeadsConversion = getChartOptionsLeadsConversion(350);
    this.getAllLeadsConversationRet();
    this.chartOptionsViewings = getChartOptionsViewings();
    this.getAllViewingsReport();
    this.chartOptionsDeals = getChartOptionsDeals(350);
    this.GetAllDealReportDeails();
    this.chartOptionsAgents = getChartOptionsAgents(400);
    this.GetAllAgentReport();
  }
  initForm(){
    this.reportForm = new FormGroup({
      filterBy: new FormControl(1),
      filterCreatedDate: new FormControl(1),
      fromDate: new FormControl(),
      toDate: new FormControl(),
    })
  }
  changeFilterBy() {
    if(this.reportForm.controls['filterCreatedDate'].value == "7") {
    if((this.reportForm.controls['fromDate'].value != null && this.reportForm.controls['fromDate'].value != '') && 
    (this.reportForm.controls['toDate'].value != null && this.reportForm.controls['toDate'].value != '')) {
      this.GetAllAgentReport();
  }
}
else {
  this.GetAllAgentReport();
}
  }
  GetAllAgentReport(){
    this.IsLoading = true;
    this.reportService.getAgentRport({
      filterCreatedDateId : this.reportForm.controls['filterCreatedDate'].value,
      from: this.reportForm.controls['fromDate'].value,
      to: this.reportForm.controls['toDate'].value,
      filterBy: this.reportForm.controls['filterBy'].value,
      companyId: this.userData.companyId
    }).subscribe((result:any) => {
      console.log("result",result)
      if(this.reportForm.controls['filterBy'].value == 1)
      this.chartOptionsAgents.series = [{
        name: 'Published Listings',
        data: result?.length > 0 ? result?.map((x:any) => x.totalCount): [],
      },];
      if(this.reportForm.controls['filterBy'].value == 2)
      this.chartOptionsAgents.series = [{
        name: 'Successful Leads',
        data: result?.length > 0 ? result?.map((x:any) => x.totalCount): [],
      },];
      if(this.reportForm.controls['filterBy'].value == 3)
      this.chartOptionsAgents.series = [{
        name: 'Successful Deals',
        data: result?.length > 0 ? result?.map((x:any) => x.totalCount): [],
      },];

      const labelColor = getCSSVariableValue('--bs-gray-500');
      if(result && result?.length == 0) {
        this.chartOptionsAgents.xaxis = {
          categories:[''],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
        }
      }
      else {
        this.chartOptionsAgents.xaxis = {
          categories: result?.length > 0 ? result?.map((x:any) => x.rankInWords): [],
          data: result?.length > 0 ? result?.map((x:any) => x.userName
          ): [],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
        }
        const goldenColor = "#d5a500";
        const silverColor = "#b7b7b7";
        const bronzeColor = "#a17419";
        const primaryColor = "#3c96d2";
        var color = result?.map((x:any) => ({
          ...x,
          color: x.rank == 1 ? goldenColor : x.rank == 2 ? silverColor : x.rank == 3 ? bronzeColor : primaryColor
        }))
        if(color && color?.length > 0) {
          this.chartOptionsAgents.colors = color?.length > 0 ? color?.map((x:any) => x.color): [];
        }
      }
      
      this.IsLoading = false;
      this.cdr.detectChanges();
      })
  }
  getAllLeadReport(){
    this.IsLoading = true;
    this.reportService.getLeadReport({
      filterCreatedDateId: this.reportForm.controls['filterCreatedDate'].value,
      from: this.reportForm.controls['fromDate'].value,
      to: this.reportForm.controls['toDate'].value,
      companyId: this.userData.companyId
    }).subscribe((result:any) => {
      this.IsLoading = false;
      this.chartOptionsLeads.series =  [
        {
          name: 'Open',
          type: 'bar',
          data: result?.length > 0 ? result?.map((x:any) => x.openCount): [],
        },
        {
          name: 'Closed - Successful',
          type: 'bar',
          data: result?.length > 0 ? result?.map((x:any) => x.closedSuccessfulCount): [],
        },
        {
          name: 'Closed - Unsuccessful',
          type: 'bar',
          data: result?.length > 0 ? result?.map((x:any) => x.closedUnSuccessfulCount): [],
        },
      ]
      const labelColor = getCSSVariableValue('--bs-gray-500');
      this.chartOptionsLeads.xaxis= {
        categories: result?.length > 0 ? result?.map((x:any) => x.leadTypeName): [],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
        tooltip: {
          enabled: false
        }
      }
      this.cdr.detectChanges();
    });

  }
  
  getListingReportDetail() {
    this.IsLoading = true;
    this.reportService.getListingReport({
      filterCreatedDateId : this.reportForm.controls['filterCreatedDate'].value,
      from: this.reportForm.controls['fromDate'].value,
      to: this.reportForm.controls['toDate'].value,
      companyId: this.userData.companyId
    }).subscribe((result:any) => {
      this.chartOptionsListings.series = [{
        name: 'Published Listings',
        data: result?.residentialForSale == 0 && result?.residentialForRent == 0 && result?.commercialForSale == 0 && result?.commercialForRent == 0 ? [] : [result?.residentialForSale, result?.residentialForRent, result?.commercialForSale, result?.commercialForRent],
      },];
      const labelColor = getCSSVariableValue('--bs-gray-500')
      if(result?.residentialForSale == 0 && result?.residentialForRent == 0 && result?.commercialForSale == 0 && result?.commercialForRent == 0) {
      
      this.chartOptionsListings.xaxis = {
        categories: [''],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      }
    }
    else {
      this.chartOptionsListings.xaxis = {
        categories: ['Residential for Sale', 'Residential for Rent', 'Commercial for Sale', 'Commercial for Rent'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      }
    }
      this.IsLoading = false;
      this.cdr.detectChanges();
    })
  }
  getAllLeadsConversationRet(){
    this.IsLoading = true;
    this.reportService.getLeadReportWithConversion({
      filterCreatedDateId: this.reportForm.controls['filterCreatedDate'].value,
      from: this.reportForm.controls['fromDate'].value,
      to: this.reportForm.controls['toDate'].value,
      companyId: this.userData.companyId
    }).subscribe((result:any) => {
      this.IsLoading = false;
      result = result.map((x:any) => ({
        ...x,
        conversionRate: x.conversionRate.toFixed(2)
      }));
      this.chartOptionsLeadsConversion.series = [
        {
          name: 'Leads',
          type: 'column',
          data: result?.length > 0 ? result?.map((x:any) => x.leads): [],
        },
        {
          name: 'Conversion Rate',
          type: 'area',
          data: result?.length > 0 ? result?.map((x:any) => x.conversionRate): [],
        },
      ];
      const labelColor = getCSSVariableValue('--bs-gray-500');
      this.chartOptionsLeadsConversion.xaxis =  { categories: result?.length > 0 ? result?.map((x:any) => x.portal): [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      tooltip: {
        enabled: false
      }
    }
      this.cdr.detectChanges();
    });
  }
  getAllViewingsReport(){
    this.IsLoading = true;
    this.reportService.getViewingReport({
      filterCreatedDateId: this.reportForm.controls['filterCreatedDate'].value,
      from: this.reportForm.controls['fromDate'].value,
      to: this.reportForm.controls['toDate'].value,
      companyId: this.userData.companyId
    }).subscribe((result:any) => {
      this.IsLoading = false;
      if(result?.saleSchedule == 0 && result?.rentSchedule == 0 &&  result?.saleSuccessful == 0 && result?.rentSuccessful == 0 && result?.saleUnSuccessful == 0 && result?.rentUnSuccessful == 0 && result?.saleClosed == 0 && result?.rentClosed ==0){
        this.chartOptionsViewings.series = [
          {
            name: 'Scheduled',
            type: 'bar',
            data: [] ,
          },
          {
            name: 'Successful',
            type: 'bar',
            data: [],
          },
          {
            name: 'Unsuccessful',
            type: 'bar',
            data: [],
          },
          {
            name: 'Closed',
            type: 'bar',
            data: [],
          },
        ];
      }
      else {
      this.chartOptionsViewings.series = [
        {
          name: 'Scheduled',
          type: 'bar',
          data: [result?.saleSchedule, result?.rentSchedule],
        },
        {
          name: 'Successful',
          type: 'bar',
          data: [result?.saleSuccessful, result?.rentSuccessful],
        },
        {
          name: 'Unsuccessful',
          type: 'bar',
          data: [result?.saleUnSuccessful, result?.rentUnSuccessful],
        },
        {
          name: 'Closed',
          type: 'bar',
          data: [result?.saleClosed, result?.rentClosed],
        },
      ];
    }
      this.cdr.detectChanges();
    });
  }
  GetAllDealReportDeails() {
    this.IsLoading = true;
    this.dealsService
      .GetAllDealReportDeails({
        filterCreatedDateId : this.reportForm.controls['filterCreatedDate'].value,
        from: this.reportForm.controls['fromDate'].value,
        to: this.reportForm.controls['toDate'].value,
        companyId: this.userData.companyId
      })
      .subscribe((data: any) => {
        this.IsLoading = false;
        if(data?.saleOpen == 0 &&  data?.rentOpen == 0 && data?.saleClosedSuccessful == 0 &&  data?.rentClosedSuccessful == 0 && data?.saleClosedUnSuccessful == 0 &&  data?.rentClosedUnSuccessful == 0) {
          this.chartOptionsDeals.series =  [
            {
              name: 'Open',
              type: 'bar',
              data: [],
            },
            {
              name: 'Closed - Successful',
              type: 'bar',
              data: [],
            },
            {
              name: 'Closed - Unsuccessful',
              type: 'bar',
              data: [],
            },
            
          ]
        }
        else {
        this.chartOptionsDeals.series =  [
          {
            name: 'Open',
            type: 'bar',
            data: [data?.saleOpen, data?.rentOpen],
          },
          {
            name: 'Closed - Successful',
            type: 'bar',
            data: [data?.saleClosedSuccessful, data?.rentClosedSuccessful],
          },
          {
            name: 'Closed - Unsuccessful',
            type: 'bar',
            data: [data?.saleClosedUnSuccessful, data?.rentClosedUnSuccessful],
          },
          
        ]
      }
        this.cdr.detectChanges();
      });
  }
  changeCreatedDate(event: any) {
    if (event != "7") {
      this.getListingReportDetail();
      this.getAllLeadReport();
      this.getAllLeadsConversationRet();
      this.getAllViewingsReport();
      this.GetAllDealReportDeails();
      this.GetAllAgentReport();
    } else {
      this.reportForm.controls['fromDate'].setValue(null);
      this.reportForm.controls['toDate'].setValue(null);
    //   this.chartOptionsListings.series = [{
    //     name: 'Published Listings',
    //     data: [0, 0, 0, 0],
    //   }];
    //   const labelColor = getCSSVariableValue('--bs-gray-500');
    //   this.chartOptionsLeads.series =  [
    //     {
    //       name: 'Open',
    //       type: 'bar',
    //       data: [0],
    //     },
    //     {
    //       name: 'Closed - Successful',
    //       type: 'bar',
    //       data: [0],
    //     },
    //     {
    //       name: 'Closed - Unsuccessful',
    //       type: 'bar',
    //       data: [0],
    //     },
    //   ]

    //   this.chartOptionsLeads.xaxis= {
    //     categories: [],
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //     labels: {
    //       style: {
    //         colors: labelColor,
    //         fontSize: '12px',
    //       },
    //     },
    //     tooltip: {
    //       enabled: false
    //     }
    //   }
    //   this.chartOptionsLeadsConversion.series = [
    //     {
    //       name: 'Leads',
    //       type: 'column',
    //       data: [],
    //     },
    //     {
    //       name: 'Conversion Rate',
    //       type: 'area',
    //       data: [],
    //     },
    //   ];
      
    //   this.chartOptionsLeadsConversion.xaxis =  { categories: [],
    //   axisBorder: {
    //     show: false,
    //   },
    //   axisTicks: {
    //     show: false,
    //   },
    //   labels: {
    //     style: {
    //       colors: labelColor,
    //       fontSize: '12px',
    //     },
    //   },
    //   tooltip: {
    //     enabled: false
    //   }
    // }
    // this.chartOptionsViewings.series = [
    //   {
    //     name: 'Scheduled',
    //     type: 'bar',
    //     data: [0,0],
    //   },
    //   {
    //     name: 'Successful',
    //     type: 'bar',
    //     data: [0,0],
    //   },
    //   {
    //     name: 'Unsuccessful',
    //     type: 'bar',
    //     data: [0,0],
    //   },
    //   {
    //     name: 'Closed',
    //     type: 'bar',
    //     data: [0,0],
    //   },
    // ];
      
    // this.chartOptionsDeals.series = [
    //   {
    //     name: 'Open',
    //     type: 'bar',
    //     data: [0,0],
    //   },
    //   {
    //     name: 'Closed - Successful',
    //     type: 'bar',
    //     data: [0,0],
    //   },
    //   {
    //     name: 'Closed - Unsuccessful',
    //     type: 'bar',
    //     data: [0,0],
    //   },
    // ]
    // if(this.reportForm.controls['filterBy'].value == 1)
    //   this.chartOptionsAgents.series = [{
    //     name: 'Published Listings',
    //     data: [0],
    //   },];
    //   if(this.reportForm.controls['filterBy'].value == 2)
    //   this.chartOptionsAgents.series = [{
    //     name: 'Successful Leads',
    //     data: [0],
    //   },];
    //   if(this.reportForm.controls['filterBy'].value == 3)
    //   this.chartOptionsAgents.series = [{
    //     name: 'Successful Deals',
    //     data: [0],
    //   },];
    // this.chartOptionsAgents.xaxis = {
    //   categories: [],
    // axisBorder: {
    //   show: false,
    // },
    // axisTicks: {
    //   show: false,
    // },
    // labels: {
    //   style: {
    //     colors: labelColor,
    //     fontSize: '12px',
    //   },
    // },
    // }
    }
  }
  changeDate() {
    if((this.reportForm.controls['fromDate'].value != null && this.reportForm.controls['fromDate'].value != '') && 
    (this.reportForm.controls['toDate'].value != null && this.reportForm.controls['toDate'].value != '')) {
      this.getListingReportDetail();
      this.getAllLeadReport();
      this.getAllViewingsReport();
      this.GetAllAgentReport();
      this.GetAllDealReportDeails();
      this.getAllLeadsConversationRet();
  }
}
}

function getChartOptionsListings(height: number) {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  return {
    series: [
      {
        name: 'Published Listings',
        data: [0,0,0,0],
      }
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: false,
        columnWidth: '16px',
        
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    colors: [primaryColor, successColor, warningColor, '#7239ea'],
    xaxis: {
      categories: ['Residential for Sale', 'Residential for Rent', 'Commercial for Sale', 'Commercial for Rent'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      forceNiceScale: true,
      labels: {
        formatter:function(val:number) {
          return val.toFixed(0);
        },
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return val.toFixed(0);
        },
      },
    },
   
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}

function getChartOptionsLeads(value: any) {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');

  const baseColor = getCSSVariableValue('--bs-primary');
  const baseLightColor = getCSSVariableValue('--bs-primary-light');
  const secondaryColor = getCSSVariableValue('--bs-info');

  return {
    series: [
      {
        name: 'Open',
        type: 'bar',
        data: [0],
      },
      {
        name: 'Closed - Successful',
        type: 'bar',
        data: [0],
      },
      {
        name: 'Closed - Unsuccessful',
        type: 'bar',
        data: [0],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      stacked: true,
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '16px',
      },
    },
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      show: false,
      width: 0,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      forceNiceScale: true,
      tickAmount: 1,
      labels: {
        formatter:function(val:number) {
          return val.toFixed(0);
        },
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return val;
        },
      },
    },
    colors: [primaryColor, successColor, dangerColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };
}

function getChartOptionsLeadsConversion(value: any) {
 
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');

  const columnColors = ['#FF5733', '#33FF57', '#5733FF', '#FF5733', '#33FF57', '#5733FF', '#FF5733', '#33FF57', '#5733FF', '#FF5733'];
  
  return {
    series: [
      {
        name: 'Leads',
        type: 'column',
        data: [0,0,0,0,0,0,0,0,0,0],
        colors: columnColors,
      },
      {
        name: 'Conversion Rate',
        type: 'area',
        data: [0,0,0,0,0,0,0,0,0,0],
      },
    ],
    chart: {
      zoom: {
        enabled: false, // Disable zooming
      },
      pan: {
        enabled: false, // Disable panning
      },
      width: '100%',
      fontFamily: 'inherit',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        distribution: true,
        horizontal: false,
        
        columnWidth: '16px',
        fill : {
          opacity : 1,
        }
      },
      
    },
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: [0,2],
    },
    xaxis: {
      categories: [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        trim: false,
        rotate: -45,
        style: {
          cssClass: 'ph-apexcharts-xaxis-label',
          fontSize: '10px',
          maxWidth: '100px', // Set your desired max width using CSS
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis', // Add ellipsis (...) for truncated labels
        },
        show: true,
        // rotate: -45,
        // rotateAlways: true,
        // showDuplicates: false,
        // trim: true,
        minHeight: undefined,
        hideOverlappingLabels: false,
        
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: [{
      forceNiceScale: true,
      min:0,
        labels: {
          formatter: function (val:number){
            return val;
          },
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      {
        opposite: true,
        max: 100,
        min: 0,
        labels: {
          formatter:function(val:number) {
            return val.toFixed(0) + '%';
          },
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      }
    ],
    
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val:number,{ seriesIndex }: { seriesIndex: number}) {
          if (seriesIndex === 0) {
            return val;
          } else if (seriesIndex === 1) {
            return val + '%'; // Add '%' sign for Conversion
          }
          return val;
        },
      },
    },
    colors: [primaryColor, "#333"],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };
}

function getChartOptionsViewings() {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');

  return {
    series: [
      {
        name: 'Scheduled',
        type: 'bar',
        data: [0,0],
      },
      {
        name: 'Successful',
        type: 'bar',
        data: [0,0],
      },
      {
        name: 'Unsuccessful',
        type: 'bar',
        data: [0,0],
      },
      {
        name: 'Closed',
        type: 'bar',
        data: [0,0],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      stacked: true,
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '16px',
      },
    },
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      show: false,
      width: 0,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Sale', 'Rent'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      forceNiceScale: true,
      tickAmount: 1,
      labels: {
        formatter:function(val:number) {
          return val.toFixed(0);
        },
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return val;
        },
      },
    },
    colors: [primaryColor, successColor, dangerColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };
}

function getChartOptionsDeals(value: any) {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');

  return {
    series: [
      {
        name: 'Open',
        type: 'bar',
        data: [0,0],
      },
      {
        name: 'Closed - Successful',
        type: 'bar',
        data: [0,0],
      },
      {
        name: 'Closed - Unsuccessful',
        type: 'bar',
        data: [0,0],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      stacked: true,
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '16px',
      },
    },
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      show: false,
      width: 0,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Sale', 'Rent'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      forceNiceScale: true,
      tickAmount:1,
      labels: {
        formatter:function(val:number) {
          return val.toFixed(0);
        },
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return val;
        },
      },
    },
    colors: [primaryColor, successColor, dangerColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };
}

function getChartOptionsAgents(height: number) {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  const primaryColor = "#3c96d2";
  const goldenColor = "#d5a500";
  const silverColor = "#b7b7b7";
  const bronzeColor = "#a17419";

  return {
    series: [
      {
        name: 'Published Listings',
        data: [0],
      }
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: false,
        columnWidth: '16px',
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    colors:[ goldenColor, silverColor, bronzeColor, primaryColor, primaryColor, primaryColor , primaryColor, primaryColor, primaryColor,primaryColor, primaryColor],
    xaxis: {
      categories: [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      forceNiceScale: true,
      labels: {
        formatter:function(val:number) {
          return val.toFixed(0);
        },
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      custom: function(series:any) {        
        return '<div style="font-size:10px !important;padding:2px ">'+ series.w.globals.lastXAxis.data[series.dataPointIndex]+
        '<div style="padding-top:5px "> <span style="border-radius:100%;height:5px;width:5px;max-height:5px;max-width:5px;min-height:5px;min-width:5px;background-color:'+series.w.globals.colors[series.dataPointIndex]+';">&nbsp &nbsp&nbsp</span> '+series.w.globals.seriesNames+ '<b> '+series.series[0][series.dataPointIndex]+'</b></div>'+
        '</div>';
      },
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return val;
        },
      },
    },
   
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}


