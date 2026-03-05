import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { actividdesdecontrolService } from 'src/app/core/services/actividdesdecontrol.service';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { ConsecuenciasService } from 'src/app/core/services/consecuencias.service';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { IncidentesService } from 'src/app/core/services/incidentes.service';
import { LookupsService } from 'src/app/core/services/lookups.service';
import { MagnitudesService } from 'src/app/core/services/magnitudes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProbabilidadesService } from 'src/app/core/services/probabilidades.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { SubprocesosService } from 'src/app/core/services/subprocesos.service';
import { TareasService } from 'src/app/core/services/tareas.service';
import { UbicacionesService } from 'src/app/core/services/ubicaciones.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { AddUbicacionIncidenteModalComponent } from '../add-ubicacion-incidente-modal/add-ubicacion-incidente-modal.component';
import { EvaluacionRiesgoModalComponent } from '../evaluacion-riesgo-modal/evaluacion-riesgo-modal.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-incidente-ver',
  templateUrl: './incidente-ver.component.html',
  styleUrls: ['./incidente-ver.component.css']
})
export class IncidenteVerComponent implements OnInit {
  personalAfectadoCollapsed: boolean = true;

  constructor(
    private _vmP: VmParametrosService,
    private IncidentesService: IncidentesService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private dialog: MatDialog,
    private readonly lookupsService: LookupsService,
    private readonly empresaService: EmpresaService,
    private readonly procesosService: ProcesosService,
    private readonly subprocesosService: SubprocesosService,
    private readonly tareasService: TareasService,
    private readonly centrosdetrabajosService: CentrosdetrabajosService,
    private readonly actividaddecontrolservice: actividdesdecontrolService,
    private readonly ubivacionesservices: UbicacionesService,
    private readonly usuariosService: UsuariosService,
    private readonly consecuenciasService: ConsecuenciasService,
    private readonly probabilidadesService: ProbabilidadesService,
    private readonly magnitudesService: MagnitudesService,
  ) { }


  modelo: any = {
    id: 0,
    origen: 'E',
    nombre: '',
    estado: '',
    riesgoId: 0,
    riesgoNombre: '',
    centroTrabajoId: 0,
    centroTrabajoNombre: '',
    empresaId: 0,
    empresaNombre: '',
    procesoId: 0,
    procesoNombre: '',
    subProcesoId: 0,
    subProcesoNombre: '',
    ubicacionId: 0,
    ubicacionNombre: '',
    peligroAdicionalId: 0,
    peligroAdicionalNombre: '',
    rutina: '',
    areaId: 0,
    areanombre: '',
    factoresRiesgoIds: [],
    factoresRiesgo: [],
    peligrosIds: [],
    peligros: [],
    tareaId: 0,
    tareaNombre: '',
    caracterizaciones: [],
    esta_activo: true

  };




  get vmP() {
    return this._vmP;
  }

  consecuencia: any;
  probabilidad: any;
  magnitudes: any;
  mostrarCentroTrabajo: boolean = false;
  ngOnInit(): void {

    this.consultarIncidente();

  }

