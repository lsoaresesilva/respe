import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-module/login/login.component';
import { MainComponent } from './geral-module/main/main.component';
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
import { CadastrarEstudantesComponent } from './juiz/cadastrar-estudantes/cadastrar-estudantes.component';
import { ListarEstudantesComponent } from './juiz/listar-estudantes/listar-estudantes.component';
import { CadastrarTurmaComponent } from './juiz/cadastrar-turma/cadastrar-turma.component';
import { ListarTurmaComponent } from './juiz/listar-turma/listar-turma.component';

import { VisualizarExecucacao } from './juiz/vizualizar-execucao/vizualizar-execucao.component';
import { ListarPlanejamentosComponent } from './srl/listar-planejamentos/listar-planejamentos.component';
import { VisualizarPlanejamentoComponent } from './srl/vizualizar-planejamento/visualizar-planejamento.component';

import { VisualizarQuestaoComponent } from './juiz/visualizar-questao/visualizar-questao.component';
import { CadastrarQuestoesFechadasComponent } from './juiz/cadastrar-questoes-fechadas/cadastrar-questoes-fechadas.component';
import { CadastrarAlternativasComponent } from './juiz/cadastrar-alternativas/cadastrar-alternativas.component';
import { ListarQuestoesFechadasComponent } from './juiz/listar-questoes-fechadas/listar-questoes-fechadas.component';
import { VisualizarQuestaoFechadaComponent } from './juiz/visualizar-questao-fechada/visualizar-questao-fechada.component';
import { CadastrarAssuntosComponent } from './juiz/cadastrar-assuntos/cadastrar-assuntos.component';
import { ListarAssuntosComponent } from './juiz/listar-assuntos/listar-assuntos.component';
import { VisualizarAssuntoComponent } from './juiz/visualizar-assunto/visualizar-assunto.component';


const routes: Routes = [
  {path:"editor", component:EditorProgramacaoComponent}, // TODO: remover depois
  {path:"main", component:MainComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], children: [
    {path:"editor/:id", component:EditorProgramacaoComponent, outlet:"principal"},
    
    {path:"comentario-codigo/:id", component:ComentariosCodigoComponent, outlet:"principal"},
    {path:"visualizarConteudo", component:VisualizarConteudoComponent, outlet:"principal"},
    {path:"visualizacao-planejamento/:id", component:VisualizarPlanejamentoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"cadastro-planejamento", component:CadastroPlanejamentoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"listagem-planejamento", component:ListarPlanejamentosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"srl-autoreflexao/:id", component:AutoReflexaoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"cadastro-questao", component:CadastrarQuestoesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"cadastro-questao-fechada", component:CadastrarQuestoesFechadasComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"atualizacao-questao/:id", component:CadastrarQuestoesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"atualizacao-questao-fechada/:id", component:CadastrarQuestoesFechadasComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"cadastro-assunto", component:CadastrarAssuntosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"atualizacao-questao/:id", component:CadastrarQuestoesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"atualizacao-assunto/:id", component:CadastrarAssuntosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"listagem-questoes", component:ListarQuestoesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"listagem-assuntos", component:ListarAssuntosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"cadastro-estudante", component:CadastrarEstudantesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"atualizacao-estudante/:id", component:CadastrarEstudantesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"listagem-estudantes", component:ListarEstudantesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"cadastro-turma", component:CadastrarTurmaComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"atualizacao-turma/:id", component:CadastrarTurmaComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"listagem-turmas", component:ListarTurmaComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"visualizacao-questao/:id", component:VisualizarQuestaoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"visualizacao-questao-fechada/:id", component:VisualizarQuestaoFechadaComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    {path:"listagem-questoes-fechadas", component:ListarQuestoesFechadasComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},

    {path:"visualizacao-assunto/:id", component:VisualizarAssuntoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
  ]},
  {path:"", component:LoginComponent},
  {path:"autoreflexao", component:AutoReflexaoComponent},

  {path:"cadastrar/testeCase", component:CadastrarTesteCaseComponent},
  {path:"cadastrar/alternativa", component:CadastrarAlternativasComponent},
  
  {path:"**", component:PaginaNaoEncontradaComponent},
  
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
