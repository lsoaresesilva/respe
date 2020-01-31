import { NgModule } from '@angular/core';
import { EscapeHtmlPipe } from './keep-html.pipe';


@NgModule({
  declarations: [EscapeHtmlPipe],
  exports:[EscapeHtmlPipe]
})
export class SharedPipesModule { }

