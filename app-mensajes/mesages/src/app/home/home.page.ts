import { Component } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { SecondPagePage } from '../second-page/second-page.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  isModalOpen = false
  options: string=""
  constructor(private navController: NavController,
    private route: Router,
    private modal: ModalController,
    private toastController: ToastController
  ) {


  }

  goToSecondPage(){
    this.navController.navigateForward("/second-page")
  }

  goToSecondPageRouter(){
    this.route.navigate(["/second-page"])
  }

  callModal(){
    this.setOpen(true)

  }

  setOpen(status: boolean){
    this.isModalOpen = status
  }

  returnHome(){
    this.setOpen(false)
  }

  async callLocalModal(){
    const modal = await this.modal.create({
      component:SecondPagePage
    })
    return await modal.present();
  }

  async showToast(message:string, time:number){
    const toast = await this.toastController.create({
      message: message,
      duration: time,
      position: 'bottom',
      color: 'primary',
      buttons: [
        {
          text: 'Deshacer',
          role: 'cancel',
          handler: () => {
            console.log('Toast deshecho');
          }
        }
      ]
    });

    await toast.present();
  }

  validateRadios()
  {
    this.showToast(this.options,3000);
  }
}
