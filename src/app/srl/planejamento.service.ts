import { Injectable } from '@angular/core';
import { Planejamento } from './model/planejamento';
import { Assunto } from '../geral-module/model/assunto';
import Usuario from '../login-module/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class PlanejamentoService {

  static planejamentos:Planejamento[];

  constructor() {

    PlanejamentoService.planejamentos = [];

   }

  salvar(planejamento:Planejamento){
    PlanejamentoService.planejamentos.push(planejamento);
    return true; 
  }

  listarTodos(usuario:Usuario){
    return PlanejamentoService.planejamentos;
  }
}
