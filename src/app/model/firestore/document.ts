import { throws } from 'assert';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {AppInjector} from './app-injector';
import { FireStoreDocument } from './firestoreDocument';

export function Collection(nome){
    return function(target){
        target.__name = nome;
        //target["__name"] = nome;
        Object.assign(target, {
            __name:nome
        });
    }
}

export class Document{

    db:AngularFirestore;

    constructor(protected id){
        this.db = AppInjector.get(AngularFirestore);
    }

    static documentToObject(document){
        
    }

    /**
     * Retrievies the primary key of this document.
     */
    pk(){
        return this.id;
    }

    objectToDocument(){
        let object = {}
        Reflect.ownKeys(this).forEach(propriedade => {

            if (typeof this[propriedade] != "function" && typeof this[propriedade] != "object")
                object[propriedade] = this[propriedade]
        });

        return object
    }

    static getAngularFirestore(){
        return AppInjector.get(AngularFirestore);
    }

    static get(id){
        
        if(id == null || id == undefined){
            throw new Error("ID não posse ser vazio.");
        }

        let db = this.getAngularFirestore();
        
        Document.prerequisitos(this["__name"], db);

        return new Observable(observer=>{
            let document: any = db.doc<any>(this["__name"] + "/" + id);
        
            document.get({ source: "server" }).subscribe(result => {

                try {
                    let object = new FireStoreDocument(result).toObject(this["prototype"]);
                    observer.next(object);
                    observer.complete();
                } catch (e) {
                    observer.error(e);
                } finally {

                }
            })
        })
    }

    static getAll():Observable<any[]>{
        let db = this.getAngularFirestore();
        let objetos = []
        Document.prerequisitos(this["__name"], db);

        // TODO: migrar os códigos acima para dentro do observable, em um try/catch e no catch, em caso de erro, lançar um observer.error
        return new Observable(observer=>{
            let collection: any = db.collection<any>(this["__name"]);
        
            collection.get({ source: "server" }).subscribe(resultados => {
                resultados.docs.forEach(document => {
                    objetos.push(new FireStoreDocument(document).toObject(this["prototype"]));
                });

                observer.next(objetos);
                observer.complete();
            })
        })
    }

    static deleteAll(){
        let db = this.getAngularFirestore();
        Document.prerequisitos(this["__name"], db);

        return new Observable(observer=>{
            
            let counter = 0;
            
            
            this.getAll().subscribe(resultados=>{
                let documents = []
                resultados.forEach(documento=>{
                    counter++;
                    documents.push(this.delete(documento.id))
                })

                observer.next(counter);
                observer.complete();
            })

            
            
            
        });
    }

    static delete(id){
        let db = this.getAngularFirestore();
        Document.prerequisitos(this["__name"], db);

        return new Observable(observer=>{
            
            let collection: AngularFirestoreCollection<any> = db.collection<any>(this["__name"]);
            collection.doc(id).delete().then(resultado=>{
                console.log(resultado);
                observer.next(true);
                observer.complete();
            }).catch(err=>{
                observer.next(false);
                observer.complete();
            });
            
        });
    }


    /**
     * Verifica se os pré-requisitos para execução de uma operação no Firestore estão sendo atendidos. Os pré-requisitos estabelecidos são: nome da collection e instância do AngularFirestore
     * @param __name nome da collection
     * @param db instância de AngularFirestore
     */
    static prerequisitos(__name, db){

        if(__name == undefined || __name == null){
            throw new Error("Não foi atribuído um nome para essa collection.");
        }

        if(db == undefined || db == null){
            throw new Error("Não há uma instância de AngularFirestore.");
        }
    }

    save():Observable<any>{
        Document.prerequisitos(this.constructor["__name"], this.db);

        let ___this = this;
        let collection: AngularFirestoreCollection<any> = this.db.collection<any>(this.constructor["__name"]);
        return new Observable(observer=> {
            collection.add(___this.objectToDocument()).then(result => {
                ___this.id = result.id;
                observer.next(___this);
                observer.complete();
            });
        });
    }

    

}