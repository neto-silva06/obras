# Transformação para Aplicativo Android (PWA) - Resumo do Esforço

O projeto foi transformado em um **PWA (Progressive Web App)**, permitindo sua instalação no Android como um aplicativo nativo e garantindo funcionamento offline.

## Principais Mudanças Implementadas:

1.  **Infraestrutura PWA:**
    *   Instalação e configuração do `vite-plugin-pwa`.
    *   Criação do `manifest.webmanifest` (ícones, cores, nome do app).
    *   Configuração de Service Workers para cache de arquivos estáticos.
    *   Otimização de meta-tags no `index.html` para Android/iOS.

2.  **Interface Mobile (Responsividade):**
    *   **Sidebar Adaptativa:** No desktop permanece fixa, no celular transforma-se em um menu lateral "gaveta" (drawer) acionado por um ícone de hambúrguer.
    *   **Layout Fluido:** Remoção de margens fixas (`pl-64`) em telas pequenas.
    *   **DataTable Responsiva:** Adicionado suporte a scroll horizontal e ajustes de preenchimento para tabelas de dados em telas estreitas.
    *   **LoginPage Mobile-First:** Ajustes de padding e bordas para melhorar a usabilidade em dispositivos móveis.

3.  **Modo Offline e Sincronização:**
    *   **IndexedDB (Dexie.js):** Implementação de um banco de dados local no navegador.
    *   **Cache de Dados:** Todas as requisições de leitura (GET) são cacheadas automaticamente. Se o usuário estiver sem internet, o sistema exibe os últimos dados carregados.
    *   **Fila de Sincronização:** Operações de escrita (POST, PUT, DELETE) realizadas offline são salvas em uma fila local.
    *   **Sincronização Automática:** Assim que o dispositivo detecta conexão com a internet, o sistema processa a fila de forma ordenada, enviando as alterações para o servidor.
    *   **Indicadores Visuais:** Adicionado ícone de "Offline" no cabeçalho e notificações (toasts) informando sobre o status da conexão e sincronização.

## Como utilizar no Android:
1. Acesse a URL do sistema pelo Google Chrome no celular.
2. Clique no menu de três pontos do Chrome.
3. Selecione "Instalar aplicativo" ou "Adicionar à tela inicial".
4. O ícone aparecerá na tela do celular e abrirá como um app independente (sem as barras do navegador).
