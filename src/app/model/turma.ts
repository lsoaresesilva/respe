import { Document, Collection } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import Usuario from './usuario';
import GeradorCodigo from '../util/geradorCodigo';
import Query from './firestore/query';
import { PerfilUsuario } from './enums/perfilUsuario';
import AtividadeGrupo from './cscl/atividadeGrupo';
import { Cacheable } from 'ts-cacheable';

@Collection('turmas')
export default class Turma extends Document {
  constructor(id, public nome, estudantes, public professor: Usuario) {
    super(id);
    this.estudantes = estudantes;
  }
  id;
  estudantes: Usuario[];
  codigo;

  validarCodigo() {
    return new Observable((observer) => {
      if (this.codigo === undefined) {
        observer.error(new Error('É preciso informar o código de uma turma.'));
      } else {
        Turma.getAll(new Query('codigo', '==', this.codigo)).subscribe((resultado) => {
          console.log(resultado);
          if (resultado.length > 0) {
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }
        });
      }
    });
  }

  objectToDocument() {
    const document = super.objectToDocument();
    document['professorId'] = this.professor.pk();
    return document;
  }

  save() {
    return new Observable((observer) => {
      this.codigo = GeradorCodigo.gerar();
      super.save().subscribe(
        (resultado) => {
          const consultas = [];

          if (consultas.length > 0) {
            forkJoin(consultas).subscribe((resultados) => {
              observer.next();
              observer.complete();
            });
          } else {
            observer.next();
            observer.complete();
          }
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  stringfiy() {
    return {
      id: this.pk(),
      /*  gamification:this.gamification.stringfiy() */
    };
  }

  static fromJson(json) {
    if (json != null && json.id != undefined) {
      const turma = new Turma(json.id, null, null, null);

      return turma;
    } else {
      throw new Error('Usuário não foi logado corretamente, não há id e/ou perfil informados.');
    }
  }

  // static get(id) {
  //     return new Observable(observer => {

  //         super.get(id).subscribe(turma => {
  //             if(turma["professorId"] == undefined || turma["professorId"] == "")
  //                 observer.error(new Error("Não é possível carregar Turma, pois não há um professor vinculado à ela."))

  //             Usuario.get(turma["professorId"]).subscribe(professor=>{
  //                 turma["professor"] = professor;

  //                 EstudanteTurma.getAll(new Query("turmaId", "==", turma["pk"]())).subscribe(estudantes => {
  //                     turma["estudantes"] = estudantes;
  //                     observer.next(turma);
  //                     observer.complete();
  //                 }, err => {
  //                     observer.error(err);
  //                 });
  //             }, err=>{
  //                 observer.error(err);
  //             })

  //         }, err => {
  //             observer.error(err);
  //         })
  //     });

  // }

  validar() {
    if (this.professor != undefined && this.nome != undefined && this.nome != '') {
      return true;
    }

    return false;
  }

  @Cacheable()
  static getAllEstudantes(codigoTurma: any) {
    return new Observable<Usuario[]>((observer) => {
      if (codigoTurma != null) {
        Usuario.getAll(new Query('codigoTurma', '==', codigoTurma)).subscribe((estudantes) => {
          if (Array.isArray(estudantes)) {
            estudantes = estudantes.filter((estudante) => {
              return estudante.perfil == PerfilUsuario.estudante;
            });

            observer.next(estudantes);
            observer.complete();
          }
        });
      } else {
        observer.error(new Error('É preciso informar o código da turma'));
      }
    });
  }

  getallAtividadesGrupo(){
    return new Observable<AtividadeGrupo[]>((observer) => {
    AtividadeGrupo.getAll(new Query("turmaCodigo", "==", this.codigo)).subscribe(atividades=>{
      observer.next(atividades);
      observer.complete();
    })
  });
  }

  static pesquisar(query) {
    return new Observable((observer) => {
      super.search(query).subscribe((turmas: Turma) => {
        observer.next(turmas);
        observer.complete();
      });
    });
  }

}
