import { Link } from "@tanstack/react-router";
import { AlertTriangle, Info, Sparkles } from "lucide-react";
import chillerAsset from "@/assets/chiller.png.asset.json";
import { chillerGroup, chillerInsight, chillerTheme, type ChillerData } from "@/data/mockCagData";
import { cn } from "@/lib/utils";

function Cell({ label, value, unit, tone }: { label: string; value: string | number; unit?: string; tone?: string }) {
  return (
    <div className="rounded-md border border-border/40 bg-surface-2/40 px-2 py-1.5">
      <div className="text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className={cn("mt-0.5 font-mono text-[13px] font-semibold tabular-nums leading-none", tone)}>
        {value}
        {unit ? <span className="ml-0.5 text-[10px] text-muted-foreground">{unit}</span> : null}
      </div>
    </div>
  );
}

const haloColor: Record<string, string> = {
  blue: "oklch(0.78 0.22 230 / 0.55)",
  red: "oklch(0.7 0.28 22 / 0.55)",
  white: "oklch(0.92 0.05 240 / 0.5)",
};

const accentColor: Record<string, string> = {
  blue: "oklch(0.85 0.22 220)",
  red: "oklch(0.78 0.26 18)",
  white: "oklch(0.95 0.02 240)",
};

const statusBadge = (chiller: ChillerData) => {
  if (chiller.risk === "ok") return { label: "OPERANDO", tone: "ok", Icon: Sparkles };
  if (chiller.risk === "info") return { label: "INFO", tone: "info", Icon: Info };
  if (chiller.risk === "alert" || chiller.risk === "crit") return { label: "EM ATENÇÃO", tone: "alert", Icon: AlertTriangle };
  return { label: "OPERANDO", tone: "ok", Icon: Sparkles };
};

const toneText: Record<string, string> = {
  ok: "text-status-ok",
  info: "text-status-info",
  warn: "text-status-warn",
  alert: "text-status-alert",
  crit: "text-status-crit",
};

const toneBg: Record<string, string> = {
  ok: "bg-status-ok/15 border-status-ok/40 text-status-ok",
  info: "bg-status-info/15 border-status-info/40 text-status-info",
  warn: "bg-status-warn/15 border-status-warn/40 text-status-warn",
  alert: "bg-status-alert/15 border-status-alert/40 text-status-alert",
  crit: "bg-status-crit/15 border-status-crit/40 text-status-crit",
};

