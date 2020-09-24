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
  listaLutadoresCompletaComErro: Array<LutadorComLutas> = [];
  listaLutadoresCompletaComErro2: Array<LutadorComLutas> = [];

  listaLutadores: Array<Lutador> = [];
  constructor(public lutadoresService: LutadoresService) { }

  ngOnInit() {
    this.buscaLutadores();
  }

  private buscaLutadores() {
    this.lutadoresService.buscarLutadores().subscribe((data) => {
      this.listaLutadores = data.filter(d => d.score === 0);

      // TODO: retirar quando for rodar de vdd
      this.listaLutadores = this.listaLutadores.slice(0, 1000);

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

  public calculaScore() {
    console.log('entrou no calculaScore');

    const hoje = new Date();
    hoje.setFullYear(hoje.getFullYear() - 3);

    this.listaLutadoresCompleta.forEach(lutador => {
      let score = 0;

      if (lutador.lutas.length !== 0) {
        lutador.lutas = lutador.lutas.filter(l => hoje <= new Date(l.evento.data));
        if (lutador.lutas.length >= 2) {
          console.log('lutador.lutas');
          console.log(lutador.lutas);

          const valorAtomico = 100 / lutador.lutas.length;

          lutador.lutas.forEach(luta => {
            if (luta.vencedor_id === '') {
              // empate
              score = score + (valorAtomico * (luta.evento.organizacao.peso / 2));
            } else if (luta.vencedor_id === lutador.lutador.id) {
              // vitória

              if (luta.metodo.includes('KO') || luta.metodo.includes('Submission')) {
                score = score + (valorAtomico * luta.evento.organizacao.peso);
              } else {
                score = score + (valorAtomico * (luta.evento.organizacao.peso - 0.1));
              }

            } else {
              // derrota
              if (luta.metodo.includes('KO') || luta.metodo.includes('Submission')) {
                score = score - (valorAtomico * (2.2 - luta.evento.organizacao.peso));
              } else {
                score = score - (valorAtomico * (2 - luta.evento.organizacao.peso));
              }
            }

          });
          const adicionalVitorias = lutador.lutas.filter(ll => ll.vencedor_id === lutador.lutador.id).length * 10;
          lutador.lutador.score = score + adicionalVitorias;
        } else {
          lutador.lutador.score = -999.999; // -999 = inelegível. Tirar na hora do ranking
        }
      }
    });

    console.log('this.listaLutadoresCompleta');
    console.log(this.listaLutadoresCompleta);
  }

  public guardaScore() {
    console.log('entrou no guardaScore');
    this.listaLutadoresCompleta.forEach(lutador => {
        this.lutadoresService.addLutador(lutador.lutador).subscribe((data) => {
          console.log('data');
          console.log(data);
        }, (error) => {
          this.listaLutadoresCompletaComErro.push(lutador);
          console.log('error');
          console.log(error);
        });
    });
  }

  public guardaScore2() {
    console.log('entrou no guardaScore2');
    this.listaLutadoresCompletaComErro.forEach(lutador => {
        this.lutadoresService.addLutador(lutador.lutador).subscribe((data) => {
          console.log('data');
          console.log(data);
        }, (error) => {
          this.listaLutadoresCompletaComErro2.push(lutador);
          console.log('error');
          console.log(error);
        });
    });
  }

  public guardaScore3() {
    console.log('entrou no guardaScore3');
    this.listaLutadoresCompletaComErro2.forEach(lutador => {
        this.lutadoresService.addLutador(lutador.lutador).subscribe((data) => {
          console.log('data');
          console.log(data);
        }, (error) => {
          console.log('error');
          console.log(error);
        });
    });
  }
}
