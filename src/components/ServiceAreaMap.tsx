import { useEffect, useRef, useState } from "react";
import type { LatLngBounds, Map as LeafletMap, PolylineOptions } from "leaflet";
import { Maximize } from "lucide-react";
import { SERVICE_LOCATIONS } from "../data/serviceLocations";
import { smoothCoverage } from "../data/smoothCoverage";

const HEADQUARTERS = SERVICE_LOCATIONS.find(
  (location) => location.id === "resende",
)!;
const INITIAL_ZOOM = 9;
const ROUNDED_PATH: PolylineOptions = { smoothFactor: 0 };

export function ServiceAreaMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const boundsRef = useRef<LatLngBounds | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [tileError, setTileError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let started = false;
    let map: LeafletMap | undefined;
    let resizeObserver: ResizeObserver | undefined;

    async function initialize() {
      if (started || disposed) return;
      started = true;
      try {
        const [L, { coverageGeometry }] = await Promise.all([
          import("leaflet"),
          import("../data/coverageGeometry"),
          import("leaflet/dist/leaflet.css"),
        ]);
        if (disposed || !container) return;
        const geometry = smoothCoverage(coverageGeometry);

        map = L.map(container, { scrollWheelZoom: false });
        mapRef.current = map;
        const activeMap = map;
        const coverage = L.geoJSON(geometry, {
          style: {
            color: "#426b98",
            weight: 1.8,
            opacity: 0.85,
            fillColor: "#598bc1",
            fillOpacity: 0.3,
            ...ROUNDED_PATH,
            lineCap: "round",
            lineJoin: "round",
            className: "service-map-coverage",
          },
          interactive: false,
        });
        const bounds = coverage.getBounds();
        boundsRef.current = bounds;
        map.setView(
          [HEADQUARTERS.latitude, HEADQUARTERS.longitude],
          INITIAL_ZOOM,
        );

        const tiles = L.tileLayer(
          "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        );
        tiles.on("tileerror", () => {
          if (!disposed) setTileError(true);
        });
        tiles.addTo(map);
        // Filete claro mantém a cobertura legível sobre ruas e vegetação.
        L.geoJSON(geometry, {
          style: {
            color: "#ffffff",
            weight: 4.5,
            opacity: 0.65,
            ...ROUNDED_PATH,
            fill: false,
            lineCap: "round",
            lineJoin: "round",
          },
          interactive: false,
        }).addTo(map);
        coverage.addTo(map);
        L.geoJSON(geometry, {
          style: {
            color: "#355d87",
            weight: 1.4,
            opacity: 0.6,
            ...ROUNDED_PATH,
            fill: false,
            dashArray: "8 16",
            lineCap: "round",
            className: "service-map-flow",
          },
          interactive: false,
        }).addTo(map);

        SERVICE_LOCATIONS.forEach((location) => {
          const isHeadquarters = location.role === "Sede";
          const icon = L.divIcon({
            className: `service-map-marker${isHeadquarters ? " is-headquarters" : ""}`,
            html: `<span aria-hidden="true"></span>`,
            iconSize: isHeadquarters ? [16, 16] : [12, 12],
            iconAnchor: isHeadquarters ? [8, 8] : [6, 6],
          });
          const marker = L.marker([location.latitude, location.longitude], {
            icon,
            title: `${location.name} · ${location.role}`,
          }).addTo(activeMap);

          marker.bindTooltip(
            `${location.name}${isHeadquarters ? " · Sede" : ""}`,
            {
              permanent: isHeadquarters,
              direction: "top",
              className: isHeadquarters
                ? "service-map-headquarters"
                : "service-map-city",
              opacity: 1,
              offset: [0, isHeadquarters ? -16 : -12],
            },
          );
        });
        resizeObserver = new ResizeObserver(() => map?.invalidateSize());
        resizeObserver.observe(container);
        setStatus("ready");
      } catch (error) {
        console.error("Falha ao inicializar o mapa de atendimento:", error);
        if (!disposed) {
          resizeObserver?.disconnect();
          map?.remove();
          map = undefined;
          mapRef.current = null;
          boundsRef.current = null;
          setStatus("error");
        }
      }
    }

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) {
                observer?.disconnect();
                void initialize();
              }
            },
            { rootMargin: "200px" },
          )
        : null;
    if (observer) observer.observe(container);
    else void initialize();

    return () => {
      disposed = true;
      observer?.disconnect();
      resizeObserver?.disconnect();
      map?.remove();
      mapRef.current = null;
      boundsRef.current = null;
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-3xl border border-steel-200 bg-white shadow-xl shadow-agro-950/10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-steel-100 px-5 py-4">
        <p className="flex items-center gap-2 text-sm font-bold text-agro-950">
          Cidades atendidas
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={status !== "ready"}
            onClick={() => {
              if (boundsRef.current) {
                mapRef.current?.fitBounds(boundsRef.current, {
                  padding: [32, 32],
                  maxZoom: 10,
                });
              }
            }}
            className="flex min-h-11 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-agro-700 hover:bg-agro-50 disabled:opacity-40"
          >
            <Maximize className="h-4 w-4" aria-hidden="true" /> Ver toda a área
          </button>
        </div>
      </div>
      <div className="relative isolate">
        <div
          ref={containerRef}
          role="region"
          aria-label="Mapa das cidades atendidas e áreas aproximadas de cobertura"
          className="h-[380px] w-full bg-steel-100 sm:h-[520px]"
        />
        {status !== "ready" && (
          <div
            className="pointer-events-none absolute inset-0 z-[1000] flex items-center justify-center p-8 text-center text-sm text-steel-600"
            role="status"
          >
            {status === "error"
              ? "O mapa não carregou. Recarregue a página para tentar novamente."
              : "Carregando mapa da região…"}
          </div>
        )}
      </div>
      {tileError && (
        <p role="status" className="px-5 py-3 text-sm text-steel-600">
          Algumas imagens do mapa não carregaram. Recarregue a página para
          tentar novamente.
        </p>
      )}
    </div>
  );
}
