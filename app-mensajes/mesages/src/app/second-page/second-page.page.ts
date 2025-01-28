import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.page.html',
  styleUrls: ['./second-page.page.scss'],
  standalone: false,
})
export class SecondPagePage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  GotoHome(){
    this.navController.navigateForward("/home")
  }
}
