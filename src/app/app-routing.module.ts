import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule), pathMatch: 'full' },
  { path: 'article/:id', loadChildren: () => import('./article-page/article-page.module').then(m => m.ArticlePageModule) },
  { path: 'edit', loadChildren: () => import('./edit-page/edit-page.module').then(m => m.EditPageModule) },
  { path: 'create', loadChildren: () => import('./edit-page/edit-page.module').then(m => m.EditPageModule) },
  { path: '404', loadChildren: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent) },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
