import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actividdesdecontrolService } from 'src/app/core/services/actividdesdecontrol.service';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { ConsecuenciasService } from 'src/app/core/services/consecuencias.service';
 
import { IncidentesService } from 'src/app/core/services/incidentes.service';
import { LookupsService } from 'src/app/core/services/lookups.service';
import { MagnitudesService } from 'src/app/core/services/magnitudes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProbabilidadesService } from 'src/app/core/services/probabilidades.service';
import { TareasService } from 'src/app/core/services/tareas.service';
 
import { UbicacionesService } from 'src/app/core/services/ubicaciones.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
 
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TiposOcurrenciasService } from 'src/app/core/services/tipos-ocurrencias.service';
import { OcurrenciasService } from 'src/app/core/services/ocurrencias.service';
import { VerImagenOcurrenciasComponent } from '../ver-imagen-ocurrencias/ver-imagen-ocurrencias.component';
type EstadoArchivo = 'existente' | 'nuevo' | 'eliminado';
@Component({
  selector: 'app-ocurrencias-form',
  templateUrl: './ocurrencias-form.component.html',
  styleUrls: ['./ocurrencias-form.component.css'],
})
export class OcurrenciasFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder,
    private snackbar: NotificationService,
    private readonly tareasService: TareasService,
    private centrosdetrabajosService: CentrosdetrabajosService,
    private actividaddecontrolservice: actividdesdecontrolService,
    private readonly ubivacionesservices: UbicacionesService,
    private readonly usuariosService: UsuariosService,
    private readonly lookupsService: LookupsService,
    private consecuenciasService: ConsecuenciasService,
    private probabilidadesService: ProbabilidadesService,
    private readonly magnitudesService: MagnitudesService,
    private readonly tiposOcurrenciasService: TiposOcurrenciasService,
    private readonly incidentesService: IncidentesService,
   private readonly ocurrenciasService: OcurrenciasService,
    private _bottomSheet: MatBottomSheet,

  ) { }
  mantenedorForm!: FormGroup;
  // selectedFiles: File[] = [];
  selectedFiles: { file: File, status: EstadoArchivo, id: number }[] = [];

  ngOnInit(): void {


    this.getdatatipoflash();
    this.getdatadanosProbables();
    this.getDatacentrodetrabajos();

    const fechaOcurrenciaInicial = this.toDate(this.modelo.fechaOcurrencia);
    const horaOcurrenciaInicial = this.toTimeString(fechaOcurrenciaInicial);


    this.mantenedorForm = this.fb.group({

      nombre: [this.modelo.nombre, [Validators.required]],
      descripcion: [this.modelo.descripcion, [Validators.required]],
      tipoFlashId: [this.modelo.tipoFlashId, [Validators.required]],
      fechaOcurrencia: [fechaOcurrenciaInicial, [Validators.required]],
      horaOcurrencia: [horaOcurrenciaInicial, [Validators.required]],
      danoPotencialId: [this.modelo.danoPotencialId, [Validators.required]],
      danoRealId: [this.modelo.danoRealId, [Validators.required]],
      ubicacionId: [this.modelo.ubicacionId, [Validators.required]],
      lugarEspecifico: [this.modelo.lugarEspecifico, [Validators.required]],
      tareaId: [this.modelo.tareaId, [Validators.required]],
      medidaInmediata: [this.modelo.medidaInmediata, [Validators.required]],
      idcentrodetrabajo: [this.modelo.centroTrabajoId, [Validators.required]],
      incidenteId: [this.modelo.incidenteId],
    });
    // this.selectedFiles = this.modelo.file || [];
    for (let archivo of this.modelo.file || []) {
      this.ocurrenciasService.urlToFile(archivo.url, archivo.name, archivo.type).then(file => {
        // Ahora 'file' es un File real
        console.log("Archivo convertido a File:", file);
        this.selectedFiles.push({ file, status: 'existente' as EstadoArchivo, id: archivo.id });
      })
    }


  }


  countfiles() {
    return this.selectedFiles.filter(f => f.status !== 'eliminado').length;
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const currentFileCount = this.selectedFiles.filter(f => f.status !== 'eliminado').length;
    const maxFiles = 3;
    const availableSlots = maxFiles - currentFileCount;

    if (availableSlots <= 0) {
      this.snackbar.notify('danger', `Solo se permiten máximo ${maxFiles} archivos.`);
      return;
    }


    const maxSize = 3 * 1024 * 1024; // 3 MB
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      if (!file.type.startsWith('image/')) {
        this.snackbar.notify('danger', 'Solo se permiten imágenes.');
        return;
      }
      if (file.size > maxSize) {
        this.snackbar.notify('danger', 'La imagen no debe superar los 3 MB.');
        return;
      }
    }

    const incomingFiles = Array.from(input.files).map(file => ({ file, status: 'nuevo' as EstadoArchivo, id: 0 }));

    this.selectedFiles = [...this.selectedFiles, ...incomingFiles];
    input.value = '';
    console.log("selectedFiles", this.selectedFiles);



  }

  removeFile(index: number) {
    const archivo = this.selectedFiles[index];
    // if (archivo.status === 'existente') {
    this.selectedFiles[index].status = 'eliminado' as EstadoArchivo;
    // } else {
    //   this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
    // }
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

    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
    this.modelo.descripcion = this.mantenedorForm.get('descripcion')?.value;
    this.modelo.tipoFlashId = this.mantenedorForm.get('tipoFlashId')?.value;
    const fechaOcurrencia = this.mantenedorForm.get('fechaOcurrencia')?.value;
    const horaOcurrencia = this.mantenedorForm.get('horaOcurrencia')?.value;
    this.modelo.fechaOcurrencia = this.mergeDateTime(fechaOcurrencia, horaOcurrencia)?.toISOString();
    this.modelo.danoPotencialId = this.mantenedorForm.get('danoPotencialId')?.value;
    this.modelo.danoRealId = this.mantenedorForm.get('danoRealId')?.value;
    this.modelo.ubicacionId = this.mantenedorForm.get('ubicacionId')?.value;
    this.modelo.lugarEspecifico = this.mantenedorForm.get('lugarEspecifico')?.value;
    this.modelo.centroTrabajoId = this.mantenedorForm.get('idcentrodetrabajo')?.value;
    this.modelo.medidaInmediata = this.mantenedorForm.get('medidaInmediata')?.value;
    this.modelo.tareaId = this.mantenedorForm.get('tareaId')?.value;
    this.modelo.incidenteId = this.mantenedorForm.get('incidenteId')?.value;
    this.modelo.file = this.selectedFiles;
    this.modelo.usuarioReportaId = JSON.parse(localStorage.getItem("userInfo")).idusuario ?? '0'; // Reemplazar con el ID del usuario autenticado


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


    this.centrosdetrabajosService.getall().subscribe({
      next: (data) => {
        this.centrosdetrabajo = data.data;

        if (this.modelo.centroTrabajoId) {
          this.getDataStareas(this.modelo.centroTrabajoId);
        }

      },
      error: (err) => {
        this.centrosdetrabajo = [];
      }
    });
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

    if ((this.mantenedorForm.get('tareaId')?.value != null || this.mantenedorForm.get('tareaId')?.value != 0) && idcentrodetrabajo != null) {
      this.getcargaIncidentes(idcentrodetrabajo, this.mantenedorForm.get('tareaId')?.value);
    }

    this.getdataubicaicones(idcentrodetrabajo);

    //buscar idempresaId en centro de trabajo y asignarlo al modelo 
    const centroTrabajo = this.centrosdetrabajo.find(ct => ct.id === idcentrodetrabajo);
    if (centroTrabajo) {
      this.modelo.empresaId = centroTrabajo.empresaId;
    }

    this.modelo.centroTrabajoId = idcentrodetrabajo;




    const paramssub = `centroTrabajoId=${idcentrodetrabajo}`;

    this.tareasService.getallparams(paramssub).subscribe({
      next: (data) => {
        if (this.modelo.origen == 'I') {
          this.tareas = data.data.filter((t: any) => t.esta_activo === true);
          this.selectedtareas = data.data.filter((t: any) => t.esta_activo === true);
        } else {
          this.tareas = data.data;
          this.selectedtareas = data.data;
        }
      },
      error: (err) => {
        this.tareas = [];
      }
    });
  }

  dataubicaciones: any[] = [];
  getdataubicaicones(idcentrodetrabajo: any) {

    const params = `?centroTrabajoId=${idcentrodetrabajo}`;


    this.ubivacionesservices.getbyparams(params).subscribe({
      next: (data) => {
        this.dataubicaciones = data.data;
      },
      error: (err) => {
        this.dataubicaciones = [];
      }
    });

  }

  agregarprocesossubproceso(idtarea: any) {

    if ((this.mantenedorForm.get('idcentrodetrabajo').value != null || this.mantenedorForm.get('idcentrodetrabajo').value != '') && idtarea != null) {
      this.getcargaIncidentes(this.mantenedorForm.get('idcentrodetrabajo').value, idtarea);
    }

    const tarea = this.tareas.find(t => t.id === idtarea);
    if (tarea) {
      this.modelo.procesoId = tarea.procesoId;
      this.modelo.subProcesoId = tarea.subProcesoId;

    }

    // console.log("tarea seleccionada", this.modelo);

  }

  datadanosProbables: any[] = [];
  getdatadanosProbables() {

    this.lookupsService.danosProbables().subscribe({
      next: (data) => {
        this.datadanosProbables = data.data;
      },
      error: (err) => {
        this.datadanosProbables = [];
      }
    });
  }

  datatipoflash: any[] = [];
  getdatatipoflash() {

    this.tiposOcurrenciasService.getall().subscribe({
      next: (data) => {
        this.datatipoflash = data.data;
      },
      error: (err) => {
        this.datatipoflash = [];
      }
    });
  }



  dataincidentes: any[] = [];
  getcargaIncidentes(centroTrabajoId: any, tareaID: any) {

    const paramssub = `centroTrabajoId=${centroTrabajoId}&tareaId=${tareaID}`;


    this.incidentesService.getallparams(paramssub).subscribe({
      next: (data) => {
        this.dataincidentes = data.data;

      },
      error: (err) => {
        this.dataincidentes = [];
      },

    }
    );
  }


  viewFile(data: any): void {
    //    this._bottomSheet.open(ayudapackComponent ,name:'aqui' );
    let bottonSheet =
      this._bottomSheet.open(VerImagenOcurrenciasComponent, {

        data: data,
        disableClose: false,

      });
    bottonSheet.afterDismissed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }


}