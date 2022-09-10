import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import TestCase from 'src/app/model/aprendizagem/questoes/testCase';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastrar-teste-case',
  templateUrl: './cadastrar-teste-case.component.html',
  styleUrls: ['./cadastrar-teste-case.component.css'],
})
export class CadastrarTesteCaseComponent implements OnInit {
  @Input()
  testsCases: TestCase[];

  selectedEntrada: String;
  selectedTest: TestCase;
  items: MenuItem[];

  @ViewChild('campoSaida')
  campoSaida: ElementRef;

  @ViewChild('campoEntrada')
  campoEntrada: ElementRef;

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  adicionarEntradaSaida(dado, indice, tipo) {

    if (this.testsCases[indice].validarEntradaSaida(dado)) {
      if (tipo === 'entrada') {
        this.testsCases[indice].entradas.push(dado);
      } else {
        if(this.testsCases[indice].saida != null){
          let saidaTemp = this.testsCases[indice].saida;
          this.testsCases[indice].saida = [];
          if(Array.isArray(saidaTemp)){
            this.testsCases[indice].saida.push(...saidaTemp, dado);
          }else{
            this.testsCases[indice].saida.push(saidaTemp, dado);
          }

        } else {
          this.testsCases[indice].saida = dado;
        }


      }
      this.campoEntrada.nativeElement.value = "";
      this.campoSaida.nativeElement.value = "";
    } else {
      this.messageEntradaVazia();
    }
  }

  copiarEntradaSaida(entrada, indice){
    this.adicionarEntradaSaida(entrada, indice, 'saida');
  }

  isArray(dado){
    return Array.isArray(dado);
  }

  retirarEntradaSaida(dado: String, indice, tipo) {
    let index = -1;
    let dadoTestCase;

    if (tipo === 'entrada') {
      dadoTestCase = this.testsCases[indice].entradas;
    } else {
      dadoTestCase = this.testsCases[indice].saida;
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
        this.testsCases[indice].saida = null;
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
      summary: 'Atenção',
      detail: 'ops... este campo não pode estar vazio.',
    });
  }
}
