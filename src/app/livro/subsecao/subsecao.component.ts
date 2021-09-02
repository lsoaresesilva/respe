import { Component, OnInit, Input, OnChanges } from '@angular/core';
import SubSecao from 'src/app/model/livro/subsecao';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-subsecao',
  templateUrl: './subsecao.component.html',
  styleUrls: ['./subsecao.component.css']
})
export class SubsecaoComponent implements OnInit, OnChanges {
  
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    let x = 0;
  }


  @Input()
  subsecao;
  secao;
  //assunto;

  constructor(public livroService:LivroService) { 

    
    
  }

  ngOnInit() {

    this.livroService.getSecoes().subscribe((secoes)=>{
      this.secao = secoes[0];
    })

    
  }

}
