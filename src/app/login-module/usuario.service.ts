import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import Usuario from '../model/usuario';
import { Observable } from 'rxjs';
import { LoginNotFoundError } from '../model/errors/loginNotFound';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL = "http://localhost:8000/"

  constructor(private http: HttpClient) { 
   
  }

  salvar(usuario:Usuario){
    return new Observable(observer=>{
      this.http.post(this.URL+"usuario/", usuario.toJson()).subscribe(resposta=>{
        observer.next(resposta);
        observer.complete()
      }, err=>{
        observer.error(err);
      })
    })
    
    
  }

  


  
}
