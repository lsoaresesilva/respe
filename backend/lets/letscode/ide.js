function obterLinhaComErro(erro) {
    //var padrao = new RegExp("([a-zA-Z]+): name \'([a-zA-Z]+)\' is not defined on line ([0-9]+)");
    let padrao = /"([a-zA-Z]+): name \'([a-zA-Z]+)\' is not defined on line ([0-9]+)/;
    var consulta = erro.toString().match(padrao);
    if (consulta != null && consulta.length > 0 && consulta[2] != undefined) {
        return consulta[2];
    }

    return null;
}

function destacarLinhaComErro(editor, linhaErro) {
    const lineLength = editor.getModel().getLineLength(linhaErro);
    const linha = parseInt(linhaErro)
    var decorations = editor.deltaDecorations([], [
        { range: new monaco.Range(linha, 1, linha, lineLength), options: { inlineClassName: 'myInlineDecoration' } },
        //{ range: new monaco.Range(7,1,7,24), options: { inlineClassName: 'myInlineDecoration' }},
    ]);
}

function formatarMensagemErro(erro){
    //let padrao = new RegExp("([a-zA-Z]+): name \'([a-zA-Z]+)\' is not defined on line ([0-9]+)");
    let padrao = /([a-zA-Z]+): name \'([a-zA-Z]+)\' is not defined on line ([0-9]+)/
    let consulta = erro.toString().match(padrao);
    if( consulta != null && consulta.length > 0 ){
        return "Você tentou usar uma função ou variável, mas deve ter escrito seu nome incorretamente."
    }
}

function identificarTipoErro(mensagemErro){
    // SE tipo erro for nameError
    let padrao = /"([a-zA-Z]+): /;
    var consulta = mensagemErro.match(padrao);
    if (padrao == "NameError") {
        // verificar qual a funcao ou variável que apresenta nome próximo
        // identificar todas as funcoes
        // identificar todas as variaveis
        // comparar o nome escrito pelo usuário com os nomes encontrados e ver qual apresenta maior similaridade
    }

    
}

function identificarFuncoes(codigo){
    let padrao = /def ([a-zA-Z]+)\(.*\)/g
    let consulta = codigo.match(padrao);
    if(consulta != null && consulta.length > 0){
        let funcoes = consulta.map(funcao=>{
            return funcao.replace(/def ([a-zA-Z]+)\(.*\)/g, "$1");
        })
        return funcoes;
    }
    else{
        return null;
    }
    
}

function identificarVariaveis(codigo){
    let padrao = /([a-zA-Z]+) = /g
    let consulta = codigo.match(padrao);
    if(consulta != null && consulta.length > 0){
        console.log(consulta);
        let variaveis = consulta.map(variavel=>{
            return variavel.replace(/([a-zA-Z]+) = /g, "$1");
        })
        console.log(variaveis);
        return variaveis;
    }
    else{
        return null;
    }
    
}