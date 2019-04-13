import { Document, Collection } from './firestore/document';
import { Observable } from 'rxjs';
import Query from './firestore/query';
import { sha256 } from 'js-sha256';


@Collection("usuarios")
export default class Usuario extends Document{


    constructor(id, private login, private senha) {
        super(id);
        if(senha != null)
            this.senha = sha256(senha);
    }

    static getUsuarioLogado() {
        if( Usuario.isUsuarioLogado() ){
            let usuario = new Usuario(localStorage.getItem("usuarioId"), null, null);
            return usuario;
        }
        
        return null;
    }

    static logar(usuario: Usuario) {

        return new Observable(observer=>{
                Usuario.getAll([new Query("usuario", "==", usuario.login), new Query("senha", "==", usuario.senha)]).subscribe(resultado=>{
                    if(resultado.length > 0){
                        localStorage.setItem('usuarioId', resultado[0].id);
                        observer.next(true);
                        observer.complete();
                    }else{
                        observer.next(false);
                        observer.complete();
                    }
                });
        });
    }

    static isUsuarioLogado() {
        return localStorage.getItem("usuarioId") != undefined ? true : false;
    }



}