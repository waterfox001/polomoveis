export type ViewId =
  // INÍCIO
  | 'home_overview'
  | 'home_updates'
  // EMPRESA
  | 'company_sales'
  | 'company_customers'
  | 'company_products'
  | 'company_inventory'
  | 'company_deliveries'
  | 'company_finance'
  // PLANEJAMENTO
  | 'planning_goals'
  | 'planning_tasks'
  // MEU FINANCEIRO
  | 'personal_overview'
  | 'personal_transactions'
  | 'personal_accounts'
  | 'personal_cards'
  | 'personal_recurring'
  | 'personal_investments'
  | 'personal_networth'
  | 'personal_reports'
  | 'personal_trash'
  // FINANCEIRO DA EMPRESA
  | 'corp_overview'
  | 'corp_properties'
  | 'corp_contracts'
  | 'corp_transactions'
  | 'corp_accounts'
  | 'corp_cards'
  | 'corp_fixed_costs'
  | 'corp_dre'
  | 'corp_reports'
  | 'corp_trash'
  // CONFIGURAÇÕES
  | 'settings_account'
  | 'settings_company'
  | 'settings_preferences'
  // ATALHOS / LEGADO
  | 'dashboard'
  | 'alerts'
  | 'strategy'
  | 'bi'
  | 'crm'
  | 'quotes'
  | 'customers'
  | 'products'
  | 'inventory'
  | 'suppliers'
  | 'operational'
  | 'logistics'
  | 'finance'
  | 'tasks'
  | 'rankings'
  | 'reports'
  | 'documents'
  | 'client-portal'
  | 'ecommerce'
  | 'website'
  | 'automations'
  | 'settings'
  | 'audit';

export type ThemeMode = 'light' | 'dark' | 'auto';

export type UserRole =
  | 'admin'
  | 'director'
  | 'manager'
  | 'financial'
  | 'sales'
  | 'operations'
  | 'logistics';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  avatar: string;
  department: string;
  branch: string;
}

export interface Company {
  id: string;
  name: string;
  subtitle: string;
  tradeName: string;
  cnpj: string;
  segment: string;
  headquarters: string;
  phone: string;
  email: string;
  primaryColor: string;
  logoText: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'Cadeiras' | 'Mesas' | 'Armários' | 'Estantes' | 'Móveis de Aço' | 'Longarinas' | 'Gaveteiros' | 'Kits';
  subcategory: string;
  brand: string;
  supplier: string;
  costPrice: number;
  salePrice: number;
  promotionalPrice?: number;
  marginPercent: number;
  stockCurrent: number;
  stockReserved: number;
  stockAvailable: number;
  stockMin: number;
  stockMax: number;
  location: string;
  abcClass: 'A' | 'B' | 'C';
  leadTimeDays: number;
  inStock: boolean;
  image?: string;
  description: string;
  dimensions: string;
  warrantyMonths: number;
  lastSoldDaysAgo: number;
}

export interface Customer {
  id: string;
  name: string;
  tradeName?: string;
  document: string;
  type: 'PJ' | 'PF';
  email: string;
  phone: string;
  whatsapp: string;
  contactPerson: string;
  segment: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
  assignedSalesperson: string;
  creditLimit: number;
  creditUsed: number;
  creditAvailable: number;
  totalSpent: number;
  ordersCount: number;
  averageTicket: number;
  lastPurchaseDate: string;
  csatRating: number;
  status: 'Ativo' | 'Inativo' | 'Em Prospecção';
  tags: string[];
}

export type PipelineStage =
  | 'lead'
  | 'qualificacao'
  | 'contato'
  | 'necessidade'
  | 'orcamento'
  | 'proposta'
  | 'negociacao'
  | 'fechado'
  | 'perdido';

export type OrderOperationalStatus =
  | 'venda_aprovada'
  | 'reserva_estoque'
  | 'separacao'
  | 'conferencia'
  | 'expedicao'
  | 'transporte'
  | 'entrega'
  | 'montagem'
  | 'instalacao'
  | 'finalizado';

