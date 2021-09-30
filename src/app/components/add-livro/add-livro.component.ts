import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/livro.model';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-add-livro',
  templateUrl: './add-livro.component.html',
  styleUrls: ['./add-livro.component.css']
})
export class AddLivroComponent implements OnInit {

  livro: Livro = {
    nome: '',
    autor: '',
    dataAdicionado: '',
    dataConclusao: '',
    nota: 0,
    status: '',
  };
  submitted = false;

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
  }

  saveLivro(): void {
    const data = {
      nome: this.livro.nome,
      autor: this.livro.nome,
      dataAdicionado: this.livro.nome,
      dataConclusao: this.livro.nome,
      nota: this.livro.nota,
      status: this.livro.nome,
    };

    this.livroService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newLivro(): void {
    this.submitted = false;
    this.livro = {
      nome: '',
      autor: '',
      dataAdicionado: '',
      dataConclusao: '',
      nota: 0,
      status: '',
    };
  }
}