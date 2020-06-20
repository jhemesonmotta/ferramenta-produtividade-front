import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SharedService} from '../services/shared.service';
import {Injectable} from '@angular/core';
import { GITHUB_BASE_URL } from '../global/global';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private sharedService: SharedService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleAccess(request, next);
  }

  private handleAccess(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let changedRequest = request;
    const headerSettings: {[name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }

    // const usuarioLogado = this.sharedService.getCurrentLogin();
    if (request.url.startsWith(GITHUB_BASE_URL)) {
      headerSettings['Authorization'] = `Token ${atob('MmZjMmViOWFmOTU1NGZlZjQzMDUyYzhjMzNkNjBhZjE1NzZkY2NjZA==')}`;
    }
    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader});
    return next.handle(changedRequest);
  }

}
