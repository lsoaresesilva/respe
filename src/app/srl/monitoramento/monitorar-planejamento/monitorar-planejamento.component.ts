import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Planejamento } from 'src/app/model/planejamento';
import { Assunto } from 'src/app/model/assunto';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-monitorar-planejamento',
  templateUrl: './monitorar-planejamento.component.html',
  styleUrls: ['./monitorar-planejamento.component.css']
})
export class MonitorarPlanejamentoComponent implements OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    let usuario = this.loginService.getUsuarioLogado();
    if(this.planejamento.assunto != null && usuario != null){
      Assunto.calcularPercentualConclusao(this.planejamento.assunto, usuario).subscribe(percentual=>{
        this.planejamento.percentualConclusao = percentual;
      })
    }
    
  }


  @Input()
  planejamento:Planejamento;

  constructor(private loginService:LoginService) { }

  ngOnInit() {
    
  }

}
