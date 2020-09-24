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

  lutadoresParaGuardar: Array<Lutador> = [];
  listaLutadores: Array<Lutador> = [];
  listaLutadoresErro: Array<Lutador> = [];
  listaLutadoresErro2: Array<Lutador> = [];

  constructor(public lutadoresService: LutadoresService) { }

  ngOnInit() {
    this.buscaLutadores();
  }

  private buscaLutadores() {
    this.lutadoresService.buscarLutadores().subscribe((data) => {
      console.log('data');
      console.log(data);
      this.lutadoresParaGuardar = data.filter(d => d.pais === '' && d.idade === 0);
      console.log('this.lutadoresParaGuardar');
      console.log(this.lutadoresParaGuardar);

      this.scrapeLutadores();
    }, (error) => {
      console.log('error');
      console.log(error);
    });
  }

  private scrapeLutadores() {
    console.log('scrapeLutadores()');
    this.lutadoresParaGuardar.forEach(lutador => {
      this.scrapeProfileSherdog(lutador.id);
    });
  }

  private scrapeProfileSherdog(url: string) {
    const AxiosInstance = axios.create();

    AxiosInstance.get(url).then((response) => {
        const txtHtml = response.data;
        const parsedHtml = NodeParser.parse(txtHtml);

        const lutador: Lutador = new Lutador();

        lutador.id = url;

        lutador.nome = parsedHtml.querySelector('span.fn').text;
        try {
          lutador.apelido = parsedHtml.querySelector('span.nickname').text.replace('"', '').replace('"', '');
        } catch (ex) {
          lutador.apelido = '';
        }
        lutador.url_foto = '';

        try {
          lutador.pais = parsedHtml.querySelector('.bio').structuredText.split('\n')[2];
        } catch (e) {}
        
        try {
          lutador.idade = Number((parsedHtml.querySelector('.item.birthday strong').text.split(': '))[1]);
        } catch (e) {}
        
        try {
          lutador.altura = this.converteAltura(parsedHtml.querySelector('.item.height strong').text);
        } catch (e) {}
        
        try {
          lutador.categoria = this.traduzCategoria(parsedHtml.querySelector('.item.wclass strong').text);
        } catch (e) {}
        
        try {
          lutador.peso = this.convertePeso(Number((parsedHtml.querySelector('.item.weight strong').text).split(' ')[0]));
        } catch (e) {}
        
        try {
          lutador.equipe = parsedHtml.querySelector('.item.association').childNodes[3].text;
        } catch (e) {}
        

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
    console.log('adicionaLutadores');
    console.log(this.listaLutadores);
    this.listaLutadores.forEach(lutadorParaGuardar => {
      this.lutadoresService.addLutador(lutadorParaGuardar).subscribe((data) => {
        console.log('data');
        console.log(data);
      }, (error) => {
        this.listaLutadoresErro.push(lutadorParaGuardar);
        console.log('error');
        console.log(error);
      });
    });
  }

  public adicionaLutadoresErro() {
    console.log('adicionaLutadoresErro');
    console.log(this.listaLutadoresErro);
    this.listaLutadoresErro.forEach(lutadorParaGuardar => {
      this.lutadoresService.addLutador(lutadorParaGuardar).subscribe((data) => {
        console.log('data');
        console.log(data);
      }, (error) => {
        this.listaLutadoresErro2.push(lutadorParaGuardar);
        console.log('error');
        console.log(error);
      });
    });
  }

  public adicionaLutadoresErro2() {
    console.log('adicionaLutadoresErro2');
    console.log(this.listaLutadoresErro2);
    this.listaLutadoresErro2.forEach(lutadorParaGuardar => {
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

export class LutadorComLutas {
  lutador: Lutador;
  lutas: Array<Luta>;
}

export class Lutador {
  id: string;
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
  score: number;
}

export class Organizacao {
  id: string;
  nome: string;
  peso: number;
}

export class Evento {
  id: string;
  titulo: string;
  localizacao: string;
  organizacao: Organizacao;
  data: string;
}

export class Luta {
  id: number;
  lutador_a: Lutador;
  lutador_b: Lutador;
  evento_id: string;
  vencedor_id: string;
  metodo: string;
  round: number;
  tempo: string;
}
