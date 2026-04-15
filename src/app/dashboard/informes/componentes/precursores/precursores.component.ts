import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { InformesService } from 'src/app/core/services/informes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
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
import { DatePipe } from '@angular/common';
import { VerPrecursorComponent } from '../ver-precursor/ver-precursor.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';



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
  legend: ApexLegend;
  stroke: ApexStroke;
  tooltip?: ApexTooltip;
};


@Component({
  selector: 'app-precursores',

  templateUrl: './precursores.component.html',
  styleUrls: ['./precursores.component.css']
})
export class PrecursoresComponent implements OnInit, OnDestroy {


  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private centrosdetrabajosService: CentrosdetrabajosService,
    private fb: FormBuilder,
    private informesService: InformesService,
    private cdr: ChangeDetectorRef,
    private _bottomSheet: MatBottomSheet,

  ) { }

  componentDestroyed$: Subject<boolean> = new Subject()

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();


  }

  get vmP() {
    return this._vmP;
  }

  @ViewChild("chart2") chart2: ChartComponent2;
  public chartOptions2: Partial<ChartOptions2>;

  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions3: Partial<ChartOptions1> = {};

  filtrobusquedaPrecursores: FormGroup;
  mostrarInforme: boolean = false;
  generandopdf: boolean = false;

  ngOnInit(): void {

    this.getDatacentrodetrabajos();

    this.chartOptions2 = { series: [] };
    this.chartOptions3 = { series: [] };

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo", userInfo);

    this.filtrobusquedaPrecursores = this.fb.group({

      idcentrodetrabajo: [userInfo?.centroTrabajoIds?.[0] ?? ''],
      fecha_desde: [''],
      fecha_hasta: [''],
    });

  }

  mesesSelector = this.getMesesAnioSelector();

  getMesesAnioSelector(): { label: string, value: string }[] {
    const meses: { label: string, value: string }[] = [];
    const inicio = new Date(2025, 0, 1); // Enero 2025
    const hoy = new Date();
    let fecha = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    while (fecha >= inicio) {
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const anio = fecha.getFullYear();
      meses.push({
        label: `${mes}/${anio}`,
        value: `${anio}-${mes}`
      });
      // Retrocede un mes
      fecha.setMonth(fecha.getMonth() - 1);
    }
    return meses;
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


  datagraficoDos: any[] = []
  datagraficoTres: any[] = []

  // Nota: El zoom visual (scroll, pinch) no está soportado en gráficos tipo "donut", pero los controles sí aparecerán.

  cargaGraficoDos(data: any = this.datagraficoDos) {
    const datos = data && data.length ? data : [];

    if (datos.length === 0) {
      this.chartOptions2 = {
        series: [100],
        chart: {
          type: "donut",
          height: 400,
          width: '100%',
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true
            }
          },
          zoom: {
            enabled: true,
            type: 'xy', // aunque en donut el zoom visual es limitado
            autoScaleYaxis: true
          }
        },
        labels: ["Sin datos"],
        title: { text: "Ubicación de precursores", align: "center" },
        legend: { position: "bottom" },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: { width: 200 },
              legend: { position: "bottom" }
            }
          }
        ],
        dataLabels: { enabled: false },
        fill: { colors: ['#ffffff'] }, // Sin color de relleno
        stroke: { show: true, colors: ['#bdbdbd'], width: 2 }, // Solo borde gris claro
        tooltip: { enabled: false }
      };
      return;
    }

    this.chartOptions2 = {
      series: datos.map(d => d.value),
      chart: {
        type: "donut",
        height: 400,
        width: '100%',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        },
        zoom: {
          enabled: true,
          type: 'xy', // aunque en donut el zoom visual es limitado
          autoScaleYaxis: true
        }
      },
      labels: datos.map(d => d.label),
      title: { text: "Ubicación de precursores", align: "center" },
      legend: { position: "bottom" },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 200 },
            legend: { position: "bottom" }
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

  cargaGraficotres(data: any = this.datagraficoTres) {
    const datos = data && data.length ? data : [];

    // Obtén las claves de las series (excluyendo 'label')
    const keys = datos.length > 0
      ? Object.keys(datos[0]).filter(k => k !== 'label')
      : [];

    this.chartOptions3 = {
      series: keys.map(key => ({
        name: key.replace(/_/g, ' ').toUpperCase(),
        data: datos.map(d => d[key])
      })),
      chart: {
        type: "bar",
        height: 400,
        width: '100%',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        },
        zoom: {
          enabled: true,
          type: 'xy', // permite zoom en ambos ejes
          autoScaleYaxis: true
        }
      },
      title: {
        text: "Tipo de precursores",
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
        categories: datos.map(d => d.label)
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


  datalistadoPrecursores: any[] = []
  getData() {


    const datePipe2 = new DatePipe('es');

    const idcentrodetrabajo = this.filtrobusquedaPrecursores.get('idcentrodetrabajo')?.value;
    const fecha_desde = this.filtrobusquedaPrecursores.get('fecha_desde')?.value;
    const fecha_hasta = this.filtrobusquedaPrecursores.get('fecha_hasta')?.value;



    let params = '';

    if (idcentrodetrabajo != '' && idcentrodetrabajo != null && idcentrodetrabajo != undefined) {
      params += 'centroTrabajoId=' + idcentrodetrabajo + '&';

    }


    if (fecha_desde != '' && fecha_hasta != '' && fecha_desde != null && fecha_hasta != null && fecha_desde != undefined && fecha_hasta != undefined) {
      const fechaDesdeFormateada = datePipe2.transform(fecha_desde, 'yyyy-MM');
      const fechaHastaFormateada = datePipe2.transform(fecha_hasta, 'yyyy-MM');

      if (fechaDesdeFormateada > fechaHastaFormateada) {
        this.snackbar.notify(
          'danger',
          'Fecha desde no puede ser mayor a la fecha hasta.'
        );
        return;
      } else {
        params += 'fecha_desde=' + fechaDesdeFormateada + '&fecha_hasta=' + fechaHastaFormateada;
      }
    }




    this.informesService.getPrecursoresPorUbicacion(params).subscribe({
      next: (data) => {
        console.log('Datos getPrecursoresPorUbicacion:', data);

        this.datagraficoDos = data.data || [];
        this.datagraficoTres = data.data?.tasaAccidentabilidad || [];


      },
      complete: () => {

        this.cargaGraficoDos();

        this.informesService.getPrecursoresPorTipos(params).subscribe({
          next: (data) => {
            console.log('Datos getPrecursoresPorTipos:', data);

            this.datagraficoTres = data.data || [];


          },
          complete: () => {

            this.cargaGraficotres();

            this.informesService.getPrecursoresListado(params).subscribe({
              next: (data) => {
                console.log('Datos getPrecursoresListado:', data);

                this.datalistadoPrecursores = data.data || [];


              },
              complete: () => {

                this.mostrarInforme = true;

              },
              error: (err) => {
                console.error('Error al obtener los datos del informe:', err);
                this.snackbar.notify('danger', 'Error al obtener los datos del informe');
              }
            });



          },
          error: (err) => {
            console.error('Error al obtener los datos del informe:', err);
            this.snackbar.notify('danger', 'Error al obtener los datos del informe');
          }
        });



      },
      error: (err) => {
        console.error('Error al obtener los datos del informe:', err);
        this.snackbar.notify('danger', 'Error al obtener los datos del informe');
      }
    });

  }
  generarINforme() { }



  viewFile(data: any): void {
    //    this._bottomSheet.open(ayudapackComponent ,name:'aqui' );
    let bottonSheet =
      this._bottomSheet.open(VerPrecursorComponent, {

        data: data,
        disableClose: false,

      });
    bottonSheet.afterDismissed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }


  countfiles() {
    return this.datalistadoPrecursores.length;
  }

}