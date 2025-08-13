/**
 * Ponto de entrada da aplicação para renderização no servidor (SSR)
 * Configura a inicialização da aplicação no ambiente do servidor
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Função de bootstrap para inicialização no servidor
 * Utiliza a configuração específica para o servidor
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

/**
 * Exporta a função de bootstrap como padrão
 * Será utilizada pelo Angular Universal para renderização no servidor
 */
export default bootstrap;
