
import pexpect
import json
import re

from django.db import models

# Create your models here.

class AnaliseJuiz:
    def __init__(self, teste, resultadoTeste, saidaAlgoritmo):
        self.teste = teste
        self.resultadoTeste = resultadoTeste
        self.saidaAlgoritmo = saidaAlgoritmo

class JuizProgramacao:
    pass

