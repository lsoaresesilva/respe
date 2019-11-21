import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Secao from '../model/livro/secao';
import SubSecao from '../model/livro/subsecao';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  state;

  constructor() {
    this.state = {};
    this.state["secoes"] = []
  }

  getSecoes() {

    return new Observable(observer => {
      if (this.state["secoes"].length == 0) {
        Secao.getAll().subscribe(secoes => {
          this.state["secoes"] = secoes;
          observer.next(this.state["secoes"]);
          observer.complete();
        })
      }else{
        observer.next(this.state["secoes"]);
        observer.complete();
      }
    })

  }

  getSecao(secao: Secao) {
    return new Observable(observer => {
      if (this.state["secoes"].length != 0) {
        let secaoEncontrada = null;
        for (let i = 0; i < this.state["secoes"].length; i++) {
          if (secao.pk() == this.state["secoes"][i].pk()) {
            secaoEncontrada = this.state["secoes"][i];   
            break;
          }
        }

        observer.next(secaoEncontrada);
        observer.complete();
      }else{
        observer.error(new Error("Primeiro é preciso carregar as seções com getSecoes()."));
        // TODO: avisar que as seções não foram carregadas
      }
    })
  }

  getAnterior(listaElementos, elementoAtual){
    return new Observable(observer => {


      if (Array.isArray(listaElementos) && listaElementos.length != 0) {
        let secaoEncontrada = null;
        for (let i = 0; i < listaElementos.length; i++) {
          if (elementoAtual.sequencia > listaElementos[i].sequencia) {
            if(secaoEncontrada == null){
              secaoEncontrada = listaElementos[i];  
            }else{
              if(listaElementos[i].sequencia >= secaoEncontrada.sequencia)
                secaoEncontrada = listaElementos[i];  
            }
          }
        }

        observer.next(secaoEncontrada);
        observer.complete();
      }else{
        observer.error(new Error("Primeiro é preciso carregar as seções com getSecoes()."));
        // TODO: avisar que as seções não foram carregadas
      }
    })
  }

  getProxima(listaElementos, elementoAtual){
    return new Observable(observer => {
      if (listaElementos.length != 0) {
        let secaoEncontrada = null;
        for (let i = 0; i < listaElementos.length; i++) {
          if (elementoAtual.sequencia < listaElementos[i].sequencia) {
            if(secaoEncontrada == null){
              secaoEncontrada = listaElementos[i];  
            }else{
              if(listaElementos[i].sequencia <= secaoEncontrada.sequencia)
                secaoEncontrada = listaElementos[i];  
            }
          }
        }

        observer.next(secaoEncontrada);
        observer.complete();
      }else{
        observer.error(new Error("Primeiro é preciso carregar as seções com getSecoes()."));
        // TODO: avisar que as seções não foram carregadas
      }
    })
  }

  /*getSubsecoes(secao:Secao){
    let posicaoSecao = this.hasSecao(secao);
    if(this.state["secoes"].length == 0 && posicaoSecao != -1){
     SubSecao.get(secao.pk()).subscribe(subsecoes=>{
       this.state["secoes"][posicaoSecao]
     })
    }
  }*/

}
