// Devuelve color según valor VEP para la matriz

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AreasService } from 'src/app/core/services/areas.service';
import { ConsecuenciasService } from 'src/app/core/services/consecuencias.service';
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
  ) { }

  get vmP() {
    return this._vmP;
  }
  mantenedorForm!: FormGroup;

  incidentes: any[] = [];
  consecuencia: any;
  probabilidad: any;

  ngOnInit(): void {

    this.mantenedorForm = this.fb.group({
      consuecuencias: [''],
      probabilidad: ['']

    });

    this.getdataareas();
    this.getdataconsecuencias(0);
    this.getdataprobabilidades(0);

  }

  dataselecconsecuencias: any = [];
  getdatacargatabla() {
    let consecuencia = this.mantenedorForm.get('consuecuencias')?.value;
    let probabilidad = this.mantenedorForm.get('probabilidad')?.value;

    this.dataselecconsecuencias = [];
    var pasodataconsecuencia = []
    if (consecuencia != "" || consecuencia != null) {
      pasodataconsecuencia = this.consucuenciasdata.filter((item) => item.id == consecuencia).map((item) => item.observacionesAreas);

      console.log("pasodataconsecuencia", pasodataconsecuencia);
      this.dataselecconsecuencias = pasodataconsecuencia[0].map((obsareas) => {
        return {
          ...obsareas,

          nombrearea: this.dataareas.find(a => a.id === obsareas.areaId)?.nombre || 'Desconocido',


        }
      });

      console.log("dataselecconsecuencias", this.dataselecconsecuencias);
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

    this.consecuenciasService.getall().subscribe(
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

    this.probabilidadesService.getall().subscribe(
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
    if (valor < 20) return '#6fcf97'; // verde
    if (valor < 100) return '#f2c94c'; // amarillo
    if (valor < 300) return '#f2994a'; // naranja
    return '#eb5757'; // rojo
  }


    cancelar() {
    console.log('cancelar');
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute,
    });
  }

}
