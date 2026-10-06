import React, { useState } from 'react';
import {
  Briefcase,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  ArrowRight,
  Phone,
  Mail,
  Building,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/UIComponents';

export const SuppliersView: React.FC = () => {
  const { suppliers } = useApp();
  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]);

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Gestão de Compras & Fornecedores Homologados"
        subtitle="Quadro de suprimentos industriais, matriz comparativa de desempenho e acordos de fornecimento"
      />

      {/* Side-by-Side Comparison Matrix (A x B x C) */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-500" />
            Matriz Comparativa Homologada: Fornecedor A × B × C
          </h3>
          <p className="text-xs text-slate-400">
            Comparativo de pontualidade, qualidade fabril e prazos médios de entrega para reposição
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {suppliers.map((sup, idx) => (
            <div
              key={sup.id}
              onClick={() => setSelectedSupplier(sup)}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                selectedSupplier.id === sup.id
                  ? 'border-amber-500 bg-slate-900 shadow-md'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="rounded bg-slate-800 text-slate-300 px-1.5 py-0.5 text-[10px] font-mono font-bold">
                  Parceiro {String.fromCharCode(65 + idx)}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold font-mono">
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  {sup.rating}
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{sup.name}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{sup.category}</p>

              <div className="mt-3 space-y-1.5 text-xs border-t border-slate-800 pt-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Qualidade:</span>
                  <span className="font-bold text-emerald-400">{sup.qualityScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pontualidade:</span>
                  <span className="font-bold text-sky-400">{sup.punctualityScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lead Time:</span>
                  <span className="font-bold text-slate-200">{sup.leadTimeDays} dias</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Competitividade:</span>
                  <span className="font-bold text-amber-400">{sup.priceCompetitiveness}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Supplier Detail & Products Supplied */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-100">{selectedSupplier.name}</h3>
              <span className="rounded bg-amber-500/10 text-amber-400 px-2 py-0.5 text-xs font-bold font-mono">
                CNPJ: {selectedSupplier.cnpj}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{selectedSupplier.category}</p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              <Phone className="h-3.5 w-3.5 text-amber-400" />
              <span>{selectedSupplier.phone}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              <Mail className="h-3.5 w-3.5 text-amber-400" />
              <span>{selectedSupplier.email}</span>
            </div>
          </div>
        </div>

        {/* Supplied Products */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Componentes & Linhas Fornecidas para a Polo Móveis
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {selectedSupplier.suppliedProducts.map((prodName: string, idx: number) => (
              <div
                key={idx}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{prodName}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Condições de Faturamento Acordadas: <strong className="text-slate-200">{selectedSupplier.paymentTerms}</strong></span>
          <span className="font-mono text-emerald-400">Acordo de Nível de Serviço (SLA) Ativo</span>
        </div>
      </div>
    </div>
  );
};
