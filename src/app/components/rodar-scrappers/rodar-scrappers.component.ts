import { Component, OnInit } from '@angular/core';
import { GithubApiService } from 'src/app/services/github/github-api.service';
import { SharedService } from 'src/app/services/shared.service';
import { ProjectEvaluation } from 'src/app/classes/project.evaluation';
import { PageSpeedApiService } from 'src/app/services/pagespeed/pagespeed-api.service';
import { GhRepoAtividadeUltimoAno } from 'src/app/classes/gh-atividade-ultimo-ano';
import { GhRepoContribuinte, GhContribuinte } from 'src/app/classes/gh-contribuinte';
import { GenderizeApiService } from 'src/app/services/genderize/genderize-api.service';
import * as NodeParser from 'node-html-parser';
import axios from 'axios';
import { ProjetoService } from 'src/app/services/backend/projeto.service';

@Component({
  selector: 'app-rodar-scrappers',
  templateUrl: './rodar-scrappers.component.html',
  styleUrls: ['./rodar-scrappers.component.css']
})
export class RodarScrappersComponent implements OnInit {
  // motivo: as 15 mais utilizadas de 2020 até agora
  // fonte: https://madnight.github.io/githut/#/pull_requests/2020/1

  listaDeLinguagens = ['javascript',
                          'python',
                          'java',
                          'go',
                          'cpp',
                          'ruby',
                          'typescript',
                          'php',
                          'csharp',
                          'C',
                          'scala',
                          'shell',
                          'rust',
                          'swift',
                          'kotlin'];

  // Variáveis públicas (podem ser exibidas no HTML)

  // listaDeLinguagens = ['JavaScript'];

  listaRetorno: Array<ProjectEvaluation> = [];
  listaProjetos: Array<ProjectEvaluation> = [];
  listaContribuintesBusca: Array<GhRepoContribuinte> = [];
  listaContribuintesCompleta: Array<GhContribuinte> = [];

  // Variáveis privadas
  private retornarReposPromise: Promise<void>;
  private consultarMetricasPromise: Promise<void>;
  private consultarCommitsPromise: Promise<void>;
  private consultarBaseRepoPromise: Promise<void>;
  private consultarContribuintesPromise: Promise<void>;
  private consultarUsuarioPromise: Promise<void>;
  private consultarGeneroPromise: Promise<void>;
  private calculaDiversidadePromise: Promise<void>;
  private calculaQtdContribuintesPromise: Promise<void>;

  constructor(public githubApiService: GithubApiService,
    public sharedService: SharedService,
    public pageSpeedApiService: PageSpeedApiService,
    public genderizeApiService: GenderizeApiService,
    public projetoService: ProjetoService) { }

  ngOnInit() {
    console.log('this.sharedService.recuperaListaProjetos()');
    console.log(this.sharedService.recuperaListaProjetos());

    this.listaProjetos = this.sharedService.recuperaListaProjetos().listaProjetos;
  }

  // Métodos Chamados Pelo HTML - High Level

  buscaProjetos() {
    this.listaDeLinguagens.forEach(linguagem => {
      this.consultarRepositorios(linguagem).then(() => {
        this.sharedService.guardaListaProjetos(this.listaRetorno);
        console.log('this.sharedService.recuperaListaProjetos()');
        console.log(this.sharedService.recuperaListaProjetos());

        console.log('this.listaRetorno');
        console.log(this.listaRetorno);

          this.projetoService.criarLista(this.listaRetorno.filter(proj => proj.linguagemProgramacao === linguagem)).subscribe(
            (data) => {
              console.log('data');
              console.log(data);
            });
      });
    });
  }

