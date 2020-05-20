import { Component, OnInit } from '@angular/core';
import { GithubApiService } from 'src/app/services/github/github-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public githubApiService: GithubApiService) { }

  ngOnInit() {
    console.log('teste');

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
