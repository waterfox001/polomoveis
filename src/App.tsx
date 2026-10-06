import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { QuickActionModal } from './components/layout/QuickActionModal';

// Views - Início
import { HomeOverviewView } from './views/HomeOverviewView';
import { HomeUpdatesView } from './views/HomeUpdatesView';

// Views - Empresa
import { CrmPipelineView } from './views/CrmPipelineView';
import { CustomersView } from './views/CustomersView';
import { ProductsCatalogView } from './views/ProductsCatalogView';
import { InventoryView } from './views/InventoryView';
import { LogisticsView } from './views/LogisticsView';
import { QuotesBuilderView } from './views/QuotesBuilderView';
import { SuppliersView } from './views/SuppliersView';
import { OperationalView } from './views/OperationalView';
import { RankingsView } from './views/RankingsView';
import { DocumentsView } from './views/DocumentsView';
import { ClientPortalView } from './views/ClientPortalView';
import { EcommerceStoreView } from './views/EcommerceStoreView';
import { InstitutionalWebsiteView } from './views/InstitutionalWebsiteView';
import { AutomationsAlertsView } from './views/AutomationsAlertsView';
import { PoloIntelligenceView } from './views/PoloIntelligenceView';

// Views - Planejamento
import { StrategyOKRsView } from './views/StrategyOKRsView';
import { TasksView } from './views/TasksView';

// Views - Meu Financeiro (Pessoal)
import { PersonalOverviewView } from './views/personal/PersonalOverviewView';
import { PersonalTransactionsView } from './views/personal/PersonalTransactionsView';
import { PersonalAccountsView } from './views/personal/PersonalAccountsView';
import { PersonalCardsView } from './views/personal/PersonalCardsView';
import { PersonalRecurringView } from './views/personal/PersonalRecurringView';
import { PersonalInvestmentsView } from './views/personal/PersonalInvestmentsView';
import { PersonalNetWorthView } from './views/personal/PersonalNetWorthView';
import { PersonalReportsView } from './views/personal/PersonalReportsView';
import { PersonalTrashView } from './views/personal/PersonalTrashView';

// Views - Financeiro da Empresa (Corporativo)
import { CorporateOverviewView } from './views/corporate/CorporateOverviewView';
import { CorporatePropertiesView } from './views/corporate/CorporatePropertiesView';
import { CorporateContractsView } from './views/corporate/CorporateContractsView';
import { CorporateTransactionsView } from './views/corporate/CorporateTransactionsView';
import { CorporateAccountsView } from './views/corporate/CorporateAccountsView';
import { CorporateCardsView } from './views/corporate/CorporateCardsView';
import { CorporateFixedCostsView } from './views/corporate/CorporateFixedCostsView';
import { CorporateDREView } from './views/corporate/CorporateDREView';
import { CorporateReportsView } from './views/corporate/CorporateReportsView';
import { CorporateTrashView } from './views/corporate/CorporateTrashView';

// Views - Configurações
import { SettingsAccountView } from './views/settings/SettingsAccountView';
import { SettingsCompanyView } from './views/settings/SettingsCompanyView';
import { SettingsPreferencesView } from './views/settings/SettingsPreferencesView';
import { SettingsAuditView } from './views/SettingsAuditView';

const MainContentRouter: React.FC = () => {
  const { activeView } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      // INÍCIO
      case 'home_overview':
        return <HomeOverviewView />;
      case 'home_updates':
        return <HomeUpdatesView />;

      // EMPRESA
      case 'company_sales':
        return <CrmPipelineView />;
      case 'company_customers':
        return <CustomersView />;
      case 'company_products':
        return <ProductsCatalogView />;
      case 'company_inventory':
        return <InventoryView />;
      case 'company_deliveries':
        return <LogisticsView />;
      case 'company_finance':
        return <CorporateOverviewView />;

      // PLANEJAMENTO
      case 'planning_goals':
        return <StrategyOKRsView />;
      case 'planning_tasks':
        return <TasksView />;

      // MEU FINANCEIRO (PESSOAL)
      case 'personal_overview':
        return <PersonalOverviewView />;
      case 'personal_transactions':
        return <PersonalTransactionsView />;
      case 'personal_accounts':
        return <PersonalAccountsView />;
      case 'personal_cards':
        return <PersonalCardsView />;
      case 'personal_recurring':
        return <PersonalRecurringView />;
      case 'personal_investments':
        return <PersonalInvestmentsView />;
      case 'personal_networth':
        return <PersonalNetWorthView />;
      case 'personal_reports':
        return <PersonalReportsView />;
      case 'personal_trash':
        return <PersonalTrashView />;

      // FINANCEIRO DA EMPRESA (CORPORATIVO)
      case 'corp_overview':
        return <CorporateOverviewView />;
      case 'corp_properties':
        return <CorporatePropertiesView />;
      case 'corp_contracts':
        return <CorporateContractsView />;
      case 'corp_transactions':
        return <CorporateTransactionsView />;
      case 'corp_accounts':
        return <CorporateAccountsView />;
      case 'corp_cards':
        return <CorporateCardsView />;
      case 'corp_fixed_costs':
        return <CorporateFixedCostsView />;
      case 'corp_dre':
        return <CorporateDREView />;
      case 'corp_reports':
        return <CorporateReportsView />;
      case 'corp_trash':
        return <CorporateTrashView />;

      // CONFIGURAÇÕES
      case 'settings_account':
        return <SettingsAccountView />;
      case 'settings_company':
        return <SettingsCompanyView />;
      case 'settings_preferences':
        return <SettingsPreferencesView />;

      // ATALHOS & LEGADO COMPATÍVEL
      case 'dashboard' as any:
        return <HomeOverviewView />;
      case 'crm' as any:
        return <CrmPipelineView />;
      case 'quotes' as any:
        return <QuotesBuilderView />;
      case 'customers' as any:
        return <CustomersView />;
      case 'products' as any:
        return <ProductsCatalogView />;
      case 'inventory' as any:
        return <InventoryView />;
      case 'suppliers' as any:
        return <SuppliersView />;
      case 'operational' as any:
        return <OperationalView />;
      case 'logistics' as any:
        return <LogisticsView />;
      case 'finance' as any:
        return <CorporateOverviewView />;
      case 'strategy' as any:
        return <StrategyOKRsView />;
      case 'tasks' as any:
        return <TasksView />;
      case 'rankings' as any:
        return <RankingsView />;
      case 'documents' as any:
        return <DocumentsView />;
      case 'client-portal' as any:
        return <ClientPortalView />;
      case 'ecommerce' as any:
        return <EcommerceStoreView />;
      case 'website' as any:
        return <InstitutionalWebsiteView />;
      case 'automations' as any:
      case 'alerts' as any:
        return <AutomationsAlertsView />;
      case 'bi' as any:
        return <PoloIntelligenceView />;
      case 'settings' as any:
      case 'audit' as any:
        return <SettingsAuditView />;

      default:
        return <HomeOverviewView />;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/70 dark:bg-slate-950 transition-colors">
      <div className="max-w-[1600px] mx-auto pb-12">
        {renderActiveView()}
      </div>
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors">
        {/* Fixed Collapsible Sidebar */}
        <Sidebar />

        {/* Main View Area with Top Header */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <MainContentRouter />
        </div>

        {/* Interactive Modals */}
        <GlobalSearchModal />
        <QuickActionModal />
      </div>
    </AppProvider>
  );
}
