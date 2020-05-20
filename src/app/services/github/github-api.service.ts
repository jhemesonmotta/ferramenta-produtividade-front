import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GithubApiService {

  private baseUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) {}

  consultarCommits(projeto: string): Observable<any> {
      return this.http.get(`${this.baseUrl}repos/${projeto}/commits`) as Observable<any>;
  }

  consultarBranches(projeto: string): Observable<any> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/branches`) as Observable<any>;
  }

  consultarForks(projeto: string): Observable<any> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/forks`) as Observable<any>;
  }

  consultarReleases(projeto: string): Observable<any> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/releases`) as Observable<any>;
  }

  consultarContribuintes(projeto: string): Observable<any> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/stats/contributors`) as Observable<any>;
  }

  consultarAtividadesDeCommitUltimoAno(projeto: string): Observable<any> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/stats/commit_activity`) as Observable<any>;
  }

  consultarAdicoesDelecoes(projeto: string): Observable<any> {
    return this.http.get(`${this.baseUrl}repos/${projeto}/stats/code_frequency`) as Observable<any>;
  }

}
