import { Component, OnInit, Input } from '@angular/core';
import TestCase from 'src/app/model/testCase';
import { TestesCasesService } from '../testes-cases.service';

@Component({
  selector: 'app-cadastrar-teste-case',
  templateUrl: './cadastrar-teste-case.component.html',
  styleUrls: ['./cadastrar-teste-case.component.css']
})
export class CadastrarTesteCaseComponent implements OnInit {
  @Input("testCase")
  testeCase:TestCase;
  temTesteCase=false;
  entrada:string ="";



  constructor() { }

  ngOnInit() {
    //this.testeCase = new TestCase(null,[],null, );
  }
   
  addMaisTesteCase(){
    this.temTesteCase=true;
    this.testeCase.entradas.push(this.entrada);
    for(let i=0;i<this.testeCase.entradas.length;i++)
    {console.log("na posição " +i+ "o elemento é = "+ this.testeCase.entradas[i]);
    }
    this.entrada="";
  }

  cadastrarTesteCase(){
   console.log("Array = "+this.testeCase.entradas +"   "+ "saida = "+this.testeCase.saida);
    console.log(this.testeCase);
     if(this.testeCase){
       this.testeCase.save().subscribe(resultado=>{
         console.log("cadastrado");
         console.log(this.testeCase.entradas);
     }, err=>{
       console.log("deu erro")
       
       });
     }else{
       console.log("vazio")
     }
   }
 


}