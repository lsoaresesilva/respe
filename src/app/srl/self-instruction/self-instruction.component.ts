import { Component, OnInit, Input } from '@angular/core';
import { Questao } from 'src/app/model/questao';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-self-instruction',
  templateUrl: './self-instruction.component.html',
  styleUrls: ['./self-instruction.component.css']
})
export class SelfInstructionComponent implements OnInit {

  @Input() questao: Questao;

  constructor(private messageService: MessageService, private router:Router) { }

  botao(){
    this.router.navigate(["main", { outlets: { principal: ['editor'] } }])
  }

  ngOnInit() {
  }

}
