import { Component, Input, OnInit } from '@angular/core';
import { getLabelPorCategoriaNumero } from 'src/app/model/errors/enum/labelCategoriasErro';

@Component({
  selector: 'app-console-erro',
  templateUrl: './console-erro.component.html',
  styleUrls: ['./console-erro.component.css']
})
export class ConsoleErroComponent implements OnInit {

  @Input()
  submissao;

  constructor() { }

  ngOnInit(): void {
  }

  getLabelCategoriaErro(categoria) {
    return getLabelPorCategoriaNumero(categoria);
  }

}
