import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro.model';

const livroApiUrl = 'http://localhost:8080/api/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) { }

  getAll (): Observable<Livro[]> {
    return this.http.get<Livro[]>(livroApiUrl)
  }

  create (livro: Livro): Observable<void> {
    return this.http.post<void>(livroApiUrl, livro);
  }

  remove (livroId: Number): Observable<void> {
    return this.http.delete<void>(`${livroApiUrl}?livroId=${livroId}`);
  }
}
