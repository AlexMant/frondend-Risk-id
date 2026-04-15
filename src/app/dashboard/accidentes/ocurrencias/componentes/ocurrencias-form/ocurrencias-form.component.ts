import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';

import { IncidentesService } from 'src/app/core/services/incidentes.service';
import { LookupsService } from 'src/app/core/services/lookups.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TareasService } from 'src/app/core/services/tareas.service';

import { UbicacionesService } from 'src/app/core/services/ubicaciones.service';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TiposOcurrenciasService } from 'src/app/core/services/tipos-ocurrencias.service';
import { OcurrenciasService } from 'src/app/core/services/ocurrencias.service';
import { VerImagenOcurrenciasComponent } from '../ver-imagen-ocurrencias/ver-imagen-ocurrencias.component';
import { TiposDanoService } from 'src/app/core/services/tipos-dano.service';
import { TrabajadoresService } from 'src/app/core/services/trabajadores.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
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
    private readonly ubivacionesservices: UbicacionesService,
    private readonly lookupsService: LookupsService,
    private readonly tiposOcurrenciasService: TiposOcurrenciasService,
    private readonly incidentesService: IncidentesService,
    private readonly ocurrenciasService: OcurrenciasService,
    private readonly tiposdatnos: TiposDanoService,
    private _bottomSheet: MatBottomSheet,
    private readonly trabajadoresServices: TrabajadoresService,
    public permisoService: PermisoService

  ) { }
  mantenedorForm!: FormGroup;
  // selectedFiles: File[] = [];
  selectedFiles: { file: File, status: EstadoArchivo, id: number }[] = [];
  editarform: boolean = true;
  ModoEdit:any = '';
  ngOnInit(): void {
    this.ModoEdit = this.modelo.accion;

    if (this.modelo.accion == 'U') {
      //this.editarform =  false;
     this.editarform = this.permisoService.tienePermisoCompuesto('ADMIN_TRABAJADORES', 'editar') ? true : false;
    }

    this.getdatatipoflash();

    this.getDatacentrodetrabajos();
    this.partesAfectas();

    const fechaOcurrenciaInicial = this.toDate(this.modelo.fechaOcurrencia);
    const horaOcurrenciaInicial = this.toTimeString(fechaOcurrenciaInicial);


    this.mantenedorForm = this.fb.group({

      nombre: [{ value: this.modelo.nombre, disabled: !this.editarform }, [Validators.required]],
      descripcion: [{ value: this.modelo.descripcion, disabled: !this.editarform }, [Validators.required]],
      tipoOcurrenciaId: [{ value: this.modelo.tipoOcurrenciaId, disabled: !this.editarform }, [Validators.required]],
      fechaOcurrencia: [{ value: fechaOcurrenciaInicial, disabled: !this.editarform }, [Validators.required]],
      horaOcurrencia: [{ value: horaOcurrenciaInicial, disabled: !this.editarform }, [Validators.required]],
      danoPotencialId: [{ value: this.modelo.danoPotencialId, disabled: !this.editarform }, [Validators.required]],
      danoRealId: [{ value: this.modelo.danoRealId, disabled: !this.editarform }, [Validators.required]],
   
      lugarEspecifico: [{ value: this.modelo.lugarEspecifico, disabled: !this.editarform }, [Validators.required]],
      tareaId: [{ value: this.modelo.tareaId, disabled: !this.editarform } ],
         ubicacionId: [{ value: this.modelo.ubicacionId, disabled: !this.editarform } ],
      medidaInmediata: [{ value: this.modelo.medidaInmediata, disabled: !this.editarform }, [Validators.required]],
      idcentrodetrabajo: [{ value: this.modelo.centroTrabajoId, disabled: !this.editarform }, [Validators.required]],
      incidenteId: [{ value: this.modelo.incidenteId, disabled: !this.editarform }],
    });
    // this.selectedFiles = this.modelo.file || [];
    for (let archivo of this.modelo.file || []) {
      this.ocurrenciasService.urlToFile(archivo.url, archivo.name, archivo.type).then(file => {
        // // Ahora 'file' es un File real
        // console.log("Archivo convertido a File:", file);
        this.selectedFiles.push({ file, status: 'existente' as EstadoArchivo, id: archivo.id });
      })
    }
    for (let detalle of this.modelo.detalleOcurrencia || []) {
      this.detalleOcurrencia.push({
        id: detalle.id,
        trabajadorId: detalle.trabajadorId,
        // tipodanoId: detalle.tipodanoId,
        parteAfectadaId: detalle.parteAfectadaId,
        status: 'existente' as EstadoArchivo
      });
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
    this.modelo.tipoOcurrenciaId = this.mantenedorForm.get('tipoOcurrenciaId')?.value;
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

    this.modelo.detalleOcurrencia = this.detalleOcurrencia;
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

        // de aqui cargar daños
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


    this.getdatadanosProbables(centroTrabajo.empresaId);
    this.getCargaTrabajador(centroTrabajo.empresaId);

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
  getdatadanosProbables(empresaId: any) {

    const params = `empresaId=${empresaId}`;

    this.tiposdatnos.getbyparams(params).subscribe({
      next: (data) => {
        this.datadanosProbables = data.data;
      },
      error: (err) => {
        this.datadanosProbables = [];
      }
    });
  }
  //-----/tipos-dano este se carga con la empresa del usuario que crea la ocurrencia. 




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


  trabajadorId: any;
  // tipodanoId: any;
  parteAfectadaId: any;

  detalleOcurrencia: any[] = [];



  selectedTrabajador: any = [];
  getCargaTrabajador(empresaId: any) {

    let params = '?empresaId=' + empresaId;
    this.trabajadoresServices.getall().subscribe({
      next: (data) => {


        this.selectedTrabajador = data.data;

      },
      error: (err) => {
        this.selectedTrabajador = [];
      }
    });
  }

  countdetalle() {
    return this.detalleOcurrencia.filter(f => f.status !== 'eliminado').length;
  }

  removeDetalle(index: number) {
    console.log("index a eliminar", index, this.detalleOcurrencia[index]);

    // if (archivo.status === 'existente') {
    this.detalleOcurrencia[index].status = 'eliminado' as EstadoArchivo;
    // } else {
    //   this.detalleOcurrencia = this.detalleOcurrencia.filter((_, i) => i !== index);
    // }
  }

  rellenarDetalleOcurrencia(detalles: { trabajadorId: any, parteAfectadaId: any, status?: EstadoArchivo }[]) {
    console.log("Detalles a agregar:", this.trabajadorId, this.parteAfectadaId, this.parteAfectadaId);

    if (this.trabajadorId == null || this.parteAfectadaId == null || this.trabajadorId === '' || this.parteAfectadaId === '') {
      this.snackbar.notify('danger', 'Debe seleccionar un trabajador y una parte afectada antes de agregar el detalle.');
      return;
    }

    for (const detalle of detalles) {
      this.detalleOcurrencia.push({
        id: this.valoridrandom(), // Asignar un ID único si es necesario

        trabajadorId: detalle.trabajadorId,
        // tipodanoId: detalle.tipodanoId,
        parteAfectadaId: detalle.parteAfectadaId,
        status: detalle.status ?? 'nuevo' as EstadoArchivo
      });
    }

    this.trabajadorId = null;
    // this.tipodanoId = null;
    this.parteAfectadaId = null;
  }


  buscarNombreTrabajador(id: any): string {
    const trabajador = this.selectedTrabajador.find((t: any) => t.id === id);
    return trabajador ? trabajador.nombre : 'Desconocido';
  }

  buscarNombreParteAfectada(id: any): string {
    const parteAfectada = this.dataPartesAfectas.find((p: any) => p.id === id);
    return parteAfectada ? parteAfectada.nombre : 'Desconocido';
  }

  valoridrandom() {
    return Math.random() + Math.random();
  }

  dataPartesAfectas: any[] = [];
  partesAfectas() {

    this.lookupsService.partesAfectadas().subscribe({
      next: (data) => {
        this.dataPartesAfectas = data.data;
        //console.log("partes afectadas", data.data);
      },
      error: (err) => {
        console.log("error partes afectadas", err);
      }
    });
  }



}