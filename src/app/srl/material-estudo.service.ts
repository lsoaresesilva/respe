import { Injectable } from '@angular/core';
import { MaterialEstudo } from '../model/materialEstudo';
import { Assunto } from '../model/assunto';

@Injectable({
  providedIn: 'root'
})
export class MaterialEstudoService {
  materiaisDeEstudo: MaterialEstudo[] = [];

  constructor() {
    //Enquanto não existem nenhum material cadastrado
    this.iniciaOArray();
  }

  listarTodos(assunto: Assunto){
    let materiaisDoAssunto = [];
    for(let i = 0; i < this.materiaisDeEstudo.length; i++){
      materiaisDoAssunto.push(this.materiaisDeEstudo[i]);
      /*if(this.materiaisDeEstudo[i].assunto.getId() == assunto.getId()){
        materiaisDoAssunto.push(this.materiaisDeEstudo[i]);
      }*/
    }
    
    return materiaisDoAssunto;
  }
  
  iniciaOArray(){
    let m1 = new MaterialEstudo();
    m1.assunto = new Assunto("iN4G7FJV51uJEsu9Mrsj", null);
    m1.nome = "Video";
    
    let m2 = new MaterialEstudo();
    m2.assunto = new Assunto("iN4G7FJV51uJEsu9Mrsj", null);
    m2.nome = "Texto";
    let m3 = new MaterialEstudo();
    m3.assunto = new Assunto("i3lixuzD3EWsGEFm7gmR", null);
    m3.nome = "Video";
    this.materiaisDeEstudo.push(m1);
    this.materiaisDeEstudo.push(m2);
    this.materiaisDeEstudo.push(m3);
  }
}
