import { EMPTY, empty, forkJoin, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Collection, Document, ignore } from '../firestore/document';
import Query from '../firestore/query';
import Turma from '../turma';
import Usuario from '../usuario';
import { TipoPontuacao } from './tipoPontuacao';

@Collection("gamification")
export default class Gamification extends Document{

    pontuacao:number = 0;
    estudante:Usuario;
    questoesResolvidas:string[] = [];

    constructor(id, pontuacao, estudante:Usuario, questoesResolvidas:string[]){
        super(id);
        this.pontuacao = pontuacao;
        this.estudante = estudante;
        this.questoesResolvidas = questoesResolvidas;
    }

    objectToDocument(){
        if ( this.estudante != null || this["estudanteId"] != null){
          const document = super.objectToDocument();
          document["turmaId"] = this.estudante != null ? this.estudante.turma.pk() : this["turmaId"]; // TODO: deve incluir turma como sendo um main document e os estudantes como subdocuments.
          document["estudanteId"] = this.estudante != null ? this.estudante.pk() : this["estudanteId"];
          document["questoesResolvidas"] = this.questoesResolvidas;

          return document;
        }

        throw new Error("Um estudante precisa ser informado para armazenar Gamification.");
    }

    /* stringfiy() {
        return {
          id: this.pk(),
          pontuacao:this.pontuacao, 
          questoesResolvidas:this.questoesResolvidas
        };
    }

    static fromJson(json){
        if (json != null) {
          const gamification = new Gamification(
            json.id,
            json.pontuacao,
            null,
            json.questoesResolvidas
          );
          return gamification;
        } else {
          throw new Error('Usuário não foi logado corretamente, não há id e/ou perfil informados.');
        }
      } */

    calcularPercentualProximoLevel(){
        let pontuacaoProximoLevel = 25 * (this.level+1) * (this.level+1) - 25 * (this.level+1);
        return ((this.pontuacao/pontuacaoProximoLevel)*100).toFixed(2);
    }

    get progresso(){
      let pontuacaoProximoLevel = 25 * (this.level+1) * (this.level+1) - 25 * (this.level+1);
      return ((this.pontuacao/pontuacaoProximoLevel)*100).toFixed(2);
    }

    get level(){
        return Math.floor(Math.floor(25 + Math.sqrt(625 + 100 * this.pontuacao)) / 50)
    }

    static aumentarPontuacao(estudante, questao, tipo:TipoPontuacao){
      return new Observable(observer => {
        this.getByQuery(new Query("estudanteId", "==", estudante.pk())).subscribe((gamification:Gamification)=>{
          if(gamification != null){
            if( !gamification.isQuestaoPontuada(questao) ){
              gamification.pontuacao += tipo.getPontuacao();
              gamification.questoesResolvidas.push(questao.id);
              gamification.save().subscribe();
            }
            
          }else{
            const gamification = new Gamification(null, tipo.getPontuacao(), estudante, [questao.id]);
            gamification.save().subscribe();
          }

          observer.next(gamification);
          observer.complete();
        })
      })
      
      
      
    }

    isQuestaoPontuada(questao){
      return this.questoesResolvidas.includes(questao.id);
    }

    static getByEstudante(estudante:Usuario):Observable<Gamification>{
      return super.getByQuery(new Query("estudanteId", "==", estudante.pk())) as Observable<Gamification>;
    }

    

    static carregarRanking(turma, limite=5):Observable<any>{
      
      return new Observable<any>(observer => {
        Gamification.getAll(new Query("turmaId", "==", turma.pk())).subscribe((ranking:Gamification[]) => {
          ranking.sort(Gamification.ordernar);
          const rank:Gamification[] = ranking.slice(0, 4);
          const consultas = {};

          rank.forEach(r =>{
            consultas[r.pk()] = Usuario.get(r["estudanteId"]).pipe(
              catchError(err => of(err)),
            );;
          })

          forkJoin(consultas).subscribe(respostas=>{
            rank.forEach(r =>{
              let object = respostas[r.pk()] as any;
              if(object instanceof Usuario){
                r.estudante = respostas[r.pk()];
              }
              
            });

            observer.next(rank);
            observer.complete();
          })

          
        });
      });
    }

    private static ordernar(estudanteA:Gamification, estudanteB:Gamification){
      if( estudanteA.pontuacao < estudanteB.pontuacao ){
        return 1;
      }

      if( estudanteB.pontuacao < estudanteA.pontuacao ){
        return -1;
      }

      return 0;
    }
}