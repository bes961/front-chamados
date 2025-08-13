/**
 * Configuração da aplicação Angular para o servidor
 * Estende a configuração base com funcionalidades específicas para SSR
 */
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * Configuração específica para o servidor
 * Adiciona o provedor de renderização no servidor
 */
const serverConfig: ApplicationConfig = {
  providers: [
    // Habilita a renderização no lado do servidor
    provideServerRendering()
  ]
};

/**
 * Configuração final para o servidor
 * Combina a configuração base da aplicação com a configuração específica do servidor
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
