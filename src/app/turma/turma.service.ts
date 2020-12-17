import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {


  URL = "http://localhost:8000/"

  constructor(private http: HttpClient) { }

  validarCodigo(codigo){
    return new Observable(observer=>{
      this.http.get(this.URL+"turma/", {params:{codigo:codigo}}).subscribe(resposta=>{
        observer.next(true);
        observer.complete()
      }, err=>{
        if(err.status == 404){
          observer.next(false);
          observer.complete();
        }else{
          observer.error(err);
        }


          
      })
    })
    
    
  }
}
