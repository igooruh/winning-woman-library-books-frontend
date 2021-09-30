import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddLivroComponent } from './components/add-livro/add-livro.component';
import { LivrosListComponent } from './components/livros-list/livros-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'livros', pathMatch: 'full' },
  { path: 'livros', component: LivrosListComponent },
  { path: 'novo-livro', component: AddLivroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
