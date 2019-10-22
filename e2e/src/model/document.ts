import * as firebase from 'firebase';
import { Observable } from 'rxjs';

export default class DocumentFirestoreTest{

    app;
    db;

    constructor(configuracao){
        this.app = firebase.initializeApp(configuracao);
        this.db = firebase.firestore();
    }

    count(collectionName){
        return new Observable(observer=>{
            this.db.collection(collectionName).get().then((querySnapshot) => {
                let contador = 0;
                querySnapshot.forEach((doc) => {
                  contador++;
                });
                observer.next(contador);
                observer.complete();
              });
        })
        
    }

    deleteLatest(collectionName){
        return new Observable(observer=>{
            let latest = null;
            this.db.collection(collectionName).get().then((querySnapshot) => {
                let contador = 0;
                querySnapshot.forEach((doc) => {
                  if(latest == null){
                    latest = doc;
                  }else{
                    if(latest.data < doc.data){
                        latest = doc;
                    }
                  }
                });

                this.db.collection(collectionName).doc(latest.id).delete().then(()=>{
                    observer.next();
                    observer.complete();
                })
                
              });
        })
    }
}