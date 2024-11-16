import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  navegacao: MenuItem[] = [];

  constructor() {
    this.carregarNavegacao(); // Carrega navegação do sessionStorage ao iniciar
  }

  private carregarNavegacao() {
    const navegacaoSalva = sessionStorage.getItem('navegacao');
    if (navegacaoSalva) {
      // Recupera e converte para o tipo correto
      this.navegacao = JSON.parse(navegacaoSalva) as MenuItem[];
    } else {
      // Inicializa como um array vazio caso não exista
      this.navegacao = [];
      this.salvarNavegacao(); // Salva no sessionStorage pela primeira vez
    }
  }

  private salvarNavegacao() {
    // Converte a navegação para JSON e salva no sessionStorage
    sessionStorage.setItem('navegacao', JSON.stringify(this.navegacao));
  }

  adicionar(rota: MenuItem) {
    this.navegacao.push(rota); // Adiciona a nova rota
    this.salvarNavegacao(); // Atualiza o sessionStorage
  }

  limpar() {
    this.navegacao = []; // Limpa a navegação local
    sessionStorage.removeItem('navegacao'); // Remove do sessionStorage
  }

  obterNavegacao(): MenuItem[] {
    return this.navegacao; // Retorna a navegação atual
  }
}
