import { Component, OnInit } from '@angular/core';
import { GithubApiService } from 'src/app/services/github/github-api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-top-projetos',
  templateUrl: './top-projetos.component.html',
  styleUrls: ['./top-projetos.component.css']
})
export class TopProjetosComponent implements OnInit {
  private retornarReposPromise: Promise<void>;

  // motivo: as 15 mais utilizadas de 2020 até agora
  // fonte: https://madnight.github.io/githut/#/pull_requests/2020/1

  listaDeLinguagens = ['javascript',
                          'python',
                          'java',
                          'go',
                          'cpp',
                          'ruby',
                          'typescript',
                          'php',
                          'csharp',
                          'C',
                          'scala',
                          'shell',
                          'rust',
                          'swift',
                          'kotlin'];

  // listaDeLinguagens = ['JavaScript', 'cobol'];

  listaRetorno: Array<string> = [];

  constructor(public githubApiService: GithubApiService,
    public sharedService: SharedService) { }

  ngOnInit() {
    if (!this.sharedService.recuperaListaRetorno()) {
      this.listaDeLinguagens.forEach(linguagem => {
        this.consultarRepositorios(linguagem).then(() => {
          this.sharedService.guardaListaRetorno(this.listaRetorno);
          console.log('this.sharedService.recuperaListaRetorno()');
          console.log(this.sharedService.recuperaListaRetorno());
        });
      });
    }
  }

  consultarRepositorios(linguagem: string) {
    this.retornarReposPromise = this.githubApiService.consultarRepositorios(linguagem, 1)
    .toPromise()
    .then((data) => {
      Array.prototype.push.apply(this.listaRetorno, data.items.map(repositorio => repositorio.full_name));
    }, (error) => {
      console.log('error');
      console.log(error);
    });

    return this.retornarReposPromise;

    // Próximos passos
      // 1 - fazer pegar os 100 primeiros de uma linguagem qualquer e add numa lista (apenas url)
      // 2 - fazer pegar os 100 primeiros das 15 linguagens
      // 3 - guardar em localhost pra n precisar conferir sempre
      // 4 - exportar em PDF (pra anexar no repositório como referência)
  }
}
