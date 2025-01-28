import { LoadingService } from './../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{

  constructor(private navCtrl: NavController,
    private loadingService: LoadingService,
    private router: Router) {}

    async ngOnInit() {

      await this.loadingService.showLoading('Iniciando, por favor espere...', 7000);

      setTimeout(() => {
        this.router.navigate(['/tasklist']);
      }, 3000);
    }

}