export interface QuoteItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  unitCost?: number;
  discountPercent: number;
  totalPrice?: number;
  total?: number;
  marginPercent?: number;
  leadTimeDays?: number;
}

export interface Quote {
  id: string;
  code: string;
  customerId: string;
  customerName: string;
  customerCompany?: string;
  customerDocument?: string;
  customerPhone?: string;
  date: string;
  validUntil: string;
  items: QuoteItem[];
  subtotal: number;
  discountTotal: number;
  shippingFee: number;
  freightCost?: number;
  assemblyFee: number;
  assemblyCost?: number;
  taxTotal: number;
  total: number;
  paymentTerms: string;
  deliveryDays: number;
  status: 'Rascunho' | 'Enviado' | 'Aprovado' | 'Aprovada' | 'Recusado' | 'Expirado';
  notes?: string;
}

export interface FinancialTransaction {
  id: string;
  description: string;
  amount: number;
  type: 'receita' | 'despesa';
  date: string;
  dueDate?: string;
  category: string;
  account: string;
  status: 'Pago' | 'Pendente' | 'Atrasado';
  documentRef?: string;
  entityName?: string;
}

export interface Deal {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  customerCompany?: string;
  value: number;
  weightedValue: number;
  probability: number;
  stage: PipelineStage;
  salesperson: string;
  source: string;
  productsOfInterest: string[];
  expectedCloseDate: string;
  createdAt: string;
  lastInteraction: string;
  notes: string;
}

export interface Order {
  id: string;
  code: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  date: string;
  deliveryEstimate: string;
  totalValue: number;
  itemsCount: number;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  operationalStatus:
    | 'venda_aprovada'
    | 'reserva_estoque'
    | 'separacao'
    | 'conferencia'
    | 'expedicao'
    | 'transporte'
    | 'entrega'
    | 'montagem'
    | 'finalizado';
  paymentStatus: 'Pago' | 'Faturado 30/60DD' | 'Aguardando Pagamento';
  driver?: string;
  vehicle?: string;
  progressPercent: number;
  trackingCode: string;
  assemblyTeam?: string;
}

export interface Delivery {
  id: string;
  orderCode: string;
  customerName: string;
  address: string;
  driver: string;
  vehicle: string;
  plate: string;
  departureTime: string;
  estimatedArrival: string;
  status: 'Preparando' | 'Separando' | 'Em rota' | 'Entregue';
  podReceived: boolean;
  assemblyRequired?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  department: string;
  priority: 'Baixa' | 'Média' | 'Alta' | 'Urgente';
  column: 'backlog' | 'hoje' | 'andamento' | 'aguardando' | 'concluido';
  dueDate: string;
  checklist: Array<{ id: string; text: string; done: boolean }>;
}

export interface GoalOKR {
  id: string;
  objective: string;
  department: string;
  progress: number;
  period: string;
  keyResults: Array<{
    id: string;
    description: string;
    target: string;
    current: string;
    progressPercent: number;
    status: 'No Prazo' | 'Atenção' | 'Concluído';
  }>;
}

// ==========================================
// MEU FINANCEIRO (PESSOAL)
// ==========================================

export interface PersonalTransaction {
  id: string;
  description: string;
  amount: number;
  type: 'receita' | 'despesa' | 'transferencia';
  date: string;
  category:
    | 'Alimentação'
    | 'Moradia'
    | 'Transporte'
    | 'Saúde'
    | 'Educação'
    | 'Lazer'
    | 'Investimentos'
    | 'Pró-Labore'
    | 'Dividendos'
    | 'Outros';
  account: string;
  card?: string;
  beneficiary?: string;
  status: 'Pago' | 'Pendente';
  notes?: string;
  isRecurring?: boolean;
}

export interface PersonalAccount {
  id: string;
  name: string;
  bank: string;
  type: 'Conta Corrente' | 'Poupança' | 'Conta Digital' | 'Carteira / Dinheiro';
  balance: number;
  incomeMonth: number;
  expenseMonth: number;
  icon?: string;
}

