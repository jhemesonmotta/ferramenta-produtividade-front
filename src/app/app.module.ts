import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { routes } from './app.routes';
import { GithubApiService } from './services/github/github-api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageSpeedApiService } from './services/pagespeed/pagespeed-api.service';
import { GenderizeApiService } from './services/genderize/genderize-api.service';
import { TopProjetosComponent } from './components/top-projetos/top-projetos.component';
import { SharedService } from './services/shared.service';
import { RodarScrappersComponent } from './components/rodar-scrappers/rodar-scrappers.component';
import { HttpTokenInterceptor } from './httpinterceptor/http.token.interceptor';
import { ProjetoService } from './services/backend/projeto.service';
import { MinerarProjetoComponent } from './components/minerar-projeto/minerar-projeto.component';
import { AtualizarHerokuComponent } from './components/atualizar-heroku/atualizar-heroku.component';
import { GerarCsvComponent } from './components/gerar-csv/gerar-csv.component';
import { LutadorScraperComponent } from './components/mmastats/lutador-scraper/lutador-scraper.component';
import { LutaScraperComponent } from './components/mmastats/luta-scraper/luta-scraper.component';
import { LutadoresService } from './services/mmastats/mmastats.service';
import { OrganizacaoScraperComponent } from './components/mmastats/organizacao-scraper/organizacao-scraper.component';
import { EventoScraperComponent } from './components/mmastats/evento-scraper/evento-scraper.component';
import { ScoreUpdateComponent } from './components/mmastats/score-update/score-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    TopProjetosComponent,
    RodarScrappersComponent,
    MinerarProjetoComponent,
    AtualizarHerokuComponent,
    GerarCsvComponent,
    LutadorScraperComponent,
    LutaScraperComponent,
    OrganizacaoScraperComponent,
    EventoScraperComponent,
    ScoreUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routes
  ],
  providers: [
    ProjetoService,
    SharedService,
    GithubApiService,
    PageSpeedApiService,
    GenderizeApiService,
    LutadoresService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
