import { Component, OnInit } from '@angular/core';
import { ProjetoService } from 'src/app/services/backend/projeto.service';
import { ProjectEvaluation } from 'src/app/classes/project.evaluation';
import { GithubApiService } from 'src/app/services/github/github-api.service';
import { PageSpeedApiService } from 'src/app/services/pagespeed/pagespeed-api.service';
import { GenderizeApiService } from 'src/app/services/genderize/genderize-api.service';
import { GhRepoAtividadeUltimoAno } from 'src/app/classes/gh-atividade-ultimo-ano';
import * as NodeParser from 'node-html-parser';
import axios from 'axios';
import { GhRepoContribuinte, GhContribuinte } from 'src/app/classes/gh-contribuinte';

@Component({
  selector: 'app-minerar-projeto',
  templateUrl: './minerar-projeto.component.html',
  styleUrls: ['./minerar-projeto.component.css']
})
export class MinerarProjetoComponent implements OnInit {

  deuErroNoCrawler = false;

  listaContribuintesBusca: Array<GhRepoContribuinte> = [];
  listaContribuintesCompleta: Array<GhContribuinte> = [];

  // Variáveis privadas
  private consultarMetricasPromise: Promise<void>;
  private consultarCommitsPromise: Promise<void>;
  private consultarBaseRepoPromise: Promise<void>;
  private consultarContribuintesPromise: Promise<void>;
  private consultarUsuarioPromise: Promise<void>;
  private consultarGeneroPromise: Promise<void>;
  private calculaDiversidadePromise: Promise<void>;
  private calculaQtdContribuintesPromise: Promise<void>;

  listaProjetos: Array<ProjectEvaluation> = [];
  projetoDaVez: ProjectEvaluation;

  mensagemFront = 'Iniciando...';

  constructor(public projetoService: ProjetoService,
    public githubApiService: GithubApiService,
    public pageSpeedApiService: PageSpeedApiService,
    public genderizeApiService: GenderizeApiService) { }

  ngOnInit() {
    this.projetoService.listar().subscribe((data) => {
      this.listaProjetos = data;
      console.log('this.listaProjetos');
      console.log(this.listaProjetos);

      this.decidirProjeto();

      console.log('this.projetoDaVez');
      console.log(this.projetoDaVez);

      if (this.projetoDaVez) {
        this.mensagemFront = 'Rodando ' + this.projetoDaVez.nome;
        this.buscaDadosProjeto();
      } else {
        this.mensagemFront = 'Processo finalizado.';
      }

    }, (error) => {
      console.log('Erro ao buscar lista');
      console.log(error);
    });
  }

  projetosRodados() {
    return this.listaProjetos.filter(proj => proj.qtdContribuintes && proj.qtdCommits && proj.tamanhoComunidade).length;
  }

  decidirProjeto() {
    this.listaProjetos.forEach(proj => {
      if (proj.qtdContribuintes === null && proj.qtdCommits === null
        && proj.tamanhoComunidade === null && (this.projetoDaVez === undefined || this.projetoDaVez === null)) {
          this.projetoDaVez = proj;
      }
    });
  }

  private salvarProjeto() {
    this.projetoService.salvar(this.projetoDaVez).subscribe((data) => {
      console.log('data');
      console.log(data);
      this.mensagemFront = 'Rodou ' + this.projetoDaVez.nome;
      window.location.reload();
    }, (error) => {
      console.log('error');
      console.log(error);
    });
  }

  private buscaDadosProjeto() {
    this.mensagemFront = 'Rodando ' + this.projetoDaVez.nome + ' - Consultando tamanho da comunidade.';
    this.consultarTamanhoComunidade(this.projetoDaVez.nome).then(() => {
      this.mensagemFront = 'Rodando ' + this.projetoDaVez.nome + ' - Calculando quantidade de contribuintes.';
      this.calculaQtdContribuintes(this.projetoDaVez.nome).then(() => {
        this.mensagemFront = 'Rodando ' + this.projetoDaVez.nome + ' - Consultando frequência de commits.';
        this.consultarCommits(this.projetoDaVez.nome).then(() => {
          if (this.projetoDaVez.homePage) {
            this.mensagemFront = 'Rodando ' + this.projetoDaVez.nome + ' - Calculando métricas de qualidade..';
            this.consultarMetricas(this.projetoDaVez.homePage).then(() => {
              this.salvarProjeto();
            });
          } else {
            this.salvarProjeto();
          }
          // this.calcularDiversidadeDeGenero(this.projetoDaVez.nome);
        });
      });

    });
  }


