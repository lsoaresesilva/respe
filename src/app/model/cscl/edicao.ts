export default class Edicao{

    constructor(public linha, public texto){

    }

    stringfy(){
        let objeto = {
            
        }

        
        objeto["texto"] = this.texto;
        objeto["linha"] = this.linha;

        return objeto;
    }
}