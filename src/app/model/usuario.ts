import { Document, Collection, date } from './firestore/document';
import { Observable } from 'rxjs';
import Query from './firestore/query';
import { PerfilUsuario } from './perfilUsuario';
import { sha256 } from 'js-sha256';
import TempoOnline from './tempoOnline';


@Collection("usuarios")
export default class Usuario extends Document{

    @date()
    database;
    nome;
    minutos;

    constructor(id, public email, public senha, public perfil:PerfilUsuario) {
        super(id);
            
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["senha"] = sha256(this.senha);


        return document;
    }

    stringfiy(){
        return { id: this.pk(), email:this.email, senha:this.senha, perfil: this.perfil, minutos:this.minutos}
    }

    atualizarTempo(){
        return new Observable(observer=>{
            Usuario.get(this.pk()).subscribe(usuarioLogado=>{
                this.minutos = usuarioLogado["minutos"] + this.minutos;
                this.save().subscribe(resultado=>{
                    observer.next(true);
                    observer.complete();
                }, err=>{
                    observer.error(err);
                })
            }, err=>{
                observer.error(err);
            })
        })
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

    static logar(query):Observable<Usuario>{
        return new Observable(observer=>{
            let usuario = null;
            super.getAll(query).subscribe(usuarios=>{
                if (usuarios.length > 0) {
                    usuario = new Usuario(usuarios[0].id, usuarios[0].email, usuarios[0].senha, usuarios[0].perfil );
                    usuario.minutos = 0;
                    observer.next(usuario);
                }else{
                    observer.next(null);
                    
                }
                observer.complete();
            }, err=>{
                observer.error(err);
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