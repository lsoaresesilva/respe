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

        return new Observable(observer=>{
            this.isEmailCadastrado().subscribe(resultado=>{
                if(!resultado){
                    if(this.email == null || this.email == "" || this.nome == null || this.nome == "" || this.senha == null || this.senha == "" || this.perfil == null || this.perfil <= 0){
                        observer.error(new Error("É preciso informar o e-mail, nome e senha para efetuar o cadastro.."))
                    }else{
                        observer.next(true);
                        observer.complete();
                    }
                }else{
                    observer.error(new Error("Já existe um usuário cadastrado com este e-mail."))
                }   
            })
        })
        

       
    }


    isEmailCadastrado(){
        return new Observable(observer=>{
            Usuario.getAll(new Query("email","==",this.email)).subscribe(usuarios=> { 
                if (usuarios.length==1){
                    observer.next(true);
                }else{
                    observer.next(false);
                }

                observer.complete();
            });
        })
        
    }

    

}