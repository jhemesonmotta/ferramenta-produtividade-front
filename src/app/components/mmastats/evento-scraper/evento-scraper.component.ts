import { Component, OnInit } from '@angular/core';
import * as NodeParser from 'node-html-parser';
import axios from 'axios';
import { LutadoresService } from 'src/app/services/mmastats/mmastats.service';
import { Evento, Luta, Lutador } from '../lutador-scraper/lutador-scraper.component';

@Component({
  selector: 'app-evento-scraper',
  templateUrl: './evento-scraper.component.html',
  styleUrls: ['./evento-scraper.component.css']
})

export class EventoScraperComponent implements OnInit {

  public listaLutadoresExistentes: Array<Lutador> = [];
  public listaEventosExistentes: Array<Evento> = [];
  public listaLutasParaAdicionar: Array<Luta> = [];
  public listaLutasQueDeramErro: Array<Luta> = [];
  public listaLutasQueDeramErro2: Array<Luta> = [];
  public listaLutasQueDeramErro3: Array<Luta> = [];
  public listaLutasQueDeramErro4: Array<Luta> = [];
  public listaLutasQueDeramErro5: Array<Luta> = [];

  constructor(public lutadoresService: LutadoresService) {}

  ngOnInit() {
    this.buscarEventos();
  }

  public criarLutas() {
    console.log('criarLutas');
    this.listaLutasParaAdicionar.forEach(lutaAdd => {
      this.lutadoresService.addLuta(lutaAdd).subscribe((data) => {
        console.log('luta adicionada');
        console.log(data);
      }, (error) => {
        console.log('error');
        console.log(error);
        this.listaLutasQueDeramErro.push(lutaAdd);
      });
    });
  }

  public criarLutasDoErro() {
    console.log('criarLutasDoErro');

    this.listaLutasQueDeramErro.forEach(lutaAdd => {
      this.lutadoresService.addLuta(lutaAdd).subscribe((data) => {
        console.log('luta adicionada');
        console.log(data);
      }, (error) => {
        console.log('error');
        console.log(error);
        this.listaLutasQueDeramErro2.push(lutaAdd);
      });
    });
  }

  public criarLutasDoErro2() {
    console.log('criarLutasDoErro2');

    this.listaLutasQueDeramErro2.forEach(lutaAdd => {
      this.lutadoresService.addLuta(lutaAdd).subscribe((data) => {
        console.log('luta adicionada');
        console.log(data);
      }, (error) => {
        console.log('error');
        console.log(error);
        this.listaLutasQueDeramErro.push(lutaAdd);
      });
    });
  }


  public criarLutasDoErro3() {
    console.log('criarLutasDoErro3');

    this.listaLutasQueDeramErro3.forEach(lutaAdd => {
      this.lutadoresService.addLuta(lutaAdd).subscribe((data) => {
        console.log('luta adicionada');
        console.log(data);
      }, (error) => {
        console.log('error');
        console.log(error);
        this.listaLutasQueDeramErro4.push(lutaAdd);
      });
    });
  }

  public criarLutasDoErro4() {
    console.log('criarLutasDoErro4');

    this.listaLutasQueDeramErro4.forEach(lutaAdd => {
      this.lutadoresService.addLuta(lutaAdd).subscribe((data) => {
        console.log('luta adicionada');
        console.log(data);
      }, (error) => {
        console.log('error');
        console.log(error);
        this.listaLutasQueDeramErro5.push(lutaAdd);
      });
    });
  }

  public criarLutasDoErro5() {
    console.log('criarLutasDoErro5');

    this.listaLutasQueDeramErro5.forEach(lutaAdd => {
      this.lutadoresService.addLuta(lutaAdd).subscribe((data) => {
        console.log('luta adicionada');
        console.log(data);
      }, (error) => {
        console.log('error');
        console.log(error);
      });
    });
  }

  private buscarEventos() {
    console.log('buscarEventos');
    this.lutadoresService.buscarEventos().subscribe((eventos) => {
      console.log('eventos');
      console.log(eventos);
      this.listaEventosExistentes = eventos;

      this.scrapeEventos();
    }, (error) => {
      console.log(error);
    });
  }

  private scrapeEventos() {
    console.log('scrapeEventos()');

    this.listaEventosExistentes.forEach(evento => {
      this.scrapeEventoSherdog(evento);
    });
  }

