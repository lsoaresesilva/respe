import { forkJoin, Observable } from 'rxjs';
import { Assunto } from '../aprendizagem/questoes/assunto';
import { Collection, date, Document, ignore } from '../firestore/document';
import Usuario from '../usuario';
import * as firebase from 'firebase/compat';
import { Util } from '../util';
import Turma from '../turma';
import QuestaoColaborativa from './questaoColaborativa';
import Grupo from './grupo';
import { environment } from 'src/environments/environment';
import { Groups } from '../experimento/groups';
import AutoInstrucaoColetiva from '../srl/autoInstrucaoColetivo';
import ChatGrupo from './chat/chatGrupo';
import Query from '../firestore/query';
import JustificativasAutoInstrucao from '../srl/justificativaInstrucaoColetiva';

@Collection('atividadeGrupo')
export default class AtividadeGrupo extends Document {
  @date()
  data;
  @ignore()
  link;

  // Guarda todos os estudantes vinculados à atividade em grupo. Isso é necessário para optimizar a pesquisa do Firestore quando queremos achar as atividades em grupo de um estudante.
  estudantes;
  public grupos: Grupo[];

  constructor(
    id,
    public nome,
    public assunto: Assunto,
    public questao: QuestaoColaborativa,
    public dataExpiracao: Date,
    public turma: Turma,
    public tamanhoGrupo
  ) /*  */
  {
    super(id);
  }

  objectToDocument() {
    let document = super.objectToDocument();

    document['dataExpiracao'] = firebase.firestore.Timestamp.fromDate(this.dataExpiracao);

    if (this.turma != null) {
      document['turmaCodigo'] = this.turma.codigo;
    }

    if (this.assunto != null) {
      document['assuntoId'] = this.assunto.pk();
    }

    if (this.questao != null) {
      document['questaoColaborativaId'] = this.questao.id;
    }

    if (Array.isArray(this.grupos)) {
      document['grupos'] = [];
      this.grupos.forEach((grupo) => {
        document['grupos'].push(grupo.objectToDocument());
      });
    }

    /* if (Array.isArray(this.estudantes)) {
      document['estudantes'] = [];
      this.estudantes.forEach((estudante) => {
        document['estudantes'].push(estudante.pk());
      });
    } */

    return document;
  }

  gerarLink(estudante: Usuario) {
    let grupoEstudante = this.getGrupoByEstudante(estudante);
    let link = '';
    if (estudante.grupoExperimento == Groups.experimentalB) {
      link = environment.URL_SERVIDOR + 'geral/main/(principal:srl/entrar-grupo/';
      link += this.pk() + '/' + this['assuntoId'] + '/' + this['questaoColaborativaId'] + ')';
    } else {
      link = environment.URL_SERVIDOR + 'geral/main/(principal:cscl/entrar-grupo/'+this.pk();
    }


    return link;
  }

  isAtivo() {
    let dataAtual = new Date();
    let isMenor = dataAtual < Util.firestoreDateToDate(this.dataExpiracao);
    return isMenor;
  }

