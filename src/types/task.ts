export type TaskStatus = 'Pendiente' | 'En proceso' | 'Terminada' | 'Vencida';
export type TaskPriority = 'Baja' | 'Media' | 'Alta';

export interface Task {
  id: number;
  titulo: string;
  descripcion: string | null;
  responsable: string | null;
  prioridad: TaskPriority;
  estado: TaskStatus;
  categoria: string | null;
  porcentaje_avance: number;
  fecha_creacion: string;
  fecha_limite: string;
  fecha_finalizacion: string | null;
  observaciones: string | null;
}

export interface CreateTaskInput {
  titulo: string;
  descripcion?: string;
  responsable?: string;
  prioridad: TaskPriority;
  estado: TaskStatus;
  categoria?: string;
  porcentaje_avance?: number;
  fecha_limite: string;
  observaciones?: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  id: number;
}

export interface TaskFilters {
  estado?: TaskStatus;
  prioridad?: TaskPriority;
  responsable?: string;
  searchTerm?: string;
}
