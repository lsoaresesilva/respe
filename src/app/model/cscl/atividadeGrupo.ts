import { Observable } from "rxjs";
import { Assunto } from "../assunto";
import { Collection, date, Document, ignore } from "../firestore/document";
import { QuestaoProgramacao } from "../questoes/questaoProgramacao";
import Usuario from "../usuario";
import * as firebase from 'firebase';
import { Util } from "../util";
import Turma from "../turma";

@Collection("atividadeGrupo")
export default class AtividadeGrupo extends Document{


    @date()
    data;
    @ignore()
    assunto;
    @ignore()
    questao;

    /* TODO: Criar um map para as duplas */

    constructor(id, public nome, public link, public dataExpiracao:Date, public estudantes:Usuario[], public turma:Turma){
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

        if(this.turma != null){
            document["turmaCodigo"] = this.turma.codigo;
        }

        return document;
    }


    gerarLink(){
        return "http://localhost:4200/main/(principal:entrar-grupo/"+this.pk()+"/"+this.assunto.pk()+"/"+this.questao.id+")";
    }

    isAtivo(){
        let dataAtual = new Date();
        let isMenor = dataAtual<Util.firestoreDateToDate(this.dataExpiracao)
        return isMenor;
    }

    static criarGrupos(estudantes:Usuario[], dataExpiracao, assunto, questao:QuestaoProgramacao, turma:Turma, estudantesPorGrupo = 2){
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
                        let atividadeGrupo = new AtividadeGrupo(null, questao.nomeCurto, "", dataExpiracao, [estudante], turma);
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