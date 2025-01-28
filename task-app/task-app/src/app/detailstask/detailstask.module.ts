import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailstaskPageRoutingModule } from './detailstask-routing.module';

import { DetailstaskPage } from './detailstask.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailstaskPageRoutingModule
  ],
  declarations: [DetailstaskPage]
})
export class DetailstaskPageModule {}
