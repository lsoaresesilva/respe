import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import Usuario from 'src/app/model/usuario';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';
import Turma from 'src/app/model/turma';
import Estudante from 'src/app/model/estudante';
import { ConhecimentoProgramacao } from 'src/app/model/enums/conhecimentoProgramacao';
import { Genero } from 'src/app/model/enums/genero';
import { FaixaEtaria } from 'src/app/model/enums/faixaEtaria';


@Component({
  selector: 'app-cadastrar-estudantes',
  templateUrl: './cadastrar-estudantes.component.html',
  styleUrls: ['./cadastrar-estudantes.component.css']
})
export class CadastrarEstudantesComponent implements OnInit {

  id;
  estudante;
  conhecimentoProgramacao:SelectItem[];
  genero:SelectItem[];
  faixaEtaria:SelectItem[];

  constructor(public router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.conhecimentoProgramacao = [
      { label: 'Qual o seu conhecimento de programação?', value: null },
      { label: 'Nunca programei', value: ConhecimentoProgramacao.nenhum },
      { label: 'Pouco, li algumas coisas, mas não sei programar', value: ConhecimentoProgramacao.pouco },
      { label: 'Sei algumas coisas, já escrevi pequenos programas', value: ConhecimentoProgramacao.medio },
      { label: 'Eu sei programar', value: ConhecimentoProgramacao.programador },
    ];

    this.genero = [
      { label: 'Qual o seu gênero?', value: null },
      { label: 'Feminino', value: Genero.feminino },
      { label: 'Masculino', value: Genero.feminino },
      
    ];

    this.faixaEtaria = [
      { label: 'Em qual faixa-etária você se encontra?', value: null },
      { label: '14 a 17', value: FaixaEtaria.quatorzeadezessete },
      { label: '18 a 22', value: FaixaEtaria.dezoitoavintedois },
      { label: '23 a 27', value: FaixaEtaria.vintetresavintesete },
      { label: '28 a 31', value: FaixaEtaria.vinteoitoatrintaum },
      { label: '32 a 36', value: FaixaEtaria.trintadoisatrintaseis },
      { label: '37 a 41', value: FaixaEtaria.trintaseteaquarentaum },
      { label: '42 ou mais', value: FaixaEtaria.quarentdoismmais },
    ];
  }

  exibirMensagemCadastro() {
    this.messageService.add({ severity: 'success', summary: 'Estudante cadastrado com sucesso.' });
  }
  exibirMensagemCodigoInvalido() {
    this.messageService.add({ severity: 'success', summary: 'É preciso informar o código de uma turma.' });
  }

  ngOnInit() {
    this.estudante = new Estudante(new Turma(null, null, null, null), new Usuario(null, null, null, PerfilUsuario.estudante, null));
    this.route.params.subscribe(parametros => {
      if (parametros["codigoTurma"] != undefined) {
        this.estudante.turma.codigo = parametros["codigoTurma"];
      }

      if(parametros["email"] && parametros["nome"] != undefined){
        this.estudante.usuario.nome = parametros["nome"];
        this.estudante.usuario.email = parametros["email"];
       
      }
    })
  }
  
  cadastrarEstudante() {
    if (this.estudante.turma.codigo == undefined) {
      alert("É preciso informar o código de uma turma.");
    }else{
      Turma.validarCodigo(this.estudante.turma.codigo).subscribe(resultado => {
        
        if (resultado === false) {

          alert("Não existe uma turma cadastrada com este código.")
          //this.messageService.add({ key:"cadastro-estudante", severity: 'erro', summary: 'Houve um erro:', detail: "Não existe uma turma cadastrada com este código." });
        } else {
          this.estudante.usuario.validar().subscribe(resultado => {
            if (resultado) {
  
              this.estudante.save().subscribe(resultado => {
                alert("Cadastro realizado com sucesso.")
                //this.messageService.add({ severity: 'success', summary: 'Bem vindo!', detail: "Cadastro realizado com sucesso." });
                this.router.navigate([""]);
              },
                err => {
                  this.messageService.add({ severity: 'erro', summary: 'Houve um erro:', detail: err.toString() });
                });
  
            }
          }, err => {
            alert('Houve um erro: ' + err.toString());
          });
        }
      });
    }
    
  }




}

