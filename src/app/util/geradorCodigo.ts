export default class GeradorCodigo {

    static gerar() {
        let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let codigo = "";

        for (let x = 0; x < 6; x++) {
            let caractereAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            codigo = codigo.concat(caractereAleatorio);
        }

       

        return codigo;
    }
}