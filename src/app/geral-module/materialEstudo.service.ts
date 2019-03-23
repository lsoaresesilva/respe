import { Injectable } from '@angular/core';
import { MaterialEstudo } from '../model/materialEstudo';
import { Assunto } from '../model/assunto';

@Injectable({
  providedIn: 'root'
})
export class MaterialEstudoService {

  constructor() { }

  listarTodos(assunto:Assunto){
    let m1 = new MaterialEstudo();
    m1.nome = "Sintaxe de variáveis";
    let m2 = new MaterialEstudo();
    m2.nome = "Criação de variáveis";

    return [m1, m2];
  }
}
