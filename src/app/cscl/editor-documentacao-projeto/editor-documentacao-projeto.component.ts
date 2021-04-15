import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'

declare function iniciarEditorDocumentacaoProjeto(id): any;

@Component({
  selector: 'app-editor-documentacao-projeto',
  templateUrl: './editor-documentacao-projeto.component.html',
  styleUrls: ['./editor-documentacao-projeto.component.css']
})
export class EditorDocumentacaoProjetoComponent implements AfterViewInit {

  grupoId;
  assuntoId;
  atividadeGrupoId;
  questaoId;

  constructor(private route:ActivatedRoute, private router: Router) { }

  ngAfterViewInit(): void {
    this.route.params.subscribe(params=>{
      if(params["grupoId"] != null && params["atividadeGrupoId"] != null && params["assuntoId"] != null && params["questaoId"] != null){
        this.grupoId = params["grupoId"];
        this.atividadeGrupoId = params["atividadeGrupoId"];
        this.assuntoId = params["assuntoId"];
        this.questaoId = params["questaoId"];
        iniciarEditorDocumentacaoProjeto(params["grupoId"]);
      }
    })
    
    
  }

  abrirEditor(){
    // http://localhost:4200/main/(principal:entrar-grupo/lZNkcSLF78nSlUlfrTdD/e5d78aa2-17f4-4bd9-8494-031a7f54d9ba/PU0EstYupXgDZ2a57X0X/aea71e7d-1211-4869-b211-53008ed61820)
    // http://localhost:4200/main/(principal:entrar-grupo/lZNkcSLF78nSlUlfrTdD/e5d78aa2-17f4-4bd9-8494-031a7f54d9ba/PU0EstYupXgDZ2a57X0X/6012cdd4-3a9a-4865-9d3f-99a29d5bbe0c)
    this.router.navigate(['main', { outlets: { principal: ['entrar-grupo', this.atividadeGrupoId, this.grupoId, this.assuntoId, this.questaoId] } }]);
  }

}
