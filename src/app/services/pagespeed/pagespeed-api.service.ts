import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PageSpeedApiService {
  private categorias = 'category=ACCESSIBILITY&category=BEST_PRACTICES&category=PERFORMANCE&category=PWA&category=SEO&';
  private myKey = 'AIzaSyARJvYUi12SEv-Tju4bGg_F_WNklnd1hU4';
  private baseUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

  constructor(private http: HttpClient) {}

  consultarMetricas(url: string): Observable<any> {
    this.wait(500);
    return this.http.get(`${this.baseUrl}?${this.categorias}url=${url}&key=${this.myKey}`) as Observable<any>;
  }

  private wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
   }
 }
}
