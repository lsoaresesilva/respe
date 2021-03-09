import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';

@Component({
  selector: 'app-visualizar-atividade-grupo-professor',
  templateUrl: './visualizar-atividade-grupo-professor.component.html',
  styleUrls: ['./visualizar-atividade-grupo-professor.component.css']
})
export class VisualizarAtividadeGrupoProfessorComponent implements OnInit {

  atividadeGrupo:AtividadeGrupo;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] != null) {

        AtividadeGrupo.get(params['id']).subscribe(atividadeGrupo=>{
          this.atividadeGrupo = atividadeGrupo as AtividadeGrupo;
        })

      }
    });
  }

}
