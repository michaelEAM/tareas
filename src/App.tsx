import React, { useState, useMemo } from 'react';
import './App.css';

import { useTasks } from './hooks/useTasks';
import type { Task } from './types/task';

import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { FilterBar } from './components/FilterBar';
import { TaskTable } from './components/TaskTable';
import { TaskModal } from './components/TaskModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';

function App() {
  const {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    taskId: number | null;
    taskTitle: string;
  }>({
    isOpen: false,
    taskId: null,
    taskTitle: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Responsables únicos
  const uniqueResponsibilities = useMemo(() => {
    const respSet = new Set(
      tasks
        .filter((t) => t.responsable)
        .map((t) => t.responsable as string)
    );

    return Array.from(respSet).sort();
  }, [tasks]);

  // Estadísticas
  const stats = useMemo(() => {
    const total = tasks.length;

    const pendientes = tasks.filter(
      (t) => t.estado === 'Pendiente'
    ).length;

    const terminadas = tasks.filter(
      (t) => t.estado === 'Terminada'
    ).length;

    const vencidas = tasks.filter(
      (t) => t.estado === 'Vencida'
    ).length;

    return {
      total,
      pendientes,
      terminadas,
      vencidas,
    };
  }, [tasks]);

  // Editar tarea
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Crear tarea
  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  // Guardar tarea
  const handleSaveTask = async (formData: unknown) => {
    try {
      setIsSaving(true);

      if (selectedTask) {
        await updateTask(selectedTask.id, formData);
        alert('Tarea actualizada exitosamente');
      } else {
        await addTask(formData);
        alert('Tarea creada exitosamente');
      }

      setIsModalOpen(false);

    } catch (err) {
      alert('Error al guardar la tarea');
      console.error(err);

    } finally {
      setIsSaving(false);
    }
  };

  // Cambiar estado
  const handleStatusChange = async (
    id: number,
    status: string
  ) => {
    try {
      await updateTask(id, {
        estado: status,
      } as any);

      alert('Estado actualizado');

    } catch (err) {
      alert('Error al actualizar el estado');
      console.error(err);
    }
  };

  // Abrir modal eliminar
  const deleteTaskById = (id: number) => {
    setDeleteConfirm({
      isOpen: true,
      taskId: id,
      taskTitle: '',
    });
  };

  // Confirmar eliminar
  const handleConfirmDelete = async () => {
    if (deleteConfirm.taskId === null) return;

    try {
      setIsDeleting(true);

      await deleteTask(deleteConfirm.taskId);

      alert('Tarea eliminada exitosamente');

      setDeleteConfirm({
        isOpen: false,
        taskId: null,
        taskTitle: '',
      });

    } catch (err) {
      alert('Error al eliminar la tarea');
      console.error(err);

    } finally {
      setIsDeleting(false);
    }
  };

  // Error general
  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error
          </h1>

          <p className="text-gray-600">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Header onAddTask={handleCreateTask} />

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <StatsCard
            title="Total de Tareas"
            value={stats.total}
            icon="📊"
            color="bg-blue-500"
          />

          <StatsCard
            title="Pendientes"
            value={stats.pendientes}
            icon="⏳"
            color="bg-yellow-500"
          />

          <StatsCard
            title="Terminadas"
            value={stats.terminadas}
            icon="✓"
            color="bg-green-500"
          />

          <StatsCard
            title="Vencidas"
            value={stats.vencidas}
            icon="⚠️"
            color="bg-red-500"
          />

        </div>

        {/* Filtros */}
        <FilterBar
          filters={filters}
          onFilterChange={(f) => setFilters(f)}
          responsibles={uniqueResponsibilities}
        />

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow overflow-hidden">

          {loading ? (

            <div className="flex items-center justify-center py-12">

              <div className="text-center">

                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>

                <p className="text-gray-600">
                  Cargando tareas...
                </p>

              </div>

            </div>

          ) : (

            <TaskTable
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={deleteTaskById}
              onStatusChange={handleStatusChange}
            />

          )}

        </div>

      </main>

      {/* Modal tarea */}
      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask ?? undefined}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        isLoading={isSaving}
      />

      {/* Modal eliminar */}
      <DeleteConfirmModal
        isOpen={deleteConfirm.isOpen}
        title={deleteConfirm.taskTitle}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteConfirm({
            isOpen: false,
            taskId: null,
            taskTitle: '',
          })
        }
        isLoading={isDeleting}
      />

    </div>
  );
}

export default App;
