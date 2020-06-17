import {Injectable} from '@angular/core';
import { ProjectEvaluation } from '../classes/project.evaluation';

@Injectable()
export class SharedService {

  public static instance: SharedService = null;

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  guardaListaProjetos(listaProjetos: ProjectEvaluation[]): void {
    localStorage.setItem('listaProjetos', JSON.stringify({listaProjetos: listaProjetos}));
  }

  recuperaListaProjetos(): {listaProjetos: ProjectEvaluation[]} {
    return JSON.parse(localStorage.getItem('listaProjetos'));
  }
}
