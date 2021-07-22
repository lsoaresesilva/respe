import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login-module/login.service';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';
import Query from 'src/app/model/firestore/query';
import { Assunto } from 'src/app/model/sistema-aprendizagem/assunto';

@Component({
  selector: 'app-listar-assuntos-admin',
  templateUrl: './listar-assuntos-admin.component.html',
  styleUrls: ['./listar-assuntos-admin.component.css'],
})
export class ListarAssuntosAdminComponent implements OnInit {
  assuntos$?;
  assuntoSelecionado;
  usuario;
  items: MenuItem[];

  constructor(
    public login: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.assuntos$ = [];
    this.usuario = this.login.getUsuarioLogado();
    if (this.usuario.perfil === PerfilUsuario.admin) {
      this.items = [
        {
          label: 'Alterar',
          icon: 'pi pi-check',
          command: (event) => this.alterar(this.assuntoSelecionado),
        },
        {
          label: 'Deletar',
          icon: 'pi pi-times',
          command: (event) => this.deletar(this.assuntoSelecionado),
        },
      ];
    }
  }

  ngOnInit(): void {
    Assunto.getAllAdmin().subscribe((assuntos) => {
      this.assuntos$ = Assunto.ordenar(assuntos);
    });
  }

  alterar(assunto: Assunto) {
    if (assunto != undefined) {
      this.router.navigate([
        'geral/main',
        { outlets: { principal: ['atualizacao-assunto', assunto.pk()] } },
      ]);
    }
  }

  cadastrar() {
    this.router.navigate(['geral/main', { outlets: { principal: ['admin', 'cadastrar-assunto'] } }]);
  }

  deletar(assunto: Assunto) {
    Assunto.delete(assunto.pk()).subscribe((resultado) => {
      Assunto.getAll().subscribe((assuntos) => {
        this.assuntos$ = assuntos;
      });
      this.messageDeletar();
    });
  }

  messageDeletar() {
    this.messageService.add({
      severity: 'success',
      summary: 'Deletado!',
      detail: 'Esse assunto foi excluído!',
    });
  }

  abrirAssunto(assunto) {
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['visualizar-assunto-admin', assunto.pk()] } },
    ]);
  }
}
