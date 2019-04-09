import { Component, OnInit } from '@angular/core';
import AutoReflexao from 'src/app/model/autoReflexao';
import Estudante from 'src/app/model/estudante';
import { Message } from 'primeng/components/common/message';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { error } from '@angular/compiler/src/util';
import { Assunto } from 'src/app/model/assunto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auto-reflexao',
  templateUrl: './auto-reflexao.component.html',
  styleUrls: ['./auto-reflexao.component.css']
})
export class AutoReflexaoComponent implements OnInit {

  autoReflexao: AutoReflexao;
  assunto: Assunto;
  msgs: Message[];
  id: "12345";


  constructor(private router: Router) {
    this.assunto = new Assunto("pVH6LewMxIKM73ep2n1N");
    this.autoReflexao = new AutoReflexao(this.assunto, new Estudante("12345"), " ", " ", " ");
  }

  ngOnInit() {
  }

  salvar() {
    if (this.autoReflexao.acoesSucesso == "" || this.autoReflexao.acoesFracasso == "") {
      this.showError();
    } else {
      this.autoReflexao.save().subscribe(resultado => {
        this.autoReflexao.pk = resultado.id;        
          this.showSuccess();
          // rota para listagem de planejamentos
      })
    }
  }
  showError() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Erro', detail: 'Preencha os dados corretamente.' });
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Formulário enviado com sucesso!' });
  }

}
