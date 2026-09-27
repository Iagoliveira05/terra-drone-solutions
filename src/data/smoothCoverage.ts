import type { MultiPolygon, Position } from "geojson";

/** Arredonda as quinas para a apresentação visual; preserva os dados originais. */
export function smoothCoverage(geometry: MultiPolygon): MultiPolygon {
  return {
    type: "MultiPolygon",
    coordinates: geometry.coordinates.map(polygon => polygon.map(ring => {
      let points = ring.slice(0, -1);
      // Chaikin: corta cada quina em pequenos segmentos progressivamente suaves.
      for (let pass = 0; pass < 3; pass++) {
        const next: Position[] = [];
        points.forEach((point, index) => {
          const end = points[(index + 1) % points.length];
          next.push(
            [point[0] * 0.75 + end[0] * 0.25, point[1] * 0.75 + end[1] * 0.25],
            [point[0] * 0.25 + end[0] * 0.75, point[1] * 0.25 + end[1] * 0.75],
          );
        });
        points = next;
      }
      return [...points, [...points[0]]];
    })),
  };
}
