import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import ResultadoTestCase from 'src/app/model/resultadoTestCase';
import { FireStoreQuery } from 'src/app/firebase-odm/entity/query';
import TestCase from 'src/app/model/testCase';

@Component({
  selector: 'app-visualizar-testes',
  templateUrl: './visualizar-testes.component.html',
  styleUrls: ['./visualizar-testes.component.css']
})
export class VisualizarTestesComponent implements OnInit {

  @Input() resultados;

  constructor() { 
    
    
  }

  ngOnInit() {


  }

}
