import { Component, OnInit } from '@angular/core';
import { LutadoresService } from 'src/app/services/mmastats/mmastats.service';
import { Lutador, LutadorComLutas } from '../lutador-scraper/lutador-scraper.component';

@Component({
  selector: 'app-score-update',
  templateUrl: './score-update.component.html',
  styleUrls: ['./score-update.component.css']
})
export class ScoreUpdateComponent implements OnInit {

  listaLutadoresCompleta: Array<LutadorComLutas> = [];
  listaLutadores: Array<Lutador> = [];
  constructor(public lutadoresService: LutadoresService) { }

  ngOnInit() {
    this.buscaLutadores();
  }

  private buscaLutadores() {
    this.lutadoresService.buscarLutadores().subscribe((data) => {
      this.listaLutadores = data.filter(d => d.score === 0);
      console.log('this.lutadoresParaGuardar');
      console.log(this.listaLutadores);

      this.listaLutadores.forEach(lutador => {
        this.buscaLutasPorLutador(lutador);
      });
    }, (error) => {
      console.log('error');
      console.log(error);
    });
  }

  private buscaLutasPorLutador(lutador: Lutador) {
    this.lutadoresService.buscarLutasPorLutador(lutador.id).subscribe((data) => {
      this.listaLutadoresCompleta.push({
        lutador: lutador,
        lutas: data
      });

      console.log('this.listaLutadoresCompleta');
      console.log(this.listaLutadoresCompleta);
    }, (error) => {
      console.log('error');
      console.log(error);
    });
  }

  public atualizaLutas() {
    this.listaLutadoresCompleta.forEach(lutador => {
      // pega apenas lutas dos últimos 3 anos
      // pontuar de acordo com o evento
    });
  }
}
