import {Document, Collection, date} from '../firestore/document'
import { Observable } from 'rxjs';
import Query from '../firestore/query';
import Usuario from '../usuario';

@Collection("diarios")
export default class Diario extends Document{

    @date()
    data;

    constructor(id, public texto, public usuario){
        super(id)
    }

    static possuiDiarioAtualizado(usuario:Usuario){
        return new Observable(observer=>{
            if(usuario != null){
                super.getByQuery([new Query("usuarioId", "==", usuario.pk()), new Query("data", "==", new Date())]).subscribe(diario=>{
                    if( diario != null){
                        observer.next(true);
                        
                    }else{
                        observer.next(false);
                    }
                    observer.complete();
                    
                }, err=>{
                    observer.error(err);
                })
            }
            
        });
    }


}