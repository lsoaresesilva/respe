import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Assunto } from 'src/app/model/aprendizagem/questoes/assunto';
import { QuestaoProgramacaoRegex } from '../../model/aprendizagem/questoes/questaoProgramacaoRegex';

@Component({
  selector: 'app-cadastrar-questao-regex',
  templateUrl: './cadastrar-questao-regex.component.html',
  styleUrls: ['./cadastrar-questao-regex.component.css']
})
export class CadastrarQuestaoRegexComponent implements OnInit {

  assunto: Assunto;
  isAlterar: boolean;
  questao: QuestaoProgramacaoRegex;


  regex = '';

  constructor(private activatedRoute: ActivatedRoute, private messageService: MessageService, private router: Router,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['assuntoId'] != undefined) {
        Assunto.get(params['assuntoId']).subscribe((assunto) => {

          this.assunto = assunto;

          if (params['questaoId'] != undefined) {
            this.isAlterar = true;
            this.questao = assunto.getQuestaoRegexById(params['questaoId']);
            if(this.questao != null){
              this.questao.carregarConceitos();


              if (Array.isArray(this.questao.regex)) {

                this.questao.regex.forEach(reg => {
                  this.regex = this.regex.concat(reg + '\n');
                });

              }
            }


          }
        });
      }
    });
  }

  async salvar(){

    this.questao.ordem =
      this.questao.ordem !== 0 ? this.questao.ordem : await this.assunto.getUltimaSequencia();

    if (this.questao.validar()) {

    this.questao.regex = [];
    this.regex.trim().split('\n').forEach((reg) => {
      if (reg !== '') {
        this.questao.regex.push(reg);
      }

    });

    this.assunto.save().subscribe(
      (resultado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Questão cadastrada com sucesso',
        });
        this.router.navigate([
          'geral/main',
          { outlets: { principal: ['admin', 'visualizar-assunto-admin', this.assunto.pk()] } },
        ]);
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Houve uma falha no cadastro da questão. Por favor, tente novamente.',
        });
      }
    );
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É preciso informar todos os campos do formulário',
      });
    }
  }

}