  calcularQualidade() {
    console.log('calcularQualidade()');
    this.listaProjetos.forEach(projeto => {

      console.log('calculaQualidade(): ' + projeto.nome);

      if (projeto.homePage != null && projeto.homePage !== '') {
        console.log('entrou');
        this.consultarMetricas(projeto.homePage).then(() => {
          this.sharedService.guardaListaProjetos(this.listaProjetos);
          console.log('this.sharedService.recuperaListaProjetos()');
          console.log(this.sharedService.recuperaListaProjetos());
        });

        console.log('acabou');
      }
    });
  }

  calcularFrequenciaCommitsProjeto() {
    // frequencia = quantidade total de commits no último ano / 365
    console.log('calcularFrequenciaCommitsProjeto()');

    this.listaProjetos.forEach(projeto => {
      this.consultarCommits(projeto.nome).then(() => {
        this.sharedService.guardaListaProjetos(this.listaProjetos);
        console.log('this.sharedService.recuperaListaProjetos()');
        console.log(this.sharedService.recuperaListaProjetos());
      });

    });
  }

  calcularCorrelacaoTamanho() {
    console.log('calcularCorrelacaoTamanho()');

    this.listaProjetos.forEach(projeto => {
      this.calculaQtdContribuintes(projeto.nome).then(() => {
        this.sharedService.guardaListaProjetos(this.listaProjetos);
        console.log('this.sharedService.recuperaListaProjetos()');
        console.log(this.sharedService.recuperaListaProjetos());
      });
    });
  }

  calcularTamanhoComunidade() {
    // (stargazers + watchers) / 2
    console.log('calcularTamanhoComunidade()');

    this.listaProjetos.forEach(projeto => {
      this.consultarTamanhoComunidade(projeto.nome).then(() => {
        this.sharedService.guardaListaProjetos(this.listaProjetos);
        console.log('this.sharedService.recuperaListaProjetos()');
        console.log(this.sharedService.recuperaListaProjetos());
      });
    });
  }

  calcularDiversidadeGenero() {
    console.log('calcularDiversidadeGenero');
    let index = 0;

    // while (index < this.listaProjetos.length) {
    while (index < 2) {
      index = index + 1;
      console.log('EXECUTA PARA: ' + this.listaProjetos[index - 1].nome);

      this.calcularDiversidadeDeGenero(this.listaProjetos[index - 1].nome).then(() => {
        console.log('to no theeeeeeeeeeen');
      });
    }

  }

  // Métodos Privados - Lower Level

  private consultarRepositorios(linguagem: string) {
    this.retornarReposPromise = this.githubApiService.consultarRepositorios(linguagem, 1)
    .toPromise()
    .then((data) => {
      // TODO: tirar o slice
      // data.items.slice(0, 10).forEach(projeto => {
      data.items.forEach(projeto => {
        this.listaRetorno.push({
          id: null,
          nome: projeto.full_name,
          homePage: projeto.homepage,
          linguagemProgramacao: linguagem,
          qtdCommits: null,
          correlacaoTamanho: null,
          qualidade: {
            accesibilidade: null,
            melhoresPraticas: null,
            performance: null,
            pwa: null,
            seo: null,
            total: null
          },
          tamanhoComunidade: null,
          diversidade: null,
          frequenciaCommits: null,
          qtdContribuintes: null
        });
      });
    }, (error) => {
      console.log('error');
      console.log(error);
    });

    return this.retornarReposPromise;
  }

