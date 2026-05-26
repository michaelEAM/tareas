export const dateUtils = {
  // Formatear fecha a formato legible
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  // Obtener días restantes hasta la fecha límite
  getDaysUntilDue(dueDate: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const diff = due.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },

  // Determinar el color según el estado de la tarea
  getStatusColor(estado: string, daysUntilDue: number): string {
    if (estado === 'Terminada') {
      return 'bg-green-100 text-green-800 border-green-300';
    }
    if (estado === 'Vencida') {
      return 'bg-red-100 text-red-800 border-red-300';
    }
    if (daysUntilDue <= 2 && daysUntilDue >= 0) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
    return 'bg-blue-100 text-blue-800 border-blue-300';
  },

  // Obtener color de prioridad
  getPriorityColor(prioridad: string): string {
    switch (prioridad) {
      case 'Alta':
        return 'bg-red-100 text-red-800';
      case 'Media':
        return 'bg-yellow-100 text-yellow-800';
      case 'Baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  },

  // Obtener icono según el estado
  getStatusIcon(estado: string): string {
    switch (estado) {
      case 'Terminada':
        return '✓';
      case 'Vencida':
        return '✕';
      case 'En proceso':
        return '⟳';
      case 'Pendiente':
        return '○';
      default:
        return '?';
    }
  },

  // Obtener texto descriptivo del estado de la fecha
  getDueDateStatus(daysUntilDue: number, estado: string): string {
    if (estado === 'Terminada') {
      return 'Completada';
    }
    if (daysUntilDue < 0) {
      return `Vencida hace ${Math.abs(daysUntilDue)} días`;
    }
    if (daysUntilDue === 0) {
      return 'Vence hoy';
    }
    if (daysUntilDue === 1) {
      return 'Vence mañana';
    }
    return `${daysUntilDue} días restantes`;
  },

  // Formatear fecha con hora
  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },
};
