import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../core/services/menu.service';
import { LocalService } from 'src/app/core/services/local-services.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangeComponent } from 'src/app/auth/change/change.component';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  NombreUsuario: string;
  despais: string;
  desrol: string;
  cambiopas: string;
  constructor(private menuService: MenuService,
    private localStore: LocalService,
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,

  ) { }

  menu: boolean;

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const usertype = JSON.parse(localStorage.getItem('usertype'));
    this.NombreUsuario = userInfo.usuarioConectado;
    this.despais = usertype.despais;
    this.desrol = usertype.desrol;
    this.cambiopas = userInfo.passwordStatus;

    // console.log("cambiopas>>" + this.cambiopas);

    this.menuService.menu.subscribe(res => {
      this.menu = res;
    });
  }

  cambiaPerfil = () => {
    this.router.navigateByUrl('/auth/perfil-seleccion');
  }

  logOut = () => {
    // localStorage.removeItem("jwt");
    // localStorage.removeItem("refreshToken");
    this.localStore.clearData();
    this.router.navigate(["./auth/login"]);
  }


  openModalCambioPass() {

    // console.log("openmodalEdit", value);

    this.dialog.open(ChangeComponent, {
      autoFocus: false,
      width: '70vw',
      maxWidth: '70vw',
      disableClose: true,
      // height: '70vh',
      panelClass: 'dialog-full-h',
      data: {},
    }).afterClosed().subscribe((res) => {
      // console.log("openmodalAdd_res", res);

      if (res == true) {
        console.log("openmodalAdd_res", res);
        this.localStore.clearData();
        this.snackbar.notify('success', 'Correo enviado existamente');
        this.router.navigate(["./auth/login"]);
      }
    });
  }

}
