import { Component, OnInit } from '@angular/core';
import { GithubApiService } from 'src/app/services/github/github-api.service';
import { PageSpeedApiService } from 'src/app/services/pagespeed/pagespeed-api.service';
import { PageSpeed } from 'src/app/classes/pagespeed';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public githubApiService: GithubApiService,
              public pageSpeedApiService: PageSpeedApiService) { }

  ngOnInit() {
    console.log('teste');

    // this.requisicaoPageSpeed();
    this.requisicoesGithub();

    // TODO: fazer authentication na github API

    // ADD inferência de gênero

    // ADD lib de métricas
  }

  requisicaoPageSpeed() {
    console.log('requisicaoPageSpeed');

    this.pageSpeedApiService.consultarMetricas('https://open.spotify.com/').subscribe((data) => {

    const pagespeed: PageSpeed = {
        firstInput: data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category,
        firstPaint: data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
        firstInputOrigin: data.originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS.category,
        firstPaintOrigin: data.originLoadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category
      };

      console.log('pagespeed');
      console.log(pagespeed);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });
  }

  requisicoesGithub() {
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
  }
}
