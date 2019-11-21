import { Component, OnInit, Input } from '@angular/core';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-navegador-subsecao',
  templateUrl: './navegador-subsecao.component.html',
  styleUrls: ['./navegador-subsecao.component.css']
})
export class NavegadorSubsecaoComponent implements OnInit {

  @Input()
  subsecao;
  @Input()
  subsecoes;
  //secoes$;

  constructor(public livroService:LivroService) { }

  ngOnInit() {

  //this.secoes$ = this.livroService.getSecoes();    
    
  }

}
