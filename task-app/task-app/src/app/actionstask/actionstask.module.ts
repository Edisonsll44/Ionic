import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionstaskPageRoutingModule } from './actionstask-routing.module';

import { ActionstaskPage } from './actionstask.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionstaskPageRoutingModule
  ],
  declarations: [ActionstaskPage]
})
export class ActionstaskPageModule {}
