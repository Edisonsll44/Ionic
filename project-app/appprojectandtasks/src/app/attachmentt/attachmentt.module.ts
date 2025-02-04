import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachmenttPageRoutingModule } from './attachmentt-routing.module';

import { AttachmenttPage } from './attachmentt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttachmenttPageRoutingModule
  ],
  declarations: [AttachmenttPage]
})
export class AttachmenttPageModule {}
