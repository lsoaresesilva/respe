import { Observable, forkJoin } from 'rxjs';

/**
 * Representação de um documento Firestore
 */
export class FireStoreDocument {
  id;
  data;

  /*protected constructor(id, data) {
        this.id = id;
        this.data = data
    }*/

  constructor(public document) {
    if (this.validate(document)) {
      this.create(document);
    } else {
      throw new Error('O firestore document passado como parâmetro não é válido.');
    }
  }

  create(document) {
    let id;
    let data;

    if (document.payload != undefined) {
      if (document.payload.doc == undefined) {
        data = document.payload.data();
        id = document.payload.id;
      } else {
        data = document.payload.doc.data();
        id = document.payload.doc.id;
      }
    } else {
      data = document.data();
      id = document.id;
    }

    this.id = id;
    this.data = data;
  }

  validate(document) {
    // Os códigos foram comentados, pois ao carregar um documento do Firestore, mesmo existindo, a variável exists está vindo false. Verificar o por que.
    if (document != null || document != undefined) {
      if (
        document.payload !=
          undefined /*&& document.payload.exists != undefined && document.payload.exists == true*/ &&
        (typeof document.payload.data == 'function' ||
          (document.payload.doc != undefined && typeof document.payload.doc.data == 'function'))
      ) {
        return true;
      } /*else if(typeof document.data == "function" && document._document != undefined){
                return true;
            }*/ else if (
        document.exists != undefined &&
        document.exists == true
      ) {
        return true;
      }
    }

    return false;
  }

  toObject(prototype) {
    let primitiveData = this.primitiveData();

    if (primitiveData == null) {
      throw new Error('Os dados primitivos de um document são inválidos.');
    }

    let x = Object.create(prototype);
    x.init();
    for (let key in primitiveData) {
      x[key] = primitiveData[key];
    }

    x["doc"] = this.document;

    return x;
  }

  primitiveData() {
    let properties = { id: this.id, ...this.data };

    return properties;
  }
}
