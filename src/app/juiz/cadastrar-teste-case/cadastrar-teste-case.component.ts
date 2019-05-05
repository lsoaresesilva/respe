import { Component, OnInit, Input } from '@angular/core';
import TestCase from 'src/app/model/testCase';
import { TestesCasesService } from '../testes-cases.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastrar-teste-case',
  templateUrl: './cadastrar-teste-case.component.html',
  styleUrls: ['./cadastrar-teste-case.component.css']
})
export class CadastrarTesteCaseComponent implements OnInit {
  @Input("testCase")
  testeCase:TestCase;
  entrada=null;



  constructor(private messageService: MessageService) { }

  ngOnInit() {
    //this.testeCase = new TestCase(null,[],null, );
  }
   
  addMaisTesteCase(){
    if (this.testeCase){
    this.testeCase.entradas.push(this.entrada);
    this.entrada=null;
    }
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