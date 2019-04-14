import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './juiz/editor/editor.component';
import { LoginComponent } from './login-module/login/login.component';
import { MainComponent } from './geral-module/main/main.component';
import { ProgressoComponent } from './analytics-module/progresso/progresso.component';
import { SelecionarPlanejamentoComponent } from './srl/selecionar-planejamento/selecionar-planejamento.component';
import { CadastroPlanejamentoComponent } from './srl/cadastro-planejamento/cadastro-planejamento.component';
import { AuthGuard } from './guards/auth.guard';
import { PaginaNaoEncontradaComponent } from './srl/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {path:"main", component:MainComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], children: [
    {path:"progresso", component:ProgressoComponent, outlet:"principal"},
    {path:"editor", component:EditorComponent, outlet:"principal"},
  ]},
  {path:"cadastro", component:CadastroPlanejamentoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  {path:"selecionar", component:SelecionarPlanejamentoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  {path:"", component:LoginComponent},
  {path:"**", component:PaginaNaoEncontradaComponent}
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
