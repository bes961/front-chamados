/**
 * Ponto de entrada principal da aplicação
 * Responsável por inicializar o componente raiz com a configuração apropriada
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Inicializa a aplicação Angular
 * Carrega o componente raiz (AppComponent) com as configurações definidas em appConfig
 * Captura e loga quaisquer erros que ocorram durante a inicialização
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Erro ao inicializar a aplicação:', err));
