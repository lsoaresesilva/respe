
window.addEventListener('mouseup', function () {

});

window.addEventListener('mousedown', function () {
    
});

var callback = null;
var callbackAtivo = false;
var instance = null;
var event = null;
var ele = null;
var sel = null;
var rel1= null;
var rel2=null;
var textoSelecionado = "";

function ativarVisualizacao(cb, it){

    ele = document.getElementById('tooltip');
    sel = window.getSelection();
    rel1 = document.createRange();
    rel1.selectNode(document.getElementById('cal1'));
    rel2= document.createRange();
    rel2.selectNode(document.getElementById('cal2'));

    document.onmouseup = doSomethingWithSelectedText;
    document.onkeyup = doSomethingWithSelectedText;
    document.onclick = function(){
        /**
         * Este código é necessário para desativar o tooltip de opções do estudante. Ao clicar em uma parte na tela é verificado se o texto não está mais selecionado, se não estiver, verifica novamente em 10ms, caso continue assim significa que o estudante realmente deselecionou e portanto, pode fechar o tooltip.
         */
        if (sel.isCollapsed) {
            setTimeout(function(){
                if (sel.isCollapsed) {
                    ele.style.display = 'none';
                }
            }, 10)
        }
        /*if (callbackAtivo) {
            ele.style.display = 'none';
        }*/
    }
    
    callback = cb;
    instance = it;
}



function desativarVisualizacao(){
    document.onmouseup = null;
    document.onkeyup = null;
}

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}


function doSomethingWithSelectedText(event) {

    textoSelecionado = getSelectedText();

    if (!sel.isCollapsed) {
        //debugger;
        var r = sel.getRangeAt(0).getBoundingClientRect();
        var rb1 = rel1.getBoundingClientRect();
        var rb2 = rel2.getBoundingClientRect();
        ele.style.top = (r.bottom - rb2.top)*100/(rb1.top-rb2.top) + 'px'; //this will place ele below the selection
        ele.style.left = (r.left - rb2.left)*100/(rb1.left-rb2.left) + 'px'; //this will align the right edges together

        //code to set content

        ele.style.display = 'block';
    }
}