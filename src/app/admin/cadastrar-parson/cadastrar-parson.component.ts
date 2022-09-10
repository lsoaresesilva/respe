import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import SegmentoParson from 'src/app/model/aprendizagem/questoes/segmentoParson';
import { Assunto } from '../../model/aprendizagem/questoes/assunto';
import { Dificuldade } from '../../model/aprendizagem/questoes/enum/dificuldade';
import { OrientacaoParson } from '../../model/aprendizagem/questoes/enum/orientacaoParson';
import QuestaoParsonProblem from '../../model/aprendizagem/questoes/questaoParsonProblem';
@Component({
  selector: 'app-cadastrar-parson',
  templateUrl: './cadastrar-parson.component.html',
  styleUrls: ['./cadastrar-parson.component.css'],
})
export class CadastrarParsonComponent implements OnInit {
  assunto?: Assunto;
  questao?: QuestaoParsonProblem;
  isAlterar;
  dificuldades: SelectItem[];
  orientacoes: SelectItem[];

  segmentos = '';
  sequenciaCorreta = '';
  algoritmoInicial = '';

  items: MenuItem[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isAlterar = false;
    this.activatedRoute.params.subscribe((params) => {
      if (params['assuntoId'] !== undefined) {
        Assunto.get(params['assuntoId']).subscribe((assunto: Assunto) => {
          const menuItems = [];
          this.assunto = assunto;
          menuItems.push(
            {label: this.assunto.nome, command: (click) => {this.router.navigate([
              'geral/main',
              { outlets: { principal: ['admin', 'visualizar-assunto-admin', assunto.pk()] } },
            ]); }}
          );

          if (params['questaoId'] != undefined) {
            this.isAlterar = true;
            this.questao = assunto.getQuestaoParsonById(params['questaoId']);
            this.questao.carregarConceitos();

            menuItems.push(
              {label: this.questao.nomeCurto},
              {label: 'Alterar questão'}
            );
            this.items = menuItems;

            // Preparar os dados de questão para serem exibidos na interface da forma adequada
            if (Array.isArray(this.questao.segmentos)) {

              this.questao.segmentos.forEach(segmento => {
                this.segmentos = this.segmentos.concat(segmento.conteudo + '\n');
              });

            }

            if(Array.isArray(this.questao.sequenciaCorreta)){

              this.questao.sequenciaCorreta.forEach(sequencia => {
                this.sequenciaCorreta = this.sequenciaCorreta.concat(sequencia + '\n');
              });
            }

            if(Array.isArray(this.questao.algoritmoInicial)){
              this.questao.algoritmoInicial.forEach(codigo => {
                this.algoritmoInicial = this.algoritmoInicial.concat(codigo + '\n');
              });
            }
          }
        });
      }
    });

    this.dificuldades = [
      { label: 'Selecione uma dificuldade', value: null },
      { label: 'Facíl', value: Dificuldade.facil },
      { label: 'intermediário', value: Dificuldade.medio },
      { label: 'Difícil', value: Dificuldade.dificil },

    ];

    this.orientacoes = [
      { label: 'Selecione uma orientacao', value: null },
      { label: 'Vertical', value: OrientacaoParson.vertical },
      { label: 'Horizontal', value: OrientacaoParson.horizontal },
    ];
  }

  alterarConceitos(conceitos) {
    this.questao.conceitos = conceitos;
  }

  async cadastrar() {
    // TODO: Migrar isso para dentro do model Questao
    this.questao.ordem =
      this.questao.ordem !== 0 ? this.questao.ordem : await this.assunto.getUltimaSequencia();

    if (this.questao.validar()) {


      if (this.assunto.questoesFechadas == null) {
        this.assunto.questoesFechadas = [];
      }

      if (this.isAlterar === false) {
        this.assunto.questoesParson.push(this.questao);
      }

      let contadorSegmentos = 1;

      if (typeof this.segmentos === 'string') {

        this.questao.segmentos = [];
        this.segmentos.split('\n').forEach((segmento) => {
          if (segmento !== '') {
            this.questao.segmentos.push(new SegmentoParson(null, segmento, contadorSegmentos));
          contadorSegmentos += 1;
          }

        });
      }

      if (typeof this.sequenciaCorreta === 'string') {
        this.questao.sequenciaCorreta = this.sequenciaCorreta.trim().split('\n');
      }

      if (typeof this.algoritmoInicial === 'string') {
        this.questao.algoritmoInicial = [];
        this.algoritmoInicial.split('\n').forEach((codigo) => {
          if (codigo !== '') {
            this.questao.algoritmoInicial.push(new SegmentoParson(null, codigo, contadorSegmentos));
          contadorSegmentos += 1;
          }
        });
      }

      this.assunto.save().subscribe(
        (resultado) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Questão cadastrada com sucesso',
          });
          this.router.navigate([
            'geral/main',
            { outlets: { principal: ['visualizar-assunto-admin', this.assunto.pk()] } },
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
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É preciso informar todos os campos do formulário',
      });
    }
  }
}
