import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AreasService } from 'src/app/core/services/areas.service';

@Component({
  selector: 'app-evaluacion-riesgo-modal',
  templateUrl: './evaluacion-riesgo-modal.component.html',
  styleUrls: ['./evaluacion-riesgo-modal.component.css']
})
export class EvaluacionRiesgoModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EvaluacionRiesgoModalComponent>,
    private readonly fb: FormBuilder,
    private readonly areasService: AreasService,

  ) { }

  mantenedorForm!: FormGroup;


  nombremodal: string = 'Evaluación de Riesgo';
  origen_modal: string = '';
  cargo_modal: any;
  control_modal: any[];
  dataactividadesdecontrol_modal: any[] = [];
  datausuarios_modal: any[] = [];
  consecuenciasdata_modal: any[] = [];
  probabilidaddata_modal: any[] = [];
  magnitudesdata_modal: any[] = [];
  datafactoresriesgo_modal: any[] = [];
  dataareas_modal: any[] = [];
  modelo_modal: any;

  valorconsecuencia_modal: number = 0;
  valorprobabilidad_modal: number = 0;
  ngOnInit(): void {

     
    console.log('data recibida en modal evaluacion de riesgo:', this.data);
    if (this.data.origen === 'P') {
      this.nombremodal = 'Evaluación de Riesgo Puro';
      this.valorconsecuencia_modal = this.data.cargo.evaluacion[0]?.consecuenciaRPuroId
      this.valorprobabilidad_modal = this.data.cargo.evaluacion[0]?.probabilidadRPuroId
    }
    if (this.data.origen === 'R') {
      this.nombremodal = 'Evaluación de Riesgo Residual';
      this.valorconsecuencia_modal = this.data.cargo.evaluacion[0]?.consecuenciaRResidualId
      this.valorprobabilidad_modal = this.data.cargo.evaluacion[0]?.probabilidadRResidualId
    }

    this.mantenedorForm = this.fb.group({
      consuecuenciaspuro: [this.valorconsecuencia_modal || ''],
      probabilidadpuro: [this.valorprobabilidad_modal || ''],

    });







    this.origen_modal = this.data.origen;




    this.cargo_modal = this.data.cargo;
    this.control_modal = this.data.control;
    this.dataactividadesdecontrol_modal = this.data.dataactividadesdecontrol;
    this.datausuarios_modal = this.data.datausuarios;
    this.consecuenciasdata_modal = this.data.consecuenciasdata;
    this.probabilidaddata_modal = this.data.probabilidaddata;
    this.magnitudesdata_modal = this.data.magnitudesdata;
    this.modelo_modal = this.data.modelo;
    this.datafactoresriesgo_modal = this.data.datafactoresriesgo;
    this.dataareas_modal = this.data.dataareas;

  
      this.getdatacargatabla();
  



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

    // console.log("consecuencia", this.dataareas_modal);
    this.dataselecconsecuenciaspuro = [];


    var pasodataconsecuencia = []
    if (consecuencia != "" || consecuencia != null) {
      pasodataconsecuencia = this.consecuenciasdata_modal.filter((item) => item.id == consecuencia).map((item) => item.observacionesAreas);
      this.valorconsecuencia = this.consecuenciasdata_modal.find((item) => item.id == consecuencia)?.valor;
      this.dataselecconsecuenciaspuro = pasodataconsecuencia[0].map((obsareas) => {
        return {
          ...obsareas,
          nombrearea: this.dataareas_modal.find(a => a.id === obsareas.areaId)?.nombre.replace(/_/g, ' ') || 'Desconocido',
        }
      });
    }


    var pasodataconsecuencia = []
    if (probabilidad != "" || probabilidad != null) {
      this.valorprobabilidad = this.probabilidaddata_modal.find((item) => item.id == probabilidad)?.valor;

    }

    // console.log("this.valorprobabilidad", this.valorprobabilidad);
    // console.log("this.valorconsecuencia", this.valorconsecuencia);

    if (this.valorprobabilidad && this.valorconsecuencia && this.magnitudesdata_modal?.length) {
      const resultado = this.valorprobabilidad * this.valorconsecuencia;
      // console.log('Resultado de la multiplicación:', resultado);
      let magnitudEncontrada = this.magnitudesdata_modal.find(
        (m: any) => resultado >= m.valorMin && resultado <= m.valorMax
      );

      if (!magnitudEncontrada) {
        // Si el resultado es menor que todos los valorMin, seleccionar el de valorMin más bajo
        const minMagnitud = this.magnitudesdata_modal.reduce((prev: any, curr: any) =>
          prev.valorMin < curr.valorMin ? prev : curr
        );
        const maxMagnitud = this.magnitudesdata_modal.reduce((prev: any, curr: any) =>
          prev.valorMax > curr.valorMax ? prev : curr
        );
        if (resultado < minMagnitud.valorMin) {
          magnitudEncontrada = minMagnitud;
        } else if (resultado > maxMagnitud.valorMax) {
          // Si el resultado es mayor que todos los valorMax, seleccionar el de valorMax más cercano
          magnitudEncontrada = this.magnitudesdata_modal
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
      // console.log('Magnitud encontrada:', this.magnitudSeleccionada);
    }

  }

 

  getColorVEP(valor: number): string {
    if (valor < 20) return '#6fcf97'; // verde
    if (valor < 100) return '#f2c94c'; // amarillo
    if (valor < 300) return '#f2994a'; // naranja
    return '#eb5757'; // rojo
  }

  closeAction() {
    this.dialogRef.close('');
  }


  getNombreActividadControl(id: any): string {
    const actividad = this.dataactividadesdecontrol_modal.find(a => a.id === id);
    return actividad ? actividad.nombre : 'Actividad';
  }
  getprelacionactividadControl(id: any): string {
    const actividad = this.dataactividadesdecontrol_modal.find(a => a.id === id);
    return actividad ? actividad.prelacion : 'N/A';
  }
  getfrecuenciaactividadControl(id: any): string {
    const actividad = this.dataactividadesdecontrol_modal.find(a => a.id === id);
    return actividad ? actividad.frecuencia.nombre : 'N/A';
  }
  getusuariosnombre(id: any): string {
    const usuario = this.datausuarios_modal.find(u => u.id === id);
    return usuario ? usuario.nombre : 'Desconocido';
  }

  nombreFactorRiesgo(id: any): string {
    const factor = this.datafactoresriesgo_modal.find(f => f.id === id);
    return factor ? factor.nombre : 'Desconocido';
  }



  agregar(){
    this.dialogRef.close('');
  }
}
