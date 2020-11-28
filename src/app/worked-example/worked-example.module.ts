import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarWorkedExampleComponent } from './visualizar-worked-example/visualizar-worked-example.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CodeHighlighterModule } from 'primeng/codehighlighter';

@NgModule({
  declarations: [VisualizarWorkedExampleComponent],
  imports: [CommonModule, ToolbarModule, ButtonModule, CodeHighlighterModule],
  exports: [VisualizarWorkedExampleComponent],
})
export class WorkedExampleModule {}
