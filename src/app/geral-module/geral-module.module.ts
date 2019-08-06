import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuEstudanteComponent } from './menu-estudante/menu-estudante.component';
import {MenubarModule} from 'primeng/menubar';
<<<<<<< HEAD
=======

>>>>>>> b96e347c6f87eaf79b39eecd8d1b77db9dc74eca

@NgModule({
  declarations: [MenuEstudanteComponent],
  imports: [
    CommonModule,
<<<<<<< HEAD
    MenubarModule
  ],
  providers:[],
  exports :[MenuEstudanteComponent],
=======
    MenubarModule,
  
     
    
  ],
  providers:[],
  exports :[MenuEstudanteComponent]
>>>>>>> b96e347c6f87eaf79b39eecd8d1b77db9dc74eca
})
export class GeralModuleModule { }
