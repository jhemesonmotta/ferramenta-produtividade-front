import { Component, OnInit } from '@angular/core';
import { GithubApiService } from 'src/app/services/github/github-api.service';
import { PageSpeedApiService } from 'src/app/services/pagespeed/pagespeed-api.service';
import { PageSpeed } from 'src/app/classes/pagespeed';
import { GenderizeApiService } from 'src/app/services/genderize/genderize-api.service';
import * as NodeParser from 'node-html-parser';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public githubApiService: GithubApiService,
              public pageSpeedApiService: PageSpeedApiService,
              public genderizeApiService: GenderizeApiService) { }

  ngOnInit() {
    console.log('teste');

    this.scrape();

    // this.teste();

    // this.requisicaoGenderize();

    // this.requisicaoPageSpeed();
    // this.requisicoesGithub();

    // this.githubApiService.consultarCommits('jhemesonmotta/safira-web-project').subscribe((data) => {
    //   console.log('consultarCommits');
    //   console.log(data);
    // },
    // (error) => {
    //   console.log('error');
    //   console.log(error);
    // });
  }

  requisicaoPageSpeed() {
    console.log('requisicaoPageSpeed');

    this.pageSpeedApiService.consultarMetricas('https://open.spotify.com/').subscribe((data) => {
    console.log('data.lighthouseResult');
    console.log(data.lighthouseResult);

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

  requisicaoGenderize() {
    this.genderizeApiService.consultarGenero('Jhonatan').subscribe((data) => {
      console.log('consultarGenero');
      console.log(data);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });
  }

  private scrape() {
    console.log('scrape()');

    const AxiosInstance = axios.create();
    const url = 'https://github.com/MisterBooo/LeetCodeAnimation';

    AxiosInstance.get(url).then((response) => {
        const txtHtml = response.data;
        const parsedHtml = NodeParser.parse(txtHtml);

        console.log(parsedHtml.querySelector('h2 a span.Counter').text);

    }).catch(console.error); // Error handling
  }
}
