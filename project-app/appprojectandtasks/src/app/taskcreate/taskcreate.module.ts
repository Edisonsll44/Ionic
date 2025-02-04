import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskcreatePageRoutingModule } from './taskcreate-routing.module';

import { TaskcreatePage } from './taskcreate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskcreatePageRoutingModule
  ],
  declarations: [TaskcreatePage]
})
export class TaskcreatePageModule {}
