import grupo from '../grupo';
import { Collection, date, Document } from '../../firestore/document';
import Usuario from '../../usuario';
import { Util } from '../../util';
import { forkJoin, Observable } from 'rxjs';
import Query from '../../firestore/query';
import Grupo from '../grupo';
import AtividadeGrupo from '../atividadeGrupo';

@Collection("documentacoesProjeto")
export default class DocumentacaoProjeto extends Document{

    @date()
    data;

    constructor(public id, public texto, public grupo:Grupo, public atividadeGrupo:AtividadeGrupo){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if(this.estudante.pk() != null){
            document["estudanteId"] = this.estudante.pk();
        }

        if(this.grupo.id != null){
            document["grupoId"] = this.grupo.id;
        }

        if(this.atividadeGrupo.pk() != null){
            document["atividadeGrupoId"] = this.atividadeGrupo.pk();
        }
        

        return document;
    }
}