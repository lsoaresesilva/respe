/* eslint-disable no-unused-vars */
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
const intro = introJs();
let editorProgramacao = null;
let editorProgramacaoPadrao = null;
// TODO: usar Observable para disparar quando o editor estiver pronto. Assim o model Editor pode ter acesso à instância do mônico quando ela estiver pronta.

function iniciarEditorDocumentacaoProjeto(id) {
  const config = {
    apiKey: 'AIzaSyDQ6iOddJoIKtSQhXe-JYPNbyZFAFIIiHM',
    authDomain: 'letscode-producao.firebaseapp.com',
    databaseURL: 'https://letscode-producao.firebaseio.com',
    projectId: 'letscode-producao',
    storageBucket: 'letscode-producao.appspot.com',
    messagingSenderId: '634494761220',
    appId: '1:634494761220:web:08f409b7d6370966cf7851',
  };

  if (firebase.apps.length > 0) {
    firebase
      .app()
      .delete()
      .then(() => {
        firebase.initializeApp(config);

        const firepadRef = firebase.database().ref(`documentacoesProjeto/${id}`);

        const codeMirror = CodeMirror(document.getElementById('firepad-container'), {});

        const firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
          richTextToolbar: true,
          defaultText: '',
        });

        codeMirror.setSize('100%', '100%');
      });
  } else {
    firebase.initializeApp(config);

    const firepadRef = firebase.database().ref(`documentacoesProjeto/${id}`);

    const codeMirror = CodeMirror(document.getElementById('firepad-container'), {});

    const firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextToolbar: true,
      defaultText: '',
    });

    

    codeMirror.setSize('100%', '100%');
  }

  /* const firepadRef = firebase.database().ref(`documentacoesProjeto/${id}`);

  const codeMirror = CodeMirror(document.getElementById('firepad-container'), {});

  const firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
    richTextToolbar: true,
    defaultText: '',
  });

  codeMirror.setSize('100%', '100%'); */

  return null;
}

function iniciarEditorColaborativo(id) {
  const config = {
    apiKey: 'AIzaSyDQ6iOddJoIKtSQhXe-JYPNbyZFAFIIiHM',
    authDomain: 'letscode-producao.firebaseapp.com',
    databaseURL: 'https://letscode-producao.firebaseio.com',
    projectId: 'letscode-producao',
    storageBucket: 'letscode-producao.appspot.com',
    messagingSenderId: '634494761220',
    appId: '1:634494761220:web:08f409b7d6370966cf7851',
  };

  /* firebase.initializeApp(config); */
  if (firebase.apps.length > 0) {
    firebase
      .app()
      .delete()
      .then(() => {
        firebase.initializeApp(config);

        const firepadRef = firebase.database().ref(id);

        if (editorProgramacao != null) {
          Firepad.fromMonaco(firepadRef, editorProgramacao);
        }
      });
  } else {
    firebase.initializeApp(config);

    const firepadRef = firebase.database().ref(id);

    if (editorProgramacao != null) {
      let f = Firepad.fromMonaco(firepadRef, editorProgramacao);
      f.on('ready', function() {
        let x = y;
        let z = x;
      });

      f.on('synced', function(ev) {
        let x = y;
        let z = x;
      });
    }
  }

  return null;
}

function carregarIde(
  readOnly,
  callback = null,
  instance = null,
  callbackOnEditorLoad = null,
  codigo,
  isAtividadeGrupo = false
) {
  require(['vs/editor/editor.main'], function () {
    // var appRoot = document.createElement("app-root");
    // document.getElementById("body").appendChild(appRoot);
    const container = document.getElementById('container');
    if (container != undefined) {
      if (editorProgramacao == null) {
        editorProgramacao = monaco.editor.create(container, {
          value: prepararCodigo(codigo.value).join('\n'),
          language: 'python',
          readOnly,
        });

        if (editorProgramacao != null) {
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

function carregarIdePadrao(instance = null, callbackOnEditorLoad = null, codigo) {
  require(['vs/editor/editor.main'], function () {
    // var appRoot = document.createElement("app-root");
    // document.getElementById("body").appendChild(appRoot);
    const container = document.getElementById('containerPadrao');
    if (container != undefined) {
      if (editorProgramacaoPadrao == null) {
        editorProgramacaoPadrao = monaco.editor.create(container, {
          value: prepararCodigo(codigo).join('\n'),
          language: 'python',
        });

        /* editor.onKeyDown(function () {
          limparCores();
        }); */
      }

      callbackOnEditorLoad(instance, editorProgramacaoPadrao);

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
