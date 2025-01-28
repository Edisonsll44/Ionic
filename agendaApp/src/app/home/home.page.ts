import { Component } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
import { CuentaPage } from '../cuenta/cuenta.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  txt_clave: string = '';
  txt_usuario: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private servicio: AccesoService,
    private navCrtl: NavController,
    private mr : ModalController
  ) {}

  login() {
    // let datos = {
    //   accion: 'login',
    //   usuario: this.txt_usuario,
    //   clave: this.txt_clave,
    // };
    // this.servicio.postData(datos).subscribe((res: any) => {
    //   if (res.estado) {
    //     this.servicio.showToast('Encontró persona', 3000);
    //     console.log(res.persona);
    //     this.servicio.createSesion('idpersona', res.persona.codigo);
    //     this.servicio.createSesion('persona', res.persona.nombre);
        this.navCrtl.navigateRoot(['/menu']);
    //   } else {
    //     this.servicio.showToast('No encontro persona', 3000);
    //   }
    // });
  }

  async crear() {
    // this.navCrtl.navigateRoot(['/crear']);

    const modal = await this.mr.create({
      component: CuentaPage,
      componentProps: {
        nombre: 'Fernando',
        pais: 'Ecuador',
      },
    });
    await modal.present();
  }

  recuperar() {
    this.navCrtl.navigateForward(["/rclave"])
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 3000,
      spinner: 'circles',
    });
    loading.present();
  }
}
