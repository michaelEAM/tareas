import React from 'react';
import type { Task } from '../types';
import { formatDate, getTaskStatusColor, getPriorityIcon } from '../utils';
import { Badge } from './Badge';
import { getTaskStatusBadgeColor, getPriorityBadgeColor } from '../utils';

interface TaskRowProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  return (
    <tr className={`border-b hover:bg-gray-50 transition-colors ${getTaskStatusColor(task).split(' ')[0]}`}>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.titulo}</td>
      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{task.descripcion || '-'}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{task.responsable || '-'}</td>
      <td className="px-6 py-4 text-sm">
        <Badge
          text={task.prioridad}
          color={getPriorityBadgeColor(task.prioridad)}
          icon={getPriorityIcon(task.prioridad)}
        />
      </td>
      <td className="px-6 py-4 text-sm">
        <Badge text={task.estado} color={getTaskStatusBadgeColor(task.estado)} />
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${task.porcentaje_avance}%` }}
          ></div>
        </div>
        <p className="text-xs mt-1">{task.porcentaje_avance}%</p>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(task.fecha_limite)}</td>
      <td className="px-6 py-4 text-sm space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="inline-flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          ✏️
        </button>
        <button
          onClick={() => {
            if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
              onDelete(task.id);
            }
          }}
          className="inline-flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};
