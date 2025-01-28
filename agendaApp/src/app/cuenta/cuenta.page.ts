import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { ModalController } from '@ionic/angular';
import { LoadingService } from "../servicio/loading.service";

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  standalone: false,
})
export class CuentaPage implements OnInit {

  txt_cedula: string = '';
  txt_nombre: string = '';
  txt_apellido: string = '';
  txt_correo: string = '';
  txt_clave: string = '';
  txt_cclave: string = '';
  mensaje: string = '';


  constructor(
    private servicio: AccesoService,
    private mr: ModalController,
    private loadingService: LoadingService

  ) { }

  ngOnInit() {
  }

  vcedula() {

    let datos = {
      accion: 'vcedula',
      cedula: this.txt_cedula
    };

    this.servicio.postData(datos, "LOGIN").subscribe((res: any) => {
      if (res.estado) {
        this.txt_cedula = "";
        this.loadingService.showToast(res.mensaje, 300)
      }
    });

  }

  vclave() {
    if (this.txt_clave == this.txt_cclave) {
      this.mensaje = 'Registro exitoso';
    } else {
      this.mensaje = 'Las contraseñas no coinciden';
    }
  }

  cancelar() {

    this.mr.dismiss();
  }

  registrar() {

    if (this.txt_cedula != "" && this.txt_nombre != "" && this.txt_apellido != "" && this.txt_correo != "" && this.txt_clave != "") {
      let datos = {
        accion: 'cuenta',
        cedula: this.txt_cedula,
        nombre: this.txt_nombre,
        apellido: this.txt_apellido,
        correo: this.txt_correo,
        clave: this.txt_clave
      };
      this.servicio.postData(datos,"LOGIN").subscribe((res: any) => {
        if (res.estado) {
          this.mr.dismiss();
          this.loadingService.showToast(res.mensaje, 3000)
        }
      });
    }
    else {
      this.loadingService.showToast('Faltan campor por llenar', 3000);
    }
  }

  recuperar() {
    let datos = {
      accion: 'recuperar',
      correo: this.txt_correo
    };

    this.servicio.postData(datos, "LOGIN").subscribe((res: any) => {
      if (res.estado) {
        this.mr.dismiss();
        this.loadingService.showToast(res.mensaje, 3000)
      }
    });
  }
}
