/**
 * O editor de programação exige que o código salvo seja um array, mas no BD é salvo como string. Faz a conversão neste método
 * @param  codigo
 */
function prepararCodigo(codigo) {
  if (codigo !== undefined || codigo !== '') {
    return [codigo];
  }
  return [''];
}

/*
callbackExecucaoPython = null;

function outf(text) {
    callbackExecucaoPython(text);
}

function executarPython(cb){
    let codigo = editor.getValue();
    if(cb != null){
        callbackExecucaoPython = cb
    }

    Sk.pre = "output";
    Sk.configure({output:outf});
    var myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, codigo, true);
    });
    myPromise.then(function(mod) {
        console.log('success');
    },
        function(err) {
        console.log(err.toString());
    });

}
*/
let intro = introJs();
let editorProgramacao = null;
let decorations = null;
// TODO: usar Observable para disparar quando o editor estiver pronto. Assim o model Editor pode ter acesso à instância do mônico quando ela estiver pronta.

/* function destacarLinha(linha, status) {

  if (linha != NaN && linha != undefined) {
    linha = parseInt(linha);
    if (linha > 0 && linha <= editor.getModel().getLineCount()) {
      const lineLength = editor.getModel().getLineLength(linha);
      monaco.editor.setModelMarkers(editor.getModel(), 'lets', { source: 'ESLint', startLineNumber: linha, startColumn: 1, endColumn: lineLength, endLineNumber: linha, severity: 3, message: "blabla" });

    }
  }
}

function limparCores() {
  editor.deltaDecorations([], [
    { range: new monaco.Range(1, 1, 1, 1), options: {} },
  ]);

  decorations = null;
}

function atualizarDecorations() {
  if (decorations != null) {
    editor.deltaDecorations([], decorations);
  }
} */

function carregarIde(
  readOnly,
  callback = null,
  instance = null,
  callbackOnEditorLoad = null,
  codigo,
  isAtividadeGrupo = false
) {
  require(['vs/editor/editor.main'], function () {
    //var appRoot = document.createElement("app-root");
    //document.getElementById("body").appendChild(appRoot);
    let container = document.getElementById('container');
    if (container != undefined) {
      if (editorProgramacao == null) {
        editorProgramacao = monaco.editor.create(container, {
          value: prepararCodigo(codigo).join('\n'),
          language: 'python',
          readOnly: readOnly,
          wordBasedSuggestions:!isAtividadeGrupo
        });

        if(editorProgramacao != null){
          callback();
        }

        /* editor.onKeyDown(function () {
          limparCores();
        }); */
      }

      callbackOnEditorLoad(instance, editorProgramacao);

      

      // TODO: modificar para colocar em outra função exclusiva de comentário e só aparecer para comentários
      /* var div = document.getElementById('iconeNovoComentario');
      editorElement = document.getElementById('container');
      div.style.left = (editorElement.offsetLeft+1)+"px";

      dialogEmExibicao = false;

      var posicaoFinal = editorElement.offsetTop;
      var y = posicaoFinal+"px";
      div.style.top = y;

      editor.onMouseMove(function (e) {
          if( e != undefined){
              // posicao inicial
              if( callback != null)
                  callback(e, instance);

              if(!dialogEmExibicao){
                  var posicaoInicial = editorElement.offsetTop;
                  var posicaoFinal = 0;
                  if(e.target.position.lineNumber > 1)
                      posicaoFinal = posicaoInicial + e.target.position.lineNumber*18-18;
                  else
                      posicaoFinal = posicaoInicial + e.target.position.lineNumber;
                  //y = (e.event.posy-10)+"px";
                  y = posicaoFinal+"px";
                  console.log(y);
                  div.style.top = y;
              }


          }

      }); */
    }
  });
}
