import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionsprojecteditprojectPage } from './actionsprojecteditproject.page';

const routes: Routes = [
  {
    path: '',
    component: ActionsprojecteditprojectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionsprojecteditprojectPageRoutingModule {}
