import { Component, inject, signal, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket.model';

@Component({
  selector: 'app-ticket-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <section class="ticket-detail" *ngIf="loaded()">
      <h2>Chamado #{{ numero() }}</h2>
      <div><strong>Assunto:</strong> {{ detalhe()?.ASSUNTOATEND || assunto() }}</div>
      <div><strong>Texto:</strong> <pre>{{ detalhe()?.TEXTOSOLICITACAO }}</pre></div>
      <div><strong>Grupo:</strong> {{ detalhe()?.NOMEGRUPO }}</div>
      <div><strong>Tipo:</strong> {{ detalhe()?.NOMETIPATEND }}</div>
      <div><strong>Categoria:</strong> {{ detalhe()?.SUBCATEGORIA }} / {{ detalhe()?.SUBCATEGORIAADT01 }} / {{ detalhe()?.SUBCATEGORIAADT02 }}</div>
      <div><strong>Subcategorias:</strong> {{ detalhe()?.SUBCATEGORIA03 }} / {{ detalhe()?.SUBCATEGORIA04 }}</div>
      <div><strong>Produto:</strong> {{ detalhe()?.CODPRODUTO }} - {{ detalhe()?.DETAPRODUTO }}</div>
      <div><strong>Coligada:</strong> {{ detalhe()?.CODCOLIGADA }}</div>
      <div><strong>Grupo Atendimento:</strong> {{ detalhe()?.CODGRUPOATENDIMENTO }}</div>
      <div><strong>Tipo Atendimento:</strong> {{ detalhe()?.CODTIPOATENDIMENTO }}</div>
      <div><strong>Cliente:</strong> {{ detalhe()?.CODCLIENTEATEND }}</div>
      <div><strong>Tipo Contato:</strong> {{ detalhe()?.CODTIPOCONTATO }}</div>
      <div><strong>Criado por:</strong> {{ detalhe()?.RECCREATEDBY }} em {{ detalhe()?.RECCREATEDON | date:'short' }}</div>
      <div><strong>Modificado por:</strong> {{ detalhe()?.RECMODIFIEDBY }} em {{ detalhe()?.RECMODIFIEDON | date:'short' }}</div>

      <div class="actions">
        <button mat-raised-button color="primary" (click)="atender()">Atender este chamado</button>
      </div>
    </section>
  `,
  styles: [`
    .ticket-detail { display: grid; gap: .5rem; }
    .actions { margin-top: 1rem; }
    pre { white-space: pre-wrap; }
  `]
})
export class TicketDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ticketService = inject(TicketService);
  private platformId = inject(PLATFORM_ID);

  loaded = signal(false);
  numero = signal('');
  assunto = signal('');
  status = signal('');
  grupo = signal('');
  dataCriacao = signal<Date | undefined>(undefined);
  detalhe = signal<any | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    // Tenta recuperar o ticket via state do router (browser-only)
    let stateTicket: Ticket | undefined;
    const nav = this.router.getCurrentNavigation();
    const navState = (nav?.extras?.state as { ticket?: Ticket } | undefined)?.ticket;
    if (navState) stateTicket = navState;
    else if (isPlatformBrowser(this.platformId)) {
      const historyState = (history as any)?.state as { ticket?: Ticket } | undefined;
      stateTicket = historyState?.ticket;
    }
    if (stateTicket) this.hydrate(stateTicket);

    // Buscar detalhe bruto
    this.ticketService.obterDetalhe(id).subscribe({
      next: (d: any) => {
        this.detalhe.set(d);
        if (!stateTicket) {
          this.numero.set(String(d?.ID ?? ''));
          this.assunto.set(d?.ASSUNTOATEND ?? '');
        }
        this.loaded.set(true);
      },
      error: () => {
        // fallback para carregamento mínimo
        if (!stateTicket) {
          this.ticketService.obter(id).subscribe({ next: (t) => { this.hydrate(t); this.loaded.set(true); } });
        } else {
          this.loaded.set(true);
        }
      }
    });
  }

  private hydrate(t: Ticket): void {
    this.numero.set(t.numero);
    this.assunto.set(t.assunto);
    this.status.set(t.status);
    this.grupo.set(t.grupo);
    this.dataCriacao.set(t.dataCriacao);
  }

  atender(): void {
    alert('Em breve: chamada para atender este chamado');
  }
} 