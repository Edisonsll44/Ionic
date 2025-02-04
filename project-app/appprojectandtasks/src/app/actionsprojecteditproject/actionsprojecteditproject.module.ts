import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionsprojecteditprojectPageRoutingModule } from './actionsprojecteditproject-routing.module';

import { ActionsprojecteditprojectPage } from './actionsprojecteditproject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionsprojecteditprojectPageRoutingModule
  ],
  declarations: [ActionsprojecteditprojectPage]
})
export class ActionsprojecteditprojectPageModule {}
