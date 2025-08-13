/**
 * Configuração da aplicação Angular
 * Define os provedores globais necessários para o funcionamento da aplicação
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

/**
 * Configuração principal da aplicação
 * Inclui provedores para:
 * - Detecção de mudanças otimizada com coalescing de eventos
 * - Roteamento
 * - Animações do Angular
 * - Hidratação do cliente para SSR (Server-Side Rendering)
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Otimiza a detecção de mudanças agrupando eventos
    provideZoneChangeDetection({ eventCoalescing: true }), 
    // Configura o roteamento da aplicação
    provideRouter(routes), 
    // Habilita animações do Angular Material
    provideAnimations(),
    // Habilita a hidratação do cliente para SSR
    provideClientHydration(),
    // Habilita HttpClient com fetch (compatível com SSR)
    provideHttpClient(withFetch())
  ]
};
