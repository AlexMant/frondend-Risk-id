

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { actividdesdecontrolService } from 'src/app/core/services/actividdesdecontrol.service';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { LookupsService } from 'src/app/core/services/lookups.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { SubprocesosService } from 'src/app/core/services/subprocesos.service';
import { TareasService } from 'src/app/core/services/tareas.service';
import { AddUbicacionIncidenteModalComponent } from '../add-ubicacion-incidente-modal/add-ubicacion-incidente-modal.component';
import { UbicacionesService } from 'src/app/core/services/ubicaciones.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { ConsecuenciasService } from 'src/app/core/services/consecuencias.service';
import { MagnitudesService } from 'src/app/core/services/magnitudes.service';
import { ProbabilidadesService } from 'src/app/core/services/probabilidades.service';
import { EvaluacionRiesgoModalComponent } from '../evaluacion-riesgo-modal/evaluacion-riesgo-modal.component';

@Component({
  selector: 'app-incidentes-form',
  templateUrl: './incidentes-form.component.html',
  styleUrls: ['./incidentes-form.component.css']
})
export class IncidentesFormComponent implements OnInit {

  personalAfectadoCollapsed: boolean = true;

  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(
    private readonly fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private readonly lookupsService: LookupsService,
    private readonly empresaService: EmpresaService,
    private readonly procesosService: ProcesosService,
    private readonly subprocesosService: SubprocesosService,
    private readonly tareasService: TareasService,
    private centrosdetrabajosService: CentrosdetrabajosService,
    private actividaddecontrolservice: actividdesdecontrolService,
    private readonly ubivacionesservices: UbicacionesService,
    private readonly usuariosService: UsuariosService,

    private consecuenciasService: ConsecuenciasService,
    private probabilidadesService: ProbabilidadesService,
    private readonly magnitudesService: MagnitudesService,


  ) { }
  mantenedorForm!: FormGroup;
  consecuencia: any;
  probabilidad: any;
  magnitudes: any;
  mostrarCentroTrabajo: boolean = true;
  ngOnInit(): void {



    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const idEmpresa = userInfo?.empresaId || 0;

    console.log("userInfo>>>>>>>>>", userInfo);

    this.getdatacargospersonal();

    this.getDatacentrodetrabajos();
    this.getdatariesgos();
    this.getdatapeligrosadionales();
    this.getdataareas();
    this.getdatafactoresderiesgo();
    this.getdatapeligros();
    this.getdatacaracterizacionpersonal();
    this.getdatadanosProbables();
    this.getdataactividadesdecontrol();



    if (this.modelo.origen == 'E') {
      this.getdataconsecuencias(this.modelo.empresaId);
      this.getdataprobabilidades(this.modelo.empresaId);
      this.getdatamagnitudes(this.modelo.empresaId);

      this.getDataStareas(this.modelo.centroTrabajoId);
      this.getcargaUsuarios(this.modelo.empresaId || 0);

    } else {

      this.getdataconsecuencias(idEmpresa);
      this.getdataprobabilidades(idEmpresa);
      this.getdatamagnitudes(idEmpresa);

      this.modelo.centroTrabajoId = userInfo.centroTrabajoIds[0];
      this.modelo.empresaId = idEmpresa;



      this.getDataStareas(this.modelo.centroTrabajoId);
      this.getcargaUsuarios(idEmpresa);






    }








    this.mantenedorForm = this.fb.group({
      nombre: [this.modelo.nombre, [Validators.required]],
      // estado: [this.modelo.estado,],
      riesgoId: [this.modelo.riesgoId],
      ubicacionId: [this.modelo.ubicacionId],
      peligroAdicionalId: [this.modelo.peligroAdicionalId],
      // rutina: [this.modelo.rutina,],
      areaId: [this.modelo.areaId],
      factoresRiesgoIds: [this.modelo.factoresRiesgoIds],
      peligrosIds: [this.modelo.peligrosIds],
      tareaId: [this.modelo.tareaId, [Validators.required]],
      // subproaceso: [this.modelo.subProcesoId, [Validators.required]],
      // proceso: [this.modelo.procesoId, [Validators.required]],
      idcentrodetrabajo: [this.modelo.centroTrabajoId, [Validators.required]],
      cargoPersonal: ['',]
    });



    // Si existen caracterizaciones en el modelo, cargarlas en cargosSeleccionados
    if (this.modelo.origen == 'E') {
      if (this.modelo.caracterizaciones && Array.isArray(this.modelo.caracterizaciones)) {
        this.cargosSeleccionados = this.modelo.caracterizaciones.map((c: any) => ({
          linea: this.lineavalorrandom(),
          id: c.id,
          cargoPersonalId: c.cargoPersonalId,
          nombre: c.cargoPersonalNombre, // Puedes buscar el nombre en datacargospersonal si lo necesitas
          cantidadPersonal: c.cantidadPersonal,
          danosProbables: c.danosProbables || [],
          caracterizacionId: c.caracterizacionPersonalId,
          datadanosProbables: c.danosProbables || [],  // O puedes mapearlo si tienes la info
          evaluacion: c.evaluacion.map((e: any) => ({
            consecuenciaRPurovalor: e.consecuenciaRPurovalor || 0,
            probabilidadRPurovalor: e.probabilidadRPurovalor || 0,
            consecuenciaRResidualvalor: e.consecuenciaRResidualvalor || 0,
            probabilidadRResidualvalor: e.probabilidadRResidualvalor || 0,
            consecuenciaRPuroId: e.consecuenciaRPuroId || 0,
            consecuenciaRResidualId: e.consecuenciaRResidualId || 0,
            esSistema: e.esSistema || false,
            incidenteCaracterizadoId: e.incidenteCaracterizadoId || 0,
            magnitudRPuroId: e.magnitudRPuroId || 0,
            magnitudRResidualId: e.magnitudRResidualId || 0,
            probabilidadRPuroId: e.probabilidadRPuroId || 0,
            probabilidadRResidualId: e.probabilidadRResidualId || 0,
            resultadoPuro: ((e.consecuenciaRPurovalor || 0) * (e.probabilidadRPurovalor || 0)),
            resultadoResidual: ((e.consecuenciaRResidualvalor || 0) * (e.probabilidadRResidualvalor || 0)),
            colorRpuro: this.getColorVEP((e.consecuenciaRPurovalor || 0) * (e.probabilidadRPurovalor || 0)),
            magnitudRPuroNombre: e.magnitudRPuroNombre || '',
            colorResidual: this.getColorVEP((e.consecuenciaRResidualvalor || 0) * (e.probabilidadRResidualvalor || 0)),
            magnitudRResidualNombre: e.magnitudRResidualNombre || '',

          }))
        }));
        // Llenar controlesPorCargo con factores de riesgo por cada cargo
        // Agrupar medidasDeControl por factorRiesgoId para cada caracterización
        this.controlesPorCargo = this.modelo.caracterizaciones.map((c: any, idx: number) => {
          // Agrupar medidas por factorRiesgoId
          const medidasPorFactor: { [key: string]: any[] } = {};
          const evaluacionPorFactor: { [key: string]: any[] } = {};





          (c.medidasDeControl || []).forEach((m: any) => {
            if (!medidasPorFactor[m.factorRiesgoId]) medidasPorFactor[m.factorRiesgoId] = [];
            medidasPorFactor[m.factorRiesgoId].push({
              nombre: m.nombre || '   ',
              id: m.id || undefined,
              actividadControlIds: (m.actividadControlIds || []) || [],
              actividadesControlResponsable: m.actividadesControlResponsable.map((acr: any) => {
                return {
                  actividadControlId: acr.actividadControlId || 0
                  , responsableId: acr.responsableId || 0
                }
              }) || [],
              observacion: m.observaciones_desaprobacion || ''
            });
          });
          // Crear factores con sus medidas
          const factores = Object.keys(medidasPorFactor).map(factorId => ({
            factorRiesgoId: +factorId,
            nombre: '',
            observacion: '',

            actividadesControlResponsable: [],
            medidas: medidasPorFactor[factorId]
          }));
          return {
            cargoIdlinea: this.cargosSeleccionados[idx].linea,
            factores
          };




        });


      }
    }
    console.log("RELLENAR PANTALLA>>>>>>>", this.cargosSeleccionados, this.controlesPorCargo);

    // Inicializar controlesPorCargo si ya hay cargos y factores seleccionados
    this.syncControlesPorCargo();
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
    // this.modelo.estado = this.mantenedorForm.get('estado')?.value;
    this.modelo.riesgoId = this.mantenedorForm.get('riesgoId')?.value ?? null;
    this.modelo.ubicacionId = this.mantenedorForm.get('ubicacionId')?.value ?? null;
    this.modelo.peligroAdicionalId = this.mantenedorForm.get('peligroAdicionalId')?.value ?? null;
    // this.modelo.rutina = this.mantenedorForm.get('rutina')?.value;
    this.modelo.areaId = this.mantenedorForm.get('areaId')?.value ?? null;
    this.modelo.factoresRiesgoIds = this.mantenedorForm.get('factoresRiesgoIds')?.value ?? null;
    this.modelo.peligrosIds = this.mantenedorForm.get('peligrosIds')?.value ?? null;
    this.modelo.tareaId = this.mantenedorForm.get('tareaId')?.value ?? null;
    this.modelo.subproaceso = this.mantenedorForm.get('subproaceso')?.value ?? null;
    this.modelo.proceso = this.mantenedorForm.get('proceso')?.value ?? null;
    // Generar la estructura de caracterizaciones
    // console.log("cargosSeleccionados al guardar", this.cargosSeleccionados);
    // console.log("controlesPorCargo al guardar", this.controlesPorCargo);
    this.modelo.caracterizaciones = this.cargosSeleccionados.map((cargoSel) => {
      const controlCargo = this.controlesPorCargo.find(c => c.cargoIdlinea === cargoSel.linea);
      // console.log("controlCargo", controlCargo);
      return {
        cargoPersonalId: cargoSel.cargoPersonalId ?? 8,
        id: cargoSel.id ?? undefined,
        caracterizacionPersonalId: (cargoSel.caracterizacionId === null || cargoSel.caracterizacionId === undefined || cargoSel.caracterizacionId === '') ? 8 : cargoSel.caracterizacionId,
        cantidadPersonal: cargoSel.cantidadPersonal,
        danosProbables: cargoSel.datadanosProbables || [],
        medidasDeControl: (controlCargo ? [].concat(...controlCargo.factores.map((factor: any) => {
          return factor.medidas.map((medida: any) => ({
            id: medida.id || undefined,
            nombre: medida.nombre || '   ',

            observaciones_desaprobacion: medida.observacion || '',
            // actividadControlIds: medida.actividadControlIds || [],
            actividadesControlResponsable: medida.actividadesControlResponsable.map((acr: any) => {
              return {
                actividadControlId: acr.actividadControlId || null,
                responsableId: acr.responsableId || null
              }
            }) || [],
            usuarioRevId: 0,
            usuarioCreId: 0,
            usuarioAprId: 0,
            usuarioSupId: 0,
            factorRiesgoId: factor.factorRiesgoId || null,

          }));
        })) : []),
      };
    });


    console.log("modelo final", this.modelo);

    this.guardar.emit();
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

  datariesgos: any[] = [];
  getdatariesgos() {

    this.lookupsService.riesgos().subscribe(
      (data) => {
        this.datariesgos = data.data;
      },
      (err) => {
        this.datariesgos = [];
      }
    );

  }
  datapeligrosadionales: any[] = [];
  getdatapeligrosadionales() {

    this.lookupsService.peligrosAdicionales().subscribe(
      (data) => {
        this.datapeligrosadionales = data.data;
      },
      (err) => {
        this.datapeligrosadionales = [];
      }
    );

  }


  dataareas: any[] = [];
  getdataareas() {

    this.lookupsService.areas().subscribe(
      (data) => {
        this.dataareas = data.data;
      },
      (err) => {
        this.dataareas = [];
      }
    );

  }

  datafactoresriesgo: any[] = [];
  getdatafactoresderiesgo() {

    this.lookupsService.factoresRiesgo().subscribe(
      (data) => {
        this.datafactoresriesgo = data.data;
      },
      (err) => {
        this.datafactoresriesgo = [];
      }
    );

  }

  datapeligros: any[] = [];
  getdatapeligros() {

    this.lookupsService.peligro().subscribe(
      (data) => {
        this.datapeligros = data.data;
      },
      (err) => {
        this.datapeligros = [];
      }
    );

  }


  selectCargapersonal: any = [];
  datacargospersonal: any[] = [];
  getdatacargospersonal() {

    this.lookupsService.cargosPersonal().subscribe(
      (data) => {
        this.datacargospersonal = data.data;
      },
      (err) => {
        this.datacargospersonal = [];
      }
    );

  }

  datacarectizacionpersonal: any[] = [];
  getdatacaracterizacionpersonal() {

    this.lookupsService.caracterizacionesPersonal().subscribe(
      (data) => {
        this.datacarectizacionpersonal = data.data;
      },
      (err) => {
        this.datacarectizacionpersonal = [];
      }
    );
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

  dataactividadesdecontrol: any[] = [];
  getdataactividadesdecontrol() {

    this.actividaddecontrolservice.getall().subscribe(
      (data) => {

        this.dataactividadesdecontrol = data.data;
      },
      (err) => {
        this.dataactividadesdecontrol = [];
      }
    );
  }



  cargosSeleccionados: Array<{
    linea: number,
    cargoPersonalId: any,
    id: any,
    nombre: string,
    cantidadPersonal: number,
    danosProbables: any[],
    caracterizacionId: any,
    datadanosProbables?: { id: any, nombre: string },
    evaluacion: any[] // Add this property to fix the error
  }> = [];


  // Permite agregar el cargo seleccionado en el select simple (puede repetirse)
  agregarCargoPersonal() {
    const cargoId = this.mantenedorForm.get('cargoPersonal')?.value;
    const cargoSeleccionado = this.datacargospersonal.find(c => c.id === cargoId)?.nombre || '';
    // Eliminar todos los caracteres que no sean letras (mayúsculas o minúsculas)
    const cargoSeleccionadoSoloLetras = cargoSeleccionado.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');



    if (cargoId === null || cargoId === undefined || cargoId === '' || cargoId === 0) {
      this.snackbar.notify('warning', 'Seleccione un cargo personal válido antes de agregar.');
      return;
    }

    if (this.cargosSeleccionados.length === 0) {
      if (typeof cargoSeleccionado === 'string' && cargoSeleccionadoSoloLetras.trim().toLowerCase() != 'toda la dotación') {
        this.snackbar.notify('warning', 'Debe seleccionar "Toda La Dotación" como primera carectización.');
        return;
      }

    }





    if (!cargoId) return;
    const cargo = this.datacargospersonal.find((c: any) => c.id === cargoId);
    // Buscar el primer daño probable si existe
    let danoProbableObj = null;
    // if (this.datadanosProbables && this.datadanosProbables.length > 0) {
    //   const dano = this.datadanosProbables[0];
    //   danoProbableObj = null;
    // }
    if (cargo) {
      this.cargosSeleccionados.push({
        linea: this.lineavalorrandom(),
        cargoPersonalId: cargo.id,
        id: null,
        nombre: cargo.nombre,
        cantidadPersonal: 1,
        danosProbables: [],
        caracterizacionId: null,
        datadanosProbables: danoProbableObj,
        evaluacion: []
      });
      this.syncControlesPorCargo();
    }
    // console.log("cargosSeleccionados", this.cargosSeleccionados);
  }

  lineavalorrandom(): number {
    return Math.floor(Math.random() * 100000);
  }

  // Ya no se requiere onCargoPersonalChange, el select es simple y se agrega con el botón

  // Eliminar cargo personal de la lista
  eliminarCargoPersonal(linea: number) {
    this.cargosSeleccionados = this.cargosSeleccionados.filter(c => c.linea !== linea);
    this.controlesPorCargo = this.controlesPorCargo.filter(c => c.cargoIdlinea !== linea);
  }

  // Sincroniza la estructura controlesPorCargo con los cargos y factores seleccionados
  syncControlesPorCargo() {
    const factoresIds = this.mantenedorForm?.get('factoresRiesgoIds')?.value || [];
    // Para cada cargo seleccionado
    this.cargosSeleccionados.forEach(cargo => {
      let controlCargo = this.controlesPorCargo.find(c => c.cargoIdlinea === cargo.linea);
      if (!controlCargo) {
        controlCargo = { cargoIdlinea: cargo.linea, factores: [] };
        this.controlesPorCargo.push(controlCargo);
      }
      // Para cada factor de riesgo seleccionado
      factoresIds.forEach(factorId => {
        let factor = controlCargo.factores.find(f => f.factorRiesgoId === factorId);
        if (!factor) {
          // Si existen datos previos en el modelo, intentar recuperarlos
          const modeloCargo = (this.modelo.caracterizaciones || []).find((c: any) => c.cargoPersonalId === cargo.cargoPersonalId && c.id === cargo.id && c.caracterizacionPersonalId === cargo.caracterizacionId);
          let medidasPrevias = [];
          if (controlCargo && Array.isArray(controlCargo.factores)) {
            // Si ya existen medidas cargadas para este factor, consérvalas
            const existente = controlCargo.factores.find(f => f.factorRiesgoId === factorId);
            if (existente && Array.isArray(existente.medidas)) {
              medidasPrevias = existente.medidas;
            }
          }
          if (!medidasPrevias.length && modeloCargo && Array.isArray(modeloCargo.medidasDeControl)) {
            medidasPrevias = modeloCargo.medidasDeControl.filter((m: any) => m.factorRiesgoId === factorId).map((m: any) => ({
              nombre: m.nombre || '',
              actividadControlIds: m.actividadControlIds || [],
              actividadesControlResponsable: m.actividadesControlResponsable || [],
              observacion: m.observaciones_desaprobacion || ''
            }));
          }
          factor = {
            factorRiesgoId: factorId,
            nombre: '',
            observacion: '',
            actividadControlIds: [],
            actividadesControlResponsable: [],
            medidas: medidasPrevias.length > 0 ? medidasPrevias : []
          };
          controlCargo.factores.push(factor);
        } else if (!Array.isArray(factor.medidas)) {
          factor.medidas = [];
        }
      });
      // Eliminar factores que ya no están seleccionados
      controlCargo.factores = controlCargo.factores.filter(f => factoresIds.includes(f.factorRiesgoId));
    });
    // Eliminar controles de cargos que ya no están
    this.controlesPorCargo = this.controlesPorCargo.filter(c => this.cargosSeleccionados.find(cs => cs.linea === c.cargoIdlinea));
  }

  // Llamar cuando cambian los factores de riesgo
  onFactoresRiesgoChange(selectedIds: any[]) {
    this.syncControlesPorCargo();
  }


  // Estructura para datos de control por cargo y factor de riesgo
  // [{ cargoId, factores: [{ factorRiesgoId, nombre, observacion, actividadControl[], medidas: [{nombre, actividadControl[]}] }] }]
  controlesPorCargo: Array<{
    cargoIdlinea: any,
    factores: Array<{
      factorRiesgoId: any,
      nombre: string,
      observacion: string,
      actividadControlIds: any[],
      actividadesControlResponsable: any[],
      medidas: Array<{ nombre: string, actividadControlIds: any[], actividadesControlResponsable: any[], observacion?: string }>
    }>
  }> = [];
  // Métodos para agregar/eliminar medidas de control
  agregarMedidaDeControl(control: any) {
    if (!control.medidas) {
      control.medidas = [];
    }
    control.medidas.push({ nombre: '', actividadesControlResponsable: [] });
  }

  eliminarMedidaDeControl(control: any, index: number) {
    if (control.medidas && control.medidas.length > 1) {
      control.medidas.splice(index, 1);
    }
  }

  // Devuelve los factores de riesgo para un cargo específico
  getFactoresPorCargo(cargoIdlinea: any): any[] {
    const control = this.controlesPorCargo.find((c: any) => c.cargoIdlinea === cargoIdlinea);

    return control ? control.factores : [];
  }

  // Devuelve el nombre del factor de riesgo dado su id
  getNombreFactorRiesgo(factorId: any): string {
    const factor = this.datafactoresriesgo?.find((f: any) => f.id === factorId);
    return factor ? factor.nombre : 'Factor';
  }
  // Array para cargos personales seleccionados



  addubicacionnow: boolean = true; //true muestra el boton de agregar ubicacion y false lo oculta

  addubicacion() {

    if (this.modelo.centroTrabajoId == 0) {
      this.snackbar.notify('warning', 'Debe seleccionar un centro de trabajo antes de agregar una ubicación.');
      return;
    }

    const datos = {
      origen: 'U',
      idempresa: this.modelo.empresaId,
      idcentrotrabajo: this.modelo.centroTrabajoId
    }


    // console.log("openAgendar", dataAll);
    this.dialog.open(AddUbicacionIncidenteModalComponent, {
      autoFocus: false,
      disableClose: false,
      data: datos,
    }).afterClosed().subscribe((res) => {
      if (res == 'ubicacion') {

        this.getdataubicaicones(this.modelo.centroTrabajoId);

      }
    });


  }

  addriesgonow: boolean = true; //true muestra el boton de agregar ubicacion y false lo oculta
  addriesgo() {

    const datos = {
      origen: 'R',
      idempresa: this.modelo.empresaId,
      idcentrotrabajo: this.modelo.centroTrabajoId
    }


    // console.log("openAgendar", dataAll);
    this.dialog.open(AddUbicacionIncidenteModalComponent, {
      autoFocus: false,
      disableClose: false,
      data: datos,
    }).afterClosed().subscribe((res) => {
      if (res == 'riesgo') {
        this.getdatariesgos();
      }
    });


  }
  addpeligroadicionalnow: boolean = true; //true muestra el boton de agregar ubicacion y false lo oculta
  addpeligroadicional() {

    const datos = {
      origen: 'P',
      idempresa: this.modelo.empresaId,
      idcentrotrabajo: this.modelo.centroTrabajoId
    }


    // console.log("openAgendar", dataAll);
    this.dialog.open(AddUbicacionIncidenteModalComponent, {
      autoFocus: false,
      disableClose: false,
      data: datos,
    }).afterClosed().subscribe((res) => {
      if (res == 'peligroadicional') {
        this.getdatapeligrosadionales();
      }
    });


  }


  agregarprocesossubproceso(idtarea: any) {

    const tarea = this.tareas.find(t => t.id === idtarea);
    if (tarea) {
      this.modelo.procesoId = tarea.procesoId;
      this.modelo.subProcesoId = tarea.subProcesoId;

    }

    // console.log("tarea seleccionada", this.modelo);

  }

  onActividadControlIdsChange(medida: any, selectedIds: number[]) {
    // Elimina los que ya no están seleccionados
    medida.actividadesControlResponsable = (medida.actividadesControlResponsable || []).filter((item: any) =>
      selectedIds.includes(item.actividadControlId)
    );
    // Agrega los nuevos seleccionados
    selectedIds.forEach(id => {
      if (!medida.actividadesControlResponsable.some((item: any) => item.actividadControlId === id)) {
        medida.actividadesControlResponsable.push({
          actividadControlId: id,
          responsableId: 0
        });
      }
    });
  }

  onActividadresponsableIDChange(actividadControlId: any, responsableID: any, medida: any) {


    if (!medida || !Array.isArray(medida.actividadesControlResponsable)) return;
    const actividad = medida.actividadesControlResponsable.find((item: any) => item.actividadControlId === actividadControlId);
    if (actividad) {
      actividad.responsableId = responsableID;
    }
  }


  datausuarios: any[] = [];
  getcargaUsuarios(empresaId: number) {

    console.log("filtros_getcargaUsuarios", empresaId)
    const params = '?empresaId=' + empresaId;
    this.usuariosService.getallbyparametros(params).subscribe(
      (data) => {
        console.log("data usuarios", data)

        this.datausuarios = data.data || [];

      },
      (err) => {
        this.datausuarios = [];
      }
    );
  }



  getNombreActividadControl(id: any): string {
    const actividad = this.dataactividadesdecontrol.find(a => a.id === id);
    return actividad ? actividad.nombre : 'Actividad';
  }
  getprelacionactividadControl(id: any): string {
    const actividad = this.dataactividadesdecontrol.find(a => a.id === id);
    return actividad ? actividad.prelacion : 'N/A';
  }
  getfrecuenciaactividadControl(id: any): string {
    const actividad = this.dataactividadesdecontrol.find(a => a.id === id);
    return actividad ? actividad.frecuencia.nombre : 'N/A';
  }

  permisosparamostrarenpantalla() {




  }





  consucuenciasdata: any[] = []
  probabilidaddata: any[] = []

  getdataconsecuencias(idempresa) {
    this.consecuenciasService.getallbyempresa(idempresa).subscribe(
      (data) => {
        console.log("data consecuencias>>>>>>>", data);
        this.consucuenciasdata = data.data;
      },
      (err) => {
        this.consucuenciasdata = [];
      }
    );

  }

  getdataprobabilidades(idempresa) {

    this.probabilidadesService.getallbyempresa(idempresa).subscribe(
      (data) => {
        this.probabilidaddata = data.data;
      },
      (err) => {
        this.probabilidaddata = [];
      }
    );

  }
  getdatamagnitudes(idempresa) {

    this.magnitudesService.getallbyempresa(idempresa).subscribe(
      (data) => {
        this.magnitudes = data.data;
      },
      (err) => {
        this.magnitudes = [];
      }
    );
  }


  getColorVEP(valor: number): string {
    if (valor < 5) return '#6fcf97'; // verde
    if (valor < 13) return '#f2c94c'; // amarillo
    if (valor < 64) return '#eb5757'; // naranja
    return '#eb5757'; // rojo
  }


  getdatacargatabla(valorconecuencia: any, valorprobabilidad: any) {



    // console.log("valorconecuencia", valorconecuencia);
    // console.log("valorprobabilidad", valorprobabilidad);

    // const valorconecuencia = this.consucuenciasdata.find((item) => item.id == consecuencia)?.valor;
    // const valorprobabilidad = this.probabilidaddata.find((item) => item.id == probabilidad)?.valor;



    if (valorprobabilidad && valorconecuencia && this.magnitudes?.length) {
      const resultado = valorprobabilidad * valorconecuencia;

      let magnitudEncontrada = this.magnitudes.find(
        (m: any) => resultado >= m.valorMin && resultado <= m.valorMax
      );

      if (!magnitudEncontrada) {
        // Si el resultado es menor que todos los valorMin, seleccionar el de valorMin más bajo
        const minMagnitud = this.magnitudes.reduce((prev: any, curr: any) =>
          prev.valorMin < curr.valorMin ? prev : curr
        );
        const maxMagnitud = this.magnitudes.reduce((prev: any, curr: any) =>
          prev.valorMax > curr.valorMax ? prev : curr
        );
        if (resultado < minMagnitud.valorMin) {
          magnitudEncontrada = minMagnitud;
        } else if (resultado > maxMagnitud.valorMax) {
          // Si el resultado es mayor que todos los valorMax, seleccionar el de valorMax más cercano
          magnitudEncontrada = this.magnitudes
            .filter((m: any) => m.valorMax <= resultado)
            .sort((a: any, b: any) => b.valorMax - a.valorMax)[0] || maxMagnitud;
        }
      }

      return magnitudEncontrada = {
        ...magnitudEncontrada,
        color: this.getColorVEP(resultado),
        valorObtenido: resultado
      };

    }

  }





  openEvaluacionRiesgoModal(tipo: any, cargo: any, control: any) {



    console.log("abrir modal evaluacion de riesgo", this.cargosSeleccionados);

    const datos = {
      origen: tipo,
      cargo: cargo,
      control: control,
      dataactividadesdecontrol: this.dataactividadesdecontrol,
      datausuarios: this.datausuarios,
      consecuenciasdata: this.consucuenciasdata,
      probabilidaddata: this.probabilidaddata,
      magnitudesdata: this.magnitudes,
      modelo: this.modelo,
      datafactoresriesgo: this.datafactoresriesgo,
      dataareas: this.dataareas
    }


    // console.log("openAgendar", dataAll);
    this.dialog.open(EvaluacionRiesgoModalComponent, {
      autoFocus: false,
      disableClose: false,
      data: datos,
    }).afterClosed().subscribe((res) => {
      if (res) {
        console.log("resultado evaluacion de riesgo modal res", res);
        // res tiene la estructura de modeloguardaEvaluacion
        this.cargosSeleccionados = this.cargosSeleccionados.map((c) => {
          if (c.linea === cargo.linea) {
            // Cálculos adicionales para resultado puro y residual
            const consecuenciaRPurovalor = res.consecuenciaRPurovalor ?? 0;
            const probabilidadRPurovalor = res.probabilidadRPurovalor ?? 0;
            const consecuenciaRResidualvalor = res.consecuenciaRResidualvalor ?? 0;
            const probabilidadRResidualvalor = res.probabilidadRResidualvalor ?? 0;

            const resultadoPuro = consecuenciaRPurovalor * probabilidadRPurovalor;
            const resultadoResidual = consecuenciaRResidualvalor * probabilidadRResidualvalor;

            // Obtener magnitud y color para puro
            const magnitudPuro = this.getdatacargatabla(consecuenciaRPurovalor, probabilidadRPurovalor) || {};
            // Obtener magnitud y color para residual
            const magnitudResidual = this.getdatacargatabla(consecuenciaRResidualvalor, probabilidadRResidualvalor) || {};

            return {
              ...c,
              evaluacion: [{
                incidenteCaracterizadoId: res.incidenteCaracterizadoId ?? 0,
                probabilidadRResidualId: res.probabilidadRResidualId ?? 0,
                consecuenciaRResidualId: res.consecuenciaRResidualId ?? 0,
                probabilidadRPuroId: res.probabilidadRPuroId ?? 0,
                consecuenciaRPuroId: res.consecuenciaRPuroId ?? 0,
                esSistema: res.esSistema ?? false,
                resultadoPuro: resultadoPuro,
                resultadoResidual: resultadoResidual,
                colorRpuro: magnitudPuro.color || this.getColorVEP(resultadoPuro),
                magnitudRPuroNombre: magnitudPuro.nombre || '',
                colorResidual: magnitudResidual.color || this.getColorVEP(resultadoResidual),
                magnitudRResidualNombre: magnitudResidual.nombre || ''
              }]
            };
          }
          return c;
        });

        console.log("resultado evaluacion de riesgo modal", this.cargosSeleccionados);
      }
    });


  }



}