function HealthDot({ score, color }: { score: number; color: string }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div className="relative h-12 w-12">
      <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90">
        <circle cx="22" cy="22" r={r} stroke="var(--border)" strokeWidth="3" fill="none" />
        <circle cx="22" cy="22" r={r} stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"
          strokeDasharray={`${dash} ${c}`} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-xs font-bold tabular-nums" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}

export function HomeChillerCard({ chiller }: { chiller: ChillerData }) {
  const theme = chillerTheme[chiller.id];
  const halo = haloColor[chiller.id];
  const accent = accentColor[chiller.id];
  const status = statusBadge(chiller);
  const insight = chillerInsight[chiller.id];
  const healthCls =
    chiller.healthScore >= 90 ? { label: "Excelente", color: "var(--status-ok)" } :
    chiller.healthScore >= 75 ? { label: "Bom", color: "var(--status-info)" } :
    chiller.healthScore >= 60 ? { label: "Atenção", color: "var(--status-warn)" } :
    { label: "Crítico", color: "var(--status-crit)" };

  return (
    <Link
      to="/chillers/$id"
      params={{ id: chiller.id }}
      className="group glass-card relative flex flex-col overflow-hidden p-4 transition-all hover:translate-y-[-3px]"
      style={{
        borderColor: "var(--glass-border)",
        boxShadow: `0 0 0 1px ${halo.replace("0.55", "0.18")}, 0 20px 60px -20px ${halo}`,
      }}
    >
      {/* Top header */}
      <div className="relative z-10 flex items-start justify-between gap-2">
        <div>
          <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">{chillerGroup[chiller.id]}</div>
          <h3 className="font-display text-lg font-bold tracking-wide" style={{ color: theme.hex, textShadow: `0 0 18px ${halo}` }}>
            {chiller.name.toUpperCase()}
          </h3>
        </div>
        <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", toneBg[status.tone])}>
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow" />
          {status.label}
        </span>
      </div>

      {/* Hero zone with chiller image */}
      <div className="relative z-0 -mx-1 mt-2 flex h-44 items-end justify-center overflow-hidden rounded-md">
        {/* Vertical light beams */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-full w-px opacity-30" style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }} />
          <div className="absolute right-1/4 top-0 h-full w-px opacity-30" style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }} />
          <div className="absolute left-1/2 top-0 h-full w-px opacity-20" style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }} />
        </div>
        {/* Background glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 transition-opacity group-hover:opacity-100"
          style={{ background: `radial-gradient(closest-side, ${halo}, transparent 70%)`, filter: "blur(8px)" }}
        />
        {/* Chiller image */}
        <img
          src={chillerAsset.url}
          alt={chiller.name}
          loading="lazy"
          draggable={false}
          className="relative z-10 h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ filter: `drop-shadow(0 14px 20px ${halo}) drop-shadow(0 0 30px ${halo})` }}
        />
        {/* Halo ring at base */}
        <div
          className="pointer-events-none absolute bottom-2 left-1/2 z-20 h-3 w-56 -translate-x-1/2 rounded-[50%]"
          style={{
            background: `radial-gradient(closest-side, ${accent}, transparent 70%)`,
            boxShadow: `0 0 24px 4px ${halo}`,
            opacity: 0.85,
          }}
        />
        {/* Scan line */}
        <div
          className="pointer-events-none absolute left-0 right-0 h-px opacity-40"
          style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)`, animation: "scan 5s linear infinite" }}
        />
      </div>

      {/* Bottom: small health + key metrics */}
      <div className="relative z-10 mt-3 flex items-center gap-3">
        <HealthDot score={chiller.healthScore} color={healthCls.color} />
        <div className="flex-1">
          <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Saúde</div>
          <div className="font-display text-sm font-semibold" style={{ color: healthCls.color }}>{healthCls.label}</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Capacidade</div>
          <div className="font-display text-2xl font-bold tabular-nums" style={{ color: theme.hex }}>
            {chiller.capacityTotal}<span className="text-xs text-muted-foreground">%</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Δ T</div>
          <div className="font-display text-2xl font-bold tabular-nums" style={{ color: theme.hex }}>
            {chiller.deltaT.toFixed(1)}<span className="text-xs text-muted-foreground">°C</span>
          </div>
        </div>
      </div>

      {/* Dense data grid */}
      <div className="relative z-10 mt-3 grid grid-cols-4 gap-1.5">
        <Cell label="Bypass" value={chiller.hydraulic.bypassValve} unit="%" tone={chiller.hydraulic.bypassValve > 40 ? toneText.alert : undefined} />
        <Cell label="Erro SP" value={(chiller.hydraulic.pressureError >= 0 ? "+" : "") + chiller.hydraulic.pressureError.toFixed(1)} unit="bar" />
        <Cell label="Bombas" value={`${chiller.pumpsOn}/4`} tone={chiller.pumpsOn < 3 ? toneText.warn : undefined} />
        <Cell label="A / B" value={`${chiller.capacityA}/${chiller.capacityB}`} unit="%" />
        <Cell label="Ext." value={chiller.externalTemp.toFixed(1)} unit="°C" />
        <Cell label="Saída" value={chiller.feedTemp.toFixed(1)} unit="°C" />
        <Cell label="Retorno" value={chiller.returnTemp.toFixed(1)} unit="°C" />
        <Cell label="Horas" value={`${(chiller.operatingHours / 1000).toFixed(1)}k`} />
      </div>

      {/* AI insight pill */}
      <div className={cn("relative z-10 mt-3 flex items-start gap-2 rounded-md border px-2.5 py-1.5", toneBg[insight.tone])}>
        <Sparkles className="mt-0.5 h-3 w-3 shrink-0" />
        <div className="text-[10px] leading-snug">
          <span className="font-semibold">IA · </span>
          {insight.tag}
        </div>
      </div>
    </Link>
  );
}