  private scrapeEventoSherdog(evento: Evento) {
    const AxiosInstance = axios.create();
    const urlMandar = evento.id.includes('sherdog') ? evento.id : ('https://www.sherdog.com/' + evento.id);

    AxiosInstance.get(urlMandar).then((response) => {
        const txtHtml = response.data;
        const parsedHtml = NodeParser.parse(txtHtml);

        let lutadorA: Lutador = new Lutador();
        lutadorA.nome = parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[3].childNodes[3].structuredText;
        lutadorA.id = 'https://www.sherdog.com' +
              parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[3].childNodes[1].rawAttributes.href;

              let lutadorB: Lutador = new Lutador();
        lutadorB.nome = parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[5].childNodes[3].structuredText;
        lutadorB.id = 'https://www.sherdog.com' +
              parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[5].childNodes[1].rawAttributes.href;


        const mainEvent: Luta = new Luta();
        mainEvent.evento_id = evento.id;
        mainEvent.lutador_a = lutadorA;
        mainEvent.lutador_b = lutadorB;

        if (new Date(evento.data) < new Date()) {
          let indexFooter = 5;

          if (parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[5].text === 'Live results play-by-play') {
            indexFooter = 7;
          }
          
          try {
            mainEvent.metodo = parsedHtml.querySelector('.fight_card')
            .childNodes[3].childNodes[indexFooter].childNodes[1].childNodes[1].childNodes[3].childNodes[2].text;
          } catch (ex) {
            console.log('ex');
          }
          try {
            mainEvent.round = this.converteRound(parsedHtml.querySelector('.fight_card')
            .childNodes[3].childNodes[indexFooter].childNodes[1].childNodes[1].childNodes[7].text);
          } catch (ex) {
            console.log('ex');
          }
          try {
            mainEvent.tempo = parsedHtml.querySelector('.fight_card')
            .childNodes[3].childNodes[indexFooter].childNodes[1].childNodes[1].childNodes[9].childNodes[2].text;
          } catch (ex) {
            console.log('ex');
          }
        }

        try {
          mainEvent.vencedor_id = this.decideVencedor(parsedHtml, lutadorA, lutadorB);
        } catch (ex) {
          console.log('ex');
          mainEvent.vencedor_id = '';
        }

        this.listaLutasParaAdicionar.push(mainEvent);

        try {
          const nodesLutas = parsedHtml.querySelector('.event_match')
            .childNodes[1].childNodes[1].childNodes[1].childNodes.filter(nd => nd.nodeType === 1 && !nd.rawText.includes('Fighters'));

            nodesLutas.forEach(nodeLuta => {
              this.listaLutasParaAdicionar.push(this.lutaConverter(nodeLuta, evento));
            });
        } catch (ex) {
          console.log('ex');
        }

        console.log('this.listaLutasParaAdicionar');
        console.log(this.listaLutasParaAdicionar);
      }).catch(console.error); // Error handling
  }

  private lutaConverter(nodeLuta, evento: Evento): Luta {

    const lutaConvertida: Luta = new Luta();
    lutaConvertida.evento_id = evento.id;

    let lutadorA: Lutador = new Lutador();
    let lutadorB: Lutador = new Lutador();

    lutadorA.nome = nodeLuta.childNodes[3].childNodes[5].childNodes[1].text;
    lutadorA.id = 'https://www.sherdog.com' + nodeLuta.childNodes[3].childNodes[5].childNodes[1].rawAttributes.href;
    lutadorB.nome = nodeLuta.childNodes[7].childNodes[5].childNodes[1].text;
    lutadorB.id = 'https://www.sherdog.com' + nodeLuta.childNodes[7].childNodes[5].childNodes[1].rawAttributes.href;

    lutaConvertida.lutador_a = lutadorA;
    lutaConvertida.lutador_b = lutadorB;
    try {
      lutaConvertida.metodo = nodeLuta.childNodes[9].childNodes[0].text;
    } catch (ex) {
      console.log('ex');
    }

    try {
      lutaConvertida.round = Number(nodeLuta.childNodes[11].text);
    } catch (ex) {
      console.log('ex');
    }

    try {
      lutaConvertida.tempo = nodeLuta.childNodes[13].text;
    } catch (ex) {
      console.log('ex');
    }

    try {
      lutaConvertida.vencedor_id = this.decideVencedorLista(nodeLuta.childNodes[3].childNodes[5].childNodes[4].text,
        nodeLuta.childNodes[3].childNodes[5].childNodes[4].text,
        lutadorA, lutadorB);
    } catch (ex) {
      console.log('ex');
    }

    return lutaConvertida;
  }

  private decideVencedor(parsedHtml, lutadorA: Lutador, lutadorB: Lutador) {
    const l1 = parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[3].childNodes[5].text === 'win';
    const l2 = parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[5].childNodes[5].text === 'win';

    return l1 ? lutadorA.id : (l2 ? lutadorB.id : '');
  }

  private decideVencedorLista(result1, result2, lutadorA: Lutador, lutadorB: Lutador) {
    return result1 === 'win' ? lutadorA.id : (result2 === 'win' ? lutadorB.id : '');
  }

  private converteRound(round: string): number {
    return Number(round.replace(/\D/g, ''));
  }
}
