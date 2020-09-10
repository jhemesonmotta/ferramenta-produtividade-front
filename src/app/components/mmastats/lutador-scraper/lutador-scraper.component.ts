import { Component, OnInit } from '@angular/core';
import * as NodeParser from 'node-html-parser';
import axios from 'axios';
import { LutadoresService } from 'src/app/services/mmastats/mmastats.service';

@Component({
  selector: 'app-lutador-scraper',
  templateUrl: './lutador-scraper.component.html',
  styleUrls: ['./lutador-scraper.component.css']
})
export class LutadorScraperComponent implements OnInit {

  lutadoresParaGuardar = [
    'https://www.sherdog.com/fighter/Jon-Jones-27944',
    'https://www.sherdog.com/fighter/Georges-St-Pierre-3500',
    'https://www.sherdog.com/fighter/Anderson-Silva-1356',
    'https://www.sherdog.com/fighter/Khabib-Nurmagomedov-56035',
    'https://www.sherdog.com/fighter/Fedor-Emelianenko-1500',
    'https://www.sherdog.com/fighter/Demetrious-Johnson-45452',
    'https://www.sherdog.com/fighter/Matt-Hughes-232',
    'https://www.sherdog.com/fighter/Chuck-Liddell-192',
    'https://www.sherdog.com/fighter/BJ-Penn-1307',
    'https://www.sherdog.com/fighter/Conor-McGregor-29688',
    'https://www.sherdog.com/fighter/Daniel-Cormier-52311',
    'https://www.sherdog.com/fighter/Dominick-Cruz-12107',
    'https://www.sherdog.com/fighter/Dan-Henderson-195',
    'https://www.sherdog.com/fighter/Mauricio-Rua-5707',
    'https://www.sherdog.com/fighter/Antonio-Rodrigo-Nogueira-1440',
    'https://www.sherdog.com/fighter/Frankie-Edgar-14204',
    'https://www.sherdog.com/fighter/Randy-Couture-166',
    'https://www.sherdog.com/fighter/Wanderlei-Silva-209',
    'https://www.sherdog.com/fighter/Quinton-Jackson-348',
    'https://www.sherdog.com/fighter/Amanda-Nunes-31496',
    'https://www.sherdog.com/fighter/Vitor-Belfort-156',
    'https://www.sherdog.com/fighter/Fabricio-Werdum-8390',
    'https://www.sherdog.com/fighter/Cain-Velasquez-19102',
    'https://www.sherdog.com/fighter/Alistair-Overeem-461',
    'https://www.sherdog.com/fighter/Cristiane-Justino-14477',
  ];

  listaLutadores: Array<Lutador> = [];

  constructor(public lutadoresService: LutadoresService) { }

  ngOnInit() {
    this.scrapeSherdog();
  }

  private scrapeSherdog() {
    console.log('scrapeSherdog()');

    this.lutadoresParaGuardar.forEach(lutador => {
      this.scrapeProfileSherdog(lutador);
    });
  }

  private scrapeProfileSherdog(url) {
    const AxiosInstance = axios.create();

    AxiosInstance.get(url).then((response) => {
        const txtHtml = response.data;
        const parsedHtml = NodeParser.parse(txtHtml);

        let lutador:Lutador = new Lutador();

        lutador.nome = parsedHtml.querySelector('span.fn').text;
        try {
          lutador.apelido = parsedHtml.querySelector('span.nickname').text.replace('"', '').replace('"', '');
        } catch (ex) {
          lutador.apelido = '';
        }
        lutador.url_foto = '';
        lutador.pais = parsedHtml.querySelector('.bio').structuredText.split('\n')[2];
        lutador.idade = Number((parsedHtml.querySelector('.item.birthday strong').text.split(': '))[1]);
        lutador.altura = this.converteAltura(parsedHtml.querySelector('.item.height strong').text);
        lutador.categoria = this.traduzCategoria(parsedHtml.querySelector('.item.wclass strong').text);
        lutador.peso = this.convertePeso(Number((parsedHtml.querySelector('.item.weight strong').text).split(' ')[0]));
        lutador.equipe = parsedHtml.querySelector('.item.association').childNodes[3].text;

        lutador.v_kotko = Number(parsedHtml.querySelector('.left_side .bio_graph').childNodes[5].text.split(' ')[0]);
        lutador.v_submissao = Number(parsedHtml.querySelector('.left_side .bio_graph').childNodes[9].text.split(' ')[0]);
        lutador.v_decisao = Number(parsedHtml.querySelector('.left_side .bio_graph').childNodes[13].text.split(' ')[0]);

        lutador.d_ko_tko = Number(parsedHtml.querySelector('.left_side .bio_graph.loser').childNodes[5].text.split(' ')[0]);
        lutador.d_submissao = Number(parsedHtml.querySelector('.left_side .bio_graph.loser').childNodes[9].text.split(' ')[0]);
        lutador.d_decisao = Number(parsedHtml.querySelector('.left_side .bio_graph.loser').childNodes[13].text.split(' ')[0]);

        try {
          lutador.empates = Number(parsedHtml.querySelector('.right_side .bio_graph').childNodes[1].childNodes[3].text);
        } catch (ex) {
          lutador.empates = 0;
        }

        this.listaLutadores.push(lutador);

        console.log('lutador');
        console.log(lutador);

        console.log(this.listaLutadores);
    }).catch(console.error); // Error handling
  }

  private traduzCategoria(nome: string) {
    if (nome === 'Strawweight') {
      return 'Palha';
    } else if (nome === 'Atomweight') {
      return 'Átomo';
    } else if (nome === 'Flyweight') {
      return 'Mosca';
    } else if (nome === 'Bantamweight') {
      return 'Galo';
    } else if (nome === 'Featherweight') {
      return 'Pena';
    } else if (nome === 'Lightweight') {
      return 'Leve';
    } else if (nome === 'Welterweight') {
      return 'Meio-Médio';
    } else if (nome === 'Middleweight') {
      return 'Médio';
    } else if (nome === 'Light Heavyweight') {
      return 'Meio-Pesado';
    } else if (nome === 'Heavyweight') {
      return 'Pesado';
    } else {
      return 'Super Pesado';
    }
  }

  private convertePeso(pesoLbs: number) {
    return pesoLbs * 0.453592;
  }

  private converteAltura(alturaFtInch: string) {
    const alturaSeparada = alturaFtInch.replace('"', '').split("'");
    const ft = Number(alturaSeparada[0]) * 30.48;
    const inches = Number(alturaSeparada[1]) * 2.54;

    return ft + inches;
  }

  public adicionaLutadores() {
    this.listaLutadores.forEach(lutadorParaGuardar => {
      this.lutadoresService.addLutador(lutadorParaGuardar).subscribe((data) => {
        console.log('data');
        console.log(data);
      }, (error) => {
        console.log('error');
        console.log(error);
      });
    });
  }

}

export class Lutador {
  id: number;
  nome: string;
  url_foto: string;
  apelido: string;
  pais: string;
  idade: number;
  altura: number;
  categoria: string;
  peso: number;
  equipe: string;
  v_kotko: number;
  v_submissao: number;
  v_decisao: number;
  // vitorias_outras: number;
  d_ko_tko: number;
  d_submissao: number;
  d_decisao: number;
  // derrotas_outras: number;
  empates: number;
}
