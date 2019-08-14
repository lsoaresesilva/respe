import { Observable } from 'rxjs';
import Usuario from './usuario';
import EstudanteTurma from './estudanteTurma';

export default class Estudante{
    
    constructor(public turma, public usuario:Usuario){

        this.turma = turma;
        this.usuario = usuario;
    }

    save(){
        return new Observable(observer=>{
            this.usuario.save().subscribe(usuario=>{
                    let estudanteTurma = new EstudanteTurma(null, usuario, this.turma);
                    estudanteTurma.save().subscribe(resultado=>{
                        observer.next(resultado);
                        observer.complete();
                    }, err=>{
                        Usuario.delete(usuario.pk()).subscribe(res=>{
                            observer.error(err);
                        });
                    })
                    
                }, err=>{
                    observer.error(err);
                })
            });
    }
    
}