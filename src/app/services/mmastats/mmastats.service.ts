import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lutador } from 'src/app/components/mmastats/lutador-scraper/lutador-scraper.component';

@Injectable()
export class LutadoresService {

  constructor(private http: HttpClient) {
  }

  addLutador(lutador: Lutador): Observable<any> {
      console.log('lutador');
      console.log(lutador);
    return this.http.post<Lutador>(`https://mma-stats.herokuapp.com/v1/lutador`, lutador) as Observable<any>;
  }

}
