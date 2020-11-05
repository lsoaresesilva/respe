import { Document, Collection, date, ignore } from './firestore/document';
import { forkJoin, Observable } from 'rxjs';
import Query from './firestore/query';
import { PerfilUsuario } from './enums/perfilUsuario';
import { sha256 } from 'js-sha256';
import Experiment from './experimento/experiment';
import { Groups } from './experimento/groups';
import EstudanteTurma from './estudanteTurma';
import Turma from './turma';
import { ConexaoRepetirError } from './errors/conexaoRepetir';
import Gamification from './gamification/gamification';

@Collection('usuarios')
export default class Usuario extends Document {
  constructor(
    id,
    public email,
    public senha,
    public perfil: PerfilUsuario,
    public grupoExperimento: Groups
  ) {
    super(id);
    this.minutos = 0;
  }

  @date()
  data;
  nome;
  minutos;
  genero;
  conhecimentoPrevioProgramacao;
  faixaEtaria;

  turma: Turma;

  @ignore()
  respostasQuestoesFechadas?;
  @ignore()
  respostasQuestoesProgramacao?;

  static getAllEstudantesByTurma(codigoTurma: any) {
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

  static getByQuery(query) {
    return new Observable((observer) => {
      super.getByQuery(query).subscribe((usuario: Usuario) => {
        observer.next(usuario);
        observer.complete();
      });
    });
  }

  static fromJson(json) {
    if (json != null && json.id != undefined) {
      const usuario = new Usuario(
        json.id,
        json.email,
        json.senha,
        json.perfil,
        json.grupoExperimento
      );
      usuario.minutos = json.minutos;

      if (json.turma != null) {
        usuario.turma = Turma.fromJson(json.turma);
      }

      /* usuario.gamification = Gamification.fromJson(json.gamification);
      usuario.gamification.estudante = usuario; */
      return usuario;
    } else {
      throw new Error('Usuário não foi logado corretamente, não há id e/ou perfil informados.');
    }
  }

  objectToDocument() {
    const document = super.objectToDocument();
    document['senha'] = sha256(this.senha);

    if (this.turma != undefined && this.turma.codigo != undefined) {
      document['codigoTurma'] = this.turma.codigo;
    }

    return document;
  }

  stringfiy() {
    const objeto = {
      id: this.pk(),
      email: this.email,
      senha: this.senha,
      perfil: this.perfil,
      minutos: this.minutos,
    };

    if (this.grupoExperimento != null) {
      objeto['grupoExperimento'] = this.grupoExperimento;
    }

    if (this['codigoTurma'] != null) {
      objeto['turma'] = new Turma(this['codigoTurma'], null, null, null).stringfiy();
    }

    return objeto;
  }

  save(perfil = PerfilUsuario.estudante): Observable<Usuario> {
    return new Observable((observer) => {
      Usuario.getAll([
        new Query('codigoTurma', '==', this.turma.codigo),
        new Query('perfil', '==', PerfilUsuario.estudante),
      ]).subscribe((usuarios) => {
        const categorias = Experiment.construirCategoriasAlunos(usuarios);
        this.grupoExperimento = Experiment.assignToGroup(
          categorias,
          this.conhecimentoPrevioProgramacao
        );
        this.perfil = perfil;
        super.save().subscribe((result) => {
          observer.next(result);
          observer.complete();
        });
      });
    });
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
    if (this.email != null && this.email != '' && this.senha != null && this.senha != '') {
      return true;
    } else {
      return false;
    }
  }

  validar() {
    return new Observable((observer) => {
      const validacaoEmail = this.isEmailCadastrado();
      const validacaoTurma = this.turma.validarCodigo();

      forkJoin([validacaoEmail, validacaoTurma]).subscribe(
        (validacoes) => {
          if (validacoes.length > 0) {
            if (validacoes[0]) {
              observer.error(new Error('Já existe um usuário cadastrado com este e-mail.'));
              return;
            }

            if (!validacoes[1]) {
              observer.error(new Error('Não existe uma turma cadastrada com este código.'));
              return;
            }

            if (
              this.email == null ||
              this.email == '' ||
              this.nome == null ||
              this.nome == '' ||
              this.senha == null ||
              this.senha == '' ||
              this.perfil == null ||
              this.perfil <= 0 ||
              this.conhecimentoPrevioProgramacao == null ||
              this.genero == null ||
              this.faixaEtaria == null
            ) {
              observer.error(
                new Error('É preciso informar todos os dados para efetuar o cadastro.')
              );
            } else {
              observer.next(true);
              observer.complete();
            }
          }
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  isEmailCadastrado() {
    return new Observable((observer) => {
      if (this.email != null) {
        Usuario.getAll(new Query('email', '==', this.email)).subscribe((usuarios) => {
          if (usuarios.length === 1) {
            observer.next(true);
          } else {
            observer.next(false);
          }

          observer.complete();
        });
      }
    });
  }
}
