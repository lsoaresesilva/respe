import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { FormsModule } from '@angular/forms';
import { AppGlobalErrorhandler } from './gerenciar-erros-brython';
import { RastrearErrosPythonService } from './rastrear-erros-python.service';

@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, FormsModule],
  exports: [EditorComponent],
  providers: [
    RastrearErrosPythonService,
    { provide: ErrorHandler, useClass: AppGlobalErrorhandler },
  ],
})
export class GameBasedLearningModule {}
