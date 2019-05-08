import { Component, OnInit } from '@angular/core';
import AutoReflexao from 'src/app/model/autoReflexao';
import Estudante from 'src/app/model/estudante';
import { Message } from 'primeng/components/common/message';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { error } from '@angular/compiler/src/util';
import { Assunto } from 'src/app/model/assunto';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { NivelConfianca } from 'src/app/model/nivelConfianca';

@Component({
  selector: 'app-auto-reflexao',
  templateUrl: './auto-reflexao.component.html',
  styleUrls: ['./auto-reflexao.component.css']
})
export class AutoReflexaoComponent implements OnInit {

  autoReflexao: AutoReflexao;
  assunto: Assunto;
  msgs: Message[];
  niveisConfianca: SelectItem[];


  constructor(private router: Router, private route:ActivatedRoute) {
    // TODO: carregar assunto via router
    this.route.params.subscribe(params=>{
      if(params["id"] != undefined){
        
        this.assunto = new Assunto(params["id"], null, null, null, null);
      }else{
        this.msgs.push({ severity: 'error', summary: 'Erro', detail: 'Não é possível iniciar uma autoreflexão sem informar um assunto.' });
      }
    })

    
    // TODO: carregar do login
// <<<<<<< HEAD
//     this.autoReflexao = new AutoReflexao(this.assunto, new Estudante("12345", null, null, null, null), " ", " ", " ");
// =======
    this.autoReflexao = new AutoReflexao(null, this.assunto, 0, "", "", "");

  }

  ngOnInit() {

    this.msgs = [];

    this.niveisConfianca=[
      {label:'Selecione um nível de confiança', value:null},
      {label:'Pouco confiante', value: NivelConfianca.pouco},
      {label:'Confiante', value: NivelConfianca.normal},
      {label:'Muito confiante', value:NivelConfianca.alto},
    ];
  }

  salvar() {
    if(this.autoReflexao.validar()){
      
      this.autoReflexao.save().subscribe(resultado => {
        this.autoReflexao.pk = resultado.id;
        this.msgs.push({ severity: 'success', summary: 'Dados salvos com sucesso.' });
        this.router.navigate(["main", { outlets: { principal: ['srl-listagem-planejamento'] } }])
      })
    }else{
      this.msgs.push({ severity: 'error', summary: 'Erro', detail: 'Preencha os dados corretamente.' });
    }
    /*if (this.autoReflexao.isValido = false) {
      
    } else {
      this.autoReflexao.save().subscribe(resultado => {
        this.autoReflexao.pk = resultado.id;
        this.showSuccess();
        this.router.navigate(['planejamento/listar']);
      })
    }*/
  }
  
}
