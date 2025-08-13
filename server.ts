/**
 * Servidor Express para Angular Universal (SSR)
 * Responsável por renderizar a aplicação no servidor e servir o conteúdo estático
 */
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

/**
 * Cria e configura a aplicação Express
 * Esta função é exportada para que possa ser usada por funções serverless
 * @returns Instância configurada do Express
 */
export function app(): express.Express {
  // Cria o servidor Express
  const server = express();
  // Obtém o diretório do servidor a partir do arquivo atual
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  // Resolve o caminho para a pasta de distribuição do navegador
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  // Caminho para o arquivo HTML de template do servidor
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // Cria uma instância do motor de renderização do Angular
  const commonEngine = new CommonEngine();

  // Configura o motor de visualização para HTML
  server.set('view engine', 'html');
  // Define o diretório de visualizações como a pasta de distribuição do navegador
  server.set('views', browserDistFolder);

  /**
   * Exemplo de endpoints de API REST Express (comentado)
   * Descomente e implemente conforme necessário para adicionar APIs ao backend
   */
  // server.get('/api/**', (req, res) => { });
  
  /**
   * Configuração para servir arquivos estáticos da pasta /browser
   * Todos os arquivos estáticos serão servidos com cache de 1 ano
   */
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y', // Define o tempo máximo de cache para 1 ano
    index: 'index.html', // Define o arquivo de índice padrão
  }));

  /**
   * Configuração para todas as rotas regulares usando o motor de renderização do Angular
   * Esta rota captura todas as solicitações que não foram tratadas pela rota de arquivos estáticos
   */
  server.get('**', (req, res, next) => {
    // Extrai informações relevantes da requisição
    const { protocol, originalUrl, baseUrl, headers } = req;

    // Renderiza a aplicação Angular no servidor
    commonEngine
      .render({
        bootstrap, // Função de inicialização da aplicação Angular
        documentFilePath: indexHtml, // Caminho para o arquivo HTML de template
        url: `${protocol}://${headers.host}${originalUrl}`, // URL completa da requisição
        publicPath: browserDistFolder, // Caminho para os arquivos públicos
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }], // Provedores adicionais para a aplicação
      })
      // Envia o HTML renderizado como resposta
      .then((html) => res.send(html))
      // Passa qualquer erro para o próximo middleware
      .catch((err) => next(err));
  });

  // Retorna a instância configurada do servidor Express
  return server;
}

/**
 * Função para iniciar o servidor
 * Configura a porta e inicia a escuta de requisições
 */
function run(): void {
  // Define a porta a partir da variável de ambiente ou usa 4000 como padrão
  const port = process.env['PORT'] || 4000;

  // Inicializa o servidor Node.js
  const server = app();
  // Inicia a escuta na porta configurada
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Executa a função de inicialização do servidor
run();
