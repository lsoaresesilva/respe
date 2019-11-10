import { Component, OnDestroy } from '@angular/core';
import Usuario from './model/usuario';
import Experiment from './model/experimento/lib/experiment';
import { configuracao } from './model/experimento/lib/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'letscode';

  constructor(){
    Experiment.start(configuracao);
  }
}


