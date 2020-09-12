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
  public listaLutasParaAdicionar: Array<Luta> = [];

  eventos: Array<Evento> = [
    {
      id: 173,
      idSherdog: 'https://www.sherdog.com/events/Rizin-Fighting-Federation-Saraba-no-Utake-48357',
      titulo: 'UFC 243 - Whittaker vs. Adesanya',
      localizacao: 'Australia',
      organizacao: {
        id: 104,
        idSherdog: '',
        nome: 'Ultimate Fighting Championship (UFC)',
        peso: 1.5
      },
      data: '2019-10-05T00:00:00-07:00'
    }
  ];

  constructor(public lutadoresService: LutadoresService) {}

  ngOnInit() {
    this.buscarLutadores();
    // this.scrapeEventos();
  }

  private buscarLutadores() {
    console.log('buscarLutadores');
    this.lutadoresService.buscarLutadores().subscribe((data) => {
      console.log('data');
      console.log(data);
      this.listaLutadoresExistentes = data;

      this.scrapeEventos();
    }, (error) => {
      console.log(error);
    });
  }

  private buscaLutadorPorIdSherdog(idSherdog: string): Lutador {
    const lutadorEncontrado = this.listaLutadoresExistentes.filter(l => l.idSherdog === idSherdog);
    return lutadorEncontrado.length > 0 ? lutadorEncontrado[0] : null;
  }

  private scrapeEventos() {
    console.log('scrapeEventos()');

    this.eventos.forEach(evento => {
      this.scrapeEventoSherdog(evento);
    });
  }

  private scrapeEventoSherdog(evento: Evento) {
    const AxiosInstance = axios.create();

    AxiosInstance.get(evento.idSherdog).then((response) => {
        const txtHtml = response.data;
        const parsedHtml = NodeParser.parse(txtHtml);

        let lutadorA: Lutador = new Lutador();
        lutadorA.nome = parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[3].childNodes[3].structuredText;
        lutadorA.idSherdog = 'https://www.sherdog.com' +
              parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[3].childNodes[1].rawAttributes.href;

              let lutadorB: Lutador = new Lutador();
        lutadorB.nome = parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[5].childNodes[3].structuredText;
        lutadorB.idSherdog = 'https://www.sherdog.com' +
              parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[5].childNodes[1].rawAttributes.href;


        const l1Existe = this.buscaLutadorPorIdSherdog(lutadorA.idSherdog);
        const l2Existe = this.buscaLutadorPorIdSherdog(lutadorB.idSherdog);

        if (l1Existe) {
          lutadorA = l1Existe;
        } else {
          lutadorA.id = -1;
        }

        if (l2Existe) {
          lutadorB = l2Existe;
        } else {
          lutadorB.id = -2;
        }

        const mainEvent: Luta = new Luta();
        mainEvent.evento = evento;
        mainEvent.lutador_a = lutadorA;
        mainEvent.lutador_b = lutadorB;
        mainEvent.metodo = parsedHtml.querySelector('.fight_card')
            .childNodes[3].childNodes[5].childNodes[1].childNodes[1].childNodes[3].childNodes[2].text;
        mainEvent.round = this.converteRound(parsedHtml.querySelector('.fight_card')
            .childNodes[3].childNodes[5].childNodes[1].childNodes[1].childNodes[7].text);
        mainEvent.tempo = parsedHtml.querySelector('.fight_card')
            .childNodes[3].childNodes[5].childNodes[1].childNodes[1].childNodes[9].childNodes[2].text;

        mainEvent.vencedor_id = this.decideVencedor(parsedHtml, lutadorA, lutadorB);

        this.listaLutasParaAdicionar.push(mainEvent);

        const nodesLutas = parsedHtml.querySelector('.event_match')
            .childNodes[1].childNodes[1].childNodes[1].childNodes.filter(nd => nd.nodeType === 1 && !nd.rawText.includes('Fighters'));

        console.log('nodesLutas');
        console.log(nodesLutas);

        nodesLutas.forEach(nodeLuta => {
          this.listaLutasParaAdicionar.push(this.lutaConverter(nodeLuta, evento));
        });

        console.log('this.listaLutasParaAdicionar');
        console.log(this.listaLutasParaAdicionar);


      }).catch(console.error); // Error handling
  }

  private lutaConverter(nodeLuta, evento): Luta {
    const lutaConvertida: Luta = new Luta();
    lutaConvertida.evento = evento;

    let lutadorA: Lutador = new Lutador();
    let lutadorB: Lutador = new Lutador();

    lutadorA.nome = nodeLuta.childNodes[3].childNodes[5].childNodes[1].text;
    lutadorA.idSherdog = 'https://www.sherdog.com';
    lutadorB.nome = nodeLuta.childNodes[7].childNodes[5].childNodes[1].text;
    lutadorB.idSherdog = 'https://www.sherdog.com';

    const l1Existe = this.buscaLutadorPorIdSherdog(lutadorA.idSherdog);
    const l2Existe = this.buscaLutadorPorIdSherdog(lutadorB.idSherdog);

    if (l1Existe) {
      lutadorA = l1Existe;
    } else {
      lutadorA.id = -1;
    }

    if (l2Existe) {
      lutadorB = l2Existe;
    } else {
      lutadorB.id = -2;
    }

    lutaConvertida.lutador_a = lutadorA;
    lutaConvertida.lutador_b = lutadorB;
    lutaConvertida.metodo = nodeLuta.childNodes[9].childNodes[0].text;
    lutaConvertida.round = Number(nodeLuta.childNodes[11].text);
    lutaConvertida.tempo = nodeLuta.childNodes[13].text;
    lutaConvertida.vencedor_id = this.decideVencedorLista(nodeLuta.childNodes[3].childNodes[5].childNodes[4].text,
              nodeLuta.childNodes[3].childNodes[5].childNodes[4].text,
              lutadorA, lutadorB);

    return lutaConvertida;
  }

  private decideVencedor(parsedHtml, lutadorA: Lutador, lutadorB: Lutador) {
    const l1 = parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[3].childNodes[5].text === 'win';
    const l2 = parsedHtml.querySelector('.fight_card').childNodes[3].childNodes[3].childNodes[5].childNodes[5].text === 'win';

    return l1 ? lutadorA.id : (l2 ? lutadorB.id : 0);
  }

  private decideVencedorLista(result1, result2, lutadorA: Lutador, lutadorB: Lutador) {
    return result1 === 'win' ? lutadorA.id : (result2 === 'win' ? lutadorB.id : 0);
  }

  private converteRound(round: string): number {
    return Number(round.replace(/\D/g, ''));
  }

  private adicionaLutador(lutador: Lutador) {
      return this.lutadoresService.addLutador(lutador);
  }
}
