export default class Usuario{
    usuario;
    senha;
    id;

   constructor(){
       this.usuario = "";
       this.senha = "";
   }

   static getUsuarioLogado(){
       let login = new Usuario();
       login.id = localStorage.getItem("usuarioLogado");
       return login;
   }
}