  consultarIncidente() {
    this.IncidentesService.getid(this.vmP.id).subscribe({
      next: (data) => {
        console.log("data incidente ver>>>>><<>>", data);
        const incidente = data.data || {};
        this.modelo = {
          id: incidente.id || 0,
          origen: 'E',
          nombre: incidente.nombre || '',
          estado: incidente.estado || '',
          riesgoId: incidente.riesgoId || 0,
          riesgoNombre: incidente.riesgo.nombre || '',
          centroTrabajoId: incidente.centroTrabajoId || 0,
          centroTrabajoNombre: incidente.centroTrabajoNombre || '',
          empresaId: incidente.empresaId || 0,
          empresaNombre: incidente.empresaNombre || '',
          procesoId: incidente.procesoId || 0,
          procesoNombre: incidente.procesoNombre || '',
          subProcesoId: incidente.subProcesoId || 0,
          subProcesoNombre: incidente.subProcesoNombre || '',
          ubicacionId: incidente.ubicacionId || 0,
          ubicacionNombre: incidente.ubicacion.nombre || '',
          peligroAdicionalId: incidente.peligroAdicionalId || 0,
          peligroAdicionalNombre: incidente.peligroAdicional.nombre || '',
          rutina: incidente.rutina || '',
          areaId: incidente.areaId || 0,
          areanombre: incidente.area.nombre || '',
          factoresRiesgoIds: incidente.factoresRiesgoIds || [],
          factoresRiesgo: incidente.factoresRiesgo || [],
          peligrosIds: incidente.peligrosIds || [],
          peligros: incidente.peligros || [],
          tareaId: incidente.tareaId || 0,
          tareaNombre: incidente.tareaNombre || '',
          caracterizaciones: (incidente.caracterizaciones || []).map((c: any) => ({
            cargoPersonalId: c.cargoPersonalId || 0,
            caracterizacionPersonalNombre: c.caracterizacionPersonalNombre || '',
            cargoPersonalNombre: c.cargoPersonalNombre || '',
            caracterizacionPersonalId: c.caracterizacionPersonalId || 0,
            cantidadPersonal: c.cantidadPersonal || 0,
            danosProbables: c.danosProbables || [],
            id: c.id || 0,
            medidasDeControl: (c.medidasDeControl || []).map((m: any) => ({
              nombre: m.nombre || '',
              observaciones_desaprobacion: m.observacionesDesaprobacion || '',
              actividadControlIds: (m.actividadesControlResponsable || []).map((acrId: any) => acrId.actividadControlId) || [],
              actividadesControlResponsable: (m.actividadesControlResponsable || []).map((acrId: any) => ({
                actividadControlId: acrId.actividadControlId || 0,
                responsableId: acrId.responsableId || ''
              })) || [],

              usuarioRevId: m.usuarioRevId || 0,
              usuarioCreId: m.usuarioCreId || 0,
              usuarioAprId: m.usuarioAprId || 0,
              usuarioSupId: m.usuarioSupId || 0,
              factorRiesgoId: m.factorRiesgoId || 0,
              id: m.id || 0
            })),
            evaluacion: (c.evaluacion || []).map((e: any) => ({
              consecuenciaRPurovalor: e.consecuenciaRPuro && typeof e.consecuenciaRPuro === 'object' ? (e.consecuenciaRPuro.valor || 0) : 0,
              probabilidadRPurovalor: e.probabilidadRPuro && typeof e.probabilidadRPuro === 'object' ? (e.probabilidadRPuro.valor || 0) : 0,
              consecuenciaRResidualvalor: e.consecuenciaRResidual && typeof e.consecuenciaRResidual === 'object' ? (e.consecuenciaRResidual.valor || 0) : 0,
              probabilidadRResidualvalor: e.probabilidadRResidual && typeof e.probabilidadRResidual === 'object' ? (e.probabilidadRResidual.valor || 0) : 0,
              magnitudRPuroNombre: (e.magnitudRPuro && typeof e.magnitudRPuro === 'object' && 'nombre' in e.magnitudRPuro) ? (e.magnitudRPuro.nombre || '') : '',
              magnitudRResidualNombre: (e.magnitudRResidual && typeof e.magnitudRResidual === 'object' && 'nombre' in e.magnitudRResidual) ? (e.magnitudRResidual.nombre || '') : '',
              consecuenciaRPuroId: e.consecuenciaRPuroId || 0,
              consecuenciaRResidualId: e.consecuenciaRResidualId || 0,
              esSistema: e.esSistema || false,
              incidenteCaracterizadoId: e.incidenteCaracterizadoId || 0,
              magnitudRPuroId: e.magnitudRPuroId || 0,
              magnitudRResidualId: e.magnitudRResidualId || 0,
              probabilidadRPuroId: e.probabilidadRPuroId || 0,
              probabilidadRResidualId: e.probabilidadRResidualId || 0,
            }))
          })),
          esta_activo: incidente.esta_activo ?? true
        };

        //ir a cargaFormulariosIndicente una ve  que modelo se encuentre cargado
        this.cargaFormulariosIndicente();
      },
      error: (err) => {
        this.modelo = {};
      }
    }
    );
  }

