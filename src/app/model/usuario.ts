import { Document, Collection, date } from './firestore/document';
import { Observable } from 'rxjs';
import Query from './firestore/query';
import { PerfilUsuario } from './enums/perfilUsuario';
import { sha256 } from 'js-sha256';
import Experiment from './experimento/experiment';
import { Groups } from './experimento/groups';
export default class Usuario {


    @date()
    data;
    nome;
    minutos;
    genero;
    conhecimentoPrevioProgramacao;
    faixaEtaria;
    turma;
    email;
    senha;

    constructor(public pk, public perfil: PerfilUsuario, public grupoExperimento: Groups) {


    }

    /*static getAllEstudantesByTurma(codigoTurma: any) {
        return new Observable<Usuario[]>(observer => {
            if (codigoTurma != null) {

                Usuario.getAll(new Query("codigoTurma", "==", codigoTurma)).subscribe(estudantes => {
                    if (Array.isArray(estudantes)) {
                        estudantes = estudantes.filter(estudante => {
                            return estudante.perfil == PerfilUsuario.estudante;
                        })

                        observer.next(estudantes);
                        observer.complete();
                    }
                })
            } else {
                observer.error(new Error("É preciso informar o código da turma"));
            }

        })

    }

    objectToDocument() {
        let document = super.objectToDocument();
        document["senha"] = sha256(this.senha);

        if (this.turma != undefined && this.turma.codigo != undefined)
            document["codigoTurma"] = this.turma.codigo;

        return document;
    }*/

    static get(id){
        return new Observable(observer=>{
            observer.next({})
            observer.complete();
        });
    }

    static getAll(query=null){
        return new Observable(observer=>{
            observer.next({})
            observer.complete();
        });
    }

    static getAllEstudantesByTurma(turma){
        return new Observable(observer=>{
            observer.next({})
            observer.complete();
        });
    }

    static delete(x){
        return new Observable(observer=>{
            observer.next({})
            observer.complete();
        });
    }

    toJson() {
        return { conhecimentoPrevioProgramacao: this.conhecimentoPrevioProgramacao, nome: this.nome, genero: this.genero, faixaEtaria: this.faixaEtaria, email: this.email, senha: this.senha, perfil: this.perfil, grupoExperimento: this.grupoExperimento, codigoTurma: this.turma.codigo }
    }

    static fromJson(jsonString){
        //let usuario = new Usuario();
        if(jsonString != null && typeof jsonString == "string"){
            let json = JSON.parse(jsonString);
            if(json.pk != null && json.fields != null && json.fields.perfil != null && json.fields.grupoExperimento != null){
                let usuario = new Usuario(json.pk, json.fields.perfil, json.fields.grupoExperimento);
                return usuario;
            }
            
        }   

        return null;
    }

    stringfiy() {
        return { id: this.pk, perfil: this.perfil, grupoExperimento: this.grupoExperimento }
    }



    /*atualizarTempo(){
        return new Observable(observer=>{
            Usuario.get(this.pk()).subscribe(usuarioLogado=>{
                this.minutos = usuarioLogado["minutos"] + this.minutos;
                this.save().subscribe(resultado=>{
                    observer.next(true);
                    observer.complete();
                }, err=>{
                    observer.error(err);
                })
            }, err=>{
                observer.error(err);
            })
        })
    }*/



    validarLogin() {
        if (this.email != null && this.email != "" && this.senha != null && this.senha != "") {
            return true;
        } else {
            return false;
        }
    }

    validar() {

        if (this.email == null || this.email == "" ||
            this.nome == null || this.nome == "" ||
            this.senha == null || this.senha == "" ||
            this.perfil == null || this.perfil <= 0 ||
            this.conhecimentoPrevioProgramacao == null || this.genero == null ||
            this.faixaEtaria == null) {
            return false;
        } else {
            return true;
        }
    }







}