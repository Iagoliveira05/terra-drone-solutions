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

## Apresentação 3D do drone

A abertura usa Three.js, carregado sob demanda quando a cena se aproxima da tela. A geometria de `src/components/drone/createDrone.ts` foi adaptada do HTML de drone fornecido pelo cliente, com os braços alongados a partir da foto de referência. A cena e o descarte de recursos ficam em `droneScene.ts`; a integração React e a foto de fallback ficam em `DroneShowcase.tsx`.

O drone ocupa toda a largura na abertura, antes do texto comercial, e não possui controles, captura de gestos ou foco de teclado. A rolagem determina a decolagem, a inclinação e a mudança de direção, com pulverização pelos quatro bicos durante o voo. Após 1,5 segundo com a cena pronta e sem interação, uma rolagem automática de 2,8 segundos revela o texto. Essa sequência ocorre apenas uma vez na abertura; toque, clique, teclado, rolagem manual, mudança de aba ou navegação a interrompem. O movimento do ponteiro produz uma reação discreta. Fora da tela ou com a aba oculta, a renderização para. Com movimento reduzido, o drone permanece estático e não há rolagem automática. Em navegadores sem WebGL, uma foto real substitui a cena.

## SEO e publicação

O mapa da área de atuação usa Leaflet com mapas do OpenStreetMap e carrega quando a seção se aproxima da tela. Os marcadores ficam em `src/data/serviceLocations.ts`; cadastre apenas cidades de atuação confirmada, com coordenadas de referência do município. `src/data/coverageGeometry.ts` contém os contornos municipais do IBGE já unidos, preservando as áreas separadas. Para atualizar a geometria após alterar os municípios, execute node scripts/update-coverage.mjs. Os nomes das cidades aparecem nos marcadores; a descrição da seção identifica Resende - RJ e Lorena - SP como sedes, conforme COMPANY.headquarters em src/data/site.ts. A atribuição do OpenStreetMap deve permanecer visível.

O build pré-renderiza a página React em HTML e gera dados estruturados de empresa e serviços, robots.txt e sitemap.xml em dist/. O conteúdo principal pode ser lido sem executar JavaScript; a hidratação mantém os controles interativos.

O domínio oficial é https://terra-drone-solutions.vercel.app/ e está definido no canonical de index.html. Ao mudar de domínio, atualize também as URLs Open Graph e Twitter nesse arquivo; o sitemap e os dados estruturados usam o canonical automaticamente. Dados de contato e serviços vêm de src/data/site.ts.

Após publicar, confirme o domínio no Google Search Console, envie /sitemap.xml e solicite a indexação da página inicial. Confira endereço, CEP e municípios atendidos antes de publicar e mantenha os mesmos dados no Perfil da Empresa no Google. A indexação e a posição nos resultados dependem do Google; as alterações não garantem posições.
