import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AreasService } from 'src/app/core/services/areas.service';
import { ConsecuenciasService } from 'src/app/core/services/consecuencias.service';
import { MagnitudesService } from 'src/app/core/services/magnitudes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProbabilidadesService } from 'src/app/core/services/probabilidades.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-tabla-vep',
  templateUrl: './tabla-vep.component.html',
  styleUrls: ['./tabla-vep.component.css']
})
export class TablaVepComponent implements OnInit {




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
    private readonly magnitudesService: MagnitudesService,
  ) { }

  get vmP() {
    return this._vmP;
  }
  mantenedorForm!: FormGroup;

  consecuencia: any;
  probabilidad: any;
  magnitudes: any;

  ngOnInit(): void {



    this.mantenedorForm = this.fb.group({
      consuecuenciaspuro: [''],
      probabilidadpuro: [''],

    });



    this.getdataareas();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const idEmpresa = userInfo?.empresaId?.[0]?.empresaId ?? -1;

    this.getdataconsecuencias(idEmpresa);
    this.getdataprobabilidades(idEmpresa);
    this.getdatamagnitudes(idEmpresa);



  }


  dataselecconsecuenciaspuro: any = [];
  dataseleccionpuro: any = [];
  dataprobalidadpuro: any = [];
  valorconsecuencia: any = 0
  valorprobabilidad: any = 0
  mostrarriesgo: boolean = false;

  magnitudSeleccionada: any;
  getdatacargatabla() {
    let consecuencia = this.mantenedorForm.get('consuecuenciaspuro')?.value;
let probabilidad = this.mantenedorForm.get('probabilidadpuro')?.value;

    console.log("consecuencia", consecuencia);
    this.dataselecconsecuenciaspuro = [];


    var pasodataconsecuencia = []
    if (consecuencia != "" || consecuencia != null) {
      pasodataconsecuencia = this.consucuenciasdata.filter((item) => item.id == consecuencia).map((item) => item.observacionesAreas);
      this.valorconsecuencia = this.consucuenciasdata.find((item) => item.id == consecuencia)?.valor;
      this.dataselecconsecuenciaspuro = pasodataconsecuencia[0].map((obsareas) => {
        return {
          ...obsareas,
          nombrearea: this.dataareas.find(a => a.id === obsareas.areaId)?.nombre.replace(/_/g, ' ') || 'Desconocido',
        }
      });
    }


      var pasodataconsecuencia = []
    if (probabilidad != "" || probabilidad != null) {
      this.valorprobabilidad = this.probabilidaddata.find((item) => item.id == probabilidad)?.valor;
      
    }

    console.log("this.valorprobabilidad", this.valorprobabilidad);
    console.log("this.valorconsecuencia", this.valorconsecuencia);

    if (this.valorprobabilidad && this.valorconsecuencia && this.magnitudes?.length) {
      const resultado = this.valorprobabilidad * this.valorconsecuencia;
      console.log('Resultado de la multiplicación:', resultado);
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

      this.mostrarriesgo = !!magnitudEncontrada;
      if (magnitudEncontrada) {
        this.magnitudSeleccionada = {
          ...magnitudEncontrada,
          color: this.getColorVEP(resultado),
          valorObtenido: resultado
        };
      } else {
        this.magnitudSeleccionada = null;
      }
      console.log('Magnitud encontrada:', this.magnitudSeleccionada);
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




  getdatamagnitudes(idempresa) {

    this.magnitudesService.getallbyempresa(idempresa).subscribe(
      (data) => {
        this.magnitudes = data.data;
        console.log("data magnitudes", data);
        // Ordenar probabilidades por valor ascendente

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