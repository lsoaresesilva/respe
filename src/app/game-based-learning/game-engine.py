from abc import ABC, abstractmethod
from browser import document, bind, window, timer

canvas = document["myCanvas"]

""" x = desenharCirculo(100, 10)
y = desenharCirculo(200, 10)
z = desenharCirculo(300, 10)
z.y = 50 """

""" x = desenharRetangulo(10, 10, 100, 30)
def movimentar():
  x.x += 10

movimentarDireita(movimenta """


class Canvas:
    def __init__(self, canvas):
        self.ctx = canvas.getContext("2d")
        self.objetosDesenhados = []  # Representa todos os objetos na interface

    def _desenharTexto(self, textoObj):
        self.objetosDesenhados.append(textoObj)
        self.ctx.font = "16px Arial"
        self.ctx.fillStyle = "#0095DD"
        self.ctx.fillText(f"{textoObj.texto}", 8, 20)

    def _desenharCirculo(self, circulo):
        #global canvas

        self.ctx = canvas.getContext("2d")
        self.ctx.beginPath()
        self.ctx.arc(circulo.x, circulo.y, 10, 0, 3.14 * 2)
        self.ctx.fillStyle = "#0095DD"
        self.ctx.fill()
        self.ctx.closePath()

    def desenhar(self, *args):
        self.ctx.clearRect(0, 0, canvas.width, canvas.height)
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
        canvasClasse.objetosDesenhados.append(self)
        canvasClasse._desenharCirculo(self)


class ObjetoTexto(Objeto):

    def __init__(self, x, y, texto):
        super().__init__(x, y)
        self.texto = texto

    def desenhar(self):
        global canvasClasse
        canvasClasse._desenharTexto(self)


# Funções globais de uso do usuário

def desenharCirculo(posX, posY):
    global canvasClasse
    circulo = ObjetoCirculo(posX, posY)
    canvasClasse._desenharCirculo(circulo)

    return circulo


def desenharTexto(posX, posY, texto):
    global canvasClasse
    textoObj = ObjetoCirculo(posX, posY, texto)
    canvasClasse._desenharTexto(textoObj)

    return circulo


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
        if callbackDireita != None:
            callbackDireita()
    elif e.keyCode == 37:
        if callbackEsquerda != None:
            callbackEsquerda()


canvasClasse = Canvas(canvas)
canvasClasse.desenhar()


def loop(segundos, callback):
    timer.set_interval(callback, segundos)
