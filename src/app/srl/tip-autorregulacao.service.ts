import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import TipAutorregulacao from '../model/srl/tipAutorregulacao';

@Injectable({
  providedIn: 'root'
})
export class TipAutorregulacaoService {


  URL = "http://localhost:8000/"

  constructor(private http:HttpClient) { }

  recuperar(){
    return new Observable(observer=>{
      this.http.get(this.URL+"tip_autorregulacao/").subscribe(resposta=>{
        let tip = TipAutorregulacao.fromJson(resposta);
        if(tip != null){
          observer.next(tip);
          observer.complete()
        }else{
          observer.error(new Error("O tip de regulação veio em um formato incorreto."));
        }
        
      }, err=>{
        if(err.status == 404){
          observer.next(null);
          observer.complete();
        }else{
          observer.error(err);
        }


          
      })
    })
    
    
  }
}
