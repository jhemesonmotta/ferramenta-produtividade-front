import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genderize } from 'src/app/classes/genderize';

@Injectable()
export class GenderizeApiService {
  private baseUrl = 'https://api.genderize.io';

  constructor(private http: HttpClient) {}

  consultarGenero(nome: string): Observable<Genderize> {
      nome = nome.split(' ')[0];
      return this.http.get(`${this.baseUrl}?name=${nome}`) as Observable<Genderize>;
  }
}
