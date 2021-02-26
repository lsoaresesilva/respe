import { Observable } from "rxjs";
import { Assunto } from "../assunto";
import { Collection, date, Document, ignore } from "../firestore/document";
import { QuestaoProgramacao } from "../questoes/questaoProgramacao";
import Usuario from "../usuario";
import * as firebase from 'firebase';
import { Util } from "../util";

@Collection("atividadeGrupo")
export default class AtividadeGrupo extends Document{


    @date()
    data;
    @ignore()
    assunto;
    @ignore()
    questao;

    constructor(id, public nome, public link, public dataExpiracao:Date, public estudantes:Usuario[]){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if(Array.isArray(this.estudantes)){
            document["estudantes"] = [];
            this.estudantes.forEach(estudante=>{
                document["estudantes"].push(estudante.pk())
            })
        }

        document["dataExpiracao"] = firebase.firestore.Timestamp.fromDate(this.dataExpiracao);

        return document;
    }

    salvar(){
        return new Observable(observer=>{
            super.save().subscribe(resultado=>{
                this.link = "http://localhost:4200/main/(principal:entrar-grupo/"+this.pk()+"/"+this.assunto.pk()+"/"+this.questao.id+")";
                this.save().subscribe(()=>{
                    observer.next();
                    observer.complete();
                })
            })
        });
        
    }

    isAtivo(){
        let dataAtual = new Date();
        let isMenor = dataAtual<Util.firestoreDateToDate(this.dataExpiracao)
        return isMenor;
    }

    static criarGrupos(estudantes:Usuario[], dataExpiracao, assunto, questao:QuestaoProgramacao, estudantesPorGrupo = 2){
        let grupos:AtividadeGrupo[] = [];
        let totalGrupos = Math.floor(estudantes.length/estudantesPorGrupo);

        // Gera um número aleatpório para definir em qual grupo o estudante será alocado
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        // Identifica os grupos disponíveis a partir da quantidade de estudantes que possuem
        function gruposDisponiveis():any[]{
            let gruposDisponiveis = [];
            for(let i = 0; i < grupos.length; i++){
                if(grupos[i].estudantes.length < estudantesPorGrupo){
                    gruposDisponiveis.push(i);
                }
            }

            return gruposDisponiveis;
        }

        // Modifica a posição dos estudantes no array para que os grupos sejam sempre criados de forma diferente.
        // Necessário por que o nome dos estudantes fazem com que eles sempre sejam os criadores de determinados grupos.
        // Autor: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Se número de estudantes for ímpar, então alguns grupos terão mais que 2 estudantes por grupo
        if(Array.isArray(estudantes)){
            shuffleArray(estudantes);
            estudantes.forEach(estudante=>{
                let estudanteEmGrupo = grupos.find(function(grupo, index){
                    return grupo.estudantes.find(function(e){
                        if(estudante.pk() == e.pk()){
                            return true;
                        }
                    })
                })

                if(estudanteEmGrupo == null){

                    if(grupos.length < totalGrupos){
                        let atividadeGrupo = new AtividadeGrupo(null, questao.nomeCurto, "", dataExpiracao, [estudante]);
                        atividadeGrupo.assunto = assunto;
                        atividadeGrupo.questao = questao;
                        grupos.push(atividadeGrupo);
                    }else{
                        let gruposComEspaco = gruposDisponiveis();
                        if(gruposComEspaco.length == 0){
                            let indexGrupoAleatorio = getRandomInt(0, grupos.length-1);
                            grupos[indexGrupoAleatorio].estudantes.push(estudante);
                        }else{
                            let indexGrupoLivre = gruposComEspaco[getRandomInt(0, gruposComEspaco.length-1)];
                            grupos[indexGrupoLivre].estudantes.push(estudante);
                        }
                    }
                }
            })
        }

        return grupos;
    }

}