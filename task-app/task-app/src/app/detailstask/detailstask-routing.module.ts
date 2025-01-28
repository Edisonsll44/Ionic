import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailstaskPage } from './detailstask.page';

const routes: Routes = [
  {
    path: '',
    component: DetailstaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailstaskPageRoutingModule {}
