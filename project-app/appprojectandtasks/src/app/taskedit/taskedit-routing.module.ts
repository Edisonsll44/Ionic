import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskeditPage } from './taskedit.page';

const routes: Routes = [
  {
    path: '',
    component: TaskeditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskeditPageRoutingModule {}
