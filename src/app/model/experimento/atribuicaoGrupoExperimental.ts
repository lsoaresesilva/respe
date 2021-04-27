import { Collection, Document } from "../firestore/document";

@Collection("atribuicoesGrupoExperimental")
export default class AtribuicaoGrupoExperimental extends Document{

    constructor(public id, public codigoTurma, public grupoExperimental){
        super(id);
    }

}