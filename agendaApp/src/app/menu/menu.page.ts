import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  nombre: string = '';
  constructor(private navCtrl: NavController) {

  }

  ngOnInit() {}

  goToProfile() {
    this.navCtrl.navigateForward('/perfil'); // Ruta del perfil
  }

  // Cerrar sesión
  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión
    console.log('Cerrando sesión...');
    this.navCtrl.navigateRoot('/home'); // Navega a la pantalla de login
  }
}
