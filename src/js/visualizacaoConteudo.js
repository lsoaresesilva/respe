var callback = null;
var instance = null;
var event = null;

function ativarVisualizacao(cb, it){
    document.onmouseup = doSomethingWithSelectedText;
    document.onkeyup = doSomethingWithSelectedText;

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
    var selectedText = getSelectedText();
    if (selectedText) {
        if(callback != null && instance != null)
            callback(selectedText, instance, event)
    }
}