import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from '../login.service';
import Login from '../model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService) { 

    let login = new Login();
    login.usuario = "leonardo";
    login.senha = "12345";
    this.loginService.acessar(login).subscribe(resultado=>{
      console.log(resultado.oi());
    });
  }

  ngOnInit() {
  }

}
