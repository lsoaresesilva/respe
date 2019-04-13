import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import Usuario from '../model/usuario';
import { Observable } from 'rxjs';
import { LoginNotFoundError } from '../model/errors/loginNotFound';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private loginCollection: AngularFirestoreCollection<Usuario>;
  
  constructor(private db: AngularFirestore) { 
    this.loginCollection = this.db.collection<Usuario>("login");

  }

  


  
}
