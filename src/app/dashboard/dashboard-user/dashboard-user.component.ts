import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
 
@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {

  constructor(   private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.getdataDasboarduser();
  }

  cntSolCerrada:any=0
  cntSolAbierta:any=0
  cntAsignados:any=0

  getdataDasboarduser(){
   
    this.solicitudService.getdasboardusuario(parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario??'0')).subscribe(
      (data) => {
         console.log('dasboard',data);
        this.cntSolCerrada = data[0].cntSolCerrada
        this.cntSolAbierta = data[0].cntSolAbierta
        this.cntAsignados = data[0].cntAsignados
      },
      (err) => {
        console.log(err);
        this.cntSolCerrada = 0;
        this.cntSolAbierta = 0;
        this.cntAsignados = 0;
      }
    );
  }
}
