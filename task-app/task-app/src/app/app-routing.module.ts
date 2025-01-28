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
    path: 'tasklist',
    loadChildren: () => import('./tasklist/tasklist.module').then( m => m.TasklistPageModule)
  },
  {
    path: 'actionstask',
    loadChildren: () => import('./actionstask/actionstask.module').then( m => m.ActionstaskPageModule)
  },
  {
    path: 'detailstask',
    loadChildren: () => import('./detailstask/detailstask.module').then( m => m.DetailstaskPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
