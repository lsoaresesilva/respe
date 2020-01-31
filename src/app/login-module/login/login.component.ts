import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import Usuario from '../../model/usuario';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
//import {Experiment} from 'scientificxpjs/experiment'
import { MessageService } from 'primeng/primeng';
import Query from 'src/app/model/firestore/query';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;

  constructor(private loginService:UsuarioService, private router:Router, private login:LoginService, private messageService: MessageService) { 
    this.usuario = new Usuario(null, null, null, 0, null);
  }

  ngOnInit() {
  }
  
  loginIncorreto(){
    this.messageService.add({severity:'success', summary:'Inválido!', detail:'Usuário ou senha inválidos'});
  }

  acessar(){
    let t = this;
    this.login.logar(this.usuario).subscribe(resultado=>{
      /**/
      this.redirecionar(resultado);
      /*Experiment.login(this.usuario.grupoExperimento).subscribe(resultado=>{
        this.redirecionar(resultado);
      })*/
    })
  }

  redirecionar(resultado){
    if(resultado)
    this.router.navigate(["main", { outlets: { principal: ['home'] } }]);
    else{
      alert("Usuário ou senha inválidos. Você tem certeza que fez o cadastro?") // TODO: mudar para o message service
    }
  }

  cadastrar(){
    this.router.navigate(["cadastro-estudante"])
  }



  signInWithGoogle() {
    this.login.signInWithGoogle()
      .then((res) => {
        if(res != undefined){
          Usuario.logar(new Query ('email', "==", res.user.email)).subscribe(usuarioLogado =>{
            if(usuarioLogado != undefined){
                this.login.criarSessao(usuarioLogado);
                this.router.navigate(["main", { outlets: { principal: ['home'] } }]);          
            }else{
                this.router.navigate(["cadastro-estudante",res.user.email,res.user.displayName])
            }
          }),err =>{
              alert("erro ao tentar realizar login:" + err.string())
            }

        }
      })
      .catch((err) => console.log(err));
    }



    signInWithFacebook() {
      this.login.signInWithFacebook()
        .then((res) => {
          if(res != undefined){
            Usuario.logar(new Query ('email', "==", res.user.email)).subscribe(usuarioLogado =>{
              if(usuarioLogado != undefined){
                  this.login.criarSessao(usuarioLogado);
                  this.router.navigate(["main", { outlets: { principal: ['home'] } }]);          
              }else{
                  this.router.navigate(["cadastro-estudante",res.user.email,res.user.displayName])
              }
            }),err =>{
                alert("erro ao tentar realizar login:" + err.string())
              }
  
          }
        })
        .catch((err) => console.log(err));
      }



 

}
