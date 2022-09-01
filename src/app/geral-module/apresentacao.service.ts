import { Injectable } from '@angular/core';
import Usuario from '../model/usuario';
import { PerfilUsuario } from '../model/enums/perfilUsuario';
import { Groups } from '../model/experimento/groups';

declare var intro: any;

enum TiposApresentacao {
  inicializacao = 'apresentacaoInicializacao',
  editor = 'apresentacaoEditor',
  editorRegex = 'apresentacaoEditorRegex',
  editorParson = 'apresentacaoEditorParson',
  assunto = 'apresentacaoAssunto',
  selfInstruction = 'selfInstruction',
}

@Injectable({
  providedIn: 'root',
})
export class ApresentacaoService {
  DEBUG = false;

  constructor() {}

  criarOpcoesIntroJS(usuario, opcoesIntro) {
    if (usuario.perfil != PerfilUsuario.admin && usuario.perfil != PerfilUsuario.professor) {
      if (intro != null) {
        intro.setOption('nextLabel', ' Próximo ');
        intro.setOption('prevLabel', ' Anterior ');
        intro.setOption('doneLabel', ' Fechar ');
        intro.setOptions(opcoesIntro);

        intro.start();
      }
    }
  }

  apresentarSelfInstruction(usuario, ){
    if (this.apresentou(usuario, TiposApresentacao.selfInstruction) == false && usuario != null) {
      this.salvarDadosApresentacao(usuario, TiposApresentacao.selfInstruction);
      const opcoesIntro = {
        steps: [
          {
            element: document.getElementById('enunciado'),
            intro:
              '<h3>O problema para resolver</h3><p>Aqui está a descrição sobre o problema que irá resolver. Leia atentamente para saber o que precisará fazer no seu algoritmo.</p>',
          },
          {
            element: document.getElementById('problema'),
            intro:
              "<h3>Pense no problema</h3><p>Você deve ler o enunciado acima e refletir para identificar o problema que irá realizar, em seguida escrever o que entendeu aqui. Muitos alunos ignoram essa etapa e criam algoritmos que resolvem problemas errados.</p>",
          },
          {
            element: document.getElementById('variavel'),
            intro:
              '<h3>Quais variáveis você vai precisar?</h3><p>Pense em quais e quantas variáveis serão necessárias. O que cada uma irá guardar? Escreva nessa seção.</p>',
          }
        ],
      };
      this.criarOpcoesIntroJS(usuario, opcoesIntro);
    }
  }

  apresentarEditorRegex(usuario){
    if (this.apresentou(usuario, TiposApresentacao.editorRegex) == false && usuario != null) {
      this.salvarDadosApresentacao(usuario, TiposApresentacao.editorRegex);

      const opcoesIntro = {
        steps: [
          {
            element: document.getElementById('dadosQuestao'),
            intro:
              '<h3>O problema para resolver</h3><p>Aqui está a descrição sobre o problema que você irá resolver.</p>',
          },

          {
            element: document.getElementById('editorProgramacao'),
            intro:
              '<h3>Editor de programação</h3><p>Neste espaço você deve escrever o algoritmo para resolver o problema apresentado.</p>',
          },
          {
            element: document.getElementById('btnExecutar'),
            intro:
              '<h3>Execute o seu algoritmo</h3><p>Ao pressionar este botão o seu algoritmo será executado e você receberá um feedback se está certo ou errado.</p>',
          }
        ],
      };
      this.criarOpcoesIntroJS(usuario, opcoesIntro);

    }
  }


  apresentarEditorParson(usuario){
    if (this.apresentou(usuario, TiposApresentacao.editorParson) == false && usuario != null) {
      this.salvarDadosApresentacao(usuario, TiposApresentacao.editorParson);

      const opcoesIntro = {
        steps: [
          {
            element: document.getElementById('segmentosParson'),
            intro:
              '<h3>Como resolver esta questão</h3><p>Aqui você encontra partes de um código que estão fora de ordem. Você deve clicar e arrastar uma dessas partes para o retângulo à direita.</p>',
          },

          {
            element: document.getElementById('codigoParson'),
            intro:
              '<h3>Arraste para cá</h3><p>Arraste para este espaço as partes dos códigos de forma que elas fiquem ordenadas e formem um código que resolve o problema apresentado.</p>',
          },
          {
            element: document.getElementById('enviarResposta'),
            intro:
              '<h3>Envie sua resposta</h3><p>Clique neste botão para verificar a corretude da sua resposta.</p>',
          }
        ],
      };
      this.criarOpcoesIntroJS(usuario, opcoesIntro);

    }
  }

  apresentarEditor(usuario) {
    if (this.apresentou(usuario, TiposApresentacao.editor) == false && usuario != null) {
      this.salvarDadosApresentacao(usuario, TiposApresentacao.editor);
      const opcoesIntro = {
        steps: [
          {
            element: document.getElementById('descricaoQuestao'),
            intro:
              '<h3>O problema para resolver</h3><p>Aqui está a descrição sobre o problema que irá resolver.</p>',
          },
          {
            element: document.getElementById('testsCases'),
            intro:
              "<h3>Entradas e saídas esperadas</h3><p>O seu algoritmo receberá os valores da coluna <span style='font-weight:bold'>Entradas</span> e deverá produzir como resposta os valores da coluna <span style='font-weight:bold'>Saída esperada</span>. A coluna <span style='font-weight:bold'>Status</span> indica se o seu algoritmo produziu a resposta corretamente ou incorretamente.</p>",
          },
          {
            element: document.getElementById('editorProgramacao'),
            intro:
              '<h3>Editor de programação</h3><p>Neste espaço você deve escrever o algoritmo para resolver o problema apresentado.</p>',
          },
          {
            element: document.getElementById('btnMudancaEditor'),
            intro:
              '<h3>Mudar o tipo de editor</h3><p>Você pode alternar entre o nosso editor ou se preferir um editor tradicional.<br><br>Recomendamos utilizar o nosso editor, pois ele oferece uma série de recursos que lhe ajudarão no aprendizado.</p>',
          },
          {
            element: document.getElementById('btnExecutar'),
            intro:
              '<h3>Para executar o seu algoritmo</h3><p>Ao pressionar este botão o seu algoritmo será executado e você poderá visualizar a resposta produzida por ele na tabela de casos de teste.</p>',
          },

          {
            element: document.getElementById('consoleProgramacao'),
            intro:
              '<h3>Console de programação</h3><p>Aqui irão aparecer mensagens de erro, caso o seu algoritmo possua algum problema, e também as suas saídas com print().</p>',
          },
        ],
      };
      this.criarOpcoesIntroJS(usuario, opcoesIntro);
    }
  }

