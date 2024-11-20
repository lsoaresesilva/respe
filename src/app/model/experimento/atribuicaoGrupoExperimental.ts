import { Collection, Document } from "../database/document";

@Collection("atribuicoesGrupoExperimental")
export default class AtribuicaoGrupoExperimental extends Document{

    constructor(public id, public codigoTurma, public grupoExperimental){
        super(id);
    }

}