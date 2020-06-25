import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genderize } from 'src/app/classes/genderize';

@Injectable()
export class GenderizeApiService {
  constructor(private http: HttpClient) {}

  consultarGenero(nome: string): Observable<Genderize> {
    this.wait(1000);
      return this.http.get(`https://api.genderize.io?name=${nome}`) as Observable<Genderize>;
  }

  private wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
   }
 }
}
