import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genderize } from 'src/app/classes/genderize';

@Injectable()
export class GenderizeApiService {
  constructor(private http: HttpClient) {}

  consultarGenero(nome: string): Observable<Genderize> {
      return this.http.get(`https://api.genderize.io?name=${nome}`) as Observable<Genderize>;
  }
}
