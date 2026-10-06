import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ViewId,
  ThemeMode,
  Company,
  User,
  Product,
  Customer,
  Deal,
  PipelineStage,
  Order,
  Delivery,
  Task,
  GoalOKR,
  PersonalTransaction,
  PersonalAccount,
  PersonalCard,
  PersonalRecurring,
  PersonalInvestment,
  PersonalAsset,
  PersonalDebt,
  CorporateTransaction,
  CorporateAccount,
  CorporateCard,
  CorporateFixedCost,
  CorporateProperty,
  CorporateContract,
  PlatformUpdate,
} from '../types';
import {
  initialCompany,
  currentUser,
  initialProducts,
  initialCustomers,
  initialDeals,
  initialOrders,
  initialDeliveries,
  initialTasks,
  initialGoals,
  initialPersonalAccounts,
  initialPersonalCards,
  initialPersonalTransactions,
  initialPersonalRecurring,
  initialPersonalInvestments,
  initialPersonalAssets,
  initialPersonalDebts,
  initialCorporateAccounts,
  initialCorporateCards,
  initialCorporateTransactions,
  initialCorporateFixedCosts,
  initialCorporateProperties,
  initialCorporateContracts,
  initialUpdates,
} from '../data/mockData';

export type QuickModalType =
  | 'venda'
  | 'sale'
  | 'cliente'
  | 'customer'
  | 'produto'
  | 'receita'
  | 'despesa'
  | 'payment'
  | 'tarefa'
  | 'task'
  | 'entrega'
  | 'investimento'
  | 'inventory'
  | null;

interface TrashItem {
  id: string;
  originalType: 'transacao_pessoal' | 'transacao_pj' | 'contrato' | 'conta';
  title: string;
  amount?: number;
  deletedAt: string;
  payload: any;
}

interface AppContextType {
  // Tema & Navegação
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  activeView: ViewId;
  setActiveView: (view: ViewId) => void;
  company: Company;
  setCompany: (c: Company) => void;
  user: User;
  setUser: (u: User) => void;

  // Busca Global & Ação Rápida
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickActionType: QuickModalType;
  openQuickAction: (type: QuickModalType) => void;
  closeQuickAction: () => void;

  // Dados Empresa
  products: Product[];
  customers: Customer[];
  deals: Deal[];
  orders: Order[];
  deliveries: Delivery[];
  tasks: Task[];
  goals: GoalOKR[];
  updates: PlatformUpdate[];

  // Compatibilidade com Views Anteriores
  transactions: CorporateTransaction[];
  okrs: GoalOKR[];
  suppliers: any[];
  auditLogs: any[];
  quotes: any[];
  cart: Array<{ product: Product; quantity: number }>;
  inventoryMovements: any[];
  updateDealStage: (dealId: string, stage: PipelineStage) => void;
  updateOrderStatus: (orderId: string, status: any) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addQuote: (q: any) => void;
  approveQuote: (id: string) => void;
  toggleTaskChecklist: (taskId: string, checkId: string) => void;
  quickAction: { isOpen: boolean; type: string };
  addInventoryEntry: (...args: any[]) => void;
  addTransaction: (tx: any) => void;
  alerts: any[];
  resolveAlert: (id: string) => void;

  // Financeiro Pessoal
  personalAccounts: PersonalAccount[];
  personalCards: PersonalCard[];
  personalTransactions: PersonalTransaction[];
  personalRecurring: PersonalRecurring[];
  personalInvestments: PersonalInvestment[];
  personalAssets: PersonalAsset[];
  personalDebts: PersonalDebt[];
  personalTrash: TrashItem[];

  // Financeiro da Empresa
  corporateAccounts: CorporateAccount[];
  corporateCards: CorporateCard[];
  corporateTransactions: CorporateTransaction[];
  corporateFixedCosts: CorporateFixedCost[];
  corporateProperties: CorporateProperty[];
  corporateContracts: CorporateContract[];
  corporateTrash: TrashItem[];

  // Mutadores & Ações
  addPersonalTransaction: (tx: Partial<PersonalTransaction>) => void;
  deletePersonalTransaction: (id: string) => void;
  restorePersonalTrashItem: (id: string) => void;
  emptyPersonalTrash: () => void;

  addCorporateTransaction: (tx: Partial<CorporateTransaction>) => void;
  deleteCorporateTransaction: (id: string) => void;
  restoreCorporateTrashItem: (id: string) => void;
  emptyCorporateTrash: () => void;

