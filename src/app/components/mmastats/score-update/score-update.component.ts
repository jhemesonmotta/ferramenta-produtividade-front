import { Component, OnInit } from '@angular/core';
import { LutadoresService } from 'src/app/services/mmastats/mmastats.service';
import { Lutador, LutadorComLutas, Luta } from '../lutador-scraper/lutador-scraper.component';

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

  public buscaLutas(index: number) {
    const listaVariavel = this.listaLutadores.slice((index - 1) * 400, index * 400);

    listaVariavel.forEach(lutador => {
      this.buscaLutasPorLutador(lutador);
    });
  }

  private buscaLutadores() {
    this.lutadoresService.buscarLutadores().subscribe((data) => {
      this.listaLutadores = data.filter(d => d.score !== -999.999);

      // TODO: retirar quando for rodar de vdd
      // this.listaLutadores = this.listaLutadores.slice(0, 1000);

      console.log('this.lutadoresParaGuardar');
      console.log(this.listaLutadores);
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

  private descobreAdversario(luta: Luta, lutador: Lutador) {
    return luta.lutador_a.id === lutador.id ? luta.lutador_a : luta.lutador_b;
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
              const adversario = this.descobreAdversario(luta, lutador.lutador);
              const pctVitoriasAdversario = (adversario.v_decisao + adversario.v_kotko + adversario.v_submissao) /
                  (adversario.d_decisao + adversario.d_ko_tko + adversario.d_submissao
                    + adversario.v_decisao + adversario.v_kotko + adversario.v_submissao);

              if (luta.metodo.includes('KO') || luta.metodo.includes('Submission')) {
                score = score + (pctVitoriasAdversario * (valorAtomico * luta.evento.organizacao.peso));
              } else {
                score = score + (pctVitoriasAdversario * (valorAtomico * (luta.evento.organizacao.peso - 0.1)));
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

          const adicionalVitorias = lutador.lutas.filter(ll => ll.vencedor_id === lutador.lutador.id).length * 25;
          const remocaoDerrotas = lutador.lutas.filter(ll => ll.vencedor_id !== lutador.lutador.id && ll.vencedor_id !== '').length * 25;
          lutador.lutador.score = score + adicionalVitorias - remocaoDerrotas;
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
