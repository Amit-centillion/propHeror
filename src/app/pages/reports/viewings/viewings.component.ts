import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportsService } from 'src/app/modules/auth/services/reports.service';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-viewings',
  templateUrl: './viewings.component.html',
  styleUrls: ['./viewings.component.scss']
})
export class ViewingsComponent implements OnInit {
  IsLoading: boolean = false;
  reportForm: FormGroup;
  userData:any;
  chartOptions: any = {};
  chartOptionsTop10: any = {};
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
  constructor(private reportService: ReportsService,private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    var uData = this.authService.userValue;
    if(uData != null){
    this.userData= JSON.parse(uData);
    }
    this.chartOptions = getChartOptions();
    this.initReportForm(); 
    this.getAllViewingsReport();
  }
  initReportForm() {
    this.reportForm = new FormGroup({
      filterCreatedDate: new FormControl(1),
      fromDate: new FormControl(),
      toDate: new FormControl(),
    });
  }
  changeCreatedDate(event: any) {
    if (event != "7") {
      this.getAllViewingsReport();
    } else {
      this.reportForm.controls['fromDate'].setValue(null);
      this.reportForm.controls['toDate'].setValue(null);
      // this.chartOptions.series = [
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
    }
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
        this.chartOptions.series = [
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
      this.chartOptions.series = [
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
  changeDate() {
    if((this.reportForm.controls['fromDate'].value != null && this.reportForm.controls['fromDate'].value != '') && 
    (this.reportForm.controls['toDate'].value != null && this.reportForm.controls['toDate'].value != '')) {
      this.getAllViewingsReport();
  }
 }
}
function getChartOptions() {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');

  const primaryColor = "#3c96d2";
  const secondaryColor = getCSSVariableValue('--bs-secondary');
  const successColor = getCSSVariableValue('--bs-success');
  const dangerColor = getCSSVariableValue('--bs-danger');

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
