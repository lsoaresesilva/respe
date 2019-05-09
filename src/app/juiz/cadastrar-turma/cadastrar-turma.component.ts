import { Component, OnInit } from '@angular/core';
import Turma from 'src/app/model/turma';
import Estudante from 'src/app/model/estudante';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-cadastrar-turma',
  templateUrl: './cadastrar-turma.component.html',
  styleUrls: ['./cadastrar-turma.component.css']
})
export class CadastrarTurmaComponent implements OnInit {


  turma;
  turmas: Turma[];
  id: Estudante;
  estudante;
  estudantes: Estudante[];
  cols: any[];
  selectedEstudante: Estudante;
  items: MenuItem[];



  constructor(public router: Router, private messageService: MessageService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.turma = new Turma(null, null, [], null);
    this.estudante = new Estudante(null, null, null);

    this.items = [
      { label: 'Vizualizar', icon: 'pi pi-search', command: (event) => this.vizualizar(this.selectedEstudante) },
      { label: 'Apagar', icon: 'pi pi-times', command: (event) => this.deleteEstudante(this.selectedEstudante) },

    ];

  }
  search(event) {

    Usuario.getAll().subscribe(estudantes => {
      this.estudantes = [];
      // TODO: filtrar via banco
      estudantes.forEach(estudante => {
        // console.log (estudante)
        if (estudante.email != undefined && typeof estudante.email === "string") {
          if (estudante.email.includes(event.query)) {
            this.estudantes.push(estudante);
          }
        }
      })

      return this.estudantes;
    })
  }

  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
  }
  addErro() {
    this.messageService.add({ severity: 'erro', summary: 'Service Message', detail: 'Via MessageService' });
  }

  vizualizar(estudante: Estudante) {
    this.messageService.add({ severity: 'info', summary: 'Estudante selecionado', detail: estudante.nome + ' - ' + estudante.usuario.email });

  }

  adicionarEstudantes() {

    this.turma.estudantes.push(this.estudante.email);
  }




  deleteEstudante(estudante: Estudante) {
    let index = -1;
    for (let i = 0; i < this.turma.estudantes.length; i++) {
      if (this.turma.estudantes[i].usuario.email == estudante.usuario.email) {
        index = i;
        break;
      }
    }
    this.turma.estudantes.splice(index, 1);

  }


  cadastrarTurma() {
    console.log(this.turma);
    if (this.turma) {
      this.turma.save().subscribe(resultado => {

        this.messageService.add({ severity: 'info', summary: ' Turma ' + this.turma.nome + 'foi cadastrada', detail: this.turma.nome });

        console.log(this.turma);
        this.router.navigate(["main", { outlets: { principal: ['listagem-turma'] } }]);


      },
        err => {
          this.addErro();
        });

    }

  }


}