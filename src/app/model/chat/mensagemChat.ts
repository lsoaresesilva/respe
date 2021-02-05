import AtividadeGrupo from '../cscl/atividadeGrupo';
import { Collection, date, Document } from '../firestore/document';
import Usuario from '../usuario';
import { Util } from '../util';

@Collection("mensagensChat")
export default class MensagemChat extends Document{

    @date()
    data;

    constructor(public id, public estudante:Usuario, public texto, public atividadeGrupo:AtividadeGrupo){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if(this.estudante.pk() != null){
            document["estudanteId"] = this.estudante.pk();
        }

        if(this.atividadeGrupo.pk() != null){
            document["atividadeGrupoId"] = this.atividadeGrupo.pk();
        }
        

        return document;
    }
}