import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Export from 'src/app/model/experimento/export';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-matriz-transicao',
  templateUrl: './matriz-transicao.component.html',
  styleUrls: ['./matriz-transicao.component.css']
})
export class MatrizTransicaoComponent implements OnChanges {


  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
   

    
  }

  ngOnInit(): void {
    let objetos = []

    objetos.push({"index":{"listagem-atividades-grupo":0.5,"listagem-assuntos":0.5},"listagem-assuntos":{"listagem-diarios":0.25,"visualizacao-assunto":0.75},"listagem-diarios":{"listagem-atividades-grupo":1},"meu-desempenho":{"listagem-assuntos":1},"visualizacao-assunto":{"visualizacao-questao-fechada":0.55,"visualizacao-assunto":0.18,"self-instruction":0.27},"visualizacao-questao-fechada":{"visualizacao-questao-fechada":0.6,"visualizacao-assunto":0.3,"self-instruction":0.1},"self-instruction":{"editor":1},"editor":{"visualizacao-questao-fechada":0.5,"editor":0.25,"listagem-assuntos":0.25}});
    objetos.push({"index":{"index":0.45,"listagem-atividades-grupo":0.09,"listagem-assuntos":0.27,"listagem-diarios":0.09,"visualizacao-assunto":0.09},"meu-desempenho":{"listagem-diarios":0.5,"listagem-assuntos":0.5},"listagem-diarios":{"listagem-assuntos":0.67,"meu-desempenho":0.33},"listagem-assuntos":{"visualizacao-assunto":0.92,"ranking":0.08},"visualizacao-assunto":{"visualizacao-questao-fechada":0.75,"self-instruction":0.25},"visualizacao-questao-fechada":{"visualizacao-questao-fechada":0.57,"self-instruction":0.12,"visualizacao-assunto":0.3,"listagem-assuntos":0.01},"self-instruction":{"editor":0.81,"self-instruction":0.05,"listagem-assuntos":0.14},"editor":{"visualizacao-questao-fechada":0.35,"editor":0.12,"index":0.18,"self-instruction-editor":0.29,"self-instruction":0.06},"self-instruction-editor":{"editor":0.4,"listagem-assuntos":0.6},"ranking":{"listagem-diarios":1}});
  
    // pegar key
    // 
  
  }

}
