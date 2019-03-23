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

  constructor(private loginService:UsuarioService, private router:Router) { 

    this.login = new Usuario();
    
    
  }

  ngOnInit() {
  }

  acessar(){
    this.loginService.acessar(this.login).subscribe(usuarioLogado=>{
        localStorage.setItem('usuarioLogado', usuarioLogado.id);
        this.router.navigateByUrl("/main");
    }, err=>{
      console.log(err);
    });
  }

}
