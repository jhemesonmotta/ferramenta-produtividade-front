import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { routes } from './app.routes';
import { GithubApiService } from './services/github/github-api.service';
import { HttpClientModule } from '@angular/common/http';
import { PageSpeedApiService } from './services/pagespeed/pagespeed-api.service';
import { GenderizeApiService } from './services/genderize/genderize-api.service';
import { TopProjetosComponent } from './components/top-projetos/top-projetos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    TopProjetosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routes
  ],
  providers: [
    GithubApiService,
    PageSpeedApiService,
    GenderizeApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
