import { Component, ElementRef, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import OnPythonError from './onPythonError';
import { RastrearErrosPythonService } from '../rastrear-erros-python.service';
import { ParseBrythonErrors } from '../parseBrythonError';

declare var brython: any;

declare var __BRYTHON__: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, OnPythonError {
  codigo;
  gameEngine;

  script;

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private rastrearErrosPython: RastrearErrosPythonService
  ) {
    this.rastrearErrosPython.receberNotificacao(this);

    this.codigo = `desenharTexto(100, 100, "oi")`;
    this.gameEngine = `
from abc import ABC, abstractmethod
from browser import document, bind, window, timer, alert

canvas = document["myCanvas"]


class Canvas:
  def __init__(self, canvas):
    self.ctx = canvas.getContext("2d")
    self.objetosDesenhados = [] # Representa todos os objetos na interface

  def _desenharTexto(self, textoObj):

    self.ctx.font = "16px Arial"
    self.ctx.fillStyle = "#0095DD"
    self.ctx.fillText(f"{textoObj.texto}", textoObj.x, textoObj.y)

  def _desenharCirculo(self, circulo):
    self.ctx = canvas.getContext("2d")
    self.ctx.beginPath()
    self.ctx.arc(circulo.x, circulo.y, 10, 0, 3.14 * 2)
    self.ctx.fillStyle = "#0095DD"
    self.ctx.fill()
    self.ctx.closePath()

  def _desenharRetangulo(self, retangulo):
    self.ctx.beginPath()
    self.ctx.rect(retangulo.x,
                  retangulo.y,
                  retangulo.largura,
                  retangulo.altura)
    self.ctx.fillStyle = "#0095DD"
    self.ctx.fill()
    self.ctx.closePath()

  def desenhar(self, *args):
    self.ctx.clearRect(0, 0, canvas.width, canvas.height)
    print(len(self.objetosDesenhados))
    for objeto in self.objetosDesenhados:

      objeto.desenhar()

    window.requestAnimationFrame(self.desenhar)

class Objeto(ABC):

  def __init__(self, x, y):
    self.x = x
    self.y = y

  @abstractmethod
  def desenhar(self):
    pass

class ObjetoCirculo(Objeto):

  def desenhar(self):
    global canvasClasse
    canvasClasse._desenharCirculo(self)

class ObjetoTexto(Objeto):

  def __init__(self, x, y, texto):
    super().__init__(x,y)
    self.texto = texto

  def desenhar(self):
    global canvasClasse
    canvasClasse._desenharTexto(self)

class ObjetoRetangulo(Objeto):

  def __init__(self, x, y, largura, altura):
    super().__init__(x,y)
    self.largura = largura
    self.altura = altura

  def desenhar(self):
    global canvasClasse
    canvasClasse._desenharRetangulo(self)


canvasClasse = Canvas(canvas)



def desenharCirculo(posX, posY):
  global canvasClasse
  circulo = ObjetoCirculo(posX, posY)
  canvasClasse.objetosDesenhados.append(circulo)
  canvasClasse._desenharCirculo(circulo)

  return circulo

def desenharRetangulo(posX, posY, largura, altura):
  global canvasClasse
  retangulo = ObjetoRetangulo(posX, posY, largura, altura)
  canvasClasse.objetosDesenhados.append(retangulo)
  canvasClasse._desenharRetangulo(retangulo)

  return retangulo

def desenharTexto(posX, posY, texto):
  global canvasClasse
  textoObj = ObjetoTexto(posX, posY, texto)
  canvasClasse.objetosDesenhados.append(textoObj)
  canvasClasse._desenharTexto(textoObj)

  return textoObj


callbackDireita = None
callbackEsquerda = None

def movimentarDireita(cb):
  global callbackDireita
  callbackDireita = cb

def movimentarEsquerda(cb):
  global callbackEsquerda
  callbackEsquerda = cb

@bind(document, "keydown")
def gerenciarTeclas(e):
  if e.keyCode == 39:
    print(callbackDireita)
    if callbackDireita != None:
      callbackDireita()
  elif e.keyCode == 37:
    if callbackEsquerda != None:
      callbackEsquerda()

canvasClasse.desenhar()

def loop(segundos, callback):
  timer.set_interval(callback, segundos)
    `;
  }

  notification(erro) {
    console.log('pipocou');
  }

  ngOnInit(): void {
    this.script = this._renderer2.createElement('script');
    this.script.type = `text/python3`;
    this.script.text = this.gameEngine;
    this._renderer2.setAttribute(this._document.body, 'onload', 'brython(2)');
    // Verificar se o elemento já existe, caso positivo, trocar o valor text apenas.
    this._renderer2.appendChild(this._document.body, this.script);
  }

  executar() {
    this.script.text += '\n' + this.codigo.trim();

    try {
      brython();
    } catch (error) {
      let err = ParseBrythonErrors.construir(error);
      let x = err;
    } finally {
      console.log(__BRYTHON__.exception_stack);
      this.script.text = this.gameEngine;
    }
  }
}
