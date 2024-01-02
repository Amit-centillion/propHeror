import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { AuthService } from 'src/app/modules/auth';
import { ReportsService } from 'src/app/modules/auth/services/reports.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
})
export class ListingsComponent implements OnInit {
  chartOptions: any = {};
  reportForm: FormGroup;
  IsLoading: boolean = false;
  userData:any;
  constructor(private reportService: ReportsService,private authService: AuthService, private cdr: ChangeDetectorRef) {}
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

  ngOnInit(): void {
    var uData = this.authService.userValue;
    if(uData != null){
    this.userData= JSON.parse(uData);
    }
    this.initReportForm(); 
    this.chartOptions = getChartOptions(350);
    this.getListingReportDetail();
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
      this.getListingReportDetail();
    } else {
      this.reportForm.controls['fromDate'].setValue(null);
      this.reportForm.controls['toDate'].setValue(null);
      // this.chartOptions.series = [{
      //   name: 'Published Listings',
      //   data: [0, 0, 0, 0],
      // },];
    }
  }

  changeDate() {
    if((this.reportForm.controls['fromDate'].value != null && this.reportForm.controls['fromDate'].value != '') && 
    (this.reportForm.controls['toDate'].value != null && this.reportForm.controls['toDate'].value != '')) {
      this.getListingReportDetail();
  }
}

  getListingReportDetail() {
    this.IsLoading = true;
    this.reportService.getListingReport({
      filterCreatedDateId : this.reportForm.controls['filterCreatedDate'].value,
      from: this.reportForm.controls['fromDate'].value,
      to: this.reportForm.controls['toDate'].value,
      companyId: this.userData.companyId
    }).subscribe((result:any) => {
      
      const labelColor = getCSSVariableValue('--bs-gray-500')
      if(result?.residentialForSale == 0 && result?.residentialForRent == 0 && result?.commercialForSale == 0 && result?.commercialForRent == 0) {
        this.chartOptions.series = [{
          name: 'Published Listings',
          data:[],
        },];
      this.chartOptions.xaxis = {
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
      this.chartOptions.series = [{
        name: 'Published Listings',
        data:[result?.residentialForSale, result?.residentialForRent, result?.commercialForSale, result?.commercialForRent],
      },];
      this.chartOptions.xaxis = {
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
}

function getChartOptions(height: number) {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');

  const primaryColor = '#3c96d2';
  const successColor = getCSSVariableValue('--bs-success');
  const warningColor = getCSSVariableValue('--bs-warning');
  const goldenColor = '#d5a500';

  return {
    series: [
      {
        name: 'Published Listings',
        data: [0, 0, 0, 0],
      },
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
