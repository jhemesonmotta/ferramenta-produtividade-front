import { Component, OnInit } from '@angular/core';
import { ProjetoService } from 'src/app/services/backend/projeto.service';

@Component({
  selector: 'app-atualizar-heroku',
  templateUrl: './atualizar-heroku.component.html',
  styleUrls: ['./atualizar-heroku.component.css']
})
export class AtualizarHerokuComponent implements OnInit {
  mensagem = '';

  constructor(public projetoService: ProjetoService) { }

  ngOnInit() {
  }

  atualizar() {
    console.log('agora vai');
    this.mensagem = 'Iniciando...';

    this.projetoService.listar().subscribe((data) => {
      this.mensagem = 'Buscou lista com sucesso';
      this.projetoService.criarListaProducao(data).subscribe((retorno) => {
        this.mensagem = 'sucesso';
        console.log('retorno');
        console.log(retorno);
      });
    });
  }

}
