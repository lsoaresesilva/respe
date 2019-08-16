
import Usuario from './usuario';

export default class RespostaPedidoAjuda{

    constructor(public id, public estudante:Usuario, public resposta:string){

    }

    objectToDocument(){
        return {
            estudanteId:this.estudante.pk(),
            resposta:this.resposta
        }
    }

}