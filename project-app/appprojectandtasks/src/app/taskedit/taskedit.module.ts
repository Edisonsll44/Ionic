import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskeditPageRoutingModule } from './taskedit-routing.module';

import { TaskeditPage } from './taskedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskeditPageRoutingModule
  ],
  declarations: [TaskeditPage]
})
export class TaskeditPageModule {}
