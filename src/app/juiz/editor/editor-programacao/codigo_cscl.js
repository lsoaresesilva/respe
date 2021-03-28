editorProgramacaoComponentInstance.chat.observerCodigo.subscribe((doc) => {
    editorProgramacaoComponentInstance.isConectado = true;
    editorProgramacaoComponentInstance.document = doc;
    let novoAlgoritmo = Algoritmo.criar(doc.data.algoritmo);
    let algoritmoAntigo = editor.getValue();
    if (novoAlgoritmo !== algoritmoAntigo) {
      editor.setValue(novoAlgoritmo);
      editor.setPosition(editorProgramacaoComponentInstance.posicaoCursor);
      if (doc.data.autor != editorProgramacaoComponentInstance.usuario.id) {
        editor.deltaDecorations(
          [],
          [
            /* Column+1 por que ao digitar o texto no editor, o usuário que digitou avança o cursor para após o dígito. */
            {
              range: new monaco.Range(
                doc.data.cursor.lineNumber,
                doc.data.cursor.column + 1,
                doc.data.cursor.lineNumber,
                doc.data.cursor.column + 1
              ),
              options: { className: 'my-cursor' },
            },
          ]
        );

        editor.render(true);
      }
    }
  });

  editorProgramacaoComponentInstance.sincronizarEditor(
    editorProgramacaoComponentInstance.editor
  );

