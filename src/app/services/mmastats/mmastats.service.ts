import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lutador, Organizacao, Evento, Luta } from 'src/app/components/mmastats/lutador-scraper/lutador-scraper.component';

@Injectable()
export class LutadoresService {

  constructor(private http: HttpClient) {
  }

  addLutador(lutador: Lutador): Observable<Lutador> {
    return this.http.post<Lutador>(`https://mma-stats.herokuapp.com/v1/lutador`, lutador) as Observable<Lutador>;
  }

  addLuta(luta: Luta): Observable<Luta> {
    return this.http.post<Luta>(`https://mma-stats.herokuapp.com/v1/luta`, luta) as Observable<Luta>;
  }

  addOrganizacao(organizacao: Organizacao): Observable<Organizacao> {
    return this.http.post<Organizacao>(`https://mma-stats.herokuapp.com/v1/organizacao`, organizacao) as Observable<Organizacao>;
  }

  addEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`https://mma-stats.herokuapp.com/v1/evento`, evento) as Observable<Evento>;
  }

  buscarLutadores(): Observable<Array<Lutador>> {
    return this.http.get(`https://mma-stats.herokuapp.com/v1/lutadores`) as Observable<Array<Lutador>>;
  }

  buscarLutasPorLutador(id: string): Observable<Array<Luta>> {
    return this.http.get(`https://mma-stats.herokuapp.com/v1/lutador/${id}/lutas`) as Observable<Array<Luta>>;
  }

  buscarEventos(): Observable<Array<Evento>> {
    return this.http.get(`https://mma-stats.herokuapp.com/v1/eventos`) as Observable<Array<Evento>>;
  }

}
