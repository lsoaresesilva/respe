import { Component, OnInit, Input, OnChanges } from '@angular/core';
import AnaliseDesempenhoEstudante from 'src/app/model/srl/analiseDesempenho';
import FrequenciaErro from 'src/app/model/errors/analise-compilacao/frequenciaErro';

@Component({
  selector: 'app-analise-desempenho-estudante',
  templateUrl: './analise-desempenho-estudante.component.html',
  styleUrls: ['./analise-desempenho-estudante.component.css']
})
export class AnaliseDesempenhoEstudanteComponent implements OnChanges {
  

  analise;
  @Input()
  erros;

  constructor() { 
    this.analise = "";
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(this.erros != null){
      let frequencia = FrequenciaErro.calcularFrequenciaPorTipoErro(this.erros);
      let frequenciaOrdenada = FrequenciaErro.getTopErros(frequencia);
      this.analise = AnaliseDesempenhoEstudante.analisarDesempenho(frequenciaOrdenada);
    }
  }

}
