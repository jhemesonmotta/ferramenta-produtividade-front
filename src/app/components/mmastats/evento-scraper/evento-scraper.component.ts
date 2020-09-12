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

  constructor(public lutadoresService: LutadoresService) {}

  ngOnInit() {
    this.buscarLutadores();
    // this.scrapeEventos();
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

  private buscarLutadores() {
    console.log('buscarLutadores');
    this.lutadoresService.buscarLutadores().subscribe((lutadores) => {
      console.log('lutadores');
      console.log(lutadores);
      this.listaLutadoresExistentes = lutadores;

      this.buscarEventos();
    }, (error) => {
      console.log(error);
    });
  }

  private buscaLutadorPorId(idSherdog: string): Lutador {
    const lutadorEncontrado = this.listaLutadoresExistentes.filter(l => l.id === idSherdog);
    return lutadorEncontrado.length > 0 ? lutadorEncontrado[0] : null;
  }

  private scrapeEventos() {
    console.log('scrapeEventos()');

    this.listaEventosExistentes.forEach(evento => {
      this.scrapeEventoSherdog(evento);
    });
  }

  private scrapeEventoSherdog(evento: Evento) {
    const AxiosInstance = axios.create();

    AxiosInstance.get(evento.id).then((response) => {
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


        const l1Existe = this.buscaLutadorPorId(lutadorA.id);
        const l2Existe = this.buscaLutadorPorId(lutadorB.id);

        const mainEvent: Luta = new Luta();
        mainEvent.evento_id = evento.id;
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

        nodesLutas.forEach(nodeLuta => {
          this.listaLutasParaAdicionar.push(this.lutaConverter(nodeLuta, evento));
        });

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
    lutadorA.id = 'https://www.sherdog.com';
    lutadorB.nome = nodeLuta.childNodes[7].childNodes[5].childNodes[1].text;
    lutadorB.id = 'https://www.sherdog.com';

    const l1Existe = this.buscaLutadorPorId(lutadorA.id);
    const l2Existe = this.buscaLutadorPorId(lutadorB.id);

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

    return l1 ? lutadorA.id : (l2 ? lutadorB.id : '');
  }

  private decideVencedorLista(result1, result2, lutadorA: Lutador, lutadorB: Lutador) {
    return result1 === 'win' ? lutadorA.id : (result2 === 'win' ? lutadorB.id : '');
  }

  private converteRound(round: string): number {
    return Number(round.replace(/\D/g, ''));
  }
}
