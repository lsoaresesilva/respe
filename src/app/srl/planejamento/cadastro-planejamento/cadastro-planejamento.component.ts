import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Assunto } from '../../../model/assunto';
import { Planejamento } from '../../../model/planejamento';
import { Dificuldade } from '../../../model/enums/dificuldade';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import { MessageService } from 'primeng/api';
import { Motivacao } from 'src/app/model/enums/motivacao';
import { ObjetivosExercicios } from 'src/app/model/enums/objetivosExercicios';
import { ObjetivosVideo } from 'src/app/model/enums/objetivosVideo';
import { ObjetivosDesempenho } from 'src/app/model/enums/objetivosDesempenho';
// import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-cadastro-planejamento',
  templateUrl: './cadastro-planejamento.component.html',
  styleUrls: ['./cadastro-planejamento.component.css'],
})
export class CadastroPlanejamentoComponent implements OnInit {
  dificuldades: SelectItem[];
  motivacao: SelectItem[];
  niveisObjetivosExercicios: SelectItem[];
  niveisObjetivosVideo: SelectItem[];
  niveisObjetivosDesempenho: SelectItem[];

  index = 0;
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
    this.planejamento = new Planejamento(
      null,
      this.login.getUsuarioLogado(),
      0,
      '',
      false,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id !== undefined) {
        this.isAlterar = true;
        Planejamento.get(this.id).subscribe((resultado) => {
          this.planejamento = resultado;
          this.planejamento.estudante = this.login.getUsuarioLogado();
        });
      }
    });

    this.dificuldades = [
      { label: 'Selecione uma dificuldade', value: null },
      { label: 'Muito fácil', value: Dificuldade.muitoFacil },
      { label: 'Fácil', value: Dificuldade.facil },
      { label: 'Normal', value: Dificuldade.medio },
      { label: 'Difícil', value: Dificuldade.dificil },
      { label: 'Muito difícil', value: Dificuldade.muitoDificil },
    ];

    this.motivacao = [
      { label: 'Selecione um nível de motivação', value: null },
      { label: 'Não estou', value: Motivacao.nenhuma },
      { label: 'Pouco', value: Motivacao.pouco },
      { label: 'Normal', value: Motivacao.normal },
      { label: 'Estou motivado', value: Motivacao.motivado },
      { label: 'Estou muito motivado', value: Motivacao.muitoMotivado },
    ];

    this.niveisObjetivosExercicios = [
      { label: 'Selecione um objetivo', value: null },
      { label: 'de 1 a 3 exercícios', value: ObjetivosExercicios.umAtres },
      { label: 'de 4 a 6 exercícios', value: ObjetivosExercicios.quatroAseis },
      { label: 'Mais que 6 exercícios', value: ObjetivosExercicios.maisSeis },
    ];

    this.niveisObjetivosVideo = [
      { label: 'Selecione um objetivo', value: null },
      { label: 'de 1 a 3 vídeos', value: ObjetivosVideo.umAtres },
      { label: 'de 4 a 6 vídeos', value: ObjetivosVideo.quatroAseis },
      { label: 'Mais que 6 vídeos', value: ObjetivosVideo.maisSeis },
    ];

    this.niveisObjetivosDesempenho = [
      { label: 'Selecione um objetivo', value: null },
      { label: 'Alcançar uma nota final igual a 6', value: ObjetivosDesempenho.notaIgualSeis },
      {
        label: 'Alcançar uma nota final maior que 6 e menor que 8',
        value: ObjetivosDesempenho.maiorSeisMenorOito,
      },
      { label: 'Alcançar uma nota final maior que 8', value: ObjetivosDesempenho.maiorOito },
    ];
  }

  cadastrarPlanejamento() {
    this.planejamento.validar().subscribe(
      (validade) => {
        this.planejamento.save().subscribe(
          (resultado) => {
            this.messageService.add({
              severity: 'Sucesso',
              summary: 'Planejamento cadastrado',
              detail: 'Seu planejamento foi salvo com sucesso!',
            });
            this.router.navigate(['main', { outlets: { principal: ['listagem-planejamento'] } }]);
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Houve um erro:',
              detail: err.toString(),
            });
          }
        );
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Houve um erro:',
          detail: err.toString(),
        });
      }
    );
  }
}
