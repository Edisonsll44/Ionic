import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then( m => m.ProjectPageModule)
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then( m => m.TaskPageModule)
  },
  {
    path: 'attachmentt',
    loadChildren: () => import('./attachmentt/attachmentt.module').then( m => m.AttachmenttPageModule)
  },
  {
    path: 'actionsproject',
    loadChildren: () => import('./actionsproject/actionsproject.module').then( m => m.ActionsprojectPageModule)
  },
  {
    path: 'actionsprojecteditproject',
    loadChildren: () => import('./actionsprojecteditproject/actionsprojecteditproject.module').then( m => m.ActionsprojecteditprojectPageModule)
  },
  {
    path: 'taskedit',
    loadChildren: () => import('./taskedit/taskedit.module').then( m => m.TaskeditPageModule)
  },
  {
    path: 'taskcreate',
    loadChildren: () => import('./taskcreate/taskcreate.module').then( m => m.TaskcreatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
