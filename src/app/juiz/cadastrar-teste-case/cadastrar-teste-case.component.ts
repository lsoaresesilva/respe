import { Component, OnInit, Input } from '@angular/core';
import TestCase from 'src/app/model/testCase';
import { TestesCasesService } from '../testes-cases.service';
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
        this.entrada = null;
      } else {
        this.testeCase.saida.push(this.saida);
        this.entrada = null;
      }
    } else {
      this.messageEntradaVazia();
    }
  }

  retirarEntradaSaida(dado: String, tipo) {
    let index = -1;
    let array;

    if (tipo === 'entrada') {
      array = this.testeCase.entradas;
    } else {
      array = this.testeCase.saida;
    }

    for (let i = 0; i < array.length; i++) {
      if (array[i] == dado) {
        index = i;
        break;
      }
    }
    array.splice(index, 1);
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
