import { Document, Collection, date, ignore } from './firestore/document';
import { forkJoin, Observable } from 'rxjs';
import Query from './firestore/query';
import { PerfilUsuario } from './enums/perfilUsuario';

import { Groups } from './experimento/groups';
import Turma from './turma';
import Submissao from './submissao';
import { sha256 } from 'js-sha256';


export default class Usuario {

  data;
  senha;
  
  constructor(
    public primary_key,
    public email,
    public perfil: PerfilUsuario,
    public grupoExperimento: Groups,
    public nome
  ) {

    this.minutos = 0;
  }

  minutos;
  genero;
  conhecimentoPrevioProgramacao;
  faixaEtaria;

  turma: Turma;

  @ignore()
  respostasQuestoesFechadas?;
  @ignore()
  respostasQuestoesProgramacao?;
  @ignore()
  totalRespostasProgramacao?;

  get pk(){
    return this.primary_key;
  }

  static getAll(x=null):any{
    return new Observable();
  }

  static delete(x=null):any{
    return new Observable();
  }

  static getByQuery(query):Observable<Usuario> {
    return new Observable((observer) => {
      /* super.getByQuery(query).subscribe((usuario: Usuario) => {
        observer.next(usuario);
        observer.complete();
      }); */
    });
  }

  static pesquisar(query) {
    return new Observable((observer) => {
      /* super.search(query).subscribe((usuarios: Usuario) => {
        observer.next(usuarios);
        observer.complete();
      }); */
    });
  }


  static getTodasSubmissoes(estudante:Usuario){
    return Submissao.getAll(
      new Query('estudanteId', '==', estudante.pk()), "data"
    );
  }


  static fromJson(json) {
    if (json != null && json.id != undefined) {
      const usuario = new Usuario(
        json.id,
        json.email,
        json.perfil,
        json.grupoExperimento,
        json.nome
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
    /* const document = super.objectToDocument();
    document['senha'] = sha256(this.senha);

    if (this.turma != undefined && this.turma.codigo != undefined) {
      document['codigoTurma'] = this.turma.codigo;
    }

    return document; */
  }

  toJson() {
   
    let json: any = {};

    
    if (this.pk() !== null) json.id = this.pk();
    if (this.email !== null) json.email = this.email;
    if (this.senha !== null) json.senha = sha256(this.senha);
    if (this.perfil !== null) json.perfil = this.perfil;
    if (this.grupoExperimento !== null) json.grupoExperimento = this.grupoExperimento;
    if (this.nome !== null) json.nome = this.nome;

    
    return json;
}



  stringfiy() {
    const objeto = {
      id: this.pk(),
      email: this.email,
      senha: this.senha,
      perfil: this.perfil,
      minutos: this.minutos,
      nome: this.nome,
    };

    if (this.grupoExperimento != null) {
      objeto['grupoExperimento'] = this.grupoExperimento;
    }

    if (this.turma != null) {
      objeto['turma'] = this.turma.stringfiy();
    }

    return objeto;
  }

  /* toChatParticipant(){
    let participante:IChatParticipant = {id:this.id, participantType:this.participantType, status:ChatParticipantStatus.Online, avatar: null, displayName:this.nome}

    return participante;
  }*/

  static fabricar(){
    return new Usuario(null, null, null, null, null);
  }  

  salvar(perfil = PerfilUsuario.estudante, group:Groups = null, isRandom = false): Observable<Usuario> {

    return new Observable((observer) => {
      this.perfil = perfil;
      if(!isRandom){

        /* AtribuicaoGrupoExperimental.getByQuery(new Query("codigoTurma", "==", this.turma.codigo)).subscribe(atribuicao=>{
          if(atribuicao != null){
            this.grupoExperimento = atribuicao.grupoExperimental;
          }else{
            this.grupoExperimento = group;

          }
          super.save().subscribe((result)=>{
            observer.next(result);
            observer.complete();
          })
        }) */



      }else{
        /* Usuario.getAll([
          new Query('codigoTurma', '==', this.turma.codigo),
          new Query('perfil', '==', PerfilUsuario.estudante),
        ]).subscribe((usuarios) => {
          const categorias = Experiment.construirCategoriasAlunos(usuarios);
          this.grupoExperimento = Experiment.assignToGroup(
            categorias,
            this.conhecimentoPrevioProgramacao
          );

          super.save().subscribe((result) => {
            observer.next(result);
            observer.complete();
          });
        });*/
      } 



    });
  }

  static get(id):Observable<Usuario>{
    /* return super.get(id); */
    return null;
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
      /* const validacaoEmail = this.isEmailCadastrado();
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
      ); */
    });
  }

  /* isEmailCadastrado() {
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
  } */
}
