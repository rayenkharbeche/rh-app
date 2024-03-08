import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { RequestleaveService } from '../requestleave/service/requestleave.service';
import { AuthorizationService } from '../requestauthorization/service/authorization.service';
import { GeneralcontrolService } from '../setup/service/generalcontrol.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { MatLabel } from '@angular/material/form-field';
import * as Highcharts from 'highcharts';
import { AuthService } from '../auth/service/auth.service';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartRef: any;
  oneToOne = true;
    updateFlag: any;




  sickDays!: number;
  employeeNumber!:number;
  currentUser: any;
  remoteDays!: number;
  remoteday!:number;
  authorizationMaxNbr!: number;
  adminIsConnected!: boolean;
  availableEmployee!: number;

  constructor(private chartsData: DashboardChartsData,
    private requestleaveservice: RequestleaveService,
    private authorizationService: AuthorizationService,
    private generalcontrolService: GeneralcontrolService,
private authService:AuthService
    ) {
  }
  chartOptions: Highcharts.Options = {
    xAxis: {
    type: 'category'
  },
  series: [
    {
      type: 'line'
    }
  ]
};

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  barChartOptions: ChartOptions = {
    responsive: true,
  };

 
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  status = ['open', 'ongoing', 'validated', 'inactive'];

  chartBarData = {
    labels: [...this.months].slice(0, 7),
    datasets: [
      {
        label: 'Request Leave',
        backgroundColor: '#f87979',
        data: [0]
      }
    ]
  }
  chartBarData1 = {
    labels: [...this.months].slice(0, 7),
    datasets: [
      {
        label: 'Remote Days per Month',
        backgroundColor: '#0c8a94',
        data: [0]
      }
    ]
  }
  StatusPieData = {
    labels: [...this.status].slice(0, 7),
    datasets: [
      {
        label: 'Leave Days',
        backgroundColor: '#2c53fb',
        data: [0]
      }
    ]
  }

  ngOnInit(): void {
   this.currentUser  = JSON.parse(localStorage.getItem('user')!);
   this.adminIsConnected = false

   if (this.currentUser.role == "admin" || this.currentUser.role == "director")
   {
this.adminIsConnected = true
   }
  console.log(this.adminIsConnected)
    this.getLeaveData();
    this.getRemoteData();
    this.initCharts();
    this.getLeaveDataStatus();
    
   

  }

  getLeaveData(): void {
    this.requestleaveservice.getleaveBymonthbyuser(this.currentUser?.id).subscribe((data) => {
      // Parse the data.
      const chartData = [];
      
      const chartData1 = [];

      const chartData2 = [];
      const chartData3 = [];
      const chartData4 = [];


      for (let key in data[0]) {

        chartData.push( data[0][key]);
      }
      for (let key in data[1]) {
        
        chartData1.push( data[1][key]);
      }
      for (let key in data[2]) {
        
        chartData2.push( data[2][key]);
      }
      for (let key in data[3]) {

        chartData3.push( data[3][key]);
      }
      for (let key in data[4]) {

        chartData4.push( data[4][key]);
      }
      
 
      this.chartBarData = {
        labels: [...this.months].slice(0, 7),
        datasets: [
          {
            label: 'Sick Leave',
            backgroundColor: '#7786c7',
            data: chartData
          },
          {
            label: 'Annual Leave',
            backgroundColor: '#223486',
            data: chartData1
          },
          {
            label: 'unpaid Leave',
            backgroundColor: '#7c83a1',
            data: chartData2
          },
          {
            label: 'Special Leave',
            backgroundColor: '#2c53fb',
            data: chartData3
          },
          {
            label: 'RTT Leave',
            backgroundColor: '#090c1d',
            data: chartData4
          }

        ]
      }
      
          this.updateFlag = true;
    });

  

  }
  getLeaveDataStatus(): void {
    
  
    this.requestleaveservice.getleaveBystatusbyuser(this.currentUser?.id).subscribe((data) => {
      // Parse the data.
      const chartData = [];
      for (let key in data) {
        chartData.push( data[key]);
      }
  
 
      this.StatusPieData = {
        labels: [...this.status].slice(0, 7),
        datasets: [
          {
            label: 'Leave Days',
            backgroundColor: '#2c53fb',
            data: chartData
          }
        ]
      }
      
          this.updateFlag = true;
    });


  }
  getRemoteData(): void {
    this.authorizationService.getRemoteBymonthbyuser(this.currentUser?.id).subscribe((data) => {
      // Parse the data.
      const chartData1 = [];
      for (let key in data) {
        chartData1.push( data[key]);
      }
  
 
      this.chartBarData1 = {
        labels: [...this.months].slice(0, 7),
        datasets: [
          {
            label: 'Remote Days per Month',
            backgroundColor: '#0c8a94',
            data: chartData1
          }
        ]
      }
      
          this.updateFlag = true;
    });
  }
  initCharts(): void {
   

    this.mainChart = this.chartsData.mainChart;
    
    this.requestleaveservice.getSickLeaveDaysbyuser(this.currentUser.id).subscribe({
      next: (data) => {
        this.sickDays = 5 - data
       
      }})
      this.generalcontrolService.get(1).subscribe({
        next: (data) => {
          this.remoteday = data.remoteDayMax;
          this.authorizationMaxNbr = data.authorizationMaxNbr;
          this.authorizationService.getRemoteDaysbyuser(this.currentUser.id).subscribe({
        next: (data) => {
          this.remoteDays = this.remoteday - data
        }
      })
          
        }})

        this.authService.getEmployeeNumber().subscribe({
          next: (data) => {
            this.employeeNumber = data


          }})
          this.authService.getAvailableEmployeeNumber().subscribe({
            next: (data) => {
              this.availableEmployee = data
            }})

  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
