import { Component, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { WorkedExample } from 'src/app/model/worked-example/workedExample';
import { WorkedExampleTrecho } from '../../model/worked-example/workedExampleTrecho';

@Component({
  selector: 'app-visualizar-worked-example',
  templateUrl: './visualizar-worked-example.component.html',
  styleUrls: ['./visualizar-worked-example.component.css'],
})
export class VisualizarWorkedExampleComponent implements OnInit {
  workedExample: WorkedExample;
  visualizacao: WorkedExampleTrecho[];

  constructor() {}

  ngOnInit(): void {
    this.visualizacao = [];
    const a = new WorkedExampleTrecho(
      null,
      'https://firebasestorage.googleapis.com/v0/b/letscode-producao.appspot.com/o/01-01.mp3?alt=media&token=3ed81f44-21f1-4210-b447-34dc36aec701',
      'Observe que o enunciado informa que iremos ler um dado do teclado. Para isso utilizaremos a instrução input.',
      'numero = input()',
      1
    );
    const b = new WorkedExampleTrecho(
      null,
      'https://firebasestorage.googleapis.com/v0/b/letscode-producao.appspot.com/o/01-02.mp3?alt=media&token=90c99c22-bb8c-48dd-8525-8181265937e9',
      'Como o dado de entrada é um número inteiro e a leitura com input resulta em um texto numérico, precisamos converter esse dado para inteiro.',
      'numeroConvertido = int( numero )',
      2
    );
    const c = new WorkedExampleTrecho(
      null,
      'https://firebasestorage.googleapis.com/v0/b/letscode-producao.appspot.com/o/01-03.mp3?alt=media&token=58675a89-46ce-4603-aee7-06480ba016d2',
      'Para verificar se o número é positivo ou negativo iremos utilizar uma condição. Se o dado for menor que zero, então ele é negativo.',
      'if numeroConvertido < 0:',
      3
    );
    this.workedExample = new WorkedExample(
      null,
      [a, b, c],
      'Você irá receber um número do teclado e deve verificar se ele é positivo ou negativo. Sendo positivo, deve imprimir na tela o seu valor multiplicado por quatro, se for negativo, deve apresentar o valor multiplicado por dois.',
      new Assunto(
        null,
        'Você irá receber um número do teclado e deve verificar se ele é positivo ou negativo. Sendo positivo, deve imprimir na tela o seu valor multiplicado por quatro, se for negativo, deve apresentar o valor multiplicado por dois.'
      )
    );
  }

  iniciar() {
    this.visualizacao = [];
    if (this.workedExample.trechos.length > 0) {
      this.visualizacao.push(this.workedExample.trechos[0]);
      this.tocarAudio(this.workedExample.trechos[0].url);
    }
  }

  voltar() {
    if (this.visualizacao.length > 0) {
      this.visualizacao.pop();
    }
  }

  avancar() {
    if (this.workedExample.trechos.length > this.visualizacao.length) {
      this.visualizacao.push(this.workedExample.trechos[this.visualizacao.length]);
      this.tocarAudio(this.workedExample.trechos[this.visualizacao.length - 1].url);
    }
  }

  tocarAudio(url) {
    let audio = new Audio();
    const _this = this;
    audio.src = url;
    audio.load();
    audio.play();
    /* audio.addEventListener('ended', function () {
      audio.currentTime = 0;
      _this.avancar();
    }); */
  }
}
