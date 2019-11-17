import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuEstudanteComponent } from './menu-estudante/menu-estudante.component';
import {MenubarModule} from 'primeng/menubar';
import { MenuAdmComponent } from './menu-adm/menu-adm.component';
import { MenuProfessorComponent } from './menu-professor/menu-professor.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [MenuEstudanteComponent, MenuAdmComponent, MenuProfessorComponent, TelaInicialComponent, HomeComponent],
  imports: [
    CommonModule,
    MenubarModule
  ],
  providers:[],
  exports :[MenuEstudanteComponent, MenuAdmComponent,  MenuProfessorComponent,TelaInicialComponent],
})
export class GeralModuleModule { }
