import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-apresentacao-entradas-testcase',
  templateUrl: './apresentacao-entradas-testcase.component.html',
  styleUrls: ['./apresentacao-entradas-testcase.component.css']
})
export class ApresentacaoEntradasTestcaseComponent implements OnInit {

  @Input()
  entradas;

  constructor() { }

  ngOnInit() {
  }

}
