import { Component, OnInit } from '@angular/core';
import Turma from 'src/app/model/turma';
import Estudante from 'src/app/model/estudante';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-cadastrar-turma',
  templateUrl: './cadastrar-turma.component.html',
  styleUrls: ['./cadastrar-turma.component.css']
})
export class CadastrarTurmaComponent implements OnInit {


  turma;
  turmas: Turma[];
  estudante;
  estudantes;
  selectedEstudante: Usuario;
  items: MenuItem[];
  professor;
  professores: Usuario [];
  selectedProfessor: Usuario;
  usuario;



  constructor(public router: Router, private messageService: MessageService, private route: ActivatedRoute,private login:LoginService) {
    
  }

  ngOnInit() {
    this.turma = new Turma(null, null, [], null);
    this.estudante = new Estudante(null, null, null);
    this.professor = new Usuario(null,null,null,null);
    this.usuario = [];
    this.estudantes = [];
  
  

    this.items = [
      { label: 'Vizualizar', icon: 'pi pi-search', command: (event) => this.vizualizar(this.selectedEstudante) },
      { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.deleteEstudante(this.selectedEstudante) },

    ],
  this.items = [
    { label: 'Vizualizar', icon: 'pi pi-search', command: (event) => this.vizualizarProf(this.selectedProfessor) },
    { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.deleteProf(this.selectedProfessor) },

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
  searchP(event) {
    Usuario.getAll().subscribe(professores => {this.professores = [];
      professores.forEach(professor => {
      professores.filter(professor =>{ professor.perfil == 2
      if (professor.email != undefined && typeof professor.email === "string") {
        if (professor.email.includes(event.query)) {
          this.professores.push(professor);
      }
    }
    });
    });
    return this.professores;
    });
  }
   cadastradocomSucesso() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Salvo com sucesso' });
  }
  erro() {
    this.messageService.add({ severity: 'erro', summary: 'Service Message', detail: 'Salvo com sucesso' });
  }
 
  menssagemErro(){
    this.messageService.add({ severity: 'erro', summary: 'Service Message', detail: 'e-mail já adicionado' });
  }

  vizualizar(estudante: Usuario) {
    this.messageService.add({ severity: 'info', summary: 'Estudante selecionado', detail: estudante.nome + ' - ' + estudante.email });

  }
  vizualizarProf(professor : Usuario) {
    this.messageService.add({ severity: 'info', summary: 'Professor selecionado', detail: professor.nome + ' - ' + professor.email });

  }

  adicionarEstudantes() {

    this.turma.estudantes.push(this.estudante.email);
  }
  adicionarProfessor() {
    this.turma.professor = this.professor;
  }
  addElemento(){
    this.usuario.push(this.professor.email);
  }


  deleteProf(professor: Usuario) {
    this.turma.professor == null;
    for (var i =0; i < this.usuario.length; i++){
      if (this.usuario[i].email == professor.email){
        this.usuario.splice(i,1);
      }
    }

  }


  deleteEstudante(estudante: Usuario) {
    
      Usuario.delete(estudante.pk()).subscribe(resultado => {
        Usuario.getAll().subscribe(estudantes=>{
          resultado = estudantes;
        });
        this.messageService.add({ severity: 'info', summary: 'Estudante deletado', detail: estudante.nome });
      }); 
  
      
    

    
  }

  cadastrarTurma() {
    if (this.turma) {
      this.turma.save().subscribe(resultado => {
        this.router.navigate(["main", { outlets: { principal: ['listagem-turma'] } }]);


      },
        err => {
          this.erro();
        });

    }

  }


}