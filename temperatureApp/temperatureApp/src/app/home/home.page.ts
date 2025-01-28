import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor(private navController: NavController,
    private loadingController: LoadingController
  ) {}


  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Preparando la aplicación......',
      duration: 7000,
      spinner: 'crescent',
      cssClass: 'custom-loading',
    });

    await loading.present();

    loading.onDidDismiss().then(() => {
      this.navController.navigateForward('/menu');
    });
  }



}