  private consultarMetricas(url: string) {
    console.log(`consultarMetricas(${url})`);
    this.consultarMetricasPromise = this.pageSpeedApiService.consultarMetricas(url)
    .toPromise()
    .then((data) => {
      console.log('data.lighthouseResult.categories');
      console.log(data.lighthouseResult.categories);

      const categorias = data.lighthouseResult.categories;

      this.projetoDaVez.qualidade.accesibilidade = categorias.accessibility.score;
      this.projetoDaVez.qualidade.melhoresPraticas = categorias['best-practices'].score;
      this.projetoDaVez.qualidade.performance = categorias.performance.score;
      this.projetoDaVez.qualidade.pwa = categorias.pwa.score;
      this.projetoDaVez.qualidade.seo = categorias.seo.score;
      this.projetoDaVez.qualidade.total =
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
          this.projetoDaVez.frequenciaCommits = frequenciaCommits;
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
      const tamanhoComunidade = (Number(data.stargazers_count) + Number(data.watchers_count)) / 2;
      this.projetoDaVez.tamanhoComunidade = tamanhoComunidade;
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
      console.log(this.listaContribuintesBusca);

      this.listaContribuintesBusca.forEach(contribuinte => {
        this.consultarUsuario(contribuinte.author.html_url, contribuinte.projeto).then(() => {
          // semântica = acabou?
          this.buscaGeneroLista(projeto);
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

  private consultarUsuario(html_url: string, projeto: string) {
    if (!this.deuErroNoCrawler) {
      const AxiosInstance = axios.create();
      const url = html_url;
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

        return this.consultarUsuarioPromise;
      }).catch(error => {
        console.log('error');
        console.log(error);
        this.deuErroNoCrawler = true;

        // i.e.: acabou
        this.buscaGeneroLista(projeto);
      }); // Error handling
    } else {
      return this.consultarUsuarioPromise;
    }
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
    console.log('buscaGeneroLista');
    let qtdExecucoes = 0;

    if (this.listaContribuintesCompleta.length > 0) {
      this.listaContribuintesCompleta.forEach(contribuinte => {
        if (contribuinte.name) {
          this.buscaGenero(contribuinte.name.split(' ')[0]).then(() => {
            qtdExecucoes = qtdExecucoes + 1;
  
            if (qtdExecucoes === this.listaContribuintesCompleta.length) {
              this.calculaDiversidade(projeto);
              console.log('this.calculaDiversidade');
            }
          });
        } else {
          qtdExecucoes = qtdExecucoes + 1;
  
          if (qtdExecucoes === this.listaContribuintesCompleta.length) {
            this.calculaDiversidade(projeto);
            console.log('this.calculaDiversidade');
          }
        }
      });
    } else {
      this.calculaDiversidade(projeto);
      console.log('this.calculaDiversidade');
    }
    this.listaContribuintesCompleta.forEach(contribuinte => {
      if (contribuinte.name) {
        this.buscaGenero(contribuinte.name.split(' ')[0]).then(() => {
          qtdExecucoes = qtdExecucoes + 1;

          if (qtdExecucoes === this.listaContribuintesCompleta.length) {
            this.calculaDiversidade(projeto);
            console.log('this.calculaDiversidade');
          }
        });
      } else {
        qtdExecucoes = qtdExecucoes + 1;

        if (qtdExecucoes === this.listaContribuintesCompleta.length) {
          this.calculaDiversidade(projeto);
          console.log('this.calculaDiversidade');
        }
      }
    });
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
          
          this.projetoDaVez.qtdContribuintes = quantidadeContribuintes;
          this.projetoDaVez.qtdCommits = quantidadeCommits;
          this.projetoDaVez.correlacaoTamanho = quantidadeCommits / quantidadeContribuintes;
        }).catch(error => {
        console.log('error');
        console.log(error);
      }); // Error handling

      return this.calculaQtdContribuintesPromise;
  }

  private calculaDiversidade(projeto: string) {
    console.log('xxxxxxxx this.listaContribuintesCompleta xxxxxxxx');
    console.log(this.listaContribuintesCompleta);

    const pctHomens = (this.listaContribuintesCompleta
      .filter(c => c.projeto === projeto && c.gender === 'male').length / this.listaContribuintesCompleta.length) * 100;
    const pctMulheres = (this.listaContribuintesCompleta
      .filter(c => c.projeto === projeto && c.gender === 'female').length / this.listaContribuintesCompleta.length) * 100;

    const diferencaAbsolutaArredondada = +(Math.abs(pctHomens - pctMulheres)).toFixed(3);
    const diversidade = 100 - diferencaAbsolutaArredondada;
    this.projetoDaVez.diversidade = diversidade;

    console.log('this.projetoDaVez');
    console.log(this.projetoDaVez);

    if (this.projetoDaVez.homePage != null && this.projetoDaVez.homePage !== '') {
      console.log('entrou aqui');
      this.consultarMetricas(this.projetoDaVez.homePage).then(() => {
        console.log('acabou');
        this.mensagemFront = 'Rodou ' + this.projetoDaVez.nome;
        console.log('this.projetoDaVez');
        console.log(this.projetoDaVez);
        // salvar contribuição

        this.projetoService.salvar(this.projetoDaVez).subscribe((data) => {
          console.log('data');
          console.log(data);
        }, (error) => {
          console.log('error');
          console.log(error);
        });
      });
    } else {
      console.log('acabou');
      this.mensagemFront = 'Rodou ' + this.projetoDaVez.nome;
      console.log('this.projetoDaVez');
      console.log(this.projetoDaVez);
      // SALVAR contribuição

      this.projetoService.salvar(this.projetoDaVez).subscribe((data) => {
        console.log('data');
        console.log(data);
      }, (error) => {
        console.log('error');
        console.log(error);
      });
    }
  }
}
