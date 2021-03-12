import { Collection, date, Document } from "../firestore/document";
import Usuario from "../usuario";
import AtividadeGrupo from "./atividadeGrupo";
import Edicao from "./edicao";
import Grupo from "./grupo";

@Collection('historicoEdicoes')
export default class HistoricoEdicoes extends Document {

    edicoes:Edicao[];

    @date()
    data;

    constructor(id, public atividadeGrupo:AtividadeGrupo, public grupo:Grupo, public estudante:Usuario){
        super(id);
        this.resetar();
    }

    inserir(edicao:Edicao){
        let posicao = this.posEdicao(edicao);
        if(posicao != -1){
            this.edicoes[posicao] = edicao;
        }else{
            this.edicoes.push(edicao);
        }
    }

    posEdicao(edicao:Edicao){
        for(let i = 0; i < this.edicoes.length; i++){
            if(edicao.linha == this.edicoes[i].linha){
                return i;
            }
        }

        return -1;
    }

    resetar(){
        this.edicoes = [];
    }

    objectToDocument(){
        let objeto = super.objectToDocument();
    
        if(Array.isArray(this.edicoes)){
            objeto["edicoes"] = [];
            this.edicoes.forEach(edicao =>{
                objeto["edicoes"].push(edicao.stringfy());
            })
        }
    
        if(this.atividadeGrupo != null){
            objeto["atividadeGrupoId"] = this.atividadeGrupo.pk();
        }

        if(this.grupo != null){
            objeto["grupoId"] = this.grupo.id;
        }

        if(this.estudante.pk() != null){
            objeto["estudanteId"] = this.estudante.pk();
        }
        
    
    
        return objeto;
        
      }
}