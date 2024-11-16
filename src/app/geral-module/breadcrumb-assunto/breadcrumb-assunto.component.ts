import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';


@Component({
  selector: 'app-breadcrumb-assunto',
  templateUrl: './breadcrumb-assunto.component.html',
  styleUrls: ['./breadcrumb-assunto.component.css']
})
export class BreadcrumbAssuntoComponent implements OnInit {

  navegacao;

  constructor(private breadcrumbService:BreadcrumbService) { }

  ngOnInit() {
    this.navegacao = this.breadcrumbService.navegacao
  }

}
