import { Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Info, Sparkles } from "lucide-react";
import chillerImage from "@/assets/chiller.png";
import { chillerInsight, chillerTheme, type ChillerData } from "@/data/mockCagData";
import { cn } from "@/lib/utils";

const haloColor: Record<string, string> = {
  blue: "oklch(0.76 0.16 232 / 0.62)",
  red: "oklch(0.66 0.21 24 / 0.62)",
  white: "oklch(0.9 0.03 240 / 0.62)",
};

const accentColor: Record<string, string> = {
  blue: "oklch(0.82 0.15 224)",
  red: "oklch(0.72 0.19 20)",
  white: "oklch(0.93 0.015 240)",
};

const toneText: Record<string, string> = {
  ok: "text-status-ok",
  info: "text-status-info",
  warn: "text-status-warn",
  alert: "text-status-alert",
  crit: "text-status-crit",
};

const toneBg: Record<string, string> = {
  ok: "bg-status-ok/12 border-status-ok/35 text-status-ok",
  info: "bg-status-info/12 border-status-info/35 text-status-info",
  warn: "bg-status-warn/12 border-status-warn/35 text-status-warn",
  alert: "bg-status-alert/12 border-status-alert/35 text-status-alert",
  crit: "bg-status-crit/12 border-status-crit/35 text-status-crit",
};

function MiniMetric({ label, value, unit, tone }: { label: string; value: string | number; unit?: string; tone?: string }) {
  return (
    <div className="rounded-md border border-border/35 bg-black/20 px-2 py-1.5 shadow-[inset_0_1px_0_oklch(1_0_0_/_0.04)]">
      <div className="text-[8.5px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
      <div className={cn("mt-0.5 font-display text-[15px] font-bold leading-none tabular-nums", tone)}>
        {value}
        {unit ? <span className="ml-0.5 text-[10px] font-medium text-muted-foreground">{unit}</span> : null}
      </div>
    </div>
  );
}

