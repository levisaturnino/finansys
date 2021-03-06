import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch:"full",redirectTo:"entries"},

  { path: 'entries', loadChildren:() =>import('./pages/entries/entries.module').then(m => m.EntriesModule)},
  { path: 'categories', loadChildren:() =>import('./pages/categories/categories.module').then(m => m.CategoriesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
