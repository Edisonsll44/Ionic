import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";


@Injectable({
  providedIn:"root"
})

export class LoadingService {

  constructor(public ToastCtrl:ToastController,
              public loadingController: LoadingController
  ){}

  async showToast(mensaje: string, tiempo: number) {
    const toast = await this.ToastCtrl.create({
        message: mensaje,
        duration: tiempo,
        position: 'top',
        color:'success'
      });
     toast.present();
  }


}