  private consultarMetricas(url: string) {
    console.log(`consultarMetricas(${url})`);
    this.consultarMetricasPromise = this.pageSpeedApiService.consultarMetricas(url)
    .toPromise()
    .then((data) => {
      console.log('data.lighthouseResult.categories');
      console.log(data.lighthouseResult.categories);

      const categorias = data.lighthouseResult.categories;

      this.listaProjetos.filter(p => p.homePage === url)[0].qualidade.accesibilidade = categorias.accessibility.score;
      this.listaProjetos.filter(p => p.homePage === url)[0].qualidade.melhoresPraticas = categorias['best-practices'].score;
      this.listaProjetos.filter(p => p.homePage === url)[0].qualidade.performance = categorias.performance.score;
      this.listaProjetos.filter(p => p.homePage === url)[0].qualidade.pwa = categorias.pwa.score;
      this.listaProjetos.filter(p => p.homePage === url)[0].qualidade.seo = categorias.seo.score;
      this.listaProjetos.filter(p => p.homePage === url)[0].qualidade.total =
      (categorias.accessibility.score +
        categorias['best-practices'].score +
        categorias.performance.score +
        categorias.pwa.score +
        categorias.seo.score) / 5;
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    return this.consultarMetricasPromise;
  }

  private consultarCommits(projeto: string) {
    this.consultarCommitsPromise = this.githubApiService.consultarAtividadesDeCommitUltimoAno(projeto)
    .toPromise()
    .then((listaCommitsRetorno: Array<GhRepoAtividadeUltimoAno>) => {
      if (listaCommitsRetorno.length > 0) {
        let frequenciaCommits = 0;
        listaCommitsRetorno.forEach(item => {
          frequenciaCommits = frequenciaCommits + item.total;
        });
        if (frequenciaCommits > 0) {
          frequenciaCommits = frequenciaCommits / 365;
          this.listaProjetos.filter(p => p.nome === projeto)[0].frequenciaCommits = frequenciaCommits;
        }
      }
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    return this.consultarCommitsPromise;
  }

  private consultarTamanhoComunidade(projeto: string) {
    this.consultarBaseRepoPromise = this.githubApiService
    .consultarBaseRepo(projeto)
    .toPromise()
    .then((data) => {
      console.log('consultarBaseRepo');
      // tamanho da comunidade = (stargazers + watchers) / 2
      const tamanhoComunidade = (Number(data.stargazers_count) + Number(data.watchers_count)) / 2;
      this.listaProjetos.filter(p => p.nome === projeto)[0].tamanhoComunidade = tamanhoComunidade;
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    return this.consultarBaseRepoPromise;
  }

  private calcularDiversidadeDeGenero(projeto: string) {
    this.calculaDiversidadePromise = this.consultarContribuintes(projeto).then(() => {
      console.log('this.listaContribuintesBusca');
      console.log(this.listaContribuintesBusca.filter(c => c.projeto === projeto));

      this.listaContribuintesBusca.filter(c => c.projeto === projeto).forEach(contribuinte => {
        this.consultarUsuario(contribuinte.author.html_url, contribuinte.projeto).then(() => {
          // semântica = acabou?
          if (this.listaContribuintesCompleta.filter(c => c.projeto === projeto).length
          === this.listaContribuintesBusca.filter(c => c.projeto === projeto).length) {
            this.buscaGeneroLista(projeto);
          }
        });
      });
    });

    return this.calculaDiversidadePromise;
  }

  private consultarContribuintes(projeto: string) {
    this.consultarContribuintesPromise = this.githubApiService
    .consultarContribuintes(projeto)
    .toPromise()
    .then((data) => {
      data.forEach(d => d.projeto = projeto);
      Array.prototype.push.apply(this.listaContribuintesBusca, data);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    return this.consultarContribuintesPromise;
  }

  private wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
   }
 }

  private consultarUsuario(html_url: string, projeto: string) {
    const AxiosInstance = axios.create();
      const url = html_url;
      this.wait(1000);
      this.consultarUsuarioPromise = AxiosInstance.get(url).then((response) => {
          const txtHtml = response.data;
          const parsedHtml = NodeParser.parse(txtHtml);
          this.listaContribuintesCompleta.push({
            gender: '',
            html_url: html_url,
            name: parsedHtml.querySelector('[itemprop=name]').text,
            projeto: projeto
          });

          console.log('this.listaContribuintesCompleta');
          console.log(this.listaContribuintesCompleta);

        }).catch(error => {
        console.log('error');
        console.log(error);
      }); // Error handling

      return this.consultarUsuarioPromise;
  }

  private buscaGenero(nome: string) {
    this.consultarGeneroPromise = this.genderizeApiService
    .consultarGenero(nome)
    .toPromise()
    .then((genderize) => {
      this.listaContribuintesCompleta
      .filter(contrib => contrib.name && contrib.name.includes(nome))
      .forEach(contrib => contrib.gender = genderize.gender);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    return this.consultarGeneroPromise;
  }

  private buscaGeneroLista(projeto: string) {
    let qtdExecucoes = 0;

    this.listaContribuintesCompleta.filter(c => c.projeto === projeto).forEach(contribuinte => {
      if (contribuinte.name) {
        this.buscaGenero(contribuinte.name.split(' ')[0]).then(() => {
          qtdExecucoes = qtdExecucoes + 1;

          if (qtdExecucoes === this.listaContribuintesCompleta.filter(c => c.projeto === projeto).length) {
            this.calculaDiversidade(projeto);
            console.log('this.calculaDiversidade');
          }
        });
      } else {
        qtdExecucoes = qtdExecucoes + 1;

        if (qtdExecucoes === this.listaContribuintesCompleta.filter(c => c.projeto === projeto).length) {
          this.calculaDiversidade(projeto);
          console.log('this.calculaDiversidade');
        }
      }
    });
  }

  private calculaDiversidade(projeto: string) {
    console.log('xxxxxxxx this.listaContribuintesCompleta.filter(c => c.projeto === projeto) xxxxxxxx');
    console.log(this.listaContribuintesCompleta.filter(c => c.projeto === projeto));

    const pctHomens = (this.listaContribuintesCompleta
      .filter(c => c.projeto === projeto && c.gender === 'male').length / this.listaContribuintesCompleta.filter(c => c.projeto === projeto).length) * 100;
    const pctMulheres = (this.listaContribuintesCompleta
      .filter(c => c.projeto === projeto && c.gender === 'female').length / this.listaContribuintesCompleta.filter(c => c.projeto === projeto).length) * 100;

    const diferencaAbsolutaArredondada = +(Math.abs(pctHomens - pctMulheres)).toFixed(3);

    const diversidade = 100 - diferencaAbsolutaArredondada;

    console.log('projeto');
    console.log(projeto);

    console.log('diversidade');
    console.log(diversidade);

    this.listaProjetos.filter(p => p.nome === projeto)[0].diversidade = diversidade;

    console.log('this.listaProjetos');
    console.log(this.listaProjetos);

    this.sharedService.guardaListaProjetos(this.listaProjetos);

    console.log('this.sharedService.recuperaListaProjetos()');
    console.log(this.sharedService.recuperaListaProjetos());
    // limpa todas as listas aqui ou no caller
  }

  private calculaQtdContribuintes(projeto: string) {
      console.log('calculaQtdContribuintes()');

      const AxiosInstance = axios.create();
      const url = `https://github.com/${projeto}`;
      this.calculaQtdContribuintesPromise = AxiosInstance.get(url).then((response) => {
          const txtHtml = response.data;
          const parsedHtml = NodeParser.parse(txtHtml);
          const quantidadeContribuintes = Number((parsedHtml.querySelector('h2 a span.Counter').text).replace(',', ''));
          const quantidadeCommits = Number((parsedHtml.querySelector('a span strong').text).replace(',', ''));
          this.listaProjetos.filter(p => p.nome === projeto)[0].qtdContribuintes = quantidadeContribuintes;
          this.listaProjetos.filter(p => p.nome === projeto)[0].qtdCommits = quantidadeCommits;
          this.listaProjetos.filter(p => p.nome === projeto)[0].correlacaoTamanho = quantidadeCommits / quantidadeContribuintes;
        }).catch(error => {
        console.log('error');
        console.log(error);
      }); // Error handling

      return this.calculaQtdContribuintesPromise;
  }

}
