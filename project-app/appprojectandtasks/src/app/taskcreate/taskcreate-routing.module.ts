import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskcreatePage } from './taskcreate.page';

const routes: Routes = [
  {
    path: '',
    component: TaskcreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskcreatePageRoutingModule {}
