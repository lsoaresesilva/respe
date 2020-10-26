import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-erros',
  templateUrl: './total-erros.component.html',
  styleUrls: ['./total-erros.component.css'],
})
export class TotalErrosComponent implements OnInit {
  @Input()
  totalErrosProgramacao;

  constructor() {}

  ngOnInit(): void {}
}
