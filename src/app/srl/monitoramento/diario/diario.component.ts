import { Component, OnInit } from '@angular/core';
import Diario from 'src/app/model/srl/diario';
import { LoginService } from 'src/app/login-module/login.service';
import { MessageService, SelectItem } from 'primeng/api';
import { NivelConfianca } from 'src/app/model/nivelConfianca';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css'],
})
export class DiarioComponent implements OnInit {
  display;
  diario: Diario;

  niveisConfianca: SelectItem[];

  constructor(private login: LoginService, private messageService: MessageService) {
    this.diario = new Diario(null, null, null, null, this.login.getUsuarioLogado());
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
        detail: 'Antes de avançar é preciso responder as perguntas.',
      });
    }
  }
}