  static criarGrupos(estudantes: Usuario[], estudantesPorGrupo = 2) {
    let grupos: Grupo[] = [];
    let totalGrupos = Math.floor(estudantes.length / estudantesPorGrupo);

    // Gera um número aleatpório para definir em qual grupo o estudante será alocado
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    // Identifica os grupos disponíveis a partir da quantidade de estudantes que possuem
    function gruposDisponiveis(): any[] {
      let gruposDisponiveis = [];
      for (let i = 0; i < grupos.length; i++) {
        if (grupos[i].estudantes.length < estudantesPorGrupo) {
          gruposDisponiveis.push(i);
        }
      }

      return gruposDisponiveis;
    }

    // Modifica a posição dos estudantes no array para que os grupos sejam sempre criados de forma diferente.
    // Necessário por que o nome dos estudantes fazem com que eles sempre sejam os criadores de determinados grupos.
    // Autor: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // Se número de estudantes for ímpar, então alguns grupos terão mais que 2 estudantes por grupo
    if (Array.isArray(estudantes)) {
      shuffleArray(estudantes);
      estudantes.forEach((estudante) => {
        let estudanteEmGrupo = grupos.find(function (grupo, index) {
          return grupo.estudantes.find(function (e) {
            if (estudante.pk() == e.pk()) {
              return true;
            }
          });
        });

        if (estudanteEmGrupo == null) {
          if (grupos.length < totalGrupos) {
            let grupo = new Grupo(null, [estudante]);
            grupos.push(grupo);
          } else {
            let gruposComEspaco = gruposDisponiveis();
            if (gruposComEspaco.length == 0) {
              let indexGrupoAleatorio = getRandomInt(0, grupos.length - 1);
              grupos[indexGrupoAleatorio].estudantes.push(estudante);
            } else {
              let indexGrupoLivre = gruposComEspaco[getRandomInt(0, gruposComEspaco.length - 1)];
              grupos[indexGrupoLivre].estudantes.push(estudante);
            }
          }
        }
      });
    }

    return grupos;
  }

  static criarAtividade(
    dataExpiracao,
    assunto,
    questaoColaborativa: QuestaoColaborativa,
    turma: Turma,
    tamanhoGrupo
  ) {
    let atividadeGrupo = new AtividadeGrupo(
      null,
      questaoColaborativa.questao.nomeCurto,
      assunto,
      questaoColaborativa,
      dataExpiracao,
      turma,
      tamanhoGrupo
    );

    /* atividadeGrupo.estudantes = estudantes; */

    return atividadeGrupo;
  }

  static validar(dataExpiracao, /* grupos, */ questao, assunto) {
    if (
      dataExpiracao == null ||
      /* grupos == null || */
      questao == null ||
      assunto == null
    ) {
      return false;
    }

    return true;
  }

  /**
   * Agrupa as atividades de acordo com as questões.
   * Sabemos que para uma questão várias atividades em grupo serão criadas, portanto, faz sentido agrupar todas em uma única para fins de visualização geral.
   *
   */
  static agruparAtividades(atividadesGrupo: AtividadeGrupo[]) {
    let atividades: AtividadeGrupo[] = [];
    if (Array.isArray(atividadesGrupo)) {
      atividadesGrupo.forEach((atvGrupo) => {
        let isAtividadeInserida = atividades.find(function (atividadesInserida) {
          if (atividadesInserida.questao.id == atvGrupo.questao.id) {
            return true;
          }
        });

        if (isAtividadeInserida == null) {
          atividades.push(atvGrupo);
        }
      });
    }

    return atividades;
  }

  static get(id): Observable<AtividadeGrupo> {
    return new Observable((observer) => {
      return super.get(id).subscribe((atividadeGrupo) => {
        if (atividadeGrupo['grupos'] != null && Array.isArray(atividadeGrupo['grupos'])) {
          let grupos = [];
          atividadeGrupo['grupos'].forEach((grupo) => {
            let g = Grupo.construir(grupo);
            grupos.push(g);
          });

          atividadeGrupo['grupos'] = grupos;
        }
        let turma = new Turma(null, null, null, null);
        turma.codigo = atividadeGrupo['turmaCodigo'];
        atividadeGrupo.turma = turma;
        atividadeGrupo.assunto = new Assunto(atividadeGrupo['assuntoId'], null);
        atividadeGrupo.questao = new QuestaoColaborativa(
          atividadeGrupo['questaoColaborativaId'],
          null,
          null
        );
        atividadeGrupo.dataExpiracao = Util.firestoreDateToDate(atividadeGrupo['dataExpiracao']);

        observer.next(atividadeGrupo);
        observer.complete();
      });
    });
  }

