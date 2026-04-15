import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

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
  ApexTooltip
} from "ng-apexcharts";
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InformesService } from 'src/app/core/services/informes.service';
import { ChangeDetectorRef } from '@angular/core';

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
  colors?: string[];
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
  selector: 'app-indicador-sst',


  templateUrl: './indicador-sst.component.html',
  styleUrl: './indicador-sst.component.css'
})
export class IndicadorSstComponent implements OnInit {


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
  ) { }




  @ViewChild("chart1") chart1: ChartComponent;
  public chartOptions1: Partial<ChartOptions1> = {};

  @ViewChild("chart2") chart2: ChartComponent;
  public chartOptions2: Partial<ChartOptions1>;
  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions3: Partial<ChartOptions1> = {};

  @ViewChild("chart4") chart4: ChartComponent;
  public chartOptions4: Partial<ChartOptions1> = {};

  get vmP() {
    return this._vmP;
  }

  filtrobusquedaIndicadoresSST: FormGroup;



  ngOnInit(): void {

    this.getDatacentrodetrabajos();

    this.chartOptions1 = { series: [] };
    this.chartOptions2 = { series: [] };
    this.chartOptions3 = { series: [] };
    this.chartOptions4 = { series: [] };

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo", userInfo);

    this.filtrobusquedaIndicadoresSST = this.fb.group({

      idcentrodetrabajo: [userInfo?.centroTrabajoIds?.[0] ?? ''],
      fecha_desde: [''],
      fecha_hasta: [''],
    });


    // this.cargaGraficouno();
    // this.cargaGraficoDos();
    // this.cargaGraficotres();
    // this.cargaGraficoCuatro();



  }




  mostrarInforme: boolean = false;
  getData() {

    const datePipe2 = new DatePipe('es');

    const idcentrodetrabajo = this.filtrobusquedaIndicadoresSST.get('idcentrodetrabajo')?.value;
    const fecha_desde = this.filtrobusquedaIndicadoresSST.get('fecha_desde')?.value;
    const fecha_hasta = this.filtrobusquedaIndicadoresSST.get('fecha_hasta')?.value;



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




    this.informesService.getSstIndicadorMensual(params).subscribe({
      next: (data) => {
        console.log('Datos recibidos para el informe de indicadores SST:', data);
        this.datagraficoUno = data.data?.tasaFrecuencia || [];
        this.datagraficoDos = data.data?.tasaGravedad || [];
        this.datagraficoTres = data.data?.tasaAccidentabilidad || [];
        this.datagraficoCuatro = data.data?.tasaSiniestralidad || [];

      },
      complete: () => {
        this.cargaGraficouno();
        this.cargaGraficoDos();
        this.cargaGraficotres();
        this.cargaGraficoCuatro();

        this.mostrarInforme = true;


      },
      error: (err) => {
        console.error('Error al obtener los datos del informe:', err);
        this.snackbar.notify('danger', 'Error al obtener los datos del informe');
      }
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




  datagraficoUno: any[] = [];
  datagraficoDos: any[] = [];
  datagraficoTres: any[] = [];
  datagraficoCuatro: any[] = [];

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
        type: "line",
        height: 400,
        width: '100%',
        toolbar: { show: true },
        zoom: { enabled: false }
      },
      colors: ['#FF5733'], // Aquí defines el color de la línea
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val;
        }
      },
      xaxis: {
        type: "category",
        categories: datos.map(d => d.label)
      },
      title: { text: "TASA DE FRECUENCIA", align: "center" },
      legend: { position: "right", offsetY: 40 },
      fill: { opacity: 1 }
    };
  }

  cargaGraficoDos(data: any = this.datagraficoDos) {
    console.log('Cargando gráfico de tasa de gravedad con los siguientes datos:', data);
    const datos = data && data.length ? data : [];
    const keys = datos.length > 0
      ? Object.keys(datos[0]).filter(k => k !== 'label')
      : [];

    this.chartOptions2 = {
      series: keys.map(key => ({
        name: key.replace(/_/g, ' ').toUpperCase(),
        data: datos.map(d => d[key])
      })),
      chart: {
        type: "line",
        height: 400,
        width: '100%',
        toolbar: { show: true },
        zoom: { enabled: false }
      },
      colors: ['#FF5733'], // Aquí defines el color de la línea
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val;
        }
      },
      xaxis: {
        type: "category",
        categories: datos.map(d => d.label)
      },
      title: { text: "TASA DE GRAVEDAD", align: "center" },
      legend: { position: "right", offsetY: 40 },
      fill: { opacity: 1 }
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
        type: "line",
        height: 400,
        width: '100%',
        toolbar: { show: true },
        zoom: { enabled: false }
      },
      colors: ['#FF5733'], // Aquí defines el color de la línea
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val;
        }
      },
      xaxis: {
        type: "category",
        categories: datos.map(d => d.label)
      },
      title: { text: "TASA DE ACCIDENTABILIDAD", align: "center" },
      legend: { position: "right", offsetY: 40 },
      fill: { opacity: 1 }
    };
  }



  cargaGraficoCuatro(data: any = this.datagraficoCuatro) {
    const datos = data && data.length ? data : [];




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
        type: "line",
        height: 400,
        width: '100%',
        toolbar: { show: true },
        zoom: { enabled: false }
      },
      colors: ['#FF5733'], // Aquí defines el color de la línea
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val;
        }
      },
      xaxis: {
        type: "category",
        categories: datos.map(d => d.label)
      },
      title: { text: "TASA DE SINIESTRALIDAD", align: "center" },
      legend: { position: "right", offsetY: 40 },
      fill: { opacity: 1 }
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

  generarINforme() {

 this.generandopdf = true;
this.cdr.detectChanges();
this.exportarpdf();
  }

  generandopdf: boolean = false;
  exportarpdf() {

  

    const cabecera = document.getElementById('cabecera');
    const divhojados = document.getElementById('divhojados');

    if (cabecera && divhojados) {


      // 1. Crear un contenedor temporal
      const tempContainer = document.createElement('div');
      tempContainer.style.background = '#fff';
      tempContainer.style.padding = '10px';

      // 2. Clonar y agregar los nodos
      const cabeceraClone = cabecera.cloneNode(true) as HTMLElement;
      const divhojadosClone = divhojados.cloneNode(true) as HTMLElement;
      const spacer = document.createElement('div');
      spacer.style.height = '32px';
      tempContainer.appendChild(cabeceraClone);
      tempContainer.appendChild(spacer);
      tempContainer.appendChild(divhojadosClone);

      // 3. Agregar el contenedor temporal al body (fuera de pantalla)
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      document.body.appendChild(tempContainer);

      // 4. Renderizar con html2canvas
      html2canvas(tempContainer, { scale: 1 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.7);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const margin = 20;
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.setProperties({
          title: 'Informe de Indicadores de gestion SST',
          subject: 'Informe generado por Risk-id.',
          author: 'Risk-id',
          keywords: 'indicadores SST, informe, Risk-id',
          creator: 'Risk-id',
        });

        pdf.addImage(imgData, 'PNG', margin, 10, pdfWidth, pdfHeight);

        // Pie de página y logo (opcional)
        const addFooter = (pageNumber: number) => {
          pdf.setFontSize(7);
          pdf.setTextColor(50);
          pdf.setFont("helvetica", "bold");
          pdf.text('Nota Metodológica:', 20, pdf.internal.pageSize.getHeight() - 16, { align: 'left' });
          pdf.setFont("helvetica", "normal");
          pdf.text(' La información contenida en este informe se ha calculado con datos del sistema risk-id', 43, pdf.internal.pageSize.getHeight() - 16, { align: 'left' });

          pdf.text('Elaborado por:', 20, pdf.internal.pageSize.getHeight() - 10, { align: 'left' });
          pdf.setFont("helvetica", "normal");
          pdf.text(' Risk-id.', 38, pdf.internal.pageSize.getHeight() - 10, { align: 'left' });
          pdf.text(`Página ${pageNumber}`, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 4, { align: 'center' });

          // Logo
          const logo = new Image();
          logo.src = 'assets/img/logo_sin_fondo.png';
          pdf.addImage(logo, 'PNG', pdf.internal.pageSize.getWidth() - 35, 7, 22, 7);
        };

        addFooter(1);

        pdf.save('Informe-indicadores-sst_' + new Date().getTime() + '.pdf');
        this.snackbar.notify(
          'success',
          'Archivos Generados. Por favor, revise su carpeta de descargas'
        );

        // 5. Eliminar el contenedor temporal
        document.body.removeChild(tempContainer);
        this.generandopdf = false;
      });
    }
  }


}
