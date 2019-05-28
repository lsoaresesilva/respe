import Estudante from './estudante';

export default class RespostaPedidoAjuda{

    constructor(public id, public estudante:Estudante, public resposta:string){

    }

    objectToDocument(){
        return {
            estudanteId:this.estudante.pk(),
            resposta:this.resposta
        }
    }

}