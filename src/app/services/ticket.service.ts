import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Ticket, TicketStatus } from '../models/ticket.model';

export interface CreateTicketRequest {
	descricao: string;
	filial: string;
}

export interface UpdateTicketRequest {
	status?: string;
	observacao?: string;
	usuarioAtendente?: string;
}

// DTO vindo do backend .NET (pode vir em camelCase ou PascalCase)
interface ChamadoDto {
	id?: number;
	Id?: number;
	descricao?: string;
	Descricao?: string;
	filial?: string;
	Filial?: string;
	status?: string;
	Status?: string;
	usuarioAbertura?: string;
	UsuarioAbertura?: string;
	dataAbertura?: string;
	DataAbertura?: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
	private http = inject(HttpClient);
	// Ajuste esta base conforme a porta/host do backend em dev/prod
	private baseUrl = '/api/chamados';

	private toTicket(dto: ChamadoDto): Ticket {
		const id = dto.id ?? dto.Id ?? '';
		const rawStatus = (dto.status ?? dto.Status ?? 'PENDENTE').toString().toUpperCase();
		const descricao = dto.descricao ?? dto.Descricao ?? '';
		const filial = dto.filial ?? dto.Filial ?? '';
		const dataAbertura = dto.dataAbertura ?? dto.DataAbertura;
		return {
			numero: String(id),
			assunto: descricao.trim() ? descricao : `Chamado #${String(id)}`,
			status: rawStatus === 'CONCLUIDO' ? TicketStatus.CONCLUIDO : rawStatus === 'CANCELADO' ? TicketStatus.CANCELADO : TicketStatus.PENDENTE,
			grupo: filial,
			dataCriacao: dataAbertura ? new Date(dataAbertura) : undefined
		};
	}

	listar(): Observable<Ticket[]> {
		return this.http.get<ChamadoDto[]>(`${this.baseUrl}`).pipe(
			map(rows => (rows ?? []).map(r => this.toTicket(r)))
		);
	}

	obter(id: number): Observable<Ticket> {
		return this.http.get<ChamadoDto>(`${this.baseUrl}/${id}`).pipe(
			map(r => this.toTicket(r))
		);
	}

	obterDetalhe(id: number): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/detalhe/${id}`);
	}

	criar(payload: CreateTicketRequest): Observable<{ id: number }> {
		return this.http.post<{ id: number }>(`${this.baseUrl}`, payload);
	}

	atualizar(id: number, payload: UpdateTicketRequest): Observable<void> {
		return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
	}
} 