import { Component, OnInit } from '@angular/core';
import { GithubApiService } from 'src/app/services/github/github-api.service';
// import { lighthouseCheck } from '@foo-software/lighthouse-check';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public githubApiService: GithubApiService) { }

  ngOnInit() {
    console.log('teste');

    // this.carregarAuditoria();

    this.githubApiService.consultarCommits('jhemesonmotta/ferramenta-produtividade-front').subscribe((data) => {
      console.log('consultarCommits');
      console.log(data);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    this.githubApiService.consultarBranches('jhemesonmotta/ferramenta-produtividade-front').subscribe((data) => {
      console.log('consultarBranches');
      console.log(data);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    this.githubApiService.consultarForks('jhemesonmotta/analisadorLexicoSintatico').subscribe((data) => {
      console.log('consultarForks');
      console.log(data);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    this.githubApiService.consultarReleases('jhemesonmotta/ferramenta-produtividade-front').subscribe((data) => {
      console.log('consultarReleases');
      console.log(data);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    this.githubApiService.consultarContribuintes('jhemesonmotta/analisadorLexicoSintatico').subscribe((data) => {
      console.log('consultarContribuintes');
      console.log(data);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    this.githubApiService.consultarAtividadesDeCommitUltimoAno('jhemesonmotta/ferramenta-produtividade-front').subscribe((data) => {
      console.log('consultarAtividadesDeCommitUltimoAno');
      console.log(data);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    this.githubApiService.consultarAdicoesDelecoes('jhemesonmotta/ferramenta-produtividade-front').subscribe((data) => {
      console.log('consultarAdicoesDelecoes');
      console.log(data);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    this.githubApiService.consultarParticipacaoExternaEDoDono('jhemesonmotta/ferramenta-produtividade-front').subscribe((data) => {
      console.log('consultarParticipacaoExternaEDoDono');
      console.log(data);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    // TODO: fazer authentication na github API

    // ADD inferência de gênero

    // ADD lib de métricas
  }

  // carregarAuditoria(){
  //   console.log('aqui 1');
  //   (async () => {
  //     const response = await lighthouseCheck({
  //       urls: [
  //         'https://www.foo.software',
  //         'https://www.foo.software/contact'
  //       ]
  //     });

  //     console.log('aqui 2');
  //     console.log('response', response);
  //   })();
  // }
}
