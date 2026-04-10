// Devuelve color según valor VEP para la matriz

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AreasService } from 'src/app/core/services/areas.service';
import { ConsecuenciasService } from 'src/app/core/services/consecuencias.service';
import { IncidentesService } from 'src/app/core/services/incidentes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProbabilidadesService } from 'src/app/core/services/probabilidades.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-tabla-vep-form',
  templateUrl: './tabla-vep-form.component.html',
  styleUrls: ['./tabla-vep-form.component.css']
})
export class TablaVepFormComponent implements OnInit {




  constructor(
    private readonly fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private consecuenciasService: ConsecuenciasService,
    private probabilidadesService: ProbabilidadesService,
    private readonly areasService: AreasService,
    private readonly incidentesService: IncidentesService,
  ) { }

  get vmP() {
    return this._vmP;
  }
  mantenedorForm!: FormGroup;

  incidentes = {
    id: 0,
    nombre: '',
    tareaId: 0,
    tareaNombre: '',
    estado: '',
    rutina: '',
    peligros: [],
    riesgo: {
      id: 0,
      nombre: '',
      critico: ''
    },
    ubicacion: {
      id: 0,
      nombre: '',
      centroTrabajoId: 0
    },
    peligroAdicional: {
      id: 0,
      nombre: ''
    },
    area: {
      id: 0,
      nombre: ''
    },
    factoresRiesgo: [
      {
        id: 0,
        nombre: ''
      }
    ],
    caracterizaciones: [
      {
        id: 0,
        cargoPersonal: {
          id: 0,
          nombre: '',
          centroTrabajoId: 0
        },
        cargoPersonalId: 0,
        cargoPersonalNombre: '',
        caracterizacionPersonal: {
          id: 0,
          nombre: ''
        },
        caracterizacionPersonalId: 0,
        caracterizacionPersonalNombre: '',
        evaluacion: [
          {
            incidenteCaracterizadoId: 0,
            esSistema: null,
            probabilidadRPuroId: 0,
            probabilidadRResidualId: 0,
            consecuenciaRPuroId: 0,
            consecuenciaRResidualId: 0,
            probabilidadRPuro: {
              id: 0,
              nombre: '',
              valor: 0,
              observacionesOperaciones: '',
              observacionesProyectos: ''
            },
            probabilidadRResidual: {
              id: 0,
              nombre: '',
              valor: 0,
              observacionesOperaciones: '',
              observacionesProyectos: ''
            },
            consecuenciaRPuro: {
              id: 0,
              nombre: '',
              valor: 0,
              evaluacionPerdida: ''
            },
            consecuenciaRResidual: {
              id: 0,
              nombre: '',
              valor: 0,
              evaluacionPerdida: ''
            },
            magnitudRPuro: {
              id: 0,
              nombre: '',
              valorMin: 0,
              valorMax: 0
            },
            magnitudRPuroId: 0,
            magnitudRResidual: {
              id: 0,
              nombre: "",
              valorMin: 0,
              valorMax: 0
            },
            magnitudRResidualId: 0
          }
        ],
        cantidadPersonal: 0,
        danosProbables: [],
        medidasDeControl: [
          {
            id: 0,
            nombre: '',
            observacionesDesaprobacion: '',
            incidenteCaracterizadoId: 0,
            incidenteId: 0,
            factorRiesgoId: 0,
            actividadesDeControl: [
              {
                id: 0,
                nombre: '',
                prelacion: '',
                frecuencia: {
                  id: 0,
                  nombre: ''
                },
                empresaId: null,
                esta_activo: null
              }
            ],
            actividadesControlIds: [

            ],
            esta_activo: null
          }
        ]
      }
    ],
    esta_activo: null,
    empresaNombre: '',
    empresaId: 0,
    centroTrabajoNombre: '',
    centroTrabajoId: 0,
    procesoNombre: '',
    procesoId: 0,
    subProcesoNombre: '',
    subProcesoId: 0,
    riesgoId: 0,
    ubicacionId: 0,
    peligroAdicionalId: 0,
    areaId: 0,
    factoresRiesgoIds: [],
    peligrosIds: []
  }
  consecuencia: any;
  probabilidad: any;

  ngOnInit(): void {
   this.getdataareas();

    this.incidentesService.getid(this.vmP.id).subscribe(
      (data) => {

        this.incidentes = data.data || [];

        console.log(" this.incidentes", this.incidentes);
        this.getdataconsecuencias(data.data.empresaId || 0);
        this.getdataprobabilidades(data.data.empresaId || 0);

        this.rellenaFormulario();

      },
      (err) => {
        console.log("error incidentes", err);
      }
    );


  }

  medidasdecontrol: any[] = [];
  rellenaFormulario() {




    this.mantenedorForm = this.fb.group({
      consuecuenciaspuro: [this.incidentes.caracterizaciones[0]?.evaluacion[0]?.consecuenciaRPuroId || ''],
      probabilidadpuro: [this.incidentes.caracterizaciones[0]?.evaluacion[0]?.probabilidadRPuroId || ''],
      consuecuenciasresidual: [this.incidentes.caracterizaciones[0]?.evaluacion[0]?.consecuenciaRResidualId || ''],
      probabilidadresidual: [this.incidentes.caracterizaciones[0]?.evaluacion[0]?.probabilidadRResidualId || '']
    });

    this.getdatacargatabla();
    this.getdatacargatablaresidual();

    //agrupar todas las medidas de control en un solo array
    this.medidasdecontrol = [];
    this.incidentes.caracterizaciones.forEach((caracterizacion) => {
      caracterizacion.medidasDeControl.forEach((medida) => {
        this.medidasdecontrol.push(medida);
      });
    });

    console.log("medidasdecontrol", this.medidasdecontrol);


 
  }

