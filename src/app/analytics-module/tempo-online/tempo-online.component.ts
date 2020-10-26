import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tempo-online',
  templateUrl: './tempo-online.component.html',
  styleUrls: ['./tempo-online.component.css'],
})
export class TempoOnlineComponent implements OnInit {
  @Input()
  tempoOnline;

  constructor() {}

  ngOnInit(): void {}
}
