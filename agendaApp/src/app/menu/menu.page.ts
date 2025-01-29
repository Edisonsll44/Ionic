import { SessionService } from './../servicio/session.service';
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

  constructor(private navCtrl: NavController,
              private sessionService: SessionService
  ) {

  }

  async ngOnInit() {
    const data = await this.sessionService.getSesion("data-user-name");

    if (data) {
      const t = JSON.parse(data); // Si `data` no es null, convierte el JSON en un objeto
      // Ahora puedes acceder a las propiedades del objeto 't'
      console.log(t);
    } else {
      console.error('No se encontró "data-user" en el almacenamiento de sesión.');
    }
    const t = data;
  }

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
