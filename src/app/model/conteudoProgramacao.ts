import {Document, Collection} from './firestore/document'


@Collection("conteudo")
export default class Conteudo extends Document{
    nome:String;
    idAssunto;
    
    

    constructor(id, nome){
        super(id);
        this.nome=nome;
        
    }

    
}