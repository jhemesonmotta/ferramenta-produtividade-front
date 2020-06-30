import { Component, OnInit } from '@angular/core';
import { ProjetoService } from 'src/app/services/backend/projeto.service';

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


  constructor(public projetoService: ProjetoService) { }

  ngOnInit() {
  }

}
