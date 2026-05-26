import { Task } from '../types';

export const getTaskStatusColor = (task: Task): string => {
  // Si está terminada
  if (task.estado === 'Terminada') {
    return 'bg-green-100 text-green-800 border-green-300';
  }

  // Si está vencida
  if (task.estado === 'Vencida') {
    return 'bg-red-100 text-red-800 border-red-300';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const limitDate = new Date(task.fecha_limite);
  limitDate.setHours(0, 0, 0, 0);

  const diffTime = limitDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Próxima a vencer (2 días o menos)
  if (diffDays <= 2 && diffDays >= 0) {
    return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  }

  // Vencida
  if (diffDays < 0) {
    return 'bg-red-100 text-red-800 border-red-300';
  }

  // Pendiente normal
  return 'bg-blue-100 text-blue-800 border-blue-300';
};

export const getTaskStatusBadgeColor = (status: string): string => {
  switch (status) {
    case 'Terminada':
      return 'bg-green-100 text-green-800';
    case 'Vencida':
      return 'bg-red-100 text-red-800';
    case 'En proceso':
      return 'bg-blue-100 text-blue-800';
    case 'Pendiente':
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityBadgeColor = (priority: string): string => {
  switch (priority) {
    case 'Alta':
      return 'bg-red-100 text-red-800';
    case 'Media':
      return 'bg-yellow-100 text-yellow-800';
    case 'Baja':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityIcon = (priority: string): string => {
  switch (priority) {
    case 'Alta':
      return '🔴';
    case 'Media':
      return '🟡';
    case 'Baja':
      return '🟢';
    default:
      return '⚪';
  }
};

export const isTaskOverdue = (task: Task): boolean => {
  if (task.estado === 'Terminada') return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const limitDate = new Date(task.fecha_limite);
  limitDate.setHours(0, 0, 0, 0);

  return limitDate.getTime() < today.getTime();
};

export const isTaskDueSoon = (task: Task): boolean => {
  if (task.estado === 'Terminada') return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const limitDate = new Date(task.fecha_limite);
  limitDate.setHours(0, 0, 0, 0);

  const diffTime = limitDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= 2 && diffDays >= 0;
};

export const getDaysUntilDue = (task: Task): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const limitDate = new Date(task.fecha_limite);
  limitDate.setHours(0, 0, 0, 0);

  const diffTime = limitDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

export const formatDateInput = (dateString: string): string => {
  return dateString.split('T')[0];
};
