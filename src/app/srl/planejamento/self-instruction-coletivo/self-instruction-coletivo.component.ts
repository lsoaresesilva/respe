import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


declare function iniciarEditorColaborativo(id): any;

@Component({
  selector: 'app-self-instruction-coletivo',
  templateUrl: './self-instruction-coletivo.component.html',
  styleUrls: ['./self-instruction-coletivo.component.css']
})
export class SelfInstructionColetivoComponent implements OnInit {

  constructor(private route:ActivatedRoute) {
    this.route.params.subscribe(params=>{
      if(params["atividadeGrupoId"] != null && params["grupoId"] != null){

      }
    })
   }

  ngOnInit(): void {
  }

}
