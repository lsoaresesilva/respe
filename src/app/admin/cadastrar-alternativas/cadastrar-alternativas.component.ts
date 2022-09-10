import { Component, OnInit, Input } from '@angular/core';
import Alternativa from '../../model/aprendizagem/questoes/alternativa';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastrar-alternativas',
  templateUrl: './cadastrar-alternativas.component.html',
  styleUrls: ['./cadastrar-alternativas.component.css']
})
export class CadastrarAlternativasComponent implements OnInit {

  @Input("alternativa")

  alternativa:Alternativa;



  constructor(private messageService: MessageService) {

  }

  ngOnInit() {

  }



}
