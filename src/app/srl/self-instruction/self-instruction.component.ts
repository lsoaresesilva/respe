import { Component, OnInit, Input } from '@angular/core';
import { Questao } from 'src/app/geral-module/model/questao';

@Component({
  selector: 'app-self-instruction',
  templateUrl: './self-instruction.component.html',
  styleUrls: ['./self-instruction.component.css']
})
export class SelfInstructionComponent implements OnInit {

  @Input() questao: Questao;

  constructor() { }

  ngOnInit() {
  }

}
