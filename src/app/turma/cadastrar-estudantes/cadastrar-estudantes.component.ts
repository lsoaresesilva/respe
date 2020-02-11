import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import Usuario from 'src/app/model/usuario';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';
import Turma from 'src/app/model/turma';
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
  conhecimentoProgramacao:SelectItem[];
  genero:SelectItem[];
  faixaEtaria:SelectItem[];
  usuario;
  visibilidadeCadastro;

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
    this.usuario = new Usuario(null, null, null, PerfilUsuario.professor, null);
    this.usuario.turma = new Turma(null, null, null, null);
    this.visibilidadeCadastro = false;
    //background: #0d476e;
    

    this.route.params.subscribe(parametros => {
      if (parametros["codigoTurma"] != undefined) {
        
        this.usuario.turma.codigo = parametros["codigoTurma"];
      }

      if(parametros["email"] && parametros["nome"] != undefined){
        this.usuario.nome = parametros["nome"];
        this.usuario.email = parametros["email"];
       
      }
    })
  }
  
  cadastrarEstudante() {
    if (this.usuario.turma.codigo == undefined) {
      this.messageService.add({ severity: 'error', summary: 'Houve um erro:', detail: "É preciso informar o código de uma turma." });
      
    }else{
      Turma.validarCodigo(this.usuario.turma.codigo).subscribe(resultado => {
        
        if (resultado === false) {

         
          this.messageService.add({ severity: 'error', summary: 'Houve um erro:', detail: "Não existe uma turma cadastrada com este código." });
        } else {
          this.usuario.validar().subscribe(resultado => {
            if (resultado) {
  
              this.usuario.save().subscribe(resultado => {
                //this.messageService.add({key:"loginToast", severity: 'success', summary: 'Vamos programar?!', detail: "" });
                this.visibilidadeCadastro = true;
                
              },
                err => {
                  this.messageService.add({ severity: 'error', summary: 'Houve um erro:', detail: err.toString() });
                });
  
            }
          }, err => {
            this.messageService.add({ severity: 'error', summary: 'Houve um erro:', detail: err.toString() });
          });
        }
      });
    }
    
  }


  navegarLoginSucesso(){
    this.visibilidadeCadastro = false;
    this.router.navigate([""]);
  }

}

