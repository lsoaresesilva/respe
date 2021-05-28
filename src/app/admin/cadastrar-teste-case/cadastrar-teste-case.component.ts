import { Component, OnInit, Input } from '@angular/core';
import TestCase from 'src/app/model/testCase';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastrar-teste-case',
  templateUrl: './cadastrar-teste-case.component.html',
  styleUrls: ['./cadastrar-teste-case.component.css'],
})
export class CadastrarTesteCaseComponent implements OnInit {
  @Input('testCase')
  testeCase: TestCase;
  entrada: string;
  saida;
  selectedEntrada: String;
  selectedTest: TestCase;
  items: MenuItem[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  adicionarEntradaSaida(tipo) {
    let dado;

    if (tipo === 'entrada') {
      dado = this.entrada;
    } else {
      dado = this.saida;
    }

    if (this.testeCase.validarEntradaSaida(dado)) {
      if (tipo === 'entrada') {
        this.testeCase.entradas.push(this.entrada);
      } else {
        if(Array.isArray(this.testeCase.saida)){
          this.testeCase.saida.push(this.saida);
        }else{
          this.testeCase.saida = this.saida;
        }
        
        
      }
      this.entrada = null;
      this.saida = null;
    } else {
      this.messageEntradaVazia();
    }
  }

  isArray(dado){
    return Array.isArray(dado);
  }

  retirarEntradaSaida(dado: String, tipo) {
    let index = -1;
    let dadoTestCase;

    if (tipo === 'entrada') {
      dadoTestCase = this.testeCase.entradas;
    } else {
      dadoTestCase = this.testeCase.saida;
    }

    if(Array.isArray(dadoTestCase)){
      for (let i = 0; i < dadoTestCase.length; i++) {
        if (dadoTestCase[i] == dado) {
          index = i;
          break;
        }
      }
      dadoTestCase.splice(index, 1);
    }else{
      if (tipo === 'saida') {
        this.testeCase.saida = null;
      }
    }

   
  }

  messageCadastrado() {
    this.messageService.add({
      severity: 'success',
      summary: 'Test Case cadastrado',
      detail: 'Esse test Case foi incluído na questão',
    });
  }

  messageError() {
    this.messageService.add({
      severity: 'error',
      summary: 'teste Case inválido',
      detail: 'Esse teste Case não foi cadastrado',
    });
  }

  messageEntradaVazia() {
    this.messageService.add({
      severity: 'info',
      summary: 'Entrada negada',
      detail: 'ops... a entrada não pode estar vazia',
    });
  }
}
