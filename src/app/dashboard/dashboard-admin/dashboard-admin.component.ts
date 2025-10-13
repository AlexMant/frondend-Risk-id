import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DasboardService } from 'src/app/core/services/dasboard.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
import { Subject } from 'rxjs';
import { Fx } from 'src/app/utils/functions';
import { takeUntil } from 'rxjs/operators';



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();


  }
  
  constructor(  
      private dasboardService: DasboardService
  ) { }


  cntCotiCerrada:any=0
  cntCotiAbierta:any=0
  cntsolicitudes:any=0


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};
  
  ngOnInit(): void {
    this.getdataDasboarduser();
    this.getdataGraficos();
  }


  getdataDasboarduser(){
   
    this.dasboardService.getmisdatosadmin(parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario??'0')).subscribe(
      (data) => {
         console.log('dasboardIT',data);
        this.cntCotiCerrada = data[0].cntCotiCerrada
        this.cntCotiAbierta = data[0].cntCotiAbierta
        this.cntsolicitudes = data[0].cntsolicitudes
      },
      (err) => {
        console.log(err);
        this.cntCotiCerrada = 0;
        this.cntCotiAbierta = 0;
        this.cntsolicitudes = 0;
      }
    );
  }


  get12Months(cantidad: number) {
    const months = new Array();
    const date = new Date();
    const month = date.getMonth();
    for (let i = 0; i < cantidad; i++) {
      date.setMonth(month - i);
      months.push(Fx.capitalizestring(date.toLocaleString('es-ES', { month: 'long' })));
    }
    return months.reverse();
  }

  dataserie: any;
  datacustomLegendItems: any = [];

  getdataGraficos() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    this.dasboardService.getgraficoadmin(parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario??'0')).pipe(takeUntil(this.componentDestroyed$)).subscribe(
      (data) => {

        console.log('data>>>>>>>>>', data );
        if (data.length > 0) {
        
          let unique = [...new Set(data.map(item => item.nombreEstado))];
        
          this.datacustomLegendItems = unique

          this.dataserie = unique.map((element) => {
            return {
              name: element,
              color: data.filter((item) => item.nombreEstado == element).map((item) => item.color)[0] ?? '#99CC33',
              data: data.filter((item) => item.nombreEstado == element).map((item) => item.valor)
            }
          });
          console.log('getdataGraficos', this.dataserie );
        } else {
          this.dataserie = [];
          this.datacustomLegendItems = [];
        }
        
          
        this.generargrafico();

      },
      (err) => {

      }
    );

  }
  lineChartOptions:boolean = false;
  generargrafico() {
 


    this.chartOptions = {
      series: this.dataserie,

      chart: {
        type: "bar",
        background: '#fff',
        height: 350,
        foreColor: '#515151',
        stacked: true,
        toolbar: {
          show: true
        },
        fontFamily: 'Poppins,  sans-serif',
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,

          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          // columnWidth: "50%",

        }
      },
      xaxis: {
        type: "category",
        categories: this.get12Months(13)
      },
      fill: {
        opacity: 1,

      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 40,
        labels: {
          colors: '#515151',
          useSeriesColors: false
        },
        showForSingleSeries: true,
        customLegendItems: this.datacustomLegendItems,
        markers: {
          
      },
        itemMargin: {
          horizontal: 5,
          vertical: 0
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        },
      },

    };

    this.lineChartOptions = true;
  }

}


