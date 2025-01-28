import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {

  constructor(private navController:NavController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  gotoDistance(){
    this.navController.navigateForward("/distance")
  }

  gotoWeight(){
    this.navController.navigateForward("/weight")
  }


  gotoTemperature(){
    this.navController.navigateForward("/temperature")
  }

  async gotoHome(){
    const loading = await this.loadingController.create({
      message: 'Cerrando...',
      spinner: 'crescent',
      duration: 2000,
    });

    await loading.present();

    loading.onDidDismiss().then(() => {
      this.navController.navigateBack("/home");
    });
    this.navController.navigateBack("/home")
  }
}
