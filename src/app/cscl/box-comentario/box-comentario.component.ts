import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, DoCheck, IterableDiffers } from '@angular/core';
import ComentarioCodigo from 'src/app/model/comentarioCodigo';
import { Observable } from 'rxjs';

declare var editorElement: any;

@Component({
  selector: 'box-comentario',
  templateUrl: './box-comentario.component.html',
  styleUrls: ['./box-comentario.component.css']
})
export class BoxComentarioComponent implements OnInit, OnChanges {

  @Input("comentarios")
  comentarios;

  differ: any;
  
  @ViewChild('icone') icone:ElementRef;
  @ViewChild('op') box;

  constructor(private differs: IterableDiffers) { 
    this.comentarios = [];
    this.differ = this.differs.find([]).create(null);
  }

  ngOnInit() {
    
  }

  ngOnChanges(){
    this.posicionarIcone();
  }
  
  posicionarIcone(){
    // TODO: verificar se comentários existe.
    if(this.comentarios != undefined){

      if(this.comentarios.length == 0){
        this.icone.nativeElement.style.display = "none";
      }else{
        let linha = 0;
        if(this.comentarios.length > 0){
          
          linha = this.comentarios[0].linha;
          let posicaoFinal = this.getPosicao(linha);
          this.icone.nativeElement.style.top = posicaoFinal;
          this.icone.nativeElement.style.left = (editorElement.offsetLeft+20)+"px";
        }
      }
      
    }
  }

  getPosicao(linha){
    
    let posicaoInicial = editorElement.offsetTop;
    let posicaoFinal;
    if(linha > 1)
        posicaoFinal = posicaoInicial + linha*18-18;
    else
        posicaoFinal = posicaoInicial + linha;

    posicaoFinal = posicaoFinal+"px";

    return posicaoFinal;
  }

  apagar(comentario){
    
      if( comentario != undefined && typeof comentario.pk === "function" && comentario.pk() != null){
        let id = comentario.pk();
        ComentarioCodigo.delete(comentario.pk()).subscribe(resposta=>{
          if(resposta){
            if(this.comentarios != undefined){
              for(let i = 0; i < this.comentarios.length; i++){
                if(this.comentarios[i].pk() == id){
                  //this.comentarios = this.comentarios.splice(i, 1)
                  this.comentarios = this.comentarios.filter(function(value, index, arr){

                    if(index == i)
                      return false;
                    else
                      return true;
                
                  });
                  this.box.hide();
                  this.posicionarIcone();
                }
              }
            }
          }
        });
      }
    
  }
}
