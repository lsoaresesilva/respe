import { Injectable } from '@angular/core';
import Usuario from '../model/usuario';
import { PerfilUsuario } from '../model/enums/perfilUsuario';
import { Groups } from '../model/experimento/groups';


declare var intro: any;

enum TiposApresentacao {
  inicializacao = "apresentacaoInicializacao",
  editor = "apresentacaoEditor",
  assunto = "apresentacaoAssunto"
}

@Injectable({
  providedIn: 'root'
})
export class ApresentacaoService {



  constructor() { }

  criarOpcoesIntroJS(usuario, opcoesIntro) {
    if (usuario.perfil != PerfilUsuario.admin && usuario.perfil != PerfilUsuario.professor) {


      if (intro != null) {
        intro.setOption("nextLabel", " Próximo ");
        intro.setOption("prevLabel", " Anterior ");
        intro.setOption("doneLabel", " Fechar ");
        intro.setOptions(opcoesIntro);

        intro.start();
      }


    }
  }

  apresentarEditor(usuario) {
    if (this.apresentou(usuario, TiposApresentacao.editor) == false && usuario != null) {
      this.salvarDadosApresentacao(usuario, TiposApresentacao.editor);
      let opcoesIntro = {
        steps: [
          {
            element: document.getElementById('descricaoQuestao'),
            intro: "<h3>O problema para resolver</h3><p>Aqui está a descrição sobre o problema que irá resolver.</p>"
          },
          {
            element: document.getElementById('testsCases'),
            intro: "<h3>Entradas e saídas esperadas</h3><p>O seu algoritmo receberá os valores da coluna <span style='font-weight:bold'>Entradas</span> e deverá produzir como resposta os valores da coluna <span style='font-weight:bold'>Saída esperadas</span>, considerando o problema que lhe foi passado. A coluna <span style='font-weight:bold'>Status</span> indica se o seu algoritmo produziu a resposta corretamente ou incorretamente. Por fim, na coluna <span style='font-weight:bold'>Saída algoritmo</span> é apresentada a resposta produzida pelo seu algoritmo, compare-a com a saída esperada, devem ser idênticos.</p>"
          },
          {
            element: document.getElementById('editorProgramacao'),
            intro: "<h3>Editor de programação</h3><p>Neste espaço você deve escrever o algoritmo para resolver o problema apresentado.</p>"
          },
          {
            element: document.getElementById('btnExecutar'),
            intro: "<h3>Para executar o seu algoritmo</h3><p>Ao pressionar este botão o seu algoritmo será executado e você poderá visualizar a resposta produzida por ele na tabela de casos de teste.</p>"
          },

          {
            element: document.getElementById('consoleProgramacao'),
            intro: "<h3>Console de programação</h3><p>Aqui irão aparecer mensagens de erro, caso o seu algoritmo possua algum problema.</p>"
          },

        ]
      }
      this.criarOpcoesIntroJS(usuario, opcoesIntro);
    }
  }

  apresentarInicializacao(usuario: Usuario) {
    if (this.apresentou(usuario, TiposApresentacao.inicializacao) == false && usuario != null) {
      this.salvarDadosApresentacao(usuario, TiposApresentacao.inicializacao);
      let opcoesIntro = {}
      if (usuario.grupoExperimento != Groups.control) {

        opcoesIntro = {
          steps: [
            {
              element: document.getElementById('planejamentoMenu'),
              intro: "<h3>Aqui começam os seus estudos</h3><p>Crie um planejamento para os seus estudos e comece a responder as questões de programação.</p>"
            },
            {
              element: document.getElementById('meuDesempenhoMenu'),
              intro: "<h3>Como está seu desempenho em programação?</h3><p>Aqui podes ver informações sobre o seu desempenho, principais erros que cometeu, entre outras informações.</p>"
            },

          ]
        }

      } else {
        opcoesIntro = {
          steps: [
            {
              element: document.getElementById('assuntosMenu'),
              intro: "Aqui começam os seus estudos, clique para selecionar o assunto que irá responder."
            },

          ]
        }
      }

      this.criarOpcoesIntroJS(usuario, opcoesIntro);
    }

  }

  apresentarAssunto(usuario: Usuario) {
    //if (this.apresentou(usuario, TiposApresentacao.assunto) == false && usuario != null) {
    //  this.salvarDadosApresentacao(usuario, TiposApresentacao.assunto);
      let opcoesIntro = {}


      opcoesIntro = {
        steps: [
          {
            element: document.getElementById('tabelaQuestoesProgramacao'),
            intro: "<h3>Questões de programação</h3><p>As questões de programação que você pode responder são apresentadas nesta tabela.</p>"
          },
          {
            element: document.getElementById('statusQuestoesProgramacao'),
            intro: "<h3>Status de conclusão</h3><p>Representa o % de conclusão que você alcançou para a questão.</p>"
          },
          {
            element: document.getElementById('tabelaQuestoesFechadas'),
            intro: "<h3>Questões fechadas</h3><p>São perguntas sobre o assunto que você deve assinalar a resposta correta.</p>"
          },

        ]
      }

      if(usuario.grupoExperimento != Groups.control){
        opcoesIntro["steps"].push({
          element: document.getElementById('progressoPlanejamento'),
          intro: "<h3>Seu progresso no assunto</h3><p>Quanto mais questões fechadas e exercícios de programação você resolver, maior será o seu progresso e as chances de alcançar uma boa nota na disciplina.</p>"
        })
      }

      this.criarOpcoesIntroJS(usuario, opcoesIntro);
    //}

  }


  salvarDadosApresentacao(usuario, apresentacao) {
    let usuariosQueJaReceberamApresentacao: any = [];
    let dadosApresentacao = localStorage.getItem(apresentacao);
    if (dadosApresentacao == null) {
      usuariosQueJaReceberamApresentacao = [usuario.pk()];
    } else {
      dadosApresentacao = JSON.parse(dadosApresentacao);
      usuariosQueJaReceberamApresentacao = dadosApresentacao["usuarios"];
      if (Array.isArray(usuariosQueJaReceberamApresentacao)) {
        usuariosQueJaReceberamApresentacao.push(usuario.pk());
      }
    }

    localStorage.setItem(apresentacao, JSON.stringify({ usuarios: usuariosQueJaReceberamApresentacao }));
  }

  apresentou(usuario, apresentacao): boolean {
    let dadosApresentacao = localStorage.getItem(apresentacao);
    if (dadosApresentacao != null) {
      dadosApresentacao = JSON.parse(dadosApresentacao);
      if (Array.isArray(dadosApresentacao["usuarios"]) && dadosApresentacao["usuarios"].includes(usuario.pk()))
        return true;
      return false;
    } else {
      return false;
    }
  }

}
