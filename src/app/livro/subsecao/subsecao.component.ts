import { Component, OnInit } from '@angular/core';
import SubSecao from 'src/app/model/livro/subsecao';
import { Assunto } from 'src/app/model/assunto';

@Component({
  selector: 'app-subsecao',
  templateUrl: './subsecao.component.html',
  styleUrls: ['./subsecao.component.css']
})
export class SubsecaoComponent implements OnInit {

  subsecao$;
  assunto;

  constructor() { 
    this.subsecao$ = SubSecao.get("FvzaPQS8l2c9DYXoRaxO");
    this.assunto = new Assunto("123456", "bla");
  }

  ngOnInit() {
    
  }

}
