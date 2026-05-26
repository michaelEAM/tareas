import React from 'react';

interface HeaderProps {
  onAddTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestor de Tareas</h1>
          <p className="text-blue-100 mt-1">Organiza y sigue el progreso de tus tareas</p>
        </div>
        <button
          onClick={onAddTask}
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-md"
        >
          + Nueva Tarea
        </button>
      </div>
    </header>
  );
};
