import { readFile, writeFile } from "node:fs/promises";
import polygonClipping from "polygon-clipping";

// Atualização manual: o site usa a geometria local e não consulta o IBGE em runtime.
const source = await readFile(new URL("../src/data/serviceLocations.ts", import.meta.url), "utf8");
const locations = JSON.parse(source.match(/SERVICE_LOCATIONS = ([\s\S]*?) as const;/)[1]);
const shapes = await Promise.all(locations.map(async location => {
  const response = await fetch(location.sourceUrl);
  if (!response.ok) throw new Error(`IBGE: ${location.name} (${response.status})`);
  const data = await response.json();
  return data.features.map(feature => {
    if (!["Polygon", "MultiPolygon"].includes(feature.geometry.type)) {
      throw new Error(`Geometria inesperada: ${location.name}`);
    }
    return feature.geometry.coordinates;
  });
}));
const polygons = shapes.flat();
const coordinates = polygonClipping.union(polygons[0], ...polygons.slice(1));
await writeFile(new URL("../src/data/coverageGeometry.ts", import.meta.url),
  'import type { MultiPolygon } from "geojson";\n\n' +
  '// Malhas municipais simplificadas do IBGE, unidas sem bordas internas.\n' +
  '// Gerado por scripts/update-coverage.mjs.\n' +
  'export const coverageGeometry: MultiPolygon = ' +
  JSON.stringify({ type: "MultiPolygon", coordinates }) + ';\n');
console.log(`Cobertura atualizada: ${locations.length} municipios.`);
