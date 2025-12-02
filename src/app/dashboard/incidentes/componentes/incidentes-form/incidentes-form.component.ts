import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupsService } from 'src/app/core/services/lookups.service';

@Component({
  selector: 'app-incidentes-form',
  templateUrl: './incidentes-form.component.html',
  styleUrls: ['./incidentes-form.component.css']
})
export class IncidentesFormComponent implements OnInit {

  incidenteForm: FormGroup;

  procesos: any[] = [];
  actividades: any[] = [];
  tareas: any[] = [];
  tiposTarea: any[] = [];
  peligros: any[] = [];
  tiposRiesgo: any[] = [];
  riesgosEspecificos: any[] = [];
  factoresRiesgo: any[] = [];
  ubicaciones: any[] = [];
  clasificaciones: any[] = [];
  actividadesControl: any[] = [];
  descripciones: any[] = [];
  probabilidadesPura: any[] = [];
  probabilidadesResidual: any[] = [];
  consecuenciasPura: any[] = [];
  consecuenciasResidual: any[] = [];

  // Simulación de rol actual
  rol: 'admin' | 'superadmin' | 'user' = 'admin';

  constructor(private fb: FormBuilder, private lookups: LookupsService) {
    this.incidenteForm = this.fb.group({
      proceso: ['', Validators.required],
      actividad: ['', Validators.required],
      tarea: ['', Validators.required],
      tipoTarea: ['', Validators.required],
      peligro: ['', Validators.required],
      tipoRiesgo: ['', Validators.required],
      riesgoEspecifico: ['', Validators.required],
      factoresRiesgo: [[], Validators.required],
      ubicacion: ['', Validators.required],
      medidasControl: [''],
      clasificacion: ['', Validators.required],
      cantidad: ['', Validators.required],
      descripcion: ['', Validators.required],
      actividadesControl: [[], Validators.required],
      probabilidadPura: ['', Validators.required],
      probabilidadResidual: ['', Validators.required],
      consecuenciaPura: ['', Validators.required],
      consecuenciaResidual: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Cargar datos desde LookupsService
    this.lookups.tiposTarea().subscribe(res => this.tiposTarea = res.data || []);
    this.lookups.peligro().subscribe(res => this.peligros = res.data || []);
    this.lookups.riesgos().subscribe(res => this.tiposRiesgo = res.data || []);
    this.lookups.factoresRiesgo().subscribe(res => this.factoresRiesgo = res.data || []);
    this.lookups.ubicaciones().subscribe(res => this.ubicaciones = res.data || []);
    // Agrega aquí las demás llamadas según los métodos del servicio y los campos del formulario
    // Ejemplo:
    // this.lookups.danosProbables().subscribe(res => this.descripciones = res.data || []);
    // this.lookups.areas().subscribe(res => this.clasificaciones = res.data || []);
    // ...
  }

  // Método para saber si el campo es editable según el rol
  isEditable(campo: string): boolean {
    // Ejemplo: solo superadmin puede editar peligro, tipoRiesgo, riesgoEspecifico, factoresRiesgo, clasificacion, probabilidades y consecuencias

    const soloSuperadmin = [
      'peligro', 'tipoRiesgo', 'riesgoEspecifico', 'factoresRiesgo',
      'clasificacion', 'probabilidadPura', 'probabilidadResidual', 'consecuenciaPura', 'consecuenciaResidual', 'descripcion'
    ];
    const soloAdmin = ['ubicacion', 'actividadesControl'];
    if (soloSuperadmin.includes(campo)) return this.rol === 'superadmin';
    if (soloAdmin.includes(campo)) return this.rol === 'admin' || this.rol === 'superadmin';
        return true;

  }


  btnCancelar() {

  }

  btnGuardar() {
  }

}
