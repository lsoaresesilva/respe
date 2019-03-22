import Usuario from '../../login-module/model/usuario';
import { Assunto } from 'src/app/geral-module/model/assunto';

export class Planejamento{
    usuario:Usuario;
    assunto:Assunto;
    tempoEstudo;
    importancia;
    nivelDificuldade;
    planoExecucao;

    toFirebase(){
        return {loginId:this.usuario.id,assuntoId:this.assunto.id,tempoEstudo:this.tempoEstudo,importancia:this.importancia,nivelDificuldade:this.nivelDificuldade,planoExecucao:this.planoExecucao};
    }

}