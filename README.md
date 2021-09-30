# Livraria

## Agenda

- Requisitos
- Bootstrap
- Iniciando Projeto
- Componente inicial
- Serviços para consumir API
- Router
- Componente listar Livros
- Componente Criar Livro

## Requisitos
- Node.js: https://nodejs.org/en/
- npm
- Angular CLI: npm install -g @angular/cli

## Criar projeto
- ng new livraria
- ng serve

## Criar Model

- ng generate class models/livro --type=model

```typescript
export class Livro {
    constructor (
        public nome: string,
        public autor: string,
        public dataAdicionado: string,
        public dataConclusao: string,
        public nota: number,
        public status: string,
        public id?: number,
    ) {}
}
```

## Criar Service

- ng generate service services/livro

```Typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) { }

  getAll (): Observable<Livro[]> {
    return this.http.get<Livro[]>('http://localhost:8080/api/livro')
  }

  create (livro: Livro): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/livro', livro);
  }

  remove (livroId: Number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/livro?livroId=${livroId}`);
  }
}
```

## Preparar injeção do HttpClient
Em `app.module.ts`:
```TypeScript
import { HttpClientModule } from '@angular/common/http';
  imports: [
    HttpClientModule,
  ],
```

## Criar componentes
ng generate component components/livros-list
ng generate component components/add-livro

## Preparar Rotas
```TypeScript
import { AddLivroComponent } from './components/add-livro/add-livro.component';
import { LivrosListComponent } from './components/livros-list/livros-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'livros', pathMatch: 'full' },
  { path: 'livros', component: LivrosListComponent },
  { path: 'novo-livro', component: AddLivroComponent }
];
```

## Adicionar Bootstrap
index.html
https://getbootstrap.com/docs/5.1/getting-started/introduction/
```html
<title>Livraria</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
```

## Adicionar Navbar
app.component.html
```html
    <div>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="#" class="navbar-brand">Minha Livraria</a>
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <a routerLink="livros" class="nav-link">Ver meus Livros</a>
          </li>
          <li class="nav-item">
            <a routerLink="novo-livro" class="nav-link">Adicionar Livros</a>
          </li>
        </div>
      </nav>

      <div class="container mt-3">
        <router-outlet></router-outlet>
      </div>
    </div>
```

## Visualizar livro
livros-list.component.ts
```typescript
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
```

livros-list.component.html
```html
<div class="list row">
    <div class="col-md-6">
      <h4>Livros List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let livro of livros; let i = index"
          [class.active]="i == indexAtual"
          (click)="setActiveLivro(livro, i)"
        >
          {{ livro.nome }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div *ngIf="livroAtual">
        <h4>Livro</h4>
        <div>
          <label><strong>Nome:</strong></label> {{ livroAtual!.nome }}
        </div>
        <div>
          <label><strong>Autor:</strong></label>
          {{ livroAtual!.autor }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ livroAtual!.status }}
        </div>

        <button (click)="deleteLivro(livroAtual)" class="btn btn-warning">Delete</button>
      </div>
    </div>
</div>
```

## Cadastrar AngularForm como dependência
```TypeScript
import { FormsModule } from '@angular/forms';
...
imports: [
  ...
  FormsModule,
],
```

## Criar Novo Livro
add-livro.component.ts
```typescript
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
```

add-livro.component.html
```html
<div>
    <div class="submit-form">
      <div *ngIf="!submitted">
        <div class="form-group">
          <label for="title">Nome</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            [(ngModel)]="livro.nome"
            name="title"
          />
        </div>
  
        <div class="form-group">
          <label for="description">Autor</label>
          <input
            class="form-control"
            id="description"
            required
            [(ngModel)]="livro.autor"
            name="description"
          />
        </div>

        <div class="form-group">
          <label for="description">Data Adicionado</label>
          <input
            class="form-control"
            id="description"
            required
            [(ngModel)]="livro.dataAdicionado"
            name="description"
          />
        </div>

        <div class="form-group">
          <label for="description">Data de Conclusão</label>
          <input
            class="form-control"
            id="description"
            required
            [(ngModel)]="livro.dataConclusao"
            name="description"
          />
        </div>

        <div class="form-group">
          <label for="description">Nota</label>
          <input
            class="form-control"
            id="description"
            required
            [(ngModel)]="livro.nota"
            name="description"
          />
        </div>

        <div class="form-group">
          <label for="description">Status</label>
          <input
            class="form-control"
            id="description"
            required
            [(ngModel)]="livro.status"
            name="description"
          />
        </div>
  
        <button (click)="saveLivro()" class="btn btn-success">Salvar</button>
      </div>
  
      <div *ngIf="submitted">
        <h4>Livro was submitted successfully!</h4>
        <button class="btn btn-success" (click)="newLivro()">Adicionar</button>
      </div>
    </div>
</div>
```

add-livro.component.css
```css
.submit-form {
    max-width: 400px;
    margin: auto;
}
```
