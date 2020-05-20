import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PageSpeedApiService {

  private baseUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

  constructor(private http: HttpClient) {}

  consultarMetricas(url: string): Observable<any> {
      return this.http.get(`${this.baseUrl}?url=${url}`) as Observable<any>;
  }
}
