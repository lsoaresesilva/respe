import { Injectable } from '@angular/core';
import { Assunto } from '../model/assunto';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  constructor() { }

  listarTodos(){
    let assunto1 = new Assunto();
    assunto1.nome = "Variáveis";
    let assunto2 = new Assunto();
    assunto2.nome = "Condições";

    return [assunto1, assunto2];
  }
}
