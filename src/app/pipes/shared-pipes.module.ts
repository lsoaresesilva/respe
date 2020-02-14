import { NgModule } from '@angular/core';
import { EscapeHtmlPipe } from './keep-html.pipe';
import { TypeofPipe } from './typeof.pipe';


@NgModule({
  declarations: [EscapeHtmlPipe, TypeofPipe],
  exports:[EscapeHtmlPipe, TypeofPipe]
})
export class SharedPipesModule { }

