import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionsprojectPage } from './actionsproject.page';

const routes: Routes = [
  {
    path: '',
    component: ActionsprojectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionsprojectPageRoutingModule {}
