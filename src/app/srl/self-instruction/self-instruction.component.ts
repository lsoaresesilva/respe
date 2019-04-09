import { Component, OnInit, Input } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-self-instruction',
  templateUrl: './self-instruction.component.html',
  styleUrls: ['./self-instruction.component.css']
})
export class SelfInstructionComponent implements OnInit {

  @Input() questao: Questao;
  index: number = -1;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

}
