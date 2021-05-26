import { Observable } from 'rxjs';
import { Assunto } from '../assunto';
import { Collection, date, Document, ignore } from '../firestore/document';
import { QuestaoProgramacao } from '../questoes/questaoProgramacao';
import Usuario from '../usuario';
import * as firebase from 'firebase';
import { Util } from '../util';
import Turma from '../turma';
import QuestaoColaborativa from './questaoColaborativa';
import Grupo from './grupo';
import { environment } from 'src/environments/environment';
import Questao from '../questoes/questao';

@Collection('atividadeGrupo')
export default class AtividadeGrupo extends Document {
  @date()
  data;
  @ignore()
  link;

  // Guarda todos os estudantes vinculados à atividade em grupo. Isso é necessário para optimizar a pesquisa do Firestore quando queremos achar as atividades em grupo de um estudante.
  estudantes;

  constructor(
    id,
    public nome,
    public assunto: Assunto,
    public questao: QuestaoColaborativa,
    public dataExpiracao: Date,
    public turma: Turma,
    public grupos:Grupo[]
  ) {
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

    if (Array.isArray(this.estudantes)) {
      document['estudantes'] = [];
      this.estudantes.forEach((estudante) => {
        document['estudantes'].push(estudante.pk());
      });
    }

    return document;
  }

  gerarLink(estudante:Usuario) {
    
    let grupoEstudante = this.getGrupoByEstudante(estudante);
    let link =  environment.URL_SERVIDOR+'main/(principal:entrar-grupo/' +
    this.pk() +
    '/' +
    grupoEstudante.id +
    '/' +
    this["assuntoId"] +
    '/' +
    this["questaoColaborativaId"] +
    ')'
    return link
  }

  isAtivo() {
    let dataAtual = new Date();
    let isMenor = dataAtual < Util.firestoreDateToDate(this.dataExpiracao);
    return isMenor;
  }

  static criarGrupos(
    estudantes: Usuario[],
    estudantesPorGrupo = 2
  ) {
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

  static criarAtividade(dataExpiracao,
    assunto,
    questaoColaborativa: QuestaoColaborativa,
    turma: Turma,
    estudantes,
    grupos){

    let atividadeGrupo = new AtividadeGrupo(
      null,
      questaoColaborativa.questao.nomeCurto,
      assunto,
      questaoColaborativa,
      dataExpiracao,
      turma,
      grupos
    );

    atividadeGrupo.estudantes = estudantes;

    return atividadeGrupo;
  }

  static validar(dataExpiracao, grupos, questao, assunto) {
    if (
      dataExpiracao == null ||
      grupos == null ||
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
  static agruparAtividades(atividadesGrupo:AtividadeGrupo[]){
    let atividades:AtividadeGrupo[] = [];
    if(Array.isArray(atividadesGrupo)){
      atividadesGrupo.forEach(atvGrupo=>{
        let isAtividadeInserida = atividades.find(function(atividadesInserida){
          if(atividadesInserida.questao.id == atvGrupo.questao.id){
            return true;
          }
        })

        if(isAtividadeInserida == null){
          atividades.push(atvGrupo);
        }
      })
    }

    return atividades;
  }

  static get(id):Observable<AtividadeGrupo> {
    return new Observable(observer=>{
      return super.get(id).subscribe(atividadeGrupo=>{
        if(atividadeGrupo["grupos"] != null && Array.isArray(atividadeGrupo["grupos"])){
          let grupos = [];
          atividadeGrupo["grupos"].forEach(grupo=>{
            let g = Grupo.construir(grupo);
            grupos.push(g);
          })

          atividadeGrupo["grupos"] = grupos;
          let turma = new Turma(null, null, null, null);
          turma.codigo = atividadeGrupo["turmaCodigo"];
          atividadeGrupo.turma = turma;
          atividadeGrupo.assunto = new Assunto(atividadeGrupo["assuntoId"], null);
          atividadeGrupo.questao = new QuestaoColaborativa(atividadeGrupo["questaoColaborativaId"], null, null);
          atividadeGrupo.dataExpiracao = Util.firestoreDateToDate(atividadeGrupo["dataExpiracao"]);

          let estudantes = [];
          atividadeGrupo["estudantes"].forEach(estudante=>{
            let e = new Usuario(estudante, null, null, null, null, null);
            estudantes.push(e);
          })

          atividadeGrupo["estudantes"] = estudantes;
          
        }

        observer.next(atividadeGrupo);
        observer.complete();
      })
    })
    
  }


  getGrupo(grupoId){
    return this.grupos.find(function(grupo){
      if(grupo.id == grupoId){
        return true;
      }
    });
  }

  getGrupoByEstudante(estudante:Usuario){
    return this.grupos.find(function(grupo){
      if(grupo.estudantes.includes(estudante.pk())){
        return true;
      }
    });
  }
}
