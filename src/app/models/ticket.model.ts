/**
 * Modelo de dados para chamados de suporte
 * Define as interfaces e enums relacionados aos chamados
 */

/**
 * Enum que define os possíveis status de um chamado
 */
export enum TicketStatus {
  PENDENTE = 'PENDENTE',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO'
}

/**
 * Interface que define a estrutura de um chamado
 */
export interface Ticket {
  /** Número único do chamado */
  numero: string;
  
  /** Assunto/título do chamado */
  assunto: string;
  
  /** Status atual do chamado */
  status: TicketStatus;
  
  /** Grupo responsável pelo atendimento */
  grupo: string;
  
  /** Tipo de atendimento */
  tipo?: string;
  
  /** Descrição detalhada do chamado */
  descricao?: string;
  
  /** Data de criação do chamado */
  dataCriacao?: Date;
  
  /** Data da última atualização do chamado */
  dataAtualizacao?: Date;
}