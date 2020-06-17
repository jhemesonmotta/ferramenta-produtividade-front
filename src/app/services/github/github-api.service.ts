import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GhRepoCommit } from 'src/app/classes/gh-commit';
import { GhRepoBranch } from 'src/app/classes/gh-branch';
import { GhRepoRelease } from 'src/app/classes/gh-releases';
import { GhRepoContribuinte } from 'src/app/classes/gh-contribuinte';
import { GhRepoAtividadeUltimoAno } from 'src/app/classes/gh-atividade-ultimo-ano';
import { GhRepoParticipacaoExterna } from 'src/app/classes/gh-participacao-externa';

@Injectable()
export class GithubApiService {

  private baseUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) {}

  consultarCommits(projeto: string): Observable<Array<GhRepoCommit>> {
    this.wait(2000);
    return this.http.get(`${this.baseUrl}repos/${projeto}/commits`) as Observable<Array<GhRepoCommit>>;
  }

  consultarBranches(projeto: string): Observable<Array<GhRepoBranch>> {
    this.wait(2000);
    return this.http.get(`${this.baseUrl}repos/${projeto}/branches`) as Observable<Array<GhRepoBranch>>;
  }

  consultarForks(projeto: string): Observable<Array<any>> {
    this.wait(2000);
    return this.http.get(`${this.baseUrl}repos/${projeto}/forks`) as Observable<Array<any>>;
  }

  consultarReleases(projeto: string): Observable<Array<GhRepoRelease>> {
    this.wait(2000);
    return this.http.get(`${this.baseUrl}repos/${projeto}/releases`) as Observable<Array<GhRepoRelease>>;
  }

  consultarContribuintes(projeto: string): Observable<Array<GhRepoContribuinte>> {
    this.wait(2000);
    return this.http.get(`${this.baseUrl}repos/${projeto}/stats/contributors`) as Observable<Array<GhRepoContribuinte>>;
  }

  consultarAtividadesDeCommitUltimoAno(projeto: string): Observable<GhRepoAtividadeUltimoAno> {
    this.wait(2000);
    return this.http.get(`${this.baseUrl}repos/${projeto}/stats/commit_activity`) as Observable<GhRepoAtividadeUltimoAno>;
  }

  consultarAdicoesDelecoes(projeto: string): Observable<Array<any>> {
    this.wait(2000);
    return this.http.get(`${this.baseUrl}repos/${projeto}/stats/code_frequency`) as Observable<Array<any>>;
  }

  consultarParticipacaoExternaEDoDono(projeto: string): Observable<GhRepoParticipacaoExterna> {
    this.wait(2000);
    return this.http.get(`${this.baseUrl}repos/${projeto}/stats/participation`) as Observable<GhRepoParticipacaoExterna>;
  }

  consultarRepositorios(linguagem: string, pagina: number): Observable<any> {
    this.wait(7000);
    return this.http.get(`${this.baseUrl}search/repositories?q=stars:%3E5+language:${linguagem}&sort=stars&order=desc&page=${pagina}`
    ) as Observable<any>;
  }

  private wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
   }
 }
}
