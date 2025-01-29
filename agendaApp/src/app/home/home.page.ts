import { SessionService } from './../servicio/session.service';
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
import { CuentaPage } from '../cuenta/cuenta.page';
import { LoadingService } from '../servicio/loading.service';
import { loginDto } from 'src/interfaces/usuario';
import { LOGIN_API } from 'src/interfaces/constantes';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  txt_clave: string = '';
  txt_usuario: string = '';
  isPasswordVisible: boolean = false;


  constructor(
    private loadingService: LoadingService,
    private accessService: AccesoService,
    private navControler: NavController,
    private modalControler: ModalController,
    private sessionService: SessionService
  ) {}

  login() {
    const dto: loginDto = {
      email: this.txt_usuario,
      password: this.txt_clave,
    };
    this.accessService.postData(dto, LOGIN_API).
    subscribe({
      next: async (res: any) => {
        if (res.success) {
          await this.sessionService.createSesion("data-user",res.data);
          await this.loadingService.showLoading('Cargando...',3000,'circles');
          this.navControler.navigateRoot(['/menu']);
          await this.loadingService.hideLoading();
        } else {
          this.loadingService.showToast(res.message || 'Usuario no encontrado', 3000, 'danger');
        }
      },
      error: (err) => {
        this.loadingService.showToast(err.error.message, 3000, 'danger');
      },
    });

  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async registrarse() {
    const modalView = await this.modalControler.create({
      component: CuentaPage,
      componentProps: {
        nombre: 'Fernando',
        pais: 'Ecuador',
      },
    });
    await modalView.present();
  }

  recuperar() {
    this.navControler.navigateForward(["/rclave"])
  }

}
