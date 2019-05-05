import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Assunto } from 'src/app/model/assunto';

@Component({
  selector: 'app-cadastrar-assunto',
  templateUrl: './cadastrar-assunto.component.html',
  styleUrls: ['./cadastrar-assunto.component.css']
})
export class CadastrarAssuntoComponent implements OnInit {
 assunto;
 id;
 ehAlterar
  constructor(private router: Router, private route: ActivatedRoute, private messageService: MessageService) {

   }

  ngOnInit() {
    this.assunto = new Assunto(null, null);
    this.route.params.subscribe(params=> {this.id = params["id"];
      if(this.id!=undefined){
        this.ehAlterar=true;
        Assunto.get(this.id).subscribe(resultado =>{
          this.assunto = resultado;
        
        })
      }
      
    });
  }

  messageCadastro() {
    this.messageService.add({severity:'success', summary:'Cadastrado!', detail: this.assunto.nome+" foi adicionada ao banco de questões"});
  }
 

  messageUpdate() {
    this.messageService.add({severity:'warn', summary:'Alterado!', detail: this.assunto.nome+" foi alterada no banco de questões"});
  }

  cadastrarAssunto() {
    if (this.assunto) {
      this.assunto.save().subscribe(resultado => {
        if(this.ehAlterar!= true){
          this.router.navigate(['/Listar/Assuntos']);
          this.messageCadastro();
          
        }else{
          console.log("alterado");
          this.messageUpdate();
          this.router.navigate(['/Listar/Assuntos']);

        }
      }, err => {
        console.log("deu erro");
        console.log(this.assunto);
        console.log("esse é o nome = " + this.assunto.nome);
        console.log("esse é o id = " + this.assunto.pk());

      });
    } else {
      console.log("vazio")

    }

  }

}
