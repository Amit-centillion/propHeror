import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { AuthService } from 'src/app/modules/auth';
import { ReportsService } from 'src/app/modules/auth/services/reports.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  leadStatuschartOptions: any = {};
  leadConversionchartOptions:any = {};

  reportForm: FormGroup;
  IsLoading: boolean = false;
  userData:any;
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
    this.initReportForm(); 
    this.leadStatuschartOptions = getLeadStatusChartOptions();
    this.leadConversionchartOptions = getLeadConversionChartOptions();
    this.getLeadConversionRateReportDetail();
    this.getLeadStatusReportDetail();
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
      this.getLeadStatusReportDetail();
      this.getLeadConversionRateReportDetail();
    } else {
      const labelColor = getCSSVariableValue('--bs-gray-500');
      this.reportForm.controls['fromDate'].setValue(null);
      this.reportForm.controls['toDate'].setValue(null);
    //   this.leadStatuschartOptions.series =  [
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

    //   this.leadStatuschartOptions.xaxis= {
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

    //   this.leadConversionchartOptions.series = [
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
      
    //   this.leadConversionchartOptions.xaxis =  { categories: [],
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
    }
  }

  changeDate() {
    if((this.reportForm.controls['fromDate'].value != null && this.reportForm.controls['fromDate'].value != '') && 
    (this.reportForm.controls['toDate'].value != null && this.reportForm.controls['toDate'].value != '')) {
      this.getLeadStatusReportDetail();
      this.getLeadConversionRateReportDetail();
  }
}

  getLeadStatusReportDetail() {
    this.IsLoading = true;
    this.reportService.getLeadReport({
      filterCreatedDateId : this.reportForm.controls['filterCreatedDate'].value,
      from: this.reportForm.controls['fromDate'].value,
      to: this.reportForm.controls['toDate'].value,
      companyId: this.userData.companyId
    }).subscribe((result:any) => {
      this.leadStatuschartOptions.series =  [
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
      this.leadStatuschartOptions.xaxis= {
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
      this.IsLoading = false;
      this.cdr.detectChanges();
    })
  }

  getLeadConversionRateReportDetail() {
    this.IsLoading = true;
    this.reportService.getLeadReportWithConversion({
      filterCreatedDateId : this.reportForm.controls['filterCreatedDate'].value,
      from: this.reportForm.controls['fromDate'].value,
      to: this.reportForm.controls['toDate'].value,
      companyId: this.userData.companyId
    }).subscribe((result:any) => {
      result = result.map((x:any) => ({
        ...x,
        conversionRate: x.conversionRate.toFixed(2)
      }));
      this.leadConversionchartOptions.series = [
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
      
      this.leadConversionchartOptions.xaxis =  { categories: result?.length > 0 ? result?.map((x:any) => x.portal): [],
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
      this.IsLoading = false;
     
    })
  }
}

function getLeadStatusChartOptions() {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');

  const primaryColor = "#3c96d2";
  const successColor = getCSSVariableValue('--bs-success');
  const dangerColor = getCSSVariableValue('--bs-danger');

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

function getLeadConversionChartOptions() {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const primaryColor = "#3c96d2";

  return {
    series: [
      {
        name: 'Leads',
        type: 'column',
        data: [0,0,0,0,0,0,0,0,0,0],
      },
      {
        name: 'Conversion Rate',
        type: 'area',
        data: [0,0,0,0,0,0,0,0,0,0],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        // distribution: true,
        horizontal: false,
        
        columnWidth: '16px',
        // fill : {
        //   opacity : 1,
        // }
        stroke: {
          curve: 'straight',
          width: 0,
        },
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
      width: [0, 2]
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
    yaxis: [{
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
      {
        opposite: true,
        labels: {
          formatter:function(val:number) {
            return val.toFixed(0) + '%';
          },
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
        max: 100,
        min: 0,
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

