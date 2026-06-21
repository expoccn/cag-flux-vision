import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Brain,
  CircuitBoard,
  Droplets,
  Gauge,
  Heart,
  Radio,
  Sparkles,
  Trophy,
  Wifi,
  Zap,
} from "lucide-react";
import { HomeChillerCard } from "@/components/cag/home-chiller-card";
import { KpiSparkCard } from "@/components/cag/kpi-spark";
import { Sparkline } from "@/components/cag/sparkline";
import { SeverityBadge } from "@/components/cag/badges";
import {
  chillers,
  comparatives,
  correlations,
  headerKpis,
  homeIntel,
  homeTimeline,
  ranking,
  chillerTheme,
} from "@/data/mockCagData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visão Geral — CAG Intelligence AI" },
      { name: "description", content: "Cockpit de operação da Central de Água Gelada com IA." },
      { property: "og:title", content: "Visão Geral — CAG Intelligence AI" },
      { property: "og:description", content: "Cockpit de operação da Central de Água Gelada com IA." },
    ],
  }),
  component: Index,
});

const iconForKpi: Record<string, any> = {
  health: Heart,
  deltaT: Activity,
  bypass: Gauge,
  online: CircuitBoard,
  pumps: Droplets,
  comps: Zap,
  events: AlertCircle,
  comm: Wifi,
};

const toneText: Record<string, string> = {
  ok: "text-status-ok",
  info: "text-status-info",
  warn: "text-status-warn",
  alert: "text-status-alert",
  crit: "text-status-crit",
  ai: "text-status-ai",
  default: "text-foreground",
};

const toneBg: Record<string, string> = {
  ok: "bg-status-ok/15 border-status-ok/40 text-status-ok",
  info: "bg-status-info/15 border-status-info/40 text-status-info",
  warn: "bg-status-warn/15 border-status-warn/40 text-status-warn",
  alert: "bg-status-alert/15 border-status-alert/40 text-status-alert",
  crit: "bg-status-crit/15 border-status-crit/40 text-status-crit",
  ai: "bg-status-ai/15 border-status-ai/40 text-status-ai",
};

