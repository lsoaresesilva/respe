import { Collection, Document } from "../database/document";



@Collection("configuracoesEditor")
export default class ConfiguracaoEditor extends Document{
    

    constructor(public id, public codigoTurma, public assuntosDisponiveis, public grupoExperimental){
       super(id);
    }


    
}