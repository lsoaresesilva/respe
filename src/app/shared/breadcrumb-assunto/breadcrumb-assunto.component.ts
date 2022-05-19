import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-breadcrumb-assunto',
  templateUrl: './breadcrumb-assunto.component.html',
  styleUrls: ['./breadcrumb-assunto.component.css']
})
export class BreadcrumbAssuntoComponent implements OnInit {


  @Input()
  assunto;

  @Input()
  questao;



  constructor() { }

  ngOnInit() {
  }

}
