import { Collection, date, Document } from "../database/document";
import Usuario from "../usuario";

@Collection("duvidasEstudantes")
export default class DuvidaEstudante extends Document{

    @date()
    data

    constructor(id, public duvida, public estudante:Usuario){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if(this.estudante != null && this.estudante.pk){
            document["estudanteId"] = this.estudante;
        }

        return document;
    }



}