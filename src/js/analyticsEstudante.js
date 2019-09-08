var minutos = 0;
var TEMPO_TEMPORIZADOR = 60000; // 1 minuto
var temporizador = null;
var callbackSalvarBanco = null;


function incrementarTempo(){
    minutos++;
    callbackSalvarBanco(minutos);
}

function iniciarContagem(){
    temporizador = window.setInterval(incrementarTempo, TEMPORIZADOR);
}


function pausarContagem(){
    window.clearInterval(temporizador);
    callbackSalvarBanco(minutos);
    minutos = 0;
}

function contabilizarTempoOnline(callbackSalvarBD){
    callbackSalvarBanco = callbackSalvarBD;
    window.addEventListener('focus', iniciarContagem);
    window.addEventListener('blur', pausarContagem);
    iniciarContagem();
}


