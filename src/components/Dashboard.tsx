import React, { useState, useEffect } from 'react';
import type { Task } from '../types';
import { StatCard } from './StatCard';
import { FilterBar } from './FilterBar';
import { TaskModal } from './TaskModal';
import { TaskRow } from './TaskRow';
import { useTasks } from '../hooks';
import { isTaskOverdue, isTaskDueSoon } from '../utils';
import { taskService } from '../services';

export const Dashboard: React.FC = () => {
  const { tasks, loading, filters, setFilters, addTask, updateTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [responsibles, setResponsibles] = useState<string[]>([]);

  useEffect(() => {
    const loadResponsibles = async () => {
      const resp = await taskService.getTasksByResponsible();
      setResponsibles(resp);
    };
    loadResponsibles();
  }, []);

  const handleCreateTask = () => {
    setSelectedTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (formData: any) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, formData);
    } else {
      await addTask(formData);
    }
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
  };

  const handleStatusChange = async (id: number, status: string) => {
    await updateTask(id, { estado: status });
  };

  // Calcular estadísticas
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.estado === 'Pendiente').length;
  const completedTasks = tasks.filter((t) => t.estado === 'Terminada').length;
  const overdueTasks = tasks.filter((t) => isTaskOverdue(t)).length;
  const dueSoonTasks = tasks.filter((t) => isTaskDueSoon(t)).length;

  if (loading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tareas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📋 Gestor de Tareas</h1>
          <p className="text-gray-600 mt-1">Organiza y administra tus tareas de manera eficiente</p>
        </div>
        <button
          onClick={handleCreateTask}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
        >
          ✨ Nueva Tarea
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total de Tareas" value={totalTasks} icon="📌" color="bg-blue-50 border border-blue-200" />
        <StatCard title="Pendientes" value={pendingTasks} icon="⏳" color="bg-yellow-50 border border-yellow-200" />
        <StatCard title="Terminadas" value={completedTasks} icon="✅" color="bg-green-50 border border-green-200" />
        <StatCard title="Vencidas" value={overdueTasks} icon="🔴" color="bg-red-50 border border-red-200" />
        <StatCard title="Próximas a Vencer" value={dueSoonTasks} icon="⚠️" color="bg-orange-50 border border-orange-200" />
      </div>

      {/* Filters */}
      <FilterBar filters={filters} onFilterChange={setFilters} responsibles={responsibles} />

      {/* Tasks Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Título</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Descripción</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Responsable</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Prioridad</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Avance</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Fecha Límite</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    <div className="text-4xl mb-2">📭</div>
                    <p>No hay tareas que mostrar. ¡Crea una nueva tarea para comenzar!</p>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
};
