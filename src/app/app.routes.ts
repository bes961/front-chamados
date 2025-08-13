/**
 * Configuração de rotas da aplicação
 * Define os componentes que serão carregados para cada URL
 */
import { Routes } from '@angular/router';
import { SupportPageComponent } from './support/support-page.component';
import { NewTicketPageComponent } from './tickets/new-ticket-page.component';

export const routes: Routes = [
  /** Rota principal - exibe a lista de chamados */
  { path: '', component: SupportPageComponent },
  /** Rota para criação de novo chamado */
  { path: 'novo', component: NewTicketPageComponent },
];
