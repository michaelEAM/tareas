import React from 'react';
import { type Task } from '../types/task';

import { dateUtils } from '../utils/dateUtils';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay tareas que mostrar</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Título
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Responsable
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Prioridad
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Progreso
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Fecha Límite
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const daysUntilDue = dateUtils.getDaysUntilDue(task.fecha_limite);
            const statusColor = dateUtils.getStatusColor(task.estado, daysUntilDue);
            const priorityColor = dateUtils.getPriorityColor(task.prioridad);

            return (
              <tr
                key={task.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${statusColor}`}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{task.titulo}</p>
                    {task.categoria && (
                      <p className="text-sm text-gray-500">{task.categoria}</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {task.responsable || '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor}`}>
                    {task.prioridad}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={task.estado}
                    onChange={(e) =>
                      onStatusChange(task.id, e.target.value)
                    }
                    className="px-3 py-1 rounded border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Terminada">Terminada</option>
                    <option value="Vencida">Vencida</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-300 rounded-full h-2 max-w-xs">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${task.porcentaje_avance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {task.porcentaje_avance}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div>
                    <p>{dateUtils.formatDate(task.fecha_limite)}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {dateUtils.getDueDateStatus(daysUntilDue, task.estado)}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(task)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
