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
  ApexFill,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexYAxis,
  ApexTooltip,
  ChartComponent as ChartComponent2
} from "ng-apexcharts";
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { NotificationService } from 'src/app/core/services/notification.service';




export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  yaxis?: ApexYAxis;
  tooltip?: ApexTooltip;

};
export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  colors?: string[];

};



@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
  years: number[] = [];
  months = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' }
  ];
  monthsToShow = [];
  selectedYear: number;
  selectedMonth: number;
  componentDestroyed$: Subject<boolean> = new Subject()

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();


  }

  constructor(
    private fb: FormBuilder,
    private centrosdetrabajosService: CentrosdetrabajosService,
    private snackbar: NotificationService,
    private dasboardService: DasboardService
  ) { }





  @ViewChild("chart1") chart1: ChartComponent;
  public chartOptions1: Partial<ChartOptions1> = {};

  @ViewChild("chart2") chart2: ChartComponent2;
  public chartOptions2: Partial<ChartOptions2>;
  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions3: Partial<ChartOptions1> = {};

  @ViewChild("chart4") chart4: ChartComponent2;
  public chartOptions4: Partial<ChartOptions2>;

  filtrobusquedadasboard: FormGroup;

  ngOnInit(): void {

    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    this.selectedYear = currentYear;


    this.cargaGraficoDos();
    this.cargaGraficotres();
    this.cargaGraficoCuatro();

    this.getDatacentrodetrabajos();

 this.cargaGraficouno();

 this.getdatagraficoUno();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    this.filtrobusquedadasboard = this.fb.group({

      idcentrodetrabajo: [userInfo?.centroTrabajoIds?.[0] ?? ''],
      fecha_desde: [''],
      fecha_hasta: [''],
      // mes: [''],
    });

    this.onYearChange(this.selectedYear);

  }

  // Inicializar años (últimos 10 años)

  onYearChange(year: number) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    if (year === currentYear) {
      this.monthsToShow = this.months.filter(m => m.value <= currentMonth);
    } else {
      this.monthsToShow = [...this.months];
    }
    // Opcional: resetear el mes seleccionado
    this.selectedMonth = this.monthsToShow[0]?.value;
    this.filtrobusquedadasboard.get('anio')?.setValue(year);
    this.filtrobusquedadasboard.get('mes')?.setValue(this.selectedMonth);
  }

  onMonthChange(month: number) {
    this.filtrobusquedadasboard.get('mes')?.setValue(month);
  }




  cargaGraficouno( ) {
    this.chartOptions1 = {
      series: [
        {
          name: "CTP",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "STP",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },

      ],
      chart: {
        type: "bar",
        height: 350
      },
      title: {
        text: "Accidentes con y sin tiempo perdido",
        align: "center"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"

        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "Acumulados"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return " " + val + " Acumulados";
          }
        }
      }
    };
  }

  cargaGraficoDos() {
    this.chartOptions2 = {
      series: [44, 55, 13],
      chart: {
        type: "donut",
        height: 300,
        width: '100%',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        }
      },
      labels: ["Acción subestándar", "Condición subestándar", "Casi accidente"],
      title: {
        text: "Ubicación de ocurrencias anormales",
        align: "center"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val: number, opts: any) {
          return val.toFixed(1) + "%";
        }
      },
    };

  }


  cargaGraficotres() {
    this.chartOptions3 = {
      series: [
        {
          name: "CTP",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "STP",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },

      ],
      chart: {
        type: "bar",
        height: 350
      },
      title: {
        text: "Accidentes con y sin tiempo perdido",
        align: "center"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"

        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "Acumulados"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return " " + val + " Acumulados";
          }
        }
      }
    };

  }



  cargaGraficoCuatro() {
    this.chartOptions4 = {
      series: [44, 55],
      chart: {
        type: "donut",
        height: 300,
        width: '100%',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        }
      },
      labels: ["Incidente existe en IPER", "Incidente no existe en IPER"],
      title: {
        text: "Distribución de accidentes segun ubiación",
        align: "center"
      },

      fill: {
        type: "gradient",
        colors: ["#1976d2", "#e53935"] // ← Colores personalizados

      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val: number, opts: any) {
          return val.toFixed(1) + "%";
        }
      },
    };

  }




  centrosdetrabajo: any[] = [];
  getDatacentrodetrabajos() {


    this.centrosdetrabajosService.getall().subscribe({
      next: (data) => {
        this.centrosdetrabajo = data.data;
      },
      error: (err) => {
        this.centrosdetrabajo = [];
      }
    });
  }



  filtrar() {



    const idcentrodetrabajo = this.filtrobusquedadasboard.get('idcentrodetrabajo')?.value;
    const anio = this.filtrobusquedadasboard.get('anio')?.value;
    const mes = this.filtrobusquedadasboard.get('mes')?.value;




    const paramsString = `idcentrodetrabajo=${idcentrodetrabajo}&anio=${anio}&mes=${mes}`;

    console.log("paramsString", paramsString);


  }

  datagraficoUno: any[] = [];
  getdatagraficoUno() {

    this.dasboardService.getGraficoUno().subscribe({
      next: (data) => {
        console.log('datagraficoUno', data);
        this.datagraficoUno = data.data;
       
      },
      error: (err) => {
        this.datagraficoUno = [];
      }
    });
  }





}


