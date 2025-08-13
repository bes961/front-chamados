/**
 * Componente para exibição e gerenciamento de chamados de suporte
 * Permite visualizar, filtrar e paginar os chamados do usuário
 */
import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Router, RouterModule } from '@angular/router';
import { Ticket, TicketStatus } from '../models/ticket.model';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-support-page',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatChipsModule, RouterModule],
  templateUrl: './support-page.component.html',
  styleUrls: ['./support-page.component.css']
})
/**
 * Componente para exibição e gerenciamento de chamados de suporte
 * Permite visualizar, filtrar e paginar os chamados do usuário
 */
export class SupportPageComponent implements OnInit {
  /** Disponibiliza o enum TicketStatus para uso no template */
  TicketStatus = TicketStatus;
  /**
   * Construtor do componente
   * @param router Serviço de roteamento para navegação
   */
  constructor(private router: Router) {}

  private ticketService = inject(TicketService);

  /** Termo de busca para filtrar chamados */
  query = signal('');
  
  /** Filtro de status atual */
  filter = signal<TicketStatus>(TicketStatus.PENDENTE);
  
  /** Página atual da paginação */
  page = signal(1);
  
  /** Número de itens por página */
  pageSize = 10;

  /** Lista de chamados carregados da API */
  tickets = signal<Ticket[]>([]);

  ngOnInit(): void {
    this.ticketService.listar().subscribe({
      next: (items) => this.tickets.set(items ?? []),
      error: () => this.tickets.set([])
    });
  }

  /**
   * Computed signal que filtra todos os chamados com base no status e termo de busca
   */
  filteredAll = computed(() => {
    const q = this.query().toLowerCase();
    return this.tickets().filter(t =>
      t.status === this.filter() && (!q || t.assunto.toLowerCase().includes(q) || t.numero.includes(this.query()))
    );
  });

  /**
   * Computed signal que retorna os chamados da página atual
   */
  filtered = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredAll().slice(start, start + this.pageSize);
  });

  /**
   * Computed signal que calcula o número total de páginas
   */
  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredAll().length / this.pageSize)));

  /**
   * Manipula a mudança no campo de busca
   * @param event Evento de input
   */
  onQueryChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.query.set(target?.value ?? '');
    this.page.set(1);
  }

  /**
   * Define o filtro de status e reseta a paginação
   * @param f Status para filtrar
   */
  setFilter(f: TicketStatus): void { 
    this.filter.set(f); 
    this.page.set(1); 
  }

  /**
   * Retorna a classe CSS com base no status do chamado
   * @param s Status do chamado
   * @returns Nome da classe CSS
   */
  statusClass(s: TicketStatus): string { 
    return s === TicketStatus.PENDENTE ? 'pendente' : s === TicketStatus.CONCLUIDO ? 'concluido' : 'cancelado'; 
  }
  
  /**
   * Retorna o texto de exibição com base no status do chamado
   * @param s Status do chamado
   * @returns Texto para exibição
   */
  statusLabel(s: TicketStatus): string { 
    return s === TicketStatus.PENDENTE ? 'Aguardando atendimento' : s === TicketStatus.CONCLUIDO ? 'Concluído' : 'Cancelado'; 
  }

  /**
   * Navega para a página anterior
   */
  prev() { 
    this.page.set(this.page() > 1 ? this.page() - 1 : 1); 
  }
  
  /**
   * Navega para a próxima página
   */
  next() { 
    this.page.set(this.page() < this.totalPages() ? this.page() + 1 : this.totalPages()); 
  }
}