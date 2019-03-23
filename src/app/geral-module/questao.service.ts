import { Injectable } from '@angular/core';
import { Assunto } from '../model/assunto';
import { Questao } from '../model/questao';
import Usuario from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class QuestaoService {

  constructor() { }

  listarTodos(assunto:Assunto){
    let q1 = new Questao();
    q1.textoCurto = "Sintaxe de variáveis";
    let a1 = new Assunto();
    a1.nome = "Variáveis";
    q1.assuntos.push(a1);
    let a2 = new Assunto();
    a2.nome = "Condições";
    q1.assuntos.push(a2);
    let q2 = new Questao();
    q2.textoCurto = "Criação de variáveis";

    return [q1, q2];
  }

  statusRealizacao(questao:Questao, usuario:Usuario){
    return "Sucesso";
  }
}
