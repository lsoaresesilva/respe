import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-visualizar-testes-cases',
  templateUrl: './visualizar-testes-cases.component.html',
  styleUrls: ['./visualizar-testes-cases.component.css']
})
export class VisualizarTestesCasesComponent implements OnInit {

  @Input("testesCases") testesCases: any;
  items: MenuItem[];
 // selectedTestCase:
  selectedEntrada: String;

  constructor() { }

  ngOnInit() {
    this.items = [
      //{ label: 'Apagar', icon: 'pi pi-times', command: (event) => this.retirarTestCase(0, this.selectedEntrada) }
    ];
  }

  /*retirarTestCase(testCase, entrada: String) {
    let index = -1;
     for(let i=0;i<this.testesCases.length){

     }
      
      .entradas.length;i++) {
       if (this.testeCase.entradas[i] == entrada) {
         index = i;
         break;
       }
     }
   this.testeCase.entradas.splice(index, 1);
   this.messageService.add({ severity: 'info', summary:"Entrada retirado", detail: "Essa entrada não existe mais" });
   }*/

}
