import { Component, OnInit } from '@angular/core';
import Export from 'src/app/model/experimento/export';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  exportarSubmissoes(){
    Export.submissoes().subscribe(submissoes=>{
      console.log(JSON.stringify(submissoes));
    })
  }

  identificarErrosVariaveis(){
    console.log(Export.calcularErrosVariaveis());
  }

}
