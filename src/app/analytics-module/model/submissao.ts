
import Usuario from 'src/app/model/usuario';

export default class Submissao{
    id;
    usuario:Usuario;
    erro;
    codigo;
    status;
    timestamp;

    constructor(usuario:Usuario, codigo, status = -1){
        if(usuario == undefined || codigo == undefined || usuario.id == undefined)
            throw new Error("Não é possível criar um objeto EnvioCodigo sem login do usuário e/ou código");
        
        this.usuario = usuario.id;
        this.erro = "";
        this.codigo = codigo;
        this.status = status;
        this.timestamp = new Date();
    }

    toFireBase(){
        return {loginId:this.usuario.id, erro:this.erro, codigo:this.codigo, status:this.status, timestamp:this.timestamp};
    }
}