  apresentarInicializacao(usuario: Usuario) {
    if (this.apresentou(usuario, TiposApresentacao.inicializacao) == false && usuario != null) {
      this.salvarDadosApresentacao(usuario, TiposApresentacao.inicializacao);
      let opcoesIntro = {};
      if (usuario.grupoExperimento != Groups.control) {
        opcoesIntro = {
          steps: [
            {
              element: document.getElementById('btnAtividades'),
              intro:
                '<h3>Aqui começam os seus estudos</h3><p>Escolha um assunto para praticar as questões de programação.</p>',
            },
            {
              element: document.getElementById('btnMeuProgresso'),
              intro:
                '<h3>Como está seu desempenho em programação?</h3><p>Aqui podes ver informações sobre o seu desempenho, principais erros que cometeu, entre outras informações.</p>',
            },
            {
              element: document.getElementById('btnDiarios'),
              intro:
                '<h3>Diários de aprendizagem</h3><p>Planejar a sua rotina de estudos é fundamental para o seu sucesso. Aqui você visualizará todos os seus planejamentos.</p>',
            },
            {
              element: document.getElementById('btnTurma'),
              intro:
                '<h3>Sua turma</h3><p>Que tal interagir com os seus colegas? Poste dúvidas ou ajude outros alunos.</p>',
            },
            {
              element: document.getElementById('btnMaterialEstudo'),
              intro:
                '<h3>Materiais de aula</h3><p>Acesse vídeo aulas com conteúdo sobre Python para melhorar o seu aprendizado.</p>',
            },
            {
              element: document.getElementById('btnRanking'),
              intro:
                '<h3>Quem consegue mais pontos?</h3><p>Acesse esta seção para visualizar sua posição no ranking. Serão apresentados os quatro alunos com melhor desempenho.</p>',
            },
          ],
        };
      } else {
        opcoesIntro = {
          steps: [
            {
              element: document.getElementById('assuntosProgramacao'),
              intro:
                'Aqui começam os seus estudos, clique para selecionar o assunto que deseja aprender.',
            },
          ],
        };
      }

      this.criarOpcoesIntroJS(usuario, opcoesIntro);
    }
  }

  apresentarAssunto(usuario: Usuario) {
    if (this.apresentou(usuario, TiposApresentacao.assunto) == false && usuario != null) {
      this.salvarDadosApresentacao(usuario, TiposApresentacao.assunto);
      let opcoesIntro = {};

      opcoesIntro = {
        steps: [
          {
            element: document.getElementById('tabelaQuestoesProgramacao'),
            intro:
              '<h3>Questões de programação</h3><p>As questões de programação que você pode responder são apresentadas nesta tabela.</p>',
          },
          {
            element: document.getElementById('statusQuestoesProgramacao'),
            intro:
              '<h3>Status de conclusão</h3><p>Representa o % de conclusão que você alcançou para a questão.</p>',
          },
          {
            element: document.getElementById('tabelaQuestoesFechadas'),
            intro:
              '<h3>Questões fechadas</h3><p>São perguntas sobre o assunto com múltipla escolha.</p>',
          },
        ],
      };

      if (usuario.grupoExperimento != Groups.control) {
        opcoesIntro['steps'].push({
          element: document.getElementById('progressoPlanejamento'),
          intro:
            '<h3>Seu progresso no assunto</h3><p>Quanto mais questões fechadas e exercícios de programação você resolver, maior será o seu progresso e as chances de alcançar uma boa nota na disciplina.</p>',
        });
      }

      this.criarOpcoesIntroJS(usuario, opcoesIntro);
    }
  }

  salvarDadosApresentacao(usuario, apresentacao) {
    let usuariosQueJaReceberamApresentacao: any = [];
    let dadosApresentacao = localStorage.getItem(apresentacao);
    if (dadosApresentacao == null) {
      usuariosQueJaReceberamApresentacao = [usuario.pk()];
    } else {
      dadosApresentacao = JSON.parse(dadosApresentacao);
      usuariosQueJaReceberamApresentacao = dadosApresentacao['usuarios'];
      if (Array.isArray(usuariosQueJaReceberamApresentacao)) {
        usuariosQueJaReceberamApresentacao.push(usuario.pk());
      }
    }

    localStorage.setItem(
      apresentacao,
      JSON.stringify({ usuarios: usuariosQueJaReceberamApresentacao })
    );
  }

  apresentou(usuario, apresentacao): boolean {
    if (this.DEBUG) {
      return true;
    } else {
      let dadosApresentacao = localStorage.getItem(apresentacao);
      if (dadosApresentacao != null) {
        dadosApresentacao = JSON.parse(dadosApresentacao);
        if (
          Array.isArray(dadosApresentacao['usuarios']) &&
          dadosApresentacao['usuarios'].includes(usuario.pk())
        ) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    }
  }
}
