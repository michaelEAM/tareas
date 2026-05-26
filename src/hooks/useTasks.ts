import { useState, useCallback, useEffect } from 'react';
import { type Task, type TaskFilters } from '../types';

import { taskService } from '../services';
import { toast } from 'react-toastify';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({});

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allTasks = await taskService.getAllTasks();
      setTasks(allTasks);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error loading tasks';
      setError(errorMessage);
      toast.error('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadFilteredTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filteredTasks = await taskService.getFilteredTasks(filters);
      setTasks(filteredTasks);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error loading tasks';
      setError(errorMessage);
      toast.error('Error al filtrar las tareas');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const addTask = useCallback(
    async (task: any) => {
      try {
        const newTask = await taskService.createTask(task);
        setTasks((prevTasks) => [newTask, ...prevTasks]);
        toast.success('Tarea creada exitosamente');
        return newTask;
      } catch (err) {
        toast.error('Error al crear la tarea');
        throw err;
      }
    },
    []
  );

  const updateTask = useCallback(
    async (id: number, updates: any) => {
      try {
        const updatedTask = await taskService.updateTask(id, updates);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
        toast.success('Tarea actualizada exitosamente');
        return updatedTask;
      } catch (err) {
        toast.error('Error al actualizar la tarea');
        throw err;
      }
    },
    []
  );

  const deleteTask = useCallback(
    async (id: number) => {
      try {
        await taskService.deleteTask(id);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        toast.success('Tarea eliminada exitosamente');
      } catch (err) {
        toast.error('Error al eliminar la tarea');
        throw err;
      }
    },
    []
  );

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      loadTasks();
    } else {
      loadFilteredTasks();
    }
  }, [filters, loadTasks, loadFilteredTasks]);

  return {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    loadTasks,
  };
};
