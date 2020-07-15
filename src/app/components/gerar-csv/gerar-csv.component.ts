import { Component, OnInit } from '@angular/core';
import { CsvDataService } from 'src/app/services/csv/csv.service';

@Component({
  selector: 'app-gerar-csv',
  templateUrl: './gerar-csv.component.html',
  styleUrls: ['./gerar-csv.component.css']
})
export class GerarCsvComponent implements OnInit {

  lista = [
    {
      make: 'Toyota',
      model: 'Celica',
      price: 35000,
      soldOn: new Date(2019, 2, 1),
      lease: false,
      address: '100 main st, Mars'
    },
    {
      make: 'Porsche',
      model: 'Boxter',
      price: 72000,
      soldOn: new Date(2018, 12, 3),
      lease: true,
      address: '100 main st, Mars'
    },
    {
      make: 'Ford',
      model: 'Mondeo',
      price: 32000,
      soldOn: new Date(2018, 7, 23),
      lease: false,
      address: '100 main st, Mars'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  gerarCsv() {
    console.log('aqui');
    CsvDataService.exportToCsv('test.csv', this.lista);
  }

}
