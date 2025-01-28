import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionstaskPage } from './actionstask.page';

const routes: Routes = [
  {
    path: '',
    component: ActionstaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionstaskPageRoutingModule {}
