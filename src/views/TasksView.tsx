import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Clock,
  User,
  CheckCircle2,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Task } from '../types';
import { SectionHeader } from '../components/common/UIComponents';

const taskColumns: Array<{ id: Task['column']; label: string }> = [
  { id: 'backlog', label: 'Backlog Geral' },
  { id: 'hoje', label: 'Prioridade Hoje' },
  { id: 'andamento', label: 'Em Andamento' },
  { id: 'aguardando', label: 'Aguardando Cliente' },
  { id: 'concluido', label: 'Concluído' },
];

export const TasksView: React.FC = () => {
  const { tasks, updateTaskColumn, toggleTaskChecklist, openQuickAction } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SectionHeader
        title="Gestão de Tarefas & Produtividade da Equipe"
        subtitle="Quadro ágil para acompanhamento de vistorias técnicas, contatos comerciais e processos de montagem"
        actions={
          <button
            onClick={() => openQuickAction('tarefa')}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition-colors shadow-2xs"
          >
            <Plus className="h-4 w-4" />
            Nova Tarefa
          </button>
        }
      />

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {taskColumns.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.id);

          return (
            <div
              key={col.id}
              className="rounded-2xl border border-slate-200/90 bg-slate-100/60 p-3.5 flex flex-col min-w-[240px] max-h-[720px] dark:border-slate-800 dark:bg-slate-900/60 shadow-2xs"
            >
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2 mb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{col.label}</span>
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-mono font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300 shadow-2xs">
                  {colTasks.length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-xl border border-slate-200/80 bg-white p-3.5 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 transition-all shadow-2xs group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {task.department}
                      </span>
                      <span
                        className={`text-[9px] font-bold ${
                          task.priority === 'Urgente'
                            ? 'text-rose-600 dark:text-rose-400'
                            : task.priority === 'Alta'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    {/* Subtasks checklist */}
                    {task.checklist && task.checklist.length > 0 && (
                      <div className="mt-2.5 space-y-1 border-t border-slate-100 dark:border-slate-800 pt-2">
                        {task.checklist.map((item) => (
                          <label
                            key={item.id}
                            className="flex items-center gap-1.5 text-[11px] cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-900"
                          >
                            <input
                              type="checkbox"
                              checked={item.done}
                              onChange={() => toggleTaskChecklist(task.id, item.id)}
                              className="rounded border-slate-300 text-slate-900 focus:ring-0 dark:bg-slate-800"
                            />
                            <span className={item.done ? 'line-through text-slate-400' : ''}>
                              {item.text}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Footer Info */}
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {task.dueDate}
                      </span>
                      <span className="text-slate-500 font-medium">
                        {task.assignedTo.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-400 italic">
                    Nenhuma tarefa
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
