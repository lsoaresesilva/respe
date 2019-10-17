import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Assunto } from '../../../model/assunto';
import { Planejamento } from '../../../model/planejamento';
import Estudante from '../../../model/estudante';
import { Dificuldade } from '../../../model/enums/dificuldade';
import { Router, ActivatedRoute } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import { LoginService } from 'src/app/login-module/login.service';
import { MessageService } from 'primeng/primeng';
//import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-cadastro-planejamento',
  templateUrl: './cadastro-planejamento.component.html',
  styleUrls: ['./cadastro-planejamento.component.css']
})
export class CadastroPlanejamentoComponent implements OnInit {

  dificuldades: SelectItem[];
  assuntos;
  index: number = 0;
  planejamento: Planejamento;
  id;
  isAlterar;



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
    let opcoesAssuntos = [
      { label: 'Selecione um Assunto', value: null },
    ];

    assuntos.forEach(assunto => {
      opcoesAssuntos.push({ label: assunto.nome, value: assunto });
    });

    return opcoesAssuntos;

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
  }

  cadastrarPlanejamento() {
    this.planejamento.validar().subscribe(validade => {
      this.planejamento.save().subscribe(resultado => {
        this.messageService.add({ severity: 'Sucesso', summary: 'Planejamento cadastrado', detail: 'Seu planejamento foi salvo com sucesso!' });
        this.router.navigate(["main", { outlets: { principal: ['listagem-planejamento'] } }])
      }, err => {
        //this.messageService.add({ severity: 'Erro', summary: 'Error Message', detail: err.toString() });
        alert(err.toString())
        // TODO: usar o message service
      })

    }, err => {
      //this.messageService.add({ severity: 'Erro', summary: 'Error Message', detail: err.toString() });
      alert(err.toString())
    });
  }





}
