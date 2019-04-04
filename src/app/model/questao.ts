import { Assunto } from './assunto';
import { Document, Collection } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import { Dificuldade } from "./dificuldade"
import QuestaoAssunto from './questaoAssunto';

@Collection("questoes")
export class Questao extends Document{

  nomeCurto: string;
  enunciado: string;
  dificuldade: Dificuldade;
  assuntos:Assunto[];
  assuntoPrincipal:Assunto;
  sequencia:number;

  constructor(id, nomeCurto, enunciado, dificuldade, sequencia, assuntoPrincipal, assuntos){
    super(id);
    this.nomeCurto = nomeCurto;
    this.enunciado = enunciado;
    this.dificuldade = dificuldade;
    this.sequencia = sequencia;
    this.assuntos = assuntos;
    this.assuntoPrincipal = assuntoPrincipal;
  }

  save(){
    return new Observable(observer=>{

      if(this.validar()){
        super.save().subscribe(questao=>{

          let saveQuestaoAssuntos = []

          this.assuntos.forEach(assunto=>{
            let operacaoSave = new QuestaoAssunto(null, questao.id, assunto.pk()).save();
            saveQuestaoAssuntos.push(operacaoSave);
          })

          forkJoin(saveQuestaoAssuntos).subscribe(resultados=>{
            observer.next(questao)
            observer.complete();
          }, err=>{
            observer.error(new Error("Falha ao salvar os assuntos de uma questão."));
          })

        })
      }else{
        observer.error(new Error("Objeto questão é inválido."));
      }

      
    })
    
  }

  validar(){
    if(this.assuntos == undefined || this.assuntos == null || this.assuntoPrincipal == null || this.assuntoPrincipal == undefined || 
      this.assuntos.length == 0 || this.nomeCurto == null || this.nomeCurto == "" || 
      this.enunciado == null || this.enunciado == "" || this.dificuldade == null || this.sequencia == null || this.sequencia < 1){
      return false;
    }

    return true;
  }





}