import { Injectable } from '@angular/core';
import { Planejamento } from '../model/planejamento';
import Usuario from '../model/usuario';

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
