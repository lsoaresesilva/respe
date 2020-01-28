
export default class ErroServidor {

    mensagem;

    private constructor(mensagem) {
        this.mensagem = mensagem;
    }

    static construir(mensagemErro) {

        if (mensagemErro["name"] != null && mensagemErro["status"] != null) {
            let mensagem = "";

            if (mensagemErro.name == "HttpErrorResponse" && mensagemErro.status == 0) {
                mensagem = "O servidor está fora do ar."
            } else {
                mensagem = mensagemErro.error.mensagem;
            }

            return new ErroServidor(mensagem);
        }else{
            return null;
        }



    }

}