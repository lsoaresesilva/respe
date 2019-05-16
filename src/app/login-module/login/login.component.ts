import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import Usuario from '../../model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login;
  senha;

  constructor(private loginService:UsuarioService, private router:Router) { 

    
    
    
  }

  ngOnInit() {
  }

  acessar(){
    let t = this;
    Usuario.logar(new Usuario(null, this.login, this.senha, null)).subscribe(resultado=>{
      if( resultado )
        this.router.navigateByUrl("/main");
      else{
        alert("a senha ="+this.senha +" e login = "+this.login+" estão invalidos") // TODO: mudar para o message service
        console.log(this.login);
        console.log(this.senha);
      }
    })
  }

}
