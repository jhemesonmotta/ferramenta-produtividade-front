import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ModuleWithProviders} from '@angular/core';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { TopProjetosComponent } from './components/top-projetos/top-projetos.component';
import { RodarScrappersComponent } from './components/rodar-scrappers/rodar-scrappers.component';
import { MinerarProjetoComponent } from './components/minerar-projeto/minerar-projeto.component';
import { AtualizarHerokuComponent } from './components/atualizar-heroku/atualizar-heroku.component';
import { GerarCsvComponent } from './components/gerar-csv/gerar-csv.component';
import { LutadorScraperComponent } from './components/mmastats/lutador-scraper/lutador-scraper.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'top-projetos',
    component: TopProjetosComponent
  },
  {
    path: 'rodar-scrappers',
    component: RodarScrappersComponent
  },
  {
    path: 'minerar-projeto',
    component: MinerarProjetoComponent
  },
  {
    path: 'atualizar-heroku',
    component: AtualizarHerokuComponent
  },
  {
    path: 'gerar-csv',
    component: GerarCsvComponent
  },
  {
    path: 'scrape-lutadores',
    component: LutadorScraperComponent
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent
  }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
