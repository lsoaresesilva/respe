import { Component, OnInit, Input } from '@angular/core';
import TestCase from 'src/app/model/testCase';
import { TestesCasesService } from '../testes-cases.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastrar-teste-case',
  templateUrl: './cadastrar-teste-case.component.html',
  styleUrls: ['./cadastrar-teste-case.component.css']
})
export class CadastrarTesteCaseComponent implements OnInit {
  @Input("testCase")
  
  testeCase:TestCase;
  entrada:string ;
  selectedEntrada: String;
  selectedTest:TestCase;
  items: MenuItem[];

  constructor(private messageService: MessageService) { }



  ngOnInit() {
    this.items = [

      { label: 'Apagar', icon: 'pi pi-times', command: (event) => this.retirarTestCase(this.selectedEntrada) }
    ];
  }

  addTestCase(){

    if(this.testeCase.validarEntrada(this.entrada)){
      this.testeCase.entradas.push(this.entrada);
      this.entrada=null;

    }else {

     this.messageCamposVazios();
      this.messageService.add({ severity: 'info', summary:"Teste Case indefinido", detail: "Teste case não pode ser vazio" })
     
    }
  }

  retirarTestCase(entrada: String) {

    let index = -1;
     for(let i=0;i<this.testeCase.entradas.length;i++) {
       if (this.testeCase.entradas[i] == entrada) {
         index = i;
         break;
       }
     }
   this.testeCase.entradas.splice(index, 1);
   this.messageService.add({ severity: 'info', summary:"Entrada retirado", detail: "Essa entrada não existe mais" });
   }

   deleteTeste(teste:TestCase) {
    TestCase.delete(teste.pk()).subscribe(resultado=>{
     
     
      
   });
 }

  cadastrarTesteCase(){
    if (this.testeCase.validar()) {
       this.testeCase.save().subscribe(resultado=>{
     this.messageCadastrado();
        
     }, err=>{
     this.messageError();
       
       });
     }else{
      this.messageCamposVazios();

      this.messageService.add({ severity: 'success', summary:"Test Case cadastrado", detail: "Esse test Case foi incluído na questão" });
        
     }, err=>{
      this.messageService.add({ severity: 'error', summary:"teste Case inválido", detail: "Esse teste Case não foi cadastrado" });
       
       });
     }else{
      this.messageService.add({ severity: 'error', summary:"teste Case vazio", detail: "Esse teste Case foi negado" });
     }
   }
 
  messageCadastrado(){
  this.messageService.add({ severity: 'success', summary:"Test Case cadastrado", detail: "Esse test Case foi incluído na questão" });
  }

  messageError(){
  this.messageService.add({ severity: 'error', summary:"teste Case inválido", detail: "Esse teste Case não foi cadastrado" });
  }

  messageCamposVazios(){
  this.messageService.add({ severity: 'error', summary:"teste Case inválido", detail: "Todos os campos do test case precisam ser preenchidos" });
  }
 
}
