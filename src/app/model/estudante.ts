import { Document, Collection } from './firestore/document';
import ResultadoTestCase from './resultadoTestCase';
import Query from './firestore/query';
import { Observable } from 'rxjs';
import Usuario from './usuario';

@Collection("estudantes")
export default class Estudante extends Document{
    id;

    constructor(id, public nome, public usuario:Usuario){
        super(id);
        this.nome = nome;
        this.usuario=usuario;
    }

    objectToDocument(){
        let document = super.objectToDocument();
        document["usuarioId"] = this.usuario.pk();
        return document;
    }

    save(){
        return new Observable(observer=>{
            this.usuario.save().subscribe(usuario=>{
                super.save().subscribe(resultado=>{
                    observer.next(resultado);
                    observer.complete();
                }, err=>{
                    observer.error(err);
                })
            }, err=>{
                observer.error(err);
            })
        })
    }

    static get(id){
        return new Observable(observer=>{
            super.get(id).subscribe(estudante=>{
                if(estudante["usuarioId"] == undefined)
                    observer.error(new Error("Estudante precisa ter um usuário."));

                Usuario.get(estudante["usuarioId"]).subscribe(usuario=>{
                    estudante["usuario"] = usuario;
                    observer.next(estudante);
                    observer.complete();
                },err=>{
                    observer.error(err);
                })
            },err=>{
                observer.error(err);
            })
        })
    }

    validar(){
        if( this.nome != undefined && this.nome != "" && this.usuario != undefined){
            return true;
        }

        return false;
    }
    
}