import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actividdesdecontrolService } from 'src/app/core/services/actividdesdecontrol.service';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { ConsecuenciasService } from 'src/app/core/services/consecuencias.service';
import { LookupsService } from 'src/app/core/services/lookups.service';
import { MagnitudesService } from 'src/app/core/services/magnitudes.service';
import { ProbabilidadesService } from 'src/app/core/services/probabilidades.service';
import { TareasService } from 'src/app/core/services/tareas.service';
import { TiposFlashService } from 'src/app/core/services/tipos-flasj.service';
import { UbicacionesService } from 'src/app/core/services/ubicaciones.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-flash-form',
  templateUrl: './flash-form.component.html',
  styleUrls: ['./flash-form.component.css'],
})
export class FlashFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder,

    private readonly tareasService: TareasService,
    private centrosdetrabajosService: CentrosdetrabajosService,
    private actividaddecontrolservice: actividdesdecontrolService,
    private readonly ubivacionesservices: UbicacionesService,
    private readonly usuariosService: UsuariosService,
    private readonly lookupsService: LookupsService,
    private consecuenciasService: ConsecuenciasService,
    private probabilidadesService: ProbabilidadesService,
    private readonly magnitudesService: MagnitudesService,
    private readonly tiposFlashService: TiposFlashService

  ) { }
  mantenedorForm!: FormGroup;
  selectedFiles: File[] = [];

  ngOnInit(): void {


    this.getdatatipoflash();
    this.getdatadanosProbables();
    this.getDatacentrodetrabajos();

    const fechaOcurrenciaInicial = this.toDate(this.modelo.fechaOcurrencia);
    const horaOcurrenciaInicial = this.toTimeString(fechaOcurrenciaInicial);

    this.mantenedorForm = this.fb.group({
      flashId: [this.modelo.flashId, [Validators.required]],
      nombre: [this.modelo.nombre, [Validators.required]],
      descripcion: [this.modelo.descripcion, [Validators.required]],
      tipoFlashId: [this.modelo.tipoFlashId, [Validators.required]],
      fechaOcurrencia: [fechaOcurrenciaInicial, [Validators.required]],
      horaOcurrencia: [horaOcurrenciaInicial, [Validators.required]],
      danoProtencialId: [this.modelo.danoProtencialId, [Validators.required]],
      danoRealId: [this.modelo.danoRealId, [Validators.required]],
      ubicacionId: [this.modelo.ubicacionId, [Validators.required]],
      lugarEspecifico: [this.modelo.lugarEspecifico, [Validators.required]],
      tareaId: [this.modelo.tareaId, [Validators.required]],
      medidaInmediata: [this.modelo.medidaInmediata, [Validators.required]],

    });
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const incomingFiles = Array.from(input.files);
    this.selectedFiles = [...this.selectedFiles, ...incomingFiles];
    input.value = '';
  }

  removeFile(index: number) {
    this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
  }

  formatFileSize(sizeInBytes: number): string {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    }
    const sizeInKb = sizeInBytes / 1024;
    if (sizeInKb < 1024) {
      return `${sizeInKb.toFixed(1)} KB`;
    }
    const sizeInMb = sizeInKb / 1024;
    return `${sizeInMb.toFixed(1)} MB`;
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
    this.modelo.flashId = this.mantenedorForm.get('flashId')?.value;
    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
    this.modelo.descripcion = this.mantenedorForm.get('descripcion')?.value;
    this.modelo.tipoFlashId = this.mantenedorForm.get('tipoFlashId')?.value;
    const fechaOcurrencia = this.mantenedorForm.get('fechaOcurrencia')?.value;
    const horaOcurrencia = this.mantenedorForm.get('horaOcurrencia')?.value;
    this.modelo.fechaOcurrencia = this.mergeDateTime(fechaOcurrencia, horaOcurrencia);
    this.modelo.danoProtencialId = this.mantenedorForm.get('danoProtencialId')?.value;
    this.modelo.danoRealId = this.mantenedorForm.get('danoRealId')?.value;
    this.modelo.ubicacionId = this.mantenedorForm.get('ubicacionId')?.value;
    this.modelo.lugarEspecifico = this.mantenedorForm.get('lugarEspecifico')?.value;
    this.modelo.tareaId = this.mantenedorForm.get('tareaId')?.value;
    this.modelo.medidaInmediata = this.mantenedorForm.get('medidaInmediata')?.value;



    this.guardar.emit();
  }

  private toDate(value: any): Date | null {
    if (!value) {
      return null;
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private toTimeString(value: Date | null): string {
    if (!value) {
      return '';
    }
    const hours = String(value.getHours()).padStart(2, '0');
    const minutes = String(value.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private mergeDateTime(dateValue: any, timeValue: string | null): Date | null {
    const date = this.toDate(dateValue);
    if (!date) {
      return null;
    }
    if (timeValue) {
      const [hours, minutes] = timeValue.split(':').map((part) => Number(part));
      if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
        date.setHours(hours, minutes, 0, 0);
      }
    }
    return date;
  }





  procesos: any[] = [];
  actividades: any[] = [];
  tareas: any[] = [];
  centrosdetrabajo: any[] = [];



  getDatacentrodetrabajos() {


    this.centrosdetrabajosService.getall().subscribe(
      (data) => {

        this.centrosdetrabajo = data.data;
      },
      (err) => {
        this.centrosdetrabajo = [];
      }
    );
  }


  selectedtareas: any = [];
  search2(event: any) {
    // console.log('query',event.target.value)
    let result = this.select2(event.target.value)
    this.selectedtareas = result;
  }

  select2(query: string): string[] {
    let result: string[] = [];
    for (let a of this.tareas) {
      if (a.nombre.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }


  getDataStareas(idcentrodetrabajo: any) {


   this.getdataubicaicones(idcentrodetrabajo);

    //buscar idempresaId en centro de trabajo y asignarlo al modelo 
    const centroTrabajo = this.centrosdetrabajo.find(ct => ct.id === idcentrodetrabajo);
    if (centroTrabajo) {
      this.modelo.empresaId = centroTrabajo.empresaId;
    }

    this.modelo.centroTrabajoId = idcentrodetrabajo;




    const paramssub = `centroTrabajoId=${idcentrodetrabajo}`;

    this.tareasService.getallparams(paramssub).subscribe(
      (data) => {

        if (this.modelo.origen == 'I') {
          this.tareas = data.data.filter((t: any) => t.esta_activo === true);
          this.selectedtareas = data.data.filter((t: any) => t.esta_activo === true);
        } else {
          this.tareas = data.data;
          this.selectedtareas = data.data;
        }

      },
      (err) => {
        this.tareas = [];
      }
    );
  }

 dataubicaciones: any[] = [];
  getdataubicaicones(idcentrodetrabajo: any) {

    const params = `?centroTrabajoId=${idcentrodetrabajo}`;


    this.ubivacionesservices.getbyparams(params).subscribe(
      (data) => {
        this.dataubicaciones = data.data;
      },
      (err) => {
        this.dataubicaciones = [];
      }
    );

  }

  agregarprocesossubproceso(idtarea: any) {

    const tarea = this.tareas.find(t => t.id === idtarea);
    if (tarea) {
      this.modelo.procesoId = tarea.procesoId;
      this.modelo.subProcesoId = tarea.subProcesoId;

    }

    // console.log("tarea seleccionada", this.modelo);

  }

  datadanosProbables: any[] = [];
  getdatadanosProbables() {

    this.lookupsService.danosProbables().subscribe(
      (data) => {
        this.datadanosProbables = data.data;

      },
      (err) => {
        this.datadanosProbables = [];
      }
    );
  }

  datatipoflash: any[] = [];
  getdatatipoflash() {

    this.tiposFlashService.getall().subscribe(
      (data) => {
        this.datatipoflash = data.data;

      },
      (err) => {
        this.datatipoflash = [];
      }
    );
  }

}