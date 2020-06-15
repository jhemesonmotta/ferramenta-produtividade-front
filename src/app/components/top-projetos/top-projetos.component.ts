import { Component, OnInit } from '@angular/core';
import { GithubApiService } from 'src/app/services/github/github-api.service';

@Component({
  selector: 'app-top-projetos',
  templateUrl: './top-projetos.component.html',
  styleUrls: ['./top-projetos.component.css']
})
export class TopProjetosComponent implements OnInit {
  // motivo: as 15 mais utilizadas de 2020 até agora
  // fonte: https://madnight.github.io/githut/#/pull_requests/2020/1
  listaDeLinguagens = ['JavaScript',
                          'Python',
                          'Java',
                          'Go',
                          'cpp',
                          'Ruby',
                          'TypeScript',
                          'PHP',
                          'csharp',
                          'C',
                          'Scala',
                          'Shell',
                          'Rust',
                          'Swift',
                          'Kotlin'];

  constructor(public githubApiService: GithubApiService) { }

  ngOnInit() {
    this.consultarRepositorios('Java');
  }

  consultarRepositorios(linguagem: string) {
    // OBS.: a API só traz 30 itens por página. Para buscar 100, teremos que fazer 4 requisições

    this.githubApiService.consultarRepositorios(linguagem, 2).subscribe((data) => {
      console.log('consultarRepositorios');
      console.log(data);
    },
    (error) => {
      console.log('error');
      console.log(error);
    });

    // Próximos passos
      // 1 - fazer pegar os 100 primeiros de uma linguagem qualquer e add numa lista (apenas url)
      // 2 - fazer pegar os 100 primeiros das 15 linguagens
      // 3 - guardar em localhost pra n precisar conferir sempre
      // 4 - exportar em PDF (pra anexar no repositório como referência)
  }
}
