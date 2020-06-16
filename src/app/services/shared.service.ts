import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {

  public static instance: SharedService = null;

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  guardaListaRetorno(listaRetorno: string[]): void {
    localStorage.setItem('listaRetorno', JSON.stringify({listaRetorno: listaRetorno}));
  }

  recuperaListaRetorno(): any {
    return JSON.parse(localStorage.getItem('listaRetorno'));
  }
}
