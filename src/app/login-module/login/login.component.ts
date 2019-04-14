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
    Usuario.isUsuarioDeslogado();
  }

  acessar(){
    Usuario.logar(new Usuario(null, this.login, this.senha)).subscribe(resultado=>{
      if( resultado )
        this.router.navigateByUrl("/main");
    })
  }

}
