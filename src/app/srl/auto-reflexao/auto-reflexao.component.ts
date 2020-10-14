import { Component, OnInit } from '@angular/core';
import AutoReflexao from 'src/app/model/autoReflexao';
import { Message } from 'primeng/api';
import { Assunto } from 'src/app/model/assunto';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { NivelConfianca } from 'src/app/model/nivelConfianca';
import { Planejamento } from 'src/app/model/planejamento';

@Component({
  selector: 'app-auto-reflexao',
  templateUrl: './auto-reflexao.component.html',
  styleUrls: ['./auto-reflexao.component.css']
})
export class AutoReflexaoComponent implements OnInit {

  planejamento: Planejamento;
  msgs: Message[];
  niveisConfianca: SelectItem[];


  constructor(private router: Router, private route:ActivatedRoute) {
    // TODO: carregar assunto via router
    this.route.params.subscribe(params=>{
      if(params["id"] != undefined){

        Planejamento.get(params["id"]).subscribe(planejamento=>{
          this.planejamento = planejamento;
          if(this.planejamento.autoReflexao == null){
            this.planejamento.autoReflexao = new AutoReflexao(0, "", "", "");
          }
        }, err=>{
          this.msgs.push({ severity: 'error', summary: 'Erro', detail: 'Não é possível iniciar uma autoreflexão com um planejamento inválido.' });
        })
      }else{
        this.msgs.push({ severity: 'error', summary: 'Erro', detail: 'Não é possível iniciar uma autoreflexão sem informar um planejamento.' });
      }
    })



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
    if(this.planejamento.autoReflexao.validar()){

      this.planejamento.save().subscribe(resulado=>{
        this.msgs.push({ severity: 'success', summary: 'Dados salvos com sucesso.' });
        this.router.navigate(["main", { outlets: { principal: ['listagem-planejamento'] } }])
      })
    }else{
      this.msgs.push({ severity: 'error', summary: 'Erro', detail: 'Preencha os dados corretamente.' });
    }
  }

}
