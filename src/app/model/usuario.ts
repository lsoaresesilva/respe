import { Document, Collection, date } from './firestore/document';
import { Observable } from 'rxjs';
import Query from './firestore/query';
import { PerfilUsuario } from './perfilUsuario';
import { sha256 } from 'js-sha256';


@Collection("usuarios")
export default class Usuario extends Document{

    @date()
    database;
    nome;

    constructor(id, public email, public senha, public perfil:PerfilUsuario) {
        super(id);
            
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["senha"] = sha256(this.senha);
        return document;
    }

    validar(){
        if(this.email == null || this.email == "" || this.senha == null || this.senha == "" || this.perfil == null || this.perfil <= 0){
            return false;
        }

        return true;
    }

    

}