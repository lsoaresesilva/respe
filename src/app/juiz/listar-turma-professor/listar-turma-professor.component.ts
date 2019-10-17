import { Component, OnInit } from '@angular/core';
import Turma from 'src/app/model/turma';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import Query from 'src/app/model/firestore/query';
import { Collection } from 'src/app/model/firestore/document';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-listar-turma-professor',
  templateUrl: './listar-turma-professor.component.html',
  styleUrls: ['./listar-turma-professor.component.css']
})
@Collection("turmas")
export class ListarTurmaProfessorComponent implements OnInit {
  private usuario;
  turmas: Turma [];
  turma: Turma;
  id: any;
  professor: Usuario;

  constructor(private route: ActivatedRoute, private login:LoginService) {
    this.usuario = this.login.getUsuarioLogado();
   }

  ngOnInit() {
    Turma.getAll(new Query("professorId", "==", this.usuario.id)).subscribe(turma => this.turmas = turma);
  }

}