/**
   * Faz o controle para que os estudantes tenham o seu código sincronizado.
   */
  sincronizarEditor(editor) {
    let _this = this;
    let textoAntes = '';
    let textoLinhaAnterior = '';
    let cursorAntes: any = {};
    let historicoEdicoes = new HistoricoEdicoes(
      null,
      this.atividadeGrupo,
      this.grupo,
      this.usuario
    );
    let selection = null;
    let ultimaColunaLinha = null;
    let modeloAntesEdicao = null;
    this.salvamentoEdicoes = setInterval(() => {
      // TODO: passar uma referência do objeto atividade grupo de responder questão para editor e usar aqui
      if (this.atividadeGrupo.pk() != null) {
        if (historicoEdicoes.edicoes.length > 0) {
          historicoEdicoes.save().subscribe(() => {
            historicoEdicoes.resetar();
          });
        }
      }
    }, 120000);

    editor.onKeyDown(function (e) {
      cursorAntes = editor.getPosition();
      let texto = editor.getModel().getLineContent(editor.getPosition().lineNumber);
      modeloAntesEdicao = editor.getModel();
      textoAntes = texto;
      if(cursorAntes.lineNumber > 1){
        textoLinhaAnterior = editor.getModel().getLineContent(editor.getPosition().lineNumber - 1);
      }
      
      selection = editor.getSelection();
      ultimaColunaLinha = editor.getModel().getLineMaxColumn(editor.getPosition().lineNumber);
    });

    editor.onKeyUp(function (e) {
      _this.posicaoCursor = editor.getPosition();
      let op = null;
      let linhaAtual = editor.getPosition().lineNumber;
      let texto = editor.getModel().getLineContent(editor.getPosition().lineNumber);
      
      let possuiNumerosOuLetras = /([A-Z])+|([a-z])+|\w+|([0-9])+/g;
      let regex = new RegExp(possuiNumerosOuLetras);
      let test = regex.exec(textoAntes);

      /* if(texto == "    " || texto == "" && (e.browserEvent.key === "Enter" || e.browserEvent.keyCode == 13)){
        op = [
          { p: ['algoritmo', _this.posicaoCursor.lineNumber-1], li: "" },
          {
            p: ['cursor', 'lineNumber'],
            od: cursorAntes.lineNumber,
            oi: _this.posicaoCursor.lineNumber,
          },
          { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
          { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
        ];
      }else{
        op = [
          { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], ld: textoAntes, li: texto },
          {
            p: ['cursor', 'lineNumber'],
            od: cursorAntes.lineNumber,
            oi: _this.posicaoCursor.lineNumber,
          },
          { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
          { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
        ];
  
        let edicao = new Edicao(_this.posicaoCursor.lineNumber, texto);
        historicoEdicoes.inserir(edicao);
      } */

      if (test == null && (e.browserEvent.key === 'Enter' || e.browserEvent.keyCode == 13)) {
        op = [
          { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], li: '' },
          {
            p: ['cursor', 'lineNumber'],
            od: cursorAntes.lineNumber,
            oi: _this.posicaoCursor.lineNumber,
          },
          { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
          { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
        ];
      } else if (
        test == null &&
        (e.browserEvent.key === 'Backspace' ||
          e.browserEvent.keyCode == 8 ||
          e.browserEvent.key === 'Del' ||
          e.browserEvent.keyCode == 46)
      ) {
        // Apagar uma linha em que acima tenha um texto
        if (cursorAntes.lineNumber > _this.posicaoCursor.lineNumber) {
          op = [
            { p: ['algoritmo', _this.posicaoCursor.lineNumber], ld: '' },
            {
              p: ['cursor', 'lineNumber'],
              od: cursorAntes.lineNumber,
              oi: _this.posicaoCursor.lineNumber,
            },
            { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
            { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
          ];
        } else {
          // Fazer: Apagar múltiplos caracteres

          if (selection.startLineNumber != selection.endLineNumber) {
            for (let i = selection.startLineNumber; i < selection.endLineNumber + 1; i++) {
              op = [
                { p: ['algoritmo', i - 1], ld: '' },
                {
                  p: ['cursor', 'lineNumber'],
                  od: cursorAntes.lineNumber,
                  oi: _this.posicaoCursor.lineNumber,
                },
                { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
                { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
              ];

              _this.document.submitOp(op); // TODO: jogar para o service
            }

            op = null;
          } else {
            if (texto != textoAntes) {
              op = [
                { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], ld: textoAntes, li: texto },
                {
                  p: ['cursor', 'lineNumber'],
                  od: cursorAntes.lineNumber,
                  oi: _this.posicaoCursor.lineNumber,
                },
                { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
                { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
              ];
            } else {
              op = [
                { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], ld: '' },
                {
                  p: ['cursor', 'lineNumber'],
                  od: cursorAntes.lineNumber,
                  oi: _this.posicaoCursor.lineNumber,
                },
                { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
                { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
              ];
            }
          }
        }
      } else {
        if (
          e.browserEvent.key === 'Backspace' ||
          e.browserEvent.keyCode == 8 ||
          e.browserEvent.key === 'Del' ||
          e.browserEvent.keyCode == 46
        ) {
          /* // Apagar seleção de múltiplos textos
          if (selection.startLineNumber != selection.endLineNumber) {
            op = [];
            for (let i = selection.startLineNumber; i < selection.endLineNumber + 1; i++) {
              if(modeloAntesEdicao != null){
                let textoDeletar = modeloAntesEdicao.getLineContent(i);
                op.push({ p: ['algoritmo', i - 1], ld: textoDeletar });
              }
              
            }
            op.push({
              p: ['cursor', 'lineNumber'],
              od: cursorAntes.lineNumber,
              oi: _this.posicaoCursor.lineNumber,
            });

            op.push({ p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column });
            op.push({ p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id })
            

            _this.document.submitOp(op); // TODO: jogar para o service

            op = null;
          }else  */if (cursorAntes.lineNumber > _this.posicaoCursor.lineNumber) {
            //  Cursor no início da linha, apagar com backspace (sobe para linha anterior)
            op = [
              { p: ['algoritmo', _this.posicaoCursor.lineNumber], ld: '' },
              {
                p: ['cursor', 'lineNumber'],
                od: cursorAntes.lineNumber,
                oi: _this.posicaoCursor.lineNumber,
              },
              { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
              { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
            ];

            _this.document.submitOp(op); // TODO: jogar para o service

            op = [
              {
                p: ['algoritmo', _this.posicaoCursor.lineNumber - 1],
                ld: textoLinhaAnterior,
                li: texto,
              },
              {
                p: ['cursor', 'lineNumber'],
                od: cursorAntes.lineNumber,
                oi: _this.posicaoCursor.lineNumber,
              },
              { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
              { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
            ];

            _this.document.submitOp(op); // TODO: jogar para o service

            op = null;
          } else {
            op = [
              { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], ld: textoAntes, li: texto },
              {
                p: ['cursor', 'lineNumber'],
                od: cursorAntes.lineNumber,
                oi: _this.posicaoCursor.lineNumber,
              },
              { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
              { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
            ];

            _this.document.submitOp(op); // TODO: jogar para o service

            // tem que estar na ultima coluna    //

            if (
              ultimaColunaLinha != null &&
              ultimaColunaLinha == cursorAntes.column &&
              (e.browserEvent.key === 'Del' || e.browserEvent.keyCode == 46)
            ) {
              // Usar o delete no fim de uma linha (puxando o conteúdo de baixo para linha anterior)
              op = [
                { p: ['algoritmo', _this.posicaoCursor.lineNumber], ld: '' },
                {
                  p: ['cursor', 'lineNumber'],
                  od: cursorAntes.lineNumber,
                  oi: _this.posicaoCursor.lineNumber,
                },
                { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
                { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
              ];

              _this.document.submitOp(op); // TODO: jogar para o service
            }

            op = null;
          }
        } else if (e.browserEvent.key === 'Enter' || e.browserEvent.keyCode == 13) {
          let primeiraParte = editor.getModel().getLineContent(editor.getPosition().lineNumber - 1);
          op = [
            {
              p: ['algoritmo', _this.posicaoCursor.lineNumber - 2],
              ld: textoAntes,
              li: primeiraParte,
            },
            {
              p: ['cursor', 'lineNumber'],
              od: cursorAntes.lineNumber,
              oi: _this.posicaoCursor.lineNumber,
            },
            { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
            { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
          ];
          _this.document.submitOp(op); // TODO: jogar para o service

          op = [
            { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], li: texto },
            {
              p: ['cursor', 'lineNumber'],
              od: cursorAntes.lineNumber,
              oi: _this.posicaoCursor.lineNumber,
            },
            { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
            { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
          ];

          _this.document.submitOp(op); // TODO: jogar para o service

          op = null;
        } else {
          op = [
            { p: ['algoritmo', _this.posicaoCursor.lineNumber - 1], ld: textoAntes, li: texto },
            {
              p: ['cursor', 'lineNumber'],
              od: cursorAntes.lineNumber,
              oi: _this.posicaoCursor.lineNumber,
            },
            { p: ['cursor', 'column'], od: cursorAntes.column, oi: _this.posicaoCursor.column },
            { p: ['autor'], od: _this.usuario.id, oi: _this.usuario.id },
          ];
        }

        let edicao = new Edicao(_this.posicaoCursor.lineNumber, texto);
        historicoEdicoes.inserir(edicao);
      }

      if (op != null) {
        _this.document.submitOp(op); // TODO: jogar para o service
        op = null;
      }
    });
  }  