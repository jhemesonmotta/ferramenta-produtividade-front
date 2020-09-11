import { Component, OnInit } from '@angular/core';
import { Evento, Organizacao } from '../lutador-scraper/lutador-scraper.component';
import * as NodeParser from 'node-html-parser';
import axios from 'axios';

@Component({
  selector: 'app-organizacao-scraper',
  templateUrl: './organizacao-scraper.component.html',
  styleUrls: ['./organizacao-scraper.component.css']
})
export class OrganizacaoScraperComponent implements OnInit {
  // cuida de adicionar (e dps editar) organizações e seus eventos (sem lutas)
  eventosParaAdd: Array<Evento> = [];

  organizacoesParaGuardar = [
    'https://www.sherdog.com/organizations/Rizin-Fighting-Federation-10333',
    'https://www.sherdog.com/organizations/Ultimate-Fighting-Championship-UFC-2',
    'https://www.sherdog.com/organizations/Bellator-MMA-1960',
  ];

  constructor() { }

  ngOnInit() {
    this.scrapeOrganizacoes();
  }

  private scrapeOrganizacoes() {
    console.log('scrapeOrganizacoes()');

    this.organizacoesParaGuardar.forEach(organizacao => {
      this.scrapeOrganizationSherdog(organizacao);
    });
  }

  private scrapeOrganizationSherdog(url) {
    // tr.odd, tr.even
    const AxiosInstance = axios.create();

    AxiosInstance.get(url).then((response) => {
        const txtHtml = response.data;
        const parsedHtml = NodeParser.parse(txtHtml);

        const organizacao: Organizacao = new Organizacao();

        organizacao.nome = parsedHtml.querySelector('h2').text;
        organizacao.peso = 1.2;

        if (organizacao.nome.includes('Ultimate Fighting Championship')) {
          organizacao.peso = 1.5;
        }

        console.log('organizacao');
        console.log(organizacao);

        // AQUI - ADD organização -> no response chama o lista eventos

        this.listaEventos(parsedHtml, organizacao);
    }).catch(console.error); // Error handling
  }

  private listaEventos(parsedHtml, organizacao) {
    const upcomingEvents = parsedHtml.querySelector('#events_list').childNodes[3].childNodes[1].childNodes;
    const pastEvents = parsedHtml.querySelector('#events_list').childNodes[5].childNodes[1].childNodes;

    upcomingEvents.forEach(childNode => {
      if (childNode.nodeType === 1 && !childNode.rawText.includes('Fight Title')) {
        const localizacaoSplit: [] = childNode.childNodes[5].childNodes[1].text.split(', ');

        const evento: Evento = new Evento();
        evento.titulo = childNode.childNodes[3].childNodes[1].structuredText;
        evento.idSherdog = childNode.childNodes[3].childNodes[1].rawAttributes.href;
        evento.organizacao = organizacao;
        evento.localizacao = localizacaoSplit[localizacaoSplit.length - 1];
        evento.data = childNode.childNodes[1].childNodes[1].rawAttrs.split('content="')[1].replace('"','');

        this.eventosParaAdd.push(evento);
      }
    });

    pastEvents.forEach(childNode => {
      if (childNode.nodeType === 1 && !childNode.rawText.includes('Fight Title')) {
        const localizacaoSplit: [] = childNode.childNodes[5].childNodes[1].text.split(', ');

        const evento: Evento = new Evento();
        evento.titulo = childNode.childNodes[3].childNodes[1].structuredText;
        evento.idSherdog = childNode.childNodes[3].childNodes[1].rawAttributes.href;
        evento.organizacao = organizacao;
        evento.localizacao = localizacaoSplit[localizacaoSplit.length - 1];
        evento.data = childNode.childNodes[1].childNodes[1].rawAttrs.split('content="')[1].replace('"','');

        this.eventosParaAdd.push(evento);
      }
    });

    console.log('this.eventosParaAdd');
    console.log(this.eventosParaAdd);
  }

}
