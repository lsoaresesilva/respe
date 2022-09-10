import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import Conceito from 'src/app/model/aprendizagem/questoes/conceito';
import { Assunto } from '../../model/aprendizagem/questoes/assunto';

@Component({
  selector: 'app-cadastrar-conceitos',
  templateUrl: './cadastrar-conceitos.component.html',
  styleUrls: ['./cadastrar-conceitos.component.css']
})
export class CadastrarConceitosComponent implements OnInit {

  assunto;
  isAlterar = false;
  assuntos: SelectItem[] = [{ label: 'Selecione um assunto', value: null }];
  nomesConceitos;

  constructor() { }

  ngOnInit(): void {
    Assunto.getAll().subscribe(assuntos=>{
      if(Array.isArray(assuntos)){
        assuntos.forEach(assunto=>{
          this.assuntos.push(
            { label: assunto.nome, value: assunto }
          );
        })
      }
    })
  }

  cadastrar(){
    if(this.assunto != null){
      this.nomesConceitos = this.nomesConceitos.split("\n");
      let conceitos = [];
      this.nomesConceitos.forEach(nomeConceito=>{
        let conceito = new Conceito(null, nomeConceito, this.assunto);
        conceitos.push(conceito);


      })

      Conceito.batchSave(conceitos).subscribe(resultado=>{
        if(Array.isArray(resultado) && resultado.length > 0){
          console.log("sucesso");
        }else{
          console.log("falha");
        }
      })
    }

  }

}
