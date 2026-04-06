import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
 
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OcurrenciasService } from 'src/app/core/services/ocurrencias.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { SubprocesosService } from 'src/app/core/services/subprocesos.service';
import { TareasService } from 'src/app/core/services/tareas.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

 

@Component({
  selector: 'app-indicador-sst',
  
 
  templateUrl: './indicador-sst.component.html',
  styleUrl: './indicador-sst.component.css'
})
export class IndicadorSstComponent implements OnInit {
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

  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private ocurrenciasService: OcurrenciasService,
    private procesosService: ProcesosService,
    private subprocesosService: SubprocesosService,
    private tareasService: TareasService,
    private fb: FormBuilder,
    private centrosdetrabajosService: CentrosdetrabajosService,
  ) { }

  get vmP() {
    return this._vmP;
  }
 
  filtrobusquedaIndicadoresSST: FormGroup;

  procesos: any[] = [];
  actividades: any[] = [];
  tareas: any[] = [];
  centrosdetrabajo: any[] = [];

  ngOnInit(): void {

    const currentYear = new Date().getFullYear();
  this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  this.selectedYear = currentYear;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo", userInfo);
    const idEmpresa = userInfo?.empresaId?.[0]?.empresaId ?? 0;


    this.filtrobusquedaIndicadoresSST = this.fb.group({
      
      idcentrodetrabajo: [userInfo?.centroTrabajoIds?.[0] ?? ''],
      mes: [''],
      anio: [''],
    });

         this.onYearChange(this.selectedYear);
    this.getDatacentrodetrabajos();

  

  }


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
    this.filtrobusquedaIndicadoresSST.get('anio')?.setValue(year);
    this.filtrobusquedaIndicadoresSST.get('mes')?.setValue(this.selectedMonth);
  }

  onMonthChange(month: number) {
    this.filtrobusquedaIndicadoresSST.get('mes')?.setValue(month);
  }
 
 
  mostrarInforme: boolean = false;
  getData() {
    const datePipe2 = new DatePipe('es');

    const idcentrodetrabajo = this.filtrobusquedaIndicadoresSST.get('idcentrodetrabajo')?.value;
    const mes = this.filtrobusquedaIndicadoresSST.get('mes')?.value;
    const anio = this.filtrobusquedaIndicadoresSST.get('anio')?.value;

    this.mostrarInforme = true;

  }



 




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



  getDataprocesos(idcentrodetrabajo: any) {

    const paramprocesos = `centroTrabajoId=${idcentrodetrabajo}`;

    this.procesosService.getallparams(paramprocesos).subscribe({
      next: (data) => {

        this.procesos = data.data

      },
      error: (err) => {
        this.procesos = [];
      }
    });
  }

  getDataSubProcesos(idprocesos: any) {

    this.filtrobusquedaIndicadoresSST.patchValue({
      actividad: '',
      tarea: ''
    });
    const paramssub = `procesoId=${idprocesos}`;
    console.log("paramssub", paramssub);
    if (idprocesos !== 0 && idprocesos !== '') {

      this.subprocesosService.getallparams(paramssub).subscribe({
        next: (data) => {

          this.actividades = data.data

        },
        error: (err) => {
          this.actividades = [];
        }
      });
    } else {
      this.actividades = [];
    }
  }


  getDataStareas(idsubprocsos: any) {

    const paramssub = `subProcesoId=${idsubprocsos}`;

    if (idsubprocsos !== 0 && idsubprocsos !== '') {
      this.tareasService.getallparams(paramssub).subscribe({
        next: (data) => {

          this.tareas = data.data

        },
        error: (err) => {
          this.tareas = [];
        }
      });
    } else {
      this.tareas = [];
    }
  }



 

}
