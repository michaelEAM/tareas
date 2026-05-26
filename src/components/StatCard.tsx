import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} rounded-lg shadow-md p-6 flex items-center justify-between`}>
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  );
};
