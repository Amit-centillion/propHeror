import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { AuthService } from 'src/app/modules/auth';
import { DealsService } from 'src/app/modules/auth/services/deals.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
})
export class DealsComponent implements OnInit {
  chartOptions: any = {};
  DealsReportDetails: any;
  userData: any;
  reportForm: FormGroup;
  IsLoading: boolean = false;
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

  constructor(
    private authService: AuthService,
    private dealsService: DealsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    var uData = this.authService.userValue;
    if (uData != null) {
      this.userData = JSON.parse(uData);
    }
    this.initReportForm(); 
    this.chartOptions = getChartOptions();
    this.GetAllDealReportDeails();
  }

  initReportForm() {
    this.reportForm = new FormGroup({
      filterCreatedDate: new FormControl(1),
      fromDate: new FormControl(),
      toDate: new FormControl(),
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
          this.chartOptions.series =  [
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
        this.chartOptions.series =  [
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
      this.GetAllDealReportDeails();
    } else {
      this.reportForm.controls['fromDate'].setValue(null);
      this.reportForm.controls['toDate'].setValue(null);
      // this.chartOptions.series = [
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
    }
  }

  changeDate() {
    if((this.reportForm.controls['fromDate'].value != null && this.reportForm.controls['fromDate'].value != '') && 
    (this.reportForm.controls['toDate'].value != null && this.reportForm.controls['toDate'].value != '')) {
      this.GetAllDealReportDeails();
  }
}
}

function getChartOptions() {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');

  const primaryColor = '#3c96d2';
  const successColor = getCSSVariableValue('--bs-success');
  const dangerColor = getCSSVariableValue('--bs-danger');

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
      offsetY: 10,
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
        enabled: false,
      },
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
    colors: [primaryColor, successColor, dangerColor],
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
