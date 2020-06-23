import { Component, OnInit } from '@angular/core';
import { GithubApiService } from 'src/app/services/github/github-api.service';
import { SharedService } from 'src/app/services/shared.service';
import { ProjectEvaluation } from 'src/app/classes/project.evaluation';
import { PageSpeedApiService } from 'src/app/services/pagespeed/pagespeed-api.service';
import { GhRepoAtividadeUltimoAno } from 'src/app/classes/gh-atividade-ultimo-ano';
import { GhRepoContribuinte, GhContribuinte } from 'src/app/classes/gh-contribuinte';
import { GenderizeApiService } from 'src/app/services/genderize/genderize-api.service';

@Component({
  selector: 'app-rodar-scrappers',
  templateUrl: './rodar-scrappers.component.html',
  styleUrls: ['./rodar-scrappers.component.css']
})
export class RodarScrappersComponent implements OnInit {
  // motivo: as 15 mais utilizadas de 2020 até agora
  // fonte: https://madnight.github.io/githut/#/pull_requests/2020/1

  // listaDeLinguagens = ['javascript',
  //                         'python',
  //                         'java',
  //                         'go',
  //                         'cpp',
  //                         'ruby',
  //                         'typescript',
  //                         'php',
  //                         'csharp',
  //                         'C',
  //                         'scala',
  //                         'shell',
  //                         'rust',
  //                         'swift',
  //                         'kotlin'];

  // Variáveis públicas (podem ser exibidas no HTML)
  listaDeLinguagens = ['JavaScript'];
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

  constructor(public githubApiService: GithubApiService,
    public sharedService: SharedService,
    public pageSpeedApiService: PageSpeedApiService,
    public genderizeApiService: GenderizeApiService) { }

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
      });
    });
  }

  calcularQualidade() {
    console.log('calcularQualidade()');
    this.listaProjetos.forEach(projeto => {

      if (projeto.homePage != null && projeto.homePage !== '') {
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

  calcularBaseDesenvolvedores() {
    // (stargazers + watchers) / 2
    console.log('calcularBaseDesenvolvedores()');

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
    // pega os 100 últimos contribuintes
    // minera o gênero de cada um
    // faz o calculo de diversidade

    // 1 = 50% homens
    // 0 = 100% homens || 100% mulher
    // diversidade = 100 - |pct homens - pct mulheres|

    // this.listaProjetos.forEach(projeto => {

      this.calcularDiversidadeDeGenero('freeCodeCamp/freeCodeCamp');

    // });
  }

  calcularCorrelacaoTamanho() {
    // correlação de tamanho = quantidade total de commits / quantidade total de contribuintes

    this.listaProjetos.forEach(projeto => {

      // this.consultarRepositorios(linguagem).then(() => {
      //   this.sharedService.guardaListaProjetos(this.listaProjetos);
      //   console.log('this.sharedService.recuperaListaProjetos()');
      //   console.log(this.sharedService.recuperaListaProjetos());
      // });

    });
  }

  // Métodos Privados - Lower Level

  private consultarRepositorios(linguagem: string) {
    this.retornarReposPromise = this.githubApiService.consultarRepositorios(linguagem, 1)
    .toPromise()
    .then((data) => {
      data.items.forEach(projeto => {
        this.listaRetorno.push({
          nome: projeto.full_name,
          homePage: projeto.homepage,
          tamanho: 0,
          qualidade: {
            accesibilidade: 0,
            melhoresPraticas: 0,
            performance: 0,
            pwa: 0,
            seo: 0,
            total: 0
          },
          tamanhoComunidade: 0,
          diversidade: 0,
          frequenciaCommits: 0
        });
      });
    }, (error) => {
      console.log('error');
      console.log(error);
    });

    return this.retornarReposPromise;
  }

  private consultarMetricas(url: string) {
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

      let frequenciaCommits = 0;

      listaCommitsRetorno.forEach(item => {
        frequenciaCommits = frequenciaCommits + item.total;
      });

      if (frequenciaCommits > 0) {
        frequenciaCommits = frequenciaCommits / 365;
        this.listaProjetos.filter(p => p.nome === projeto)[0].frequenciaCommits = frequenciaCommits;
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
    this.consultarContribuintes(projeto).then(() => {
      console.log('this.listaContribuintesBusca');
      console.log(this.listaContribuintesBusca);

      this.listaContribuintesBusca.forEach(contribuinte => {
        this.consultarUsuario(contribuinte.author.url).then(() => {
          console.log(this.listaContribuintesCompleta);

          // semântica = acabou?
          if (this.listaContribuintesCompleta.length === this.listaContribuintesBusca.length) {
            console.log('this.buscaGeneroLista()');
            this.buscaGeneroLista(projeto);
          }
        });
      });
    });
  }

  private consultarContribuintes(projeto: string) {
    this.consultarContribuintesPromise = this.githubApiService
    .consultarContribuintes(projeto)
    .toPromise()
    .then((data) => {
      this.listaContribuintesBusca = data;
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    return this.consultarContribuintesPromise;
  }

  private consultarUsuario(url: string) {
    this.consultarUsuarioPromise = this.githubApiService
    .consultarUsuario(url)
    .toPromise()
    .then((usuario) => {
      this.listaContribuintesCompleta.push(usuario);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    return this.consultarUsuarioPromise;
  }

  private buscaGenero(nome: string) {
    this.consultarGeneroPromise = this.genderizeApiService
    .consultarGenero(nome)
    .toPromise()
    .then((genderize) => {
      console.log('buscaGenero');
      console.log(genderize);

      this.listaContribuintesCompleta.filter(contrib => contrib.name && contrib.name.includes(nome))[0].gender = genderize.gender;
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    return this.consultarGeneroPromise;
  }

  private buscaGeneroLista(projeto: string) {
    let qtdExecucoes = 0;

    this.listaContribuintesCompleta.forEach(contribuinte => {
      if (contribuinte.name) {
        this.buscaGenero(contribuinte.name.split(' ')[0]).then(() => {
          qtdExecucoes = qtdExecucoes + 1;
          console.log('this.listaContribuintesCompleta');
          console.log(this.listaContribuintesCompleta);

          console.log('qtdExecucoes');
          console.log(qtdExecucoes);

          if (qtdExecucoes === this.listaContribuintesCompleta.length) {
            this.calculaDiversidade(projeto);
          }
        });
      } else {
        qtdExecucoes = qtdExecucoes + 1;

        if (qtdExecucoes === this.listaContribuintesCompleta.length) {
          this.calculaDiversidade(projeto);
        }
      }
    });

    console.log('abacate abacate abacate abacate abacate');
  }

  private calculaDiversidade(projeto: string) {
    console.log('xxxxxxxx this.listaContribuintesCompleta xxxxxxxx');
    console.log(this.listaContribuintesCompleta);
  }
}
