import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  Brain,
  CircuitBoard,
  Droplets,
  Heart,
  Radio,
  ShieldAlert,
  Sparkles,
  Wifi,
  Zap,
} from "lucide-react";
import { KpiCard } from "@/components/cag/kpi-card";
import { ChillerCard } from "@/components/cag/chiller-card";
import { SeverityBadge } from "@/components/cag/badges";
import { chillers, plant, events, aiInsights, chillerTheme } from "@/data/mockCagData";

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

function Index() {
  const s = plant.summary;
  const topInsight = aiInsights[0];
  const insightChiller = chillers.find((c) => c.id === topInsight.chiller)!;
  const eventColor = (id: keyof typeof chillerTheme) =>
    ({ blue: "var(--chiller-blue)", red: "var(--chiller-red)", white: "var(--chiller-white)" })[id];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Radio className="h-3 w-3 text-status-ok animate-pulse-glow" /> Cockpit Operacional
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Visão Geral <span className="text-primary text-glow">/ CAG</span>
          </h1>
          <p className="text-sm text-muted-foreground">Operação em tempo real · Inteligência preditiva ativa</p>
        </div>
        <SeverityBadge severity={s.risk} className="text-xs" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        <KpiCard label="Saúde Geral" value={s.healthScore} unit="/100" icon={Heart} tone="warn" trend="↑ 2 vs ontem" />
        <KpiCard label="Risco" value="Médio" icon={ShieldAlert} tone="warn" trend="2 chillers atenção" />
        <KpiCard label="Anomalias" value={s.anomalies} icon={AlertCircle} tone="alert" trend="IA detectou" />
        <KpiCard label="Chillers Online" value={`${s.chillersOnline}/3`} icon={CircuitBoard} tone="ok" />
        <KpiCard label="Bombas Ligadas" value={`${s.pumpsOn}/12`} icon={Droplets} tone="info" />
        <KpiCard label="Compressores" value={`${s.compressorsOn}/12`} icon={Zap} tone="info" />
        <KpiCard label="Eventos" value={s.events} icon={Activity} trend="últimas 24h" />
        <KpiCard label="Comunicação" value="Online" icon={Wifi} tone="ok" trend="n8n / SCADA" />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Chillers da Central</h2>
          <span className="text-xs text-muted-foreground">Clique em um chiller para abrir o cockpit detalhado</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {chillers.map((c) => (
            <ChillerCard key={c.id} chiller={c} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass-card relative overflow-hidden p-5 lg:col-span-2">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-status-ai/20 blur-3xl" />
          <div className="relative">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-status-ai/20 text-status-ai">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Lovable Intelligence</div>
                  <h3 className="font-display text-lg font-bold">Recomendação da IA</h3>
                </div>
              </div>
              <SeverityBadge severity={topInsight.severity} />
            </div>

            <p className="mb-4 text-sm leading-relaxed text-foreground/90">
              A Central opera com atenção moderada. O{" "}
              <span style={{ color: chillerTheme.red.hex }} className="font-semibold">Chiller Vermelho</span>{" "}
              apresenta Delta T abaixo do esperado com bypass elevado. Recomenda-se verificar a válvula bypass e a condição hidráulica do circuito.
            </p>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Equipamento</div>
                <div className="font-display text-sm font-semibold" style={{ color: chillerTheme[insightChiller.id].hex }}>
                  {topInsight.equipment}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Severidade</div>
                <div className="font-display text-sm font-semibold capitalize">{topInsight.severity}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Confiança</div>
                <div className="font-display text-sm font-semibold text-status-ai">
                  {Math.round(topInsight.confidence * 100)}%
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Detectado</div>
                <div className="font-display text-sm font-semibold">{topInsight.occurredAt}</div>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-status-ai/30 bg-status-ai/5 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-status-ai">
                <Sparkles className="h-3.5 w-3.5" /> AÇÃO RECOMENDADA
              </div>
              <p className="mt-1 text-sm">{topInsight.recommendation}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold">Eventos Recentes</h3>
            <span className="text-[10px] text-muted-foreground">tempo real</span>
          </div>
          <div className="space-y-3">
            {events.map((e) => (
              <div key={e.id} className="relative flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="h-2.5 w-2.5 rounded-full ring-2 ring-background"
                    style={{ background: eventColor(e.chiller), boxShadow: `0 0 8px ${eventColor(e.chiller)}` }}
                  />
                  <div className="mt-1 w-px flex-1 bg-border/60" />
                </div>
                <div className="flex-1 pb-3">
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="font-mono">{e.time}</span>
                    <span className="capitalize">{e.chiller}</span>
                  </div>
                  <div className="text-sm leading-snug">{e.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}