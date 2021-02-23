import { Component, OnInit } from '@angular/core';
import Diario from 'src/app/model/srl/diario';
import { LoginService } from 'src/app/login-module/login.service';
import { MessageService, SelectItem } from 'primeng/api';
import { NivelConfianca } from 'src/app/model/nivelConfianca';
import { ObjetivosExercicios } from 'src/app/model/enums/objetivosExercicios';
import { Motivacao } from 'src/app/model/enums/motivacao';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css'],
})
export class DiarioComponent implements OnInit {
  display;
  diario: Diario;
  niveisObjetivosExercicios: SelectItem[];
  niveisConfianca: SelectItem[];

  motivacao: SelectItem[];

  constructor(private login: LoginService, private messageService: MessageService) {
    this.diario = new Diario(null, "", "", null, null, null, null, this.login.getUsuarioLogado());
    this.display = false;
  }

  ngOnInit() {
    this.apresentarDiario();

    this.niveisConfianca = [
      { label: 'Selecione um nível de confiança', value: null },
      { label: 'Pouco confiante', value: NivelConfianca.pouco },
      { label: 'Confiante', value: NivelConfianca.normal },
      { label: 'Muito confiante', value: NivelConfianca.alto },
    ];

    this.niveisObjetivosExercicios = [
      { label: 'Selecione um objetivo', value: null },
      { label: 'de 1 a 3 exercícios', value: ObjetivosExercicios.umAtres },
      { label: 'de 4 a 6 exercícios', value: ObjetivosExercicios.quatroAseis },
      { label: 'Mais que 6 exercícios', value: ObjetivosExercicios.maisSeis },
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

  apresentarDiario() {
    Diario.possuiDiarioAtualizado(this.login.getUsuarioLogado()).subscribe((resultado) => {
      this.display = !resultado;
    });
  }

  salvar() {
    if (this.diario.validar()) {
      this.diario.save().subscribe(
        () => {},
        () => {},
        () => {
          this.display = false;
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'É preciso preencher os campos',
        detail: 'Antes de avançar é preciso responder as perguntas. Lembre-se que bas perguntas abertas você deve escrever no mínimo 50 caracteres.',
      });
    }
  }

  contagemCaracteres(referencia:string){
    let restante = 50-referencia.length
    return restante <= 0?0:restante;
  }
}
