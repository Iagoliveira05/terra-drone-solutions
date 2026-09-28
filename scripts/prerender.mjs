import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

const server = await createServer({
  // Keep build-time rendering from invalidating the running dev server cache.
  cacheDir: "node_modules/.vite-prerender",
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const { COMPANY, CONTACT, SERVICES, WHATSAPP_NUMBER } =
    await server.ssrLoadModule("/src/data/site.ts");
  const path = new URL("../dist/index.html", import.meta.url);
  let html = await readFile(path, "utf8");
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) throw new Error("Canonical URL is required.");
  const url = new URL(canonical).href;
  const businessId = url + "#empresa";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: COMPANY.name,
        url,
        logo: url + "logo-400.png",
        image: url + "galeria/drone-pulverizando-milho.jpg",
        telephone: "+" + WHATSAPP_NUMBER,
        email: CONTACT.email,
        location: COMPANY.headquarters.map(({ city, state }) => ({
          "@type": "Place",
          name: `Sede ${city} - ${state}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: city,
            addressRegion: state,
            addressCountry: "BR",
          },
        })),
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.address.street + ", " + COMPANY.address.district,
          addressLocality: COMPANY.address.city,
          addressRegion: COMPANY.address.state,
          postalCode: COMPANY.address.zip,
          addressCountry: "BR",
        },
        areaServed: ["Resende - RJ", "Lorena - SP", "Vale do Paraíba"],
        sameAs: [CONTACT.instagramUrl],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços com drones para o agronegócio",
          itemListElement: SERVICES.map(service => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              url: url + "#" + service.id,
              provider: { "@id": businessId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": url + "#website",
        url,
        name: COMPANY.name,
        alternateName: COMPANY.shortName,
        inLanguage: "pt-BR",
        publisher: { "@id": businessId },
      },
    ],
  };
  const markup = renderToString(createElement(App));
  if (!html.includes('<div id="root"></div>')) {
    throw new Error("Expected an empty root before prerendering.");
  }
  html = html.replace('<div id="root"></div>', () => '<div id="root">' + markup + '</div>');
  html = html.replace("</head>", () =>
    '<script type="application/ld+json">' +
    JSON.stringify(schema).replace(/</g, "\\u003c") +
    "</script></head>");
  await writeFile(path, html);
  await writeFile(new URL("../dist/robots.txt", import.meta.url),
    "User-agent: *\nAllow: /\n\nSitemap: " + url + "sitemap.xml\n");
  await writeFile(new URL("../dist/sitemap.xml", import.meta.url),
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    '<url><loc>' + url + '</loc></url></urlset>\n');
  console.log("SEO: HTML, structured data, robots.txt and sitemap.xml generated.");
} finally {
  await server.close();
}
