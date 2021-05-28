import { Collection, Document } from "../firestore/document";



@Collection("configuracoesEditor")
export default class ConfiguracaoEditor extends Document{
    

    constructor(public id, public codigoTurma, public assuntosDisponiveis, public grupoExperimental){
       super(id);
    }


    
}