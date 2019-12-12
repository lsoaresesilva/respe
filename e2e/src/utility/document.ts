import * as firebase from 'firebase';
import { Observable } from 'rxjs';

export default class DocumentFirestoreTest {

  app;
  db;

  constructor(configuracao) {
    this.app = firebase.initializeApp(configuracao);
    this.db = firebase.firestore();
  }

  count(collectionName) {
    return new Observable(observer => {
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

  getLatest(collectionName) {
    return new Observable(observer => {
      let latest = null;
      this.db.collection(collectionName).get().then((querySnapshot) => {
        console.log("Tá aqui")
        querySnapshot.forEach((doc) => {
          if (latest == null) {
            latest = doc;
          } else {
            if (latest.data < doc.data) {
              latest = doc;
            }
          }
        });

        

        console.log("Vai retornar")
        observer.next({...latest.data(), id:latest.id});
        observer.complete();

      });
    })
  }

  deleteLatest(collectionName) {
    return new Observable(observer=>{
      this.getLatest(collectionName).subscribe(latest=>{
        console.log("Id")
        console.log(latest["id"]);
        this.db.collection(collectionName).doc(latest["id"]).delete().then(() => {
          console.log("Deletou")
          observer.next();
          observer.complete();
        })
      })
      
    })
    
  }
}