import React, { useState } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Users,
  Armchair,
  Boxes,
  Truck,
  DollarSign,
  Target,
  CheckSquare,
  CreditCard,
  Wallet,
  Repeat,
  TrendingUp,
  Landmark,
  FileBarChart,
  Trash2,
  Building2,
  FileSignature,
  FileText,
  Sliders,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  User,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewId } from '../../types';

interface MenuItem {
  id: ViewId;
  label: string;
  icon: any;
  badge?: string | number;
}

interface MenuGroup {
  title: string;
  defaultOpen?: boolean;
  items: MenuItem[];
}

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, company, orders, personalTrash, corporateTrash } = useApp();

  // Grupos expansíveis para manter tudo limpo
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    INÍCIO: true,
    EMPRESA: true,
    PLANEJAMENTO: false,
    'MEU FINANCEIRO': true,
    'FINANCEIRO DA EMPRESA': false,
    CONFIGURAÇÕES: false,
  });

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const menuGroups: MenuGroup[] = [
    {
      title: 'INÍCIO',
      items: [
        { id: 'home_overview', label: 'Visão Geral', icon: LayoutDashboard },
        { id: 'home_updates', label: 'Novidades', icon: Sparkles, badge: 'Novo' },
      ],
    },
    {
      title: 'EMPRESA',
      items: [
        { id: 'company_sales', label: 'Vendas', icon: ShoppingBag },
        { id: 'company_customers', label: 'Clientes', icon: Users },
        { id: 'company_products', label: 'Produtos', icon: Armchair },
        { id: 'company_inventory', label: 'Estoque', icon: Boxes },
        { id: 'company_deliveries', label: 'Entregas', icon: Truck, badge: '2 Hoje' },
        { id: 'company_finance', label: 'Financeiro', icon: DollarSign },
      ],
    },
    {
      title: 'PLANEJAMENTO',
      items: [
        { id: 'planning_goals', label: 'Metas', icon: Target },
        { id: 'planning_tasks', label: 'Tarefas', icon: CheckSquare },
      ],
    },
    {
      title: 'MEU FINANCEIRO',
      items: [
        { id: 'personal_overview', label: 'Visão Geral', icon: Wallet },
        { id: 'personal_transactions', label: 'Lançamentos', icon: DollarSign },
        { id: 'personal_accounts', label: 'Contas', icon: Landmark },
        { id: 'personal_cards', label: 'Cartões', icon: CreditCard },
        { id: 'personal_recurring', label: 'Recorrências', icon: Repeat },
        { id: 'personal_investments', label: 'Investimentos', icon: TrendingUp },
        { id: 'personal_networth', label: 'Patrimônio & Dívidas', icon: Building },
        { id: 'personal_reports', label: 'Relatórios', icon: FileBarChart },
        {
          id: 'personal_trash',
          label: 'Lixeira',
          icon: Trash2,
          badge: personalTrash.length > 0 ? personalTrash.length : undefined,
        },
      ],
    },
    {
      title: 'FINANCEIRO DA EMPRESA',
      items: [
        { id: 'corp_overview', label: 'Visão Geral', icon: DollarSign },
        { id: 'corp_properties', label: 'Imóveis', icon: Building2 },
        { id: 'corp_contracts', label: 'Clientes e Contratos', icon: FileSignature, badge: '1 Alerta' },
        { id: 'corp_transactions', label: 'Lançamentos', icon: FileText },
        { id: 'corp_accounts', label: 'Contas e Reservas', icon: Landmark },
        { id: 'corp_cards', label: 'Cartões', icon: CreditCard },
        { id: 'corp_fixed_costs', label: 'Custos Fixos', icon: Repeat },
        { id: 'corp_dre', label: 'DRE', icon: FileBarChart },
        { id: 'corp_reports', label: 'Relatórios', icon: FileBarChart },
        {
          id: 'corp_trash',
          label: 'Lixeira',
          icon: Trash2,
          badge: corporateTrash.length > 0 ? corporateTrash.length : undefined,
        },
      ],
    },
    {
      title: 'CONFIGURAÇÕES',
      items: [
        { id: 'settings_account', label: 'Minha Conta', icon: User },
        { id: 'settings_company', label: 'Empresa', icon: Building2 },
        { id: 'settings_preferences', label: 'Preferências', icon: Sliders },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 flex flex-col border-r border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950 transition-colors z-40 select-none">
      {/* Brand Logo Header */}
      <div className="flex h-16 items-center px-5 border-b border-slate-200/80 dark:border-slate-800">
        <button
          onClick={() => setActiveView('home_overview')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-extrabold text-sm dark:bg-white dark:text-slate-900 shadow-xs">
            P
          </div>
          <div>
            <div className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              POLO MÓVEIS
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Gestão 360° · Corporativo
            </div>
          </div>
        </button>
      </div>

      {/* Navigation Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {menuGroups.map((group) => {
          const isOpen = openGroups[group.title] ?? false;
          const hasActiveItem = group.items.some((it) => it.id === activeView);

          return (
            <div key={group.title} className="space-y-1">
              {/* Accordion Group Header */}
              <button
                onClick={() => toggleGroup(group.title)}
                className={`flex w-full items-center justify-between px-2.5 py-1.5 text-xs font-bold tracking-wider transition-colors uppercase ${
                  hasActiveItem
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <span>{group.title}</span>
                {isOpen ? (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                )}
              </button>

              {/* Group Items */}
              {isOpen && (
                <div className="space-y-0.5 pt-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-slate-100 text-slate-950 font-bold dark:bg-slate-800 dark:text-white shadow-2xs'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/60 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon
                            className={`h-4 w-4 shrink-0 transition-colors ${
                              isActive
                                ? 'text-slate-950 dark:text-white'
                                : 'text-slate-400 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              item.badge === 'Novo'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                                : item.badge === '1 Alerta'
                                ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Minimalista */}
      <div className="p-3.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">Polo Móveis 360°</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Online</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
