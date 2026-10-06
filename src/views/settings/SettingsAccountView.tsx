import React, { useState } from 'react';
import { User, ShieldCheck, Mail, Building, Key, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsAccountView: React.FC = () => {
  const { user, setUser } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl pb-12">
      <div className="border-b border-slate-200/80 pb-5 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Minha Conta
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Gerencie seu perfil de acesso executivo, credenciais e dados pessoais
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="h-4 w-4" /> Perfil atualizado com sucesso!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
          />
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{user.name}</div>
            <div className="text-xs text-slate-500">{user.roleLabel} · {user.department}</div>
            <button
              type="button"
              onClick={() => alert('Trocar avatar')}
              className="mt-1 text-xs font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400"
            >
              Alterar foto
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">Nome Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">E-mail Corporativo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">Nível de Acesso (RBAC)</label>
            <input
              type="text"
              disabled
              value={`${user.roleLabel} (Controle Total 360°)`}
              className="mt-1 w-full rounded-lg border border-slate-100 bg-slate-50 p-2 text-slate-500 dark:border-slate-800 dark:bg-slate-800/50"
            />
          </div>

          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">Unidade / Filial</label>
            <input
              type="text"
              disabled
              value={user.branch}
              className="mt-1 w-full rounded-lg border border-slate-100 bg-slate-50 p-2 text-slate-500 dark:border-slate-800 dark:bg-slate-800/50"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};
