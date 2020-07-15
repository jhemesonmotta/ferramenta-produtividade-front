import { Component, OnInit } from '@angular/core';
import { CsvDataService } from 'src/app/services/csv/csv.service';
import { ProjetoService } from 'src/app/services/backend/projeto.service';
import { ProjectEvaluation, ProjectEvaluationCsv } from 'src/app/classes/project.evaluation';

@Component({
  selector: 'app-gerar-csv',
  templateUrl: './gerar-csv.component.html',
  styleUrls: ['./gerar-csv.component.css']
})
export class GerarCsvComponent implements OnInit {

  constructor(public projetoService: ProjetoService) { }

  ngOnInit() {
  }

  gerarCsv() {
    console.log('buscando dados');
    this.projetoService.listarProducao().subscribe((data) => {
        console.log('data');
        console.log(data);
        CsvDataService.exportToCsv('dados_projetos.csv', ';', this.converterParaFormatoLegivel(data));
    });
  }

  converterParaFormatoLegivel(listaProjetos: Array<ProjectEvaluation>): Array<ProjectEvaluationCsv> {
    const listaRetorno: Array<ProjectEvaluationCsv> = new Array<ProjectEvaluationCsv>();

    listaProjetos.forEach(projeto => {
      const novoProjeto: ProjectEvaluationCsv = {
        id: projeto.id,
        nome: projeto.nome,
        homePage: projeto.homePage,
        linguagemProgramacao: projeto.linguagemProgramacao,
        diversidade: projeto.diversidade ? projeto.diversidade.toFixed(2) : '',
        frequenciaCommits: projeto.frequenciaCommits ? projeto.frequenciaCommits.toFixed(2) : '',
        tamanhoComunidade: projeto.tamanhoComunidade ? projeto.tamanhoComunidade.toFixed(2) : '',
        qtdContribuintes: projeto.qtdContribuintes ? projeto.qtdContribuintes.toFixed(2) : '',
        qtdCommits: projeto.qtdCommits ? projeto.qtdCommits.toFixed(2) : '',
        correlacaoTamanho: projeto.correlacaoTamanho ? projeto.correlacaoTamanho.toFixed(2) : '',
        qualidade_total: projeto.qualidade.total ? projeto.qualidade.total.toFixed(2) : '',
        qualidade_accesibilidade: projeto.qualidade.accesibilidade ? projeto.qualidade.accesibilidade.toFixed(2) : '',
        qualidade_melhoresPraticas: projeto.qualidade.melhoresPraticas ? projeto.qualidade.melhoresPraticas.toFixed(2) : '',
        qualidade_performance: projeto.qualidade.performance ? projeto.qualidade.performance.toFixed(2) : '',
        qualidade_pwa: projeto.qualidade.pwa ? projeto.qualidade.pwa.toFixed(2) : '',
        qualidade_seo: projeto.qualidade.seo ? projeto.qualidade.seo.toFixed(2) : ''
      };

      listaRetorno.push(novoProjeto);
    });

    console.log('listaRetorno');
    console.log(listaRetorno);

    return listaRetorno;
  }

}
