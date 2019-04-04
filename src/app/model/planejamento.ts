import Usuario from './usuario';
import { Assunto } from './assunto';

export class Planejamento{
    usuario:Usuario;
    assunto:Assunto;
    tempoEstudo;
    importancia;
    nivelDificuldade;
    planoExecucao;

    toFirebase(){
        return {loginId:this.usuario.id,assuntoId:this.assunto.pk(),tempoEstudo:this.tempoEstudo,importancia:this.importancia,nivelDificuldade:this.nivelDificuldade,planoExecucao:this.planoExecucao};
    }

}