import firebase from '../../utils/firebase';
import {FireStoreDocument} from './firestoreDocument';
import {Observable, forkJoin} from 'rxjs';
import Query from '../odm/query';

export default class Document{

    static db = firebase.firestore();

    constructor(id){
        this.id = id;
    }

    pk() {
        return this.id;
    }

    /**
     * Verifica se os pré-requisitos para execução de uma operação no Firestore estão sendo atendidos. Os pré-requisitos estabelecidos são: nome da collection e instância do AngularFirestore
     * @param __name nome da collection
     * @param db instância de AngularFirestore
     */
    static prerequisitos(__name, db) {

        if (__name == undefined || __name == null) {
            throw new Error("Não foi atribuído um nome para essa collection.");
        }

        if (db == undefined || db == null) {
            throw new Error("Não há uma instância de AngularFirestore.");
        }
    }

    static buildCollection(db, collectionName, query) {

        let collection = db.collection(collectionName);

        if (query != null) {
            //collection = db.collection(collectionName, ref=>ref.where(query.column, query.operator, query.value));
            collection = Query.build( collection, query);
           
            
        }

        return collection;
    }

    /**
     * Get a document from collection.
     * @param id 
     * @returns Observable containing the document; or error if document does not exists.
     */
    static get(id) {
        if (id == null || id == undefined) {
            throw new Error("ID não posse ser vazio.");
        }

        Document.prerequisitos(this["__name"], this.db);

        return new Observable(observer => {
            let n = this["__name"];
            //let document = this.db.doc(this["__name"] + "/" + id);
            let document = this.buildCollection(this.db, this["__name"], null).doc(id);
            document.get().then(result => {

                try {
                    let object = new FireStoreDocument(result).toObject(this["prototype"])
                    observer.next(object);
                    observer.complete();
                } catch (e) {
                    observer.error(new Error("Erro: "+e));
                } finally {

                }
            })
        })
    }

    static getAll(query = null) {
    
        // TODO: migrar os códigos acima para dentro do observable, em um try/catch e no catch, em caso de erro, lançar um observer.error
        return new Observable(observer => {

            //let collection: any = this.buildCollection(db, this["__name"], null);
            let collection = this.buildCollection(this.db, this["__name"], query)


            collection.get(/*{ source: "server" }*/).then(resultados => {
                let documents = []
                resultados.docs.forEach(document => {
                    documents.push(new FireStoreDocument(document).toObject(this["prototype"]));
                });
                observer.next(documents);
                observer.complete();

            }, err => {
                observer.error(err);
            })
        })
    }
}