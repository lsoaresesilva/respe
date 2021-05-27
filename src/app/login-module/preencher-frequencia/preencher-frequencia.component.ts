import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import Frequencia from 'src/app/model/cscl/frequencia';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-preencher-frequencia',
  templateUrl: './preencher-frequencia.component.html',
  styleUrls: ['./preencher-frequencia.component.css']
})
export class PreencherFrequenciaComponent implements OnInit {

  email;
  frequencia;
  erro;

  constructor(private route:ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if(params["codigoTurma"] != null && params["frequenciaId"] != null){
        Frequencia.get(params["frequenciaId"]).subscribe(frequencia=>{
          this.frequencia = frequencia;
        }, (error)=>{
          this.erro = true;
        })
      }
    });
  }

  preencher(){
    if(this.email == null){
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É preciso preencher o e-mail antes de prosseguir.',
      });
    }else{
      Usuario.getByQuery(new Query("email", "==", this.email)).subscribe(usuario=>{
        if(usuario == null){
          this.messageService.add({
            severity: 'error',
            summary: 'E-mail não localizado',
            detail: 'Você deve preencher o e-mail que utiliza para login na plataforma.',
          });
        }else{
          if(this.frequencia != null){
            if(this.frequencia.estudantes.includes(usuario.pk())){
              this.messageService.add({
                severity: 'error',
                summary: 'Frequência já preenchida',
                detail: 'Você não pode preencher a frequência mais de uma vez.',
              });
            }else{
              this.frequencia.estudantes.push(usuario.pk());
              this.frequencia.save().subscribe(()=>{
                this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso',
                  detail: 'Frequência preenchida com sucesso.',
                });
              });
            }
            
          }
        }
        
      })

      
    } 
    
  }

}
