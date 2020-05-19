import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './components/home/home.component';
import {ModuleWithProviders} from "@angular/core";
import { PaginaNaoEncontradaComponent } from "./components/pagina-nao-encontrada/pagina-nao-encontrada.component";

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent
  }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
