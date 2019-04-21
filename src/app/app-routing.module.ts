import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor-module/editor/editor.component';
import { LoginComponent } from './login-module/login/login.component';
import { MainComponent } from './geral-module/main/main.component';
import { ProgressoComponent } from './analytics-module/progresso/progresso.component';
import { SelecionarPlanejamentoComponent } from './srl/selecionar-planejamento/selecionar-planejamento.component';
import { CadastroPlanejamentoComponent } from './srl/cadastro-planejamento/cadastro-planejamento.component';
import { CadastrarQuestoesComponent } from './juiz/cadastrar-questoes/cadastrar-questoes.component';
import { CadastrarTesteCaseComponent } from './juiz/cadastrar-teste-case/cadastrar-teste-case.component';
import { ListarQuestoesComponent } from './juiz/listar-questoes/listar-questoes.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"main", component:MainComponent, children: [
  {path:"progresso", component:ProgressoComponent, outlet:"principal"},
  {path:"editor", component:EditorComponent, outlet:"principal"},
  ]},
  {path:"cadastro", component:CadastroPlanejamentoComponent},
  {path:"selecionar", component:SelecionarPlanejamentoComponent},
  {path:"cadastrar/questao", component:CadastrarQuestoesComponent},
  {path:"cadastrar/testeCase", component:CadastrarTesteCaseComponent},
  {path:"Listar/Questoes", component:ListarQuestoesComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