export interface PersonalCard {
  id: string;
  name: string;
  bank: string;
  limit: number;
  availableLimit: number;
  currentInvoice: number;
  nextInvoice: number;
  closingDay: number;
  dueDay: number;
  brand: 'Mastercard Black' | 'Visa Infinite' | 'Elo Nanquim' | 'Visa Platinum';
}

export interface PersonalRecurring {
  id: string;
  title: string;
  category: string;
  amount: number;
  frequency: 'Mensal' | 'Semanal' | 'Anual';
  dueDay: number;
  status: 'Ativo' | 'Pausado';
  account: string;
}

export interface PersonalInvestment {
  id: string;
  name: string;
  category: 'Renda Fixa' | 'Ações' | 'Fundos Imobiliários' | 'Fundos Multimercado' | 'Criptomoedas' | 'Previdência';
  institution: string;
  investedAmount: number;
  currentAmount: number;
  profit: number;
  profitabilityPercent: number;
  allocationPercent: number;
}

export interface PersonalAsset {
  id: string;
  name: string;
  category: 'Dinheiro & Contas' | 'Investimentos' | 'Imóveis' | 'Veículos' | 'Outros Bens';
  value: number;
  acquisitionDate?: string;
}

export interface PersonalDebt {
  id: string;
  name: string;
  category: 'Financiamento Imobiliário' | 'Financiamento Veículo' | 'Empréstimo' | 'Parcelamento Cartão';
  originalAmount: number;
  remainingAmount: number;
  installmentsRemaining: number;
  nextDue: string;
  nextAmount: number;
}

// ==========================================
// FINANCEIRO DA EMPRESA (CORPORATIVO)
// ==========================================

export interface CorporateTransaction {
  id: string;
  description: string;
  amount: number;
  type: 'receita' | 'despesa' | 'transferencia';
  date: string;
  dueDate: string;
  category:
    | 'Venda Mobiliário'
    | 'Fornecedores Matéria-Prima'
    | 'Folha Montagem & Salários'
    | 'Logística & Frete'
    | 'Impostos'
    | 'Comissões Vendas'
    | 'Aluguel & Infra'
    | 'Outros';
  account: string;
  entityName: string; // Cliente ou Fornecedor
  costCenter: 'Comercial' | 'Operações' | 'Administrativo' | 'Logística' | 'Diretoria';
  status: 'Pago' | 'Pendente' | 'Atrasado';
  documentRef?: string;
}

export interface CorporateAccount {
  id: string;
  name: string;
  bank: string;
  type: 'Conta Corrente PJ' | 'Reserva Emergência' | 'Caixa Operacional';
  balance: number;
  yieldInfo?: string;
}

export interface CorporateCard {
  id: string;
  name: string;
  holder: string;
  bank: string;
  limit: number;
  availableLimit: number;
  currentInvoice: number;
  dueDay: number;
}

export interface CorporateFixedCost {
  id: string;
  name: string;
  category: string;
  monthlyAmount: number;
  dueDay: number;
  responsible: string;
  status: 'Ativo' | 'Em Renegociação';
}

export interface CorporateProperty {
  id: string;
  name: string;
  address: string;
  type: 'Galpão Logístico' | 'Showroom Comercial' | 'Fábrica Parceira';
  marketValue: number;
  rentAmount: number;
  monthlyExpenses: number;
  contractDue: string;
  occupancyStatus: 'Próprio' | 'Locado';
  roiPercent: number;
}

export interface CorporateContract {
  id: string;
  customerName: string;
  contractCode: string;
  title: string;
  monthlyValue: number;
  totalValue: number;
  startDate: string;
  endDate: string;
  daysToRenew: number;
  status: 'Ativo' | 'Renovação Próxima' | 'Encerrado';
  terms: string;
}

// Updates / Novidades
export interface PlatformUpdate {
  id: string;
  date: string;
  tag: string;
  title: string;
  description: string;
  badge?: string;
}
