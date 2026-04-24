import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { InformesService } from 'src/app/core/services/informes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-simulador-ds67',
 
  templateUrl: './simulador-ds67.component.html',
  styleUrl: './simulador-ds67.component.css'
})
export class SimuladorDs67Component implements OnInit, OnDestroy {


  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private centrosdetrabajosService: CentrosdetrabajosService,
    private fb: FormBuilder,
    private informesService: InformesService,
 
  ) { }

  componentDestroyed$: Subject<boolean> = new Subject()
  
    ngOnDestroy(): void {
  
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  
  
    }

     get vmP() {
    return this._vmP;
  }
    filtrobusquedasimulador: FormGroup;
    mostrarInforme: boolean = false;
    casosInvalidez: FormGroup[] = [];
    gradosInvalidez: string[] = [
      'Gran Invalidez',
      '10%',
      '20%',
      '30%',
      '40%',
      '50%',
      '60%',
      '70%',
      '80%',
      '90%',
      '100%'
    ];
  ngOnInit(): void {
    this.getDatacentrodetrabajos();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // Calcular año de evaluación (próximo año impar)
    const hoy = new Date();
    let anio = hoy.getFullYear();
    if (anio % 2 === 0) {
      anio += 1;
    } else {
      anio += 2;
    }
    // Fecha de evaluación: 30 de junio de [Año evaluación]
    const fechaEvaluacion = new Date(anio, 5, 30); // Mes 5 = junio
    // Días faltantes
    const diffTime = fechaEvaluacion.getTime() - hoy.getTime();
    const diasFaltantes = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);

    this.filtrobusquedasimulador = this.fb.group({
      idcentrodetrabajo: [userInfo?.centroTrabajoIds?.[0] ?? ''],
      fecha_desde: [''],
      fecha_hasta: [''],
      anio_evaluacion: [{ value: anio, disabled: true }],
      fecha_evaluacion: [{ value: this.formatFecha(fechaEvaluacion), disabled: true }],
      dias_faltantes: [{ value: diasFaltantes, disabled: true }],
      cantidad_fatalidades: [1],
      usar_proyeccion_accidentes: [false],
      usar_promedio_masa_laboral: [false],
      usar_promedio_dias_perdidos: [false],
    });

    // Inicializar con un caso por defecto
    this.casosInvalidez = [this.crearCasoFormGroup()];
  }

  crearCasoFormGroup(): FormGroup {
    return this.fb.group({
      caso: [''],
      grado_invalidez: [this.gradosInvalidez[0]],
    });
  }

  agregarCaso() {
    this.casosInvalidez.push(this.crearCasoFormGroup());
  }

  eliminarCaso(index: number) {
    if (this.casosInvalidez.length > 1) {
      this.casosInvalidez.splice(index, 1);
    }
  }

  formatFecha(fecha: Date): string {
    // Devuelve fecha en formato dd/MM/yyyy
    const d = fecha.getDate().toString().padStart(2, '0');
    const m = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const y = fecha.getFullYear();
    return `${d}/${m}/${y}`;
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

  generandopdf: boolean = false;
generarInforme: boolean = false;
  getData(){
    this.generarInforme = true;
    const cantidad_fatalidades = this.filtrobusquedasimulador.get('cantidad_fatalidades').value;
    const casos = this.casosInvalidez.map(casoFG => ({
      caso: casoFG.get('caso').value,
      grado_invalidez: casoFG.get('grado_invalidez').value
    }));
    const usarProyecAccidentes = this.filtrobusquedasimulador.get('usar_proyeccion_accidentes').value;
    const usarPromedioMasaLaboral = this.filtrobusquedasimulador.get('usar_promedio_masa_laboral').value;
    const usarPromedioDiasPerdidos = this.filtrobusquedasimulador.get('usar_promedio_dias_perdidos').value;

    const dataSimulacion = {
      cantidad_fatalidades: cantidad_fatalidades,
       usarProyecAccidentes: usarProyecAccidentes,
      usarPromedioMasaLaboral: usarPromedioMasaLaboral,
      usarPromedioDiasPerdidos: usarPromedioDiasPerdidos,
      casos : casos
     
    }
    console.log('Datos para simulación:', dataSimulacion);

    
  }

}
