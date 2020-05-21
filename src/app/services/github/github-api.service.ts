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
      return this.http.get(`${this.baseUrl}repos/${projeto}/commits`) as Observable<Array<GhRepoCommit>>;
  }

  consultarBranches(projeto: string): Observable<Array<GhRepoBranch>> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/branches`) as Observable<Array<GhRepoBranch>>;
  }

  consultarForks(projeto: string): Observable<Array<any>> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/forks`) as Observable<Array<any>>;
  }

  consultarReleases(projeto: string): Observable<Array<GhRepoRelease>> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/releases`) as Observable<Array<GhRepoRelease>>;
  }

  consultarContribuintes(projeto: string): Observable<Array<GhRepoContribuinte>> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/stats/contributors`) as Observable<Array<GhRepoContribuinte>>;
  }

  consultarAtividadesDeCommitUltimoAno(projeto: string): Observable<GhRepoAtividadeUltimoAno> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/stats/commit_activity`) as Observable<GhRepoAtividadeUltimoAno>;
  }

  consultarAdicoesDelecoes(projeto: string): Observable<Array<any>> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/stats/code_frequency`) as Observable<Array<any>>;
  }

  consultarParticipacaoExternaEDoDono(projeto: string): Observable<GhRepoParticipacaoExterna> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/stats/participation`) as Observable<GhRepoParticipacaoExterna>;
  }

}
