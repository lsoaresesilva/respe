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

    constructor(document){
        if(this.validate(document)){
            this.create(document);
        }else{
            throw new Error("O firestore document passado como parâmetro não é válido.");
        }
    }

    create(document){
        if( this.validate(document) ){
            let id;
            let data;
            
            if(document.payload != undefined){
                if (document.payload.doc == undefined) {
                    data = document.payload.data();
                    id = document.payload.id;
                } else {
    
                    data = document.payload.doc.data();
                    id = document.payload.doc.id;
                }
            }else{
                data = document.data();
                id = document.id;
            }

            this.id = id;
            this.data = data;

            //return new FireStoreDocument(id, data)
        }else{
            return null;
        }
    }

    validate(document) {

        if(document != null || document != undefined){
            if (document.payload != undefined && document.payload.exists != undefined && document.payload.exists == true && (typeof document.payload.data == "function" || (document.payload.doc != undefined && typeof document.payload.doc.data == "function"))) {
                return true;
            }else if(document.exists != undefined && document.exists == true){
                return true;
            }
        }
        

        return false;
    }

    toObject(prototype){
        let primitiveData = this.primitiveData();
        
        if( primitiveData == null){
            throw new Error("Os dados primitivos de um document são inválidos.");
        }

        return Object.create(prototype, primitiveData)
    }

    primitiveData(){
        let properties = {}
        properties['id'] = {
            value: this.id,
            writable: true,
            enumerable: true
        }
        
        Reflect.ownKeys(this.data).forEach(element => {


            properties[element] = {
                value: this.data[element],
                writable: true,
                enumerable: true
            }
        });

        return properties;
    }

}