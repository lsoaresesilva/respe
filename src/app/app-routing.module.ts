import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-module/login/login.component';
import { MainComponent } from './geral-module/main/main.component';
import { ProgressoComponent } from './analytics-module/progresso/progresso.component';
import { SelecionarPlanejamentoComponent } from './srl/selecionar-planejamento/selecionar-planejamento.component';
import { CadastroPlanejamentoComponent } from './srl/cadastro-planejamento/cadastro-planejamento.component';
import { AutoReflexaoComponent } from './srl/auto-reflexao/auto-reflexao.component';

import { AuthGuard } from './guards/auth.guard';
import { PaginaNaoEncontradaComponent } from './srl/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { EditorProgramacaoComponent } from './juiz/editor-programacao/editor-programacao.component';
import { ComentariosCodigoComponent } from './cscl/comentarios-codigo/comentarios-codigo';
import { VisualizarConteudoComponent } from './cscl/visualizar-conteudo/visualizar-conteudo.component';
import { CadastrarQuestoesComponent } from './juiz/cadastrar-questoes/cadastrar-questoes.component';
import { CadastrarTesteCaseComponent } from './juiz/cadastrar-teste-case/cadastrar-teste-case.component';
import { ListarQuestoesComponent } from './juiz/listar-questoes/listar-questoes.component';
import { VisualizarQuestaoComponent } from './juiz/visualizar-questao/visualizar-questao.component';
import { CadastrarAssuntoComponent } from './juiz/cadastrar-assunto/cadastrar-assunto.component';
import { ListarAssuntosComponent } from './juiz/listar-assuntos/listar-assuntos.component';
import { VisualizarAssuntoComponent } from './juiz/visualizar-assunto/visualizar-assunto.component';


const routes: Routes = [
  {path:"main", component:MainComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], children: [
    {path:"progresso", component:ProgressoComponent, outlet:"principal"},
    {path:"editor", component:EditorProgramacaoComponent, outlet:"principal"},
    {path:"anotar", component:ComentariosCodigoComponent, outlet:"principal"},
    {path:"visualizarConteudo", component:VisualizarConteudoComponent, outlet:"principal"}
  ]},
  {path:"cadastro", component:CadastroPlanejamentoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  {path:"selecionar", component:SelecionarPlanejamentoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  {path:"", component:LoginComponent},
  {path:"autoreflexao", component:AutoReflexaoComponent},
  {path:"questao/:id", component:CadastrarQuestoesComponent},
  {path:"assunto", component:CadastrarAssuntoComponent},
  {path:"assunto/:id", component:CadastrarAssuntoComponent},
  {path:"questao", component:CadastrarQuestoesComponent},
  {path:"testCase", component:CadastrarTesteCaseComponent},
  {path:"Listar/Questoes", component:ListarQuestoesComponent},
  {path:"Listar/Assuntos", component:ListarAssuntosComponent},
  {path:"Visualizar/Questao/:id", component:VisualizarQuestaoComponent},
  {path:"Visualizar/Assunto/:id", component:VisualizarAssuntoComponent},
  {path:"**", component:PaginaNaoEncontradaComponent}
];


@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
