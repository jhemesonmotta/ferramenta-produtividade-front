import { Component, OnInit } from '@angular/core';
import { ProjetoService } from 'src/app/services/backend/projeto.service';
import { ProjectEvaluation } from 'src/app/classes/project.evaluation';

@Component({
  selector: 'app-minerar-projeto',
  templateUrl: './minerar-projeto.component.html',
  styleUrls: ['./minerar-projeto.component.css']
})
export class MinerarProjetoComponent implements OnInit {

  // Variáveis privadas
  private retornarReposPromise: Promise<void>;
  private consultarMetricasPromise: Promise<void>;
  private consultarCommitsPromise: Promise<void>;
  private consultarBaseRepoPromise: Promise<void>;
  private consultarContribuintesPromise: Promise<void>;
  private consultarUsuarioPromise: Promise<void>;
  private consultarGeneroPromise: Promise<void>;
  private calculaDiversidadePromise: Promise<void>;
  private calculaQtdContribuintesPromise: Promise<void>;

  listaProjetos: Array<ProjectEvaluation> = [];
  projetoDaVez: ProjectEvaluation;

  mensagemFront = 'Iniciando...';

  constructor(public projetoService: ProjetoService) { }

  ngOnInit() {
    this.projetoService.listar().subscribe((data) => {
      this.listaProjetos = data;
      console.log('this.listaProjetos');
      console.log(this.listaProjetos);

       this.decidirProjeto();

      console.log('this.projetoDaVez');
      console.log(this.projetoDaVez);

      if (this.projetoDaVez) {
        this.mensagemFront = 'Rodando ' + this.projetoDaVez.nome;
        // chama os métodos encadeados, com intervalo entre cada um (o já padrão) e um maior entre todos
      } else {
        this.mensagemFront = 'Processo finalizado.';
      }

    }, (error) => {
      console.log('Erro ao buscar lista');
      console.log(error);
    });
  }

  decidirProjeto(): ProjectEvaluation {
    this.listaProjetos.forEach(proj => {
      if (proj.qtdContribuintes === null && proj.qtdCommits === null
        && proj.tamanhoComunidade === null && this.projetoDaVez === undefined) {
        return proj;
      }
    });
    return null;
  }

}
