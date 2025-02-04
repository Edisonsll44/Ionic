import { Component, OnInit } from '@angular/core';
import { GenericsService } from '../services/generics.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor(private genericService: GenericsService) {}

  ngOnInit() {
    setTimeout(() => {
      console.log("Llamando a navigateToRoot...");
      this.genericService.navigateTo("/project");
    }, 4000);
  }

}
