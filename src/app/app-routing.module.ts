import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-module/login/login.component';
import { MainComponent } from './geral-module/main/main.component';
import { ProgressoComponent } from './analytics-module/progresso/progresso.component';
import { SelecionarPlanejamentoComponent } from './srl/selecionar-planejamento/selecionar-planejamento.component';
import { CadastroPlanejamentoComponent } from './srl/cadastro-planejamento/cadastro-planejamento.component';
import { EditorProgramacaoComponent } from './juiz/editor-programacao/editor-programacao.component';
import { ComentariosCodigoComponent } from './cscl/comentarios-codigo/comentarios-codigo';
import { VisualizarConteudoComponent } from './cscl/visualizar-conteudo/visualizar-conteudo.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"main", component:MainComponent, children: [
    {path:"progresso", component:ProgressoComponent, outlet:"principal"},
    {path:"editor", component:EditorProgramacaoComponent, outlet:"principal"},
    {path:"anotar", component:ComentariosCodigoComponent, outlet:"principal"},
    {path:"visualizarConteudo", component:VisualizarConteudoComponent, outlet:"principal"}
  ]},
  {path:"cadastro", component:CadastroPlanejamentoComponent},
  {path:"selecionar", component:SelecionarPlanejamentoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
