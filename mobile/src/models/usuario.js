import Document from '../odm/document';
import { Observable } from 'rxjs';
import Query from '../odm/query'
import { sha256 } from 'js-sha256';
import AsyncStorage from '@react-native-community/async-storage';

export default class Usuario extends Document{

    static __name = "usuarios";

    constructor(id, email = "", senha = ""){
        super();
        
    }

    validar(){
        return (this.email != "" && this.senha != "")?true:false;
    }

    static logar(usuario) {

        return new Observable(observer => {
          let query = [new Query("email", "==", usuario.email), new Query("senha", "==", sha256(usuario.senha))];
          Usuario.getAll(query).subscribe(resultado => {
            if (resultado.length > 0) {

              AsyncStorage.setItem('usuario', JSON.stringify({ id: resultado[0].id, perfil: resultado[0].perfil })).then();
              observer.next(true);
              observer.complete();
            } else {
              observer.next(false);
              observer.complete();
            }
          }, err => {
            alert("Erro ao tentar realizar login: " + err.toString());
          });
        });
      }
}