  adicionarGrupo(){
    return new Observable(observer=>{

      super.save().subscribe(resultado=>{

        // Percorrer os grupos e adicionar um por um

        let grupo = this.grupos[this.grupos.length-1];
        let consultas = [];

        /* let chatGrupo = new ChatGrupo(null, [], [], grupo, this);
        consultas.push(chatGrupo.save()); */

        if(Array.isArray(grupo.estudantes) && grupo.estudantes.length > 0){




          /* if(grupo.estudantes[0].grupoExperimento == Groups.experimentalB){
            let selfInstructionColetivo = new AutoInstrucaoColetiva(null, "", "", grupo, [], null, false);
            consultas.push(selfInstructionColetivo.save());
          } */
        }

        forkJoin(consultas).subscribe(resultados=>{
          observer.next(resultado);
          observer.complete();
        })
      });


    });
  }

  /* save(): Observable<any> {
    return new Observable(observer=>{
      super.save().subscribe((resultado)=>{
        let consultas = [];


          this.grupos.forEach(grupo=>{

            if(Array.isArray(grupo.estudantes) && grupo.estudantes.length > 0){


              let chatGrupo = new ChatGrupo(null, [], [], grupo, this);
              consultas.push(chatGrupo.save());

              if(grupo.estudantes[0].grupoExperimento == Groups.experimentalB){
                let selfInstructionColetivo = new AutoInstrucaoColetiva(null, "", "", grupo, [], null, false);
                consultas.push(selfInstructionColetivo.save());
              }
            }


          })


        forkJoin(consultas).subscribe(resultados=>{
          observer.next(resultado);
          observer.complete();
        })
      })
    });
  } */

  getGrupo(grupoId): Grupo {
    return this.grupos.find(function (grupo) {
      if (grupo.id == grupoId) {
        return true;
      }
    });
  }

  getGrupoDisponivel(){
    return this.grupos.filter((grupo)=>{
     if(grupo.estudantes.length < this.tamanhoGrupo){
      return true;
     }
    })
  }

  adicionarEstudante(estudante, grupo){
    for(let i = 0; i < this.grupos.length; i++){
      if(this.grupos[i].id == grupo.id){
        this.grupos[i].estudantes.push(estudante);
        AutoInstrucaoColetiva.getByQuery(new Query("grupoId", "==", grupo.id)).subscribe(autoInstrucao=>{
          autoInstrucao.atualizarJustificativaEstudante(
            estudante,
            new JustificativasAutoInstrucao(estudante, null, "", "")
          );

          autoInstrucao.save().subscribe(()=>{

          });
        })


      }
    }
  }

  criarGrupo(estudante):Observable<Grupo> {
    return new Observable((observer) => {
      let grupo = new Grupo(null, [estudante]);

      this.grupos.push(grupo);

      this.save().subscribe(() => {

        if(estudante.grupoExperimento == Groups.experimentalB){
          let selfInstructionColetivo = new AutoInstrucaoColetiva(null, "", "", grupo, [], null, false);
          selfInstructionColetivo.atualizarJustificativaEstudante(
            estudante,
            new JustificativasAutoInstrucao(estudante, 0, "", "")
          );
          selfInstructionColetivo.save().subscribe(()=>{



            let chatGrupo = new ChatGrupo(null, [], [], grupo, this);
            chatGrupo.save().subscribe(()=>{
              observer.next(grupo);
              observer.complete();
            });


          })
        }else{
          let chatGrupo = new ChatGrupo(null, [], [], grupo, this);
            chatGrupo.save().subscribe(()=>{
              observer.next(grupo);
              observer.complete();
            });
        }

      });
    });
  }

  getGrupoByEstudante(estudante: Usuario) {
    let grupoEstudante = null;
    this.grupos.forEach((grupo) => {
      grupo.estudantes.forEach((e) => {

        let id = null;

        if(e.pk != null){
          id = e.pk();
        }else{
          id = e;
        }

        if (id == estudante.pk()) {
          grupoEstudante = grupo;
        }

      });
    });

    return grupoEstudante;
  }
}
