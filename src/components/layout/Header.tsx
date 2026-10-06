import React, { useState } from 'react';
import {
  Search,
  Plus,
  Bell,
  Sun,
  Moon,
  Laptop,
  CheckCircle2,
  ChevronDown,
  User as UserIcon,
  ShoppingBag,
  DollarSign,
  Package,
  Layers,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useApp, QuickModalType } from '../../context/AppContext';
import { ViewId } from '../../types';

const viewTitles: Partial<Record<ViewId, { section: string; title: string }>> = {
  // INÍCIO
  home_overview: { section: 'Início', title: 'Visão Geral' },
  home_updates: { section: 'Início', title: 'Novidades & Avisos' },

  // EMPRESA
  company_sales: { section: 'Empresa', title: 'Vendas & Negociações' },
  company_customers: { section: 'Empresa', title: 'Clientes' },
  company_products: { section: 'Empresa', title: 'Produtos' },
  company_inventory: { section: 'Empresa', title: 'Estoque' },
  company_deliveries: { section: 'Empresa', title: 'Entregas' },
  company_finance: { section: 'Empresa', title: 'Financeiro' },

  // PLANEJAMENTO
  planning_goals: { section: 'Planejamento', title: 'Metas da Empresa' },
  planning_tasks: { section: 'Planejamento', title: 'Tarefas da Equipe' },

  // MEU FINANCEIRO (PESSOAL)
  personal_overview: { section: 'Meu Financeiro', title: 'Visão Geral Pessoal' },
  personal_transactions: { section: 'Meu Financeiro', title: 'Lançamentos' },
  personal_accounts: { section: 'Meu Financeiro', title: 'Contas Bancárias' },
  personal_cards: { section: 'Meu Financeiro', title: 'Cartões de Crédito' },
  personal_recurring: { section: 'Meu Financeiro', title: 'Recorrências & Despesas Fixas' },
  personal_investments: { section: 'Meu Financeiro', title: 'Investimentos & Carteira' },
  personal_networth: { section: 'Meu Financeiro', title: 'Patrimônio & Dívidas' },
  personal_reports: { section: 'Meu Financeiro', title: 'Relatório Financeiro Pessoal' },
  personal_trash: { section: 'Meu Financeiro', title: 'Lixeira Pessoal' },

  // FINANCEIRO DA EMPRESA
  corp_overview: { section: 'Financeiro da Empresa', title: 'Visão Geral' },
  corp_properties: { section: 'Financeiro da Empresa', title: 'Imóveis & Instalações' },
  corp_contracts: { section: 'Financeiro da Empresa', title: 'Clientes e Contratos' },
  corp_transactions: { section: 'Financeiro da Empresa', title: 'Lançamentos PJ' },
  corp_accounts: { section: 'Financeiro da Empresa', title: 'Contas & Reservas PJ' },
  corp_cards: { section: 'Financeiro da Empresa', title: 'Cartões Corporativos' },
  corp_fixed_costs: { section: 'Financeiro da Empresa', title: 'Custos Fixos Mensais' },
  corp_dre: { section: 'Financeiro da Empresa', title: 'DRE Visual' },
  corp_reports: { section: 'Financeiro da Empresa', title: 'Relatórios Gerenciais' },
  corp_trash: { section: 'Financeiro da Empresa', title: 'Lixeira da Empresa' },

  // CONFIGURAÇÕES
  settings_account: { section: 'Configurações', title: 'Minha Conta' },
  settings_company: { section: 'Configurações', title: 'Dados da Empresa' },
  settings_preferences: { section: 'Configurações', title: 'Preferências' },
};

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    theme,
    setTheme,
    user,
    company,
    setIsSearchOpen,
    openQuickAction,
  } = useApp();

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const viewInfo = viewTitles[activeView] || { section: 'Início', title: 'Visão Geral' };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 md:px-7 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 transition-colors">
      {/* 1. Breadcrumbs Limpos */}
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <span className="font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          {company.name}
        </span>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
          {viewInfo.section}
        </span>
        <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">/</span>
        <h1 className="font-semibold text-slate-800 dark:text-slate-200">
          {viewInfo.title}
        </h1>
      </div>

      {/* 2. Campo de Busca Central Minimalista */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-100/70 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:border-slate-600"
        >
          <div className="flex items-center gap-2.5">
            <Search className="h-4 w-4 text-slate-400" />
            <span>Pesquisar clientes, produtos, vendas, lançamentos...</span>
          </div>
          <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:border-slate-700 dark:bg-slate-800">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* 3. Ações: + Adicionar, Tema, Notificações e Perfil */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          title="Buscar"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Botão Global: + ADICIONAR */}
        <div className="relative">
          <button
            onClick={() => setQuickMenuOpen(!quickMenuOpen)}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Adicionar</span>
            <ChevronDown className="h-3 w-3 opacity-70" />
          </button>

          {quickMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50 animate-fade-in">
              <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                Nova Ação Rápida
              </div>
              <button
                onClick={() => {
                  setQuickMenuOpen(false);
                  openQuickAction('venda');
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <ShoppingBag className="h-3.5 w-3.5 text-emerald-600" />
                <span>Nova Venda</span>
              </button>
              <button
                onClick={() => {
                  setQuickMenuOpen(false);
                  openQuickAction('cliente');
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <UserIcon className="h-3.5 w-3.5 text-blue-600" />
                <span>Novo Cliente</span>
              </button>
              <button
                onClick={() => {
                  setQuickMenuOpen(false);
                  openQuickAction('produto');
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Package className="h-3.5 w-3.5 text-indigo-600" />
                <span>Novo Produto</span>
              </button>
              <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
              <button
                onClick={() => {
                  setQuickMenuOpen(false);
                  openQuickAction('receita');
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                <span>Nova Entrada Financeira</span>
              </button>
              <button
                onClick={() => {
                  setQuickMenuOpen(false);
                  openQuickAction('despesa');
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <DollarSign className="h-3.5 w-3.5 text-rose-500" />
                <span>Nova Despesa / Saída</span>
              </button>
              <button
                onClick={() => {
                  setQuickMenuOpen(false);
                  openQuickAction('tarefa');
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Layers className="h-3.5 w-3.5 text-amber-600" />
                <span>Nova Tarefa</span>
              </button>
              <button
                onClick={() => {
                  setQuickMenuOpen(false);
                  openQuickAction('investimento');
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <TrendingUp className="h-3.5 w-3.5 text-purple-600" />
                <span>Novo Investimento</span>
              </button>
            </div>
          )}
        </div>

        {/* Alternador de Tema: Claro / Escuro / Auto */}
        <div className="relative">
          <button
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            title="Alternar Tema Claro / Escuro"
          >
            {theme === 'light' ? (
              <Sun className="h-4 w-4" />
            ) : theme === 'dark' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Laptop className="h-4 w-4" />
            )}
          </button>

          {themeMenuOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50">
              <button
                onClick={() => {
                  setTheme('light');
                  setThemeMenuOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs ${
                  theme === 'light'
                    ? 'bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
                <span>Claro</span>
              </button>
              <button
                onClick={() => {
                  setTheme('dark');
                  setThemeMenuOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs ${
                  theme === 'dark'
                    ? 'bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
                <span>Escuro</span>
              </button>
              <button
                onClick={() => {
                  setTheme('auto');
                  setThemeMenuOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs ${
                  theme === 'auto'
                    ? 'bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                }`}
              >
                <Laptop className="h-3.5 w-3.5" />
                <span>Automático</span>
              </button>
            </div>
          )}
        </div>

        {/* Notificações Inteligentes */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            title="Notificações"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Notificações Importantes
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  3 pendentes
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div
                  onClick={() => {
                    setActiveView('company_finance');
                    setNotificationsOpen(false);
                  }}
                  className="cursor-pointer rounded-lg p-2.5 bg-slate-50/80 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 transition-colors"
                >
                  <div className="font-bold text-rose-700 dark:text-rose-400">3 contas vencem hoje</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Fornecedor ErgoTech (R$ 20.400) e diárias de montagem.
                  </div>
                </div>
                <div
                  onClick={() => {
                    setActiveView('company_inventory');
                    setNotificationsOpen(false);
                  }}
                  className="cursor-pointer rounded-lg p-2.5 bg-slate-50/80 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 transition-colors"
                >
                  <div className="font-bold text-amber-800 dark:text-amber-400">5 produtos em estoque baixo</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Cadeira Aero Pro e Gaveteiro Volante no ponto de pedido.
                  </div>
                </div>
                <div
                  onClick={() => {
                    setActiveView('corp_contracts');
                    setNotificationsOpen(false);
                  }}
                  className="cursor-pointer rounded-lg p-2.5 bg-slate-50/80 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 transition-colors"
                >
                  <div className="font-bold text-blue-700 dark:text-blue-400">Contrato Banco Zenith vence em 27 dias</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Contrato anual R$ 18.500/mês elegível para renovação.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Perfil do Usuário */}
        <button
          onClick={() => setActiveView('settings_account')}
          className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold dark:bg-white dark:text-slate-900 shadow-xs">
            RS
          </div>
          <div className="hidden xl:block text-left pr-1">
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              {user.name}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Diretoria Executiva
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
