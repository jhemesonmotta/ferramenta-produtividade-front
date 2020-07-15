import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectEvaluation } from 'src/app/classes/project.evaluation';
import { BACKEND_API } from 'src/app/global/global';

@Injectable()
export class ProjetoService {

    constructor(private http: HttpClient) {
    }

    listar(): Observable<Array<ProjectEvaluation>> {
        return this.http.get(`${BACKEND_API}projetos`) as Observable<Array<ProjectEvaluation>>;
    }

    listarProducao(): Observable<Array<ProjectEvaluation>> {
        return this.http.get(`https://ferramenta-produtividade-back.herokuapp.com/api/v1/projetos`) as Observable<Array<ProjectEvaluation>>;
    }

    buscarPorID(identificador: number): Observable<ProjectEvaluation> {
        return this.http.get(`${BACKEND_API}projetos/${identificador}`) as Observable<ProjectEvaluation>;
    }

    deletarPorID(identificador: number): Observable<any> {
        return this.http.delete(`${BACKEND_API}projetos/${identificador}`) as Observable<any>;
    }

    criar(projeto: ProjectEvaluation): Observable<any> {
        return this.http.post(`${BACKEND_API}projetos`, projeto) as Observable<any>;
    }

    criarLista(projetos: Array<ProjectEvaluation>): Observable<any> {
        return this.http.post(`${BACKEND_API}projetos/addAll`, { projetos: projetos }) as Observable<any>;
    }

    criarListaProducao(projetos: Array<ProjectEvaluation>): Observable<any> {
        return this.http.post(`https://ferramenta-produtividade-back.herokuapp.com/api/v1/projetos/addAll`, { projetos: projetos }) as Observable<any>;
    }

    salvar(projeto: ProjectEvaluation): Observable<any> {
        return this.http.post(`${BACKEND_API}projetos/edit`, projeto) as Observable<any>;
    }

}
