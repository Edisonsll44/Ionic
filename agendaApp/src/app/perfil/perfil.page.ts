import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  cedula: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  clave: string = '';
  repetirClave: string = '';
  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  private validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  guardar(){}

  cancelar(){
    this.navController.navigateBack(["/home"])
  }
}
