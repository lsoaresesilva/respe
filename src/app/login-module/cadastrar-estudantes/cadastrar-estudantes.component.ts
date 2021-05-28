import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import Usuario from 'src/app/model/usuario';
import { PerfilUsuario } from 'src/app/model/enums/perfilUsuario';
import Turma from 'src/app/model/turma';
import { ConhecimentoProgramacao } from 'src/app/model/enums/conhecimentoProgramacao';
import { Genero } from 'src/app/model/enums/genero';
import { FaixaEtaria } from 'src/app/model/enums/faixaEtaria';
import { Groups } from 'src/app/model/experimento/groups';
import ConfiguracaoEditor from 'src/app/model/configuracoes/configuracaoEditor';
import Query from 'src/app/model/firestore/query';
import { configuracao } from 'src/app/model/experimento/old_check_to_delete/config';

@Component({
  selector: 'app-cadastrar-estudantes',
  templateUrl: './cadastrar-estudantes.component.html',
  styleUrls: ['./cadastrar-estudantes.component.css'],
})
export class CadastrarEstudantesComponent implements OnInit {
  id;
  conhecimentoProgramacao: SelectItem[];
  genero: SelectItem[];
  faixaEtaria: SelectItem[];
  usuario: Usuario;
  visibilidadeCadastro;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.conhecimentoProgramacao = [
      { label: 'Qual o seu conhecimento de programação?', value: null },
      { label: 'Nunca programei', value: ConhecimentoProgramacao.nenhum },
      {
        label: 'Pouco, li algumas coisas, mas não sei programar',
        value: ConhecimentoProgramacao.pouco,
      },
      {
        label: 'Sei algumas coisas, já escrevi pequenos programas',
        value: ConhecimentoProgramacao.medio,
      },
      { label: 'Eu sei programar', value: ConhecimentoProgramacao.programador },
    ];

    this.genero = [
      { label: 'Como você se identifica?', value: null },
      { label: 'Feminino', value: Genero.feminino },
      { label: 'Masculino', value: Genero.feminino },
      { label: 'Prefiro não informar', value: Genero.pns },
    ];

    this.faixaEtaria = [
      { label: 'Em qual faixa-etária você se encontra?', value: null },
      { label: '14 a 17', value: FaixaEtaria.quatorzeadezessete },
      { label: '18 a 22', value: FaixaEtaria.dezoitoavintedois },
      { label: '23 a 27', value: FaixaEtaria.vintetresavintesete },
      { label: '28 a 31', value: FaixaEtaria.vinteoitoatrintaum },
      { label: '32 a 36', value: FaixaEtaria.trintadoisatrintaseis },
      { label: '37 a 41', value: FaixaEtaria.trintaseteaquarentaum },
      { label: '42 ou mais', value: FaixaEtaria.quarentdoismmais },
    ];
  }

  exibirMensagemCadastro() {
    this.messageService.add({ severity: 'success', summary: 'Estudante cadastrado com sucesso.' });
  }
  exibirMensagemCodigoInvalido() {
    this.messageService.add({
      severity: 'success',
      summary: 'É preciso informar o código de uma turma.',
    });
  }

  ngOnInit() {
    this.usuario = new Usuario(null, null, null, PerfilUsuario.professor, null, null);
    this.usuario.turma = new Turma(null, null, null, null);
    this.visibilidadeCadastro = false;
    // background: #0d476e;

    this.route.params.subscribe((parametros) => {
      if (parametros['codigoTurma'] != undefined) {
        this.usuario.turma.codigo = parametros['codigoTurma'];
      }

      if (parametros['email'] && parametros['nome'] != undefined) {
        this.usuario.nome = parametros['nome'];
        this.usuario.email = parametros['email'];
      }
    });
  }

  cadastrarEstudante() {
    this.usuario.validar().subscribe(
      (resultado) => {
        if (resultado) {
          ConfiguracaoEditor.getByQuery(new Query("codigoTurma", "==", this.usuario.turma.codigo)).subscribe(configuracao=>{
            let grupo = Groups.experimentalA;
            if(configuracao != null && configuracao.grupoExperimental != null){
              grupo = configuracao.grupoExperimental;
            }

            this.usuario.salvar(PerfilUsuario.estudante, grupo).subscribe(
              () => {
                this.visibilidadeCadastro = true;
              },
              (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Houve um erro:',
                  detail: err.toString(),
                });
              }
            );
          })

          
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Houve um erro:',
          detail: err.toString(),
        });
      }
    );
  }

  navegarLoginSucesso() {
    this.visibilidadeCadastro = false;
    this.router.navigate(['']);
  }
}
