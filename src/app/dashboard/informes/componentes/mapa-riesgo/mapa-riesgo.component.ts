import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { InformesService } from 'src/app/core/services/informes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-mapa-riesgo',

  templateUrl: './mapa-riesgo.component.html',
  styleUrl: './mapa-riesgo.component.css'
})
export class MapaRiesgoComponent implements OnInit {


  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private centrosdetrabajosService: CentrosdetrabajosService,
    private fb: FormBuilder,
    private informesService: InformesService,

  ) { }


  get vmP() {
    return this._vmP;
  }

  filtrobusquedaIndicadoresMR: FormGroup;



  ngOnInit(): void {

    this.getDatacentrodetrabajos();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.filtrobusquedaIndicadoresMR = this.fb.group({

      idcentrodetrabajo: [userInfo?.centroTrabajoIds?.[0] ?? '']

    });


  }



  centrosdetrabajo: any[] = [];
  getDatacentrodetrabajos() {


    this.centrosdetrabajosService.getall().subscribe({
      next: (data) => {
        this.centrosdetrabajo = data.data;
      },
      error: (err) => {
        this.centrosdetrabajo = [];
      }
    });
  }


  datamapaderiesgo: any[] = [];
  mostrarInforme: boolean = false;
  getData() {



    const idcentrodetrabajo = this.filtrobusquedaIndicadoresMR.get('idcentrodetrabajo')?.value;

    if (idcentrodetrabajo == '' || idcentrodetrabajo == null || idcentrodetrabajo == undefined) {
      this.snackbar.notify('warning', 'Debe seleccionar un centro de trabajo para generar el informe');
      return;
    }


    let params = '';

    if (idcentrodetrabajo != '' && idcentrodetrabajo != null && idcentrodetrabajo != undefined) {
      params += 'centroTrabajoId=' + idcentrodetrabajo + '&';

    }



    this.informesService.getMapaRiesgos(params).subscribe({
      next: (data) => {
        console.log('Datos recibidos para el informe de mapa de riesgo:', data);
        this.datamapaderiesgo = data.data;
        this.datamapaderiesgo.forEach(u => u.expanded = false);
      },
      complete: () => {


        this.mostrarInforme = true;


      },
      error: (err) => {
        console.error('Error al obtener los datos del informe:', err);
        this.snackbar.notify('danger', 'Error al obtener los datos del informe');
      }
    });



  }

}
