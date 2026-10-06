import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Boxes,
  Truck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  CheckCircle2,
  Users,
  ChevronRight,
  Landmark,
  Layers,
  Building2,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomeOverviewView: React.FC = () => {
  const { user, setActiveView, openQuickAction } = useApp();

  // Seletor de período para o gráfico de faturamento
  const [faturamentoPeriod, setFaturamentoPeriod] = useState<'7d' | '30d' | '3m' | '6m' | '12m'>('30d');

  // Dados dinâmicos para cada período
  const faturamentoDataByPeriod: Record<string, { label: string; valor: number; altura: number }[]> = {
    '7d': [
      { label: 'Seg', valor: 28400, altura: 65 },
      { label: 'Ter', valor: 34200, altura: 78 },
      { label: 'Qua', valor: 29800, altura: 68 },
      { label: 'Qui', valor: 41500, altura: 92 },
      { label: 'Sex', valor: 46200, altura: 100 },
      { label: 'Sáb', valor: 14000, altura: 32 },
      { label: 'Dom', valor: 8500, altura: 20 },
    ],
    '30d': [
      { label: 'Sem 1', valor: 142000, altura: 72 },
      { label: 'Sem 2', valor: 168500, altura: 85 },
      { label: 'Sem 3', valor: 184200, altura: 94 },
      { label: 'Sem 4 (Atual)', valor: 189800, altura: 100 },
    ],
    '3m': [
      { label: 'Agosto', valor: 620000, altura: 88 },
      { label: 'Setembro', valor: 645000, altura: 92 },
      { label: 'Outubro (Atual)', valor: 684500, altura: 100 },
    ],
    '6m': [
      { label: 'Maio', valor: 510000, altura: 74 },
      { label: 'Junho', valor: 540000, altura: 78 },
      { label: 'Julho', valor: 590000, altura: 86 },
      { label: 'Agosto', valor: 620000, altura: 90 },
      { label: 'Setembro', valor: 645000, altura: 94 },
      { label: 'Outubro', valor: 684500, altura: 100 },
    ],
    '12m': [
      { label: '2025 S2', valor: 2840000, altura: 82 },
      { label: '2026 S1', valor: 3120000, altura: 90 },
      { label: '2026 S2 (Proj)', valor: 3650000, altura: 100 },
    ],
  };

  const currentChartData = faturamentoDataByPeriod[faturamentoPeriod];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Executivo de Boas-Vindas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operação em Tempo Real
            </span>
            <span className="text-xs text-slate-500 font-medium hidden md:inline">
              Atualizado há poucos minutos
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Bom dia, {user.name.split(' ')[0]}.
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Aqui está o panorama completo da Polo Móveis hoje.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openQuickAction('venda')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all active:scale-[0.98]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Nova Venda
          </button>
          <button
            onClick={() => setActiveView('corp_overview')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-all shadow-xs"
          >
            <Landmark className="w-3.5 h-3.5 text-slate-500" />
            Financeiro PJ
          </button>
        </div>
      </div>

      {/* 2. Principais Números — 6 Cards Padronizados de Alto Padrão */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Faturamento */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Faturamento
              </span>
              <DollarSign className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
              R$ 684.500
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 rounded-md w-fit">
            <TrendingUp className="h-3.5 w-3.5 shrink-0" />
            +18% este mês
          </div>
        </div>

        {/* Lucro */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Lucro Estimado
              </span>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
              R$ 352.000
            </div>
          </div>
          <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
            51.4% de margem liq.
          </div>
        </div>

        {/* Vendas */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Vendas do Mês
              </span>
              <ShoppingBag className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
              142 pedidos
            </div>
          </div>
          <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
            Ticket médio: R$ 29.800
          </div>
        </div>

        {/* Contas a Receber */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                A Receber (30d)
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-2 tracking-tight">
              R$ 184.225
            </div>
          </div>
          <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
            R$ 81k nos próx. 15 dias
          </div>
        </div>

        {/* Contas a Pagar */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                A Pagar (30d)
              </span>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
              R$ 57.950
            </div>
          </div>
          <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
            Fornecedores 100% em dia
          </div>
        </div>

        {/* Estoque */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Estoque Físico
              </span>
              <Boxes className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
              R$ 384.920
            </div>
          </div>
          <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
            245 itens catalogados
          </div>
        </div>
      </div>

      {/* 3. Bloco "PRECISA DA SUA ATENÇÃO HOJE" — Padronizado, Clean, Foco em Decisão */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Ações Imediatas & Alertas de Hoje
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Itens prioritários que demandam acompanhamento da diretoria
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            5 pendências
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Card 1 */}
          <button
            onClick={() => setActiveView('company_finance')}
            className="group flex flex-col justify-between text-left rounded-lg border border-slate-200/80 bg-slate-50/60 p-3.5 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all dark:border-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300 px-2 py-0.5 rounded">
                Financeiro
              </span>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                3 contas vencem hoje
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Fornecedor ErgoTech e diárias de montagem
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
              Pagar agora <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </button>

          {/* Card 2 */}
          <button
            onClick={() => setActiveView('company_inventory')}
            className="group flex flex-col justify-between text-left rounded-lg border border-slate-200/80 bg-slate-50/60 p-3.5 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all dark:border-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 px-2 py-0.5 rounded">
                Estoque
              </span>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                5 itens em nível crítico
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Cadeira Aero Pro abaixo do ponto de reposição
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
              Repor estoque <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </button>

          {/* Card 3 */}
          <button
            onClick={() => setActiveView('company_sales')}
            className="group flex flex-col justify-between text-left rounded-lg border border-slate-200/80 bg-slate-50/60 p-3.5 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all dark:border-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300 px-2 py-0.5 rounded">
                Propostas
              </span>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                2 propostas em fechamento
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Nubrill (R$ 142k) e Zenith (R$ 86k)
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
              Ver propostas <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </button>

          {/* Card 4 */}
          <button
            onClick={() => setActiveView('company_deliveries')}
            className="group flex flex-col justify-between text-left rounded-lg border border-slate-200/80 bg-slate-50/60 p-3.5 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all dark:border-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-300 px-2 py-0.5 rounded">
                Logística
              </span>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                4 montagens agendadas
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Faria Lima, Paulista e Santo Amaro
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
              Rastrear frota <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </button>

          {/* Card 5 */}
          <button
            onClick={() => setActiveView('planning_goals')}
            className="group flex flex-col justify-between text-left rounded-lg border border-slate-200/80 bg-slate-50/60 p-3.5 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all dark:border-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 rounded">
                Metas 2026
              </span>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                Meta do mês em 86%
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Faltam R$ 35.500 para alcançar 100%
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
              Acompanhar meta <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </button>
        </div>
      </div>

      {/* 4. Bloco "INTELIGÊNCIA ESTRATÉGICA DA EMPRESA" */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 flex items-center justify-center text-slate-800 dark:text-slate-200">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Inteligência & Insights da Operação
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cruzamento de vendas, margem e giro comercial
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/60 dark:bg-slate-800/40 dark:border-slate-800 flex items-start gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white font-semibold">Faturamento aumentou 18%</strong> este mês em relação ao período anterior com ticket corporate de R$ 29.8k.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/60 dark:bg-slate-800/40 dark:border-slate-800 flex items-start gap-3">
            <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white font-semibold">Cadeiras representam 42%</strong> de todas as vendas fechadas, com maior margem líquida (54%).
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/60 dark:bg-slate-800/40 dark:border-slate-800 flex items-start gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Você tem <strong className="text-slate-900 dark:text-white font-semibold">R$ 81.000</strong> a receber nos próximos 15 dias sem registros de inadimplência.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/60 dark:bg-slate-800/40 dark:border-slate-800 flex items-start gap-3">
            <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Custos de frete representam <strong className="text-slate-900 dark:text-white font-semibold">4.8% da receita</strong>, dentro da meta de eficiência logística.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/60 dark:bg-slate-800/40 dark:border-slate-800 flex items-start gap-3">
            <span className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Faltam apenas <strong className="text-slate-900 dark:text-white font-semibold">R$ 35.500</strong> para bater a meta máxima estipulada para o 4º trimestre.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/60 dark:bg-slate-800/40 dark:border-slate-800 flex items-start gap-3">
            <span className="h-2 w-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white font-semibold">Linha Vertex Ergonômica</strong> está vendendo 32% acima da média das outras categorias.
            </p>
          </div>
        </div>
      </div>

      {/* 5. SEÇÃO DE GRÁFICOS: EVOLUÇÃO & DRE DE CONTRIBUIÇÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* GRÁFICO 1: EVOLUÇÃO DO FATURAMENTO */}
        <div className="lg:col-span-8 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Evolução do Faturamento
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Faturamento realizado e acumulado por período
              </p>
            </div>

            {/* Segmented control moderno */}
            <div className="flex items-center rounded-lg border border-slate-200/80 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
              {(['7d', '30d', '3m', '6m', '12m'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setFaturamentoPeriod(period)}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                    faturamentoPeriod === period
                      ? 'bg-white text-slate-900 shadow-2xs dark:bg-slate-700 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {period === '7d' && '7 dias'}
                  {period === '30d' && '30 dias'}
                  {period === '3m' && '3 meses'}
                  {period === '6m' && '6 meses'}
                  {period === '12m' && '12 meses'}
                </button>
              ))}
            </div>
          </div>

          {/* Gráfico de Barras Elegante */}
          <div className="h-60 flex items-end justify-between gap-3 pt-6 px-2">
            {currentChartData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  R$ {(item.valor / 1000).toFixed(0)}k
                </div>
                <div className="w-full max-w-[52px] bg-slate-100 rounded-t-lg overflow-hidden flex items-end dark:bg-slate-800 h-full">
                  <div
                    className="w-full bg-slate-900 rounded-t-lg transition-all duration-300 group-hover:bg-blue-600 dark:bg-slate-200 dark:group-hover:bg-blue-400"
                    style={{ height: `${item.altura}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 truncate max-w-full">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* GRÁFICO 2: RECEITA vs CUSTOS vs LUCRO */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Composição do Faturamento
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Margem de contribuição líquida (Mês Atual)
              </p>
            </div>

            <div className="space-y-4 pt-1">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700 dark:text-slate-300">Receita Bruta</span>
                  <span className="text-slate-900 dark:text-white font-bold">R$ 684.500</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                  <div className="h-full bg-slate-900 dark:bg-slate-100 rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700 dark:text-slate-300">Custos das Mercadorias (CMV)</span>
                  <span className="text-rose-700 dark:text-rose-400 font-bold">- R$ 298.500 (43%)</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '43%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700 dark:text-slate-300">Despesas Operacionais Fixas</span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">- R$ 88.700 (13%)</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '13%' }} />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-900 dark:text-white font-bold">Lucro Operacional Líquido</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">R$ 297.300 (44%)</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '44%' }} />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('corp_dre')}
            className="mt-5 text-xs font-semibold text-slate-800 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 transition-colors"
          >
            <span>Ver DRE Completa da Empresa</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 6. CATEGORIAS, RETENÇÃO DE CLIENTES E ESTOQUE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* VENDAS POR CATEGORIA */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Vendas por Categoria
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Distribuição da linha de mobiliário
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { cat: 'Cadeiras Corporativas', pct: 42, val: 'R$ 287.490', cor: 'bg-slate-900 dark:bg-slate-100' },
              { cat: 'Mesas & Estações de Trabalho', pct: 28, val: 'R$ 191.660', cor: 'bg-slate-700 dark:bg-slate-300' },
              { cat: 'Armários & Arquivamento', pct: 14, val: 'R$ 95.830', cor: 'bg-slate-500 dark:bg-slate-500' },
              { cat: 'Gaveteiros & Acessórios', pct: 8, val: 'R$ 54.760', cor: 'bg-slate-400 dark:bg-slate-600' },
              { cat: 'Longarinas para Recepção', pct: 5, val: 'R$ 34.225', cor: 'bg-blue-600' },
              { cat: 'Outros Mobiliários / Kits', pct: 3, val: 'R$ 20.535', cor: 'bg-slate-300 dark:bg-slate-700' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{item.cat}</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{item.pct}% ({item.val})</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                  <div className={`h-full ${item.cor} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CLIENTES: NOVOS X RECORRENTES */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Fidelização & Recompra B2B
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Relacionamento com escritórios e arquitetos
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 mb-4 text-center">
              <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                Taxa de Recompra B2B
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                68.4%
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                Forte retenção por arquitetos parceiros
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="font-medium text-slate-600 dark:text-slate-400">Clientes Recorrentes</span>
                <span className="font-bold text-slate-900 dark:text-white">97 empresas (68%)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="font-medium text-slate-600 dark:text-slate-400">Novos Clientes no Mês</span>
                <span className="font-bold text-blue-700 dark:text-blue-400">45 empresas (32%)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('company_customers')}
            className="mt-4 text-xs font-semibold text-slate-800 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 transition-colors"
          >
            <span>Ver Base de Clientes</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* ESTOQUE: SAÚDE FÍSICA */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Saúde do Estoque
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Disponibilidade física no galpão Cajamar
              </p>
            </div>

            <div className="space-y-2.5 pt-1 text-xs">
              <div className="p-3 rounded-lg border border-slate-200/70 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Estoque Regular</div>
                  <div className="text-xs text-slate-500 mt-0.5">228 itens (93% dos SKUs)</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Normal
                </span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200/70 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Estoque Baixo</div>
                  <div className="text-xs text-slate-500 mt-0.5">14 itens no ponto de pedido</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  Atenção
                </span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200/70 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Ruptura (Sem Estoque)</div>
                  <div className="text-xs text-slate-500 mt-0.5">3 itens necessitam compra</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                  Repor
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('company_inventory')}
            className="mt-4 text-xs font-semibold text-slate-800 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 transition-colors"
          >
            <span>Ver Inventário Completo</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
