import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuEstudanteComponent } from './menu-estudante/menu-estudante.component';
import {MenubarModule} from 'primeng/menubar';


@NgModule({
  declarations: [MenuEstudanteComponent],
  imports: [
    CommonModule,
    MenubarModule,
  
     
    
  ],
  providers:[],
  exports :[MenuEstudanteComponent]
})
export class GeralModuleModule { }
