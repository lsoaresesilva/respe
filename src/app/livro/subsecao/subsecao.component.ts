import { Component, OnInit, Input } from '@angular/core';
import SubSecao from 'src/app/model/livro/subsecao';
import { Assunto } from 'src/app/model/assunto';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-subsecao',
  templateUrl: './subsecao.component.html',
  styleUrls: ['./subsecao.component.css']
})
export class SubsecaoComponent implements OnInit {


  @Input()
  subsecao;
  secao;
  //assunto;

  constructor(public livroService:LivroService) { 

    /*Assunto.get("jW22yOF9a28N0aQlNNGR").subscribe(assunto=>{
      this.assunto = assunto;
      this.subsecao$ = SubSecao.getWithAssunto("FvzaPQS8l2c9DYXoRaxO", this.assunto);
    })*/
    
  }

  ngOnInit() {

    this.livroService.getSecoes().subscribe((secoes)=>{
      this.secao = secoes[0];
    })

    
  }

}
