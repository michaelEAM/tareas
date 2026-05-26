import { supabase } from './supabase';
import { type Task, type CreateTaskInput, type TaskFilters } from '../types';


export const taskService = {
  // Obtener todas las tareas
  async getAllTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tareas')
      .select('*')
      .order('fecha_creacion', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }

    return data || [];
  },

  // Obtener tareas con filtros
  async getFilteredTasks(filters: TaskFilters): Promise<Task[]> {
    let query = supabase.from('tareas').select('*');

    if (filters.estado) {
      query = query.eq('estado', filters.estado);
    }

    if (filters.prioridad) {
      query = query.eq('prioridad', filters.prioridad);
    }

    if (filters.responsable && filters.responsable !== 'Todos') {
      query = query.eq('responsable', filters.responsable);
    }

    if (filters.searchTerm) {
      query = query.or(
        `titulo.ilike.%${filters.searchTerm}%,descripcion.ilike.%${filters.searchTerm}%`
      );
    }

    const { data, error } = await query.order('fecha_creacion', { ascending: false });

    if (error) {
      console.error('Error fetching filtered tasks:', error);
      throw error;
    }

    return data || [];
  },

  // Crear tarea
  async createTask(task: CreateTaskInput): Promise<Task> {
    const { data, error } = await supabase
      .from('tareas')
      .insert([
        {
          titulo: task.titulo,
          descripcion: task.descripcion || null,
          responsable: task.responsable || null,
          prioridad: task.prioridad,
          estado: task.estado,
          categoria: task.categoria || null,
          porcentaje_avance: task.porcentaje_avance || 0,
          fecha_limite: task.fecha_limite,
          observaciones: task.observaciones || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating task:', error);
      throw error;
    }

    return data;
  },

  // Actualizar tarea
  async updateTask(id: number, updates: Partial<CreateTaskInput>): Promise<Task> {
    const { data, error } = await supabase
      .from('tareas')
      .update({
        ...(updates.titulo && { titulo: updates.titulo }),
        ...(updates.descripcion !== undefined && { descripcion: updates.descripcion }),
        ...(updates.responsable !== undefined && { responsable: updates.responsable }),
        ...(updates.prioridad && { prioridad: updates.prioridad }),
        ...(updates.estado && { estado: updates.estado }),
        ...(updates.categoria !== undefined && { categoria: updates.categoria }),
        ...(updates.porcentaje_avance !== undefined && { porcentaje_avance: updates.porcentaje_avance }),
        ...(updates.fecha_limite && { fecha_limite: updates.fecha_limite }),
        ...(updates.observaciones !== undefined && { observaciones: updates.observaciones }),
        ...(updates.estado === 'Terminada' && { fecha_finalizacion: new Date().toISOString().split('T')[0] }),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating task:', error);
      throw error;
    }

    return data;
  },

  // Eliminar tarea
  async deleteTask(id: number): Promise<void> {
    const { error } = await supabase
      .from('tareas')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Obtener tareas por responsable
  async getTasksByResponsible(): Promise<string[]> {
    const { data, error } = await supabase
      .from('tareas')
      .select('responsable')
      .not('responsable', 'is', null);

    if (error) {
      console.error('Error fetching responsibles:', error);
      return [];
    }

    const responsibles = Array.from(new Set(data?.map((t) => t.responsable).filter(Boolean) || []));
    return responsibles;
  },
};
