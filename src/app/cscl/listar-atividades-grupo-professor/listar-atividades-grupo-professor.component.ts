import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-atividades-grupo-professor',
  templateUrl: './listar-atividades-grupo-professor.component.html',
  styleUrls: ['./listar-atividades-grupo-professor.component.css']
})
export class ListarAtividadesGrupoProfessorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  abrirCriacaoGrupo(){
    this.router.navigate(['main', { outlets: { principal: ['criar-grupo'] } }]);
  }

}
