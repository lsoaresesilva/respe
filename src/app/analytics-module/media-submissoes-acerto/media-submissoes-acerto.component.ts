import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-submissoes-acerto',
  templateUrl: './media-submissoes-acerto.component.html',
  styleUrls: ['./media-submissoes-acerto.component.css'],
})
export class MediaSubmissoesAcertoComponent implements OnInit {
  @Input()
  mediaSubmissoes;

  constructor() {}

  ngOnInit(): void {}
}
