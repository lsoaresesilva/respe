export class LoginNotFoundError extends Error{

    constructor(){
        super();
        this.message = "Login ou senha incorretos ou não cadastrados";
    }
    
}