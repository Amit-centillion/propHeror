import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { data } from 'jquery';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { AuthService } from 'src/app/modules/auth';
import { ReportsService } from 'src/app/modules/auth/services/reports.service';

@Component({
  selector: 'app-agent-leaderboard',
  templateUrl: './agent-leaderboard.component.html',
  styleUrls: ['./agent-leaderboard.component.scss']
})
export class AgentLeaderboardComponent implements OnInit {

  chartOptions: any = {};
  reportForm: FormGroup;
  IsLoading: boolean = false;
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
  constructor(private reportService: ReportsService,private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    var uData = this.authService.userValue;
    if(uData != null){
    this.userData= JSON.parse(uData);
    }
    this.initReportForm(); 
    this.chartOptions = getChartOptions(400);
    this.getAgentLeaderReport();
  }

  initReportForm() {
    this.reportForm = new FormGroup({
      filterCreatedDate: new FormControl(1),
      filterBy: new FormControl(1),
      fromDate: new FormControl(),
      toDate: new FormControl(),
    });
  }


  changeCreatedDate(event: any) {
    if (event != "7") {
      this.getAgentLeaderReport();
    } else {
      this.reportForm.controls['fromDate'].setValue(null);
      this.reportForm.controls['toDate'].setValue(null);
      // if(this.reportForm.controls['filterBy'].value == 1)
      // this.chartOptions.series = [{
      //   name: 'Published Listings',
      //   data: [0],
      // },];
      // if(this.reportForm.controls['filterBy'].value == 2)
      // this.chartOptions.series = [{
      //   name: 'Successful Leads',
      //   data: [0],
      // },];
      // if(this.reportForm.controls['filterBy'].value == 3)
      // this.chartOptions.series = [{
      //   name: 'Successful Deals',
      //   data: [0],
      // },];
      // const labelColor = getCSSVariableValue('--bs-gray-500')
      // this.chartOptions.xaxis = {
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

  changeFilterBy() {
    if(this.reportForm.controls['filterCreatedDate'].value == "7") {
    if((this.reportForm.controls['fromDate'].value != null && this.reportForm.controls['fromDate'].value != '') && 
    (this.reportForm.controls['toDate'].value != null && this.reportForm.controls['toDate'].value != '')) {
      this.getAgentLeaderReport();
  }
}
else {
  this.getAgentLeaderReport();
}
  }

  changeDate() {
    if((this.reportForm.controls['fromDate'].value != null && this.reportForm.controls['fromDate'].value != '') && 
    (this.reportForm.controls['toDate'].value != null && this.reportForm.controls['toDate'].value != '')) {
      this.getAgentLeaderReport();
  }
}

  getAgentLeaderReport() {
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
      this.chartOptions.series = [{
        name: 'Published Listings',
        data: result?.length > 0 ? result?.map((x:any) => x.totalCount): [],
      },];
      if(this.reportForm.controls['filterBy'].value == 2)
      this.chartOptions.series = [{
        name: 'Successful Leads',
        data: result?.length > 0 ? result?.map((x:any) => x.totalCount): [],
      },];
      if(this.reportForm.controls['filterBy'].value == 3)
      this.chartOptions.series = [{
        name: 'Successful Deals',
        data: result?.length > 0 ? result?.map((x:any) => x.totalCount): [],
      },];

      const labelColor = getCSSVariableValue('--bs-gray-500');
      if(result && result?.length == 0) {
        this.chartOptions.xaxis = {
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
        this.chartOptions.xaxis = {
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
          this.chartOptions.colors = color?.length > 0 ? color?.map((x:any) => x.color): [];
        }
      }
      console.log('chartOptions.xaxis',this.chartOptions.xaxis)
      this.IsLoading = false;
      this.cdr.detectChanges();
    })
  }


}



function getChartOptions(height: number) {
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



