import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GhRepoCommit } from 'src/app/classes/gh-commit';
import { GhRepoBranch } from 'src/app/classes/gh-branch';
import { GhRepoRelease } from 'src/app/classes/gh-releases';
import { GhRepoContribuinte, GhContribuinte } from 'src/app/classes/gh-contribuinte';
import { GhRepoAtividadeUltimoAno } from 'src/app/classes/gh-atividade-ultimo-ano';
import { GhRepoParticipacaoExterna } from 'src/app/classes/gh-participacao-externa';
import { GITHUB_BASE_URL } from 'src/app/global/global';

@Injectable()
export class GithubApiService {

  constructor(private http: HttpClient) {}

  consultarBaseRepo(projeto: string): Observable<any> {
    this.wait(2000);
    return this.http.get(`${GITHUB_BASE_URL}repos/${projeto}`) as Observable<any>;
  }

  consultarCommits(projeto: string): Observable<Array<GhRepoCommit>> {
    this.wait(2000);
    return this.http.get(`${GITHUB_BASE_URL}repos/${projeto}/commits`) as Observable<Array<GhRepoCommit>>;
  }

  consultarBranches(projeto: string): Observable<Array<GhRepoBranch>> {
    this.wait(2000);
    return this.http.get(`${GITHUB_BASE_URL}repos/${projeto}/branches`) as Observable<Array<GhRepoBranch>>;
  }

  consultarForks(projeto: string): Observable<Array<any>> {
    this.wait(2000);
    return this.http.get(`${GITHUB_BASE_URL}repos/${projeto}/forks`) as Observable<Array<any>>;
  }

  consultarReleases(projeto: string): Observable<Array<GhRepoRelease>> {
    this.wait(2000);
    return this.http.get(`${GITHUB_BASE_URL}repos/${projeto}/releases`) as Observable<Array<GhRepoRelease>>;
  }

  consultarContribuintes(projeto: string): Observable<Array<GhRepoContribuinte>> {
    this.wait(2000);
    return this.http.get(`${GITHUB_BASE_URL}repos/${projeto}/stats/contributors`) as Observable<Array<GhRepoContribuinte>>;
  }

  consultarAtividadesDeCommitUltimoAno(projeto: string): Observable<Array<GhRepoAtividadeUltimoAno>> {
    this.wait(2000);
    return this.http.get(`${GITHUB_BASE_URL}repos/${projeto}/stats/commit_activity`) as Observable<Array<GhRepoAtividadeUltimoAno>>;
  }

  consultarAdicoesDelecoes(projeto: string): Observable<Array<any>> {
    this.wait(2000);
    return this.http.get(`${GITHUB_BASE_URL}repos/${projeto}/stats/code_frequency`) as Observable<Array<any>>;
  }

  consultarParticipacaoExternaEDoDono(projeto: string): Observable<GhRepoParticipacaoExterna> {
    this.wait(2000);
    return this.http.get(`${GITHUB_BASE_URL}repos/${projeto}/stats/participation`) as Observable<GhRepoParticipacaoExterna>;
  }

  consultarUsuario(url: string): Observable<GhContribuinte> {
    this.wait(2000);
    return this.http.get(url) as Observable<GhContribuinte>;
  }

  consultarRepositorios(linguagem: string, pagina: number): Observable<any> {
    this.wait(7000);
    return this.http.get(`${GITHUB_BASE_URL}search/repositories?q=stars:%3E5+language:${linguagem}&sort=stars&order=desc&page=${pagina}`
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
