/**
 * Componente para criação de novos chamados de suporte
 * Permite ao usuário preencher um formulário para abrir um novo chamado
 */
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Ticket, TicketStatus } from '../models/ticket.model';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-new-ticket-page',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './new-ticket-page.component.html',
  styleUrls: ['./new-ticket-page.component.css']
})
/**
 * Componente para criação de novos chamados de suporte
 * Permite ao usuário preencher um formulário para abrir um novo chamado
 */
export class NewTicketPageComponent {
  /** Disponibiliza o enum TicketStatus para uso no template */
  TicketStatus = TicketStatus;
  /** Grupo de atendimento selecionado */
  grupo = signal<string>('');
  
  /** Tipo de atendimento selecionado */
  tipo = signal<string>('');
  
  /** Assunto do chamado */
  assunto = signal<string>('');
  
  /** Descrição detalhada do chamado */
  descricao = signal<string>('');

  /** Indica se o formulário foi enviado */
  submitted = signal<boolean>(false);

  private ticketService = inject(TicketService);

  /**
   * Atualiza o valor do assunto quando o usuário digita
   * @param e Evento de input
   */
  onAssunto(e: Event) { 
    this.assunto.set((e.target as HTMLInputElement | null)?.value ?? ''); 
  }
  
  /**
   * Atualiza o valor da descrição quando o usuário digita
   * @param e Evento de input
   */
  onDescricao(e: Event) { 
    this.descricao.set((e.target as HTMLTextAreaElement | null)?.value ?? ''); 
  }

  /**
   * Envia o formulário para criar um novo ticket
   */
  onSubmit(): void {
    if (!this.grupo() || !this.tipo() || !this.assunto() || !this.descricao()) {
      // Validação básica - todos os campos são obrigatórios
      return;
    }

    this.submitted.set(true);

    // Integração mínima: descrição + filial (placeholder "001" até termos JWT)
    this.ticketService.criar({ descricao: this.descricao(), filial: '001' }).subscribe({
      next: () => {
        // Resetar o formulário
        this.grupo.set('');
        this.tipo.set('');
        this.assunto.set('');
        this.descricao.set('');
        this.submitted.set(false);
      },
      error: () => {
        this.submitted.set(false);
      }
    });
  }
}