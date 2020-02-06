import { Component, OnDestroy, OnInit } from '@angular/core';
import Usuario from './model/usuario';
import Experiment from './model/experimento/experiment';
import { configuracao } from './model/experimento/old_check_to_delete/config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  ngOnInit(): void {
  }

  title = 'letscode';

  constructor(){
    Experiment.start(configuracao);
  }
}


