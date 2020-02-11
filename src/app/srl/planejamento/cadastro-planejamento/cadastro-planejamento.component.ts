import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Assunto } from '../../../model/assunto';
import { Planejamento } from '../../../model/planejamento';
import { Dificuldade } from '../../../model/enums/dificuldade';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import { MessageService } from 'primeng/primeng';
import { Motivacao } from 'src/app/model/enums/motivacao';
//import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-cadastro-planejamento',
  templateUrl: './cadastro-planejamento.component.html',
  styleUrls: ['./cadastro-planejamento.component.css']
})
export class CadastroPlanejamentoComponent implements OnInit {

  dificuldades: SelectItem[];
  motivacao: SelectItem[];
  assuntos;
  index: number = 0;
  planejamento: Planejamento;
  id;
  isAlterar;

  dialogImportanciaAssunto = false;



  constructor(
    private messageService: MessageService,
    private router: Router,
    private login: LoginService,
    private route: ActivatedRoute
  ) {
    // TODO: carregar do login
    this.planejamento = new Planejamento(null, this.login.getUsuarioLogado(), null, 0, "", 0, "", false, null);
  }

  prepararAssuntos(assuntos) {
    
    assuntos = Assunto.ordenar(assuntos);

    let opcoesAssuntos = [
      { label: 'Selecione um Assunto', value: null },
    ];

    assuntos.forEach(assunto => {
      opcoesAssuntos.push({ label: assunto.nome, value: assunto });
    });

    return opcoesAssuntos;

  }

  exibirDialogImportancia(event){
    if(this.planejamento.assunto != null){
      this.dialogImportanciaAssunto = true;
    }
  }

  ngOnInit() {


   
    this.route.params.subscribe(params=> {this.id = params["id"];
      if(this.id!=undefined){
        this.isAlterar=true;
       Planejamento.get(this.id).subscribe(resultado =>{
          this.planejamento = resultado;
          this.planejamento.estudante = this.login.getUsuarioLogado();
        
        })
      }
      
    });


    Assunto.getAll().subscribe(assuntos => {

      this.assuntos = this.prepararAssuntos(assuntos)
    });

    this.dificuldades = [
      { label: 'Selecione uma dificuldade', value: null },
      { label: 'Difícil', value: Dificuldade.dificil },
      { label: 'Normal', value: Dificuldade.medio },
      { label: 'Fácil', value: Dificuldade.facil },
    ];

    this.motivacao = [
      { label: 'Selecione um nível de motivação', value: null },
      { label: 'Não estou', value: Motivacao.nenhuma },
      { label: 'Pouco', value: Motivacao.pouco },
      { label: 'Normal', value: Motivacao.normal },
      { label: 'Estou motivado', value: Motivacao.motivado },
      { label: 'Estou muito motivado', value: Motivacao.muitoMotivado },
    ];
  }

  cadastrarPlanejamento() {
    this.planejamento.validar().subscribe(validade => {
      this.planejamento.save().subscribe(resultado => {
        this.messageService.add({ severity: 'Sucesso', summary: 'Planejamento cadastrado', detail: 'Seu planejamento foi salvo com sucesso!' });
        this.router.navigate(["main", { outlets: { principal: ['listagem-planejamento'] } }])
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Houve um erro:', detail: err.toString() });
       
      })

    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Houve um erro:', detail: err.toString() });
     
    });
  }





}
