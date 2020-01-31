import {Document, Collection} from '../firestore/document'
import { Observable } from 'rxjs';

@Collection("tipsAutorregulacao")
export default class TipAutorregulacao extends Document{

    constructor(id, public texto){
        super(id)
    }

    static getAleatorio(){
        return new Observable(observer=>{
            TipAutorregulacao.getAll().subscribe(tips=>{
                let tip = null;
                if(tips.length > 0){
                    let random = Math.floor(Math.random() * tips.length);
                    tip = tips[random];
                }
                
                observer.next(tip);
                observer.complete();
            })
        })
        
    }

}