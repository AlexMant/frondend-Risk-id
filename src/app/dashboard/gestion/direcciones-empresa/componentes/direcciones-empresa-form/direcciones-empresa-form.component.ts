import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-direcciones-empresa-form',
  templateUrl: './direcciones-empresa-form.component.html',
  styleUrls: ['./direcciones-empresa-form.component.css']
})
export class DireccionesEmpresaFormComponent implements OnInit {
  @Input() modelo: any;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() guardar: EventEmitter<any> = new EventEmitter();
  constructor(
    private readonly fb: FormBuilder,
    private ngZone: NgZone,
    private snackbar: NotificationService,


  ) { }
  mantenedorForm!: FormGroup;

  @ViewChild('inputField') inputField!: ElementRef;
  @Input() placeholder = 'Enter address...';
  autocomplete: google.maps.places.Autocomplete | undefined;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap




  ngOnInit(): void {
    this.mantenedorForm = this.fb.group({

      desdireccion: [this.modelo.desdireccion, [Validators.required]],
      vdepartamento: [this.modelo.vdepartamento],
      referencia: [this.modelo.referencia],
      tipo_direccion: [this.modelo.tipo_direccion, [Validators.required]],

    });



  }



  rellanoTemporal(key: any) {

    this.modelo.referencia = this.mantenedorForm.value.referencia ?? '';
    this.modelo.vdepartamento = this.mantenedorForm.value.vdepartamento ?? '';
    this.modelo.tipo_direccion = this.mantenedorForm.value.tipo_direccion ?? 0;
    this.mantenedorForm.controls['desdireccion'].markAsTouched();
    // this._vmP.validaFormInvitadoUbicacion = this.mantenedorForm.valid;
  }

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement,
      {
        types: ['address'],
        componentRestrictions: { country: 'CL' },
        fields: ['address_components', 'geometry'],

      }

    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();
        this.handleAddressChange(place);

        console.log(place);
      });
    });
  }
  street_number: boolean = false;
  public handleAddressChange(address: any) {

    //valida que ingrese numeracion 
    if (address.address_components[0].types[0] == "street_number") {
      this.street_number = true;

      // console.log("es numero");

      this.llenarvariables(address);

      // this.mantenedorForm.controls['desdireccion'].setErrors({ 'incorrect': false });
      // this.mantenedorForm.controls['desdireccion'].markAsTouched();
      // this.cargarMapa(address.geometry.location);

    } else {
      this.snackbar.notify('danger', "Debe ingresar numeración");
      this.street_number = false;

      this.mantenedorForm.controls['desdireccion'].setValue('');
      this.mantenedorForm.controls['desdireccion'].setErrors({ 'incorrect': true });
      this.mantenedorForm.controls['desdireccion'].markAsTouched();
      // this.placesRef.reset();

    }



    // this.placesRef.reset();
    // console.log("this._vmP.seleccionUsuario",this._vmP.seleccionUsuario)

  }


  llenarvariables(place: any) {

    const addressNameFormat: any = {
      'street_number': 'short_name',
      'route': 'long_name',
      'administrative_area_level_1': 'short_name',
      'administrative_area_level_2': 'short_name',
      'administrative_area_level_3': 'short_name',
      'country': 'long_name',

    };

    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {

          return component[addressNameFormat[type]];
        }
      }
      return ' '
    };
    this.modelo.desdireccion = getAddressComp('route') + ' ' + getAddressComp('street_number') + ', ' + getAddressComp('administrative_area_level_3') + ', ' + getAddressComp('administrative_area_level_1') + ', ' + getAddressComp('country');
    this.modelo.pais = getAddressComp('country');
    this.modelo.region = getAddressComp('administrative_area_level_1');
    this.modelo.provincia = getAddressComp('administrative_area_level_2');
    this.modelo.comuna = getAddressComp('administrative_area_level_3');

    this.modelo.nro_casa = getAddressComp('street_number');
    this.modelo.latitud = place.geometry.location.lat().toString();
    this.modelo.longitud = place.geometry.location.lng().toString();


    console.log("this.modelo", place.geometry.location.lat().toString(), place.geometry.location.lng().toString());

    const latLng = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };

    this.loadMap(latLng);
    // this.cargarMapa(place.geometry



  };


  btnCancelar() {
    this.cancelar.emit();
  }

  btnGuardar() {

    if (this.mantenedorForm.invalid) {
      return Object.values(this.mantenedorForm.controls).forEach(control => {
        control.markAsTouched();
      });

    }


    if (!this.street_number) {

      this.snackbar.notify('danger', "Debe seleccionar dirección");
      this.mantenedorForm.controls['desdireccion'].setErrors({ 'incorrect': true });
      this.mantenedorForm.controls['desdireccion'].markAsTouched();
      return;
    }
    this.modelo.referencia = this.mantenedorForm.get('referencia')?.value

    this.street_number = false;


    this.guardar.emit();
    this.mantenedorForm.reset();


  }

  mostrarMaps: boolean = false;

  zoom = 12;

  center: google.maps.LatLngLiteral = { lat: -33.448891, lng: -70.669266 };
  options: google.maps.MapOptions = {
    // mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,

  };




  loadMap(latLng: any) {
    this.center = latLng;
    this.zoom = 18;
    this.mostrarMaps = true;

    //   const map = new google.maps.Map(document.getElementById("map"),  {
    //     zoom: 4,
    //     center: latLng,
    //     mapId: "DEMO_MAP_ID", // Map ID is required for advanced markers.
    //   });

    //   const marker = new google.maps.marker.AdvancedMarkerElement({
    //     map,
    //     position: latLng,
    //     title: 'Uluru',
    // });

  }

}
