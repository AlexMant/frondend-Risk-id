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
import { DatePipe } from '@angular/common';




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
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
  // years: number[] = [];
  // months = [
  //   { value: 1, name: 'Enero' },
  //   { value: 2, name: 'Febrero' },
  //   { value: 3, name: 'Marzo' },
  //   { value: 4, name: 'Abril' },
  //   { value: 5, name: 'Mayo' },
  //   { value: 6, name: 'Junio' },
  //   { value: 7, name: 'Julio' },
  //   { value: 8, name: 'Agosto' },
  //   { value: 9, name: 'Septiembre' },
  //   { value: 10, name: 'Octubre' },
  //   { value: 11, name: 'Noviembre' },
  //   { value: 12, name: 'Diciembre' }
  // ];
  // monthsToShow = [];
  // selectedYear: number;
  // selectedMonth: number;
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

  @ViewChild("chart4") chart4: ChartComponent;
  public chartOptions4: Partial<ChartOptions1> = {};

  filtrobusquedadasboard: FormGroup;




  ngOnInit(): void {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    this.filtrobusquedadasboard = this.fb.group({

      idcentrodetrabajo: [userInfo?.centroTrabajoIds?.[0] ?? ''],
      fecha_desde: [''],
      fecha_hasta: [''],
      // mes: [''],
    });


    const datePipe2 = new DatePipe('es');

    const idcentrodetrabajo = this.filtrobusquedadasboard.get('idcentrodetrabajo')?.value;
    const fecha_desde = datePipe2.transform(this.filtrobusquedadasboard.get('fecha_desde')?.value, 'yyyy-MM-dd');
    const fecha_hasta = datePipe2.transform(this.filtrobusquedadasboard.get('fecha_hasta')?.value, 'yyyy-MM-dd');
    const empresaId = userInfo?.empresaId;


    let paramsString = ''

    if (empresaId !== null && empresaId !== undefined && empresaId !== '') {
      paramsString += `empresaId=${empresaId}&`
    }
    if (idcentrodetrabajo !== null && idcentrodetrabajo !== undefined && idcentrodetrabajo !== '') {
      paramsString += `idcentrodetrabajo=${idcentrodetrabajo}&`
    }
    if (fecha_desde !== null && fecha_desde !== undefined && fecha_desde !== '') {
      paramsString += `fechaInicio=${fecha_desde}&`
    }
    if (fecha_hasta !== null && fecha_hasta !== undefined && fecha_hasta !== '') {
      paramsString += `fechaFin=${fecha_hasta}&`
    }

    this.chartOptions1 = { series: [] };
    this.chartOptions2 = { series: [] };
    this.chartOptions3 = { series: [] };
    this.chartOptions4 = { series: [] };

    // const currentYear = new Date().getFullYear();
    // this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    // this.selectedYear = currentYear;



    this.getDatacentrodetrabajos();


    this.getdatagraficoUno(paramsString);
    this.getdatagraficoDos(paramsString);
    this.getdatagraficoTres(paramsString);
    this.getdatagraficoCuatro(paramsString);
    this.getdatacards(paramsString);


    // this.onYearChange(this.selectedYear);

  }

  // Inicializar años (últimos 10 años)

  // onYearChange(year: number) {
  //   const currentYear = new Date().getFullYear();
  //   const currentMonth = new Date().getMonth() + 1;
  //   if (year === currentYear) {
  //     this.monthsToShow = this.months.filter(m => m.value <= currentMonth);
  //   } else {
  //     this.monthsToShow = [...this.months];
  //   }
  //   // Opcional: resetear el mes seleccionado
  //   this.selectedMonth = this.monthsToShow[0]?.value;
  //   this.filtrobusquedadasboard.get('anio')?.setValue(year);
  //   this.filtrobusquedadasboard.get('mes')?.setValue(this.selectedMonth);
  // }

  // onMonthChange(month: number) {
  //   this.filtrobusquedadasboard.get('mes')?.setValue(month);
  // }




  cargaGraficouno(data: any = this.datagraficoUno) {
    const datos = data && data.length ? data : [];

    // Obtén las claves de las series (excluyendo 'label')
    const keys = datos.length > 0
      ? Object.keys(datos[0]).filter(k => k !== 'label')
      : [];

    this.chartOptions1 = {
      series: keys.map(key => ({
        name: key.replace(/_/g, ' ').toUpperCase(),
        data: datos.map(d => d[key])
      })),
      chart: {
        type: "bar",
        height: 400,
        stacked: true,
        toolbar: {
          show: true
        },
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
      title: {
        text: "Reporte de alertas",
        align: "center"
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: datos.map(d => d.label)
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };
  }

  cargaGraficoDos(data: any = this.datagraficoDos) {
    const datos = data && data.length ? data : [];

    if (datos.length === 0) {
      this.chartOptions2 = {
        series: [100],
        chart: {
          type: "donut",
          height: 400,
          width: '100%',
          zoom: { enabled: false },
          toolbar: { show: true, tools: { download: true } }
        },
        labels: ["Sin datos"],
        title: { text: "Ubicación de alertas", align: "center" },
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
        zoom: { enabled: false },
        toolbar: { show: true, tools: { download: true } }
      },
      labels: datos.map(d => d.label),
      title: { text: "Ubicación de alertas", align: "center" },
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


  cargaGraficoCuatro(data: any = this.datagraficoCuatro) {
    const datos = data && data.length ? data : [];


    if (datos.length === 0) {
      this.chartOptions4 = {
        series: [
          { name: "CON TIEMPO PERDIDO", data: [0] },
          { name: "SIN TIEMPO PERDIDO", data: [0] }
        ],
        chart: {
          type: "bar",
          height: 350
        },
        title: {
          text: "Ubicación de accidentes con y sin tiempo perdido",
          align: "center"
        },

        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: "55%"
          }
        },
        
        dataLabels: { enabled: true },
        fill: { colors: ['#ffffff'] },
        stroke: { show: true, colors: ['#bdbdbd'], width: 2 },
        tooltip: { enabled: false },
        xaxis: { categories: ["Sin datos"] },
        yaxis: { title: { text: " (Cantidad)" } },
        // legend: { position: "bottom" }
      };
      return;
    }

    // Obtén las claves de las series (excluyendo 'label')
    const keys = datos.length > 0
      ? Object.keys(datos[0]).filter(k => k !== 'label')
      : [];

    this.chartOptions4 = {
      series: keys.map(key => ({
        name: key.replace(/_/g, ' ').toUpperCase(),
        data: datos.map(d => d[key])
      })),
      chart: {
        type: "bar",
        height: 350
      },
      title: {
        text: "Ubicación de accidentes con y sin tiempo perdido",
        align: "center"
      },
      plotOptions: {
        bar: {
          horizontal: true,
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
          text: " (Cantidad)"
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

    const datePipe2 = new DatePipe('es');

    const idcentrodetrabajo = this.filtrobusquedadasboard.get('idcentrodetrabajo')?.value;
    const fecha_desde = datePipe2.transform(this.filtrobusquedadasboard.get('fecha_desde')?.value, 'yyyy-MM-dd');
    const fecha_hasta = datePipe2.transform(this.filtrobusquedadasboard.get('fecha_hasta')?.value, 'yyyy-MM-dd');
    const empresaId = JSON.parse(localStorage.getItem("userInfo")).empresaId;


    let paramsString = ''

    if (empresaId !== null && empresaId !== undefined && empresaId !== '') {
      paramsString += `empresaId=${empresaId}&`
    }
    if (idcentrodetrabajo !== null && idcentrodetrabajo !== undefined && idcentrodetrabajo !== '') {
      paramsString += `centroTrabajoId=${idcentrodetrabajo}&`
    }
    if (fecha_desde !== null && fecha_desde !== undefined && fecha_desde !== '') {
      paramsString += `fechaInicio=${fecha_desde}&`
    }
    if (fecha_hasta !== null && fecha_hasta !== undefined && fecha_hasta !== '') {
      paramsString += `fechaFin=${fecha_hasta}&`
    }

    if ((fecha_desde && !fecha_hasta) || (!fecha_desde && fecha_hasta)) {

      this.snackbar.notify(
        'danger',
        'Seleccione Fechas.'
      );
      return false;
    }
    // Si ambos tienen valor, validar el rango
    if (fecha_desde && fecha_hasta) {
      const desde = new Date(fecha_desde);
      const hasta = new Date(fecha_hasta);
      if (desde > hasta) {
        this.snackbar.notify(
          'danger',
          'Fecha desde no puede ser mayor a fecha hasta.'
        );
        return false;
      }
    }




    this.getdatagraficoUno(paramsString);
    this.getdatagraficoDos(paramsString);
    this.getdatagraficoTres(paramsString);
    this.getdatagraficoCuatro(paramsString);
    this.getdatacards(paramsString);

    console.log("paramsString", paramsString);
    return true;

  }





  datagraficoUno: any[] = [];
  getdatagraficoUno(params: string) {




    this.dasboardService.getgradicoUno(params).subscribe({
      next: (data) => {
        console.log('datagraficoUno', data.data);
        this.datagraficoUno = data.data;

      },
      complete: () => {
        this.cargaGraficouno();
      },
      error: (err) => {
        this.datagraficoUno = [];
      }
    });
  }
  datagraficoDos: any[] = [];
  getdatagraficoDos(params: string) {
    this.dasboardService.getgradicoDos(params).subscribe({
      next: (data) => {
        console.log('datagraficoDos', data.data);
        this.datagraficoDos = data.data;
      },
      complete: () => {
        this.cargaGraficoDos();
      },
      error: (err) => {
        this.datagraficoDos = [];
      }
    });
  }

  datagraficoTres: any[] = [];
  getdatagraficoTres(params: string) {
    this.dasboardService.getGraficotres(params).subscribe({
      next: (data) => {
        console.log('datagraficoTres', data.data);
        this.datagraficoTres = data.data;
      },
      complete: () => {
        this.cargaGraficotres();
      },

      error: (err) => {
        this.datagraficoTres = [];
      }
    });
  }

  datagraficoCuatro: any[] = [];
  getdatagraficoCuatro(params: string) {
    this.dasboardService.getGraficocuarto(params).subscribe({
      next: (data) => {
        console.log('datagraficoCuatro', data.data);
        this.datagraficoCuatro = data.data;
      },
      complete: () => {
        this.cargaGraficoCuatro();
      },
      error: (err) => {
        this.datagraficoCuatro = [];
      }
    });
  }

  dataCards: any;
  getdatacards(params: string) {
    this.dasboardService.getcards(params).subscribe({
      next: (data) => {
        console.log('dataCards', data.data);
        this.dataCards = data.data;
      },
      complete: () => {
        // Aquí puedes agregar cualquier acción que desees realizar después de completar la solicitud
      },
      error: (err) => {
        this.dataCards = [];
      }
    });
  }






}


