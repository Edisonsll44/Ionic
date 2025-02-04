import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachmenttPage } from './attachmentt.page';

const routes: Routes = [
  {
    path: '',
    component: AttachmenttPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttachmenttPageRoutingModule {}
