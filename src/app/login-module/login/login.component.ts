import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import Usuario from '../../model/usuario';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;

  constructor(private loginService:UsuarioService, private router:Router, private login:LoginService) { 
    this.usuario = new Usuario(null, null, null, 0);
  }

  ngOnInit() {
  }

  acessar(){
    let t = this;
    this.login.logar(this.usuario).subscribe(resultado=>{
      if( resultado )
        this.router.navigateByUrl("/main");
      else{
        alert("a senha ="+this.usuario.senha +" e login = "+this.usuario.email+" estão invalidos") // TODO: mudar para o message service
      }
    })
  }

  cadastrar(){
    this.router.navigate(["cadastro-estudante"])
  }

}
