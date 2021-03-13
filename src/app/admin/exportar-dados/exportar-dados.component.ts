import { Component, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';

@Component({
  selector: 'app-exportar-dados',
  templateUrl: './exportar-dados.component.html',
  styleUrls: ['./exportar-dados.component.css']
})
export class ExportarDadosComponent implements OnInit {

  json;

  constructor() { 
    this.json = [];
  }

  ngOnInit(): void {
    Assunto.getAllAdmin().subscribe((assuntos) => {
      
      assuntos.forEach(assunto=>{
        this.json.push(assunto.toJson());
      })

      this.json = JSON.stringify(this.json);

    });

    
  }

}
