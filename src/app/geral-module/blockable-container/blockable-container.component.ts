import { Component, ElementRef, OnInit } from '@angular/core';
import { BlockableUI } from 'primeng/api';

@Component({
  selector: 'app-blockable-container',
  templateUrl: './blockable-container.component.html',
  styleUrls: ['./blockable-container.component.css']
})
export class BlockableContainerComponent implements OnInit, BlockableUI {

  constructor(private el: ElementRef) { }

  getBlockableElement(): HTMLElement {
    return this.el.nativeElement.children[0];
  }

  ngOnInit(): void {
  }

}
