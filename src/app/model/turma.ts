import { Document, Collection } from './firestore/document';
import Estudante from './estudante';
import { Observable, forkJoin } from 'rxjs';
import EstudanteTurma from './estudanteTurma';
import Query from './firestore/query';
import Usuario from './usuario';

@Collection("turmas")
export default class Turma extends Document {
    id;
    estudantes: Estudante[];

    constructor(id, public nome, estudantes, public professor: Usuario) {
        super(id);
        this.estudantes = estudantes;
    }

    objectToDocument() {
        let document = super.objectToDocument();
        document["professorId"] = this.professor.pk();
        return document;
    }

    save() {
        return new Observable(observer => {
            super.save().subscribe(resultado => {
                let consultas = [];
                this.estudantes.forEach(estudante => {
                    consultas.push(new EstudanteTurma(null, estudante, this).save());
                })

                if (consultas.length > 0) {
                    forkJoin(consultas).subscribe(resultados => {
                        observer.next();
                        observer.complete();
                    })
                } else {
                    observer.next();
                    observer.complete();
                }
            }, err => {
                observer.error(err);
            })
        })
    }


    static get(id) {
        return new Observable(observer => {

            super.get(id).subscribe(turma => {
                if(turma["professorId"] == undefined || turma["professorId"] == "")
                    observer.error(new Error("Não é possível carregar Turma, pois não há um professor vinculado à ela."))

                Usuario.get(turma["professorId"]).subscribe(professor=>{
                    turma["professor"] = professor;
                    
                    EstudanteTurma.getAll(new Query("turmaId", "==", turma["pk"]())).subscribe(estudantes => {
                        turma["estudantes"] = estudantes;
                        observer.next(turma);
                        observer.complete();
                    }, err => {
                        observer.error(err);
                    });
                }, err=>{
                    observer.error(err);
                })
                
            }, err => {
                observer.error(err);
            })
        });

    }

    validar() {
        if (this.estudantes != undefined && this.estudantes.length > 0 && this.professor != undefined && this.nome != undefined && this.nome != "")
            return true;

        return false
    }

}