  dataselecconsecuenciaspuro: any = [];
  dataselecconsecuenciasresidual: any = [];
  getdatacargatabla() {
    let consecuencia = this.mantenedorForm.get('consuecuenciaspuro')?.value;

    this.dataselecconsecuenciaspuro = [];
    var pasodataconsecuencia = []
    if (consecuencia != "" || consecuencia != null) {
      pasodataconsecuencia = this.consucuenciasdata.filter((item) => item.id == consecuencia).map((item) => item.observacionesAreas);

      console.log("pasodataconsecuencia", pasodataconsecuencia);
      this.dataselecconsecuenciaspuro = pasodataconsecuencia[0].map((obsareas) => {
        return {
          ...obsareas,
          nombrearea: this.dataareas.find(a => a.id === obsareas.areaId)?.nombre.replace(/_/g, ' ') || 'Desconocido',
        }
      });

      console.log("dataselecconsecuenciaspuro", this.dataselecconsecuenciaspuro);
    }


  }
  getdatacargatablaresidual() {
    let consecuencia = this.mantenedorForm.get('consuecuenciasresidual')?.value;

    this.dataselecconsecuenciasresidual = [];
    var pasodataconsecuencia = []
    if (consecuencia != "" || consecuencia != null) {
      pasodataconsecuencia = this.consucuenciasdata.filter((item) => item.id == consecuencia).map((item) => item.observacionesAreas);

      console.log("pasodataconsecuencia", pasodataconsecuencia);
      this.dataselecconsecuenciasresidual = pasodataconsecuencia[0].map((obsareas) => {
        return {
          ...obsareas,
          nombrearea: this.dataareas.find(a => a.id === obsareas.areaId)?.nombre.replace(/_/g, ' ') || 'Desconocido',
        }
      });

      console.log("dataselecconsecuenciasresidual", this.dataselecconsecuenciasresidual);
    }


  }
  dataareas: any[] = []
  getdataareas() {
    this.areasService.getall().subscribe(
      (data) => {
        console.log("data areas", data);
        this.dataareas = data.data;
      },
      (err) => {
        console.log("error areas", err);
      }
    );
  }

  consucuenciasdata: any[] = []
  probabilidaddata: any[] = []

  dataconcecuenciasparamatriz: any;
  dataprobabilidadesparamatriz: any;


  getdataconsecuencias(idempresa) {

    this.consecuenciasService.getallbyempresa(idempresa).subscribe(
      (data) => {
        this.consucuenciasdata = data.data;
        console.log("data consucuenciasdata", data);
        // Ordenar consecuencias por valor ascendente
        const ordenadas = [...data.data].sort((a, b) => a.valor - b.valor);
        this.dataconcecuenciasparamatriz = ordenadas.map((item) => {
          return {
            valor: item.valor,
          };
        });
        // Si ya están ambos arrays, generar matriz
        if (this.dataconcecuenciasparamatriz?.length && this.dataprobabilidadesparamatriz?.length) {
          this.generarmatrizderiesgo();
        }
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
        console.log("data probabilidades", data);
        // Ordenar probabilidades por valor ascendente
        const ordenadas = [...data.data].sort((a, b) => a.valor - b.valor);
        this.dataprobabilidadesparamatriz = ordenadas.map((item) => {
          return {
            valor: item.valor,
          };
        });
        // Si ya están ambos arrays, generar matriz
        if (this.dataconcecuenciasparamatriz?.length && this.dataprobabilidadesparamatriz?.length) {
          this.generarmatrizderiesgo();
        }
      },
      (err) => {
        this.probabilidaddata = [];
      }
    );

  }

  //con los valores de dataconcecuenciasparamatriz y dataprobabilidadesparamatriz generar una matriz de riesgo en donde probalidad es x y consecuencia es y y se deven multiplicar los valores de cada uno para rellenar la matriz
  matrizderiesgo: any[] = []

  generarmatrizderiesgo() {
    this.matrizderiesgo = [];
    for (let i = 0; i < this.dataprobabilidadesparamatriz.length; i++) {
      let fila: any[] = [];
      for (let j = 0; j < this.dataconcecuenciasparamatriz.length; j++) {
        let valor = this.dataprobabilidadesparamatriz[i].valor * this.dataconcecuenciasparamatriz[j].valor;
        fila.push({
          probabilidad: this.dataprobabilidadesparamatriz[i].valor,
          consecuencia: this.dataconcecuenciasparamatriz[j].valor,
          valor: valor
        });
      }
      this.matrizderiesgo.push(fila);
    }
    console.log("matrizderiesgo", this.matrizderiesgo);
  }

  getColorVEP(valor: number): string {
    if (valor < 5) return '#6fcf97'; // verde
    if (valor < 13) return '#f2c94c'; // amarillo
    if (valor < 64) return '#eb5757'; // naranja
    return '#eb5757'; // rojo
  }


  cancelar() {
    console.log('cancelar');
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute,
    });
  }

}
