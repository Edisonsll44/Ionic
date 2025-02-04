import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GenericsService {

  constructor(private navCtrl: NavController, private router: Router) {}

   /**
   * Método para navegar a una ruta con o sin parámetros.
   * @param path Ruta de destino
   * @param params Parámetros opcionales
   */
   navigateTo(path: string, params?: any) {
    console.log(`Navegando a: ${path} con params:`, params);

    if (params) {
      this.navCtrl.navigateForward([path], { queryParams: params }); // Con parámetros
    } else {
      this.navCtrl.navigateForward([path]); // Sin parámetros
    }
  }

  /**
   * Método para regresar a la página anterior
   */
  goBack() {
    console.log("Regresando a la página anterior");
    this.navCtrl.back();
  }

  /**
   * Método para navegación raíz
   * @param path Ruta de destino
   */
  navigateToRoot(path: string): void {
    console.log(`Navegando a raíz: ${path}`);
    this.navCtrl.navigateRoot(path); // Mejor que router.navigate
  }
}
