import { Injectable } from "@angular/core";
import { LoadingController,AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular/standalone";



@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  constructor(private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController
  ) { }

  async showLoading(message: string = 'Por favor espere...', duration: number = 3000) {
    const loading = await this.loadingController.create({
      message: message,
      duration: duration
    });
    await loading.present();
  }

  async hideLoading() {
    await this.loadingController.dismiss();
  }

  async showToster(message: string, duration:any){
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  async showAlert(header: string, message: string): Promise<any> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancela");

            return false;
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log("Elimina");
            return true;
          },
        },
      ],
    });
    await alert.present();

    const result = await alert.onDidDismiss();

    if (result.role === 'cancel') {
      return false;
    } else {
      return true;
    }
  }
}
