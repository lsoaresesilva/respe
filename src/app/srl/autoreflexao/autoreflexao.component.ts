import { Component, OnInit } from '@angular/core';
import { respostaAutoreflexao } from 'src/app/model/respostaAutoreflexao';
import { AutoreflexaoService } from '../autoreflexao.service';

@Component({
  selector: 'app-autoreflexao',
  templateUrl: './autoreflexao.component.html',
  styleUrls: ['./autoreflexao.component.css']
})
export class AutoreflexaoComponent implements OnInit {

  respostaUm;
  respostaDois;

  constructor(private autoreflexaoService: AutoreflexaoService) {
    this.respostaUm = new respostaAutoreflexao().respostaUm;
    this.respostaDois = new respostaAutoreflexao().respostaDois;
  }

  ngOnInit() {

  }


  salvarResposta() {
    this.autoreflexaoService.salvar(this.respostaUm)
    console.log(AutoreflexaoService.autoreflexao_srl)
  }
  
}