  addCustomer: (c: Partial<Customer>) => void;
  addProduct: (p: Partial<Product>) => void;
  addDeal: (d: Partial<Deal>) => void;
  addOrder: (o: Partial<Order>) => void;
  addTask: (t: Partial<Task>) => void;
  toggleTaskCheck: (taskId: string, checkId: string) => void;
  updateTaskColumn: (taskId: string, col: Task['column']) => void;
  addPersonalInvestment: (inv: Partial<PersonalInvestment>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Tema com suporte a Light (padrão) e Dark
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('polo_theme') as ThemeMode;
    return saved || 'light';
  });

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem('polo_theme', t);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // auto
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  // Navegação
  const [activeView, setActiveView] = useState<ViewId>('home_overview');
  const [company, setCompany] = useState<Company>(initialCompany);
  const [user, setUser] = useState<User>(currentUser);

  // Modais
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickActionType, setQuickActionType] = useState<QuickModalType>(null);

  // Dados da Empresa
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [goals] = useState<GoalOKR[]>(initialGoals);
  const [updates] = useState<PlatformUpdate[]>(initialUpdates);

  // Financeiro Pessoal
  const [personalAccounts, setPersonalAccounts] = useState<PersonalAccount[]>(initialPersonalAccounts);
  const [personalCards, setPersonalCards] = useState<PersonalCard[]>(initialPersonalCards);
  const [personalTransactions, setPersonalTransactions] = useState<PersonalTransaction[]>(initialPersonalTransactions);
  const [personalRecurring, setPersonalRecurring] = useState<PersonalRecurring[]>(initialPersonalRecurring);
  const [personalInvestments, setPersonalInvestments] = useState<PersonalInvestment[]>(initialPersonalInvestments);
  const [personalAssets, setPersonalAssets] = useState<PersonalAsset[]>(initialPersonalAssets);
  const [personalDebts, setPersonalDebts] = useState<PersonalDebt[]>(initialPersonalDebts);
  const [personalTrash, setPersonalTrash] = useState<TrashItem[]>([]);

  // Financeiro Empresarial
  const [corporateAccounts, setCorporateAccounts] = useState<CorporateAccount[]>(initialCorporateAccounts);
  const [corporateCards, setCorporateCards] = useState<CorporateCard[]>(initialCorporateCards);
  const [corporateTransactions, setCorporateTransactions] = useState<CorporateTransaction[]>(initialCorporateTransactions);
  const [corporateFixedCosts, setCorporateFixedCosts] = useState<CorporateFixedCost[]>(initialCorporateFixedCosts);
  const [corporateProperties, setCorporateProperties] = useState<CorporateProperty[]>(initialCorporateProperties);
  const [corporateContracts, setCorporateContracts] = useState<CorporateContract[]>(initialCorporateContracts);
  const [corporateTrash, setCorporateTrash] = useState<TrashItem[]>([]);

  // Compatibilidade adicional
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);
  const [quotes, setQuotes] = useState<any[]>([
    {
      id: 'q-101',
      code: 'PROP-2026-088',
      customerName: 'Banco Zenith de Investimentos',
      date: '02/10/2026',
      total: 112000,
      status: 'Aprovado',
      items: [{ productName: 'Cadeira Presidente Vertex', quantity: 40, unitPrice: 1780, totalPrice: 71200 }],
    },
    {
      id: 'q-102',
      code: 'PROP-2026-089',
      customerName: 'Studio Alpha Arquitetura',
      date: '04/10/2026',
      total: 38450,
      status: 'Enviado',
      items: [{ productName: 'Estação de Trabalho Prime 4 Lugares', quantity: 4, unitPrice: 4200, totalPrice: 16800 }],
    },
  ]);

  const [inventoryMovements] = useState<any[]>([
    { id: 'mov-1', productName: 'Cadeira Presidente Vertex', type: 'Entrada', quantity: 20, date: '04/10/2026', reason: 'NF Fornecedor #1820' },
    { id: 'mov-2', productName: 'Estação de Trabalho Prime', type: 'Saída', quantity: 4, date: '05/10/2026', reason: 'Pedido #1048' },
  ]);

  const [suppliers] = useState<any[]>([
    { id: 'sup-1', name: 'TecnoPoltronas Brasil', cnpj: '12.345.678/0001-90', contact: 'Carlos Eduardo', phone: '(11) 4002-8922', category: 'Cadeiras & Espumas', rating: 4.9, activeOrders: 2 },
    { id: 'sup-2', name: 'ErgoTech Mecanismos', cnpj: '98.765.432/0001-11', contact: 'Mariana Pires', phone: '(19) 3871-9900', category: 'Pistões & Braços 3D', rating: 4.8, activeOrders: 1 },
    { id: 'sup-3', name: 'WoodTech Painéis MDP', cnpj: '45.123.789/0001-55', contact: 'Roberto Albuquerque', phone: '(54) 3290-1122', category: 'Tampos & Marcenaria', rating: 4.7, activeOrders: 3 },
  ]);

  const [auditLogs] = useState<any[]>([
    { id: 'log-1', user: 'Ricardo Silveira', action: 'Aprovação de Proposta', detail: 'Proposta #PROP-2026-088 Banco Zenith', timestamp: '05/10/2026 14:32', ip: '189.120.45.12' },
    { id: 'log-2', user: 'Ana Paula Ramos', action: 'Separação de Pedido', detail: 'Pedido #1048 Studio Alpha', timestamp: '05/10/2026 11:15', ip: '189.120.45.18' },
    { id: 'log-3', user: 'Ricardo Silveira', action: 'Alteração de Meta OKR', detail: 'Meta Faturamento Q4 atualizada', timestamp: '04/10/2026 16:40', ip: '189.120.45.12' },
  ]);

  const updateDealStage = (dealId: string, stage: PipelineStage) => {
    setDeals((prev) => prev.map((d) => (d.id === dealId ? { ...d, stage } : d)));
  };

  const updateOrderStatus = (orderId: string, status: any) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, operationalStatus: status } : o)));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const addQuote = (q: any) => setQuotes((prev) => [q, ...prev]);
  const approveQuote = (id: string) =>
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: 'Aprovado' } : q)));

  const toggleTaskChecklist = (taskId: string, checkId: string) => toggleTaskCheck(taskId, checkId);

  const [alerts, setAlerts] = useState<any[]>([
    { id: 'alt-1', title: 'Estoque Mínimo: Cadeira Presidente Ergomax', category: 'Estoque', priority: 'alta', date: 'Hoje', status: 'Ativo' },
    { id: 'alt-2', title: 'Contrato a vencer em 27 dias: Banco Zenith', category: 'Contratos', priority: 'alta', date: 'Hoje', status: 'Ativo' },
    { id: 'alt-3', title: 'Cotação Pendente: 40 Cadeiras Pro Studio Alpha', category: 'Comercial', priority: 'media', date: 'Ontem', status: 'Ativo' },
  ]);

  const resolveAlert = (id: string) => setAlerts((prev) => prev.filter((a) => a.id !== id));
  const addInventoryEntry = (..._args: any[]) => {};
  const addTransaction = (tx: any) => addCorporateTransaction(tx);

  const openQuickAction = (type: QuickModalType) => setQuickActionType(type);
  const closeQuickAction = () => setQuickActionType(null);

  // Ações Pessoais
  const addPersonalTransaction = (tx: Partial<PersonalTransaction>) => {
    const newTx: PersonalTransaction = {
      id: `ptx-${Date.now()}`,
      description: tx.description || 'Lançamento Pessoal',
      amount: Number(tx.amount) || 0,
      type: tx.type || 'despesa',
      date: tx.date || new Date().toLocaleDateString('pt-BR'),
      category: tx.category || 'Outros',
      account: tx.account || personalAccounts[0].name,
      card: tx.card,
      status: tx.status || 'Pago',
      notes: tx.notes,
    };
    setPersonalTransactions((prev) => [newTx, ...prev]);

    // Atualiza saldo da conta
    setPersonalAccounts((prev) =>
      prev.map((acc) => {
        if (acc.name === newTx.account) {
          return {
            ...acc,
            balance: newTx.type === 'receita' ? acc.balance + newTx.amount : acc.balance - newTx.amount,
          };
        }
        return acc;
      })
    );
  };

  const deletePersonalTransaction = (id: string) => {
    const found = personalTransactions.find((t) => t.id === id);
    if (!found) return;

    setPersonalTransactions((prev) => prev.filter((t) => t.id !== id));
    setPersonalTrash((prev) => [
      {
        id: `trash-${Date.now()}`,
        originalType: 'transacao_pessoal',
        title: found.description,
        amount: found.amount,
        deletedAt: new Date().toLocaleDateString('pt-BR'),
        payload: found,
      },
      ...prev,
    ]);
  };

  const restorePersonalTrashItem = (trashId: string) => {
    const item = personalTrash.find((i) => i.id === trashId);
    if (!item) return;

    if (item.originalType === 'transacao_pessoal') {
      setPersonalTransactions((prev) => [item.payload, ...prev]);
    }
    setPersonalTrash((prev) => prev.filter((i) => i.id !== trashId));
  };

  const emptyPersonalTrash = () => setPersonalTrash([]);

  // Ações Corporativas
  const addCorporateTransaction = (tx: Partial<CorporateTransaction>) => {
    const newTx: CorporateTransaction = {
      id: `ctx-${Date.now()}`,
      description: tx.description || 'Lançamento Empresarial',
      amount: Number(tx.amount) || 0,
      type: tx.type || 'despesa',
      date: tx.date || new Date().toLocaleDateString('pt-BR'),
      dueDate: tx.dueDate || new Date().toLocaleDateString('pt-BR'),
      category: tx.category || 'Outros',
      account: tx.account || corporateAccounts[0].name,
      entityName: tx.entityName || 'Fornecedor / Cliente',
      costCenter: tx.costCenter || 'Operações',
      status: tx.status || 'Pago',
      documentRef: tx.documentRef || `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setCorporateTransactions((prev) => [newTx, ...prev]);

    // Atualiza saldo da conta PJ
    setCorporateAccounts((prev) =>
      prev.map((acc) => {
        if (acc.name === newTx.account) {
          return {
            ...acc,
            balance: newTx.type === 'receita' ? acc.balance + newTx.amount : acc.balance - newTx.amount,
          };
        }
        return acc;
      })
    );
  };

  const deleteCorporateTransaction = (id: string) => {
    const found = corporateTransactions.find((t) => t.id === id);
    if (!found) return;

    setCorporateTransactions((prev) => prev.filter((t) => t.id !== id));
    setCorporateTrash((prev) => [
      {
        id: `trash-${Date.now()}`,
        originalType: 'transacao_pj',
        title: found.description,
        amount: found.amount,
        deletedAt: new Date().toLocaleDateString('pt-BR'),
        payload: found,
      },
      ...prev,
    ]);
  };

  const restoreCorporateTrashItem = (trashId: string) => {
    const item = corporateTrash.find((i) => i.id === trashId);
    if (!item) return;

    if (item.originalType === 'transacao_pj') {
      setCorporateTransactions((prev) => [item.payload, ...prev]);
    }
    setCorporateTrash((prev) => prev.filter((i) => i.id !== trashId));
  };

  const emptyCorporateTrash = () => setCorporateTrash([]);

  // Ações de Cadastros Gerais
  const addCustomer = (c: Partial<Customer>) => {
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: c.name || 'Nova Empresa',
      document: c.document || '00.000.000/0001-00',
      type: c.type || 'PJ',
      email: c.email || 'contato@empresa.com.br',
      phone: c.phone || '(11) 3000-0000',
      whatsapp: c.whatsapp || '(11) 99000-0000',
      contactPerson: c.contactPerson || 'Responsável',
      segment: c.segment || 'Corporativo',
      address: c.address || {
        street: 'Av. Paulista',
        number: '1000',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        cep: '01310-100',
      },
      assignedSalesperson: user.name,
      creditLimit: c.creditLimit || 50000,
      creditUsed: 0,
      creditAvailable: c.creditLimit || 50000,
      totalSpent: 0,
      ordersCount: 0,
      averageTicket: 0,
      lastPurchaseDate: new Date().toLocaleDateString('pt-BR'),
      csatRating: 5,
      status: 'Ativo',
      tags: ['Novo Cadastro'],
    };
    setCustomers((prev) => [newCust, ...prev]);
  };

  const addProduct = (p: Partial<Product>) => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      sku: p.sku || `POLO-${Math.floor(100 + Math.random() * 900)}`,
      name: p.name || 'Novo Produto',
      category: p.category || 'Cadeiras',
      subcategory: p.subcategory || 'Executiva',
      brand: 'Polo Móveis',
      supplier: 'Fabricação Polo',
      costPrice: Number(p.costPrice) || 500,
      salePrice: Number(p.salePrice) || 1000,
      marginPercent: 50,
      stockCurrent: Number(p.stockCurrent) || 20,
      stockReserved: 0,
      stockAvailable: Number(p.stockCurrent) || 20,
      stockMin: 5,
      stockMax: 50,
      location: 'Galpão 1',
      abcClass: 'A',
      leadTimeDays: 7,
      inStock: true,
      description: p.description || 'Produto de linha corporativa.',
      dimensions: p.dimensions || 'Padrão NR-17',
      warrantyMonths: 36,
      lastSoldDaysAgo: 0,
    };
    setProducts((prev) => [newProd, ...prev]);
  };

  const addDeal = (d: Partial<Deal>) => {
    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      title: d.title || 'Nova Negociação',
      customerId: d.customerId || customers[0].id,
      customerName: d.customerName || customers[0].name,
      value: Number(d.value) || 25000,
      weightedValue: (Number(d.value) || 25000) * 0.6,
      probability: 60,
      stage: d.stage || 'orcamento',
      salesperson: user.name,
      source: d.source || 'Indicação',
      productsOfInterest: d.productsOfInterest || ['Cadeira Presidente Vertex'],
      expectedCloseDate: '30/10/2026',
      createdAt: new Date().toLocaleDateString('pt-BR'),
      lastInteraction: 'Negociação iniciada',
      notes: d.notes || '',
    };
    setDeals((prev) => [newDeal, ...prev]);
  };

  const addOrder = (o: Partial<Order>) => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      code: `#${1050 + orders.length}`,
      customerId: o.customerId || customers[0].id,
      customerName: o.customerName || customers[0].name,
      customerAddress: o.customerAddress || 'São Paulo, SP',
      date: new Date().toLocaleDateString('pt-BR'),
      deliveryEstimate: o.deliveryEstimate || 'Em até 5 dias úteis',
      totalValue: Number(o.totalValue) || 15000,
      itemsCount: o.itemsCount || 5,
      items: o.items || [],
      operationalStatus: 'venda_aprovada',
      paymentStatus: o.paymentStatus || 'Pago',
      progressPercent: 20,
      trackingCode: `POLO-TRK-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const addTask = (t: Partial<Task>) => {
    const newTask: Task = {
      id: `tsk-${Date.now()}`,
      title: t.title || 'Nova Tarefa',
      description: t.description || '',
      assignedTo: t.assignedTo || user.name,
      department: t.department || 'Operações',
      priority: t.priority || 'Média',
      column: t.column || 'hoje',
      dueDate: t.dueDate || 'Hoje',
      checklist: t.checklist || [{ id: 'c1', text: 'Executar atividade', done: false }],
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTaskCheck = (taskId: string, checkId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            checklist: t.checklist.map((c) => (c.id === checkId ? { ...c, done: !c.done } : c)),
          };
        }
        return t;
      })
    );
  };

  const updateTaskColumn = (taskId: string, col: Task['column']) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, column: col } : t)));
  };

  const addPersonalInvestment = (inv: Partial<PersonalInvestment>) => {
    const newInv: PersonalInvestment = {
      id: `inv-${Date.now()}`,
      name: inv.name || 'Novo Investimento',
      category: inv.category || 'Renda Fixa',
      institution: inv.institution || 'XP Investimentos',
      investedAmount: Number(inv.investedAmount) || 10000,
      currentAmount: Number(inv.currentAmount) || Number(inv.investedAmount) || 10000,
      profit: 0,
      profitabilityPercent: 0,
      allocationPercent: 10,
    };
    setPersonalInvestments((prev) => [newInv, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        activeView,
        setActiveView,
        company,
        setCompany,
        user,
        setUser,
        isSearchOpen,
        setIsSearchOpen,
        quickActionType,
        openQuickAction,
        closeQuickAction,
        products,
        customers,
        deals,
        orders,
        deliveries,
        tasks,
        goals,
        updates,
        transactions: corporateTransactions,
        okrs: goals,
        suppliers,
        auditLogs,
        quotes,
        cart,
        inventoryMovements,
        updateDealStage,
        updateOrderStatus,
        addToCart,
        removeFromCart,
        clearCart,
        addQuote,
        approveQuote,
        toggleTaskChecklist,
        quickAction: {
          isOpen: Boolean(quickActionType),
          type: quickActionType
            ? quickActionType === 'cliente'
              ? 'customer'
              : quickActionType === 'venda'
              ? 'sale'
              : quickActionType === 'tarefa'
              ? 'task'
              : quickActionType === 'despesa' || quickActionType === 'receita'
              ? 'payment'
              : quickActionType === 'produto'
              ? 'inventory'
              : (quickActionType as any)
            : '',
        },
        addInventoryEntry,
        addTransaction,
        alerts,
        resolveAlert,
        personalAccounts,
        personalCards,
        personalTransactions,
        personalRecurring,
        personalInvestments,
        personalAssets,
        personalDebts,
        personalTrash,
        corporateAccounts,
        corporateCards,
        corporateTransactions,
        corporateFixedCosts,
        corporateProperties,
        corporateContracts,
        corporateTrash,
        addPersonalTransaction,
        deletePersonalTransaction,
        restorePersonalTrashItem,
        emptyPersonalTrash,
        addCorporateTransaction,
        deleteCorporateTransaction,
        restoreCorporateTrashItem,
        emptyCorporateTrash,
        addCustomer,
        addProduct,
        addDeal,
        addOrder,
        addTask,
        toggleTaskCheck,
        updateTaskColumn,
        addPersonalInvestment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
