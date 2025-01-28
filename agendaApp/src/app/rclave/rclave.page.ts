import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rclave',
  templateUrl: './rclave.page.html',
  styleUrls: ['./rclave.page.scss'],
  standalone: false,
})
export class RclavePage implements OnInit {

  txt_correo:string="";
  txt_clave:string="";
  txt_cclave:string="";

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  vclave(){}

  recuperar(){

  }

  cancelar(){
    this.navController.navigateBack(["/home"]);
  }

}
