import { Component, OnInit } from '@angular/core';
import AutoReflexao from 'src/app/model/autoReflexao';
import Estudante from 'src/app/model/estudante';
import { Message } from 'primeng/components/common/message';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-auto-reflexao',
  templateUrl: './auto-reflexao.component.html',
  styleUrls: ['./auto-reflexao.component.css']
})
export class AutoReflexaoComponent implements OnInit {

  autoReflexao: AutoReflexao;
  msgs: Message[];
  private autoreflexao_srl: AngularFirestoreCollection<any>;


  constructor() {
    this.autoReflexao = new AutoReflexao(null, new Estudante("12345"), " ", " ", " ");
  }

  ngOnInit() {
  }

  salvar() {
    if (this.autoReflexao.acoesSucesso == "" || this.autoReflexao.acoesFracasso == "") {
      this.showError();
    } else {
      this.autoReflexao.save().subscribe(resultado => {
        this.autoreflexao_srl.add(this.autoReflexao.objectToDocument()).then(resultado => {
          this.showSuccess();

        }).catch(error)

      })
    }
  }
  showError() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Erro', detail: 'Preencha os dados corretamente.' });
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Formulário respondido com sucesso!' });
  }

}
