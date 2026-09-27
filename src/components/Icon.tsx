import {
  Bug,
  Coins,
  FileBarChart,
  Gauge,
  Leaf,
  Map,
  MapPin,
  MessageCircle,
  Mountain,
  Ruler,
  ScanLine,
  Send,
  ShieldCheck,
  SprayCan,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "../data/site";

const ICONS: Record<IconName, LucideIcon> = {
  spray: SprayCan,
  bug: Bug,
  scan: ScanLine,
  ruler: Ruler,
  target: Target,
  wallet: Coins,
  leaf: Leaf,
  gauge: Gauge,
  shield: ShieldCheck,
  mountain: Mountain,
  message: MessageCircle,
  map: Map,
  report: FileBarChart,
};

type IconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.75,
}: IconProps) {
  const LucideComponent = ICONS[name];
  return (
    <LucideComponent
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
}

export { MapPin, Send };
