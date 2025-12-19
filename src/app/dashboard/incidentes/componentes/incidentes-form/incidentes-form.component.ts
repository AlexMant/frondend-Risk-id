import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actividdesdecontrolService } from 'src/app/core/services/actividdesdecontrol.service';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { LookupsService } from 'src/app/core/services/lookups.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { SubprocesosService } from 'src/app/core/services/subprocesos.service';
import { TareasService } from 'src/app/core/services/tareas.service';

@Component({
  selector: 'app-incidentes-form',
  templateUrl: './incidentes-form.component.html',
  styleUrls: ['./incidentes-form.component.css']
})
export class IncidentesFormComponent implements OnInit {

  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(
    private readonly fb: FormBuilder,
    private readonly lookupsService: LookupsService,
    private readonly empresaService: EmpresaService,
    private readonly procesosService: ProcesosService,
    private readonly subprocesosService: SubprocesosService,
    private readonly tareasService: TareasService,
    private centrosdetrabajosService: CentrosdetrabajosService,
    private actividaddecontrolservice: actividdesdecontrolService

  ) { }
  mantenedorForm!: FormGroup;

  ngOnInit(): void {
    // Inicializar modelo si viene undefined
    this.getdatacargospersonal();
    this.getdataubicaicones(0);

    if (this.modelo.centroTrabajoId) {
      this.getDataprocesos(this.modelo.centroTrabajoId);
    }

    if (this.modelo.procesoId) {
      this.getDataSubProcesos(this.modelo.procesoId);
    }

    if (this.modelo.subProcesoId) {
      this.getDataStareas(this.modelo.subProcesoId);
    }

    this.mantenedorForm = this.fb.group({
      nombre: [this.modelo.nombre, [Validators.required]],
      // estado: [this.modelo.estado,],
      riesgoId: [this.modelo.riesgoId, [Validators.required]],
      ubicacionId: [this.modelo.ubicacionId, [Validators.required]],
      peligroAdicionalId: [this.modelo.peligroAdicionalId, [Validators.required]],
      rutina: [this.modelo.rutina,],
      areaId: [this.modelo.areaId, [Validators.required]],
      factoresRiesgoIds: [this.modelo.factoresRiesgoIds, [Validators.required]],
      peligrosIds: [this.modelo.peligrosIds, [Validators.required]],
      tareaId: [this.modelo.tareaId, [Validators.required]],
      subproaceso: [this.modelo.subProcesoId, [Validators.required]],
      proceso: [this.modelo.procesoId, [Validators.required]],
      idcentrodetrabajo: [this.modelo.centroTrabajoId, [Validators.required]],
      cargoPersonal: ['',]
    });

    this.getDatacentrodetrabajos();
    this.getdatariesgos();
    this.getdatapeligrosadionales();
    this.getdataareas();
    this.getdatafactoresderiesgo();
    this.getdatapeligros();
    this.getdatacaracterizacionpersonal();
    this.getdatadanosProbables();
    this.getdataactividadesdecontrol();

   
 


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
          datadanosProbables: undefined // O puedes mapearlo si tienes la info
        }));
        // Llenar controlesPorCargo con factores de riesgo por cada cargo
        this.controlesPorCargo = this.modelo.caracterizaciones.map((c: any, idx: number) => ({
          cargoIdlinea: this.cargosSeleccionados[idx].linea,
          factores: (c.medidasDeControl || []).map((m: any) => ({
            factorRiesgoId: m.factorRiesgoId,
            nombre: m.nombre || '',
            observacion: m.observaciones_desaprobacion || '',
            actividadControl: m.actividadesControlIds || []
          }))
        }));

        console.log("cargosSeleccionados init", this.cargosSeleccionados);
      }
    }

    // Inicializar controlesPorCargo si ya hay cargos y factores seleccionados
     this.syncControlesPorCargo();
  }

  btnCancelar() {
    this.cancelar.emit();
  }
  btnGuardar() {
    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;
    // this.modelo.estado = this.mantenedorForm.get('estado')?.value;
    this.modelo.riesgoId = this.mantenedorForm.get('riesgoId')?.value;
    this.modelo.ubicacionId = this.mantenedorForm.get('ubicacionId')?.value;
    this.modelo.peligroAdicionalId = this.mantenedorForm.get('peligroAdicionalId')?.value;
    this.modelo.rutina = this.mantenedorForm.get('rutina')?.value;
    this.modelo.areaId = this.mantenedorForm.get('areaId')?.value;
    this.modelo.factoresRiesgoIds = this.mantenedorForm.get('factoresRiesgoIds')?.value;
    this.modelo.peligrosIds = this.mantenedorForm.get('peligrosIds')?.value;
    this.modelo.tareaId = this.mantenedorForm.get('tareaId')?.value;
    this.modelo.subproaceso = this.mantenedorForm.get('subproaceso')?.value;
    this.modelo.proceso = this.mantenedorForm.get('proceso')?.value;

    // Generar la estructura de caracterizaciones
    console.log("cargosSeleccionados al guardar", this.cargosSeleccionados);
    this.modelo.caracterizaciones = this.cargosSeleccionados.map((cargoSel) => {
      const controlCargo = this.controlesPorCargo.find(c => c.cargoIdlinea === cargoSel.linea);
      return {
        cargoPersonalId: cargoSel.id,
        caracterizacionPersonalId: cargoSel.caracterizacionId,
        cantidadPersonal: cargoSel.cantidadPersonal,
        danosProbables: cargoSel.danosProbables || [],
        id: cargoSel.id || 0,
        medidasDeControl: (controlCargo ? controlCargo.factores : []).map(factor => ({
          nombre: factor.nombre,
          observaciones_desaprobacion: factor.observacion,
          actividadesControlIds: factor.actividadControl || [],
          usuarioRevId: 0,
          usuarioCreId: 0,
          usuarioAprId: 0,
          usuarioSupId: 0,
          factorRiesgoId: factor.factorRiesgoId,
          id: 0
        }))
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



  getDataprocesos(idcentrodetrabajo: any) {

    this.getdataubicaicones(idcentrodetrabajo);

    const paramprocesos = `centroTrabajoId=${idcentrodetrabajo}`;

    this.procesosService.getallparams(paramprocesos).subscribe(
      (data) => {

        this.procesos = data.data

      },
      (err) => {
        this.procesos = [];
      }
    );
  }

  getDataSubProcesos(idprocesos: any) {

    const paramssub = `procesoId=${idprocesos}`;

    this.subprocesosService.getallparams(paramssub).subscribe(
      (data) => {

        this.actividades = data.data

      },
      (err) => {
        this.actividades = [];
      }
    );
  }


  getDataStareas(idsubprocsos: any) {

    const paramssub = `subProcesoId=${idsubprocsos}`;

    this.tareasService.getallparams(paramssub).subscribe(
      (data) => {

        this.tareas = data.data

      },
      (err) => {
        this.tareas = [];
      }
    );
  }

  dataubicaciones: any[] = [];
  getdataubicaicones(idcentrodetrabajo: any) {

    this.lookupsService.ubicaciones().subscribe(
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
        console.log("datadanosProbables", this.datadanosProbables);
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
    datadanosProbables?: { id: any, nombre: string }
  }> = [];


  // Permite agregar el cargo seleccionado en el select simple (puede repetirse)
  agregarCargoPersonal() {
    const cargoId = this.mantenedorForm.get('cargoPersonal')?.value;
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
        id: cargo.id,
        nombre: cargo.nombre,
        cantidadPersonal: 1,
        danosProbables: [],
        caracterizacionId: null,
        datadanosProbables: danoProbableObj
      });
      this.syncControlesPorCargo();
    }
    console.log("cargosSeleccionados", this.cargosSeleccionados);
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
        if (!controlCargo.factores.find(f => f.factorRiesgoId === factorId)) {
          controlCargo.factores.push({
            factorRiesgoId: factorId,
            nombre: '',
            observacion: '',
            actividadControl: []
          });
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
  // [{ cargoId, factores: [{ factorRiesgoId, nombre, observacion, actividadControl[] }] }]
  controlesPorCargo: Array<{
    cargoIdlinea: any,
    factores: Array<{
      factorRiesgoId: any,
      nombre: string,
      observacion: string,
      actividadControl: any[]
    }>
  }> = [];

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



 

}