function HealthMini({ score, color }: { score: number; color: string }) {
  const r = 13;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div className="relative h-10 w-10 shrink-0">
      <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90">
        <circle cx="20" cy="20" r={r} stroke="var(--border)" strokeWidth="2.7" fill="none" opacity="0.45" />
        <circle cx="20" cy="20" r={r} stroke={color} strokeWidth="2.7" strokeLinecap="round" fill="none" strokeDasharray={`${dash} ${c}`} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-[12px] font-bold tabular-nums" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}

const statusBadge = (chiller: ChillerData) => {
  if (chiller.risk === "ok") return { label: "Online", tone: "ok", Icon: CheckCircle2 };
  if (chiller.risk === "info") return { label: "Info", tone: "info", Icon: Info };
  if (chiller.risk === "alert" || chiller.risk === "crit") return { label: "Atenção", tone: "alert", Icon: AlertTriangle };
  return { label: "Online", tone: "ok", Icon: CheckCircle2 };
};

export function HomeChillerCard({ chiller }: { chiller: ChillerData }) {
  const theme = chillerTheme[chiller.id];
  const halo = haloColor[chiller.id];
  const accent = accentColor[chiller.id];
  const status = statusBadge(chiller);
  const StatusIcon = status.Icon;
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
      className="group glass-card relative flex min-h-[460px] flex-col overflow-hidden p-3.5 transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: halo.replace("0.62", "0.22"),
        boxShadow: `inset 0 1px 0 oklch(1 0 0 / 0.04), 0 26px 60px -34px ${halo}`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25" style={{ background: `radial-gradient(circle at 50% 12%, ${halo}, transparent 52%)` }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <div className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground">Chiller</div>
          <h3 className="whitespace-nowrap font-display text-lg font-bold leading-tight tracking-wide" style={{ color: theme.hex, textShadow: `0 0 12px ${halo}` }}>
            {chiller.name}
          </h3>
        </div>
        <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold", toneBg[status.tone])}>
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </span>
      </div>

      <div className="relative z-0 mt-2 h-[222px] overflow-hidden rounded-xl border border-border/25 bg-black/10">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${halo.replace("0.62", "0.18")}, transparent)` }} />
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-4 top-5 w-px opacity-25"
              style={{ left: `${18 + i * 16}%`, background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 blur-2xl" style={{ background: `radial-gradient(closest-side, ${halo}, transparent 72%)` }} />
        <img
          src={chillerImage}
          alt={chiller.name}
          loading="lazy"
          draggable={false}
          className="absolute bottom-3 left-1/2 z-10 h-[215px] w-auto max-w-[132%] -translate-x-1/2 object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ filter: `drop-shadow(0 18px 26px oklch(0 0 0 / 0.55)) drop-shadow(0 0 26px ${halo})` }}
        />
        <div
          className="pointer-events-none absolute bottom-5 left-1/2 z-20 h-4 w-[70%] -translate-x-1/2 rounded-[50%]"
          style={{ background: `radial-gradient(closest-side, ${accent}, transparent 72%)`, boxShadow: `0 0 18px 3px ${halo}`, opacity: 0.5 }}
        />
        <div className="absolute bottom-0 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      </div>

      <div className="relative z-10 mt-2.5 grid grid-cols-[1.2fr_1fr_1fr] gap-2">
        <div className="flex items-center gap-1.5 rounded-lg border border-border/35 bg-black/20 p-1.5">
          <HealthMini score={chiller.healthScore} color={healthCls.color} />
          <div className="min-w-0">
            <div className="text-[8.5px] uppercase tracking-[0.16em] text-muted-foreground">Health Score</div>
            <div className="font-display text-sm font-bold" style={{ color: healthCls.color }}>{healthCls.label}</div>
          </div>
        </div>
        <MiniMetric label="Capacidade" value={chiller.capacityTotal} unit="%" tone="text-primary" />
        <MiniMetric label="Delta T" value={chiller.deltaT.toFixed(1)} unit="°C" tone={chiller.deltaT < 3.8 ? "text-status-crit" : "text-status-ok"} />
      </div>

      <div className="relative z-10 mt-2 grid grid-cols-3 gap-1.5">
        <MiniMetric label="Bypass" value={chiller.hydraulic.bypassValve} unit="%" tone={chiller.hydraulic.bypassValve > 40 ? "text-status-alert" : "text-status-info"} />
        <MiniMetric label="Erro SP" value={(chiller.hydraulic.pressureError >= 0 ? "+" : "") + chiller.hydraulic.pressureError.toFixed(1)} unit="bar" tone={Math.abs(chiller.hydraulic.pressureError) > 0.3 ? "text-status-alert" : "text-primary"} />
        <MiniMetric label="Bombas" value={`${chiller.pumpsOn}/4`} tone={chiller.pumpsOn < 3 ? "text-status-alert" : "text-foreground"} />
        <MiniMetric label="Setpoint" value={chiller.setpoint.toFixed(1)} unit="°C" />
        <MiniMetric label="Saída" value={chiller.feedTemp.toFixed(1)} unit="°C" />
        <MiniMetric label="Retorno" value={chiller.returnTemp.toFixed(1)} unit="°C" />
        <MiniMetric label="A/B" value={`${chiller.capacityA}/${chiller.capacityB}`} unit="%" />
        <MiniMetric label="Partidas" value={chiller.starts} tone={chiller.starts > 1100 ? "text-status-warn" : undefined} />
        <MiniMetric label="Alarmes" value={chiller.alarms} tone={chiller.alarms > 0 ? "text-status-alert" : "text-status-ok"} />
      </div>

      <div className={cn("relative z-10 mt-auto flex items-center gap-2 rounded-md border px-2.5 py-2", toneBg[insight.tone])}>
        <Sparkles className="h-3.5 w-3.5 shrink-0" />
        <div className="text-[10px] leading-snug">
          <span className="font-semibold">Insight IA · </span>{insight.tag}
        </div>
      </div>
    </Link>
  );
}
