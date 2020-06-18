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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    TopProjetosComponent,
    RodarScrappersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routes
  ],
  providers: [
    SharedService,
    GithubApiService,
    PageSpeedApiService,
    GenderizeApiService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
