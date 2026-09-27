# Terra Drone Solutions

Site institucional da Terra Drone Solutions, empresa de serviços com drones para o agronegócio. Apresenta soluções de pulverização de precisão, controle de pragas, mapeamento aéreo e NDVI, além de topografia e cartografia.

O site reúne informações sobre os serviços, benefícios, etapas de atendimento, área de atuação e galeria de operações. O contato é feito pelo WhatsApp, com mensagens pré-preenchidas.

## Tecnologias

- React 19 e TypeScript
- Vite
- Tailwind CSS 4
- Lucide React

## Requisitos

- Node.js
- npm

## Desenvolvimento local

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador.

## Comandos

```bash
npm run build    # Verifica os tipos e gera a versão de produção em dist/
npm run preview  # Abre localmente a versão de produção
npm run lint     # Executa o ESLint
```

## SEO e publicação

O build pré-renderiza a página React em HTML e gera dados estruturados de empresa e serviços, robots.txt e sitemap.xml em dist/. O conteúdo principal pode ser lido sem executar JavaScript; a hidratação mantém os controles interativos.

O domínio oficial é https://terra-drone-solutions.vercel.app/ e está definido no canonical de index.html. Ao mudar de domínio, atualize também as URLs Open Graph e Twitter nesse arquivo; o sitemap e os dados estruturados usam o canonical automaticamente. Dados de contato e serviços vêm de src/data/site.ts.

Após publicar, confirme o domínio no Google Search Console, envie /sitemap.xml e solicite a indexação da página inicial. Confira endereço, CEP e municípios atendidos antes de publicar e mantenha os mesmos dados no Perfil da Empresa no Google. A indexação e a posição nos resultados dependem do Google; as alterações não garantem posições.
