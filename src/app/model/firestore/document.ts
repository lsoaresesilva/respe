
import { Observable, forkJoin, Subject, observable } from 'rxjs';

import { AppInjector } from './app-injector';
import { FireStoreDocument } from './firestoreDocument';
import CustomQuery from './customQuery';

import DocumentTest, { DocumentSalvo } from './documentTest';
import { doc } from 'firebase/firestore';
import { inject } from '@angular/core';
import { Firestore, collection, query, orderBy, startAt, endAt, getDocs, startAfter, endBefore, deleteDoc, setDoc, addDoc, serverTimestamp } from '@angular/fire/firestore';

export default class DocumentNotFoundError extends Error {}

export function Collection(nome) {
  return function (target) {
    target.__name = nome;
    // target["__name"] = nome;
    Object.assign(target, {
      __name: nome,
    });
  };
}

/**
 * Formato: name e type
 * @param data
 */
export function oneToOne(data) {
  function actualDecorator(target, property: string | symbol): void {
    if (target.__oneToOne == undefined) {
      Object.defineProperty(target, '__oneToOne', {
        value: [],
        writable: true,
        enumerable: true,
      });
    }

    target.__oneToOne.push({ property: property, foreignKeyName: data.name, type: data.type });
  }

  // return the decorator
  return actualDecorator;
}

export function ignore() {
  function actualDecorator(target, property: string | symbol): void {
    if (target.__ignore == undefined) {
      Object.defineProperty(target, '__ignore', {
        value: [],
        writable: true,
        enumerable: true,
      });
    }

    target.__ignore.push(property);
  }

  // return the decorator
  return actualDecorator;
}

export function date() {
  function actualDecorator(target, property: string | symbol): void {
    if (target.__ignore == undefined) {
      Object.defineProperty(target, '__date', {
        value: [],
        writable: true,
        enumerable: true,
      });
    }
    target.property = '';
    if (target.__date != null) {
      target.__date.push(property);
    }

  }

  // return the decorator
  return actualDecorator;
}

/*
export function lazy() {

    function actualDecorator(target, property: string | symbol): void {
        if (target.__ignore == undefined)
                Object.defineProperty(target, '__lazy', {
                    value: [],
                    writable: true,
                    enumerable: true
                })
            target.property = "";
            target.__lazy.push(property);

    }

    return actualDecorator;
}


 * This class is used to intercept a call to an attribute. When a property is marked as @lazy they will be retrivied from document only when needed.
 *
class ExtendableProxy {
    constructor() {
        return new Proxy(this, {
            get: function(obj, prop, receiver) {
                if( obj["__lazy"] != undefined && obj[prop] == undefined){
                    let isLazy = false;
                    obj["__lazy"].forEach(property=>{
                        if(prop == property)
                            isLazy = true;
                    })
                    let func = obj["getLazy"];
                    if(isLazy && typeof func !== "undefined"){
                        let r = null;
                        let o = null;
                        return new Observable(observer=>{
                            o = observer;
                            obj["getLazy"]().subscribe(resultado=>{
                                observer.next(resultado);
                                observer.complete();
                            }, err=>{
                                observer.error(err);
                            });
                        }).subscribe(res=>{
                            o.next(res);
                            o.complete();
                        })

                    }
                }

                return obj[prop];
            }
        });
    }
}*/

export class Document {

  constructor(public id) {
    this.init();
    /*const settings = { experimentalForceLongPolling: true };
        this.db.firestore.app.firestore().settings( settings );*/


  }

  static isModoTeste = false;
  static documentTeste:DocumentTest = new DocumentTest();
  db: Firestore;
  doc; // Reference to the document




  static getAngularFirestore() {
    return inject(Firestore);
  }

