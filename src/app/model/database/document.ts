import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, forkJoin, Subject, observable } from 'rxjs';

import { AppInjector } from './app-injector';
import { FireStoreDocument } from './firestoreDocument';
import Query from './query';
import * as firebase from 'firebase';
import DocumentTest, { DocumentSalvo } from './documentTest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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

export abstract class Document {

  primary_key;

  constructor(id) {
    this.primary_key = id;
    this.init();
    /*const settings = { experimentalForceLongPolling: true };
        this.db.firestore.app.firestore().settings( settings );*/


  }

  static isModoTeste = false;
  static documentTeste:DocumentTest = new DocumentTest();
  db: AngularFirestore;
  http: HttpClient;
  doc; // Reference to the document



  static URL = environment.URL;


  static getAngularFirestore() {
    return AppInjector.get(AngularFirestore);
  }

  static getHttp() {
    return AppInjector.get(HttpClient);
  }

  static getDaysInterval = function (start, end): any[] {
    const datas = [];
    for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      datas.push(new Date(dt));
    }
    return datas;
  };

  get pk(){
    return this.primary_key;
  }

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

    Document.prerequisitos(this['__name']);


    const n = this['__name'];
    const document: any = db.doc<any>(this['__name'] + '/' + id);

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
          if (Array.isArray(resultado) && resultado.length > 0) {
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
  static get(id, lazy=true):Observable<any> {
    if (id == null || id == undefined) {
      throw new Error('ID não pode ser vazio.');
    }

    const http = this.getHttp();
    if(this['__name'] == null ) {
      throw new Error("It is necessary to set @Collection in the class to define its table name.")
    }
    const tableName = this['__name'].toLowerCase()
    const url = this.URL
    

    const apiUrl = `${url}${tableName}/${id}?${lazy == true?'lazy=true':'lazy=false'}`;
    return http.get<any>(apiUrl);
  }

  async apply(atributo:any, comando:Observable<any>){
    this[atributo] = await comando.toPromise();
  }

  static consulta(caminho):Observable<any> {
    
    const http = this.getHttp();
    if(this['__name'] == null ) {
      throw new Error("It is necessary to set @Collection in the class to define its table name.")
    }
    const tableName = this['__name'].toLowerCase()
    const url = this.URL
    

    const apiUrl = `${url}${tableName}/${caminho}`;
    return http.get<any>(apiUrl);
  }

  static search(query:Query){
    return new Observable((observer) => {
      const db = this.getAngularFirestore();
      const objetos = [];
      const collection = db.collection(this['__name'], (ref) => ref.orderBy(query.column).startAt(query.value).endAt(query.value+"\uf8ff"));



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

  static buildCollection(db, collectionName, query, orderByParam = null) {
    let collection: any = db.collection(collectionName);

    if (query != null) {
      // collection = db.collection(collectionName, ref=>ref.where(query.column, query.operator, query.value));
      if (orderByParam != null) {
        collection = db.collection(collectionName, (ref) =>
          Query.build(ref, query).orderBy(orderByParam)
        );
      } else {
        collection = db.collection(collectionName, (ref) => Query.build(ref, query));
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

  static exportGetAll(query = null, orderBy = null): Observable<any[]> {
    return new Observable(observer=>{
      const db = this.getAngularFirestore();
      const objetos = [];
      let collection = db.collection(this['__name'], (ref) => ref.orderBy("data").startAfter(new Date("2021-11-07")).endBefore(new Date("2021-12-31")));

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

    })
  }

  static getAll(query = null, orderBy = null): Observable<any[]> {
    //const db = this.getAngularFirestore();
    const objetos = [];
    Document.prerequisitos(this['__name']);
    const apiUrl = this.URL + this['__name'].toLowerCase();
    const http = this.getHttp();
    let queryString = '';
    if (query && Array.isArray(query) && query.length > 0) {
      // Mapeia cada objeto Query em um parâmetro de URL
      queryString = query
        .map((q) => `${encodeURIComponent(q.column)}=${encodeURIComponent(q.value)}`)
        .join('&');
    }

    // Adiciona a string de consulta à URL se houver parâmetros
    const fullUrl = queryString ? `${apiUrl}?${queryString}` : apiUrl;

    // Realiza a solicitação HTTP com os parâmetros
    return http.get<any[]>(fullUrl).pipe(
      map(data => !Array.isArray(data) ? [data] : data)
    ).pipe(
      map(resultados => resultados.map((resultado) => this.dataToObject(resultado)))
    );
  }

  static dataToObject(data){
    return data;
  }

  

  // TODO: incluir a opção de deletar por query
  static deleteAll() {
    const db = this.getAngularFirestore();
    Document.prerequisitos(this['__name']);

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

  static delete(id) {
    const db = this.getAngularFirestore();
    Document.prerequisitos(this['__name']);

    return new Observable((observer) => {
      const collection: AngularFirestoreCollection<any> = db.collection<any>(this['__name']);
      collection
        .doc(id)
        .delete()
        .then((resultado) => {
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
  static prerequisitos(__name) {
    if (__name == undefined || __name == null) {
      throw new Error('Não foi atribuído um nome para essa collection.');
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



  init(){
    if(this.http == null){
      this.http = AppInjector.get(HttpClient);
    }

    this.constructDateObjects();
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
            object[propriedade] = firebase.firestore.FieldValue.serverTimestamp();
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

    if (this.primary_key != undefined) {
      object['primary_key'] = this.primary_key;
    }

    return object;
  }

  save<T extends Document>(): Observable<T> {
    Document.prerequisitos(this.constructor['__name']);

    const ___this = this.objectToDocument();
    const nomeTabela = this.constructor['__name'];

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let apiUrl = `${Document.URL}${nomeTabela.toLowerCase()}/`;
    const http = Document.getHttp();
    
    if(this.primary_key != undefined){
      apiUrl = `${Document.URL}${nomeTabela.toLowerCase()}/${this.primary_key}`
      return http.put(apiUrl, ___this, { headers }).pipe(map(data=>  (this.constructor as typeof Document).dataToObject(data)));
    }

    return http.post(apiUrl, ___this, { headers }).pipe(map(data=>  (this.constructor as typeof Document).dataToObject(data)));
  }


}
