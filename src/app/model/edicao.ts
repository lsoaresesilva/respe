export default class Edicao{

    constructor(public linha, public texto, public estudante){

    }

    stringfy(){
        let objeto = {
            
        }

        objeto["estudante"] = this.estudante.stringfiy();
        objeto["linha"] = this.linha;
        objeto["texto"] = this.texto;

        return objeto;
    }
}