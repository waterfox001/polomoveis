import React, { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, TrendingUp, Calendar, Plus, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/UIComponents';

export const StrategyOKRsView: React.FC = () => {
  const { okrs } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 - 2026');

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SectionHeader
        title="Planejamento Estratégico & Metas OKRs"
        subtitle="Alinhamento corporativo dos Objetivos e Resultados-Chave da Polo Móveis"
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Ciclo:</span>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 font-medium shadow-2xs"
            >
              <option value="Q4 - 2026">Q4 - 2026 (Outubro a Dezembro)</option>
              <option value="Q3 - 2026">Q3 - 2026 (Encerrado)</option>
              <option value="Ano 2026">Consolidado Anual 2026</option>
            </select>
          </div>
        }
      />

      {/* Strategic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Progresso Geral das Metas</div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">83.0%</div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">6 de 7 Key Results no prazo</div>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Objetivo de Receita Mensal</div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">R$ 850.000 / mês</div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">+25% expansão anual</div>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Margem Mínima Alvo</div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">50.0% Bruta</div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Atual: 51.4% (Meta batida)</div>
        </div>
      </div>

      {/* OKR Cards List */}
      <div className="space-y-6">
        {okrs.map((okr) => (
          <div
            key={okr.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-slate-100 text-slate-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider font-mono dark:bg-slate-800 dark:text-slate-300">
                    {okr.department}
                  </span>
                  <span className="text-xs text-slate-400">{okr.period}</span>
                </div>
                <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-slate-100">{okr.objective}</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-semibold text-slate-400">Progresso</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">{okr.progress}%</div>
                </div>
                <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-slate-900 dark:bg-amber-500 rounded-full"
                    style={{ width: `${okr.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Key Results List */}
            <div className="space-y-3">
              {okr.keyResults.map((kr) => (
                <div
                  key={kr.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        {kr.description}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500 mt-1">
                      <span>Atual: <strong className="text-slate-900 dark:text-slate-100">{kr.current}</strong></span>
                      <span>Meta: <strong className="text-slate-900 dark:text-slate-100">{kr.target}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right min-w-[70px]">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          kr.status === 'Concluído'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : kr.status === 'No Prazo'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-300'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300'
                        }`}
                      >
                        {kr.status}
                      </span>
                    </div>

                    <div className="w-20 bg-slate-200/80 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full"
                        style={{ width: `${kr.progressPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 w-10 text-right">
                      {kr.progressPercent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