function Index() {
  return (
    <div className="space-y-5">
      {/* Page title bar */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <Radio className="h-3 w-3 text-status-ok animate-pulse-glow" /> Cockpit Operacional · Tempo Real
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Visão Geral da <span className="text-primary text-glow">Central</span>
          </h1>
          <p className="text-xs text-muted-foreground">Expo Center Norte · Home Analítica · CAG Principal + CAG Secundária</p>
        </div>
        <div className="flex items-center gap-2">
          <SeverityBadge severity={homeIntel.status} />
          <span className="hidden text-[10px] text-muted-foreground md:inline">Atualizado em tempo real</span>
        </div>
      </div>

      {/* Header KPIs */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8">
        {headerKpis.map((k) => (
          <KpiSparkCard key={k.key} kpi={k} icon={iconForKpi[k.key]} />
        ))}
      </div>

      {/* Chillers + AI panel */}
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="mb-2 flex items-end justify-between">
            <div>
              <h2 className="font-display text-base font-semibold tracking-wide">CHILLERS DA CENTRAL</h2>
              <p className="text-[11px] text-muted-foreground">Clique em um chiller para abrir o cockpit detalhado</p>
            </div>
            <div className="hidden gap-3 text-[10px] text-muted-foreground md:flex">
              <span>3 unidades</span>
              <span>·</span>
              <span>6 circuitos</span>
              <span>·</span>
              <span>12 bombas</span>
            </div>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            {chillers.map((c) => <HomeChillerCard key={c.id} chiller={c} />)}
          </div>
        </div>

        {/* AI Intelligence panel */}
        <aside className="glass-card relative flex flex-col overflow-hidden p-4">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-status-ai/20 blur-3xl" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Centro de Inteligência</div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-md border border-status-ai/40 bg-status-ai/15 text-status-ai">
                  <Brain className="h-4 w-4" />
                </div>
                <h3 className="font-display text-base font-bold">Recomendação IA</h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-status-alert/40 bg-status-alert/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-status-alert">
                <AlertTriangle className="h-3 w-3" /> Alerta
              </span>
            </div>

            <p className="mt-3 text-[12px] leading-relaxed text-foreground/90">
              O <span className="font-semibold" style={{ color: chillerTheme.red.hex }}>Chiller Vermelho</span> concentra a maior carga, possui queda de Δ T frente à média semanal e bypass acima do padrão. O padrão sugere recirculação hidráulica ou baixa troca térmica efetiva.
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-md border border-border/50 bg-surface-2/40 p-2">
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Equipamento</div>
                <div className="mt-0.5 text-[11px] font-semibold" style={{ color: chillerTheme.red.hex }}>{homeIntel.equipamento}</div>
              </div>
              <div className="rounded-md border border-border/50 bg-surface-2/40 p-2">
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Confiança</div>
                <div className="mt-0.5 font-display text-base font-bold text-status-ai">{homeIntel.confianca}%</div>
              </div>
              <div className="rounded-md border border-border/50 bg-surface-2/40 p-2">
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Causa provável</div>
                <div className="mt-0.5 text-[11px] font-semibold text-status-alert">{homeIntel.causa}</div>
              </div>
              <div className="rounded-md border border-border/50 bg-surface-2/40 p-2">
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Impacto</div>
                <div className="mt-0.5 text-[11px] font-semibold text-status-alert">{homeIntel.impacto}</div>
              </div>
            </div>

            <div className="mt-3 rounded-md border border-status-ai/30 bg-status-ai/5 p-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-status-ai">
                <Sparkles className="h-3 w-3" /> Ação sugerida
              </div>
              <p className="mt-1 text-[12px] leading-snug">{homeIntel.acao}</p>
            </div>

            <button className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary transition hover:bg-primary/20">
              Abrir Análise IA <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Timeline preview */}
          <div className="relative mt-4 border-t border-border/40 pt-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em]">Tendências (últimas 6h)</div>
              <button className="text-[10px] text-muted-foreground hover:text-foreground">Ver todos</button>
            </div>
            <ul className="space-y-2">
              {homeTimeline.slice(0, 5).map((t) => (
                <li key={t.id} className="flex items-center gap-2">
                  <div className="font-mono text-[10px] text-muted-foreground">{t.time}</div>
                  <div className="flex-1 leading-tight">
                    <div className={cn("text-[11px] font-semibold", toneText[t.tone])}>{t.title}</div>
                    <div className="text-[10px] text-muted-foreground">{t.desc}</div>
                  </div>
                  <div className="h-7 w-16">
                    <Sparkline data={t.spark} tone={t.tone} height={28} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Comparativos + Ranking */}
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="glass-card p-4">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">O que mudou no período</h3>
              <p className="text-[10px] text-muted-foreground">Comparação executiva · Hoje × Ontem × 7 dias</p>
            </div>
            <button className="text-[10px] text-muted-foreground hover:text-foreground">Ver todos →</button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {comparatives.map((c) => (
              <div key={c.key} className="rounded-md border border-border/40 bg-surface-2/30 p-2.5 transition hover:border-primary/40">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.label}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className={cn("font-display text-xl font-bold tabular-nums", toneText[c.tone])}>{c.value}</span>
                  {c.unit ? <span className="text-[10px] text-muted-foreground">{c.unit}</span> : null}
                </div>
                <div className="mt-0.5 flex items-center justify-between text-[9px]">
                  <span className={cn(c.d1.trend === "up" ? "text-status-alert" : c.d1.trend === "down" ? "text-status-info" : "text-muted-foreground")}>
                    {c.d1.delta} <span className="text-muted-foreground">{c.d1.label}</span>
                  </span>
                  <span className={cn(c.d7.trend === "up" ? "text-status-alert" : c.d7.trend === "down" ? "text-status-info" : "text-muted-foreground")}>
                    {c.d7.delta} <span className="text-muted-foreground">{c.d7.label}</span>
                  </span>
                </div>
                <div className="-mx-1 mt-1">
                  <Sparkline data={c.spark} tone={c.tone} height={26} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">Ranking Operacional</h3>
              <p className="text-[10px] text-muted-foreground">Por saúde · capacidade · eficiência</p>
            </div>
            <Trophy className="h-4 w-4 text-status-warn" />
          </div>
          <ol className="space-y-2">
            {ranking.map((r) => {
              const t = chillerTheme[r.chiller];
              const medal = r.pos === 1 ? "text-status-warn" : r.pos === 2 ? "text-foreground/80" : "text-status-alert";
              return (
                <li key={r.pos} className="rounded-md border border-border/40 bg-surface-2/30 p-2.5">
                  <div className="flex items-center gap-3">
                    <div className={cn("font-display text-xl font-bold", medal)}>{r.pos}°</div>
                    <div className="flex-1">
                      <div className="font-display text-sm font-semibold" style={{ color: t.hex }}>{r.name}</div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-border/40">
                        <div className="h-full rounded-full" style={{ width: `${r.score}%`, background: t.hex, boxShadow: `0 0 8px ${t.hex}` }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-base font-bold tabular-nums" style={{ color: t.hex }}>{r.score}<span className="text-[10px] text-muted-foreground">/100</span></div>
                      <div className="text-[9px] text-muted-foreground">Cap. {r.capacity}% · Ef. {r.efficiency}%</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      {/* Correlações inteligentes */}
      <section className="glass-card p-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">Correlações Inteligentes</h3>
            <p className="text-[10px] text-muted-foreground">Relações que mais impactam a operação no período</p>
          </div>
          <span className="hidden rounded-full border border-status-ai/40 bg-status-ai/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-status-ai md:inline-flex">
            5 padrões detectados
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {correlations.map((c) => (
            <div key={c.key} className={cn("rounded-md border bg-surface-2/30 p-2.5 transition hover:translate-y-[-2px]", toneBg[c.tone].replace(/text-\S+/, ""))}>
              <div className={cn("text-[10px] font-semibold uppercase tracking-wider", toneText[c.tone])}>{c.title}</div>
              <p className="mt-1 text-[11px] leading-snug text-foreground/85">{c.desc}</p>
              <div className="mt-2 flex items-center justify-between text-[9px]">
                <span className="text-muted-foreground">
                  Impacto: <span className={cn("font-semibold", toneText[c.tone])}>{c.impact}</span>
                </span>
                <span className="text-muted-foreground">{c.scope}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}