  cargaFormulariosIndicente() {




    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const idEmpresa = userInfo?.empresaId || 0;

    console.log("userInfo>>>>>>>>>", userInfo);






    this.getdatafactoresderiesgo();

    this.getdatapeligros();
    this.getdatacaracterizacionpersonal();
    this.getdatadanosProbables();
    this.getdataactividadesdecontrol();

    this.getdataconsecuencias(this.modelo.empresaId);
    this.getdataprobabilidades(this.modelo.empresaId);
    this.getdatamagnitudes(this.modelo.empresaId);


    this.getcargaUsuarios(this.modelo.empresaId || 0);









    // Si existen caracterizaciones en el modelo, cargarlas en cargosSeleccionados
    if (this.modelo.origen == 'E') {
      if (this.modelo.caracterizaciones && Array.isArray(this.modelo.caracterizaciones)) {
        this.cargosSeleccionados = this.modelo.caracterizaciones.map((c: any) => ({
          linea: this.lineavalorrandom(),
          id: c.cargoPersonalId,
          nombre: c.cargoPersonalNombre, // Puedes buscar el nombre en datacargospersonal si lo necesitas
          cantidadPersonal: c.cantidadPersonal,
          danosProbables: c.danosProbables || [],
          caracterizacionId: c.caracterizacionPersonalId,
          caracterizacionPersonalNombre: c.caracterizacionPersonalNombre || '',
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
              nombre: m.nombre || '',
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
    id: any,
    nombre: string,
    cantidadPersonal: number,
    danosProbables: any[],
    caracterizacionId: any,
    caracterizacionPersonalNombre: any,
    datadanosProbables?: { id: any, nombre: string },
    evaluacion: any[] // Add this property to fix the error
  }> = [];


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
    const factoresIds = this.modelo.factoresRiesgoIds || [];
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
          const modeloCargo = (this.modelo.caracterizaciones || []).find((c: any) => c.cargoPersonalId === cargo.id && c.caracterizacionPersonalId === cargo.caracterizacionId);
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



    // console.log("valorconecuencia", this.consucuenciasdata);
    // console.log("valorprobabilidad", this.probabilidaddata);

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



    console.log("abrir modal evaluacion de riesgo", control);

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
      if (res == '') {

        console.log("cerrando modal y recargando datos", this.cargosSeleccionados);
        console.log("cargo despues de modal", cargo);

      }
    });


  }



  preloaddescarga: boolean = false;
  logoempresa: string = '';
  primirpdf() {


    this.preloaddescarga = true;

    this.exportarpdf();
  }


  // ...existing code...
  exportarpdf() {
    const cabecera = document.getElementById('cabecera');
    const subcabecera = document.getElementById('subcabecera');
    const carddinamicas = document.getElementById('carddinamicas');
    if (cabecera && subcabecera && carddinamicas) {
      const margin = 20;
      const topMargin = 15;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      const pdfHeight = pdf.internal.pageSize.getHeight() - topMargin - margin;

      pdf.setProperties({
        title: 'Impresion de Incidente - RISKID',
        subject: 'Generado por RISKID.',
        author: 'RISKID',
        keywords: 'equivalencia ambiental, informe, RISKID',
        creator: 'RISKID',
      });

      // Pie de página
      const addFooter = (pageNumber: number) => {
        pdf.setFontSize(6);
        pdf.setTextColor(50);
        pdf.text('La información contenida en este informe proviene directamente desde el sitio risk-id', 20, pdf.internal.pageSize.getHeight() - 16, { align: 'left' });
        pdf.text('Para consultas dirigirse al sitio web.', 20, pdf.internal.pageSize.getHeight() - 13, { align: 'left' });
        pdf.setFont("helvetica", "bold");
        pdf.text('Elaborado por:', 20, pdf.internal.pageSize.getHeight() - 10, { align: 'left' });
        pdf.setFont("helvetica", "normal");
        pdf.text(' RISKID.', 38, pdf.internal.pageSize.getHeight() - 10, { align: 'left' });
        pdf.text(`Página ${pageNumber}`, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 4, { align: 'center' });
        // Logo en la esquina superior derecha
        const logo = new Image();
        logo.src = 'assets/img/logo_sin_fondo.png';
        pdf.addImage(logo, 'PNG', pdf.internal.pageSize.getWidth() - 35, 7, 25, 13);
      };

      // Opciones para html2canvas para fondo transparente
      const h2cOptions = { backgroundColor: null, scale: 2 };

      Promise.all([
        html2canvas(cabecera, h2cOptions),
        html2canvas(subcabecera, h2cOptions),
        html2canvas(carddinamicas, h2cOptions)
      ]).then(([canvasCabecera, canvasSubcabecera, canvasCarddinamicas]) => {
        // --- PRIMERA PÁGINA: cabecera + subcabecera ---
        const totalHeaderHeight = canvasCabecera.height + canvasSubcabecera.height;
        const totalHeaderCanvas = document.createElement('canvas');
        totalHeaderCanvas.width = Math.max(canvasCabecera.width, canvasSubcabecera.width);
        totalHeaderCanvas.height = totalHeaderHeight;
        const ctxHeader = totalHeaderCanvas.getContext('2d');
        ctxHeader.clearRect(0, 0, totalHeaderCanvas.width, totalHeaderCanvas.height);
        ctxHeader.drawImage(canvasCabecera, 0, 0);
        ctxHeader.drawImage(canvasSubcabecera, 0, canvasCabecera.height);

        const imgHeaderData = totalHeaderCanvas.toDataURL('image/png');
        const imgHeaderProps = pdf.getImageProperties(imgHeaderData);
        const imgHeaderPixelWidth = imgHeaderProps.width;
        const imgHeaderPixelHeight = imgHeaderProps.height;
        const ratioHeader = pdfWidth / imgHeaderPixelWidth;
        const headerHeightInPdf = imgHeaderPixelHeight * ratioHeader;

        // --- Calcular espacio disponible en la primera página para carddinamicas ---
        // Reservar espacio para el título (solo primera página)
        const tituloHeight = 12; // Aproximado en mm
        const availableHeightFirstPage = pdfHeight - headerHeightInPdf - tituloHeight;

        // --- carddinamicas ---
        const imgCardProps = {
          width: canvasCarddinamicas.width,
          height: canvasCarddinamicas.height
        };
        const ratioCard = pdfWidth / imgCardProps.width;
        const pagePixelHeight = pdfHeight / ratioCard;

        let renderedHeight = 0;
        let pageNum = 1;

        // --- PRIMERA PÁGINA ---
        // Logo y título en la parte superior

        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(100, 100, 100); // Gris medio
        // Título centrado a la misma altura que el logo (y en la parte superior)
        pdf.text('Reporte de Incidente', pdf.internal.pageSize.getWidth() / 2, 14, { align: 'center' });
        pdf.setTextColor(0, 0, 0); // Restablecer a negro para el resto del PDF
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");

        // Cabecera y subcabecera debajo del título y logo
        pdf.addImage(
          imgHeaderData,
          'PNG',
          margin,
          topMargin + 10, // Deja espacio para el título y logo
          pdfWidth,
          headerHeightInPdf
        );

        // Agregar la primera parte de carddinamicas debajo de la cabecera+subcabecera
        const sHeightFirst = Math.min((availableHeightFirstPage - 10) / ratioCard, imgCardProps.height);
        if (sHeightFirst > 0) {
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = imgCardProps.width;
          pageCanvas.height = sHeightFirst;
          const pageCtx = pageCanvas.getContext('2d');
          pageCtx.drawImage(
            canvasCarddinamicas,
            0, renderedHeight, imgCardProps.width, sHeightFirst,
            0, 0, imgCardProps.width, sHeightFirst
          );
          const pageImgData = pageCanvas.toDataURL('image/png');
          pdf.addImage(
            pageImgData,
            'PNG',
            margin,
            topMargin + headerHeightInPdf + 10,
            pdfWidth,
            sHeightFirst * ratioCard
          );
          renderedHeight += sHeightFirst;
        }
        addFooter(pageNum);
        pageNum++;

        // --- SIGUIENTES PÁGINAS ---
        while (renderedHeight < imgCardProps.height) {
          pdf.addPage();
          const sHeight = Math.min(pagePixelHeight, imgCardProps.height - renderedHeight);
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = imgCardProps.width;
          pageCanvas.height = sHeight;
          const pageCtx = pageCanvas.getContext('2d');
          pageCtx.drawImage(
            canvasCarddinamicas,
            0, renderedHeight, imgCardProps.width, sHeight,
            0, 0, imgCardProps.width, sHeight
          );
          const pageImgData = pageCanvas.toDataURL('image/png');
          pdf.addImage(
            pageImgData,
            'PNG',
            margin,
            topMargin,
            pdfWidth,
            sHeight * ratioCard
          );
          // pdf.addImage('assets/img/logo_sin_fondo.png', 'PNG', pdf.internal.pageSize.getWidth() - 35, 7, 27, 13); // Eliminar esta línea
          addFooter(pageNum);
          renderedHeight += sHeight;
          pageNum++;
        }
        pdf.save('Impresion-incidente_' + new Date().getTime() + '.pdf');
        this.preloaddescarga = false;
        this.snackbar.notify(
          'success',
          'Archivos Generados. Por favor, revise su carpeta de descargas'
        );
      });
    }
  }
  // ...existing code...




  getusuariosnombre(id: any): string {
    const usuario = this.datausuarios.find(u => u.id === id);
    return usuario ? usuario.nombre : 'Desconocido';
  }

  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }


}
