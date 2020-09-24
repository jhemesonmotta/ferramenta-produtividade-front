import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lutador, Organizacao, Evento, Luta } from 'src/app/components/mmastats/lutador-scraper/lutador-scraper.component';

@Injectable()
export class LutadoresService {

  mmaStatsApi = 'https://mma-stats.herokuapp.com/v1';

  constructor(private http: HttpClient) {
  }

  addLutador(lutador: Lutador): Observable<Lutador> {
    this.wait(100);
    return this.http.post<Lutador>(`${this.mmaStatsApi}/lutador`, lutador) as Observable<Lutador>;
  }

  addLuta(luta: Luta): Observable<Luta> {
    return this.http.post<Luta>(`${this.mmaStatsApi}/luta`, luta) as Observable<Luta>;
  }

  addOrganizacao(organizacao: Organizacao): Observable<Organizacao> {
    return this.http.post<Organizacao>(`${this.mmaStatsApi}/organizacao`, organizacao) as Observable<Organizacao>;
  }

  addEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.mmaStatsApi}/evento`, evento) as Observable<Evento>;
  }

  buscarLutadores(): Observable<Array<Lutador>> {
    return this.http.get(`${this.mmaStatsApi}/lutadores`) as Observable<Array<Lutador>>;
  }

  buscarLutasPorLutador(id: string): Observable<Array<Luta>> {
    this.wait(100);
    return this.http.get(`${this.mmaStatsApi}/lutas?id_lutador=${id}`) as Observable<Array<Luta>>;
  }

  buscarEventos(): Observable<Array<Evento>> {
    return this.http.get(`${this.mmaStatsApi}/eventos`) as Observable<Array<Evento>>;
  }

  private wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
   }
 }

}
