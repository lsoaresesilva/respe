import { forkJoin, Observable } from "rxjs";
import { Collection, Document, date } from "../firestore/document";
import Turma from "../turma";
import Usuario from "../usuario";

@Collection("frequencias")
export default class Frequencia extends Document{

    

    estudantes = [];
    data;

    constructor(id, public turma:Turma){
        super(id);
        
    }

    
    objectToDocument(){
        let document = super.objectToDocument();

        let data = new Date();
        document["data"] = data.getDate()+"/"+data.getMonth();
        
        if(this.turma != null && this.turma.codigo != null){
            document["codigoTurma"] = this.turma.codigo;
        }else{
            throw new Error("Não é possível salvar uma frequência sem informar uma turma.")
        }

        if(Array.isArray(this.estudantes) && this.estudantes.length > 0){
            document["estudantes"] = this.estudantes;
        }

        return document;
    }

    static get(id):Observable<Frequencia> {
        return new Observable(observer=>{
            super.get(id).subscribe(frequencia=>{
                let turma = new Turma(null, null, null, null);
                turma.codigo = frequencia["codigoTurma"];
                frequencia["turma"] = turma;
                observer.next(frequencia);
                observer.complete();
            })
        })
        
    }

    getEstudantes(){
        return new Observable(observer=>{
            let consulta = [];
            this.estudantes.forEach(estudante=>{
                consulta.push(Usuario.get(estudante));
            })

            forkJoin(consulta).subscribe(estudantes=>{
                observer.next(estudantes);
                observer.complete();
            })
        });
    }

}