  static getDaysInterval = function (start, end): any[] {
    const datas = [];
    for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      datas.push(new Date(dt));
    }
    return datas;
  };

  static filterDocumentsByDate(documents, dateField, start, end) {
    const filteredDocuments = [];
    if (Array.isArray(documents) && documents.length > 0) {
      const dateInterval = this.getDaysInterval(end, start);

      dateInterval.forEach((data) => {
        documents.forEach((document) => {
          const date = document[dateField].toDate();

          if (date.toDateString() === data.toDateString()) {
            filteredDocuments.push(document);
          }
        });
      });
    }

    return filteredDocuments;
  }

  static onDocumentUpdate(id, callback:Subject<any>){

    const db = this.getAngularFirestore();

    Document.prerequisitos(this['__name'], db);


    const n = this['__name'];
    const document: any = doc(db, this['__name'] + '/' + id);

    document.snapshotChanges().subscribe(snapshot=>{
      let object = new FireStoreDocument(snapshot).toObject(this['prototype']);
      callback.next(object);
      //callback.complete();
    });

      /* document.get({ source: 'server' }).subscribe((result) => {
        try {
          let retrievedDocument = new FireStoreDocument(result).toObject(this['prototype']);

          observer.next(retrievedDocument);
          observer.complete();
        } catch (e) {
          observer.error(
            new Error('Document not found. Collection: ' + this['__name'] + '. ID: ' + id)
          );
        } finally {
        }
      });
    });


    this.get(id).subscribe(object=>{
      object.doc.onSnapshot(snapshot=>{
        callback.next(snapshot);
        callback.complete();
      })
    }) */
  }

  static getByQuery(query, orderBy = null):Observable<any> {
    return new Observable((observer) => {
      this.getAll(query, orderBy).subscribe(
        (resultado) => {
          if (resultado.length > 0) {
            observer.next(resultado[0]);
            observer.complete();
          } else {
            observer.next(null);
            observer.complete();
          }
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  /**
   * Get a document from collection.
   * @param id
   * @returns Observable containing the document; or error if document does not exists.
   */
  static get(id):Observable<any> {
    if (id == null || id == undefined) {
      throw new Error('ID não posse ser vazio.');
    }

    const db = this.getAngularFirestore();

    Document.prerequisitos(this['__name'], db);

    return new Observable((observer) => {
      const n = this['__name'];
      const document: any = doc(db, this['__name'] + '/' + id);

      document.get({ source: 'server' }).subscribe((result) => {
        try {
          let retrievedDocument = new FireStoreDocument(result).toObject(this['prototype']);

          observer.next(retrievedDocument);
          observer.complete();
        } catch (e) {
          observer.error(
            new Error('Document not found. Collection: ' + this['__name'] + '. ID: ' + id)
          );
        } finally {
        }
      });
    });
  }

  static search(customQuery:CustomQuery){
    return new Observable((observer) => {
      const db = this.getAngularFirestore();
      const objetos = [];
      const collectionRef = collection(db, this['__name']);

      
      // Define the query with orderBy, startAt, and endAt
      const collectionQuery = query(
        collectionRef,
        orderBy(customQuery.column),
        startAt(customQuery.value),
        endAt(customQuery.value + '\uf8ff')
      );

      // Execute the query and handle the results
      getDocs(collectionQuery)
        .then((resultados) => {
          resultados.forEach((document) => {
            objetos.push(new FireStoreDocument(document).toObject(this['prototype']));
          });
          observer.next(objetos);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }

  static buildCollection(db, collectionName, query, orderByParam = null) {
    let collection: any = db.collection(collectionName);

    if (query != null) {
      // collection = db.collection(collectionName, ref=>ref.where(query.column, query.operator, query.value));
      if (orderByParam != null) {
        collection = db.collection(collectionName, (ref) =>
          CustomQuery.build(ref, query).orderBy(orderByParam)
        );
      } else {
        collection = db.collection(collectionName, (ref) => CustomQuery.build(ref, query));
      }
    } else if (orderByParam != null) {
      collection = db.collection(collectionName, (ref) => ref.orderBy(orderByParam));
    }

    return collection;
  }

  static count() {
    return new Observable((observer) => {
      const count = 0;
      this.getAll().subscribe(
        (results) => {
          observer.next(results.length);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  static exportToJson(data_inicio=null, data_fim=null):Observable<string>{
    let json = {};
    return new Observable(observer=>{
      this.getAll().subscribe(documents=>{
        json[this['__name']] = [];

        documents.forEach(document=>{
          json[this['__name']].push(document.toJson());
        })
        observer.next(JSON.stringify(json));
        observer.complete()
      })
    })

  }

  static exportToJsonFiltroData(data_inicio=null, data_fim=null):Observable<string>{
    let json = {};
    return new Observable(observer=>{
      this.exportGetAll().subscribe(documents=>{
        json[this['__name']] = [];

        documents.forEach(document=>{
          json[this['__name']].push(document.toJson());
        })
        observer.next(JSON.stringify(json));
        observer.complete()
      })
    })

  }

  static exportGetAll(queryParam = null, orderByParam = null): Observable<any[]> {
    return new Observable((observer) => {
      const objetos: any[] = [];

      const db = this.getAngularFirestore();

      // Reference the collection
      const collectionRef = collection(db, this['__name']);

      // Define the query with orderBy, startAfter, and endBefore
      const collectionQuery = query(
        collectionRef,
        orderBy("data"),
        startAfter(new Date("2021-11-07")),
        endBefore(new Date("2021-12-31"))
      );

      // Execute the query and handle the results
      getDocs(collectionQuery)
        .then((resultados) => {
          resultados.forEach((document) => {
            objetos.push(new FireStoreDocument(document).toObject(this['prototype']));
          });
          observer.next(objetos);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }

  static getAll(query = null, orderBy = null): Observable<any[]> {
    const db = this.getAngularFirestore();
    const objetos = [];
    Document.prerequisitos(this['__name'], db);

    // TODO: migrar os códigos acima para dentro do observable, em um try/catch e no catch, em caso de erro, lançar um observer.error
    return new Observable((observer) => {
      // let collection: any = this.buildCollection(db, this["__name"], null);
      const collection = this.buildCollection(db, this['__name'], query, orderBy);

      collection.get({ source: 'server' }).subscribe(
        (resultados) => {
          const i = 0;
          resultados.docs.forEach((document) => {
            objetos.push(new FireStoreDocument(document).toObject(this['prototype']));
          });
          observer.next(objetos);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  // TODO: incluir a opção de deletar por query
  static deleteAll() {
    const db = this.getAngularFirestore();
    Document.prerequisitos(this['__name'], db);

    return new Observable((observer) => {
      let counter = 0;

      this.getAll().subscribe(
        (resultados) => {
          const documents = [];
          resultados.forEach((documento) => {
            counter++;
            documents.push(this.delete(documento.id));
          });

          if (documents.length > 0) {
            forkJoin(documents).subscribe((resultado) => {
              observer.next(resultado.length);
              observer.complete();
            });
          } else {
            observer.next(counter);
            observer.complete();
          }
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  static delete(id: string): Observable<boolean> {
    const db = this.getAngularFirestore();
    Document.prerequisitos(this['__name'], db);

    return new Observable((observer) => {
      // Create a reference to the document
      const documentRef = doc(db, `${this['__name']}/${id}`);

      // Execute delete operation
      deleteDoc(documentRef)
        .then(() => {
          observer.next(true);
          observer.complete();
        })
        .catch((err) => {
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
  static prerequisitos(__name, db) {
    if (__name == undefined || __name == null) {
      throw new Error('Não foi atribuído um nome para essa collection.');
    }

    if (db == undefined || db == null) {
      throw new Error('Não há uma instância de AngularFirestore.');
    }
  }

  static rastrearPersistencia(){
    this.isModoTeste = true;
  }

  static batchSave(objects:Document[]):Observable<any>{
    return new Observable(observable=>{
      if(Array.isArray(objects)){
        const multipleSaveRequest = [];
        objects.forEach(object=>{
          multipleSaveRequest.push(object.save());
        });

        forkJoin(multipleSaveRequest).subscribe(results=>{
          observable.next(results);
          observable.complete();
        })
      }

    })
  }

  /**
   * @date annotation does not create date properties in Documents child's class. This method create those properties (empty as they will be populated when sent to database).
   */
  constructDateObjects() {
    if (this['__date'] != undefined && this['__date'].length > 0) {
      this['__date'].forEach((dateObject) => {
        this[dateObject] = '';
      });
    }
  }



  init() {
    if (this.db == null) {
      this.db = Document.getAngularFirestore(); // Directly assign the injected Firestore instance
    }

    this.constructDateObjects();
  }

  /**
   * Retrievies the primary key of this document.
   */
  pk() {
    return this.id;
  }

  objectToDocument() {
    const object = {};

    const x = Reflect.ownKeys(this);
    Reflect.ownKeys(this).forEach((propriedade) => {
      const propriedadesIgnoradas = this['__ignore'];
      if (
        typeof this[propriedade] != 'function' &&
        typeof this[propriedade] != 'undefined' /* && typeof this[propriedade] != "object"*/
      ) {
        if (
          this['__ignore'] == undefined ||
          (this['__ignore'] != undefined && !this['__ignore'].includes(propriedade))
        ) {
          if (this['__date'] != undefined && this['__date'].includes(propriedade)) {
            object[propriedade] = serverTimestamp();
          } else {
            // aqui usar o __oneToOne
            const tipo = typeof this[propriedade];
            if (typeof this[propriedade] == 'object') {
              if (this['__oneToOne'] != undefined && this['__oneToOne'].length > 0) {
                for (let i = 0; i < this['__oneToOne'].length; i++) {
                  if (
                    this['__oneToOne'][i].property == propriedade &&
                    typeof this[propriedade].pk === 'function'
                  ) {
                    object[this['__oneToOne'][i].foreignKeyName] = this[propriedade].pk();
                    break;
                  }
                }
              }
            } else {
              object[propriedade] = this[propriedade];
            }
          }
        }
      }
    });

    if (this.id != undefined) {
      object['id'] = this.id;
    }

    return object;
  }

  /**
   * Called right before the instance is converted to Firestore document and saved in the database.
   */
  priorToSave() {

  }

  save(): Observable<any> {
    const db = Document.getAngularFirestore();
    Document.prerequisitos(this.constructor['__name'], db);

    return new Observable((observer) => {
      try {
        this.priorToSave();
        const document = this.objectToDocument();

        if (document['id'] != undefined) {
          const docRef = doc(db, `${this.constructor['__name']}/${document['id']}`);
          delete document['id']; // id cannot be in the document, as it isn't an attribute.
          setDoc(docRef, document, { merge: true }) // Use setDoc for updates
            .then(() => {
              observer.next(this);
              observer.complete();
            })
            .catch((err) => {
              observer.error(err);
            });
        } else {
          const collectionRef = collection(db, this.constructor['__name']);
          
          addDoc(collectionRef, document) // Use addDoc for new documents
            .then((result) => {
              this.id = result.id;
              if (Document.isModoTeste) {
                let documentSalvo: DocumentSalvo = {
                  nomeColecao: this.constructor['__name'],
                  id: result.id
                }
                Document.documentTeste.incluirDocument(documentSalvo);
              }

              observer.next(this);
              observer.complete();
            })
            .catch((err) => {
              observer.error(err);
            });
        }
      } catch (err) {
        observer.error(err);
      }
    });
  }


}
