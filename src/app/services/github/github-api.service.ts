import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GithubApiService {

  private baseUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) {}

  consultarCommits(projeto: string): Observable<any> {
      return this.http.get(`${this.baseUrl}repos/jhemesonmotta/ferramenta-produtividade-front/commits`) as Observable<any>;
  }
}
