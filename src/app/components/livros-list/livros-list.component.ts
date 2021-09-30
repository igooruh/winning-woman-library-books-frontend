import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/livro.model';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livros-list',
  templateUrl: './livros-list.component.html',
  styleUrls: []
})
export class LivrosListComponent implements OnInit {
  livros?: Livro[];
  livroAtual: Livro | undefined;
  indexAtual = -1;
  title = '';

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.buscarLivros();
  }

  buscarLivros(): void {
    this.livroService.getAll()
      .subscribe(
        data => {
          this.livros = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.buscarLivros();
    this.livroAtual = undefined;
    this.indexAtual = -1;
  }

  setActiveLivro(livro: Livro, index: number): void {
    this.livroAtual = livro;
    this.indexAtual = index;
  }

  deleteLivro(livro: Livro) {
    this.livroService.remove(livro.id!)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
